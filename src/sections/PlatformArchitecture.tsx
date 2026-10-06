'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
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
import '@/styles/platform.css';

// Ordered from the bottom of the stack (how the agent presents itself) to the top (where it shows up).
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
  layerOf: (n: number, total: number) => `Layer ${n} of ${total}`,
  forAgent: 'For this agent',
  live: 'Live',
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
    layerOf: (n: number, total: number) => `الطبقة ${n} من ${total}`,
    forAgent: 'لهذا الوكيل',
    live: 'جاهز',
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
const CYCLE_MS = 2400;

export function PlatformArchitecture() {
  const t = useCopy(copy);
  const sectionRef = useReveal<HTMLElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [entering, setEntering] = useState(false);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [template, setTemplate] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Drop the layers in the first time the stack is on screen; afterwards just track visibility.
  // The entrance stagger only lasts for the drop, so later lifts respond at once.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let first = true;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting || !first) return;
        first = false;
        setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        setShown(true);
        setEntering(true);
        timer = window.setTimeout(() => setEntering(false), 110 * LAYER_COUNT + 600);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  // Walk the highlight up the stack, then move on to the next example agent.
  useEffect(() => {
    if (!autoplay || !inView || paused || reduced || entering) return;
    const id = window.setTimeout(() => {
      if (active === LAYER_COUNT - 1) {
        setTemplate((tpl) => (tpl + 1) % t.templates.length);
        setActive(0);
      } else {
        setActive(active + 1);
      }
    }, CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [active, autoplay, inView, paused, reduced, entering, t.templates.length]);

  const pickLayer = (index: number) => {
    setAutoplay(false);
    setActive(index);
  };
  const pickTemplate = (index: number) => {
    setAutoplay(false);
    setTemplate(index);
  };

  const current = t.templates[template];
  const CurrentIcon = templateIcons[template];
  const ActiveIcon = layerIcons[active];
  const layer = t.layers[active];

  return (
    <section ref={sectionRef} id="platform" className="relative overflow-hidden py-20 lg:py-28">
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

        {/* Example agents */}
        <div role="tablist" aria-label={t.examplesLabel} className="mx-auto mt-10 flex max-w-xl gap-1 rounded-2xl border border-[var(--border-color)] bg-white p-1.5 shadow-xs">
          {t.templates.map((tpl, i) => {
            const Icon = templateIcons[i];
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={template === i}
                onClick={() => pickTemplate(i)}
                className={cn(
                  'flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl px-1 py-2 text-[12px] font-semibold sm:px-2 transition-[color,background-color,box-shadow,transform] duration-200 ease-out-strong active:scale-[0.97] sm:text-sm',
                  template === i ? 'bg-[var(--blue-500)] text-white shadow-card' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                )}
              >
                <Icon aria-hidden className="hidden h-4 w-4 shrink-0 sm:block" />
                <span className="truncate">{tpl.label}</span>
              </button>
            );
          })}
        </div>

        <div
          className="mt-8 grid items-center gap-6 lg:mt-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          {/* 3D stack */}
          <div
            ref={stageRef}
            data-shown={shown || undefined}
            data-entering={entering || undefined}
            className="pf-stage relative h-[400px] [--gap:34px] [--slab-h:150px] [--slab-w:260px] [--stack-y:80px] sm:h-[560px] sm:[--gap:48px] sm:[--slab-h:200px] sm:[--slab-w:360px] sm:[--stack-y:110px]"
          >
            <div className="hero-glow opacity-60" />
            <ol aria-label={t.layersLabel} className="pf-stack">
              {t.layers.map(({ title }, index) => {
                const Icon = layerIcons[index];
                const isActive = index === active;
                return (
                  <li
                    key={index}
                    data-active={isActive || undefined}
                    className={cn('pf-slab', !reduced && 'pf-ripple')}
                    style={{ '--i': index } as CSSProperties}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && pickLayer(index)}
                    onClick={() => pickLayer(index)}
                  >
                    {/* Re-keyed per template so the ripple replays on every switch */}
                    <div key={template} className="pf-face flex flex-col justify-end p-3 sm:p-4">
                      {/* Content sits on the front edge, the part of each slab that stays visible in the stack */}
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 sm:h-8 sm:w-8',
                            isActive ? 'bg-[var(--plum-500)] text-white' : 'bg-white text-[var(--indigo-500)]'
                          )}
                        >
                          <Icon aria-hidden className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </span>
                        <span className="shrink-0 font-display text-[13px] font-semibold text-[var(--text-primary)] sm:text-[15px]">{title}</span>
                        <span className="hidden min-w-0 truncate text-[10px] text-[var(--text-muted)] sm:block sm:text-[11px]">· {current.values[index][0]}</span>
                        <span className="ms-auto font-mono text-[10px] text-[var(--text-muted)]">0{index + 1}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li aria-hidden className="pf-beam" />
            </ol>
          </div>

          {/* What the highlighted layer does for this agent */}
          <div className="glass-panel-premium relative overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style={{ background: 'var(--cta-gradient)' }}>
                  <CurrentIcon className="h-[18px] w-[18px]" />
                </span>
                <p key={template} className="panel-swap truncate font-display text-[15px] font-semibold text-[var(--text-primary)]">
                  {current.agent}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--viz-green-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--viz-green)]">
                <Check className="h-3 w-3" strokeWidth={3} />
                {t.live}
              </span>
            </div>

            <div key={`${template}-${active}`} className="panel-swap px-5 py-6 sm:px-6">
              <p className="font-mono text-[11px] font-semibold uppercase text-[var(--plum-600)]">{t.layerOf(active + 1, LAYER_COUNT)}</p>
              <h3 className="mt-2 flex items-center gap-2.5 font-display text-2xl font-bold text-[var(--text-primary)]">
                <ActiveIcon aria-hidden className="h-6 w-6 text-[var(--plum-500)]" />
                {layer.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">{layer.description}</p>
              <p className="mt-6 text-xs font-semibold text-[var(--text-muted)]">{t.forAgent}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {current.values[active].map((value, v) => (
                  <span
                    key={value}
                    className="pf-chip rounded-lg border border-[var(--plum-200)] bg-[var(--plum-50)] px-2.5 py-1 text-[13px] font-medium text-[var(--text-primary)]"
                    style={{ '--v': v } as CSSProperties}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* Layer picker + autoplay progress */}
            <div className="flex items-center gap-1.5 border-t border-[var(--border-subtle)] px-5 py-4 sm:px-6">
              {t.layers.map(({ title }, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={title}
                  aria-pressed={index === active}
                  onClick={() => pickLayer(index)}
                  className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--indigo-100)]"
                >
                  {index < active && <span className="absolute inset-0 bg-[var(--indigo-400)]" />}
                  {index === active && (
                    autoplay && inView && !paused && !reduced && !entering ? (
                      <span key={`${template}-${active}`} className="pf-progress absolute inset-0 bg-[var(--plum-500)]" style={{ '--dur': `${CYCLE_MS}ms` } as CSSProperties} />
                    ) : (
                      <span className="absolute inset-0 bg-[var(--plum-500)]" />
                    )
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
