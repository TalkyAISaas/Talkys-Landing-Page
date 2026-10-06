'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/SectionHeader';
import { useCopy } from '@/i18n/LocaleContext';

const gallery = [
  '/industry-food-warm.jpg',
  '/industry-retail-warm.jpg',
  '/industry-health-warm.jpg',
  '/industry-realestate-warm.jpg',
  '/industry-salon-warm.jpg',
  '/industry-logistics-warm.jpg',
];

type Copy = {
  eyebrow: string;
  title: string;
  intro: string;
  story: { label: string; titlePrefix: string; titleHighlight: string; paragraphs: string[]; signature: string };
  visual: { label: string; alts: string[]; cardTitle: string; cardText: string };
  mission: { title: string; highlight: string; text: string };
  beliefs: { title: string; intro: string; points: string[] };
  difference: { title: string; paragraphs: string[] };
  values: { title: string; items: { title: string; text: string }[] };
  region: { title: string; paragraphs: string[] };
  commitment: { title: string; paragraphs: string[] };
  quick: { label: string; title: string; viewAll: string; items: { q: string; a: string }[] };
  cta: { title: string; text: string; primary: string; secondary: string };
};

const copy: { en: Copy; ar: Copy } = {
  en: {
    eyebrow: 'About',
    title: 'About Talkys',
    intro:
      'Talkys builds AI agents that answer your phone calls, video calls and chats around the clock, in your customers’ language, and connect every conversation to the tools your business already runs on.',
    story: {
      label: 'From the founders',
      titlePrefix: 'Why we built',
      titleHighlight: 'Talkys',
      paragraphs: [
        'Our mission is simple: every business deserves a 24/7 team, not just the ones with big budgets.',
        'We spent years building enterprise tools for global brands in Europe. We came back to put that same technology in the hands of businesses across our region, in Arabic, English and French, at a price any company can afford.',
        'We kept seeing the same thing: phones ringing out at peak hours, WhatsApp messages answered the next morning, customers calling the competitor instead. Talkys exists so that never has to happen again.',
      ],
      signature: 'The Talkys team',
    },
    visual: {
      label: 'Built for real businesses',
      alts: [
        'Restaurant served by Talkys',
        'Retail store served by Talkys',
        'Clinic served by Talkys',
        'Real estate project served by Talkys',
        'Beauty salon served by Talkys',
        'Delivery fleet served by Talkys',
      ],
      cardTitle: 'One agent. Every channel.',
      cardText: 'Calls, video and chat handled by the same agent, with the same knowledge, connected to your CRM, POS and calendar.',
    },
    mission: {
      title: 'Our mission',
      highlight: 'Make sure no customer conversation ever goes unanswered.',
      text: 'Every missed call is a lost order. Every slow reply is a customer who went elsewhere. We build agents that pick up, understand, act and follow through, so your team can focus on the work only people can do.',
    },
    beliefs: {
      title: 'What we believe',
      intro: 'Customers in our region call, voice-note and message at all hours, in the dialect they grew up with. Businesses shouldn’t have to choose between stretching their team thinner and missing those customers.',
      points: [
        'Great service should not depend on the size of your team.',
        'AI should speak the way your customers speak, not the other way round.',
        'Technology should fit around your business, not force you to change how you work.',
      ],
    },
    difference: {
      title: 'More than a chatbot',
      paragraphs: [
        'Talkys answers, acts and connects. It doesn’t just reply to messages: it takes the order, books the slot, qualifies the lead and sends the confirmation.',
        'Every call and chat is logged, transcribed and searchable, and every action lands in your existing stack: CRM, POS, calendar, delivery apps or your own systems through webhooks and APIs.',
        'When a human is needed, it hands off with a summary and the full transcript, so nobody starts from zero.',
      ],
    },
    values: {
      title: 'Our values',
      items: [
        { title: 'Local by default', text: 'Gulf, Levantine and Egyptian Arabic, MSA, English and French, with the tone and manners your customers expect.' },
        { title: 'Done for you', text: 'We handle setup, integrations and training. Most businesses are live within 7 to 10 days.' },
        { title: 'Honest results', text: 'A 15-day free trial with no credit card. If Talkys isn’t earning its keep, we part ways.' },
        { title: 'Your data stays yours', text: 'Encrypted conversations, stored in line with local data laws, never used to train other systems.' },
      ],
    },
    region: {
      title: 'Built for MENA',
      paragraphs: [
        'We work with restaurants, hotels, car dealerships, retailers, clinics, real estate developers, salons and delivery businesses across Lebanon, the GCC, Egypt, Jordan and beyond.',
        'Our agents plug into the tools businesses here actually use, like Foodics, Omega POS, Squirrel POS, Talabat, Toters and Salla, alongside global platforms like Salesforce, HubSpot and Shopify.',
      ],
    },
    commitment: {
      title: 'Our commitment',
      paragraphs: [
        'We don’t hand you software and walk away. Every agent is shaped around your business: your menu or catalogue, your prices, your tone and your workflows.',
        'And we stay with you after launch, with ongoing updates and 24/7 support.',
      ],
    },
    quick: {
      label: 'Quick answers',
      title: 'A few things people ask before they book.',
      viewAll: 'View full FAQ',
      items: [
        {
          q: 'Is Talkys just another chatbot?',
          a: 'It is more than a chatbot: it answers, acts and connects. Talkys handles calls, video calls and chats, then does the work behind them, like pushing orders to your POS or booking slots in your calendar.',
        },
        {
          q: 'Can it work with our current tools?',
          a: 'Yes. Talkys connects to CRMs like Salesforce, HubSpot, Zoho and Odoo, POS systems, delivery apps, calendars and helpdesks, plus webhooks and REST APIs for anything custom.',
        },
        {
          q: 'Which markets do you serve?',
          a: 'Businesses across the Middle East and North Africa, including Lebanon, the GCC, Egypt and Jordan, in Arabic dialects, English and French.',
        },
      ],
    },
    cta: {
      title: 'Give your business a team that never misses a call.',
      text: 'See Talkys handle a real conversation for your business, then try it free for 15 days.',
      primary: 'Book a demo',
      secondary: 'See solutions',
    },
  },
  ar: {
    eyebrow: 'من نحن',
    title: 'عن Talkys',
    intro:
      'يبني Talkys وكلاء ذكاء اصطناعي يردّون على مكالماتك الهاتفية ومكالمات الفيديو والمحادثات على مدار الساعة، بلغة عملائك، ويربطون كل محادثة بالأدوات التي يعتمد عليها عملك أصلاً.',
    story: {
      label: 'من المؤسسين',
      titlePrefix: 'لماذا بنينا',
      titleHighlight: 'Talkys',
      paragraphs: [
        'مهمّتنا بسيطة: كل نشاط تجاري يستحق فريقاً يعمل على مدار الساعة، لا الشركات ذات الميزانيات الكبيرة وحدها.',
        'أمضينا سنوات في بناء أدوات مؤسسية لعلامات تجارية عالمية في أوروبا، ثم عدنا لنضع التقنية نفسها بين أيدي الشركات في منطقتنا، بالعربية والإنجليزية والفرنسية، وبسعر في متناول أي شركة.',
        'كنّا نرى المشهد نفسه مراراً: هواتف ترنّ بلا ردّ في أوقات الذروة، ورسائل WhatsApp لا يُردّ عليها إلا في الصباح التالي، وعملاء يتّصلون بالمنافس بدلاً منك. وُجد Talkys كي لا يتكرّر ذلك أبداً.',
      ],
      signature: 'فريق Talkys',
    },
    visual: {
      label: 'مصمَّم لأعمال حقيقية',
      alts: [
        'مطعم يخدمه Talkys',
        'متجر تجزئة يخدمه Talkys',
        'عيادة يخدمها Talkys',
        'مشروع عقاري يخدمه Talkys',
        'صالون تجميل يخدمه Talkys',
        'أسطول توصيل يخدمه Talkys',
      ],
      cardTitle: 'وكيل واحد. كل القنوات.',
      cardText: 'المكالمات والفيديو والدردشة يتولّاها الوكيل نفسه، بالمعرفة نفسها، ومتّصلاً بنظام CRM ونقاط البيع والتقويم لديك.',
    },
    mission: {
      title: 'مهمّتنا',
      highlight: 'ألّا تبقى أي محادثة مع عميل بلا ردّ.',
      text: 'كل مكالمة فائتة طلبٌ ضائع، وكل ردّ متأخر عميلٌ ذهب إلى غيرك. نبني وكلاء يردّون ويفهمون وينفّذون ويتابعون حتى النهاية، ليتفرّغ فريقك للعمل الذي لا يتقنه إلا البشر.',
    },
    beliefs: {
      title: 'ما نؤمن به',
      intro: 'العملاء في منطقتنا يتّصلون ويرسلون الرسائل الصوتية والنصية في كل الأوقات، وباللهجة التي نشأوا عليها. ولا ينبغي أن تختار الشركات بين إرهاق فريقها أو خسارة هؤلاء العملاء.',
      points: [
        'الخدمة الممتازة يجب ألّا تتوقّف على حجم فريقك.',
        'على الذكاء الاصطناعي أن يتحدّث كما يتحدّث عملاؤك، لا العكس.',
        'التقنية يجب أن تتكيّف مع عملك، لا أن تفرض عليك تغيير طريقة عملك.',
      ],
    },
    difference: {
      title: 'أكثر من روبوت محادثة',
      paragraphs: [
        'يجيب Talkys وينفّذ ويربط. لا يكتفي بالردّ على الرسائل، بل يستقبل الطلب ويحجز الموعد ويؤهّل العميل المحتمل ويرسل التأكيد.',
        'كل مكالمة ومحادثة تُسجَّل وتُفرَّغ نصياً ويمكن البحث فيها، وكل إجراء يصل إلى أنظمتك الحالية: CRM ونقاط البيع والتقويم وتطبيقات التوصيل، أو أنظمتك الخاصة عبر webhooks وواجهات API.',
        'وعندما يلزم تدخّل بشري، يحوّل المحادثة مع ملخّص والنصّ الكامل، فلا يبدأ أحد من الصفر.',
      ],
    },
    values: {
      title: 'قيمنا',
      items: [
        { title: 'محلّي أولاً', text: 'العربية الخليجية والشامية والمصرية والفصحى، والإنجليزية والفرنسية، بالأسلوب واللباقة التي يتوقّعها عملاؤك.' },
        { title: 'نتولّى كل شيء عنك', text: 'نتكفّل بالإعداد والتكاملات والتدريب. تبدأ معظم الشركات العمل خلال 7 إلى 10 أيام.' },
        { title: 'نتائج صادقة', text: 'تجربة مجانية لمدة 15 يوماً من دون بطاقة ائتمان. وإذا لم يُثبت Talkys قيمته، نفترق بكل ودّ.' },
        { title: 'بياناتك ملكك', text: 'محادثات مشفّرة، مخزّنة وفق قوانين البيانات المحلية، ولا تُستخدم أبداً لتدريب أنظمة أخرى.' },
      ],
    },
    region: {
      title: 'مصمَّم للشرق الأوسط وشمال أفريقيا',
      paragraphs: [
        'نعمل مع المطاعم والفنادق ووكالات السيارات ومتاجر التجزئة والعيادات والمطوّرين العقاريين والصالونات وشركات التوصيل في لبنان ودول الخليج ومصر والأردن وغيرها.',
        'يتّصل وكلاؤنا بالأدوات التي تستخدمها الشركات هنا فعلاً، مثل Foodics وOmega POS وSquirrel POS وTalabat وToters وSalla، إلى جانب منصّات عالمية مثل Salesforce وHubSpot وShopify.',
      ],
    },
    commitment: {
      title: 'التزامنا',
      paragraphs: [
        'لا نسلّمك برنامجاً ثم نمضي. كل وكيل يُصمَّم حول نشاطك: قائمتك أو منتجاتك، أسعارك، أسلوبك، وطريقة عملك.',
        'ونبقى معك بعد الإطلاق، مع تحديثات مستمرة ودعم على مدار الساعة.',
      ],
    },
    quick: {
      label: 'إجابات سريعة',
      title: 'أسئلة يطرحها الناس قبل الحجز.',
      viewAll: 'كل الأسئلة الشائعة',
      items: [
        {
          q: 'هل Talkys مجرد روبوت محادثة آخر؟',
          a: 'إنه أكثر من روبوت محادثة: يجيب وينفّذ ويربط. يتولّى Talkys المكالمات ومكالمات الفيديو والمحادثات، ثم ينجز العمل الذي يليها، مثل إرسال الطلبات إلى نظام نقاط البيع أو حجز المواعيد في تقويمك.',
        },
        {
          q: 'هل يعمل مع أدواتنا الحالية؟',
          a: 'نعم. يتّصل Talkys بأنظمة CRM مثل Salesforce وHubSpot وZoho وOdoo، وبأنظمة نقاط البيع وتطبيقات التوصيل والتقويمات وأنظمة الدعم، إضافة إلى webhooks وواجهات REST API لأي نظام خاص.',
        },
        {
          q: 'ما الأسواق التي تخدمونها؟',
          a: 'الشركات في الشرق الأوسط وشمال أفريقيا، بما فيها لبنان ودول الخليج ومصر والأردن، باللهجات العربية والإنجليزية والفرنسية.',
        },
      ],
    },
    cta: {
      title: 'امنح عملك فريقاً لا تفوته أي مكالمة.',
      text: 'شاهد Talkys وهو يتولّى محادثة حقيقية لنشاطك، ثم جرّبه مجاناً لمدة 15 يوماً.',
      primary: 'احجز عرضاً تجريبياً',
      secondary: 'استكشف الحلول',
    },
  },
};

