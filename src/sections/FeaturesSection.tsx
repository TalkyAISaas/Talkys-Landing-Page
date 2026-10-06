'use client';

import { useEffect, type CSSProperties, type ReactNode } from 'react';
import {
  BarChart3,
  BookOpen,
  Bot,
  Captions,
  CalendarDays,
  Check,
  Database,
  Globe,
  Instagram,
  Languages,
  MessageCircle,
  MessagesSquare,
  Mic,
  Phone,
  Plug,
  ShoppingBag,
  Store,
  Bike,
  TrendingUp,
  UserRound,
  Users,
  Video,
  FileText,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { useReveal } from '@/hooks/useReveal';
import { useCopy } from '@/i18n/LocaleContext';
import '@/styles/features.css';

/* ── Copy: card text plus the illustrative mock content inside each scene ── */

const en = {
  eyebrow: 'What Talkys can do',
  titleLead: 'Everything your front line needs,',
  titleAccent: 'on every channel.',
  description: 'One agent that talks, chats, books and sells, connected to the tools you already use.',
  cards: {
    voice: { title: 'Live voice calls', description: 'Answers your phone line in real time with a natural voice. No menus, no hold music, no missed calls at 2 AM.' },
    video: { title: 'Live video calls', description: 'A lifelike AI avatar that greets customers face to face on your website or kiosk, live, not pre-recorded.' },
    chat: { title: 'WhatsApp, Instagram and web chat', description: 'Replies to DMs, WhatsApp messages and website chats in seconds, with the same knowledge as your phone line.' },
    languages: { title: 'Arabic dialects, English and French', description: 'Gulf, Levantine and Egyptian Arabic, Modern Standard Arabic, English and French, switching mid-sentence when your customer does.' },
    knowledge: { title: 'Your knowledge base', description: 'Learns your menu, price lists, services, policies and FAQs, and answers only from what you gave it.' },
    tools: { title: 'Connects to any stack', description: 'Salesforce, HubSpot, Zoho, Odoo, Foodics, Talabat, Shopify, Salla, Google Calendar and more, plus webhooks and APIs for anything custom.' },
    orders: { title: 'Orders and bookings', description: 'Takes orders, books tables, appointments and test drives, sends payment links and confirms everything on WhatsApp or SMS.' },
    memory: { title: 'Memory', description: 'Remembers returning customers, their usual order and their preferences, across calls and chats.' },
    handoff: { title: 'Human handoff', description: 'Brings in your team when it matters, with a summary and the full transcript so nobody asks twice.' },
    analytics: { title: 'Analytics', description: 'Every call and chat is logged, transcribed and searchable. See what customers ask, when they call and what converts.' },
  },
  liveCall: 'Live call',
  voiceAsk: 'Can I move my appointment to Thursday?',
  voiceReply: 'Done. Thursday at 4:00 PM, confirmation sent.',
  voiceLabel: 'Illustration of a live AI voice call',
  liveVideo: 'Live video',
  videoAlt: 'Illustrated AI video agent',
  videoCaption: 'Welcome to the showroom! Which model would you like to see?',
  videoLabel: 'Illustration of a lifelike AI avatar on a video call',
  chatChannels: ['WhatsApp', 'Instagram', 'Web chat'],
  chatMessages: ['Do you have the black sneakers in size 42?', 'Yes, 3 pairs left. Shall I reserve one for you?', 'Yes please, I will pick up today'],
  chatLabel: 'Illustration of an AI agent replying on WhatsApp, Instagram and web chat',
  languagesOrbit: ['Gulf', 'Levant', 'Egypt', 'MSA', 'EN', 'FR'],
  greetings: ['Hello', 'هلا والله', 'كيفك؟', 'إزيك؟', 'Bonjour', 'أهلاً وسهلاً'],
  autoDetect: 'Auto-detect',
  languagesLabel: 'Illustration of an agent switching between Arabic dialects, English and French',
  knowledgePill: 'Knowledge base',
  knowledgeDone: 'Menu, FAQs and policies synced',
  knowledgeLabel: 'Illustration of Talkys learning your documents',
  hubTools: ['CRM', 'POS', 'Delivery', 'Calendar'],
  toolsLabel: 'Illustration of Talkys connected to your business tools',
  ordersPill: 'New order',
  orderSteps: [
    { label: 'Order', detail: '2 mixed grills, 1 tabbouleh' },
    { label: 'POS', detail: 'Sent to the kitchen' },
    { label: 'Pay', detail: 'Payment link paid' },
    { label: 'Confirm', detail: 'WhatsApp: arriving in 35 min' },
  ],
  ordersLabel: 'Illustration of an order moving from the call to the kitchen',
  memoryMessages: ["Hi, it's Sara again", 'Same order as last time?', 'Deliver it to the office'],
  memoryChannels: ['WhatsApp', 'Call', 'Instagram'],
  remembered: 'Remembered',
  memoryFacts: ['Prefers Arabic', 'Usual: chicken shawarma', 'Office address saved'],
  memoryLabel: 'Illustration of Talkys remembering a customer across channels',
  agentTag: 'Talkys',
  teamTag: 'Your team',
  handoffChips: ['Summary + transcript', 'Intent: group booking', 'Returning customer'],
  handoffLabel: 'Illustration of Talkys handing a conversation to your team',
  dashboardPill: 'This week',
  topQuestion: 'Top ask: opening hours',
  analyticsLabel: 'Illustration of a conversation analytics dashboard',
};

const copy: { en: typeof en; ar: typeof en } = {
  en,
  ar: {
    eyebrow: 'ما يقدّمه Talkys',
    titleLead: 'كل ما يحتاجه فريق خدمة عملائك،',
    titleAccent: 'على كل قناة.',
    description: 'وكيل واحد يتحدث ويدردش ويحجز ويبيع، ومتصل بالأدوات التي تستخدمها أصلاً.',
    cards: {
      voice: { title: 'مكالمات صوتية مباشرة', description: 'يردّ على خطك الهاتفي فوراً بصوت طبيعي. لا قوائم صوتية، ولا انتظار، ولا مكالمات فائتة في الثانية فجراً.' },
      video: { title: 'مكالمات فيديو مباشرة', description: 'شخصية رقمية واقعية تستقبل عملاءك وجهاً لوجه على موقعك أو في نقطة الخدمة، مباشرة وليست مسجّلة مسبقاً.' },
      chat: { title: 'WhatsApp وInstagram ودردشة الموقع', description: 'يردّ على الرسائل الخاصة ورسائل WhatsApp ودردشات الموقع خلال ثوانٍ، بنفس المعرفة التي يستخدمها على الهاتف.' },
      languages: { title: 'اللهجات العربية والإنجليزية والفرنسية', description: 'الخليجية والشامية والمصرية والفصحى والإنجليزية والفرنسية، ينتقل بينها في منتصف الجملة كما يفعل عميلك.' },
      knowledge: { title: 'قاعدة معرفتك', description: 'يتعلّم قائمتك وأسعارك وخدماتك وسياساتك وأسئلتك الشائعة، ولا يجيب إلا بما زوّدته به.' },
      tools: { title: 'يتصل بأي نظام', description: 'Salesforce وHubSpot وZoho وOdoo وFoodics وTalabat وShopify وSalla وGoogle Calendar وغيرها، إضافة إلى Webhooks وواجهات API لأي تكامل خاص.' },
      orders: { title: 'الطلبات والحجوزات', description: 'يأخذ الطلبات، ويحجز الطاولات والمواعيد وتجارب القيادة، ويرسل روابط الدفع، ويؤكد كل شيء عبر WhatsApp أو الرسائل النصية.' },
      memory: { title: 'الذاكرة', description: 'يتذكّر العملاء العائدين وطلبهم المعتاد وتفضيلاتهم، عبر المكالمات والمحادثات.' },
      handoff: { title: 'التحويل إلى موظف', description: 'يُشرك فريقك عند الحاجة، مع ملخص ونص المحادثة كاملاً حتى لا يُسأل العميل مرتين.' },
      analytics: { title: 'التحليلات', description: 'كل مكالمة ومحادثة مسجّلة ومفرّغة نصياً وقابلة للبحث. اعرف ماذا يسأل عملاؤك، ومتى يتصلون، وما الذي يحقق المبيعات.' },
    },
    liveCall: 'مكالمة مباشرة',
    voiceAsk: 'ممكن أنقل موعدي ليوم الخميس؟',
    voiceReply: 'تم. الخميس الساعة 4:00 عصراً، وأرسلت لك التأكيد.',
    voiceLabel: 'رسم توضيحي لمكالمة صوتية مباشرة مع وكيل ذكي',
    liveVideo: 'فيديو مباشر',
    videoAlt: 'رسم توضيحي لوكيل فيديو ذكي',
    videoCaption: 'أهلاً بك في المعرض! أي طراز تودّ أن تشاهد؟',
    videoLabel: 'رسم توضيحي لشخصية رقمية واقعية في مكالمة فيديو',
    chatChannels: ['WhatsApp', 'Instagram', 'دردشة الموقع'],
    chatMessages: ['عندكم الحذاء الرياضي الأسود مقاس 42؟', 'نعم، بقي 3 أزواج. هل أحجز لك واحداً؟', 'أكيد، سأستلمه اليوم'],
    chatLabel: 'رسم توضيحي لوكيل ذكي يردّ على WhatsApp وInstagram ودردشة الموقع',
    languagesOrbit: ['خليجي', 'شامي', 'مصري', 'فصحى', 'EN', 'FR'],
    greetings: ['Hello', 'هلا والله', 'كيفك؟', 'إزيك؟', 'Bonjour', 'أهلاً وسهلاً'],
    autoDetect: 'اكتشاف تلقائي',
    languagesLabel: 'رسم توضيحي لوكيل ينتقل بين اللهجات العربية والإنجليزية والفرنسية',
    knowledgePill: 'قاعدة المعرفة',
    knowledgeDone: 'تمت مزامنة القائمة والأسئلة الشائعة والسياسات',
    knowledgeLabel: 'رسم توضيحي لـ Talkys وهو يتعلّم من مستنداتك',
    hubTools: ['CRM', 'نقاط البيع', 'التوصيل', 'التقويم'],
    toolsLabel: 'رسم توضيحي لـ Talkys متصلاً بأدوات نشاطك',
    ordersPill: 'طلب جديد',
    orderSteps: [
      { label: 'الطلب', detail: '2 مشاوي مشكّلة، 1 تبولة' },
      { label: 'نقاط البيع', detail: 'أُرسل إلى المطبخ' },
      { label: 'الدفع', detail: 'تم الدفع عبر الرابط' },
      { label: 'التأكيد', detail: 'WhatsApp: يصل خلال 35 دقيقة' },
    ],
    ordersLabel: 'رسم توضيحي لطلب ينتقل من المكالمة إلى المطبخ',
    memoryMessages: ['مرحبا، أنا سارة مرة ثانية', 'نفس طلب المرة الماضية؟', 'وصّلوه على المكتب'],
    memoryChannels: ['WhatsApp', 'مكالمة', 'Instagram'],
    remembered: 'محفوظ',
    memoryFacts: ['تفضّل العربية', 'المعتاد: شاورما دجاج', 'عنوان المكتب محفوظ'],
    memoryLabel: 'رسم توضيحي لـ Talkys وهو يتذكّر العميل عبر القنوات',
    agentTag: 'Talkys',
    teamTag: 'فريقك',
    handoffChips: ['ملخص + نص المحادثة', 'الطلب: حجز مجموعة', 'عميل عائد'],
    handoffLabel: 'رسم توضيحي لـ Talkys وهو يحوّل المحادثة إلى فريقك',
    dashboardPill: 'هذا الأسبوع',
    topQuestion: 'الأكثر سؤالاً: مواعيد العمل',
    analyticsLabel: 'رسم توضيحي للوحة تحليلات المحادثات',
  },
};

type Copy = typeof en;
type CardKey = keyof Copy['cards'];

/* ── Scenes: animated icon illustrations instead of photos ── */

function Stage({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div role="img" aria-label={label} className="fx-stage relative aspect-[16/10] overflow-hidden border-b border-[var(--border-subtle)]">
      <div className="fx-stage-grid" />
      {children}
    </div>
  );
}

function LivePill({ children }: { children: ReactNode }) {
  return (
    <span className="absolute start-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-[var(--border-color)] bg-white/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] shadow-xs backdrop-blur">
      <span className="fx-blink h-1.5 w-1.5 rounded-full bg-[var(--viz-green)]" />
      {children}
    </span>
  );
}

const seq = (d: number) => ({ '--d': `${d}s` }) as CSSProperties;

function VoiceScene({ t }: { t: Copy }) {
  return (
    <Stage label={t.voiceLabel}>
      <LivePill>{t.liveCall}</LivePill>
      <div className="absolute inset-x-0 top-[40%] flex -translate-y-1/2 items-center justify-center gap-5">
        <div className="fx-wave" aria-hidden>
          {Array.from({ length: 11 }, (_, i) => (
            <i key={i} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
          <span className="fx-ping" />
          <span className="fx-ping" style={{ animationDelay: '0.9s' }} />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lift" style={{ background: 'var(--cta-gradient)' }}>
            <Mic className="h-7 w-7" />
          </span>
        </div>
        <div className="fx-wave" aria-hidden>
          {Array.from({ length: 11 }, (_, i) => (
            <i key={i} style={{ '--i': 10 - i } as CSSProperties} />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-4 h-10">
        <p className="fx-bubble fx-bubble-a start-0 rounded-es-md">
          <Phone className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]" />
          {t.voiceAsk}
        </p>
        <p className="fx-bubble fx-bubble-b end-0 rounded-ee-md border-[var(--indigo-200)] bg-[var(--indigo-50)] text-[var(--indigo-700)]">
          {t.voiceReply}
        </p>
      </div>
    </Stage>
  );
}

function VideoScene({ t }: { t: Copy }) {
  return (
    <Stage label={t.videoLabel}>
      <LivePill>{t.liveVideo}</LivePill>
      <div className="absolute left-1/2 top-[44%] h-[58%] w-[46%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lift" style={{ background: 'var(--cta-gradient)' }}>
          <img src="/avatar-layla.jpg" alt={t.videoAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <span className="fx-scan" />
        </div>
        {/* Face-tracking brackets */}
        <span className="fx-corner left-[-6px] top-[-6px] border-l-2 border-t-2" />
        <span className="fx-corner right-[-6px] top-[-6px] border-r-2 border-t-2" />
        <span className="fx-corner bottom-[-6px] left-[-6px] border-b-2 border-l-2" />
        <span className="fx-corner bottom-[-6px] right-[-6px] border-b-2 border-r-2" />
      </div>
      <span className="absolute end-4 top-4 z-10 flex h-9 w-12 items-center justify-center rounded-lg border border-[var(--border-color)] bg-white/90 text-[var(--indigo-500)] shadow-xs">
        <Video className="h-4 w-4" />
      </span>
      <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-white/90 px-3 py-2 shadow-xs backdrop-blur">
        <Captions className="h-3.5 w-3.5 shrink-0 text-[var(--indigo-500)]" />
        <span className="fx-type truncate text-[12px] font-medium text-[var(--text-primary)]">{t.videoCaption}</span>
      </div>
    </Stage>
  );
}

function ChatScene({ t }: { t: Copy }) {
  const channelIcons = [
    <img key="wa" src="/integrationsAssets/Whatsapp.svg" alt="" className="h-3.5 w-3.5" />,
    <Instagram key="ig" className="h-3.5 w-3.5 text-[var(--plum-500)]" />,
    <Globe key="web" className="h-3.5 w-3.5 text-[var(--indigo-500)]" />,
  ];
  return (
    <Stage label={t.chatLabel}>
      <div className="absolute inset-x-4 top-4 z-10 flex justify-center gap-1.5">
        {t.chatChannels.map((channel, i) => (
          <span
            key={channel}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-xs ${
              i === 0 ? 'border-[var(--indigo-200)] bg-white text-[var(--text-primary)]' : 'border-[var(--border-color)] bg-white/80 text-[var(--text-muted)]'
            }`}
          >
            {channelIcons[i]}
            {channel}
          </span>
        ))}
      </div>
      <ul className="absolute inset-x-4 bottom-4 top-[28%] flex flex-col justify-end gap-1.5">
        {t.chatMessages.map((message, i) => {
          const fromAgent = i % 2 === 1;
          return (
            <li key={i} className={`fx-seq flex ${fromAgent ? 'justify-end' : 'justify-start'}`} style={seq(i * 0.9)}>
              <span
                className={`max-w-[85%] truncate rounded-xl border px-2.5 py-1.5 text-[11.5px] shadow-xs ${
                  fromAgent
                    ? 'rounded-ee-md border-[var(--indigo-200)] bg-[var(--indigo-50)] text-[var(--indigo-700)]'
                    : 'rounded-es-md border-[var(--border-color)] bg-white text-[var(--text-primary)]'
                }`}
              >
                {message}
              </span>
            </li>
          );
        })}
      </ul>
    </Stage>
  );
}

function LanguagesScene({ t }: { t: Copy }) {
  const { languagesOrbit: orbit, greetings } = t;
  return (
    <Stage label={t.languagesLabel}>
      <div className="absolute left-1/2 top-[40%] aspect-square h-[66%] -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 150 150" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
          <circle cx="75" cy="75" r="62" stroke="var(--indigo-200)" strokeDasharray="3 6" />
          <circle cx="75" cy="75" r="40" stroke="var(--indigo-100)" />
        </svg>
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-lift" style={{ background: 'var(--cta-gradient)' }}>
          <Globe className="h-6 w-6" />
        </span>
        <div className="fx-orbit absolute inset-0">
          {orbit.map((lang, i) => {
            const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <span
                key={lang}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${50 + Math.cos(angle) * 41.3}%`, top: `${50 + Math.sin(angle) * 41.3}%` }}
              >
                <span className="fx-orbit-counter fx-lang-chip flex h-7 items-center justify-center rounded-full border border-[var(--border-color)] bg-white px-1.5 font-mono text-[10px] font-semibold text-[var(--indigo-600)] shadow-xs">
                  {lang}
                </span>
              </span>
            );
          })}
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-2 rounded-xl border border-[var(--border-color)] bg-white/90 px-3 py-2 shadow-xs">
        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          <Languages className="h-3 w-3 text-[var(--indigo-500)]" />
          {t.autoDetect}
        </span>
        <span className="fx-ticker h-5 overflow-hidden text-[13px] font-semibold leading-5 text-[var(--indigo-700)]">
          <span className="fx-ticker-track block">
            {[...greetings, greetings[0]].map((word, i) => (
              <span key={i} className="block h-5 text-center">
                {word}
              </span>
            ))}
          </span>
        </span>
      </div>
    </Stage>
  );
}

function KnowledgeScene({ t }: { t: Copy }) {
  return (
    <Stage label={t.knowledgeLabel}>
      <LivePill>{t.knowledgePill}</LivePill>
      <div className="absolute left-1/2 top-[44%] h-[54%] w-[44%] -translate-x-1/2 -translate-y-1/2">
        {[-7, 7].map((r) => (
          <span key={r} className="absolute inset-0 rounded-xl border border-[var(--border-color)] bg-white/80 shadow-xs" style={{ transform: `rotate(${r}deg)` }} />
        ))}
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-[var(--border-color)] bg-white p-3 shadow-card">
          <FileText className="h-4 w-4 text-[var(--indigo-500)]" />
          <div className="mt-2.5 space-y-2">
            {['90%', '72%', '84%', '60%'].map((width, i) => (
              <span key={i} className="fx-shimmer block h-1.5 rounded-full" style={{ width, '--i': i } as CSSProperties} />
            ))}
          </div>
          <span className="fx-scan" />
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-4 flex justify-center">
        <span className="fx-seq inline-flex max-w-full items-center gap-2 rounded-full border border-[var(--border-color)] bg-white/95 px-3 py-1.5 text-[12px] font-medium text-[var(--text-primary)] shadow-xs" style={seq(0.6)}>
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--viz-green-soft)] text-[var(--viz-green)]">
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
          <span className="truncate">{t.knowledgeDone}</span>
        </span>
      </div>
    </Stage>
  );
}

const hubSpots: { icon: LucideIcon; x: number; y: number }[] = [
  { icon: Users, x: 18, y: 26 },
  { icon: Store, x: 82, y: 26 },
  { icon: Bike, x: 18, y: 74 },
  { icon: CalendarDays, x: 82, y: 74 },
];

function ToolsScene({ t }: { t: Copy }) {
  return (
    <Stage label={t.toolsLabel}>
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {hubSpots.map((spot, i) => (
          <line key={i} x1="50" y1="50" x2={spot.x} y2={spot.y} stroke="var(--indigo-200)" strokeWidth="1.2" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" className="animate-dash-flow" />
        ))}
      </svg>
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <span className="fx-ping" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lift" style={{ background: 'var(--cta-gradient)' }}>
          <Plug className="h-6 w-6" />
        </span>
      </span>
      {hubSpots.map(({ icon: Icon, x, y }, i) => (
        <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
          <span
            className="fx-hub-chip relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[var(--border-color)] bg-white px-2.5 py-1.5 text-[12px] font-semibold text-[var(--text-primary)] shadow-xs"
            style={seq(i * 0.8)}
          >
            <Icon className="h-3.5 w-3.5 text-[var(--indigo-500)]" />
            {t.hubTools[i]}
          </span>
        </span>
      ))}
    </Stage>
  );
}

function OrdersScene({ t }: { t: Copy }) {
  return (
    <Stage label={t.ordersLabel}>
      <LivePill>{t.ordersPill}</LivePill>
      <ol className="absolute inset-x-6 top-1/2 mx-auto max-w-[280px] -translate-y-[40%] space-y-2">
        {t.orderSteps.map(({ label, detail }, i) => (
          <li key={i} className="fx-wf-row flex items-center gap-2.5 rounded-lg border border-[var(--border-color)] bg-white px-2.5 py-1.5 shadow-xs" style={seq(i * 0.8)}>
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--viz-green-soft)] text-[var(--viz-green)]">
              <Check className="fx-wf-check h-3 w-3" strokeWidth={3} style={seq(i * 0.8)} />
            </span>
            <span className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-wide text-[var(--indigo-500)]">{label}</span>
            <span className="truncate text-[12px] text-[var(--text-secondary)]">{detail}</span>
          </li>
        ))}
      </ol>
    </Stage>
  );
}

