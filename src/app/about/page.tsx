import type { Metadata } from 'next';
import { AboutContent } from './AboutContent';

export const metadata: Metadata = {
  title: 'About Talkys AI | Why we built Talkys',
  description:
    'Talkys builds AI agents that answer calls, video calls and chats for businesses across the Middle East and North Africa, in Arabic, English and French, and connect to the tools they already use.',
  alternates: { canonical: '/about/' },
  openGraph: {
    type: 'website',
    url: '/about/',
    title: 'About Talkys AI | Why we built Talkys',
    description: 'Every business deserves a 24/7 team, not just the ones with big budgets. That is why we built Talkys.',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Talkys AI',
  url: 'https://talkys.ai',
  email: 'hello@talkys.ai',
  description:
    'Talkys builds AI agents that handle phone calls, video calls and chats for businesses 24/7 in Arabic, English and French, and connect to CRMs, POS systems, calendars and delivery apps.',
  areaServed: ['MENA', 'GCC', 'Lebanon', 'Egypt', 'Jordan'],
  knowsAbout: ['AI voice agents', 'AI video agents', 'Conversational AI', 'Arabic dialects', 'CRM integration', 'POS integration'],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <AboutContent />
    </>
  );
}
