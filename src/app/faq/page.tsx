import type { Metadata } from 'next';
import { FaqContent } from './FaqContent';
import { faqCopy } from './faqItems';

export const metadata: Metadata = {
  title: 'FAQ | Talkys AI',
  description:
    'Answers about Talkys AI agents: calls, video calls and chats, Arabic dialects, integrations with your CRM and POS, data security, setup time, pricing and the 15-day free trial.',
  alternates: { canonical: '/faq/' },
  openGraph: {
    type: 'website',
    url: '/faq/',
    title: 'FAQ | Talkys AI',
    description: 'Everything you wanted to ask about Talkys AI agents for calls, video and chat.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqCopy.en.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FaqContent />
    </>
  );
}
