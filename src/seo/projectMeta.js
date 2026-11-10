// Title and description for the meta / Open Graph tags of /project/* and /case-study/* pages.
//
// The backend often has empty, all-caps, slug-style or wrong metaTitle / metaDescription
// values (e.g. a case study whose metaTitle belongs to another project). These helpers
// clean that up for the share preview only — the visible page still shows the backend
// data, so the real fix for each record is still in the admin panel.
import { getProjectValueProposition, CATEGORY_FALLBACKS } from '@/constants/projectValueProps';
import { stripHtml } from '@/utils/formatTitle';

const DEFAULT_VALUE_PROP = 'Real results delivered through immersive creative technology.';
const GENERIC_DESCRIPTIONS = new Set([...Object.values(CATEGORY_FALLBACKS), DEFAULT_VALUE_PROP]);
const MIN_DESCRIPTION = 50;
const MAX_DESCRIPTION = 160;

const titleCaseWords = (s) => s.toLowerCase().replace(/(^|\s)([a-z])/g, (m, sp, c) => sp + c.toUpperCase());

const wordSet = (s) =>
  new Set(String(s || '').toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2));

function sharesWord(a, b) {
  const left = wordSet(a);
  for (const w of wordSet(b)) if (left.has(w)) return true;
  return false;
}

/** "KIA CONFIGURATOR" -> "Kia Configurator", "Tim-barth" -> "Tim Barth", "Volvo Configurator." -> "Volvo Configurator". */
export function cleanProjectTitle(raw) {
  let t = stripHtml(raw || '').replace(/\s+/g, ' ').trim().replace(/[.\s]+$/, '');
  if (!t) return '';
  if (!/\s/.test(t) && t.includes('-')) return titleCaseWords(t.replace(/-+/g, ' '));
  if (t === t.toUpperCase() && /[A-Z]{4,}/.test(t)) return titleCaseWords(t);
  return t;
}

/** metaTitle, unless it shares no word with the project's title or URL (then it belongs to another record). */
export function projectMetaTitle(data, slug) {
  const meta = cleanProjectTitle(data?.metaTitle);
  const title = cleanProjectTitle(data?.title);
  if (meta && title && !sharesWord(meta, title) && !sharesWord(meta, String(slug).replace(/-/g, ' '))) {
    return title;
  }
  return meta || title;
}

const clip = (s) => (s.length > MAX_DESCRIPTION ? `${s.slice(0, MAX_DESCRIPTION - 1).replace(/\s+\S*$/, '')}…` : s);

function categoryFallback(category) {
  return String(category || '')
    .split(',')
    .map((c) => CATEGORY_FALLBACKS[c.trim()])
    .find(Boolean);
}

/** A description that is specific to this project, never one shared word-for-word with other pages. */
export function projectMetaDescription(data, slug, title) {
  const own = stripHtml(data?.metaDescription || '').replace(/\s+/g, ' ').trim();
  if (own.length >= MIN_DESCRIPTION) return clip(own);

  let base = getProjectValueProposition({ ...data, slug });
  if (base === DEFAULT_VALUE_PROP) base = categoryFallback(data?.category) || base;
  base = String(base || '').replace(/\s+/g, ' ').trim().replace(/\.$/, '');

  const isGeneric = !base || GENERIC_DESCRIPTIONS.has(base) || GENERIC_DESCRIPTIONS.has(`${base}.`);
  if (!isGeneric) {
    // The project's own text: keep its wording and casing.
    if (base.length >= MIN_DESCRIPTION) return clip(`${base}.`);
    return clip(sharesWord(base, title) ? `${base} by Elipse Studio.` : `${title}: ${base}, by Elipse Studio.`);
  }
  // A shared category sentence: lead with the project name so every page differs.
  const lead = base ? base.charAt(0).toLowerCase() + base.slice(1) : 'an immersive 3D project';
  return clip(`${title}: ${lead}, by Elipse Studio.`);
}
