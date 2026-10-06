'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  Ear,
  FileText,
  MessageCircle,
  PhoneIncoming,
  RefreshCw,
  TrendingUp,
  UserRound,
  Zap,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { useReveal } from '@/hooks/useReveal';
import { useCopy } from '@/i18n/LocaleContext';
import '@/styles/how-it-works.css';

const stepIcons = [PhoneIncoming, Ear, BookOpen, Zap, RefreshCw, UserRound, TrendingUp];
const eventIcons = [Ear, BookOpen, CalendarCheck, MessageCircle, RefreshCw, FileText];

// `at` = the beat on which each line / event appears in the looping call demo.
const transcriptBeats = [1, 3, 5, 6];
const eventBeats = [2, 3, 6, 7, 8, 9];
const LAST_BEAT = 9;
const BEAT_MS = 1100;
const HOLD_MS = 3600;

const en = {
  eyebrow: 'How Talkys works',
  titleLead: 'From hello to done,',
  titleAccent: 'without the hold music.',
  description: 'Talkys picks up, understands what your customer wants, gets it done and updates your systems, all in one conversation.',
  visualLabel: 'Illustration of a Talkys agent taking a restaurant booking over the phone',
  liveCall: 'Live call',
  agentName: 'Talkys agent',
  agentRole: 'Reservations',
  caller: 'Caller',
  agent: 'Talkys',
  transcript: [
    'Hi, can I book a table for 4 tonight? حوالي الساعة 8',
    'Of course! 8:00 PM for four. Terrace or inside?',
    'Terrace, please.',
    "Done, table 12 on the terrace. I've sent your confirmation on WhatsApp.",
  ],
  behindTitle: 'Behind the call',
  events: [
    { label: 'Understood', detail: 'Table for 4 · tonight · 8:00 PM' },
    { label: 'Checked your info', detail: 'Terrace open until midnight' },
    { label: 'Booked', detail: 'Terrace, table 12' },
    { label: 'Confirmed', detail: 'WhatsApp sent to the guest' },
    { label: 'Synced', detail: 'Guest saved in your CRM' },
    { label: 'Logged', detail: 'Transcript and summary saved' },
  ],
  stepsLabel: 'How Talkys works, step by step',
  steps: [
    { title: 'Picks up', description: 'Answers every call, video call and chat in seconds, day or night, even when ten come in at once.' },
    { title: 'Understands', description: 'Follows Gulf, Levantine or Egyptian Arabic, English or French, even when your customer switches mid-sentence.' },
    { title: 'Answers from your knowledge', description: 'Replies with your real menu, prices, hours and policies. No guessing, no made-up answers.' },
    { title: 'Acts', description: 'Books the table, takes the order, quotes the price or schedules the test drive, then confirms it.' },
    { title: 'Syncs to your stack', description: 'Every booking, order and lead lands in your CRM, POS, calendar or helpdesk as it happens.' },
    { title: 'Hands off to your team', description: 'Passes tricky or high-value conversations to a person, with a summary and full transcript.' },
    { title: 'Learns from every call', description: 'Every conversation is logged, transcribed and searchable, so you see what customers ask and where to improve.' },
  ],
  ctaText: 'Hear it handle a real call, in your dialect.',
  ctaButton: 'Book a demo',
};

