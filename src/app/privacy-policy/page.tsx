import type { Metadata } from 'next';
import { PrivacyContent } from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | Talkys AI',
  description:
    'How Talkys AI collects, uses and protects information on its website and when its AI agents handle calls, video calls and chats for businesses.',
  alternates: { canonical: '/privacy-policy/' },
};

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}
