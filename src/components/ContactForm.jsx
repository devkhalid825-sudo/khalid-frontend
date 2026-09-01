'use client';

import { useState } from 'react';
import { FaWhatsapp, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { SiCalendly } from 'react-icons/si';
import { apiCall } from '../utils/api';
import { servicesList } from '../data/servicesList';

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const [formData, setFormData] = useState({
        interest: '',
        first_name: '',
        last_name: '',
        user_email: '',
        user_phone: '',
        message: ''
    });

    const validateField = (name, value) => {
        switch (name) {
            case 'first_name':
                if (!value || value.trim().length < 1) return 'First name is required';
                return '';
            case 'last_name':
                if (!value || value.trim().length < 1) return 'Last name is required';
                return '';
            case 'user_email':
                if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
                return '';
            case 'user_phone':
                if (!value || !/^\+?[\d\s\-()]{7,15}$/.test(value)) return 'Please enter a valid phone number';
                return '';
            case 'interest':
                if (!value) return 'Please select a service';
                return '';
            case 'message':
                if (!value || value.trim().length < 10) return 'Message must be at least 10 characters';
                return '';
            default:
                return '';
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const validateForm = () => {
        const newErrors = {};
        const fieldsToValidate = ['first_name', 'last_name', 'user_email', 'user_phone', 'interest', 'message'];
        fieldsToValidate.forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        const allTouched = {};
        Object.keys(formData).forEach(key => { allTouched[key] = true; });
        setTouched(allTouched);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (name === 'user_phone') {
            value = value.replace(/\D/g, '');
        }
        setFormData(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setTouched({});

        if (!validateForm()) return;

        const payload = { ...formData, user_name: `${formData.first_name} ${formData.last_name}`.trim() };

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const { data, status } = await apiCall('/contact/contact', 'POST', payload);

            if (status === 200) {
                setSubmitStatus('success');
                setFormData({
                    interest: '',
                    first_name: '',
                    last_name: '',
                    user_email: '',
                    user_phone: '',
                    message: ''
                });
                setErrors({});
                setTouched({});

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'form_submission',
                    'form_type': 'contact_page'
                });
            } else {
                console.error('Backend Error:', data.error);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Network Error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setSubmitStatus(null);
    };

    return (
        <div className="bg-[#0c0c0c] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 py-10 relative border border-white/10 w-full">

            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-2 md:gap-x-12 md:gap-y-10 gap-x-6 gap-y-5 pt-4">

                    <div className="space-y-2">
                        <label htmlFor="first_name" className="text-sm font-medium text-gray-300">First Name *</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            required
                            value={formData.first_name}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={`w-full bg-white/10 border rounded-lg py-3 px-4 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base placeholder:text-gray-400 ${errors.first_name && touched.first_name ? 'border-red-500' : 'border-white/30'}`}
                            placeholder="James"
                        />
                        {errors.first_name && touched.first_name && (
                            <p className="text-red-400 text-xs mt-1">{errors.first_name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="last_name" className="text-sm font-medium text-gray-300">Last Name *</label>
                        <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            required
                            value={formData.last_name}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={`w-full bg-white/10 border rounded-lg py-3 px-4 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base placeholder:text-gray-400 ${errors.last_name && touched.last_name ? 'border-red-500' : 'border-white/30'}`}
                            placeholder="Whitfield"
                        />
                        {errors.last_name && touched.last_name && (
                            <p className="text-red-400 text-xs mt-1">{errors.last_name}</p>
                        )}
                    </div>

                    <div className="space-y-2 col-span-2">
                        <label htmlFor="user_email" className="text-sm font-medium text-gray-300">Business Email *</label>
                        <input
                            id="user_email"
                            type="email"
                            name="user_email"
                            required
                            value={formData.user_email}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder="james@yourbrand.com"
                            className={`w-full bg-white/15 border rounded-lg px-4 py-3 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base placeholder:text-gray-400 ${errors.user_email && touched.user_email ? 'border-red-500' : 'border-white/40'}`}
                        />
                        {errors.user_email && touched.user_email && (
                            <p className="text-red-400 text-xs mt-1">{errors.user_email}</p>
                        )}
                    </div>
                    <div className="space-y-2 col-span-2">
                        <label htmlFor="user_phone" className="text-sm font-medium text-gray-300">Phone — for a faster reply</label>
                        <input
                            id="user_phone"
                            type="tel"
                            name="user_phone"
                            value={formData.user_phone}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder="+1 XXX XXX XXXX"
                            className={`w-full bg-white/15 border rounded-lg px-4 py-3 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base placeholder:text-gray-400 ${errors.user_phone && touched.user_phone ? 'border-red-500' : 'border-white/40'}`}
                        />
                        {errors.user_phone && touched.user_phone && (
                            <p className="text-red-400 text-xs mt-1">{errors.user_phone}</p>
                        )}
                    </div>

                    <div className="space-y-2 col-span-2">
                        <label htmlFor="interest" className="text-sm font-medium text-gray-300">Service Required *</label>
                        <div className="relative border-b border-gray-500/80">
                            <select
                                id="interest"
                                name="interest"
                                value={formData.interest}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={`w-full bg-white/10 border rounded-lg py-3 px-4 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base appearance-none cursor-pointer ${errors.interest && touched.interest ? 'border-red-500' : 'border-white/30'}`}
                            >
                                <option value="" className="bg-black">Select a service</option>
                                {servicesList.map((service) => (
                                    <option key={service} value={service} className="bg-black">{service}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                        {errors.interest && touched.interest && (
                            <p className="text-red-400 text-xs mt-1">{errors.interest}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2 md:pb-12 pb-4">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">Your Project Brief *</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Tell us what you're building — product type, target audience, platform, timeline, and any specific requirements…"
                        className={`w-full bg-white/10 border rounded-lg py-3 px-4 focus:border-[#4169E1] outline-none transition-colors text-sm md:text-base placeholder:text-gray-400 resize-none ${errors.message && touched.message ? 'border-red-500' : 'border-white/30'}`}
                    ></textarea>
                    {errors.message && touched.message && (
                        <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                    )}
                </div>

                <div className="space-y-4">

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center gap-2 text-center bg-[#4169E1] hover:bg-[#8ab4ff] text-black md:font-bold py-4 px-6 rounded-full text-sm md:text-base transition-all transform active:scale-[0.98] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Sending...' : (<><FaPaperPlane className="flex-shrink-0" /> Get a Free Estimate</>)}
                    </button>
                    <p className="text-center text-gray-500 text-xs">
                        <FaCheck className="inline -mt-0.5" /> 1 business day response &nbsp;·&nbsp; <FaCheck className="inline -mt-0.5" /> Free sample render available &nbsp;·&nbsp; <FaCheck className="inline -mt-0.5" /> No sales calls without permission
                    </p>
                </div>
            </form>

            {/* Submission Popup Modal */}
            {submitStatus && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-[#0c0c0c] border border-white/10 rounded-[2rem] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl transform animate-in zoom-in-95 duration-300">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${submitStatus === 'success' ? 'bg-[#4169E1]/20 text-[#4169E1]' : 'bg-red-400/20 text-red-400'}`}>
                            {submitStatus === 'success' ? (
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                            ) : (
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                            )}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                            {submitStatus === 'success' ? 'Success!' : 'Oops!'}
                        </h3>

                        <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
                            {submitStatus === 'success'
                                ? "Your inquiry has been sent successfully. We will reach out to you within 24 hours."
                                : "We encountered an issue submitting your form. Please try again or reach out to us via WhatsApp."}
                        </p>

                        <button
                            onClick={closeModal}
                            className="w-full bg-[#4169E1] text-black font-bold py-4 rounded-full transition-transform active:scale-95 hover:bg-[#8ab4ff]"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Direct Contact Options for Mobile / Low-Effort */}
            <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-center text-gray-400 text-sm mb-6">Or reach out directly for a quicker response</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* WhatsApp Link */}
                    <a
                        href="https://wa.me/923471245257"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-el-track="whatsapp-contact-page"
                        className="flex items-center justify-center gap-4 bg-[#25D366]/5 hover:bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/20 py-5 px-8 rounded-2xl transition-all duration-300 group hover:shadow-[0_0_20px_rgba(37,211,102,0.15)]"
                    >
                        <FaWhatsapp className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-left">
                            <p className="text-[11px] text-[#25D366]/70 font-semibold tracking-wider uppercase">Quick Chat</p>
                            <p className="text-base font-bold text-white">Message on WhatsApp</p>
                        </div>
                    </a>

                    {/* Calendly Link */}
                    <a
                        href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-el-track="schedule-intro-call-contact-page"
                        className="flex items-center justify-center gap-4 bg-[#4169E1]/5 hover:bg-[#4169E1]/15 text-[#4169E1] border border-[#4169E1]/20 py-5 px-8 rounded-2xl transition-all duration-300 group hover:shadow-[0_0_20px_rgba(65,105,225,0.1)]"
                    >
                        <SiCalendly className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                        <div className="text-left">
                            <p className="text-[11px] text-[#4169E1]/70 font-semibold tracking-wider uppercase">Direct Booking</p>
                            <p className="text-base font-bold text-white">Schedule an Intro Call</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
