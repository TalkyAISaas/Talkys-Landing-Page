'use client';

import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { useCopy, useLocale } from '@/i18n/LocaleContext';
import { industryById } from '@/lib/industries';

const copy = {
  en: { live: 'Talkys · live', aria: (label: string) => `Animated illustration of a Talkys agent working in ${label.toLowerCase()}` },
  ar: { live: 'Talkys · مباشر', aria: (label: string) => `رسم متحرك لوكيل Talkys يعمل في قطاع ${label}` },
};

/**
 * Animated icon scene for one industry: its icon at the centre with pulse rings, four
 * related icons orbiting it, and a "done" chip cycling through what the agent completes
 * for that sector. Loops only while on screen (reuses the .fx-* motion system); still
 * under reduced motion.
 */
export function IndustryVisual({ id }: { id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const t = useCopy(copy);
  const { locale } = useLocale();
  const industry = industryById[id];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.dataset.live = '';
      else delete el.dataset.live;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!industry) return null;
  const Icon = industry.icon;
  const text = industry[locale];

  return (
    <div
      ref={ref}
      role="img"
      aria-label={t.aria(text.label)}
      className="fx-scene fx-stage relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] sm:aspect-[16/10] lg:aspect-[4/5]"
    >
      <div className="fx-stage-grid" />

      <span className="absolute start-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-[var(--border-color)] bg-white/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] shadow-xs">
        <span className="fx-blink h-1.5 w-1.5 rounded-full bg-[var(--viz-green)]" />
        {t.live}
      </span>

      {/* Orbit */}
      <div className="absolute left-1/2 top-[42%] aspect-square h-[60%] -translate-x-1/2 -translate-y-1/2 lg:h-auto lg:w-[78%]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
          <circle cx="50" cy="50" r="41" stroke="var(--indigo-200)" strokeDasharray="1.5 3" />
          <circle cx="50" cy="50" r="26" stroke="var(--indigo-100)" />
        </svg>

        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-16 sm:w-16">
          <span className="fx-ping" />
          <span className="fx-ping" style={{ animationDelay: '0.9s' }} />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lift sm:h-16 sm:w-16" style={{ background: 'var(--cta-gradient)' }}>
            <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
          </span>
        </div>

        <div className="fx-orbit absolute inset-0">
          {industry.satellites.map((Satellite, i) => {
            const angle = (i / industry.satellites.length) * Math.PI * 2 - Math.PI / 4;
            return (
              <span
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${50 + Math.cos(angle) * 41}%`, top: `${50 + Math.sin(angle) * 41}%` }}
              >
                <span className="fx-orbit-counter flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-color)] bg-white text-[var(--indigo-500)] shadow-card sm:h-10 sm:w-10 sm:rounded-xl">
                  <Satellite className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </span>
              </span>
            );
          })}
        </div>
      </div>

      {/* What the agent just completed */}
      <div className="absolute inset-x-4 bottom-4 h-11 rounded-xl border border-[var(--border-color)] bg-white/90 shadow-xs">
        {text.outcomes.map((outcome, i) => (
          <p key={outcome} className="iv-line absolute inset-0 flex items-center gap-2.5 px-3" style={{ animationDelay: `${i * 3}s` }}>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--viz-green-soft)] text-[var(--viz-green)]">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="truncate text-[13px] font-medium text-[var(--text-primary)]">{outcome}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
