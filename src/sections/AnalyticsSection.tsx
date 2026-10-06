'use client';

import { useRef, useState } from 'react';
import {
  Activity,
  CalendarCheck,
  Check,
  Gauge,
  History,
  Instagram,
  MessageCircle,
  Moon,
  Pause,
  Phone,
  PhoneCall,
  Play,
  Timer,
  TrendingDown,
  TrendingUp,
  UserRound,
  Video,
  type LucideIcon,
} from 'lucide-react';
import gsap from 'gsap';
import { SectionHeader } from '@/components/SectionHeader';
import { useReveal } from '@/hooks/useReveal';
import { useCopy } from '@/i18n/LocaleContext';

// Illustrative sample data for the dashboard mockup: not real customer figures.
const kpis: { icon: LucideIcon; value: number; decimals: number }[] = [
  { icon: PhoneCall, value: 3482, decimals: 0 },
  { icon: MessageCircle, value: 9127, decimals: 0 },
  { icon: CalendarCheck, value: 1946, decimals: 0 },
  { icon: Moon, value: 4310, decimals: 0 },
  { icon: Video, value: 268, decimals: 0 },
  { icon: UserRound, value: 312, decimals: 0 },
  { icon: Gauge, value: 97.6, decimals: 1 },
  { icon: Timer, value: 1.8, decimals: 1 },
];

type Channel = 'phone' | 'video' | 'whatsapp' | 'instagram';
type Outcome = 'booked' | 'ordered' | 'answered' | 'handoff';

const conversations: { id: number; channel: Channel; outcome: Outcome; duration?: string }[] = [
  { id: 1, channel: 'phone', outcome: 'booked', duration: '3:12' },
  { id: 2, channel: 'whatsapp', outcome: 'ordered' },
  { id: 3, channel: 'video', outcome: 'answered', duration: '4:05' },
  { id: 4, channel: 'instagram', outcome: 'booked' },
  { id: 5, channel: 'phone', outcome: 'handoff', duration: '2:47' },
  { id: 6, channel: 'whatsapp', outcome: 'answered' },
];

// WhatsApp / Instagram keep their own brand colours; phone and video use the theme.
const channelStyle: Record<Channel, { icon: LucideIcon; className: string }> = {
  phone: { icon: Phone, className: 'bg-[var(--indigo-50)] text-[var(--indigo-500)]' },
  video: { icon: Video, className: 'bg-[var(--plum-50)] text-[var(--plum-600)]' },
  whatsapp: { icon: MessageCircle, className: 'bg-[#25D366]/15 text-[#128C7E]' },
  instagram: { icon: Instagram, className: 'bg-[#E1306C]/12 text-[#C13584]' },
};

const GREEN_TEXT = 'text-[color-mix(in_srgb,var(--viz-green)_70%,black)]';

// Traffic-light outcomes: green done, amber handed to a person.
const outcomeTone: Record<Outcome, { pill: string; dot: string }> = {
  booked: { pill: `bg-[var(--viz-green-soft)] ${GREEN_TEXT}`, dot: 'bg-[var(--viz-green)]' },
  ordered: { pill: `bg-[var(--viz-green-soft)] ${GREEN_TEXT}`, dot: 'bg-[var(--viz-green)]' },
  answered: { pill: `bg-[var(--viz-green-soft)] ${GREEN_TEXT}`, dot: 'bg-[var(--viz-green)]' },
  handoff: { pill: 'bg-[var(--viz-orange-soft)] text-[var(--viz-orange-text)]', dot: 'bg-[var(--viz-orange)]' },
};

// Conversations by hour of day (00–23). Opening hours are 09:00–18:00.
const hourly = [38, 22, 14, 9, 7, 8, 15, 31, 52, 74, 88, 96, 118, 124, 101, 92, 97, 110, 142, 168, 181, 159, 112, 71];
const maxHourly = Math.max(...hourly);
const isAfterHours = (hour: number) => hour < 9 || hour >= 18;
const afterHoursShare = Math.round((hourly.filter((_, h) => isAfterHours(h)).reduce((a, b) => a + b, 0) / hourly.reduce((a, b) => a + b, 0)) * 100);

// Categorical: first three slots of the data-viz sequence, in order (Arabic, English, French).
const languageShares = [58, 29, 13];
const languageColors = ['var(--viz-1)', 'var(--viz-2)', 'var(--viz-3)'];

// Magnitude on one hue, sorted largest first.
const channelShares = [34, 31, 14, 9, 7, 5];

const CIRCUMFERENCE = 2 * Math.PI * 40;
const GAP = 2.5;

