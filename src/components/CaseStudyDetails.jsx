'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArticleProgress } from './articles/articleHelpers';
import { FiArrowLeft } from '@/components/ui/Icons';
import { apiCall, getYoutubeEmbed, SITE_URL, toCdnUrl } from '../utils/api';
import AhmedFoodLayout from './AhmedFoodLayout';
import MobileMenu from './MobileMenu';

import { caseStudyEntries } from './projects/projectData';

const CaseStudyDetail = ({ slug, initialData }) => {
  const [cs, setCs] = useState(initialData || null);
  const [nextCs, setNextCs] = useState(null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (!slug || initialData) return;
    const fetchCaseStudy = async () => {
      setLoading(true);
      setError('');
      try {
        const { data, status } = await apiCall(`/case-studies/by-slug?slug=${slug}`, 'GET');
        if (status === 200 && data) {
          setCs(data);
          const allRes = await apiCall('/case-studies', 'GET');
          if (allRes.status === 200 && Array.isArray(allRes.data)) {
            const sorted = allRes.data.filter(c => c.id);
            const idx = sorted.findIndex(c => c.id === data.id);
            if (idx !== -1) {
              const next = idx < sorted.length - 1 ? sorted[idx + 1] : sorted[0];
              setNextCs(next);
            }
          }
        } else {
          const staticMatch = caseStudyEntries.find(c => c.slug === slug);
          if (staticMatch) {
            setCs({
              title: staticMatch.title,
              content: staticMatch.sections?.[0]?.text || '',
              largeBanner: staticMatch.heroImage,
              smallBanner: staticMatch.heroImage,
              client: staticMatch.meta?.find(m => m.label === 'Client')?.value,
              service: staticMatch.meta?.find(m => m.label === 'Service')?.value,
            });
          } else setError('Case study not found');
        }
      } catch {
        const staticMatch = caseStudyEntries.find(c => c.slug === slug);
        if (staticMatch) {
          setCs({
            title: staticMatch.title,
            content: staticMatch.sections?.[0]?.text || '',
            largeBanner: staticMatch.heroImage,
            smallBanner: staticMatch.heroImage,
          });
        } else setError('Failed to load case study');
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudy();
  }, [slug]);

  const pageUrl = `${SITE_URL}/case-study/${slug}`;
  const rawDesc = cs?.content ? cs.content.replace(/<[^>]*>/g, '') : '';
  const image = cs?.largeBanner || cs?.smallBanner || `${SITE_URL}/assets/og-image.webp`;

    if (loading) return null;

  if (error || !cs) return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-6 gap-6">
      <span className="text-[120px] md:text-[200px] font-black text-white/10 block leading-none">404</span>
      <p className="text-lg text-white/50 font-light -mt-4">{error}</p>
      <Link to="/case-studies" className="flex items-center gap-2 bg-[#4169E1] text-white px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#3158D4] transition-all">
        <FiArrowLeft /> Back to Case Studies
      </Link>
    </div>
  );

  const safeJson = (val, fallback) => {
    if (!val) return fallback;
    try { return typeof val === 'string' ? JSON.parse(val) : val; } catch { return fallback; }
  };

  const meta = [
    ...(cs.client ? [{ label: 'Client', value: cs.client }] : []),
    ...(cs.service ? [{ label: 'Service', value: cs.service }] : (cs.category ? [{ label: 'Category', value: cs.category }] : [])),
    ...(cs.duration ? [{ label: 'Duration', value: cs.duration }] : []),
    ...(cs.deliverables ? [{ label: 'Deliverables', value: cs.deliverables }] : []),
  ];

  const heroImage = toCdnUrl(cs.largeBanner || cs.heroImage || cs.image);
  const smallBannerRaw = toCdnUrl(cs.smallBanner);
  const smallBanner = smallBannerRaw && smallBannerRaw !== heroImage ? smallBannerRaw : undefined;
  const heroVideo = cs.heroVideo || (cs.videoUrl ? getYoutubeEmbed(cs.videoUrl) : undefined);

  const parsedSections = safeJson(cs.sections, []);
  const defaultSectionOrder = ['storyBlocks', 'thumbnails', 'stills', 'results', 'process', 'content'];
  let sectionOrder = defaultSectionOrder;
  let storyBlocks = [];

  if (Array.isArray(parsedSections) && parsedSections.length > 0 && (parsedSections[0].heading || parsedSections[0].text || parsedSections[0].content)) {
    if (parsedSections[0]?.sectionOrder && Array.isArray(parsedSections[0].sectionOrder)) {
      sectionOrder = parsedSections[0].sectionOrder;
    }
    storyBlocks = parsedSections.map((s, idx) => ({
      tag: s.tag || (idx === 0 ? 'Overview' : (idx === 1 ? 'The challenge' : `Block ${idx + 1}`)),
      heading: s.heading || (idx === 0 ? cs.overviewHeading : cs.challengeHeading) || '',
      text: s.text || s.content || '',
      image: toCdnUrl(s.image),
      position: s.position || (idx % 2 === 0 ? 'left' : 'right'),
    }));
  }

  const rawGalleryCats = safeJson(cs.galleryCategories, []);
  let galleryThumbnails = [];
  let galleryStills = [];
  const otherCats = [];

  if (Array.isArray(rawGalleryCats)) {
    rawGalleryCats.forEach((g) => {
      const imgs = (Array.isArray(g.images) ? g.images : String(g.images || '').split(',').map((s) => s.trim()).filter(Boolean)).map(toCdnUrl);
      const nameLower = String(g.name || '').toLowerCase();
      if (g.type === 'thumbnails' || nameLower === 'thumbnails') {
        galleryThumbnails = [...galleryThumbnails, ...imgs];
      } else if (g.type === 'stills' || nameLower === 'still images' || nameLower === 'still renders' || nameLower === 'stills') {
        galleryStills = [...galleryStills, ...imgs];
      } else if (g.name) {
        otherCats.push({ name: g.name, images: imgs });
      }
    });
  }

  return (
    <article>
      <ArticleProgress fromColor="#4169E1" />
      <AhmedFoodLayout
        title={cs.title}
        meta={meta.length > 0 ? meta : undefined}
        heroImage={heroImage}
        heroVideo={heroVideo}
        smallBanner={smallBanner}
        overviewHeading={cs.overviewHeading || 'Project overview'}
        overview={cs.overviewText || cs.overview}
        challengeHeading={cs.challengeHeading || 'Key challenges'}
        challenge={cs.challengeText || cs.challenge}
        storyBlocks={storyBlocks}
        galleryThumbnails={galleryThumbnails}
        galleryStills={galleryStills}
        sectionOrder={sectionOrder}
        content={cs.content || cs.description || ''}
        results={safeJson(cs.results, [])}
        process={safeJson(cs.processSteps || cs.process, [])}
        galleryCategories={otherCats.length > 0 ? otherCats : undefined}
        videoTabs={safeJson(cs.videoTabs, [])}
        ctaUrl={cs.ctaUrl || '/contact'}
        ctaText={cs.ctaText || 'Start a project'}
        nextProject={nextCs ? { path: `/case-study/${nextCs.slug}`, name: nextCs.title } : undefined}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </article>
  );
};

export default CaseStudyDetail;
