'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bike,
  Blocks,
  CalendarClock,
  Code2,
  Database,
  Headset,
  LifeBuoy,
  MessageSquare,
  ShoppingCart,
  Squirrel,
  Store,
  Users,
  Webhook,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { useReveal } from '@/hooks/useReveal';
import { useCopy } from '@/i18n/LocaleContext';
import { cn } from '@/lib/utils';

/** `wordmark` logos already spell the brand name, so the tile shows the logo larger and no icon box. */
type Tool = { name: string; logo?: string; icon?: LucideIcon; wordmark?: boolean };
type Category = { id: string; icon: LucideIcon; tools: Tool[] };

// Brand names stay in Latin script in both locales; generic tools are named in the copy.
const categories: Category[] = [
  {
    id: 'pos',
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
    id: 'crm',
    icon: Users,
    tools: [
      { name: 'Salesforce', logo: '/integrationsAssets/Salesforce.svg' },
      { name: 'HubSpot', logo: '/integrationsAssets/HubSpot.svg' },
      { name: 'Zoho', logo: '/integrationsAssets/zoho.svg' },
      { name: 'Odoo', logo: '/integrationsAssets/Odoo.svg' },
    ],
  },
  {
    id: 'commerce',
    icon: ShoppingCart,
    tools: [
      { name: 'Shopify', logo: '/integrationsAssets/Shopify.svg' },
      { name: 'Salla', logo: '/integrationsAssets/Salla.svg' },
      { name: 'Stripe', logo: '/integrationsAssets/Stripe.svg' },
    ],
  },
  {
    id: 'calendars',
    icon: CalendarClock,
    tools: [
      { name: 'Google Calendar', logo: '/integrationsAssets/GoogleCalendar.svg' },
      { name: 'Calendly', logo: '/integrationsAssets/Calendly.svg' },
      { name: 'Cal.com', logo: '/integrationsAssets/CalCom.svg' },
    ],
  },
  {
    id: 'messaging',
    icon: MessageSquare,
    tools: [
      { name: 'WhatsApp', logo: '/integrationsAssets/Whatsapp.svg' },
      { name: 'Instagram & Messenger', logo: '/integrationsAssets/Meta.svg' },
      { name: 'Telegram', logo: '/integrationsAssets/Telegram.svg' },
      { name: 'Twilio', logo: '/integrationsAssets/Twilio.svg' },
    ],
  },
  {
    id: 'helpdesk',
    icon: LifeBuoy,
    tools: [
      { name: 'Zendesk', logo: '/integrationsAssets/Zendesk.svg' },
      { name: 'Intercom', logo: '/integrationsAssets/Intercom.svg' },
      { name: 'Freshdesk', icon: Headset },
    ],
  },
  {
    id: 'custom',
    icon: Blocks,
    tools: [
      { name: 'REST APIs', icon: Code2 },
      { name: 'Webhooks', icon: Webhook },
      { name: 'In-house systems', icon: Database },
    ],
  },
];

/** How long each category stays up while the section cycles on its own. */
const AUTOPLAY_MS = 500;

type CategoryCopy = { name: string; pitch: string; actions: string[]; toolNames?: string[] };

