'use client';

import { Fragment, type ReactNode } from 'react';
import { useCopy } from '@/i18n/LocaleContext';

/* ── Content model shared by the legal pages ──
   A block is either a plain paragraph (string), a bold sub-heading, a defined
   term, a bullet list, a table, or a highlighted placeholder for details that
   still have to be confirmed. Email addresses inside text are auto-linked. */
export type LegalBlock =
  | string
  | { sub: string }
  | { term: string; text: string }
  | { list: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { placeholder: string };

export interface LegalSectionData {
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  lastUpdated: string;
  summaryLabel: string;
  summary: string;
  sections: LegalSectionData[];
}

const layoutCopy = {
  en: { eyebrow: 'Legal', lastUpdated: 'Last updated:' },
  ar: { eyebrow: 'قانوني', lastUpdated: 'آخر تحديث:' },
};

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  const t = useCopy(layoutCopy);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--border-color)] bg-[var(--bg-surface)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <p className="section-label mb-3">{t.eyebrow}</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">
            {title}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            {t.lastUpdated} {lastUpdated}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="legal-content space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl sm:text-2xl font-semibold text-[var(--text-primary)] mb-4">
        {title}
      </h2>
      <div className="space-y-3 text-[var(--text-secondary)] text-[15px] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

const EMAIL_RE = /([\w.+-]+@[\w-]+\.[\w.-]+)/g;

/** Renders text with any email address turned into an LTR mailto link. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(EMAIL_RE);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <a
            key={i}
            href={`mailto:${part}`}
            dir="ltr"
            className="text-[var(--accent)] hover:underline"
          >
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') {
    return (
      <p>
        <RichText text={block} />
      </p>
    );
  }
  if ('sub' in block) {
    return (
      <p className="pt-1">
        <strong className="text-[var(--text-primary)]">{block.sub}</strong>
      </p>
    );
  }
  if ('term' in block) {
    return (
      <p>
        <strong className="text-[var(--text-primary)]">{block.term}</strong>{' '}
        <RichText text={block.text} />
      </p>
    );
  }
  if ('list' in block) {
    return (
      <ul className="list-disc ps-6 space-y-2">
        {block.list.map((item) => (
          <li key={item}>
            <RichText text={item} />
          </li>
        ))}
      </ul>
    );
  }
  if ('placeholder' in block) {
    return (
      <p
        className="rounded-xl border border-dashed px-4 py-3 text-sm bg-[var(--bg-sunken)]"
        style={{ borderColor: 'var(--accent)' }}
      >
        {block.placeholder}
      </p>
    );
  }
  const { head, rows } = block.table;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse mt-2">
        <thead>
          <tr className="border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            {head.map((h, i) => (
              <th
                key={h}
                className={`text-start py-3 font-semibold text-[var(--text-primary)] ${
                  i < head.length - 1 ? 'pe-4' : ''
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[var(--text-secondary)]">
          {rows.map((row, r) => (
            <tr
              key={row[0]}
              className={r < rows.length - 1 ? 'border-b' : ''}
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`py-3 align-top ${c < row.length - 1 ? 'pe-4' : ''} ${
                    c === 0 ? 'font-medium' : ''
                  }`}
                >
                  <RichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Full legal page rendered from a `{ en, ar }` pair of LegalDoc objects. */
export function LegalDocument({ copy }: { copy: { en: LegalDoc; ar: LegalDoc } }) {
  const t = useCopy(copy);

  return (
    <LegalLayout title={t.title} lastUpdated={t.lastUpdated}>
      <div
        className="glass-panel-premium rounded-2xl p-6 sm:p-8 border"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] mb-3">
          {t.summaryLabel}
        </p>
        <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed">
          <RichText text={t.summary} />
        </p>
      </div>

      {t.sections.map((section) => (
        <Section key={section.title} title={section.title}>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </Section>
      ))}
    </LegalLayout>
  );
}
