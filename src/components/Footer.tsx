'use client';

import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react';
import { TalkysLogo } from '@/components/TalkysLogo';
import { useCopy } from '@/i18n/LocaleContext';

const linkedInUrl = 'https://www.linkedin.com/company/talkys-ai/';
const email = 'hello@talkys.ai';

const copy = {
  en: {
    tagline: 'Talks. Listens. Gets it done.',
    blurb: 'AI agents that answer your calls, video calls and chats in Arabic and English, and plug into the stack you already run.',
    linkedIn: 'Follow Talkys on LinkedIn',
    emailUs: 'Email Talkys',
    columns: [
      {
        title: 'Platform',
        links: [
          { label: 'How Talkys works', href: '/#how-it-works' },
          { label: 'AI agents', href: '/#platform' },
          { label: 'Channels', href: '/#channels' },
          { label: 'Integrations', href: '/#integrations' },
          { label: 'Analytics', href: '/#analytics' },
          { label: 'Pricing', href: '/#pricing' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Use cases', href: '/use-cases' },
          { label: 'About us', href: '/about' },
          { label: 'FAQ', href: '/faq' },
          { label: 'Book a demo', href: '/#contact' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy policy', href: '/privacy-policy' },
          { label: 'Terms of service', href: '/terms-of-service' },
          { label: 'Cookie policy', href: '/cookie-policy' },
        ],
      },
    ],
    rights: 'All rights reserved.',
    region: 'Lebanon · GCC · MENA',
  },
  ar: {
    tagline: 'يتكلّم. يسمع. وينجز.',
    blurb: 'وكلاء ذكاء اصطناعي يردّون على مكالماتك ومكالمات الفيديو والمحادثات بالعربية والإنجليزية، ويتّصلون بالأنظمة التي تعمل بها اليوم.',
    linkedIn: 'تابع Talkys على لينكدإن',
    emailUs: 'راسل Talkys',
    columns: [
      {
        title: 'المنصّة',
        links: [
          { label: 'كيف يعمل Talkys', href: '/#how-it-works' },
          { label: 'وكلاء الذكاء الاصطناعي', href: '/#platform' },
          { label: 'القنوات', href: '/#channels' },
          { label: 'التكاملات', href: '/#integrations' },
          { label: 'التحليلات', href: '/#analytics' },
          { label: 'الأسعار', href: '/#pricing' },
        ],
      },
      {
        title: 'الشركة',
        links: [
          { label: 'حالات الاستخدام', href: '/use-cases' },
          { label: 'من نحن', href: '/about' },
          { label: 'الأسئلة الشائعة', href: '/faq' },
          { label: 'احجز عرضاً تجريبياً', href: '/#contact' },
        ],
      },
      {
        title: 'قانوني',
        links: [
          { label: 'سياسة الخصوصية', href: '/privacy-policy' },
          { label: 'شروط الخدمة', href: '/terms-of-service' },
          { label: 'سياسة ملفات تعريف الارتباط', href: '/cookie-policy' },
        ],
      },
    ],
    rights: 'جميع الحقوق محفوظة.',
    region: 'لبنان · الخليج · الشرق الأوسط',
  },
};

const iconLinkClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border-color)] text-[var(--text-secondary)] transition-[color,border-color,transform] duration-150 ease-out-strong hover:border-[var(--indigo-300)] hover:text-[var(--accent)] active:scale-[0.97]';

export function Footer() {
  const t = useCopy(copy);

  return (
    <footer className="relative bg-white">
      <div className="brand-rule" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1 max-w-xs">
            <Link href="/" className="inline-block text-[var(--text-primary)]">
              <TalkysLogo className="text-4xl" />
            </Link>
            <p className="mt-4 font-display text-base font-semibold text-[var(--text-primary)]">{t.tagline}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{t.blurb}</p>
            <div className="mt-5 flex gap-2">
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label={t.linkedIn} className={iconLinkClass}>
                <Linkedin className="h-[18px] w-[18px]" />
              </a>
              <a href={`mailto:${email}`} aria-label={t.emailUs} className={iconLinkClass}>
                <Mail className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          {t.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-display text-sm font-semibold text-[var(--text-primary)]">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--accent)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Talkys AI. {t.rights}
          </p>
          <p>{t.region}</p>
        </div>
      </div>
    </footer>
  );
}
