'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import {
  BookOpen,
  CalendarCheck,
  Car,
  Check,
  Database,
  Headphones,
  Languages,
  Plug,
  Radio,
  UserCircle,
  UtensilsCrossed,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { useReveal } from '@/hooks/useReveal';
import { useCopy } from '@/i18n/LocaleContext';
import { cn } from '@/lib/utils';

// Ordered from how the agent presents itself down to where it shows up.
const layerIcons: LucideIcon[] = [UserCircle, BookOpen, Languages, Plug, Zap, Database, Radio];
const templateIcons: LucideIcon[] = [CalendarCheck, UtensilsCrossed, Car, Headphones];

// The same seven layers, configured for four different businesses (illustrative).
const en = {
  eyebrow: 'Inside a Talkys agent',
  titleLead: 'Built around',
  titleAccent: 'how your business actually runs.',
  description: 'Seven layers, set up for you by our team. Pick an example and watch one come together.',
  layersLabel: 'What a Talkys agent is made of',
  examplesLabel: 'Example agents',
  progress: (built: number, total: number) => `${built} of ${total} layers`,
  live: 'Live',
  building: 'Building',
  layers: [
    { title: 'Persona', description: 'Its name, tone and manners, so it sounds like your best front-desk person.' },
    { title: 'Knowledge', description: 'Your menu, prices, services, opening hours, policies and FAQs.' },
    { title: 'Voice and language', description: 'A natural voice in Gulf, Levantine or Egyptian Arabic, English or French, switching when your customer does.' },
    { title: 'Tools', description: 'The systems it reads and writes: CRM, POS, calendar, delivery apps, helpdesk or your own API.' },
    { title: 'Actions', description: 'What it is allowed to do: book, order, quote, confirm, reschedule or hand off.' },
    { title: 'Memory', description: 'Who is calling, what they ordered last time and what they prefer.' },
    { title: 'Channels', description: 'Phone, video, WhatsApp, Instagram, Messenger, web chat, SMS and email.' },
  ],
  templates: [
    {
      label: 'Receptionist',
      agent: 'Clinic receptionist',
      values: [
        ['Warm, reassuring', 'Discreet'],
        ['Doctors and specialties', 'Opening hours', 'Insurance accepted'],
        ['Levantine Arabic', 'English', 'French'],
        ['Google Calendar', 'Zoho CRM'],
        ['Book appointment', 'Reschedule', 'Send reminder'],
        ['Returning patient', 'Prefers mornings'],
        ['Phone', 'WhatsApp', 'Web chat'],
      ],
    },
    {
      label: 'Orders',
      agent: 'Restaurant order taker',
      values: [
        ['Friendly, quick', 'Suggests add-ons'],
        ['Full menu and prices', 'Delivery zones', 'Daily specials'],
        ['Gulf Arabic', 'English'],
        ['Foodics', 'Talabat', 'Stripe'],
        ['Take order', 'Confirm delivery time', 'Send payment link'],
        ['Usual: mixed grill', 'Saved address'],
        ['Phone', 'WhatsApp', 'Instagram'],
      ],
    },
    {
      label: 'Sales',
      agent: 'Car dealership sales agent',
      values: [
        ['Confident, helpful', 'Never pushy'],
        ['Models and trims', 'Offers and financing', 'Showroom hours'],
        ['Gulf Arabic', 'Egyptian Arabic', 'English'],
        ['Salesforce', 'Cal.com'],
        ['Qualify budget', 'Book test drive', 'Send brochure'],
        ['Interested in SUVs', 'Asked about financing'],
        ['Phone', 'Video', 'WhatsApp'],
      ],
    },
    {
      label: 'Support',
      agent: 'Online store support agent',
      values: [
        ['Calm, patient', 'Solves it first time'],
        ['Return policy', 'Shipping times', 'Size guides'],
        ['Arabic', 'English', 'French'],
        ['Shopify', 'Zendesk', 'Delivery tracking'],
        ['Track order', 'Start a return', 'Hand off to a person'],
        ['Order #4821 in transit'],
        ['WhatsApp', 'Web chat', 'Email'],
      ],
    },
  ],
};

