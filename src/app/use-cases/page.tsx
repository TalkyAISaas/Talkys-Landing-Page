import type { Metadata } from 'next';
import { UseCasesContent } from './UseCasesContent';

export const metadata: Metadata = {
  title: 'Solutions by industry | Talkys AI',
  description:
    'See how Talkys AI agents handle calls, video calls and chats for restaurants, hotels, car dealerships, retail, clinics, real estate, salons and logistics, and update your CRM, POS and calendar as they go.',
  alternates: { canonical: '/use-cases/' },
  openGraph: {
    type: 'website',
    url: '/use-cases/',
    title: 'Solutions by industry | Talkys AI',
    description:
      'Orders, bookings, test drives, appointments and deliveries handled 24/7 on phone, video and chat, in Arabic and English.',
  },
};

export default function UseCasesPage() {
  return <UseCasesContent />;
}
