'use client';

import React, { useRef, useState } from 'react';
import { SiCalendly } from '@/components/ui/Icons';
import { apiCall } from '@/utils/api';
import ReCaptcha from '@/components/common/ReCaptcha';
import { useRateLimitTimer } from '@/hooks/useRateLimitTimer';
import { useTheme } from '@/components/providers/ThemeProvider';
import { trackFormSubmission } from '@/components/analytics/tracking';

const CALENDLY_URL = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting';

const SCOPES = [
  {
    id: 'configurator',
    title: '3D Interactive Product Configurator',
    desc: 'Real-time WebGL or Unreal Engine 5 cloud streaming for e-commerce or CPQ.',
  },
  {
    id: 'archviz',
    title: 'Real-Time ArchViz & Virtual Tours',
    desc: 'Browser-streamed walkthroughs and Meta Quest VR for off-plan property launches.',
  },
  {
    id: 'cgi',
    title: 'Commercial CGI & 3D Anamorphic Film',
    desc: 'Cinema-quality product commercials or giant naked-eye corner LED billboard spots.',
  },
];

const STAGES = [
  {
    id: 'cad-ready',
    title: 'I have CAD / 3D engineering models ready',
    desc: 'SolidWorks, STEP, Rhino, Revit, or FBX assets ready for optimization.',
  },
  {
    id: 'blueprints',
    title: 'I have design specs & 2D blueprints',
    desc: 'Need 3D assets modeled from scratch based on architectural drawings or references.',
  },
  {
    id: 'exploring',
    title: 'Exploring feasibility & budget brackets',
    desc: 'Planning an upcoming launch and evaluating technical architecture and ROI.',
  },
];

