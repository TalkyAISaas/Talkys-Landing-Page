'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Blocks,
  CalendarClock,
  Code2,
  Database,
  Headset,
  LifeBuoy,
  MessageSquare,
  ShoppingCart,
  Store,
  Users,
  Webhook,
  type LucideIcon,
  Bike,
  Squirrel,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { useReveal } from '@/hooks/useReveal';
import { useCopy } from '@/i18n/LocaleContext';

/** `wordmark` logos already spell the brand name, so the chip shows the logo alone. */
type Tool = { name: string; logo?: string; icon?: LucideIcon; wordmark?: boolean };
type Group = { icon: LucideIcon; tools: Tool[] };

// Brand names stay in Latin script in both locales; only group titles and generic tools are translated.
const groups: Group[] = [
  {
    icon: Users,
    tools: [
      { name: 'Salesforce', logo: '/integrationsAssets/Salesforce.svg' },
      { name: 'HubSpot', logo: '/integrationsAssets/HubSpot.svg' },
      { name: 'Zoho', logo: '/integrationsAssets/zoho.svg' },
      { name: 'Odoo', logo: '/integrationsAssets/Odoo.svg' },
    ],
  },
  {
    icon: Store,
    tools: [
      { name: 'Foodics', logo: '/logos/foodics.svg', wordmark: true },
      { name: 'Omega POS', logo: '/logos/omegapos.png' },
      { name: 'Squirrel POS', icon: Squirrel },
      { name: 'Talabat', logo: '/logos/talabat.svg', wordmark: true },
      { name: 'Toters', icon: Bike },
    ],
  },
  {
    icon: ShoppingCart,
    tools: [
      { name: 'Shopify', logo: '/integrationsAssets/Shopify.svg' },
      { name: 'Salla', logo: '/integrationsAssets/Salla.svg' },
      { name: 'Stripe', logo: '/integrationsAssets/Stripe.svg' },
    ],
  },
  {
    icon: CalendarClock,
    tools: [
      { name: 'Google Calendar', logo: '/integrationsAssets/GoogleCalendar.svg' },
      { name: 'Calendly', logo: '/integrationsAssets/Calendly.svg' },
      { name: 'Cal.com', logo: '/integrationsAssets/CalCom.svg' },
    ],
  },
  {
    icon: MessageSquare,
    tools: [
      { name: 'WhatsApp', logo: '/integrationsAssets/Whatsapp.svg' },
      { name: 'Instagram & Messenger', logo: '/integrationsAssets/Meta.svg' },
      { name: 'Telegram', logo: '/integrationsAssets/Telegram.svg' },
      { name: 'Twilio', logo: '/integrationsAssets/Twilio.svg' },
    ],
  },
  {
    icon: LifeBuoy,
    tools: [
      { name: 'Zendesk', logo: '/integrationsAssets/Zendesk.svg' },
      { name: 'Intercom', logo: '/integrationsAssets/Intercom.svg' },
      { name: 'Freshdesk', icon: Headset },
    ],
  },
];

const customIcons: LucideIcon[] = [Code2, Webhook, Database];

