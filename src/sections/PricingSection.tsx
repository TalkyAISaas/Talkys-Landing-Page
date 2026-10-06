'use client';

import Link from 'next/link';
import { ArrowRight, CalendarCheck, Check, Gauge, Wrench } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { useReveal } from '@/hooks/useReveal';
import { useCopy } from '@/i18n/LocaleContext';

const stepIcons = [Wrench, Gauge, CalendarCheck];

const copy = {
  en: {
    eyebrow: 'Pricing',
    titleLead: 'Simple pricing that grows',
    titleAccent: 'with your conversations.',
    description: 'A one-time setup, then a monthly plan sized to how many calls and chats Talkys handles for you. Try it free for 15 days first.',
    howLabel: 'How it works',
    steps: [
      { title: 'One-time setup', body: 'We build your agent, connect it to your systems and test it with you. Done for you, live in 7–10 days.' },
      { title: 'Monthly plan based on usage', body: 'You pay for the conversations Talkys actually handles, across the channels you choose. Scale up or down any time.' },
      { title: '15-day free trial', body: 'See it answer real customers before you commit. No credit card needed.' },
    ],
    includedLabel: 'Every plan includes',
    included: [
      'Phone, video and chat channels',
      'Arabic dialects, English and French',
      'Integrations with your CRM, POS and calendar',
      'Handoff to your team with a summary',
      'Recordings, transcripts and dashboard',
      'Setup and ongoing tuning by our team',
    ],
    note: 'Your price depends on your volume and channels. Book a demo and we’ll quote it for you.',
    cta: 'Book a demo',
    secondary: 'Read the FAQ',
  },
  ar: {
    eyebrow: 'الأسعار',
    titleLead: 'أسعار بسيطة تنمو',
    titleAccent: 'مع محادثاتك.',
    description: 'رسوم إعداد لمرة واحدة، ثم باقة شهرية تُحدَّد حسب عدد المكالمات والمحادثات التي يتولّاها Talkys عنك. جرّبه مجاناً لمدة ١٥ يوماً أولاً.',
    howLabel: 'كيف يعمل',
    steps: [
      { title: 'إعداد لمرة واحدة', body: 'نبني وكيلك ونربطه بأنظمتك ونختبره معك. نتولّى كل شيء، وتنطلق خلال ٧ إلى ١٠ أيام.' },
      { title: 'باقة شهرية حسب الاستخدام', body: 'تدفع مقابل المحادثات التي يتولّاها Talkys فعلاً، عبر القنوات التي تختارها. وسّع باقتك أو قلّصها متى شئت.' },
      { title: 'تجربة مجانية لمدة ١٥ يوماً', body: 'شاهده يردّ على عملاء حقيقيين قبل أن تلتزم. بدون بطاقة ائتمان.' },
    ],
    includedLabel: 'تشمل كل الباقات',
    included: [
      'قنوات الهاتف والفيديو والمحادثات',
      'اللهجات العربية والإنجليزية والفرنسية',
      'التكامل مع CRM ونقاط البيع والتقويم',
      'التحويل إلى فريقك مع ملخّص للمحادثة',
      'التسجيلات والنصوص المكتوبة ولوحة التحكم',
      'الإعداد والتحسين المستمر من فريقنا',
    ],
    note: 'يعتمد السعر على حجم محادثاتك والقنوات التي تستخدمها. احجز عرضاً تجريبياً وسنرسل لك عرض سعر مخصّصاً.',
    cta: 'احجز عرضاً تجريبياً',
    secondary: 'اقرأ الأسئلة الشائعة',
  },
};

export function PricingSection() {
  const t = useCopy(copy);
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="pricing" className="relative py-20 lg:py-28">
      <div className="brand-rule absolute inset-x-0 top-0 opacity-40" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleLead} <span className="gradient-text">{t.titleAccent}</span>
            </>
          }
          description={t.description}
        />

        <div data-reveal className="glass-panel-premium shadow-lift mt-12 overflow-hidden">
          <div className="grid gap-8 p-7 sm:p-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-10">
            <div>
              <p className="section-label">{t.howLabel}</p>
              <ol className="mt-5 space-y-5">
                {t.steps.map((step, index) => {
                  const Icon = stepIcons[index];
                  return (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--indigo-50)] text-[var(--indigo-500)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{step.title}</h3>
                        <p className="mt-1 text-[15px] leading-relaxed text-[var(--text-secondary)]">{step.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="border-t border-[var(--border-subtle)] pt-6 md:border-s md:border-t-0 md:ps-10 md:pt-0">
              <p className="section-label">{t.includedLabel}</p>
              <ul className="mt-5 space-y-3">
                {t.included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-[var(--text-primary)]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--indigo-50)] text-[var(--indigo-500)]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5 sm:p-6 md:flex-row md:justify-between">
            <p className="max-w-md text-center text-sm leading-relaxed text-[var(--text-secondary)] md:text-start">{t.note}</p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild variant="brand" size="xl" className="sm:min-w-[180px]">
                <Link href="/#contact">{t.cta}</Link>
              </Button>
              <Button asChild variant="brand-outline" size="xl" className="sm:min-w-[180px]">
                <Link href="/faq">
                  {t.secondary}
                  <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
