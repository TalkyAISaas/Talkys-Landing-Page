import type { Metadata } from 'next';
import { TermsContent } from './TermsContent';

export const metadata: Metadata = {
  title: 'Terms of Service | Talkys AI',
  description:
    'The terms that govern your use of the Talkys AI website and platform: AI agents for phone calls, video calls and chats.',
  alternates: { canonical: '/terms-of-service/' },
};

export default function TermsOfServicePage() {
  return <TermsContent />;
}