// Donut segments with a small surface gap between fills.
const donutSegments = languageShares.map((share, index) => {
  const start = languageShares.slice(0, index).reduce((sum, s) => sum + (s / 100) * CIRCUMFERENCE, 0);
  const length = (share / 100) * CIRCUMFERENCE;
  return { share, color: languageColors[index], dash: `${Math.max(length - GAP, 0)} ${CIRCUMFERENCE}`, offset: -start };
});

const copy = {
  en: {
    eyebrow: 'Your Talkys dashboard',
    titleLead: 'Every call and chat,',
    titleAccent: 'in one place.',
    description:
      'See what your customers asked for, what Talkys booked or sold, and which conversations came to your team. Every call is recorded, transcribed and searchable.',
    figureLabel: 'Sample Talkys dashboard with illustrative data',
    tabs: ['Conversations', 'Bookings & orders', 'Channels', 'Languages', 'Reports'],
    sample: 'Sample data',
    kpis: [
      { label: 'Calls answered', suffix: '', delta: '+14.2%' },
      { label: 'Chats handled', suffix: '', delta: '+21.6%' },
      { label: 'Bookings & orders captured', suffix: '', delta: '+17.8%' },
      { label: 'After-hours conversations', suffix: '', delta: '+9.4%' },
      { label: 'Video calls', suffix: '', delta: '+32.0%' },
      { label: 'Handed to your team', suffix: '', delta: '−8.3%' },
      { label: 'Resolved without handoff', suffix: '%', delta: '+1.2 pts' },
      { label: 'Average time to answer', suffix: ' s', delta: '−0.4 s' },
    ],
    recentTitle: 'Recent conversations',
    recentRange: 'Today',
    columns: { customer: 'Customer', channel: 'Channel', request: 'Request', language: 'Language', outcome: 'Outcome', recording: 'Recording' },
    channels: { phone: 'Phone', video: 'Video call', whatsapp: 'WhatsApp', instagram: 'Instagram' },
    outcomes: { booked: 'Booked', ordered: 'Order placed', answered: 'Answered', handoff: 'Handed to team' },
    rows: [
      { name: 'Rami K.', time: '2 min ago', request: 'Table for 4, Friday 8:30 pm', language: 'Arabic · Lebanese' },
      { name: 'Nour H.', time: '9 min ago', request: 'Two mixed grill platters, delivery', language: 'Arabic + English' },
      { name: 'Claire D.', time: '21 min ago', request: 'Room service and late checkout', language: 'French' },
      { name: 'Faisal A.', time: '38 min ago', request: 'Test drive, Saturday 11 am', language: 'Arabic · Gulf' },
      { name: 'Sarah M.', time: '1 hr ago', request: 'Insurance question before a dental visit', language: 'English' },
      { name: 'Omar T.', time: '2 hrs ago', request: 'Where is my order?', language: 'Arabic · Egyptian' },
    ],
    play: 'Play recording of the call with',
    pause: 'Pause recording of the call with',
    noRecording: 'Chat transcript',
    hourlyTitle: 'Conversations by hour',
    hourlyNote: `${afterHoursShare}% after hours`,
    openHours: 'Opening hours',
    afterHours: 'After hours',
    languagesTitle: 'Language mix',
    languages: ['Arabic', 'English', 'French'],
    channelsTitle: 'Conversations by channel',
    channelNames: ['Phone calls', 'WhatsApp', 'Instagram DMs', 'Web chat', 'Video calls', 'SMS, email & Messenger'],
    featuresLabel: 'What the dashboard includes',
    features: [
      'Call recordings and transcripts',
      'Search across every call and chat',
      'A summary with every handoff',
      'Bookings and orders synced to your systems',
      'After-hours coverage reports',
      'Language and dialect breakdown',
      'Intent and sentiment tags',
      'Channel-by-channel performance',
      'Exports to your CRM',
    ],
  },
  ar: {
    eyebrow: 'لوحة تحكم Talkys',
    titleLead: 'كل مكالمة ومحادثة',
    titleAccent: 'في مكان واحد.',
    description:
      'اعرف ماذا طلب عملاؤك، وما الذي حجزه Talkys أو باعه، وأي محادثات وصلت إلى فريقك. كل مكالمة مسجّلة ومكتوبة وقابلة للبحث.',
    figureLabel: 'نموذج للوحة تحكم Talkys ببيانات توضيحية',
    tabs: ['المحادثات', 'الحجوزات والطلبات', 'القنوات', 'اللغات', 'التقارير'],
    sample: 'بيانات توضيحية',
    kpis: [
      { label: 'مكالمات تمّ الرد عليها', suffix: '', delta: '+14.2%' },
      { label: 'محادثات نصية', suffix: '', delta: '+21.6%' },
      { label: 'حجوزات وطلبات مسجّلة', suffix: '', delta: '+17.8%' },
      { label: 'محادثات خارج ساعات العمل', suffix: '', delta: '+9.4%' },
      { label: 'مكالمات فيديو', suffix: '', delta: '+32.0%' },
      { label: 'محوّلة إلى فريقك', suffix: '', delta: '−8.3%' },
      { label: 'حُلّت دون تحويل', suffix: '%', delta: '+1.2 نقطة' },
      { label: 'متوسط وقت الرد', suffix: ' ث', delta: '−0.4 ث' },
    ],
    recentTitle: 'أحدث المحادثات',
    recentRange: 'اليوم',
    columns: { customer: 'العميل', channel: 'القناة', request: 'الطلب', language: 'اللغة', outcome: 'النتيجة', recording: 'التسجيل' },
    channels: { phone: 'هاتف', video: 'مكالمة فيديو', whatsapp: 'WhatsApp', instagram: 'Instagram' },
    outcomes: { booked: 'تمّ الحجز', ordered: 'تمّ الطلب', answered: 'تمّت الإجابة', handoff: 'حُوّلت للفريق' },
    rows: [
      { name: 'رامي ك.', time: 'قبل دقيقتين', request: 'طاولة لأربعة، الجمعة ٨:٣٠ مساءً', language: 'عربية · لبنانية' },
      { name: 'نور ح.', time: 'قبل ٩ دقائق', request: 'طبقا مشاوي مشكّلة، توصيل', language: 'عربية + إنجليزية' },
      { name: 'كلير د.', time: 'قبل ٢١ دقيقة', request: 'خدمة الغرف وتأخير موعد المغادرة', language: 'فرنسية' },
      { name: 'فيصل ع.', time: 'قبل ٣٨ دقيقة', request: 'تجربة قيادة، السبت ١١ صباحاً', language: 'عربية · خليجية' },
      { name: 'سارة م.', time: 'قبل ساعة', request: 'سؤال عن التأمين قبل موعد الأسنان', language: 'إنجليزية' },
      { name: 'عمر ت.', time: 'قبل ساعتين', request: 'أين وصل طلبي؟', language: 'عربية · مصرية' },
    ],
    play: 'تشغيل تسجيل المكالمة مع',
    pause: 'إيقاف تسجيل المكالمة مع',
    noRecording: 'نص المحادثة',
    hourlyTitle: 'المحادثات حسب الساعة',
    hourlyNote: `${afterHoursShare}% خارج ساعات العمل`,
    openHours: 'ساعات العمل',
    afterHours: 'خارج ساعات العمل',
    languagesTitle: 'توزيع اللغات',
    languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
    channelsTitle: 'المحادثات حسب القناة',
    channelNames: ['مكالمات هاتفية', 'WhatsApp', 'رسائل Instagram', 'دردشة الموقع', 'مكالمات فيديو', 'رسائل نصية وبريد وMessenger'],
    featuresLabel: 'ما تتضمّنه لوحة التحكم',
    features: [
      'تسجيلات المكالمات ونصوصها المكتوبة',
      'بحث في كل المكالمات والمحادثات',
      'ملخّص مع كل تحويل إلى فريقك',
      'حجوزات وطلبات متزامنة مع أنظمتك',
      'تقارير التغطية خارج ساعات العمل',
      'توزيع اللغات واللهجات',
      'تصنيف النوايا والانطباعات',
      'أداء كل قناة على حدة',
      'تصدير إلى نظام CRM لديك',
    ],
  },
};

