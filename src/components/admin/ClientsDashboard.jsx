'use client';

import { useState, useEffect } from 'react';
import { apiCall, API_BASE_URL } from '../../utils/api';
import { getAdminToken } from '../../utils/auth';
import { FiPlus, FiTrash2, FiX, FiSave, FiMove, FiEdit2 } from '@/components/ui/Icons';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const INP = 'w-full bg-[#0D0D0D]/10 text-[#0D0D0D] px-4 py-3 rounded-xl border border-[#0D0D0D]/20 focus:outline-none focus:border-[#4169E1] transition-all text-sm';
const LBL = 'block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2 font-bold';
const LOGO_TEXT_PREFIX = 'logo-text:';

const parseTextLogo = (val = '') => {
  const str = String(val || '').trim();
  if (!str) return null;
  const idx = str.indexOf(LOGO_TEXT_PREFIX);
  if (idx === -1) return null;
  const raw = str.slice(idx + LOGO_TEXT_PREFIX.length);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

const EMPTY = {
  clients: { name: '', logo: '', logoWhite: false, industry: '', blurb: '', caseStudySlug: '' },
  'hero-cards': { image: '', label: '', caseStudySlug: '' },
};

const Row = ({ item, kind, caseStudies, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  const img = kind === 'clients' ? item.logo : item.image;
  const textLogo = kind === 'clients' ? parseTextLogo(img) : null;
  const title = kind === 'clients' ? item.name : item.label;
  const cs = caseStudies.find((c) => c.slug === item.caseStudySlug);
  return (
    <div ref={setNodeRef} style={style} className="bg-white border border-[#0D0D0D]/20 p-3 md:p-4 rounded-[1rem] flex items-center gap-3 md:gap-4">
      <button {...attributes} {...listeners} className="cursor-grab p-1 text-[#0D0D0D]/40 hover:text-[#4169E1] shrink-0"><FiMove /></button>
      {textLogo ? (
        <span className="h-10 w-20 px-1.5 flex items-center justify-center rounded-md bg-[#0D0D0D]/10 text-[#0D0D0D] text-[10px] font-black tracking-tight truncate shrink-0">
          {textLogo}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt="" className={`h-10 w-20 object-contain rounded-md p-1 shrink-0 ${item.logoWhite ? 'bg-[#0D0D0D]' : 'bg-[#0D0D0D]/10'}`} />
      )}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs md:text-base font-black tracking-tight text-[#0D0D0D] truncate">{title}</h4>
        <p className="text-[8px] md:text-[9px] text-[#0D0D0D]/60 font-bold uppercase tracking-[0.15em] mt-0.5 truncate">
          {kind === 'clients' && item.industry ? `${item.industry} · ` : ''}
          {cs ? `Case study: ${cs.title.trim()}` : item.caseStudySlug ? `URL: ${item.caseStudySlug}` : 'Opens Home'}
        </p>
      </div>
      <button onClick={() => onEdit(item)} className="p-2 bg-[#0D0D0D]/10 text-[#0D0D0D]/40 hover:text-[#4169E1] rounded-lg"><FiEdit2 className="text-xs" /></button>
      <button onClick={() => onDelete(item.id)} className="p-2 bg-red-500/10 text-red-500/40 hover:text-red-500 rounded-lg"><FiTrash2 className="text-xs" /></button>
    </div>
  );
};

const Section = ({ kind, title, addLabel, token, caseStudies, showMsg }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY[kind]);
  const [logoMode, setLogoMode] = useState('image');
  const [logoText, setLogoText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const imgKey = kind === 'clients' ? 'logo' : 'image';
  const path = kind === 'clients' ? '/clients' : '/clients/hero-cards';
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const load = async () => {
    const { data, status } = await apiCall(path, 'GET');
    if (status === 200 && Array.isArray(data)) setItems(data);
    setLoading(false);
  };
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY[kind]);
    setLogoMode('image');
    setLogoText('');
    setShowForm(true);
  };
  const openEdit = (it) => {
    setEditing(it);
    const parsed = kind === 'clients' ? parseTextLogo(it.logo) : null;
    setLogoMode(parsed !== null ? 'text' : 'image');
    setLogoText(parsed || '');
    setForm(kind === 'clients'
      ? { name: it.name, logo: it.logo || '', logoWhite: !!it.logoWhite, industry: it.industry || '', blurb: it.blurb || '', caseStudySlug: it.caseStudySlug || '' }
      : { image: it.image || '', label: it.label, caseStudySlug: it.caseStudySlug || '' });
    setShowForm(true);
  };

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await fetch(`${API_BASE_URL}/upload?type=clients`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      const data = await res.json();
      if (data.url) {
        setLogoMode('image');
        setForm((p) => ({ ...p, [imgKey]: data.url }));
      } else {
        showMsg(data?.message || 'Upload failed');
      }
    } catch { showMsg('Upload failed'); }
    setUploading(false);
    e.target.value = '';
  };

  const save = async (e) => {
    e.preventDefault();
    const label = (kind === 'clients' ? form.name : form.label).trim();
    const slugOrUrl = (form.caseStudySlug || '').trim();
    if (slugOrUrl.length > 191) {
      showMsg('URL / Slug must be 191 characters or fewer');
      return;
    }

    let resolvedMedia = form[imgKey];
    if (kind === 'clients' && logoMode === 'text') {
      const txt = (logoText || label).trim();
      if (!txt) { showMsg('Company Name or Logo Text is required'); return; }
      resolvedMedia = `${LOGO_TEXT_PREFIX}${encodeURIComponent(txt)}`;
    } else if (kind === 'clients' && parseTextLogo(resolvedMedia) !== null) {
      resolvedMedia = '';
    }

    if (!label || !resolvedMedia) {
      showMsg(kind === 'clients' ? 'Name and logo image (or Text Logo) are required' : 'Label and image are required');
      return;
    }

    const payload = { ...form, [imgKey]: resolvedMedia, caseStudySlug: slugOrUrl };
    setSaving(true);
    const { status, data } = editing
      ? await apiCall(`${path}/${editing.id}`, 'PUT', payload, token)
      : await apiCall(path, 'POST', payload, token);
    showMsg(status === 200 || status === 201 ? 'Saved' : (data?.message || 'Failed to save'));
    setSaving(false);
    setShowForm(false);
    load();
  };

  const del = async (id) => {
    if (!confirm('Delete this item?')) return;
    const { status } = await apiCall(`${path}/${id}`, 'DELETE', null, token);
    showMsg(status === 200 ? 'Deleted' : 'Failed to delete');
    load();
  };

  const dragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const next = [...items];
    const [moved] = next.splice(items.findIndex((r) => r.id === active.id), 1);
    next.splice(items.findIndex((r) => r.id === over.id), 0, moved);
    setItems(next);
    await apiCall(`${path}/reorder`, 'PUT', { items: next.map((r, i) => ({ id: r.id, position: i })) }, token);
  };

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h3 className="text-[#0D0D0D] text-xl font-black tracking-tight uppercase">{title}</h3>
        <button onClick={openNew} className="flex items-center justify-center gap-2 bg-[#3558D4] text-white font-black px-5 py-3 rounded-xl hover:bg-[#0D0D0D] transition-all text-[8px] uppercase tracking-[0.2em]"><FiPlus /> {addLabel}</button>
      </div>

      {loading ? <div className="text-[#0D0D0D]/40 text-center py-8">Loading...</div> : items.length === 0 ? (
        <div className="bg-white border border-[#0D0D0D]/20 border-dashed rounded-[2rem] p-10 text-center text-[#0D0D0D]/50 text-[8px] uppercase tracking-[0.3em] font-bold">Nothing here yet.</div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={dragEnd}>
          <SortableContext items={items.map((r) => r.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2 md:space-y-3">
              {items.map((it) => <Row key={it.id} item={it} kind={kind} caseStudies={caseStudies} onEdit={openEdit} onDelete={del} />)}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-[#0D0D0D]/60 flex items-center justify-center z-50 p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white border border-[#0D0D0D]/20 rounded-xl md:rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#0D0D0D]/20">
              <h3 className="text-[#0D0D0D] text-base md:text-lg font-black tracking-tight uppercase">{editing ? 'Edit' : 'Add'} {kind === 'clients' ? 'Client' : 'Showcase Card'}</h3>
              <button onClick={() => setShowForm(false)} className="text-[#0D0D0D]/40 hover:text-[#0D0D0D] p-1"><FiX /></button>
            </div>
            <form onSubmit={save} className="p-4 md:p-6 space-y-4">
              <div>
                <label className={LBL}>{kind === 'clients' ? 'Company Name *' : 'Label * (e.g. Marine configurator)'}</label>
                <input type="text" className={INP} value={kind === 'clients' ? form.name : form.label}
                  onChange={(e) => setForm({ ...form, [kind === 'clients' ? 'name' : 'label']: e.target.value })} />
              </div>
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className={`${LBL} mb-0`}>{kind === 'clients' ? 'Logo *' : 'Image *'}</label>
                  {kind === 'clients' && (
                    <div className="inline-flex rounded-lg bg-[#0D0D0D]/10 p-0.5 text-[10px] font-bold uppercase tracking-wider">
                      <button
                        type="button"
                        onClick={() => setLogoMode('image')}
                        className={`px-2.5 py-1 rounded-md transition-all ${logoMode === 'image' ? 'bg-[#3558D4] text-white' : 'text-[#0D0D0D]/60 hover:text-[#0D0D0D]'}`}
                      >
                        Upload Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setLogoMode('text')}
                        className={`px-2.5 py-1 rounded-md transition-all ${logoMode === 'text' ? 'bg-[#3558D4] text-white' : 'text-[#0D0D0D]/60 hover:text-[#0D0D0D]'}`}
                      >
                        Text Logo
                      </button>
                    </div>
                  )}
                </div>

                {kind === 'clients' && logoMode === 'text' ? (
                  <div className="space-y-2.5">
                    <input
                      type="text"
                      className={INP}
                      value={logoText}
                      onChange={(e) => setLogoText(e.target.value)}
                      placeholder={form.name ? `e.g. ${form.name} (leave empty to use Company Name)` : 'Type brand text shown on card'}
                    />
                    <div className="inline-flex items-center px-3.5 py-2 rounded-lg bg-[#0D0D0D]/10 text-[#0D0D0D] text-base font-bold tracking-tight">
                      {(logoText || form.name || 'Preview Logo').trim()}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center gap-3">
                      {form[imgKey] && !parseTextLogo(form[imgKey]) && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={form[imgKey]} alt="Preview" className={`h-16 max-w-[200px] object-contain rounded-lg p-2 ${kind === 'clients' && form.logoWhite ? 'bg-[#0D0D0D]' : 'bg-[#0D0D0D]/10'}`} />
                      )}
                      <label className="cursor-pointer inline-flex items-center bg-[#0D0D0D]/10 hover:bg-[#0D0D0D]/20 text-[#0D0D0D]/60 text-[11px] px-4 py-2 rounded-xl font-bold uppercase tracking-wider">
                        {uploading ? 'Uploading...' : (form[imgKey] && !parseTextLogo(form[imgKey]) ? 'Change' : 'Upload')}
                        <input type="file" accept="image/*" disabled={uploading} onChange={upload} className="hidden" />
                      </label>
                    </div>
                    {kind === 'clients' && (
                      <label className="mt-2 flex items-center gap-2 text-[#0D0D0D]/60 text-[10px] font-bold uppercase tracking-wider cursor-pointer">
                        <input type="checkbox" checked={form.logoWhite} onChange={(e) => setForm({ ...form, logoWhite: e.target.checked })} />
                        White / single-colour logo (shown black in light mode)
                      </label>
                    )}
                  </>
                )}
              </div>
              {kind === 'clients' && (
                <>
                  <div>
                    <label className={LBL}>Industry</label>
                    <input type="text" className={INP} value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} placeholder="e.g. Real Estate" />
                  </div>
                  <div>
                    <label className={LBL}>Short Text</label>
                    <textarea rows={3} className={INP} value={form.blurb} onChange={(e) => setForm({ ...form, blurb: e.target.value })} placeholder="Shown on the card" />
                  </div>
                </>
              )}
              <div>
                <label className={LBL}>Redirect URL or Case Study Slug (opens on click)</label>
                <input
                  type="text"
                  maxLength={191}
                  className={INP}
                  value={form.caseStudySlug}
                  onChange={(e) => setForm({ ...form, caseStudySlug: e.target.value })}
                  placeholder="Paste any URL (https://...), path (/project/...), or case study slug"
                />
                {caseStudies.length > 0 && (
                  <select
                    className={`${INP} mt-2`}
                    value={caseStudies.some((c) => c.slug === form.caseStudySlug) ? form.caseStudySlug : ''}
                    onChange={(e) => setForm({ ...form, caseStudySlug: e.target.value })}
                  >
                    <option value="">None / Pick existing case study (optional)</option>
                    {caseStudies.map((c) => <option key={c.slug} value={c.slug}>{c.title.trim()}</option>)}
                  </select>
                )}
              </div>
              <div className="flex gap-3 pt-4 border-t border-[#0D0D0D]/20">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-[#0D0D0D]/20 text-[#0D0D0D]/40 font-black py-3.5 rounded-xl hover:bg-[#0D0D0D]/10 text-[8px] uppercase tracking-[0.2em]">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-[#3558D4] text-white font-black py-3.5 rounded-xl hover:bg-[#0D0D0D] disabled:opacity-50 text-[8px] uppercase tracking-[0.2em] flex items-center justify-center gap-2"><FiSave /> {saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ClientsDashboard = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [msg, setMsg] = useState('');
  const token = getAdminToken();
  const showMsg = (t) => { setMsg(t); setTimeout(() => setMsg(''), 3000); };

  useEffect(() => {
    apiCall('/case-studies', 'GET').then(({ data, status }) => {
      if (status === 200 && Array.isArray(data)) setCaseStudies(data.map((c) => ({ slug: c.slug, title: c.title || c.slug })));
    });
  }, []);

  return (
    <div>
      {msg && <div className="fixed top-24 right-6 left-6 md:left-auto md:top-8 md:right-8 z-[60] bg-[#3558D4] text-white px-6 py-4 rounded-2xl shadow-lg font-bold text-[10px] uppercase tracking-widest">{msg}</div>}
      <Section kind="hero-cards" title="Top Showcase Cards (3)" addLabel="Add Card" token={token} caseStudies={caseStudies} showMsg={showMsg} />
      <Section kind="clients" title="Client Brands" addLabel="Add Client" token={token} caseStudies={caseStudies} showMsg={showMsg} />
    </div>
  );
};

export default ClientsDashboard;
