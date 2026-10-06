'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { CheckCheck, CircleCheck, Mic, Phone, PhoneOff, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/i18n/LocaleContext';
import '@/styles/hero.css';

const copy = {
  en: {
    titleLead: 'AI agents that answer every call, video call and chat,',
    titleAccent: 'in Arabic and English.',
    description:
      'Talkys takes orders, books appointments and test drives, and answers your customers 24/7 on the phone, on video and across WhatsApp, Instagram and web chat. When a conversation needs a person, it hands over with a full summary.',
    ctaPrimary: 'Book a demo',
    ctaSecondary: 'Hear it in action',
    metrics: [
      { value: '24/7', label: 'Every call answered' },
      { value: '< 3s', label: 'To first reply' },
      { value: 'AR · EN · FR', label: 'Switching mid-sentence' },
    ],
    visualLabel: 'Illustration: a Talkys agent answering a phone call, a video call and a WhatsApp chat at the same time',
    call: {
      kind: 'Phone call',
      status: 'Answered',
      business: 'Your restaurant',
      customer: 'Can I book a table for four tonight at 8?',
      agent: 'Done, a table for four at 8pm. I’ve sent you an SMS confirmation.',
      result: 'Booking created',
    },
    video: {
      live: 'Video call',
      name: 'Layla',
      role: 'AI video agent · Your hotel',
      caption: 'Your room is ready from 2pm. Shall I arrange an airport pickup?',
      imageAlt: 'AI video agent on a call with a hotel guest',
    },
    chat: {
      business: 'Your showroom',
      status: 'online',
      messages: [
        { side: 'customer', text: 'Is the Tucson free for a test drive on Saturday?' },
        { side: 'agent', text: 'Yes! 11am or 2pm?' },
        { side: 'customer', text: '11 works' },
        { side: 'agent', text: 'Booked ✓ See you Saturday.' },
      ],
    },
  },
  ar: {
    titleLead: 'وكلاء ذكاء اصطناعي يردّون على كل مكالمة ومكالمة فيديو ومحادثة،',
    titleAccent: 'بالعربية والإنجليزية.',
    description:
      'يستقبل Talkys الطلبات، ويحجز المواعيد وتجارب القيادة، ويردّ على عملائك على مدار الساعة عبر الهاتف والفيديو وWhatsApp وInstagram والدردشة على موقعك. وعندما تحتاج المحادثة إلى موظف، يحوّلها إليه مع ملخص كامل.',
    ctaPrimary: 'احجز عرضاً توضيحياً',
    ctaSecondary: 'استمع إليه أثناء العمل',
    metrics: [
      { value: '24/7', label: 'لا مكالمة دون ردّ' },
      { value: '< 3s', label: 'حتى أول ردّ' },
      { value: 'AR · EN · FR', label: 'ينتقل بين اللغات في الجملة نفسها' },
    ],
    visualLabel: 'رسم توضيحي: وكيل Talkys يردّ على مكالمة هاتفية ومكالمة فيديو ومحادثة WhatsApp في الوقت نفسه',
    call: {
      kind: 'مكالمة هاتفية',
      status: 'تم الردّ',
      business: 'مطعمك',
      customer: 'هل يمكنني حجز طاولة لأربعة أشخاص الليلة الساعة ٨؟',
      agent: 'تم، طاولة لأربعة الساعة ٨ مساءً. أرسلت لك التأكيد برسالة نصية.',
      result: 'تم إنشاء الحجز',
    },
    video: {
      live: 'مكالمة فيديو',
      name: 'ليلى',
      role: 'وكيلة فيديو بالذكاء الاصطناعي · فندقك',
      caption: 'غرفتك جاهزة من الساعة الثانية. هل أرتّب لك توصيلاً من المطار؟',
      imageAlt: 'وكيلة فيديو بالذكاء الاصطناعي في مكالمة مع نزيل فندق',
    },
    chat: {
      business: 'معرضك',
      status: 'متصل الآن',
      messages: [
        { side: 'customer', text: 'هل Tucson متاحة لتجربة قيادة يوم السبت؟' },
        { side: 'agent', text: 'نعم! الساعة ١١ صباحاً أم ٢ ظهراً؟' },
        { side: 'customer', text: 'الساعة ١١ مناسبة' },
        { side: 'agent', text: 'تم الحجز ✓ نراك يوم السبت.' },
      ],
    },
  },
};

