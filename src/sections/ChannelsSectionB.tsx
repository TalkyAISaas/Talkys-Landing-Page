'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
  Check,
  CheckCircle2,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MessageCircle,
  MessageSquareText,
  Mic,
  Phone,
  PhoneOff,
  Video,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { useReveal } from '@/hooks/useReveal';
import { useCopy, useLocale } from '@/i18n/LocaleContext';
import { cn } from '@/lib/utils';
import '@/styles/channels.css';

type Kind = 'call' | 'video' | 'chat' | 'email';
type Message = { from: 'customer' | 'agent'; text: string };
type Channel = {
  name: string;
  hint: string;
  title: string;
  body: string;
  points: [string, string];
  screen: string;
  messages: Message[];
  outcome: string;
};

/** Visual setup per channel, in the same order as the copy. Header colours are the platforms' own. */
const CHANNELS: { id: string; icon: LucideIcon; kind: Kind; header: string }[] = [
  { id: 'phone', icon: Phone, kind: 'call', header: 'var(--blue-500)' },
  { id: 'video', icon: Video, kind: 'video', header: 'var(--blue-900)' },
  { id: 'whatsapp', icon: MessageCircle, kind: 'chat', header: '#075e54' },
  { id: 'instagram', icon: Instagram, kind: 'chat', header: 'linear-gradient(90deg, #833ab4, #e1306c 55%, #f77737)' },
  { id: 'messenger', icon: Facebook, kind: 'chat', header: '#0084ff' },
  { id: 'web', icon: Globe, kind: 'chat', header: 'var(--blue-500)' },
  { id: 'sms', icon: MessageSquareText, kind: 'chat', header: 'var(--indigo-600)' },
  { id: 'email', icon: Mail, kind: 'email', header: 'var(--blue-500)' },
];

const AUTOPLAY_MS = 500;
// Seconds between messages: quick while cycling so each conversation fits its slot, relaxed once a visitor picks a channel.
const STAGGER_AUTO = 0.05;
const STAGGER_PICKED = 0.55;

