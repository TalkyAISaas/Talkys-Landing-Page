'use client';

import { useEffect, type CSSProperties } from 'react';
import { Brain, CircleCheck, MessagesSquare, Plug } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { useReveal } from '@/hooks/useReveal';
import { useCopy } from '@/i18n/LocaleContext';

const icons = [MessagesSquare, Brain, CircleCheck, Plug];

const copy = {
  en: {
    eyebrow: 'Why Talkys',
    titleLead: 'One agent.',
    titleAccent: 'Every call, video and chat.',
    description: 'Talkys hears what your customer needs, answers or acts on it, and writes the result straight into the tools you already use.',
    flowLabel: 'How Talkys turns a conversation into a result in your systems',
    steps: ['Conversation', 'Understanding', 'Answer & action', 'Your systems'],
  },
  ar: {
    eyebrow: 'لماذا Talkys',
    titleLead: 'وكيل واحد.',
    titleAccent: 'لكل مكالمة ومكالمة فيديو ومحادثة.',
    description: 'يفهم Talkys ما يحتاجه عميلك، فيجيبه أو ينفّذ طلبه، ثم يسجّل النتيجة مباشرةً في الأدوات التي تستخدمها أصلاً.',
    flowLabel: 'كيف يحوّل Talkys المحادثة إلى نتيجة في أنظمتك',
    steps: ['المحادثة', 'الفهم', 'الردّ والتنفيذ', 'أنظمتك'],
  },
};

/**
 * A short bridge into "How it works": one line of copy and a slim four-step flow.
 * A single pulse travels the line and each step lights up as it arrives (4s loop,
 * only while on screen; static under reduced motion).
 */
export function CorePositioning() {
  const t = useCopy(copy);
  const sectionRef = useReveal<HTMLElement>(({ reduced, reveal }) => {
    reveal('.flow-node', { trigger: '.flow-diagram', stagger: reduced ? 0 : 0.06, y: 12 });
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.dataset.live = '';
      else delete el.dataset.live;
    });
    io.observe(el);
    return () => io.disconnect();
  }, [sectionRef]);

  return (
    <section ref={sectionRef} id="positioning" className="cp-scene relative py-16 lg:py-20">
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

        <ol aria-label={t.flowLabel} className="flow-diagram relative mx-auto mt-12 grid max-w-3xl grid-cols-4">
          {/* Track between the first and last step centres, with the travelling pulse (mirrored in RTL) */}
          <span aria-hidden className="absolute inset-x-[12.5%] top-6 h-px bg-[var(--indigo-100)] sm:top-7" />
          <span aria-hidden className="absolute inset-x-[12.5%] top-6 h-0 rtl:-scale-x-100 sm:top-7">
            <span className="cp-runner absolute inset-0">
              <span className="cp-pulse" />
            </span>
          </span>

          {t.steps.map((label, index) => {
            const Icon = icons[index];
            return (
              <li key={label} className="flow-node relative flex flex-col items-center gap-3 text-center">
                <span
                  className="cp-node relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-color)] bg-white text-[var(--indigo-500)] shadow-xs sm:h-14 sm:w-14"
                  style={{ '--i': index } as CSSProperties}
                >
                  <Icon className="relative z-10 h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <span className="text-[12px] font-semibold text-[var(--text-primary)] sm:text-[15px]">{label}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