const copy: { en: typeof en; ar: typeof en } = {
  en,
  ar: {
    eyebrow: 'داخل وكيل Talkys',
    titleLead: 'مصمَّم حول',
    titleAccent: 'طريقة عمل نشاطك الفعلية.',
    description: 'سبع طبقات يجهّزها فريقنا لك. اختر مثالاً وشاهد الوكيل يكتمل أمامك.',
    layersLabel: 'مكوّنات وكيل Talkys',
    examplesLabel: 'أمثلة على الوكلاء',
    progress: (built: number, total: number) => `${built} من ${total} طبقات`,
    live: 'جاهز',
    building: 'قيد الإعداد',
    layers: [
      { title: 'الشخصية', description: 'اسمه ونبرته وأسلوبه، ليبدو كأفضل موظف استقبال لديك.' },
      { title: 'المعرفة', description: 'قائمتك وأسعارك وخدماتك ومواعيد العمل والسياسات والأسئلة الشائعة.' },
      { title: 'الصوت واللغة', description: 'صوت طبيعي باللهجة الخليجية أو الشامية أو المصرية أو بالإنجليزية أو الفرنسية، ينتقل بينها كما يفعل عميلك.' },
      { title: 'الأدوات', description: 'الأنظمة التي يقرأ منها ويكتب فيها: CRM ونقاط البيع والتقويم وتطبيقات التوصيل ومنصة الدعم أو واجهتك البرمجية الخاصة.' },
      { title: 'الإجراءات', description: 'ما يُسمح له بفعله: الحجز والطلب وتقديم عروض الأسعار والتأكيد وإعادة الجدولة والتحويل إلى موظف.' },
      { title: 'الذاكرة', description: 'من المتصل، وماذا طلب في المرة السابقة، وما الذي يفضّله.' },
      { title: 'القنوات', description: 'الهاتف والفيديو وWhatsApp وInstagram وMessenger والدردشة على الموقع والرسائل النصية والبريد الإلكتروني.' },
    ],
    templates: [
      {
        label: 'الاستقبال',
        agent: 'موظف استقبال لعيادة',
        values: [
          ['دافئ ومطمئن', 'متحفّظ'],
          ['الأطباء والتخصصات', 'مواعيد العمل', 'شركات التأمين المعتمدة'],
          ['العربية الشامية', 'الإنجليزية', 'الفرنسية'],
          ['Google Calendar', 'Zoho CRM'],
          ['حجز موعد', 'إعادة جدولة', 'إرسال تذكير'],
          ['مريض سابق', 'يفضّل الصباح'],
          ['الهاتف', 'WhatsApp', 'دردشة الموقع'],
        ],
      },
      {
        label: 'الطلبات',
        agent: 'مستقبل طلبات لمطعم',
        values: [
          ['ودود وسريع', 'يقترح إضافات'],
          ['القائمة والأسعار', 'مناطق التوصيل', 'أطباق اليوم'],
          ['العربية الخليجية', 'الإنجليزية'],
          ['Foodics', 'Talabat', 'Stripe'],
          ['أخذ الطلب', 'تأكيد وقت التوصيل', 'إرسال رابط الدفع'],
          ['طلبه المعتاد: مشاوي مشكّلة', 'عنوان محفوظ'],
          ['الهاتف', 'WhatsApp', 'Instagram'],
        ],
      },
      {
        label: 'المبيعات',
        agent: 'مندوب مبيعات لوكالة سيارات',
        values: [
          ['واثق ومتعاون', 'لا يضغط على العميل'],
          ['الطرازات والفئات', 'العروض والتمويل', 'مواعيد المعرض'],
          ['العربية الخليجية', 'العربية المصرية', 'الإنجليزية'],
          ['Salesforce', 'Cal.com'],
          ['تقييم الميزانية', 'حجز تجربة قيادة', 'إرسال الكتيّب'],
          ['مهتم بسيارات SUV', 'سأل عن التمويل'],
          ['الهاتف', 'الفيديو', 'WhatsApp'],
        ],
      },
      {
        label: 'الدعم',
        agent: 'وكيل دعم لمتجر إلكتروني',
        values: [
          ['هادئ وصبور', 'يحلّ المشكلة من أول مرة'],
          ['سياسة الإرجاع', 'مدة الشحن', 'دليل المقاسات'],
          ['العربية', 'الإنجليزية', 'الفرنسية'],
          ['Shopify', 'Zendesk', 'تتبّع الشحنات'],
          ['تتبّع الطلب', 'بدء الإرجاع', 'التحويل إلى موظف'],
          ['الطلب #4821 قيد التوصيل'],
          ['WhatsApp', 'دردشة الموقع', 'البريد الإلكتروني'],
        ],
      },
    ],
  },
};

const LAYER_COUNT = layerIcons.length;
const LAYER_MS = 420;

