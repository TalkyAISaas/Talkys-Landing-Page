'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { BedDouble, Car, CheckCheck, Info, MessageSquare, Mic, Pause, Phone, Play, RotateCcw, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { useReveal } from '@/hooks/useReveal';
import { useCopy, useLocale } from '@/i18n/LocaleContext';
import { cn } from '@/lib/utils';
import { DEMO_INDUSTRIES, type DemoIndustry, type DemoIndustryId } from '@/data/demoIndustries';
import { DEMO_SCRIPTS, type ChatLanguage } from '@/data/demoScripts';
import '@/styles/demo.css';

const INDUSTRY_ICONS: Record<DemoIndustryId, typeof Car> = {
  restaurant: UtensilsCrossed,
  dealership: Car,
  hotel: BedDouble,
  retail: ShoppingBag,
};

const copy = {
  en: {
    eyebrow: 'Hear it in action',
    titleLead: 'Pick a business.',
    titleAccent: 'Hear Talkys pick up.',
    description: 'Real sample calls and chats, the way your customers would experience them. Choose an industry, then switch between a phone call and a WhatsApp chat.',
    industryLabel: 'Industry',
    modeLabel: 'Channel',
    voice: 'Phone call',
    chat: 'Chat',
    sampleCall: 'Sample call',
    live: 'On the call',
    play: 'Play sample call',
    pause: 'Pause sample call',
    pressPlay: 'Press play to hear a Talkys agent take this call. Captions follow along.',
    customer: 'Customer',
    agent: 'Talkys agent',
    englishNote: '',
    chatLanguage: 'Chat language',
    online: 'online',
    replay: 'Replay',
    sampleData: 'Sample conversation. Names, prices and dates are illustrative.',
    imageAlt: 'Photo of the car sent in the chat',
  },
  ar: {
    eyebrow: 'استمع إليه أثناء العمل',
    titleLead: 'اختر نشاطاً تجارياً.',
    titleAccent: 'واستمع إلى Talkys وهو يردّ.',
    description: 'مكالمات ومحادثات نموذجية كما سيعيشها عملاؤك تماماً. اختر القطاع، ثم بدّل بين مكالمة هاتفية ومحادثة WhatsApp.',
    industryLabel: 'القطاع',
    modeLabel: 'القناة',
    voice: 'مكالمة هاتفية',
    chat: 'محادثة',
    sampleCall: 'مكالمة نموذجية',
    live: 'المكالمة جارية',
    play: 'تشغيل المكالمة النموذجية',
    pause: 'إيقاف المكالمة النموذجية',
    pressPlay: 'اضغط تشغيل لتستمع إلى وكيل Talkys وهو يتولّى هذه المكالمة، مع ترجمة نصية متزامنة.',
    customer: 'العميل',
    agent: 'وكيل Talkys',
    englishNote: 'هذه المكالمة النموذجية مسجّلة بالإنجليزية. يتحدث Talkys العربية بلهجات الخليج والشام ومصر والفصحى بالطريقة نفسها، وجرّب المحادثة لترى ذلك بالعربية.',
    chatLanguage: 'لغة المحادثة',
    online: 'متصل الآن',
    replay: 'إعادة',
    sampleData: 'محادثة نموذجية. الأسماء والأسعار والتواريخ للتوضيح فقط.',
    imageAlt: 'صورة السيارة المرسلة في المحادثة',
  },
};

type Copy = (typeof copy)['en'];
type Mode = 'voice' | 'chat';