export function HeroSection() {
  const t = useCopy(copy);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-glow" />

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <h1
            className="hero-enter mx-auto max-w-4xl font-display text-[34px] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[50px] lg:text-[60px]"
            style={{ '--d': '60ms' } as CSSProperties}
          >
            {t.titleLead} <span className="gradient-text">{t.titleAccent}</span>
          </h1>

          <p
            className="hero-enter mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl"
            style={{ '--d': '120ms' } as CSSProperties}
          >
            {t.description}
          </p>

          <div
            className="hero-enter mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4"
            style={{ '--d': '180ms' } as CSSProperties}
          >
            <Button asChild variant="brand" size="xl" className="sm:min-w-[220px]">
              <Link href="/#contact">{t.ctaPrimary}</Link>
            </Button>
            <Button asChild variant="brand-outline" size="xl" className="sm:min-w-[220px]">
              <Link href="/#demo">{t.ctaSecondary}</Link>
            </Button>
          </div>

          <dl
            className="hero-enter mx-auto mt-12 grid max-w-2xl grid-cols-3 divide-x divide-[var(--border-color)] rtl:divide-x-reverse"
            style={{ '--d': '220ms' } as CSSProperties}
          >
            {t.metrics.map((metric) => (
              <div key={metric.value} className="flex flex-col items-center gap-1 px-2">
                <dt className="order-2 text-xs text-[var(--text-muted)] sm:text-sm">{metric.label}</dt>
                <dd
                  dir="ltr"
                  className="order-1 whitespace-nowrap font-display text-xl font-bold tabular-nums tracking-tight text-[var(--text-primary)] sm:text-4xl"
                >
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="hero-enter hero-enter-media relative mx-auto mt-14 max-w-[1040px] rounded-2xl border border-[var(--border-color)] bg-white p-1.5 shadow-lift lg:mt-16 lg:rounded-[28px] lg:p-2"
          style={{ '--d': '260ms' } as CSSProperties}
        >
          <div
            role="img"
            aria-label={t.visualLabel}
            className="relative overflow-hidden rounded-xl bg-[var(--bg-sunken)] p-3 sm:p-5 lg:rounded-[22px] lg:p-8"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_40%,var(--indigo-50),transparent_70%)]" />
            <div aria-hidden className="relative grid items-start gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-[1fr_1.25fr_1fr] lg:gap-5">
              <CallCard t={t.call} />
              <VideoTile t={t.video} />
              <ChatCard t={t.chat} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Copy = (typeof copy)['en'];

function CallCard({ t }: { t: Copy['call'] }) {
  return (
    <div className="tk-float order-2 rounded-2xl border border-[var(--border-color)] bg-white p-4 text-start shadow-card lg:order-1 lg:mt-12" style={{ '--fd': '0s' } as CSSProperties}>
      <div className="flex items-center gap-3">
        <span className="tk-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--viz-7)] text-white">
          <Phone className="relative h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">{t.business}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {t.kind} · <span className="font-medium text-[var(--viz-7)]">{t.status}</span>
          </p>
        </div>
        <span dir="ltr" className="ms-auto font-mono text-[11px] tabular-nums text-[var(--text-muted)]">
          00:42
        </span>
      </div>

      <div className="tk-wave mt-4">
        {Array.from({ length: 22 }, (_, k) => (
          <span key={k} style={{ '--k': k } as CSSProperties} />
        ))}
      </div>

      <div className="mt-4 space-y-2 text-[13px] leading-snug">
        <p className="rounded-xl rounded-ss-sm bg-[var(--bg-sunken)] px-3 py-2 text-[var(--text-secondary)]">{t.customer}</p>
        <p className="rounded-xl rounded-se-sm bg-[var(--indigo-50)] px-3 py-2 text-[var(--indigo-800)]">{t.agent}</p>
      </div>

      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--viz-green-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--viz-7)]">
        <CircleCheck className="h-3.5 w-3.5" />
        {t.result}
      </p>
    </div>
  );
}

function VideoTile({ t }: { t: Copy['video'] }) {
  return (
    <div className="order-1 sm:col-span-2 lg:order-2 lg:col-span-1">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--indigo-950)] shadow-lift">
        <img
          src="/avatar-layla.jpg"
          alt={t.imageAlt}
          width={800}
          height={1000}
          className="aspect-[4/3] w-full object-cover object-top sm:aspect-[16/10] lg:aspect-[4/5]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />

        <div className="absolute start-3 top-3 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--viz-7)]" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white">{t.live}</span>
        </div>
        <span className="absolute end-3 top-3 rounded-full bg-black/45 px-2.5 py-1 font-mono text-[11px] tabular-nums text-white backdrop-blur-sm">
          <span dir="ltr">03:18</span>
        </span>

        <div className="absolute inset-x-3 bottom-3 space-y-3">
          <p className="rounded-xl bg-black/55 px-3 py-2 text-start text-[13px] leading-snug text-white backdrop-blur-md">{t.caption}</p>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 text-start">
              <p className="text-sm font-semibold text-white">{t.name}</p>
              <p className="truncate text-xs text-white/75">{t.role}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                <Mic className="h-4 w-4" />
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                <Video className="h-4 w-4" />
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--viz-red)] text-white">
                <PhoneOff className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatCard({ t }: { t: Copy['chat'] }) {
  return (
    <div
      className="tk-float order-3 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-white text-start shadow-card lg:mt-4"
      style={{ '--fd': '-3.5s' } as CSSProperties}
    >
      {/* WhatsApp brand colours */}
      <div className="flex items-center gap-2.5 bg-[#075e54] px-3.5 py-2.5 text-white">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25d366] font-display text-sm font-bold">T</span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight">{t.business}</p>
          <p className="text-[11px] leading-tight text-white/75">{t.status}</p>
        </div>
      </div>
      <div className="space-y-1.5 bg-[#efeae2] px-3 py-3.5 text-[13px] leading-snug">
        {t.messages.map((m, i) => (
          <p
            key={i}
            className={`tk-bubble max-w-[85%] rounded-xl px-3 py-1.5 text-[#111b21] shadow-xs ${
              m.side === 'agent' ? 'ms-auto rounded-se-sm bg-[#d9fdd3]' : 'me-auto rounded-ss-sm bg-white'
            }`}
            style={{ '--bd': `${700 + i * 650}ms` } as CSSProperties}
          >
            {m.text}
            {m.side === 'agent' && <CheckCheck className="ms-1 inline h-3.5 w-3.5 text-[#53bdeb]" />}
          </p>
        ))}
        <div className="tk-typing me-auto flex w-fit items-center gap-1 rounded-xl rounded-ss-sm bg-white px-3 py-2.5 shadow-xs">
          {[0, 1, 2].map((k) => (
            <span key={k} className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" style={{ '--k': k } as CSSProperties} />
          ))}
        </div>
      </div>
    </div>
  );
}