export function AnalyticsSection() {
  const t = useCopy(copy);
  const [playing, setPlaying] = useState<number | null>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const sectionRef = useReveal<HTMLElement>(({ reduced }) => {
    const format = (value: number, decimals: number) =>
      value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

    // Counters write straight to the DOM — no React render per frame.
    kpis.forEach((kpi, index) => {
      const el = counterRefs.current[index];
      if (!el) return;
      if (reduced) {
        el.textContent = format(kpi.value, kpi.decimals);
        return;
      }
      const state = { v: 0 };
      el.textContent = format(0, kpi.decimals);
      gsap.to(state, {
        v: kpi.value,
        duration: 1.4,
        ease: 'expo.out',
        onUpdate: () => {
          el.textContent = format(state.v, kpi.decimals);
        },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });

    if (!reduced) {
      gsap.fromTo(
        '.hourly-bar',
        { scaleY: 0 },
        { scaleY: 1, duration: 0.7, ease: 'expo.out', stagger: 0.02, scrollTrigger: { trigger: '.hourly-chart', start: 'top 85%', once: true } }
      );
      gsap.fromTo(
        '.channel-bar',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: '.channel-chart', start: 'top 85%', once: true } }
      );
    }
  });

  return (
    <section ref={sectionRef} id="analytics" className="relative py-20 lg:py-28">
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

        <div className="mx-auto mt-14 max-w-6xl">
          {/* Dashboard mockup */}
          <div data-reveal className="glass-panel-premium overflow-hidden bg-[var(--bg-sunken)] p-4 sm:p-6" aria-label={t.figureLabel} role="figure">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div role="presentation" className="-mx-1 flex gap-1 overflow-x-auto px-1 [scrollbar-width:none]">
                {t.tabs.map((tab, index) => (
                  <span
                    key={tab}
                    className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ${
                      index === 0 ? 'bg-white text-[var(--indigo-600)] shadow-xs' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-[var(--border-color)] bg-white px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
                <Activity className="h-3.5 w-3.5 text-[var(--indigo-500)]" />
                {t.sample}
              </span>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {kpis.map((kpi, index) => {
                const Icon = kpi.icon;
                const label = t.kpis[index];
                const Trend = label.delta.startsWith('−') ? TrendingDown : TrendingUp;
                return (
                  <div key={index} className="rounded-xl border border-[var(--border-color)] bg-white p-3.5">
                    <div className="flex items-center gap-2 text-xs leading-tight text-[var(--text-muted)]">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--indigo-400)]" />
                      {label.label}
                    </div>
                    <p dir="ltr" className="mt-2 text-start font-display text-2xl font-bold tabular-nums text-[var(--text-primary)] rtl:text-right">
                      <span
                        ref={(el) => {
                          counterRefs.current[index] = el;
                        }}
                      >
                        {kpi.value.toLocaleString('en-US', { minimumFractionDigits: kpi.decimals })}
                      </span>
                      <span className="text-base font-semibold text-[var(--text-secondary)]">{label.suffix}</span>
                    </p>
                    {/* Every delta here is an improvement, including the falling ones (fewer handoffs, faster answers). */}
                    <p className={`mt-1 flex items-center gap-1 text-xs font-medium ${GREEN_TEXT}`}>
                      <Trend className="h-3.5 w-3.5" />
                      <span dir="ltr">{label.delta}</span>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              {/* Recent conversations across channels */}
              <div className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-white">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                    <History className="h-4 w-4 text-[var(--indigo-500)]" />
                    {t.recentTitle}
                  </p>
                  <span className="text-xs text-[var(--text-muted)]">{t.recentRange}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th scope="col">{t.columns.customer}</th>
                        <th scope="col">{t.columns.channel}</th>
                        <th scope="col">{t.columns.request}</th>
                        <th scope="col">{t.columns.outcome}</th>
                        <th scope="col">
                          <span className="sr-only">{t.columns.recording}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {conversations.map((conversation, index) => {
                        const row = t.rows[index];
                        const isPlaying = playing === conversation.id;
                        const channel = channelStyle[conversation.channel];
                        const ChannelIcon = channel.icon;
                        const tone = outcomeTone[conversation.outcome];
                        return (
                          <tr key={conversation.id}>
                            <td className="whitespace-nowrap">
                              <span className="block font-medium">{row.name}</span>
                              <span className="block text-xs text-[var(--text-muted)]">{row.time}</span>
                            </td>
                            <td className="whitespace-nowrap">
                              <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${channel.className}`}>
                                  <ChannelIcon className="h-3.5 w-3.5" />
                                </span>
                                {t.channels[conversation.channel]}
                              </span>
                            </td>
                            <td className="min-w-[180px]">
                              <span className="block text-[var(--text-primary)]">{row.request}</span>
                              <span className="block text-xs text-[var(--text-muted)]">{row.language}</span>
                            </td>
                            <td>
                              <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${tone.pill}`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                                {t.outcomes[conversation.outcome]}
                              </span>
                            </td>
                            <td>
                              {conversation.duration ? (
                                <button
                                  type="button"
                                  onClick={() => setPlaying(isPlaying ? null : conversation.id)}
                                  aria-label={`${isPlaying ? t.pause : t.play} ${row.name} (${conversation.duration})`}
                                  aria-pressed={isPlaying}
                                  className="flex h-8 items-center gap-1 rounded-lg px-2 text-xs tabular-nums text-[var(--indigo-500)] transition-[background-color,transform] duration-150 ease-out-strong hover:bg-[var(--indigo-50)] active:scale-[0.94]"
                                >
                                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                  <span dir="ltr">{conversation.duration}</span>
                                </button>
                              ) : (
                                <span className="sr-only">{t.noRecording}</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid gap-4">
                {/* Conversations by hour: opening hours vs after hours */}
                <figure className="hourly-chart rounded-xl border border-[var(--border-color)] bg-white p-4">
                  <figcaption className="flex items-baseline justify-between gap-3 text-xs">
                    <span className="font-semibold text-[var(--text-primary)]">{t.hourlyTitle}</span>
                    <span className="text-[var(--text-muted)]">{t.hourlyNote}</span>
                  </figcaption>
                  {/* Time runs left to right in both languages */}
                  <div dir="ltr">
                    <div className="mt-3 flex h-28 items-end gap-[2px] border-b border-[var(--border-color)]">
                      {hourly.map((value, hour) => (
                        <div key={hour} className="group relative flex h-full flex-1 items-end">
                          <div
                            className="hourly-bar w-full origin-bottom rounded-t-[3px] transition-opacity duration-150 group-hover:opacity-80"
                            style={{ height: `${(value / maxHourly) * 100}%`, background: isAfterHours(hour) ? 'var(--viz-3)' : 'var(--viz-1)' }}
                          />
                          <span className="pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--text-primary)] px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                            {String(hour).padStart(2, '0')}:00 · {value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-1.5 flex justify-between text-[10px] tabular-nums text-[var(--text-muted)]">
                      <span>00:00</span>
                      <span>09:00</span>
                      <span>18:00</span>
                      <span>23:00</span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-[3px] bg-[var(--viz-1)]" />
                      {t.openHours}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-[3px] bg-[var(--viz-3)]" />
                      {t.afterHours}
                    </span>
                  </div>
                </figure>

                {/* Language mix: 3 categorical slots, legend + direct values */}
                <figure className="rounded-xl border border-[var(--border-color)] bg-white p-4">
                  <figcaption className="text-xs font-semibold text-[var(--text-primary)]">{t.languagesTitle}</figcaption>
                  <div className="mt-3 flex items-center gap-4">
                    <svg
                      viewBox="0 0 100 100"
                      className="h-24 w-24 shrink-0 -rotate-90"
                      role="img"
                      aria-label={t.languages.map((name, i) => `${name} ${languageShares[i]}%`).join(', ')}
                    >
                      {donutSegments.map((segment, i) => (
                        <circle
                          key={i}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={segment.color}
                          strokeWidth="14"
                          strokeDasharray={segment.dash}
                          strokeDashoffset={segment.offset}
                        >
                          <title>{`${t.languages[i]}: ${segment.share}%`}</title>
                        </circle>
                      ))}
                    </svg>
                    <ul className="flex-1 space-y-1.5 text-xs">
                      {t.languages.map((name, i) => (
                        <li key={name} className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: languageColors[i] }} />
                          <span className="text-[var(--text-secondary)]">{name}</span>
                          <span dir="ltr" className="ms-auto font-semibold tabular-nums text-[var(--text-primary)]">
                            {languageShares[i]}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </figure>
              </div>
            </div>

            {/* Channel breakdown: magnitude on one hue */}
            <figure className="channel-chart mt-4 rounded-xl border border-[var(--border-color)] bg-white p-4">
              <figcaption className="text-xs font-semibold text-[var(--text-primary)]">{t.channelsTitle}</figcaption>
              <ul className="mt-3 space-y-2">
                {channelShares.map((share, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 text-xs text-[var(--text-secondary)] sm:w-40">{t.channelNames[i]}</span>
                    <div className="h-5 flex-1 overflow-hidden rounded-[4px] bg-[var(--indigo-50)]">
                      <div
                        className="channel-bar h-full origin-left rounded-[4px] bg-[var(--indigo-500)] rtl:origin-right"
                        style={{ width: `${(share / channelShares[0]) * 100}%` }}
                      />
                    </div>
                    <span dir="ltr" className="w-10 shrink-0 text-end text-xs font-semibold tabular-nums text-[var(--text-primary)] rtl:text-left">
                      {share}%
                    </span>
                  </li>
                ))}
              </ul>
            </figure>
          </div>

          <ul data-reveal-group aria-label={t.featuresLabel} className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-[15px] text-[var(--text-secondary)]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--indigo-50)] text-[var(--indigo-500)]">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