const memoryIcons: LucideIcon[] = [MessageCircle, Phone, Instagram];

function MemoryScene({ t }: { t: Copy }) {
  return (
    <Stage label={t.memoryLabel}>
      <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 items-center gap-3">
        <ul className="min-w-0 flex-1 space-y-1.5">
          {t.memoryMessages.map((text, i) => {
            const Icon = memoryIcons[i];
            return (
              <li key={i} className="fx-seq flex items-center gap-2 rounded-xl rounded-es-md border border-[var(--border-color)] bg-white px-2.5 py-1.5 shadow-xs" style={seq(i * 0.9)}>
                <Icon aria-label={t.memoryChannels[i]} className="h-3.5 w-3.5 shrink-0 text-[var(--indigo-500)]" />
                <span className="truncate text-[11.5px] text-[var(--text-primary)]">{text}</span>
              </li>
            );
          })}
        </ul>
        <div className="fx-seq w-[44%] shrink-0 rounded-xl border border-[var(--indigo-200)] bg-[var(--indigo-50)] p-2.5 shadow-xs" style={seq(2.7)}>
          <p className="flex items-center gap-1 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[var(--indigo-600)]">
            <Database className="h-3 w-3" />
            {t.remembered}
          </p>
          <ul className="mt-1.5 space-y-1 text-[11px] font-medium text-[var(--text-primary)]">
            {t.memoryFacts.map((fact) => (
              <li key={fact} className="truncate">
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Stage>
  );
}

function HandoffScene({ t }: { t: Copy }) {
  return (
    <Stage label={t.handoffLabel}>
      <div className="absolute inset-x-8 top-[36%] flex -translate-y-1/2 items-center justify-between">
        <span className="flex flex-col items-center gap-1.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lift" style={{ background: 'var(--cta-gradient)' }}>
            <Bot className="h-5 w-5" />
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{t.agentTag}</span>
        </span>
        <span className="relative mx-3 -mt-5 h-0 flex-1">
          <span className="absolute inset-x-0 top-0 h-px bg-[var(--indigo-200)]" />
          <span className="fx-track-runner absolute inset-x-0 top-0 h-0">
            <span className="fx-track-dot" />
          </span>
        </span>
        <span className="flex flex-col items-center gap-1.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-color)] bg-white text-[var(--indigo-500)] shadow-card">
            <UserRound className="h-5 w-5" />
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{t.teamTag}</span>
        </span>
      </div>
      <div className="absolute inset-x-4 bottom-4 flex flex-wrap justify-center gap-1.5">
        {t.handoffChips.map((chip, i) => (
          <span key={chip} className="fx-seq rounded-md border border-[var(--border-color)] bg-white px-2 py-1 text-[11px] font-medium text-[var(--text-primary)] shadow-xs" style={seq(1.2 + i * 0.35)}>
            {chip}
          </span>
        ))}
      </div>
    </Stage>
  );
}

function AnalyticsScene({ t }: { t: Copy }) {
  const heights = [38, 55, 46, 70, 58, 82, 66, 90, 76];
  return (
    <Stage label={t.analyticsLabel}>
      <LivePill>{t.dashboardPill}</LivePill>
      <span className="absolute end-4 top-4 z-10 inline-flex max-w-[55%] items-center gap-1 rounded-full border border-[var(--border-color)] bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[var(--viz-green)] shadow-xs">
        <TrendingUp className="h-3 w-3 shrink-0" />
        <span className="truncate">{t.topQuestion}</span>
      </span>
      <div className="absolute inset-x-6 bottom-6 top-[34%] flex items-end gap-2 border-b border-[var(--border-color)]">
        {heights.map((h, i) => (
          <span key={i} className="fx-bar w-full rounded-t-[4px]" style={{ height: `${h}%`, '--i': i } as CSSProperties} />
        ))}
      </div>
    </Stage>
  );
}

type Card = { key: CardKey; icon: LucideIcon; scene: (props: { t: Copy }) => ReactNode };

// Top row: where Talkys meets your customers. Bottom rows: what it does once they arrive.
const channelCards: Card[] = [
  { key: 'voice', icon: Mic, scene: VoiceScene },
  { key: 'video', icon: Video, scene: VideoScene },
  { key: 'chat', icon: MessagesSquare, scene: ChatScene },
  { key: 'languages', icon: Languages, scene: LanguagesScene },
];

const actionCards: Card[] = [
  { key: 'knowledge', icon: BookOpen, scene: KnowledgeScene },
  { key: 'tools', icon: Plug, scene: ToolsScene },
  { key: 'orders', icon: ShoppingBag, scene: OrdersScene },
  { key: 'memory', icon: Database, scene: MemoryScene },
  { key: 'handoff', icon: UserRound, scene: HandoffScene },
  { key: 'analytics', icon: BarChart3, scene: AnalyticsScene },
];

function CapabilityCard({ card, t }: { card: Card; t: Copy }) {
  const { icon: Icon, scene: Scene } = card;
  const { title, description } = t.cards[card.key];
  return (
    <article className="glass-panel-premium card-interactive flex flex-col overflow-hidden">
      <Scene t={t} />
      <div className="flex flex-col gap-2 p-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--indigo-50)] text-[var(--indigo-500)]">
            <Icon className="h-4 w-4" />
          </span>
          <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
        </div>
        <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">{description}</p>
      </div>
    </article>
  );
}

export function FeaturesSection() {
  const t = useCopy(copy);
  const sectionRef = useReveal<HTMLElement>();

  // Loops only run while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.dataset.live = '';
      else delete el.dataset.live;
    });
    io.observe(el);
    return () => io.disconnect();
  }, [sectionRef]);

  return (
    <section ref={sectionRef} id="features" className="fx-scene relative py-20 lg:py-28">
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

        <div data-reveal-group className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {channelCards.map((card) => (
            <CapabilityCard key={card.key} card={card} t={t} />
          ))}
        </div>

        <div data-reveal-group className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {actionCards.map((card) => (
            <CapabilityCard key={card.key} card={card} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