const copy = {
  en: {
    eyebrow: 'Integrations',
    titleLead: 'Connects to',
    titleAccent: 'any stack.',
    description:
      'Orders land in your POS, bookings in your calendar, leads in your CRM. Talkys works with the tools you already run, so nothing changes for your team except fewer missed calls.',
    groups: ['CRM', 'POS & delivery', 'Commerce & payments', 'Calendars & booking', 'Messaging', 'Helpdesk'],
    customTitle: 'Custom APIs & webhooks',
    customText: 'Running something in-house? If it has an API, a webhook or a database, the agent can read from it and write to it.',
    custom: ['REST APIs', 'Webhooks', 'In-house systems'],
    missing: 'Don’t see yours? We connect it during setup.',
    cta: 'Talk to us',
  },
  ar: {
    eyebrow: 'التكاملات',
    titleLead: 'يتصل بأي',
    titleAccent: 'نظام تعمل عليه.',
    description:
      'الطلبات تصل إلى نظام نقاط البيع، والحجوزات إلى تقويمك، والعملاء المحتملون إلى نظام CRM. يعمل Talkys مع الأدوات التي تستخدمها أصلًا، فلا يتغيّر شيء على فريقك سوى عدد أقل من المكالمات الفائتة.',
    groups: ['أنظمة CRM', 'نقاط البيع والتوصيل', 'التجارة والمدفوعات', 'التقويمات والحجوزات', 'المراسلة', 'الدعم الفني'],
    customTitle: 'واجهات API مخصصة وWebhooks',
    customText: 'لديك نظام داخلي خاص؟ إن كان يملك واجهة API أو Webhook أو قاعدة بيانات، يستطيع الوكيل القراءة منه والكتابة فيه.',
    custom: ['واجهات REST API', 'Webhooks', 'الأنظمة الداخلية'],
    missing: 'لا تجد نظامك؟ نربطه لك خلال الإعداد.',
    cta: 'تحدّث إلينا',
  },
};

function ToolChip({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <li className="flex min-h-12 items-center gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3.5">
      {tool.logo ? (
        tool.wordmark ? (
          <img src={tool.logo} alt={tool.name} loading="lazy" className="h-5 w-auto max-w-[110px] object-contain" />
        ) : (
          <img src={tool.logo} alt="" width={24} height={24} loading="lazy" className="h-6 w-6 shrink-0 object-contain" />
        )
      ) : (
        Icon && <Icon aria-hidden className="h-5 w-5 shrink-0 text-[var(--indigo-400)]" />
      )}
      {!tool.wordmark && <span className="text-sm font-medium leading-tight text-[var(--text-primary)]">{tool.name}</span>}
    </li>
  );
}

export function IntegrationsSection() {
  const t = useCopy(copy);
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="integrations" className="relative py-20 lg:py-28">
      <div className="brand-rule absolute inset-x-0 top-0 opacity-40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleLead} <span className="gradient-text">{t.titleAccent}</span>
            </>
          }
          description={t.description}
        />

        <div data-reveal-group className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ icon: Icon, tools }, index) => (
            <article key={t.groups[index]} className="glass-panel-premium p-6">
              <h3 className="flex items-center gap-2.5 font-display text-base font-semibold text-[var(--text-primary)]">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--indigo-50)] text-[var(--indigo-500)]">
                  <Icon className="h-4 w-4" />
                </span>
                {t.groups[index]}
              </h3>
              <ul className="mt-5 grid grid-cols-2 gap-2">
                {tools.map((tool) => (
                  <ToolChip key={tool.name} tool={tool} />
                ))}
              </ul>
            </article>
          ))}

          {/* Custom APIs & webhooks: spans the full row */}
          <article className="glass-panel-premium relative overflow-hidden p-6 md:col-span-2 lg:col-span-3 lg:p-8">
            <div className="hero-glow opacity-40" />
            <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-[var(--text-primary)]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ background: 'var(--cta-gradient)' }}>
                    <Blocks className="h-4 w-4" />
                  </span>
                  {t.customTitle}
                </h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--text-secondary)]">{t.customText}</p>
              </div>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {t.custom.map((name, i) => {
                  const Icon = customIcons[i];
                  return (
                    <li key={name} className="flex min-h-12 items-center gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3.5">
                      <Icon aria-hidden className="h-5 w-5 shrink-0 text-[var(--indigo-400)]" />
                      <span className="text-sm font-medium leading-tight text-[var(--text-primary)]">{name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        </div>

        <div data-reveal className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
          <p className="font-display text-lg font-semibold text-[var(--text-primary)]">{t.missing}</p>
          <Button asChild variant="brand-outline" size="lg">
            <Link href="/#contact">
              {t.cta}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