const copy = {
  en: {
    eyebrow: 'Channels',
    titleLead: 'One agent on every line.',
    titleAccent: 'Calls, video and chat.',
    description: 'Customers reach you wherever they like. The same agent answers, with the same knowledge, and logs every conversation in one place.',
    tabsLabel: 'Channels',
    shared: ['Same agent, same knowledge', 'Logged in one inbox'],
    customer: 'Customer',
    agent: 'Talkys',
    live: 'Live',
    typing: 'Type a message',
    sample: 'Sample conversation',
    channels: [
      {
        name: 'Phone calls',
        hint: 'Inbound & outbound',
        title: 'Every call picked up on the first ring.',
        body: 'A natural voice answers your number day and night, books, takes orders and confirms by SMS. Ten calls at once is no problem.',
        points: ['Inbound and outbound calls', 'Recording and transcript for every call'],
        screen: 'Your clinic',
        messages: [
          { from: 'customer', text: 'Hi, can I see Dr. Nour tomorrow?' },
          { from: 'agent', text: 'Dr. Nour has 10:30 or 4:00 tomorrow. Which works for you?' },
          { from: 'customer', text: '4:00, please.' },
          { from: 'agent', text: 'Booked for 4:00. I’ve sent the details by SMS.' },
        ],
        outcome: 'Appointment booked',
      },
      {
        name: 'Video calls',
        hint: 'Lifelike AI avatar',
        title: 'A face on your front desk, around the clock.',
        body: 'A lifelike AI avatar greets customers on your website or a kiosk, face to face, and talks them through rooms, menus or models live.',
        points: ['Live, not pre-recorded', 'Your brand, your avatar'],
        screen: 'Your hotel',
        messages: [
          { from: 'customer', text: 'Can I get a late checkout?' },
          { from: 'agent', text: 'Of course, 2 PM is free for you. Shall I add an airport pickup too?' },
        ],
        outcome: 'Late checkout added',
      },
      {
        name: 'WhatsApp',
        hint: 'Text & voice notes',
        title: 'WhatsApp answered in seconds, voice notes included.',
        body: 'Customers message the way they always do. Talkys replies in their dialect, holds stock, takes orders and sends payment links.',
        points: ['Understands voice notes', 'Order and payment links in chat'],
        screen: 'Your store',
        messages: [
          { from: 'customer', text: 'Do you have the black sneakers in 42?' },
          { from: 'agent', text: 'Yes, 3 pairs left. Want me to hold one for you today?' },
          { from: 'customer', text: 'Yes please!' },
          { from: 'agent', text: 'Held under your name until 8 PM ✓' },
        ],
        outcome: 'Item reserved',
      },
      {
        name: 'Instagram',
        hint: 'DMs & story replies',
        title: 'Turn DMs and story replies into bookings.',
        body: 'Price questions, availability, “is this still in stock?”: answered while the customer is still on your profile.',
        points: ['DMs and story replies', 'Books straight into your calendar'],
        screen: 'yoursalon',
        messages: [
          { from: 'customer', text: 'How much is a balayage? 💇‍♀️' },
          { from: 'agent', text: 'Balayage starts at 120 USD. Saturday at 11:00 is free, shall I book it?' },
          { from: 'customer', text: 'Book it!' },
        ],
        outcome: 'Appointment booked',
      },
      {
        name: 'Messenger',
        hint: 'Facebook pages',
        title: 'Your Facebook page, finally answered.',
        body: 'Opening hours, menus, directions and reservations handled on Messenger, with the same answers your phone line gives.',
        points: ['Every page you run', 'Hands off to your team when needed'],
        screen: 'Your restaurant',
        messages: [
          { from: 'customer', text: 'Are you open on Sunday?' },
          { from: 'agent', text: 'Yes, from 12 PM to midnight. Would you like a table?' },
          { from: 'customer', text: 'Table for 2 at 8?' },
          { from: 'agent', text: 'Done, see you Sunday at 8!' },
        ],
        outcome: 'Table booked',
      },
      {
        name: 'Web chat',
        hint: 'On your website',
        title: 'A chat on your site that actually closes.',
        body: 'Visitors get real answers and real bookings instead of a contact form, then land in your CRM as qualified leads.',
        points: ['One snippet to install', 'Leads synced to your CRM'],
        screen: 'Your showroom',
        messages: [
          { from: 'customer', text: 'Is the Tucson available for a test drive?' },
          { from: 'agent', text: 'Yes! Saturday at 11 AM or 2 PM?' },
          { from: 'customer', text: '11 works.' },
          { from: 'agent', text: 'Booked. See you Saturday at 11.' },
        ],
        outcome: 'Test drive booked',
      },
      {
        name: 'SMS',
        hint: 'Reminders & replies',
        title: 'Reminders that customers can reply to.',
        body: 'Talkys sends confirmations and reminders, and handles the replies: confirm, cancel or move the booking without a call.',
        points: ['Confirmations and reminders', 'Two-way rescheduling'],
        screen: 'Your clinic',
        messages: [
          { from: 'agent', text: 'Reminder: your appointment is tomorrow at 4 PM. Reply 1 to confirm, 2 to reschedule.' },
          { from: 'customer', text: '2' },
          { from: 'agent', text: 'No problem. Thursday at 11:00 or 3:00?' },
          { from: 'customer', text: '3:00' },
        ],
        outcome: 'Rescheduled',
      },
      {
        name: 'Email',
        hint: 'Inbox triage',
        title: 'An inbox that sorts and answers itself.',
        body: 'Order questions, quotes and complaints are read, answered or routed to the right person, with the context attached.',
        points: ['Replies to routine emails', 'Routes the rest with a summary'],
        screen: 'Order #4821, where is it?',
        messages: [
          { from: 'customer', text: 'Hi, I ordered on Monday and haven’t received anything yet. Can you check?' },
          { from: 'agent', text: 'Hi Rami, your order left our warehouse this morning and arrives tomorrow before 6 PM. Here is your tracking link.' },
        ],
        outcome: 'Replied with tracking',
      },
    ] as Channel[],
  },
  ar: {
    eyebrow: 'القنوات',
    titleLead: 'وكيل واحد على كل خط.',
    titleAccent: 'مكالمات وفيديو ومحادثات.',
    description: 'يتواصل عملاؤك معك من حيث يفضّلون. يرد الوكيل نفسه بالمعرفة نفسها، ويسجّل كل محادثة في مكان واحد.',
    tabsLabel: 'القنوات',
    shared: ['الوكيل نفسه والمعرفة نفسها', 'كل شيء مسجّل في صندوق واحد'],
    customer: 'العميل',
    agent: 'Talkys',
    live: 'مباشر',
    typing: 'اكتب رسالة',
    sample: 'محادثة توضيحية',
    channels: [
      {
        name: 'المكالمات الهاتفية',
        hint: 'واردة وصادرة',
        title: 'كل مكالمة يُرد عليها من أول رنّة.',
        body: 'صوت طبيعي يرد على رقمك ليلاً ونهاراً، يحجز ويستقبل الطلبات ويؤكّد برسالة نصية. عشر مكالمات في وقت واحد ليست مشكلة.',
        points: ['مكالمات واردة وصادرة', 'تسجيل ونص مكتوب لكل مكالمة'],
        screen: 'عيادتك',
        messages: [
          { from: 'customer', text: 'مرحباً، هل يمكنني رؤية الدكتورة نور غداً؟' },
          { from: 'agent', text: 'لدى الدكتورة نور موعدان غداً: 10:30 أو 4:00. أيهما يناسبك؟' },
          { from: 'customer', text: 'الساعة 4:00 من فضلك.' },
          { from: 'agent', text: 'تم الحجز الساعة 4:00، وأرسلت لك التفاصيل برسالة نصية.' },
        ],
        outcome: 'تم حجز الموعد',
      },
      {
        name: 'مكالمات الفيديو',
        hint: 'أفاتار ذكي واقعي',
        title: 'وجه على مكتب استقبالك، على مدار الساعة.',
        body: 'أفاتار ذكي واقعي يستقبل العملاء على موقعك أو في كشك، وجهاً لوجه، ويعرّفهم على الغرف أو القوائم أو الطرازات مباشرة.',
        points: ['مباشر وليس مسجّلاً مسبقاً', 'علامتك التجارية وأفاتارك الخاص'],
        screen: 'فندقك',
        messages: [
          { from: 'customer', text: 'هل يمكنني تأخير موعد المغادرة؟' },
          { from: 'agent', text: 'بالتأكيد، الساعة 2 ظهراً متاحة لك. هل أضيف توصيلاً إلى المطار أيضاً؟' },
        ],
        outcome: 'تمت إضافة المغادرة المتأخرة',
      },
      {
        name: 'WhatsApp',
        hint: 'نصوص ورسائل صوتية',
        title: 'ردود على WhatsApp خلال ثوانٍ، والرسائل الصوتية أيضاً.',
        body: 'يراسلك العملاء كما اعتادوا. يرد Talkys بلهجتهم، ويحجز المنتجات، ويستقبل الطلبات، ويرسل روابط الدفع.',
        points: ['يفهم الرسائل الصوتية', 'روابط الطلب والدفع داخل المحادثة'],
        screen: 'متجرك',
        messages: [
          { from: 'customer', text: 'هل الحذاء الأسود متوفر بمقاس 42؟' },
          { from: 'agent', text: 'نعم، بقي 3 أزواج. هل أحجز لك واحداً لليوم؟' },
          { from: 'customer', text: 'نعم من فضلك!' },
          { from: 'agent', text: 'محجوز باسمك حتى الساعة 8 مساءً ✓' },
        ],
        outcome: 'تم حجز المنتج',
      },
      {
        name: 'Instagram',
        hint: 'الرسائل والردود على القصص',
        title: 'حوّل الرسائل والردود على القصص إلى حجوزات.',
        body: 'أسئلة الأسعار والمواعيد و«هل ما زال متوفراً؟» تُجاب بينما العميل ما زال على صفحتك.',
        points: ['الرسائل والردود على القصص', 'حجز مباشر في تقويمك'],
        screen: 'yoursalon',
        messages: [
          { from: 'customer', text: 'كم سعر البالياج؟ 💇‍♀️' },
          { from: 'agent', text: 'يبدأ البالياج من 120 دولاراً. السبت الساعة 11:00 متاح، هل أحجزه لك؟' },
          { from: 'customer', text: 'احجزه!' },
        ],
        outcome: 'تم حجز الموعد',
      },
      {
        name: 'Messenger',
        hint: 'صفحات Facebook',
        title: 'صفحتك على Facebook، أخيراً مع من يرد.',
        body: 'مواعيد العمل والقوائم والعناوين والحجوزات تُدار على Messenger، بالأجوبة نفسها التي يقدّمها خطك الهاتفي.',
        points: ['كل صفحاتك', 'تحويل إلى فريقك عند الحاجة'],
        screen: 'مطعمك',
        messages: [
          { from: 'customer', text: 'هل أنتم مفتوحون يوم الأحد؟' },
          { from: 'agent', text: 'نعم، من 12 ظهراً حتى منتصف الليل. هل تريد طاولة؟' },
          { from: 'customer', text: 'طاولة لشخصين الساعة 8؟' },
          { from: 'agent', text: 'تم، نراك الأحد الساعة 8!' },
        ],
        outcome: 'تم حجز الطاولة',
      },
      {
        name: 'دردشة الموقع',
        hint: 'على موقعك الإلكتروني',
        title: 'دردشة على موقعك تُنهي الصفقة فعلاً.',
        body: 'يحصل الزوار على أجوبة وحجوزات حقيقية بدلاً من نموذج تواصل، ثم يصلون إلى نظام CRM كعملاء محتملين مؤهّلين.',
        points: ['سطر برمجي واحد للتثبيت', 'العملاء المحتملون في CRM مباشرة'],
        screen: 'معرضك',
        messages: [
          { from: 'customer', text: 'هل سيارة Tucson متاحة لتجربة قيادة؟' },
          { from: 'agent', text: 'نعم! السبت الساعة 11 صباحاً أم 2 ظهراً؟' },
          { from: 'customer', text: 'الساعة 11 مناسبة.' },
          { from: 'agent', text: 'تم الحجز. نراك السبت الساعة 11.' },
        ],
        outcome: 'تم حجز تجربة القيادة',
      },
      {
        name: 'SMS',
        hint: 'تذكيرات وردود',
        title: 'تذكيرات يستطيع العملاء الرد عليها.',
        body: 'يرسل Talkys التأكيدات والتذكيرات ويتولّى الردود: تأكيد الموعد أو إلغاؤه أو نقله دون أي مكالمة.',
        points: ['تأكيدات وتذكيرات', 'إعادة جدولة في الاتجاهين'],
        screen: 'عيادتك',
        messages: [
          { from: 'agent', text: 'تذكير: موعدك غداً الساعة 4 مساءً. أرسل 1 للتأكيد أو 2 لتغيير الموعد.' },
          { from: 'customer', text: '2' },
          { from: 'agent', text: 'لا مشكلة. الخميس الساعة 11:00 أم 3:00؟' },
          { from: 'customer', text: '3:00' },
        ],
        outcome: 'تم تغيير الموعد',
      },
      {
        name: 'البريد الإلكتروني',
        hint: 'فرز صندوق الوارد',
        title: 'صندوق وارد يفرز ويرد بنفسه.',
        body: 'أسئلة الطلبات وعروض الأسعار والشكاوى تُقرأ ويُرد عليها أو تُحوَّل إلى الشخص المناسب مع كامل السياق.',
        points: ['ردود على الرسائل الروتينية', 'تحويل الباقي مع ملخص'],
        screen: 'الطلب رقم 4821، أين هو؟',
        messages: [
          { from: 'customer', text: 'مرحباً، طلبت يوم الاثنين ولم يصلني شيء بعد. هل يمكنك التحقق؟' },
          { from: 'agent', text: 'مرحباً رامي، غادر طلبك المستودع صباح اليوم ويصلك غداً قبل الساعة 6 مساءً. إليك رابط التتبّع.' },
        ],
        outcome: 'تم الرد مع رابط التتبّع',
      },
    ] as Channel[],
  },
};