const copy: { en: typeof en; ar: typeof en } = {
  en,
  ar: {
    eyebrow: 'كيف يعمل Talkys',
    titleLead: 'من التحية حتى إتمام الطلب،',
    titleAccent: 'دون انتظار على الخط.',
    description: 'يردّ Talkys على العميل، ويفهم ما يريده، وينفّذ طلبه، ويحدّث أنظمتك، كل ذلك في محادثة واحدة.',
    visualLabel: 'رسم توضيحي لوكيل Talkys يأخذ حجزاً في مطعم عبر الهاتف',
    liveCall: 'مكالمة مباشرة',
    agentName: 'وكيل Talkys',
    agentRole: 'الحجوزات',
    caller: 'المتصل',
    agent: 'Talkys',
    transcript: [
      'مرحبا، بدي احجز طاولة لأربعة الليلة، around 8?',
      'أكيد! الساعة 8 مساءً لأربعة أشخاص. تفضّل التراس أو الداخل؟',
      'التراس، لو سمحت.',
      'تم، الطاولة 12 على التراس. أرسلت لك التأكيد على WhatsApp.',
    ],
    behindTitle: 'خلف المكالمة',
    events: [
      { label: 'فهم الطلب', detail: 'طاولة لأربعة · الليلة · 8:00 مساءً' },
      { label: 'راجع معلوماتك', detail: 'التراس مفتوح حتى منتصف الليل' },
      { label: 'أتمّ الحجز', detail: 'التراس، طاولة 12' },
      { label: 'أرسل التأكيد', detail: 'رسالة WhatsApp إلى الضيف' },
      { label: 'حدّث أنظمتك', detail: 'بيانات الضيف محفوظة في CRM' },
      { label: 'سجّل المحادثة', detail: 'النص الكامل والملخص محفوظان' },
    ],
    stepsLabel: 'كيف يعمل Talkys خطوة بخطوة',
    steps: [
      { title: 'يردّ فوراً', description: 'يجيب على كل مكالمة صوتية أو مرئية وكل محادثة خلال ثوانٍ، ليلاً ونهاراً، حتى لو وصلت عشر مكالمات معاً.' },
      { title: 'يفهم', description: 'يفهم اللهجات الخليجية والشامية والمصرية والإنجليزية والفرنسية، حتى عندما ينتقل العميل بينها في الجملة نفسها.' },
      { title: 'يجيب من معلوماتك', description: 'يردّ بقائمتك وأسعارك ومواعيدك وسياساتك الفعلية. لا تخمين ولا إجابات مختلقة.' },
      { title: 'ينفّذ', description: 'يحجز الطاولة، ويأخذ الطلب، ويقدّم عرض السعر، أو يحدّد موعد تجربة القيادة، ثم يرسل التأكيد.' },
      { title: 'يتزامن مع أنظمتك', description: 'كل حجز وطلب وعميل محتمل يصل إلى نظام CRM أو نقاط البيع أو التقويم أو منصة الدعم لحظة حدوثه.' },
      { title: 'يحوّل إلى فريقك', description: 'يحيل المحادثات الدقيقة أو المهمة إلى موظف، مع ملخص ونص كامل للمحادثة.' },
      { title: 'يتعلّم من كل مكالمة', description: 'كل محادثة مسجّلة ومفرّغة نصياً وقابلة للبحث، لترى ما يسأل عنه عملاؤك وأين يمكنك التحسين.' },
    ],
    ctaText: 'استمع إليه وهو يدير مكالمة حقيقية بلهجتك.',
    ctaButton: 'احجز عرضاً توضيحياً',
  },
};

/** Loops through the call beats while the visual is on screen; reduced motion shows the finished call. */
function useCallBeat(target: React.RefObject<HTMLElement | null>) {
  const [beat, setBeat] = useState(0);
  const [live, setLive] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedRef.current) {
      setBeat(LAST_BEAT);
      return;
    }
    const el = target.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  useEffect(() => {
    if (!live || reducedRef.current) return;
    const t = window.setTimeout(
      () => setBeat((b) => (b >= LAST_BEAT ? 0 : b + 1)),
      beat >= LAST_BEAT ? HOLD_MS : beat === 0 ? 500 : BEAT_MS
    );
    return () => window.clearTimeout(t);
  }, [live, beat]);

  return { beat, live };
}