const copy = {
  en: {
    eyebrow: 'Integrations',
    titleLead: 'Connects to',
    titleAccent: 'any stack.',
    description:
      'Orders land in your POS, bookings in your calendar, leads in your CRM. Talkys works with the tools you already run, so nothing changes for your team except fewer missed calls.',
    tabsLabel: 'Integration categories',
    tools: (n: number) => `${n} tools`,
    categories: [
      {
        name: 'POS & delivery',
        pitch: 'Orders taken on calls and chat go straight to the kitchen and the driver.',
        actions: ['Orders sent to the kitchen', 'Orders and menu in sync', 'Orders and table status', 'Delivery orders and status', 'Delivery requests and tracking'],
      },
      {
        name: 'CRM',
        pitch: 'Every caller becomes a contact, every conversation a logged activity.',
        actions: ['Leads, contacts and call logs', 'Contacts, deals and notes', 'Leads and follow-up tasks', 'Contacts and sales orders'],
      },
      {
        name: 'Commerce & payments',
        pitch: 'Checks stock, shares products and sends payment links mid-conversation.',
        actions: ['Stock, orders and tracking', 'Products and order status', 'Payment links and receipts'],
      },
      {
        name: 'Calendars & booking',
        pitch: 'Books, moves and confirms appointments against your live availability.',
        actions: ['Live availability and bookings', 'Booking links and reschedules', 'Event types and open slots'],
      },
      {
        name: 'Messaging',
        pitch: 'Answers and confirms on the apps your customers already use.',
        actions: ['Chats, voice notes and confirmations', 'DMs and story replies', 'Bot conversations', 'Phone numbers and SMS'],
      },
      {
        name: 'Helpdesk',
        pitch: 'Opens a ticket with a summary whenever a person needs to step in.',
        actions: ['Tickets with the full transcript', 'Conversations and handoff', 'Tickets and priorities'],
      },
      {
        name: 'Custom APIs',
        pitch: 'Running something in-house? If it has an API, a webhook or a database, the agent can read from it and write to it.',
        actions: ['Read and write any endpoint', 'Push events to your systems', 'Databases and internal tools'],
        toolNames: ['REST APIs', 'Webhooks', 'In-house systems'],
      },
    ] as CategoryCopy[],
    missing: 'Don’t see yours? We connect it during setup.',
    cta: 'Talk to us',
  },
  ar: {
    eyebrow: 'التكاملات',
    titleLead: 'يتصل بأي',
    titleAccent: 'نظام تعمل عليه.',
    description:
      'الطلبات تصل إلى نظام نقاط البيع، والحجوزات إلى تقويمك، والعملاء المحتملون إلى نظام CRM. يعمل Talkys مع الأدوات التي تستخدمها أصلًا، فلا يتغيّر شيء على فريقك سوى عدد أقل من المكالمات الفائتة.',
    tabsLabel: 'فئات التكاملات',
    tools: (n: number) => `${n} أدوات`,
    categories: [
      {
        name: 'نقاط البيع والتوصيل',
        pitch: 'الطلبات التي تُستقبل عبر المكالمات والمحادثات تصل مباشرة إلى المطبخ والسائق.',
        actions: ['الطلبات تصل إلى المطبخ', 'مزامنة الطلبات والقائمة', 'الطلبات وحالة الطاولات', 'طلبات التوصيل وحالتها', 'طلبات التوصيل وتتبّعها'],
      },
      {
        name: 'أنظمة CRM',
        pitch: 'كل متصل يصبح جهة اتصال، وكل محادثة نشاطاً مسجّلاً.',
        actions: ['العملاء المحتملون وجهات الاتصال وسجل المكالمات', 'جهات الاتصال والصفقات والملاحظات', 'العملاء المحتملون ومهام المتابعة', 'جهات الاتصال وأوامر البيع'],
      },
      {
        name: 'التجارة والمدفوعات',
        pitch: 'يتحقّق من المخزون ويعرض المنتجات ويرسل روابط الدفع أثناء المحادثة.',
        actions: ['المخزون والطلبات والتتبّع', 'المنتجات وحالة الطلبات', 'روابط الدفع والإيصالات'],
      },
      {
        name: 'التقويمات والحجوزات',
        pitch: 'يحجز المواعيد وينقلها ويؤكّدها وفق التوفّر الفعلي لديك.',
        actions: ['التوفّر المباشر والحجوزات', 'روابط الحجز وإعادة الجدولة', 'أنواع المواعيد والأوقات المتاحة'],
      },
      {
        name: 'المراسلة',
        pitch: 'يرد ويؤكّد على التطبيقات التي يستخدمها عملاؤك أصلاً.',
        actions: ['المحادثات والرسائل الصوتية والتأكيدات', 'الرسائل والردود على القصص', 'محادثات البوت', 'أرقام الهاتف والرسائل النصية'],
      },
      {
        name: 'الدعم الفني',
        pitch: 'يفتح تذكرة مع ملخص كلما احتاج الأمر إلى تدخّل موظف.',
        actions: ['تذاكر مع النص الكامل للمحادثة', 'المحادثات والتحويل إلى الفريق', 'التذاكر والأولويات'],
      },
      {
        name: 'واجهات API مخصصة',
        pitch: 'لديك نظام داخلي خاص؟ إن كان يملك واجهة API أو Webhook أو قاعدة بيانات، يستطيع الوكيل القراءة منه والكتابة فيه.',
        actions: ['قراءة وكتابة أي واجهة', 'إرسال الأحداث إلى أنظمتك', 'قواعد البيانات والأدوات الداخلية'],
        toolNames: ['واجهات REST API', 'Webhooks', 'الأنظمة الداخلية'],
      },
    ] as CategoryCopy[],
    missing: 'لا تجد نظامك؟ نربطه لك خلال الإعداد.',
    cta: 'تحدّث إلينا',
  },
};

