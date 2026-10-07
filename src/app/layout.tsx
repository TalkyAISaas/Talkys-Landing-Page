import type { Metadata } from 'next';
import { Outfit, Inter, IBM_Plex_Mono, Noto_Sans_Arabic } from 'next/font/google';
import '../index.css';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SkipLink } from '@/components/SkipLink';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  weight: ['400', '500'],
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const siteUrl = 'https://talkys.ai';

export const metadata: Metadata = {
  title: 'Talkys AI: AI agents for calls, video and chat',
  description:
    'Talkys AI agents answer your phone calls, video calls and chats 24/7 in Arabic and English, take orders and bookings, and plug into your CRM, POS and booking stack.',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Talkys AI',
    title: 'Talkys AI: AI agents for calls, video and chat',
    description:
      'One AI agent across phone, video, WhatsApp, Instagram and your website. Speaks Arabic and English, connects to any stack.',
    url: `${siteUrl}/`,
    locale: 'en_US',
    alternateLocale: ['ar'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talkys AI: AI agents for calls, video and chat',
    description: 'One AI agent across phone, video and chat, connected to the tools you already use.',
  },
  other: {
    'theme-color': '#ffffff',
  },
};

function JsonLd() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Talkys AI',
    url: siteUrl,
    description:
      'Talkys AI is a conversational AI platform for businesses. Its agents answer phone calls, video calls and chats in Arabic and English, take orders and bookings, and hand off to people with full context.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'One-time setup plus a monthly plan based on usage. Contact us for a quote.',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Talkys AI',
      url: siteUrl,
      email: 'hello@talkys.ai',
    },
    featureList: [
      'AI voice agents for inbound and outbound calls',
      'AI video agents with lifelike avatars',
      'Chat agents on WhatsApp, Instagram, Messenger and web',
      'Arabic (including dialects), English and French',
      'Integrations with CRM, POS, booking, commerce and custom APIs',
      'Human handoff with transcript and summary',
      'Call and chat analytics',
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${outfit.variable} ${inter.variable} ${ibmPlexMono.variable} ${notoArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body>
        <LocaleProvider>
          <SkipLink />
          <Navigation />
          <div id="main-content" className="pt-[72px]">
            {children}
          </div>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
