'use client';

import { Facebook, Globe, Instagram, Mail, MessageCircle, MessageSquareText, Phone, Video, type LucideIcon } from 'lucide-react';
import gsap from 'gsap';
import { SectionHeader } from '@/components/SectionHeader';
import { TalkysLogo } from '@/components/TalkysLogo';
import { useReveal } from '@/hooks/useReveal';
import { useCopy } from '@/i18n/LocaleContext';

const icons: LucideIcon[] = [Phone, Video, MessageCircle, Instagram, Facebook, Globe, MessageSquareText, Mail];

const copy = {
  en: {
    eyebrow: 'Channels',
    titleLead: 'One agent on every line.',
    titleAccent: 'Calls, video and chat.',
    description: 'Customers reach you wherever they like. The same agent answers, with the same knowledge, and logs every conversation in one place.',
    hub: 'One agent, one inbox',
    channels: [
      { name: 'Phone calls', hint: 'Inbound & outbound' },
      { name: 'Video calls', hint: 'Lifelike AI avatar' },
      { name: 'WhatsApp', hint: 'Text & voice notes' },
      { name: 'Instagram', hint: 'DMs & story replies' },
      { name: 'Messenger', hint: 'Facebook pages' },
      { name: 'Web chat', hint: 'On your website' },
      { name: 'SMS', hint: 'Reminders & replies' },
      { name: 'Email', hint: 'Inbox triage' },
    ],
  },
  ar: {
    eyebrow: 'القنوات',
    titleLead: 'وكيل واحد على كل خط.',
    titleAccent: 'مكالمات وفيديو ومحادثات.',
    description: 'يتواصل عملاؤك معك من حيث يفضّلون. يرد الوكيل نفسه بالمعرفة نفسها، ويسجّل كل محادثة في مكان واحد.',
    hub: 'وكيل واحد، صندوق واحد',
    channels: [
      { name: 'المكالمات الهاتفية', hint: 'واردة وصادرة' },
      { name: 'مكالمات الفيديو', hint: 'أفاتار ذكي واقعي' },
      { name: 'WhatsApp', hint: 'نصوص ورسائل صوتية' },
      { name: 'Instagram', hint: 'الرسائل والردود على القصص' },
      { name: 'Messenger', hint: 'صفحات Facebook' },
      { name: 'دردشة الموقع', hint: 'على موقعك الإلكتروني' },
      { name: 'SMS', hint: 'تذكيرات وردود' },
      { name: 'البريد الإلكتروني', hint: 'فرز صندوق الوارد' },
    ],
  },
};

// Eight spokes around the hub, 45° apart, starting at 12 o'clock.
const nodePositions = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
  return { x: +(50 + Math.cos(angle) * 40).toFixed(2), y: +(50 + Math.sin(angle) * 40).toFixed(2) };
});

// Brand tints cycle around the ring: teal → aqua → coral.
const tints = [
  { fg: 'var(--blue-500)', bg: 'var(--blue-50)', line: 'var(--blue-300)' },
  { fg: 'var(--indigo-500)', bg: 'var(--indigo-50)', line: 'var(--indigo-300)' },
  { fg: 'var(--plum-500)', bg: 'var(--plum-50)', line: 'var(--plum-300)' },
];

export function ChannelsSectionB() {
  const t = useCopy(copy);
  const sectionRef = useReveal<HTMLElement>(({ reduced, reveal }) => {
    if (reduced) {
      reveal('.channel-network');
      return;
    }
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.channel-network', start: 'top 80%', once: true } });
    tl.fromTo('.channel-hub', { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'expo.out' })
      .fromTo('.channel-spokes', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, ease: 'none' }, 0.15)
      .fromTo('.channel-node', { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out', stagger: 0.05 }, 0.2);
  });

  return (
    <section ref={sectionRef} id="channels" className="relative py-20 lg:py-28">
      <div className="brand-rule absolute inset-x-0 top-0 opacity-40" />
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

        {/* Hub-and-spoke network (tablet and up) */}
        <div className="channel-network relative mx-auto mt-14 hidden h-[540px] max-w-4xl sm:block">
          <svg aria-hidden className="channel-spokes absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {nodePositions.map((pos, index) => (
              <line
                key={index}
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                stroke={tints[index % tints.length].line}
                strokeWidth="1.25"
                strokeDasharray="3 5"
                vectorEffect="non-scaling-stroke"
                className="animate-dash-flow"
              />
            ))}
          </svg>

          <div className="channel-hub absolute left-1/2 top-1/2 z-10 flex h-[136px] w-[136px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[var(--indigo-200)] bg-white text-center shadow-lift">
            <div className="absolute inset-[-12px] rounded-full bg-[radial-gradient(circle,var(--indigo-100),transparent_70%)] opacity-70" />
            <TalkysLogo className="relative text-2xl" />
            <span className="relative mt-1 max-w-[104px] text-[11px] font-medium leading-tight text-[var(--text-muted)]">{t.hub}</span>
          </div>

          <ul>
            {t.channels.map((channel, index) => {
              const Icon = icons[index];
              const pos = nodePositions[index];
              const tint = tints[index % tints.length];
              return (
                <li
                  key={channel.name}
                  className="absolute z-10 w-[148px] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <div className="channel-node rounded-2xl border border-[var(--border-color)] bg-white p-3 text-center shadow-card">
                    <span className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ background: tint.bg, color: tint.fg }}>
                      <Icon aria-hidden className="h-[18px] w-[18px]" />
                    </span>
                    <p className="text-sm font-semibold leading-tight text-[var(--text-primary)]">{channel.name}</p>
                    <p className="mt-0.5 text-[11px] leading-tight text-[var(--text-muted)]">{channel.hint}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile: simple grid */}
        <ul data-reveal-group className="mt-10 grid grid-cols-2 gap-3 sm:hidden">
          {t.channels.map((channel, index) => {
            const Icon = icons[index];
            const tint = tints[index % tints.length];
            return (
              <li key={channel.name} className="flex items-center gap-3 rounded-2xl border border-[var(--border-color)] bg-white p-3 shadow-card">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]" style={{ background: tint.bg, color: tint.fg }}>
                  <Icon aria-hidden className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-tight text-[var(--text-primary)]">{channel.name}</span>
                  <span className="block text-[11px] leading-tight text-[var(--text-muted)]">{channel.hint}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
