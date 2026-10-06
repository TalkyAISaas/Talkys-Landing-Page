'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/SectionHeader';
import { useCopy } from '@/i18n/LocaleContext';
import { faqCopy } from './faqItems';

export function FaqContent() {
  const t = useCopy(faqCopy);

  return (
    <main
      id="faq-page"
      aria-label={t.title}
      className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]"
    >
      <div className="hero-glow" />
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-[380px,1fr] gap-10 lg:gap-14 items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeader as="h1" align="left" eyebrow={t.eyebrow} title={t.title} description={t.description} />
          <div className="mt-8 hidden rounded-2xl border border-[var(--border-color)] bg-white p-6 shadow-card lg:block">
            <p className="font-display text-lg font-semibold text-[var(--text-primary)]">{t.ctaTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{t.ctaText}</p>
            <Button asChild variant="brand" size="lg" className="mt-5">
              <Link href="/#contact">
                {t.cta}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {t.items.map((item, index) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-[var(--border-color)] bg-white shadow-card transition-[border-color,box-shadow] duration-200 hover:border-[var(--border-strong)] open:border-[var(--border-strong)]"
              open={index === 0}
            >
              <summary className="list-none cursor-pointer px-5 sm:px-6 py-5 flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <h2 className="font-display text-lg sm:text-xl leading-snug font-semibold text-[var(--text-primary)]">{item.q}</h2>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--indigo-50)] text-[var(--indigo-500)] text-xl leading-none select-none transition-[transform,background-color] duration-200 ease-out-strong group-open:rotate-45 group-open:bg-[var(--indigo-100)]"
                >
                  +
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="border-t border-[var(--border-subtle)]" />
                <p className="pt-4 text-[var(--text-secondary)] text-base sm:text-[17px] leading-relaxed">{item.a}</p>
              </div>
            </details>
          ))}

          <div className="rounded-2xl border border-[var(--border-color)] bg-white p-6 shadow-card lg:hidden">
            <p className="font-display text-lg font-semibold text-[var(--text-primary)]">{t.ctaTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{t.ctaText}</p>
            <Button asChild variant="brand" size="lg" className="mt-5">
              <Link href="/#contact">
                {t.cta}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
