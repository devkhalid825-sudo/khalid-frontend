import LegalPage from '@/components/legal/LegalPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';

export function generateMetadata() {
  return buildMetadata({
    title: 'Terms of Service & Commercial Conditions',
    description:
      "Read the commercial terms, intellectual property agreements, and usage conditions governing Elipse Studio's website and visualization services.",
    canonical: `${SITE_URL}/terms-and-conditions`,
  });
}

const SITE = <a href="https://elipsestudio.com">elipsestudio.com</a>;

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    body: (
      <p>By accessing or using {SITE}, you agree to be bound by these Terms of Service and all applicable international laws. If you do not agree with any part of these terms, you are prohibited from using this website.</p>
    ),
  },
  {
    id: 'studio-ip',
    title: 'Studio Intellectual Property',
    body: (
      <p>All original creative works, real-time WebGL demos, 3D renderings, case study analyses, written articles, visual animations, and proprietary software logic displayed on {SITE} are the exclusive intellectual property of Elipse Studio and are protected by international copyright, trademark, and trade dress laws.</p>
    ),
  },
  {
    id: 'website-use',
    title: 'Permitted & Prohibited Website Use',
    body: (
      <ul>
        <li><strong>Permitted Use:</strong> You are granted a limited, revocable license to access and view our website content for the purpose of evaluating our capabilities, reviewing case studies, or engaging our commercial services.</li>
        <li><strong>Prohibited Use:</strong> You may not scrape, copy, modify, distribute, reverse-engineer, or commercially exploit any 3D models, WebGL source code, videos, or copy from this website without prior written authorization from Elipse Studio.</li>
      </ul>
    ),
  },
  {
    id: 'proposals-contracts',
    title: 'Commercial Proposals & Contracts',
    body: (
      <p>Website descriptions, case study metrics, and pricing guides published on {SITE} are provided for informational and benchmarking purposes. Formal client engagements, deliverables, milestones, payment schedules, and licensing rights are governed exclusively by executed Master Services Agreements (MSAs) and Statements of Work (SOWs).</p>
    ),
  },
  {
    id: 'liability',
    title: 'Disclaimer of Warranties & Limitation of Liability',
    body: (
      <p>This website and all interactive demos are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind. Elipse Studio shall not be liable for any indirect, incidental, consequential, or punitive damages resulting from your access to or inability to access this website.</p>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    body: (
      <p>These Terms shall be governed by and construed in accordance with the laws of the State of Illinois, United States, without regard to conflict of law principles.</p>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      currentPath="/terms-and-conditions"
      title="Terms of Service"
      intro="These terms govern your use of elipsestudio.com, our interactive demos and published content. Client projects are covered separately by signed MSAs and SOWs."
      highlights={[
        { title: 'Our work is protected', text: 'Renders, WebGL demos, 3D models and code on this site belong to Elipse Studio.' },
        { title: 'Contracts rule projects', text: 'Deliverables, payments and licensing are set only by signed MSAs and SOWs.' },
        { title: 'Illinois law', text: 'These terms are governed by the laws of the State of Illinois, United States.' },
      ]}
      lastUpdated="November 2, 2026"
      sections={sections}
    />
  );
}