function CallVisual() {
  const t = useCopy(copy);
  const ref = useRef<HTMLDivElement>(null);
  const { beat, live } = useCallBeat(ref);
  const latestEvent = eventBeats.reduce((acc, at, i) => (beat >= at ? i : acc), -1);

  return (
    <figure
      ref={ref}
      aria-label={t.visualLabel}
      className="fx-scene relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-white p-1.5 shadow-lift lg:rounded-[28px] lg:p-2"
      data-live={live || undefined}
    >
      <div className="grid overflow-hidden rounded-xl bg-[var(--bg-primary)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:rounded-[22px]">
        {/* The call */}
        <div className="flex flex-col border-b border-[var(--border-subtle)] lg:border-b-0 lg:border-e">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-white px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style={{ background: 'var(--cta-gradient)' }}>
                <PhoneIncoming className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-[15px] font-semibold text-[var(--text-primary)]">{t.agentName}</p>
                <p className="truncate text-[12px] text-[var(--text-muted)]">
                  {t.agentRole} · <span dir="ltr">+971 50 ••• 4412</span>
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--viz-green-soft)] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--viz-green)]">
              <span className="fx-blink h-1.5 w-1.5 rounded-full bg-current" />
              {t.liveCall}
            </span>
          </div>

          <div className="flex justify-center py-4" aria-hidden>
            <div className="fx-wave">
              {Array.from({ length: 24 }, (_, i) => (
                <i key={i} style={{ '--i': i % 12 } as CSSProperties} />
              ))}
            </div>
          </div>

          <ul className="flex flex-1 flex-col gap-2.5 px-5 pb-6">
            {t.transcript.map((line, i) => {
              const fromAgent = i % 2 === 1;
              return (
                <li
                  key={i}
                  data-on={beat >= transcriptBeats[i] || undefined}
                  className={`hiw-item flex flex-col gap-1 ${fromAgent ? 'items-end' : 'items-start'}`}
                >
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {fromAgent ? t.agent : t.caller}
                  </span>
                  <p
                    className={`max-w-[88%] rounded-2xl border px-3.5 py-2 text-[13.5px] leading-snug shadow-xs ${
                      fromAgent
                        ? 'rounded-ee-md border-[var(--indigo-200)] bg-[var(--indigo-50)] text-[var(--indigo-800)]'
                        : 'rounded-es-md border-[var(--border-color)] bg-white text-[var(--text-primary)]'
                    }`}
                  >
                    {line}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* What Talkys does while it talks */}
        <div className="px-5 py-5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{t.behindTitle}</p>
          <ol className="mt-3 space-y-2">
            {t.events.map(({ label, detail }, i) => {
              const Icon = eventIcons[i];
              return (
                <li
                  key={i}
                  data-on={beat >= eventBeats[i] || undefined}
                  data-latest={(latestEvent === i && beat < LAST_BEAT) || undefined}
                  className="hiw-item hiw-event flex items-center gap-3 rounded-xl border border-[var(--border-color)] bg-white px-3 py-2.5"
                >
                  <span className="hiw-event-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold text-[var(--text-primary)]">{label}</span>
                    <span className="block truncate text-[12px] text-[var(--text-secondary)]">{detail}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </figure>
  );
}

export function HowItWorksSection() {
  const t = useCopy(copy);
  const sectionRef = useReveal<HTMLElement>(({ reveal }) => {
    reveal('.hiw-visual', { y: 24 });
  });

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-20 lg:py-28">
      <div className="brand-rule absolute inset-x-0 top-0 opacity-40" />
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

        <div className="hiw-visual mx-auto mt-12 max-w-[920px]">
          <CallVisual />
        </div>

        <ol data-reveal-group aria-label={t.stepsLabel} className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <li key={i} className="glass-panel-premium flex flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--indigo-50)] text-[var(--indigo-500)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-[var(--indigo-300)]">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-[var(--text-primary)]">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">{step.description}</p>
              </li>
            );
          })}
          <li className="flex flex-col justify-between rounded-[1.25rem] p-6 text-white shadow-cta" style={{ background: 'var(--cta-gradient)' }}>
            <p className="font-display text-lg font-semibold leading-snug">{t.ctaText}</p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-1.5 self-start rounded-[10px] bg-white px-4 py-2 text-sm font-semibold text-[var(--plum-700)] transition-transform duration-150 ease-out-strong active:scale-[0.97]"
            >
              {t.ctaButton}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </li>
        </ol>
      </div>
    </section>
  );
}