export function DemoSection() {
  const t = useCopy(copy);
  const { locale } = useLocale();
  const sectionRef = useReveal<HTMLElement>();
  const [industryId, setIndustryId] = useState<DemoIndustryId>('restaurant');
  const [mode, setMode] = useState<Mode>('voice');
  const [chatLang, setChatLang] = useState<ChatLanguage>('en');
  const pickedRef = useRef({ mode: false, lang: false });

  // Sample recordings are English only: Arabic visitors start on the chat, in Arabic.
  useEffect(() => {
    if (!pickedRef.current.mode) setMode(locale === 'ar' ? 'chat' : 'voice');
    if (!pickedRef.current.lang) setChatLang(locale);
  }, [locale]);

  const industry = DEMO_INDUSTRIES.find((i) => i.id === industryId) ?? DEMO_INDUSTRIES[0];

  return (
    <section ref={sectionRef} id="demo" className="relative py-20 lg:py-28">
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

        <div data-reveal className="mt-10 flex flex-col items-center gap-4">
          <div role="group" aria-label={t.industryLabel} className="flex flex-wrap justify-center gap-2">
            {DEMO_INDUSTRIES.map((ind) => {
              const Icon = INDUSTRY_ICONS[ind.id];
              const active = ind.id === industryId;
              return (
                <button
                  key={ind.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setIndustryId(ind.id)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out-strong active:scale-[0.97]',
                    active
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-white shadow-card'
                      : 'border-[var(--border-color)] bg-white text-[var(--text-secondary)] hover:border-[var(--indigo-200)] hover:text-[var(--text-primary)]'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {ind.label[locale]}
                </button>
              );
            })}
          </div>

          <Segmented
            label={t.modeLabel}
            value={mode}
            onChange={(m) => {
              pickedRef.current.mode = true;
              setMode(m);
            }}
            options={[
              { value: 'voice', label: t.voice, icon: Phone },
              { value: 'chat', label: t.chat, icon: MessageSquare },
            ]}
          />
        </div>

        <div data-reveal className="mx-auto mt-8 max-w-2xl">
          {mode === 'voice' ? (
            <VoiceDemo key={`voice-${industry.id}`} industry={industry} t={t} />
          ) : (
            <ChatDemo
              key={`chat-${industry.id}-${chatLang}`}
              industry={industry}
              lang={chatLang}
              onLang={(l) => {
                pickedRef.current.lang = true;
                setChatLang(l);
              }}
              t={t}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
  small = false,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; icon?: typeof Car }[];
  small?: boolean;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full border border-[var(--border-color)] bg-white p-1 shadow-xs">
      {options.map(({ value: v, label: l, icon: Icon }) => (
        <button
          key={v}
          type="button"
          aria-pressed={v === value}
          onClick={() => onChange(v)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full font-semibold transition-[background-color,color] duration-150',
            small ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm',
            v === value ? 'bg-[var(--plum-500)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          )}
        >
          {Icon && <Icon className="h-4 w-4" />}
          {l}
        </button>
      ))}
    </div>
  );
}

/* ───────────────────────── Voice ───────────────────────── */

type Cue = { start: number; end: number; speaker: 'customer' | 'agent'; text: string };

function toSeconds(stamp: string) {
  return stamp
    .trim()
    .split(':')
    .reduce((acc, part) => acc * 60 + parseFloat(part), 0);
}

function parseVtt(src: string): Cue[] {
  return src
    .replace(/\r/g, '')
    .split(/\n\n+/)
    .map((block) => {
      const lines = block.split('\n');
      const timing = lines.findIndex((l) => l.includes('-->'));
      if (timing < 0) return null;
      const [from, to] = lines[timing].split('-->');
      const raw = lines.slice(timing + 1).join(' ').trim();
      const match = raw.match(/^(Customer|Agent):\s*(.*)$/i);
      return {
        start: toSeconds(from),
        end: toSeconds(to.split(' ').filter(Boolean)[0]),
        speaker: match && match[1].toLowerCase() === 'agent' ? 'agent' : 'customer',
        text: match ? match[2] : raw,
      } as Cue;
    })
    .filter((c): c is Cue => c !== null && c.text.length > 0);
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${m}:${ss.toString().padStart(2, '0')}`;
}

function VoiceDemo({ industry, t }: { industry: DemoIndustry; t: Copy }) {
  const { locale } = useLocale();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [cues, setCues] = useState<Cue[]>([]);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch(industry.captions)
      .then((r) => (r.ok ? r.text() : ''))
      .then((text) => {
        if (!cancelled) setCues(parseVtt(text));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [industry.captions]);

  // Smooth progress while playing (timeupdate alone only fires ~4x a second).
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      setTime(audioRef.current?.currentTime ?? 0);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => setPlaying(false));
    else el.pause();
  };

  const total = duration || cues[cues.length - 1]?.end || 0;
  const progress = total > 0 ? Math.min(100, (time / total) * 100) : 0;
  const activeIndex = cues.findIndex((c) => time >= c.start && time < c.end + 0.5);
  const started = playing || time > 0;

  return (
    <div className="rounded-[28px] border border-[var(--border-color)] bg-white p-2 shadow-lift">
      <div className="rounded-[22px] bg-[var(--bg-primary)] p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--indigo-50)] text-[var(--indigo-600)]">
            <Phone className="h-[18px] w-[18px]" />
          </span>
          <div className="min-w-0 text-start">
            <p className="truncate text-sm font-semibold text-[var(--text-primary)]">{industry.business[locale]}</p>
            <p className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              {playing && <span className="h-1.5 w-1.5 rounded-full bg-[var(--viz-7)]" />}
              {playing ? t.live : t.sampleCall}
            </p>
          </div>
          <span className="ms-auto rounded-full border border-[var(--border-color)] bg-white px-2.5 py-1 font-mono text-[11px] font-medium text-[var(--text-muted)]">
            EN
          </span>
        </div>

        <div className="dm-wave mt-6" data-playing={playing || undefined} aria-hidden>
          {Array.from({ length: 36 }, (_, k) => (
            <span key={k} style={{ '--k': k, '--h': 0.45 + 0.55 * Math.abs(Math.sin(k * 1.7)) } as CSSProperties} />
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? t.pause : t.play}
            className="btn-brand flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-150 ease-out-strong active:scale-[0.94]"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-px rtl:-scale-x-100" />}
          </button>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--indigo-100)]">
            <div className="h-full rounded-full bg-[var(--plum-500)]" style={{ width: `${progress}%` }} />
          </div>
          <span dir="ltr" className="font-mono text-xs tabular-nums text-[var(--text-muted)]">
            {formatTime(time)} / {formatTime(total)}
          </span>
        </div>

        <div aria-live="polite" className="mt-6 min-h-[168px] space-y-2 text-start">
          {!started ? (
            <p className="rounded-2xl border border-dashed border-[var(--border-strong)] px-4 py-5 text-center text-sm text-[var(--text-muted)]">{t.pressPlay}</p>
          ) : (
            cues
              .filter((c) => c.start <= time + 0.05)
              .slice(-3)
              .map((c) => {
                const active = cues.indexOf(c) === activeIndex;
                return (
                  <div
                    key={c.start}
                    dir="ltr"
                    className={cn(
                      'dm-cue dm-bubble max-w-[88%] rounded-2xl px-4 py-2.5 text-left text-sm leading-snug',
                      c.speaker === 'agent'
                        ? 'ml-auto rounded-br-md bg-[var(--indigo-50)] text-[var(--indigo-900)]'
                        : 'mr-auto rounded-bl-md bg-white text-[var(--text-secondary)] shadow-xs',
                      !active && 'opacity-60'
                    )}
                  >
                    <span dir={locale === 'ar' ? 'rtl' : 'ltr'} className="mb-0.5 block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      {c.speaker === 'agent' ? t.agent : t.customer}
                    </span>
                    {c.text}
                  </div>
                );
              })
          )}
        </div>

        {t.englishNote && (
          <p className="mt-5 flex items-start gap-2 rounded-xl bg-[var(--plum-50)] px-3.5 py-3 text-start text-xs leading-relaxed text-[var(--plum-800)]">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            {t.englishNote}
          </p>
        )}

        <audio
          ref={audioRef}
          src={industry.audio}
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onError={() => setPlaying(false)}
        />
      </div>
    </div>
  );
}

/* ───────────────────────── Chat ───────────────────────── */

const STEP_MS = 1100;

function ChatDemo({
  industry,
  lang,
  onLang,
  t,
}: {
  industry: DemoIndustry;
  lang: ChatLanguage;
  onLang: (l: ChatLanguage) => void;
  t: Copy;
}) {
  const messages = DEMO_SCRIPTS[lang][industry.id];
  const [shown, setShown] = useState(0);
  const [inView, setInView] = useState(false);
  const [run, setRun] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Start playing the script once the phone is on screen.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    // Under reduced motion the whole thread appears at once.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = window.setInterval(
      () => {
        setShown((n) => {
          const next = reduced ? messages.length : Math.min(n + 1, messages.length);
          if (next >= messages.length) window.clearInterval(id);
          return next;
        });
      },
      reduced ? 0 : STEP_MS
    );
    return () => window.clearInterval(id);
  }, [inView, messages, run]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [shown]);

  const done = shown >= messages.length;
  const next = messages[shown];

  return (
    <div ref={boxRef}>
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
        <Segmented
          small
          label={t.chatLanguage}
          value={lang}
          onChange={onLang}
          options={[
            { value: 'en', label: 'English' },
            { value: 'ar', label: 'العربية' },
          ]}
        />
        <button
          type="button"
          onClick={() => {
            setShown(0);
            setRun((r) => r + 1);
          }}
          disabled={!done}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-color)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] transition-opacity duration-150 hover:text-[var(--text-primary)] disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {t.replay}
        </button>
      </div>

      <div className="mx-auto max-w-[400px] rounded-[28px] border border-[var(--border-color)] bg-white p-2 shadow-lift">
        <div className="overflow-hidden rounded-[22px]">
          {/* WhatsApp brand colours */}
          <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25d366] font-display text-sm font-bold">T</span>
            <div className="min-w-0 flex-1 text-start">
              <p className="truncate text-sm font-semibold leading-tight">{industry.business[lang]}</p>
              <p className="text-[11px] leading-tight text-white/75">{lang === 'ar' ? copy.ar.online : copy.en.online}</p>
            </div>
            <Phone className="h-[18px] w-[18px] opacity-90" />
          </div>

          <div ref={scrollRef} dir={lang === 'ar' ? 'rtl' : 'ltr'} className="dm-chat-bg h-[420px] space-y-2 overflow-y-auto px-3 py-4 text-[14px] leading-snug">
            {messages.slice(0, shown).map((m, i) => {
              const agent = m.side === 'agent';
              return (
                <div
                  key={i}
                  className={cn(
                    'dm-bubble w-fit max-w-[80%] rounded-2xl text-[#111b21] shadow-xs',
                    agent ? 'ms-auto rounded-se-md bg-[#d9fdd3]' : 'me-auto rounded-ss-md bg-white',
                    m.image ? 'p-1' : 'px-3 py-2'
                  )}
                >
                  {m.image ? (
                    <img src={m.image} alt={lang === 'ar' ? copy.ar.imageAlt : copy.en.imageAlt} loading="lazy" className="block w-full max-w-[240px] rounded-xl object-cover" />
                  ) : (
                    <>
                      {m.text}
                      {agent && <CheckCheck className="ms-1 inline h-3.5 w-3.5 text-[#53bdeb]" />}
                    </>
                  )}
                </div>
              );
            })}
            {!done && next && (
              <div
                aria-hidden
                className={cn(
                  'dm-typing flex w-fit items-center gap-1 rounded-2xl px-3 py-2.5 shadow-xs',
                  next.side === 'agent' ? 'ms-auto rounded-se-md bg-[#d9fdd3]' : 'me-auto rounded-ss-md bg-white'
                )}
              >
                {[0, 1, 2].map((k) => (
                  <span key={k} className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" style={{ '--k': k } as CSSProperties} />
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-black/5 bg-[#f0f2f5] px-3 py-2.5">
            <div className="flex-1 rounded-full bg-white px-3 py-1.5 text-xs text-[var(--text-muted)]">…</div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00a884] text-white">
              <Mic className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-[var(--text-muted)]">{t.sampleData}</p>
    </div>
  );
}