export function PlatformArchitecture() {
  const t = useCopy(copy);
  const sectionRef = useReveal<HTMLElement>();
  const [built, setBuilt] = useState(0); // how many layers are configured
  const [started, setStarted] = useState(false);
  const [template, setTemplate] = useState(0);
  const [focus, setFocus] = useState<number | null>(null);

  // Build once, the first time the panel is properly in view.
  useEffect(() => {
    const el = sectionRef.current?.querySelector('.agent-panel');
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        io.disconnect();
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sectionRef]);

  useEffect(() => {
    if (!started || built >= LAYER_COUNT) return;
    // Reduced motion: complete the build in one step instead of layer by layer.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(
      () => setBuilt((b) => (reduced ? LAYER_COUNT : b + 1)),
      reduced ? 0 : built === 0 ? 250 : LAYER_MS
    );
    return () => window.clearTimeout(timer);
  }, [started, built]);

  const current = t.templates[template];
  const CurrentIcon = templateIcons[template];
  const live = built >= LAYER_COUNT;
  const buildingIndex = live ? -1 : built; // the layer being added right now

  return (
    <section ref={sectionRef} id="platform" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleLead} <span className="gradient-text">{t.titleAccent}</span>
            </>
          }
          description={t.description}
        />

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
          {/* The layers */}
          <ol aria-label={t.layersLabel} className="space-y-1">
            {t.layers.map(({ title, description }, index) => {
              const Icon = layerIcons[index];
              const state = index < built ? 'done' : index === buildingIndex && started ? 'building' : 'waiting';
              return (
                <li key={index}>
                  <button
                    type="button"
                    data-state={state}
                    data-focus={focus === index || undefined}
                    onClick={() => setFocus(focus === index ? null : index)}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setFocus(index)}
                    onPointerLeave={(e) => e.pointerType === 'mouse' && setFocus(null)}
                    aria-pressed={focus === index}
                    className="arch-row group flex w-full items-start gap-4 rounded-2xl px-4 py-3.5 text-start"
                  >
                    <span className="arch-row-icon mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-base font-semibold text-[var(--text-primary)]">{title}</span>
                      <span className="mt-0.5 block text-[14px] leading-relaxed text-[var(--text-secondary)]">{description}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* The agent being assembled */}
          <div className="agent-panel glass-panel-premium overflow-hidden lg:sticky lg:top-28">
            {/* Example agents: pick one first, then watch it build */}
            <div role="tablist" aria-label={t.examplesLabel} className="flex gap-1 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] p-2">
              {t.templates.map((tpl, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={template === i}
                  onClick={() => setTemplate(i)}
                  className={cn(
                    'min-w-0 flex-1 truncate rounded-lg px-2 py-2 text-[13px] font-semibold transition-[color,background-color,box-shadow,transform] duration-150 ease-out-strong active:scale-[0.97] sm:px-3 sm:text-sm',
                    template === i ? 'bg-white text-[var(--indigo-600)] shadow-xs' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )}
                >
                  {tpl.label}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style={{ background: 'var(--cta-gradient)' }}>
                  <CurrentIcon className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <p key={template} className="agent-swap font-display text-[15px] font-semibold leading-snug text-[var(--text-primary)] sm:truncate">
                    {current.agent}
                  </p>
                  <p className="font-mono text-[11px] tabular-nums text-[var(--text-muted)]">{t.progress(built, LAYER_COUNT)}</p>
                </div>
              </div>
              <span
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors duration-200',
                  live ? 'bg-[var(--viz-green-soft)] text-[var(--viz-green)]' : 'bg-[var(--indigo-50)] text-[var(--indigo-600)]'
                )}
              >
                {live ? <Check className="h-3 w-3" strokeWidth={3} /> : <span className="agent-dot h-1.5 w-1.5 rounded-full bg-current" />}
                {live ? t.live : t.building}
              </span>
            </div>

            <ul className="divide-y divide-[var(--border-subtle)]">
              {t.layers.map(({ title }, index) => {
                const Icon = layerIcons[index];
                return (
                  <li
                    key={index}
                    data-on={index < built || undefined}
                    data-focus={focus === index || undefined}
                    className="agent-row flex items-start gap-3 px-5 py-3 sm:px-6"
                  >
                    <Icon className="mt-1 h-4 w-4 shrink-0 text-[var(--indigo-400)]" />
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{title}</p>
                      <div key={template} className="mt-1.5 flex flex-wrap gap-1.5">
                        {current.values[index].map((value, v) => (
                          <span
                            key={value}
                            className="agent-chip rounded-md border border-[var(--border-color)] bg-[var(--bg-primary)] px-2 py-0.5 text-[13px] font-medium text-[var(--text-primary)]"
                            style={{ '--v': v } as CSSProperties}
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