function ToolTile({ tool, name, action }: { tool: Tool; name: string; action: string }) {
  const Icon = tool.icon;
  return (
    <li className="flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 sm:p-5 transition-[border-color,box-shadow,transform] duration-200 ease-out-strong hover:-translate-y-0.5 hover:border-[var(--indigo-200)] hover:shadow-card">
      <div className="flex h-12 items-center">
        {tool.logo ? (
          tool.wordmark ? (
            <img src={tool.logo} alt={name} loading="lazy" className="h-6 w-auto max-w-full object-contain sm:h-7" />
          ) : (
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-white">
              <img src={tool.logo} alt="" width={28} height={28} loading="lazy" className="h-7 w-7 object-contain" />
            </span>
          )
        ) : (
          Icon && (
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--indigo-50)] text-[var(--indigo-500)]">
              <Icon aria-hidden className="h-6 w-6" />
            </span>
          )
        )}
      </div>
      <p className={cn('mt-4 font-display text-base font-semibold text-[var(--text-primary)]', tool.wordmark && 'sr-only')}>{name}</p>
      <p className={cn('text-sm leading-snug text-[var(--text-muted)]', tool.wordmark ? 'mt-4' : 'mt-1')}>{action}</p>
    </li>
  );
}

export function IntegrationsSection() {
  const t = useCopy(copy);
  const sectionRef = useReveal<HTMLElement>();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  // Cycle only while on screen and not hovered or focused; never under reduced motion.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || !inView || paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % categories.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, autoplay, inView, paused]);

  // On mobile the pills scroll sideways: keep the active one centred as it cycles.
  useEffect(() => {
    const tab = tabRefs.current[active];
    const scroller = tab?.closest<HTMLElement>('.overflow-x-auto');
    if (!tab || !scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    const t = tab.getBoundingClientRect();
    const s = scroller.getBoundingClientRect();
    scroller.scrollBy({ left: t.left + t.width / 2 - (s.left + s.width / 2), behavior: 'smooth' });
  }, [active]);

  const select = (index: number, focus = false) => {
    setAutoplay(false);
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  // Vertical list on desktop, horizontal pills on mobile: accept both arrow axes.
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const n = categories.length;
    const rtl = document.documentElement.dir === 'rtl';
    const next = { ArrowDown: 1, ArrowUp: -1, ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[event.key];
    if (next !== undefined) select((active + next + n) % n, true);
    else if (event.key === 'Home') select(0, true);
    else if (event.key === 'End') select(n - 1, true);
    else return;
    event.preventDefault();
  };

  const category = categories[active];
  const text = t.categories[active];
  const CategoryIcon = category.icon;

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

        <div
          ref={stageRef}
          data-reveal
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="mt-14 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8"
        >
          {/* Categories */}
          <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 lg:overflow-visible">
            <div role="tablist" aria-label={t.tabsLabel} className="flex w-max gap-2 lg:w-auto lg:flex-col lg:gap-1.5">
              {categories.map((c, index) => {
                const Icon = c.icon;
                const selected = index === active;
                return (
                  <button
                    key={c.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`integration-tab-${c.id}`}
                    aria-selected={selected}
                    aria-controls="integration-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(index)}
                    onKeyDown={onTabKey}
                    className={cn(
                      'group flex items-center gap-3 whitespace-nowrap rounded-full border px-4 py-2 text-start text-sm font-medium transition-[color,background-color,border-color,box-shadow] duration-200 ease-out-strong lg:rounded-xl lg:px-3.5 lg:py-3',
                      selected
                        ? 'border-[var(--indigo-200)] bg-white text-[var(--text-primary)] shadow-card'
                        : 'border-[var(--border-color)] bg-white text-[var(--text-secondary)] hover:text-[var(--text-primary)] lg:border-transparent lg:bg-transparent lg:hover:bg-white/70'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200',
                        selected ? 'bg-[var(--blue-500)] text-white' : 'bg-[var(--indigo-50)] text-[var(--indigo-500)]'
                      )}
                    >
                      <Icon aria-hidden className="h-4 w-4" />
                    </span>
                    <span className="flex-1">{t.categories[index].name}</span>
                    <span className="hidden text-xs text-[var(--text-muted)] lg:inline">{t.tools(c.tools.length)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logo wall */}
          <div
            id="integration-panel"
            role="tabpanel"
            aria-labelledby={`integration-tab-${category.id}`}
            className="glass-panel-premium relative overflow-hidden p-6 sm:p-8"
          >
            <div className="hero-glow opacity-40" />
            <div key={category.id} className="panel-swap relative">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-cta" style={{ background: 'var(--cta-gradient)' }}>
                  <CategoryIcon aria-hidden className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">{text.name}</h3>
                  <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-[var(--text-secondary)]">{text.pitch}</p>
                </div>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-3">
                {category.tools.map((tool, i) => (
                  <ToolTile key={tool.name} tool={tool} name={text.toolNames?.[i] ?? tool.name} action={text.actions[i]} />
                ))}
              </ul>
            </div>
          </div>
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