const h2 = 'font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4';
const body = 'text-[var(--text-secondary)] leading-relaxed';

export function AboutContent() {
  const t = useCopy(copy);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <main id="about" aria-label={t.title}>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--border-color)]">
          <div className="hero-glow" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 lg:pt-24 lg:pb-20">
            <SectionHeader as="h1" align="left" eyebrow={t.eyebrow} title={t.title} description={t.intro} />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Founder story + visuals */}
          <section className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-7 glass-panel-premium p-8 sm:p-10 lg:p-12">
              <p className="section-label mb-3">{t.story.label}</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[var(--text-primary)] mb-6">
                {t.story.titlePrefix} <span className="gradient-text">{t.story.titleHighlight}</span>
              </h2>
              <div className="space-y-4">
                {t.story.paragraphs.map((p) => (
                  <p key={p} className={body}>{p}</p>
                ))}
              </div>
              <p className="mt-6 text-sm italic text-[var(--text-muted)]">{t.story.signature}</p>
            </div>

            <aside className="lg:col-span-5">
              <div className="glass-panel-premium p-6 sm:p-8 h-full">
                <p className="section-label mb-4">{t.visual.label}</p>
                <div className="grid grid-cols-3 gap-3">
                  {gallery.map((src, i) => (
                    <div key={src} className="rounded-xl border border-[var(--border-subtle)] overflow-hidden bg-[var(--indigo-50)]">
                      <img src={src} alt={t.visual.alts[i]} className="w-full aspect-square object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--indigo-50)] p-5">
                  <p className="font-display text-lg font-semibold text-[var(--text-primary)] mb-2">{t.visual.cardTitle}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{t.visual.cardText}</p>
                </div>
              </div>
            </aside>
          </section>

          {/* Mission */}
          <section aria-labelledby="mission-heading" className="mt-6 lg:mt-8 glass-panel-premium p-8 sm:p-10">
            <h2 id="mission-heading" className={h2}>{t.mission.title}</h2>
            <p className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.015em] mb-4">
              <span className="gradient-text">{t.mission.highlight}</span>
            </p>
            <p className={`${body} max-w-4xl`}>{t.mission.text}</p>
          </section>

          {/* Beliefs + difference */}
          <section className="mt-6 lg:mt-8 grid lg:grid-cols-2 gap-6 lg:gap-8">
            <div aria-labelledby="beliefs-heading" className="glass-panel-premium p-8 sm:p-10">
              <h2 id="beliefs-heading" className={h2}>{t.beliefs.title}</h2>
              <p className={`${body} mb-4`}>{t.beliefs.intro}</p>
              <ul className="list-disc ps-6 space-y-2 text-[var(--text-secondary)] marker:text-[var(--indigo-400)]">
                {t.beliefs.points.map((point) => (
                  <li key={point}>
                    <strong className="font-semibold text-[var(--text-primary)]">{point}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div aria-labelledby="difference-heading" className="glass-panel-premium p-8 sm:p-10">
              <h2 id="difference-heading" className={h2}>{t.difference.title}</h2>
              <div className="space-y-3">
                {t.difference.paragraphs.map((p) => (
                  <p key={p} className={body}>{p}</p>
                ))}
              </div>
            </div>
          </section>

          {/* Values */}
          <section aria-labelledby="values-heading" className="mt-6 lg:mt-8 glass-panel-premium p-8 sm:p-10">
            <h2 id="values-heading" className={h2}>{t.values.title}</h2>
            <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.values.items.map((item) => (
                <div key={item.title} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5">
                  <span aria-hidden className="block h-1 w-8 rounded-full" style={{ background: 'var(--cta-gradient)' }} />
                  <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Region + commitment */}
          <section className="mt-6 lg:mt-8 grid lg:grid-cols-2 gap-6 lg:gap-8">
            <div aria-labelledby="region-heading" className="glass-panel-premium p-8 sm:p-10">
              <h2 id="region-heading" className={h2}>{t.region.title}</h2>
              <div className="space-y-3">
                {t.region.paragraphs.map((p) => (
                  <p key={p} className={body}>{p}</p>
                ))}
              </div>
            </div>

            <div aria-labelledby="commitment-heading" className="glass-panel-premium p-8 sm:p-10">
              <h2 id="commitment-heading" className={h2}>{t.commitment.title}</h2>
              <div className="space-y-3">
                {t.commitment.paragraphs.map((p) => (
                  <p key={p} className={body}>{p}</p>
                ))}
              </div>
            </div>
          </section>

          {/* Mini FAQ */}
          <section className="mt-6 lg:mt-8 glass-panel-premium p-8 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
              <div>
                <p className="section-label mb-3">{t.quick.label}</p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[var(--text-primary)]">{t.quick.title}</h2>
              </div>
              <Button asChild variant="brand-outline" size="lg" className="self-start lg:self-auto">
                <Link href="/faq/">
                  {t.quick.viewAll}
                  <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                </Link>
              </Button>
            </div>

            <div className="space-y-3">
              {t.quick.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-[var(--border-color)] bg-white transition-colors duration-200 hover:border-[var(--border-strong)] open:border-[var(--border-strong)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg font-semibold text-[var(--text-primary)] [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--indigo-50)] text-[var(--indigo-500)] text-lg leading-none transition-transform duration-200 ease-out-strong group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 -mt-1 text-[var(--text-secondary)] leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Closing CTA */}
          <section aria-labelledby="about-cta-heading" className="relative overflow-hidden mt-6 lg:mt-8 glass-panel-premium p-8 sm:p-12 text-center">
            <div className="hero-glow" />
            <div className="relative">
              <h2 id="about-cta-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[var(--text-primary)] mb-3">
                {t.cta.title}
              </h2>
              <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">{t.cta.text}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button asChild variant="brand" size="xl">
                  <Link href="/#contact">
                    {t.cta.primary}
                    <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                  </Link>
                </Button>
                <Button asChild variant="brand-outline" size="xl">
                  <Link href="/use-cases/">
                    {t.cta.secondary}
                    <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