const OptionList = ({ options, value, onChange, name, t }) => (
  <div role="radiogroup" className="space-y-3">
    {options.map((opt) => {
      const active = value === opt.id;
      return (
        <button
          key={opt.id}
          type="button"
          role="radio"
          aria-checked={active}
          name={name}
          onClick={() => onChange(opt.id)}
          className={`w-full text-left rounded-2xl border px-5 py-4 flex items-start justify-between gap-4 transition-all duration-200 cursor-pointer ${active ? t.optionActive : t.option}`}
        >
          <span>
            <span className={`block text-sm md:text-base font-semibold font-sans ${t.title}`}>{opt.title}</span>
            <span className={`block mt-1 text-xs md:text-sm font-serif leading-relaxed ${t.muted}`}>{opt.desc}</span>
          </span>
          <span
            aria-hidden="true"
            className={`mt-1 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${active ? 'border-[#4169E1] bg-[#3558D4]' : 'sf-radio border-white/25'}`}
          >
            {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
          </span>
        </button>
      );
    })}
  </div>
);

const STEP_LABELS = ['Scope', 'Stage', 'Estimate'];

const EMPTY_FORM = { user_email: '', user_name: '', user_company: '', website_hp: '' };

/**
 * 3-tap progressive scoping funnel + 1-click Calendly card ("Move forward." block).
 * Posts to the same /contact/contact endpoint as the main contact form.
 */
const ScopingFunnel = ({ formId = 'scoping_funnel', heading = 'Move forward.', subheading, sectionId = 'start-project', className = '' }) => {
  const { isLight } = useTheme();
  const formRef = useRef(null);
  const recaptchaRef = useRef(null);
  const { isLocked, formattedTime, recordAttempt, triggerCooldown } = useRateLimitTimer({
    maxAttempts: 5,
    cooldownMs: 15 * 60 * 1000,
  });

  const [step, setStep] = useState(1);
  const [scope, setScope] = useState(SCOPES[0].id);
  const [stage, setStage] = useState(STAGES[0].id);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Dark styles by default; day mode is handled in globals.css via html.light + the sf-* marker classes,
  // so the funnel follows the same theme switch as the rest of the site.
  const t = {
    card: 'sf-card bg-[#111111] border-white/10',
    title: 'sf-title text-white',
    muted: 'sf-muted text-zinc-400',
    option: 'sf-option bg-white/[0.03] border-white/10 hover:border-white/25',
    optionActive: 'sf-option-active bg-white/[0.06] border-[#4169E1]',
    input: 'sf-input bg-white/[0.04] border-white/10 text-white placeholder:text-zinc-500 focus:border-[#4169E1]',
    stepIdle: 'sf-step-idle bg-white/10 text-zinc-400',
    back: 'sf-back text-zinc-400 hover:text-white',
    nextBtn: 'sf-next bg-[#3558D4] text-white hover:bg-[#2A48B8]',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) next.user_email = 'Please enter a valid work email';
    if (formData.user_name.trim().length < 2) next.user_name = 'Name must be at least 2 characters';
    if (!recaptchaToken) next.recaptcha = 'Please tick the reCAPTCHA checkbox to confirm you are human';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const resetCaptcha = () => {
    setRecaptchaToken('');
    recaptchaRef.current?.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setErrorMessage('');
    if (isLocked) {
      setErrorMessage(`Too many attempts. Please wait ${formattedTime} before trying again.`);
      return;
    }
    if (!validate()) return;

    const scopeLabel = SCOPES.find((s) => s.id === scope)?.title || '';
    const stageLabel = STAGES.find((s) => s.id === stage)?.title || '';
    const payload = {
      ...formData,
      interest: scopeLabel,
      message: `Scoping funnel request.\nScope: ${scopeLabel}\nProject stage: ${stageLabel}\nPage: ${typeof window !== 'undefined' ? window.location.pathname : ''}`,
      recaptchaToken,
    };

    setIsSubmitting(true);
    try {
      const { data, status: code } = await apiCall('/contact/contact', 'POST', payload);
      if (code === 200) {
        setStatus('success');
        trackFormSubmission(formId, formRef.current);
        setFormData(EMPTY_FORM);
        setErrors({});
        resetCaptcha();
      } else if (code === 429) {
        triggerCooldown(data?.retryAfter || 900);
        setStatus('error');
        setErrorMessage(data?.error || 'Rate limit exceeded. Please wait 15 minutes.');
      } else {
        setStatus('error');
        setErrorMessage(data?.error || data?.message || 'Failed to submit. Please try again.');
        recordAttempt();
        resetCaptcha();
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
      recordAttempt();
      resetCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  const startOver = () => {
    setStatus(null);
    setStep(1);
    setScope(SCOPES[0].id);
    setStage(STAGES[0].id);
  };

  return (
    <section id={sectionId} className={`w-full py-14 md:py-24 px-5 md:px-16 scroll-mt-24 transition-colors duration-300 sf-section bg-black ${className}`}>
      <div className="max-w-[1100px] mx-auto">
        {(heading || subheading) && (
          <div className="text-center mb-8 md:mb-12">
            {heading && <h2 className={`text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter ${t.title}`}>{heading}</h2>}
            {subheading && <p className={`mt-4 text-sm md:text-lg font-serif max-w-2xl mx-auto ${t.muted}`}>{subheading}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-5 md:gap-6 items-stretch">
          {/* ---- Funnel card ---- */}
          <div className={`rounded-[1.5rem] border p-6 md:p-8 ${t.card}`}>
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-14 h-14 rounded-full bg-[#3558D4] flex items-center justify-center text-white text-2xl" aria-hidden="true">✓</div>
                <h3 className={`mt-5 text-xl md:text-2xl font-semibold ${t.title}`}>Request received.</h3>
                <p className={`mt-2 text-sm md:text-base font-serif max-w-sm ${t.muted}`}>
                  We will send an itemized feasibility summary and build timeline within 24 hours.
                </p>
                <button type="button" onClick={startOver} className={`mt-6 text-sm font-semibold cursor-pointer ${t.back}`}>
                  ← Start another request
                </button>
              </div>
            ) : (
              <>
                {/* Step indicator */}
                <ol className="flex items-center justify-between mb-7" aria-label="Progress">
                  {STEP_LABELS.map((label, i) => {
                    const n = i + 1;
                    const reached = step >= n;
                    return (
                      <li key={label} className="flex items-center gap-2" aria-current={step === n ? 'step' : undefined}>
                        <span className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center ${reached ? 'bg-[#3558D4] text-white' : t.stepIdle}`}>{n}</span>
                        <span className={`text-xs md:text-sm font-semibold ${reached ? t.title : t.muted}`}>{label}</span>
                      </li>
                    );
                  })}
                </ol>

                {step === 1 && (
                  <div>
                    <h3 className={`text-lg md:text-2xl font-semibold ${t.title}`}>What are you looking to build?</h3>
                    <p className={`mt-1.5 mb-5 text-sm font-serif ${t.muted}`}>Select your primary 3D or visual requirement (1 tap to proceed).</p>
                    <OptionList options={SCOPES} value={scope} onChange={setScope} name="scope" t={t} />
                    <button type="button" onClick={() => setStep(2)} className={`mt-6 w-full rounded-xl py-3.5 text-sm md:text-base font-semibold transition-colors cursor-pointer ${t.nextBtn}`}>
                      Continue to Project Stage ↗
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className={`text-lg md:text-2xl font-semibold ${t.title}`}>Where are you in the pipeline?</h3>
                    <p className={`mt-1.5 mb-5 text-sm font-serif ${t.muted}`}>This helps us gauge turnaround time and engineering scope.</p>
                    <OptionList options={STAGES} value={stage} onChange={setStage} name="stage" t={t} />
                    <button type="button" onClick={() => setStep(3)} className={`mt-6 w-full rounded-xl py-3.5 text-sm md:text-base font-semibold transition-colors cursor-pointer ${t.nextBtn}`}>
                      Continue to Final Step ↗
                    </button>
                    <button type="button" onClick={() => setStep(1)} className={`mt-4 w-full text-center text-sm font-semibold cursor-pointer ${t.back}`}>
                      ← Back to Scope
                    </button>
                  </div>
                )}

                {step === 3 && (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    <h3 className={`text-lg md:text-2xl font-semibold ${t.title}`}>Where should we send your estimate?</h3>
                    <p className={`mt-1.5 mb-5 text-sm font-serif ${t.muted}`}>We will send an itemized feasibility summary and build timeline within 24 hours.</p>

                    {[
                      { name: 'user_email', label: 'Work Email', type: 'email', placeholder: 'name@company.com', autoComplete: 'email' },
                      { name: 'user_name', label: 'Your Name', type: 'text', placeholder: 'Your full name', autoComplete: 'name' },
                      { name: 'user_company', label: 'Company or Brand Name (Optional)', type: 'text', placeholder: 'Acme Motors / Apex Developments', autoComplete: 'organization' },
                    ].map((f) => (
                      <div key={f.name} className="mb-4">
                        <label htmlFor={`${formId}-${f.name}`} className={`block mb-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] ${t.muted}`}>
                          {f.label}
                        </label>
                        <input
                          id={`${formId}-${f.name}`}
                          name={f.name}
                          type={f.type}
                          value={formData[f.name]}
                          onChange={handleChange}
                          placeholder={f.placeholder}
                          autoComplete={f.autoComplete}
                          className={`w-full rounded-xl border px-4 py-3 text-sm md:text-base outline-none transition-colors ${t.input}`}
                        />
                        {errors[f.name] && <p className="text-red-400 text-xs mt-1">{errors[f.name]}</p>}
                      </div>
                    ))}

                    {/* Honeypot bot trap (invisible to humans) */}
                    <div aria-hidden="true" style={{ display: 'none' }}>
                      <input type="text" name="website_hp" value={formData.website_hp} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="pt-1 pb-4">
                      <ReCaptcha
                        ref={recaptchaRef}
                        theme={isLight ? 'light' : 'dark'}
                        onVerify={(token) => {
                          setRecaptchaToken(token);
                          setErrors((prev) => ({ ...prev, recaptcha: '' }));
                        }}
                        onExpired={() => setRecaptchaToken('')}
                      />
                      {errors.recaptcha && <p className="text-red-400 text-xs mt-1">{errors.recaptcha}</p>}
                    </div>

                    {status === 'error' && errorMessage && <p className="text-red-400 text-sm mb-3">{errorMessage}</p>}

                    <button
                      type="submit"
                      disabled={isSubmitting || isLocked}
                      data-track-cta={`${formId}-submit`}
                      className="w-full rounded-xl py-3.5 bg-[#3558D4] hover:bg-[#2A48B8] text-white text-sm md:text-base font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? 'Sending…' : 'Get Build Feasibility & Pricing Estimate ↗'}
                    </button>
                    <button type="button" onClick={() => setStep(2)} className={`mt-4 w-full text-center text-sm font-semibold cursor-pointer ${t.back}`}>
                      ← Back to Stage
                    </button>
                  </form>
                )}
              </>
            )}
          </div>

          {/* ---- Calendly card ---- */}
          <div className={`rounded-[1.5rem] border p-6 md:p-8 flex flex-col items-center justify-center text-center ${t.card}`}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/[0.06]">
              <SiCalendly className="w-7 h-7 text-[#4169E1]" />
            </div>
            <h3 className={`mt-5 text-xl md:text-2xl font-semibold ${t.title}`}>Skip the Inquiry Queue</h3>
            <p className={`mt-3 text-sm md:text-base font-serif leading-relaxed max-w-sm ${t.muted}`}>
              Have CAD engineering files or an active RFP? Speak directly with our technical leads to confirm feasibility,
              architecture, and quote estimates in 15 minutes.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track-id={`${formId}-calendly`}
              data-track-cta={`${formId}-calendly`}
              className="mt-7 w-full max-w-sm rounded-xl py-3.5 bg-[#3558D4] hover:bg-[#2A48B8] text-white text-sm md:text-base font-semibold transition-colors"
            >
              Schedule 15-Min Scoping Call ↗
            </a>
            <p className={`mt-3 text-xs font-serif ${t.muted}`}>Instant Google Meet / Zoom confirmation</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScopingFunnel;