export function ChannelsSectionB() {
  const t = useCopy(copy);
  const { dir } = useLocale();
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useReveal<HTMLElement>();

  // Only cycle while the stage is on screen, and never under reduced motion.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || !inView || paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % CHANNELS.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, autoplay, inView, paused]);

  const select = (index: number, focus = false) => {
    setAutoplay(false);
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = dir === 'rtl' ? -1 : 1;
    const last = CHANNELS.length - 1;
    if (event.key === 'ArrowRight') select((active + step + CHANNELS.length) % CHANNELS.length, true);
    else if (event.key === 'ArrowLeft') select((active - step + CHANNELS.length) % CHANNELS.length, true);
    else if (event.key === 'Home') select(0, true);
    else if (event.key === 'End') select(last, true);
    else return;
    event.preventDefault();
  };

  const meta = CHANNELS[active];
  const channel = t.channels[active];
  const Icon = meta.icon;

  return (
    <section ref={sectionRef} id="channels" className="relative py-20 lg:py-28">
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

        {/* Channel pills */}
        <div className="-mx-4 mt-10 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <div role="tablist" aria-label={t.tabsLabel} className="mx-auto flex w-max gap-2">
            {CHANNELS.map((c, index) => {
              const TabIcon = c.icon;
              const selected = index === active;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`channel-tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls="channel-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={onTabKey}
                  className={cn(
                    'relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 ease-out-strong active:scale-[0.97]',
                    selected
                      ? 'border-[var(--blue-500)] bg-[var(--blue-500)] text-white shadow-card'
                      : 'border-[var(--border-color)] bg-white text-[var(--text-secondary)] hover:border-[var(--indigo-300)] hover:text-[var(--text-primary)]'
                  )}
                >
                  <TabIcon aria-hidden className="h-4 w-4" />
                  <span className="whitespace-nowrap">{t.channels[index].name}</span>
                  {/* Autoplay progress */}
                  {selected && autoplay && inView && !paused && (
                    <span key={active} aria-hidden className="ch-progress absolute inset-x-0 bottom-0 h-[2px] bg-[var(--plum-300)]" style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={stageRef}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          id="channel-panel"
          role="tabpanel"
          aria-labelledby={`channel-tab-${meta.id}`}
          className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16"
        >
          {/* Story */}
          <div key={`copy-${meta.id}`} className="ch-swap max-w-xl">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--indigo-50)] text-[var(--blue-500)]">
                <Icon aria-hidden className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-[var(--text-primary)]">{channel.name}</p>
                <p className="text-sm text-[var(--text-muted)]">{channel.hint}</p>
              </div>
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold leading-tight text-[var(--text-primary)] sm:text-3xl">{channel.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] lg:text-lg">{channel.body}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[...channel.points, ...t.shared].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--indigo-50)] text-[var(--indigo-600)]">
                    <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Device */}
          <div className="mx-auto w-full max-w-[400px]">
            <div className="rounded-[32px] border border-[var(--border-color)] bg-white p-2.5 shadow-lift">
              <div key={`screen-${meta.id}`} className="ch-swap flex h-[480px] flex-col overflow-hidden rounded-[24px] bg-[var(--bg-primary)]">
                <Screen stagger={autoplay ? STAGGER_AUTO : STAGGER_PICKED} kind={meta.kind} header={meta.header} icon={Icon} channel={channel} t={t} />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-[var(--text-muted)]">{t.sample}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

type ScreenProps = {
  stagger: number;
  kind: Kind;
  header: string;
  icon: LucideIcon;
  channel: Channel;
  t: (typeof copy)['en'];
};

function Screen({ stagger, kind, header, icon: Icon, channel, t }: ScreenProps) {
  const outcome = (
    <div className="ch-item flex justify-center" style={{ animationDelay: `${(channel.messages.length + 0.4) * stagger}s` }}>
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-[color-mix(in_srgb,var(--viz-green)_80%,black)]',
          kind === 'video' ? 'bg-white shadow-xs' : 'bg-[var(--viz-green-soft)]'
        )}
      >
        <CheckCircle2 aria-hidden className="h-3.5 w-3.5" />
        {channel.outcome}
      </span>
    </div>
  );

  if (kind === 'call' || kind === 'video') {
    return (
      <div className={cn('relative flex h-full flex-col', kind === 'video' ? 'bg-[var(--blue-950)] text-white' : '')}>
        {kind === 'video' ? (
          <>
            <img src="/avatar-sara.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-top opacity-90" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          </>
        ) : null}
        <div className="relative flex items-center justify-between px-5 pt-5">
          <div className={cn('text-start', kind === 'call' ? 'text-[var(--text-primary)]' : '')}>
            <p className="text-sm font-semibold">{channel.screen}</p>
            <p className={cn('text-xs', kind === 'call' ? 'text-[var(--text-muted)]' : 'text-white/75')}>{channel.name}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--viz-red)] px-2.5 py-1 text-[11px] font-semibold text-white">
            <span className="ch-live h-1.5 w-1.5 rounded-full bg-white" />
            {t.live}
          </span>
        </div>

        {kind === 'call' && (
          <div className="relative mt-4 flex flex-col items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cta-gradient text-white shadow-cta">
              <Icon aria-hidden className="h-5 w-5" />
            </span>
            <div aria-hidden className="ch-eq mt-3 flex h-6 items-center gap-[3px]">
              {Array.from({ length: 24 }, (_, k) => (
                <span key={k} style={{ animationDelay: `${(k % 6) * 0.12}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* Oldest lines clip off the top if the conversation is taller than the screen */}
        <div className="relative mt-3 flex min-h-0 flex-1 flex-col justify-end space-y-2.5 overflow-hidden px-4">
          {channel.messages.map((m, k) => (
            <div key={k} className={cn('ch-item flex', m.from === 'agent' ? 'justify-end' : 'justify-start')} style={{ animationDelay: `${k * stagger}s` }}>
              <p
                className={cn(
                  'max-w-[85%] rounded-2xl px-3.5 py-2 text-start text-[13px] leading-snug',
                  kind === 'video'
                    ? 'bg-black/55 text-white backdrop-blur-md'
                    : m.from === 'agent'
                      ? 'bg-[var(--indigo-50)] text-[var(--blue-700)]'
                      : 'bg-white text-[var(--text-primary)] shadow-xs'
                )}
              >
                <span className={cn('mb-0.5 block text-[10px] font-semibold uppercase', kind === 'video' ? 'text-white/60' : 'text-[var(--text-muted)]')}>
                  {m.from === 'agent' ? t.agent : t.customer}
                </span>
                {m.text}
              </p>
            </div>
          ))}
          {outcome}
        </div>
        <div className="relative flex justify-center gap-3 px-4 pb-4 pt-3">
          <span className={cn('flex h-10 w-10 items-center justify-center rounded-full', kind === 'video' ? 'bg-white/15' : 'bg-white shadow-xs')}>
            <Mic aria-hidden className="h-4 w-4" />
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--viz-red)] text-white">
            <PhoneOff aria-hidden className="h-4 w-4" />
          </span>
        </div>
      </div>
    );
  }

  if (kind === 'email') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 px-4 py-3 text-white" style={{ background: header }}>
          <Icon aria-hidden className="h-4 w-4" />
          <p className="truncate text-sm font-semibold">{channel.screen}</p>
        </div>
        <div className="flex-1 space-y-3 overflow-hidden p-4">
          {channel.messages.map((m, k) => (
            <div key={k} className="ch-item rounded-xl border border-[var(--border-color)] bg-white p-3.5 text-start" style={{ animationDelay: `${k * stagger}s` }}>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold',
                    m.from === 'agent' ? 'bg-[var(--blue-500)] text-white' : 'bg-[var(--bg-sunken)] text-[var(--text-secondary)]'
                  )}
                >
                  {m.from === 'agent' ? 'T' : 'R'}
                </span>
                <span className="text-xs font-semibold text-[var(--text-primary)]">{m.from === 'agent' ? t.agent : t.customer}</span>
              </div>
              <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">{m.text}</p>
            </div>
          ))}
          {outcome}
        </div>
      </div>
    );
  }

  // Chat apps
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-4 py-3 text-white" style={{ background: header }}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <Icon aria-hidden className="h-4 w-4" />
        </span>
        <div className="min-w-0 text-start">
          <p className="truncate text-sm font-semibold">{channel.screen}</p>
          <p className="text-[11px] text-white/75">{channel.name}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end space-y-2.5 overflow-hidden p-4">
        {channel.messages.map((m, k) => (
          <div key={k} className={cn('ch-item flex', m.from === 'agent' ? 'justify-end' : 'justify-start')} style={{ animationDelay: `${k * stagger}s` }}>
            <p
              className={cn(
                'max-w-[80%] rounded-2xl px-3.5 py-2 text-start text-[13px] leading-snug shadow-xs',
                m.from === 'agent' ? 'rounded-ee-md bg-[var(--blue-500)] text-white' : 'rounded-es-md bg-white text-[var(--text-primary)]'
              )}
            >
              {m.text}
            </p>
          </div>
        ))}
        {outcome}
      </div>
      <div className="flex items-center gap-2 border-t border-[var(--border-subtle)] bg-white px-4 py-3">
        <span className="flex-1 rounded-full bg-[var(--bg-sunken)] px-3.5 py-2 text-start text-xs text-[var(--text-muted)]">{t.typing}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full text-white" style={{ background: header }}>
          <MessageCircle aria-hidden className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
