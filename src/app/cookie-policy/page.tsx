import type { Metadata } from 'next';
import { CookieContent } from './CookieContent';

export const metadata: Metadata = {
  title: 'Cookie Policy | Talkys AI',
  description:
    'How the Talkys AI website uses cookies and browser storage: no analytics or advertising cookies, only your language preference.',
  alternates: { canonical: '/cookie-policy/' },
};

export default function CookiePolicyPage() {
  return <CookieContent />;
}
