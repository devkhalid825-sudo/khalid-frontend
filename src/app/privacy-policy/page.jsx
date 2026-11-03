import LegalPage from '@/components/legal/LegalPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';

export function generateMetadata() {
  return buildMetadata({
    title: 'Privacy Policy & Data Protection',
    description:
      'Learn how Elipse Studio collects, protects, and manages client data, CAD assets, and website information in accordance with international privacy laws.',
    canonical: `${SITE_URL}/privacy-policy`,
  });
}

const EMAIL = <a href="mailto:info@elipsestudio.com">info@elipsestudio.com</a>;
const SITE = <a href="https://elipsestudio.com">elipsestudio.com</a>;

const sections = [
  {
    id: 'who-we-are',
    title: 'Who We Are & Data Controllers',
    body: (
      <>
        <p>Elipse Studio operates as a creative technology and real-time visualization studio with primary offices located at:</p>
        <ul>
          <li><strong>United States Office:</strong> 1812 McCormick Ln, Hanover Park, IL 60133. Phone: +1 630-297-0428.</li>
          <li><strong>International Production Studio:</strong> House no A-08, near Wasim Bagh, Block 13D-3, Gulshan-e-Iqbal, Karachi, Pakistan.</li>
          <li><strong>Contact Email:</strong> {EMAIL}</li>
        </ul>
      </>
    ),
  },
  {
    id: 'client-ip',
    title: 'Client Intellectual Property & Proprietary 3D Assets',
    body: (
      <>
        <p>As a high-end visualization studio, we routinely handle highly sensitive pre-release CAD files, architectural BIM schematics, industrial dielines, and unannounced product designs.</p>
        <ul>
          <li>All client-submitted CAD models, 3D geometry, textures, and blueprints are held under strict non-disclosure.</li>
          <li>Client project files are stored on isolated, encrypted cloud infrastructure with role-based access controls.</li>
          <li>We never share, sell, distribute, or train public AI models on client CAD or proprietary design assets without explicit written consent.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    body: (
      <>
        <p>We collect information that identifies, relates to, or could reasonably be linked with you:</p>
        <ul>
          <li><strong>Contact Information:</strong> Name, work email address, company name, phone number, and project briefs submitted via our contact forms or Calendly booking integration.</li>
          <li><strong>Usage & Technical Data:</strong> IP addresses, browser type, operating system, device identifiers, pages viewed, time spent per page, and referral sources collected automatically via Google Analytics 4 (GA4) and Cloudflare.</li>
          <li><strong>Communications:</strong> Records and transcripts of email correspondence, scoping calls, and customer support inquiries.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    body: (
      <>
        <p>We use collected data solely for legitimate business purposes:</p>
        <ul>
          <li>Evaluating project feasibility and preparing technical scoping proposals.</li>
          <li>Scheduling and conducting technical scoping consultations via Calendly and video calls.</li>
          <li>Delivering contracted 3D configurators, architectural walkthroughs, and CGI animation deliverables.</li>
          <li>Monitoring website performance, resolving technical errors, and improving user experience.</li>
          <li>Defending against malicious crawler traffic, DDoS attempts, and automated spam.</li>
        </ul>
        <p>We process personal data on the basis of your consent (for analytics cookies), to take steps at your request before entering into a contract, to perform our contracts with clients, and for our legitimate interests in operating and securing our website.</p>
      </>
    ),
  },
  {
    id: 'third-parties',
    title: 'Service Providers We Use',
    body: (
      <>
        <p>We do not sell or rent your personal information for money. We share it only with service providers that help us run and promote our business, such as:</p>
        <ul>
          <li><strong>Google Analytics 4 &amp; Google Tag Manager</strong> — website traffic analytics and tag management.</li>
          <li><strong>Cloudflare</strong> — security, performance, and load balancing.</li>
          <li><strong>Calendly</strong> — booking scoping consultations.</li>
          <li><strong>LinkedIn Insight Tag, Meta Pixel (Facebook &amp; Instagram), and Google Ads</strong> — measuring our ad campaigns and showing Elipse Studio ads to people who have visited our website (retargeting). These run only if you accept advertising cookies where consent is required.</li>
          <li><strong>Leadsy (Instantly.ai)</strong> — identifying the companies that visit our website so we can follow up on business inquiries.</li>
          <li>Email, video-call, and cloud storage providers used to communicate with clients and deliver projects.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'international-transfers',
    title: 'International Data Transfers',
    body: (
      <p>Elipse Studio operates across the United States and Pakistan. Information collected through {SITE} may be transferred to and processed in countries outside your country of residence. We implement standard contractual clauses and robust technical safeguards to ensure your data receives equivalent protection under GDPR, UK DPA, and Singapore PDPA standards.</p>
    ),
  },
  {
    id: 'retention',
    title: 'Data Retention',
    body: (
      <p>We keep personal information only as long as needed for the purposes described in this policy — for example, for the duration of a project inquiry or client engagement and any period required by law, tax, or accounting obligations — after which it is deleted or anonymized.</p>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookie Policy & Tracking Technologies',
    body: (
      <>
        <p>We use cookies and similar tracking technologies to improve site performance and analyze visitor traffic:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for core website navigation, security, and load balancing via Cloudflare. These cannot be disabled.</li>
          <li><strong>Analytics Cookies:</strong> We utilize Google Analytics 4 to understand user engagement, measure dwell times, and identify popular case studies. GA4 collects anonymized IP data and session metrics.</li>
          <li><strong>Advertising Cookies:</strong> With your consent where required, the LinkedIn Insight Tag, Meta Pixel, and Google Ads remarketing tag record which pages you visit so we can show you relevant Elipse Studio ads on LinkedIn, Facebook, Instagram, YouTube, and Google partner sites, and measure whether those ads lead to inquiries or booked calls.</li>
          <li><strong>Managing Cookies:</strong> You can accept or reject non-essential cookies in our cookie banner and change your choice at any time using the &quot;Cookie Settings&quot; link in the website footer. You can also block cookies in your browser settings. Declining non-essential cookies will not affect your ability to view our portfolio.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your Legal Privacy Rights',
    body: (
      <>
        <p>Depending on your geographic location (including the European Union, United Kingdom, California, and Singapore), you maintain the following rights:</p>
        <ul>
          <li><strong>Right to Access:</strong> Request a copy of the personal information we hold about you.</li>
          <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Right to Erasure:</strong> Request the deletion of your personal records and project inquiry data.</li>
          <li><strong>Right to Opt-Out:</strong> Opt out of non-essential analytics tracking at any time.</li>
          <li><strong>Right to Complain:</strong> Lodge a complaint with your local data protection authority.</li>
        </ul>
        <p><strong>California residents:</strong> we do not sell personal information for money. Our use of advertising cookies to show you Elipse Studio ads on other platforms may count as &quot;sharing&quot; for cross-context behavioral advertising under California law. You can opt out at any time by selecting &quot;Reject&quot; in our Cookie Settings (footer link) or by emailing us, and we honor Global Privacy Control signals where required. We will not discriminate against you for exercising your privacy rights.</p>
        <p><strong>Exercising Rights:</strong> To exercise any of these rights, contact our Data Protection Team at {EMAIL}.</p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    body: (
      <p>We may update this Privacy Policy from time to time. The latest version will always be posted on this page with an updated &quot;Last Updated&quot; date.</p>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      currentPath="/privacy-policy"
      title="Privacy Policy"
      highlights={[
        { title: 'Your CAD stays yours', text: 'Client models, BIM files and designs are kept under strict NDA and never used to train public AI models.' },
        { title: 'No selling of data', text: 'We never sell personal information for money. Advertising cookies only run with your consent where the law requires it.' },
        { title: 'You stay in control', text: 'You can ask us to access, correct or delete your data, or opt out of analytics, at any time.' },
      ]}
      lastUpdated="November 2, 2026"
      intro={
        <>
          At Elipse Studio (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we respect your privacy and are committed to protecting the personal data and intellectual property you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit {SITE} or engage our creative 3D and spatial computing services.
        </>
      }
      sections={sections}
    />
  );
}
