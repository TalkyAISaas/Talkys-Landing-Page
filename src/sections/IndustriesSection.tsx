'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StepChain } from '@/components/StepChain';
import { SectionHeader } from '@/components/SectionHeader';
import { useReveal } from '@/hooks/useReveal';
import { useCopy, useLocale } from '@/i18n/LocaleContext';
import { featuredIndustries as industries } from '@/lib/industries';
import { cn } from '@/lib/utils';

const AUTOPLAY_MS = 6000;

const copy = {
  en: {
    eyebrow: 'Industries',
    titleLead: 'Built for businesses that',
    titleAccent: 'live on the phone.',
    description: 'Every industry gets the same thing: a customer reaches out, the agent understands, and the work gets done in your systems.',
    tabsLabel: 'Industries',
    customer: 'Customer',
    agent: 'Talkys agent',
    chainLabel: 'From conversation to action',
    chainAria: (label: string) => `${label}: from conversation to action`,
    details: (label: string) => `${label} in detail`,
    all: 'See all use cases',
  },
  ar: {
    eyebrow: 'القطاعات',
    titleLead: 'مصمَّم للأعمال التي',
    titleAccent: 'لا يتوقف هاتفها عن الرنين.',
    description: 'في كل قطاع، الفكرة نفسها: عميل يتواصل، والوكيل يفهم طلبه، والعمل يُنجَز مباشرة في أنظمتك.',
    tabsLabel: 'القطاعات',
    customer: 'العميل',
    agent: 'وكيل Talkys',
    chainLabel: 'من المحادثة إلى التنفيذ',
    chainAria: (label: string) => `${label}: من المحادثة إلى التنفيذ`,
    details: (label: string) => `${label} بالتفصيل`,
    all: 'عرض جميع حالات الاستخدام',
  },
};

export function IndustriesSection() {
  const t = useCopy(copy);
  const { locale, dir } = useLocale();
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userTookOver, setUserTookOver] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useReveal<HTMLElement>();

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [sectionRef]);

  // Autoplay only while the section is on screen and nobody is interacting with it.
  const autoplay = isVisible && !isHovered && !hasFocus && !userTookOver && !reducedMotion;
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % industries.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [autoplay, active]);

  const select = (index: number) => {
    setUserTookOver(true);
    setActive(index);
  };

  // Horizontal arrows follow reading direction.
  const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
  const backward = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowDown: index + 1,
      [forward]: index + 1,
      ArrowUp: index - 1,
      [backward]: index - 1,
      Home: 0,
      End: industries.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (keys[event.key] + industries.length) % industries.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  const industry = industries[active];
  const text = industry[locale];

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative py-20 lg:py-28"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setHasFocus(false);
      }}
    >
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

        <div data-reveal className="mt-14 grid items-start gap-6 lg:grid-cols-[260px_1fr] lg:gap-10">
          <div
            role="tablist"
            aria-label={t.tabsLabel}
            aria-orientation="vertical"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {industries.map((item, index) => {
              const Icon = item.icon;
              const selected = index === active;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`industry-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="industry-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={cn(
                    'flex shrink-0 items-center gap-3 rounded-xl border px-4 py-2.5 text-start text-sm font-semibold transition-[color,background-color,border-color,transform] duration-150 ease-out-strong active:scale-[0.98] lg:py-3',
                    selected
                      ? 'border-[var(--indigo-200)] bg-white text-[var(--indigo-600)] shadow-xs'
                      : 'border-transparent text-[var(--text-secondary)] hover:bg-white hover:text-[var(--text-primary)]'
                  )}
                >
                  <Icon className={cn('h-4 w-4 shrink-0', selected ? 'text-[var(--indigo-500)]' : 'text-[var(--text-muted)]')} />
                  <span className="whitespace-nowrap">{item[locale].label}</span>
                </button>
              );
            })}
          </div>

          <div
            id="industry-panel"
            data-inview
            role="tabpanel"
            aria-labelledby={`industry-tab-${industry.id}`}
            className="glass-panel-premium relative overflow-hidden"
          >
            <div key={industry.id} className="panel-swap relative grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              {/* Photo with the channel the conversation came in on */}
              <div className="relative h-48 overflow-hidden md:h-auto md:min-h-[440px]">
                <img
                  src={industry.image}
                  alt={text.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={industry.tileFocus ? { objectPosition: industry.tileFocus } : undefined}
                  width={1344}
                  height={768}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 text-white">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                    <industry.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold leading-tight text-white sm:text-xl">{text.label}</h3>
                </div>
              </div>

              <div className="relative p-6 sm:p-8">
                <div className="hero-glow opacity-50" />
                <div className="relative">
                  <p className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-color)] bg-white px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--viz-green)]" />
                    {text.channel}
                  </p>

                  <div className="mt-5 space-y-3">
                    <div className="max-w-[92%]">
                      <p className="mb-1 text-xs font-semibold text-[var(--text-muted)]">{t.customer}</p>
                      <p className="rounded-2xl rounded-ss-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-3 text-[15px] leading-relaxed text-[var(--text-primary)]">
                        {text.customer}
                      </p>
                    </div>
                    <div className="ms-auto max-w-[92%]">
                      <p className="mb-1 text-end text-xs font-semibold text-[var(--indigo-600)]">{t.agent}</p>
                      <p className="rounded-2xl rounded-se-md border border-[var(--indigo-100)] bg-[var(--indigo-50)] px-4 py-3 text-[15px] leading-relaxed text-[var(--text-primary)]">
                        {text.reply}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 text-sm font-semibold text-[var(--text-secondary)]">{t.chainLabel}</p>
                  <StepChain steps={text.chain} label={t.chainAria(text.label)} size="sm" className="mt-3 rtl:[&_svg]:-scale-x-100" />

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-5">
                    <Link
                      href={`/use-cases#${industry.id}`}
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                    >
                      {t.details(text.label)}
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                    </Link>
                    <Link href="/use-cases" className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      {t.all}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
