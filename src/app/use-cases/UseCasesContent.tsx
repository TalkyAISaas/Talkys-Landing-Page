'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  Building2,
  Car,
  MessageCircle,
  Phone,
  RefreshCw,
  Scissors,
  ShoppingBag,
  Stethoscope,
  Truck,
  UtensilsCrossed,
  Video,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/SectionHeader';
import { StepChain } from '@/components/StepChain';
import { useCopy } from '@/i18n/LocaleContext';
import { cn } from '@/lib/utils';

/* Visual config per industry (copy lives in the bilingual object below) */
const visuals: { id: string; icon: LucideIcon; image: string; focus?: string; stack: string[] }[] = [
  { id: 'restaurants', icon: UtensilsCrossed, image: '/industry-food-warm.jpg', stack: ['Foodics', 'Omega POS', 'Squirrel POS', 'Talabat', 'Toters'] },
  { id: 'hotels', icon: BedDouble, image: '/hero-warm.jpg', focus: 'center 30%', stack: ['PMS', 'Google Calendar', 'Stripe', 'WhatsApp'] },
  { id: 'car-dealerships', icon: Car, image: '/dealership-jetour.jpg', stack: ['Salesforce', 'HubSpot', 'Zoho', 'Google Calendar'] },
  { id: 'retail', icon: ShoppingBag, image: '/industry-retail-warm.jpg', stack: ['Shopify', 'Salla', 'Stripe', 'Zendesk'] },
  { id: 'clinics', icon: Stethoscope, image: '/industry-health-warm.jpg', stack: ['Cal.com', 'Calendly', 'Google Calendar', 'REST API'] },
  { id: 'real-estate', icon: Building2, image: '/industry-realestate-warm.jpg', stack: ['Salesforce', 'HubSpot', 'Odoo', 'Google Calendar'] },
  { id: 'salons', icon: Scissors, image: '/industry-salon-warm.jpg', stack: ['Calendly', 'Cal.com', 'Stripe', 'WhatsApp'] },
  { id: 'logistics', icon: Truck, image: '/industry-logistics-warm.jpg', stack: ['Odoo', 'Zoho', 'Webhooks', 'SMS'] },
];

type Industry = {
  label: string;
  title: string;
  lead: string;
  calls: string;
  video: string;
  chat: string;
  steps: string[];
  alt: string;
};

type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  jumpLabel: string;
  forLabel: string;
  channels: { calls: string; video: string; chat: string };
  stackTitle: string;
  flowLabel: string;
  cta: string;
  industries: Industry[];
  closingTitle: string;
  closingText: string;
  closingPrimary: string;
  closingSecondary: string;
};

const copy: { en: Copy; ar: Copy } = {
  en: {
    eyebrow: 'Solutions',
    title: 'One agent, shaped around your business',
    description:
      'Talkys answers your calls, video calls and chats, then does the work behind them: orders, bookings, follow-ups and updates in the tools you already use. Pick your industry to see how.',
    jumpLabel: 'Jump to industry',
    forLabel: 'Talkys for',
    channels: { calls: 'On calls', video: 'On video', chat: 'In chat' },
    stackTitle: 'Updates in your stack',
    flowLabel: 'workflow',
    cta: 'Book a demo',
    industries: [
      {
        label: 'Restaurants & cafés',
        title: 'Restaurants & cafés',
        lead: 'Every order taken, even when the kitchen is slammed.',
        calls: 'Picks up every delivery and takeaway call at peak hours, reads back the order, upsells sides and drinks, and confirms the delivery time.',
        video: 'Walks guests through today’s specials and the menu with photos on a video call, and helps plan group bookings and events.',
        chat: 'Takes orders and table reservations on WhatsApp and Instagram DMs, answers allergen and opening-hours questions, and sends confirmations.',
        steps: ['Take the order', 'Push to POS', 'Confirm on WhatsApp', 'Track delivery'],
        alt: 'Talkys agent taking orders for a restaurant',
      },
      {
        label: 'Hotels & hospitality',
        title: 'Hotels & hospitality',
        lead: 'A front desk that never sleeps, in every guest’s language.',
        calls: 'Handles room availability, rates and reservation changes, and takes room-service and housekeeping requests straight from guest rooms.',
        video: 'Gives prospective guests a guided tour of rooms and facilities on a video call before they book.',
        chat: 'Answers check-in, transfer and local-tips questions on WhatsApp, sends pre-arrival messages and collects special requests.',
        steps: ['Answer the guest', 'Check availability', 'Book or log request', 'Notify the team'],
        alt: 'Talkys agent welcoming hotel guests at the front desk',
      },
      {
        label: 'Car dealerships',
        title: 'Car dealerships',
        lead: 'More test drives booked, fewer leads gone cold.',
        calls: 'Answers model, price and availability questions, qualifies budget and trade-in, and books test drives and service appointments.',
        video: 'Shows the car on a video call, compares trims and finance options, and keeps the buyer warm until they visit the showroom.',
        chat: 'Replies to ad leads on WhatsApp and Messenger in seconds, sends brochures and photos, and follows up after the visit.',
        steps: ['Qualify the lead', 'Book the test drive', 'Update the CRM', 'Hand off to sales'],
        alt: 'Car showroom where Talkys books test drives',
      },
      {
        label: 'Retail & e-commerce',
        title: 'Retail & e-commerce',
        lead: 'Answers at the moment of intent, so carts don’t go cold.',
        calls: 'Handles order status, returns and exchanges, and product questions without putting anyone on hold.',
        video: 'Shows products live, suggests sizes and alternatives, and guides customers to checkout during the call.',
        chat: 'Recommends products, shares links and stock, recovers abandoned carts on WhatsApp and Instagram, and follows up after delivery.',
        steps: ['Answer the question', 'Check stock & order', 'Send checkout link', 'Follow up'],
        alt: 'Retail store served by a Talkys agent',
      },
      {
        label: 'Clinics & healthcare',
        title: 'Clinics & healthcare',
        lead: 'Booked appointments, fewer no-shows, calmer reception.',
        calls: 'Books, moves and cancels appointments, answers questions about doctors, services and insurance, and routes urgent calls to staff.',
        video: 'Greets patients on a video call for pre-visit questions and guides them through preparation instructions.',
        chat: 'Sends reminders and confirmations on WhatsApp, handles rescheduling, and shares directions and opening hours.',
        steps: ['Find a slot', 'Book the appointment', 'Send reminder', 'Escalate if urgent'],
        alt: 'Clinic reception supported by a Talkys agent',
      },
      {
        label: 'Real estate',
        title: 'Real estate',
        lead: 'The first developer to answer usually wins the buyer.',
        calls: 'Responds to every inquiry instantly, qualifies budget, location and timeline, and books viewings with the right agent.',
        video: 'Presents units, floor plans and payment plans on a video call to buyers abroad or after hours.',
        chat: 'Sends brochures, prices and location pins on WhatsApp, and keeps following up until the buyer is ready.',
        steps: ['Qualify the buyer', 'Book a viewing', 'Log in the CRM', 'Hand off to an agent'],
        alt: 'Real estate project promoted by a Talkys agent',
      },
      {
        label: 'Salons & beauty',
        title: 'Salons & beauty',
        lead: 'A full calendar without picking up the phone mid-appointment.',
        calls: 'Books, moves and cancels appointments with the right stylist, and answers questions about services and prices.',
        video: 'Talks clients through treatments and packages on a video call before they book.',
        chat: 'Books on WhatsApp and Instagram DMs, sends reminders, and fills last-minute cancellations from a waitlist.',
        steps: ['Pick the service', 'Book the stylist', 'Send reminder', 'Fill cancellations'],
        alt: 'Beauty salon using Talkys for bookings',
      },
      {
        label: 'Logistics & delivery',
        title: 'Logistics & delivery',
        lead: '“Where is my order?” answered before your team even sees it.',
        calls: 'Gives live shipment status, reschedules deliveries, collects new pickup requests, and logs complaints.',
        video: 'Helps business clients on a video call with quotes, service options and setting up regular pickups.',
        chat: 'Sends tracking updates and delivery windows on WhatsApp and SMS, and confirms addresses before the driver leaves.',
        steps: ['Identify the shipment', 'Share status', 'Reschedule or log', 'Notify the driver'],
        alt: 'Delivery fleet supported by a Talkys agent',
      },
    ],
    closingTitle: 'Don’t see your industry?',
    closingText:
      'If your customers call, message or video call you, Talkys can handle it. Tell us how your business runs and we’ll shape the agent around it.',
    closingPrimary: 'Book a demo',
    closingSecondary: 'Read the FAQ',
  },
  ar: {
    eyebrow: 'الحلول',
    title: 'وكيل واحد مصمَّم على مقاس عملك',
    description:
      'يردّ Talkys على مكالماتك ومكالمات الفيديو والمحادثات، ثم ينجز العمل الذي يليها: الطلبات والحجوزات والمتابعات والتحديثات في الأدوات التي تستخدمها أصلاً. اختر قطاعك لترى كيف.',
    jumpLabel: 'انتقل إلى القطاع',
    forLabel: 'Talkys لقطاع',
    channels: { calls: 'في المكالمات', video: 'عبر الفيديو', chat: 'في المحادثات' },
    stackTitle: 'يحدّث أنظمتك',
    flowLabel: 'سير العمل',
    cta: 'احجز عرضاً تجريبياً',
    industries: [
      {
        label: 'المطاعم والمقاهي',
        title: 'المطاعم والمقاهي',
        lead: 'كل طلب يُسجَّل، حتى عندما يكون المطبخ في ذروة الضغط.',
        calls: 'يردّ على كل مكالمات التوصيل والاستلام في أوقات الذروة، يعيد قراءة الطلب، يقترح الإضافات والمشروبات، ويؤكّد وقت التوصيل.',
        video: 'يعرّف الضيوف على أطباق اليوم والقائمة بالصور عبر مكالمة فيديو، ويساعد في تنظيم حجوزات المجموعات والمناسبات.',
        chat: 'يستقبل الطلبات وحجوزات الطاولات عبر WhatsApp ورسائل Instagram، ويجيب عن أسئلة مسبّبات الحساسية وساعات العمل، ويرسل التأكيدات.',
        steps: ['استلام الطلب', 'إرساله إلى نظام نقاط البيع', 'التأكيد عبر WhatsApp', 'متابعة التوصيل'],
        alt: 'وكيل Talkys يستقبل الطلبات لمطعم',
      },
      {
        label: 'الفنادق والضيافة',
        title: 'الفنادق والضيافة',
        lead: 'مكتب استقبال لا ينام، يتحدث لغة كل ضيف.',
        calls: 'يتولّى الاستفسار عن توفّر الغرف والأسعار وتعديل الحجوزات، ويستقبل طلبات خدمة الغرف والتنظيف مباشرة من الضيوف.',
        video: 'يقدّم للضيوف المحتملين جولة مرشدة في الغرف والمرافق عبر مكالمة فيديو قبل الحجز.',
        chat: 'يجيب عن أسئلة تسجيل الوصول والتنقّل والتوصيات المحلية عبر WhatsApp، ويرسل رسائل ما قبل الوصول ويجمع الطلبات الخاصة.',
        steps: ['الرد على الضيف', 'التحقق من التوفّر', 'الحجز أو تسجيل الطلب', 'إبلاغ الفريق'],
        alt: 'وكيل Talkys يرحّب بضيوف الفندق في الاستقبال',
      },
      {
        label: 'وكالات السيارات',
        title: 'وكالات السيارات',
        lead: 'تجارب قيادة أكثر، وعملاء محتملون لا يبردون.',
        calls: 'يجيب عن أسئلة الطرازات والأسعار والتوفّر، يتحقّق من الميزانية والاستبدال، ويحجز تجارب القيادة ومواعيد الصيانة.',
        video: 'يعرض السيارة عبر مكالمة فيديو، يقارن الفئات وخيارات التمويل، ويبقي المشتري مهتماً حتى يزور المعرض.',
        chat: 'يردّ على العملاء القادمين من الإعلانات عبر WhatsApp وMessenger خلال ثوانٍ، يرسل الكتيّبات والصور، ويتابع بعد الزيارة.',
        steps: ['تأهيل العميل', 'حجز تجربة القيادة', 'تحديث نظام CRM', 'التحويل إلى المبيعات'],
        alt: 'معرض سيارات يحجز فيه Talkys تجارب القيادة',
      },
      {
        label: 'التجزئة والتجارة الإلكترونية',
        title: 'التجزئة والتجارة الإلكترونية',
        lead: 'إجابات في لحظة الرغبة في الشراء، فلا تُترك السلال.',
        calls: 'يتولّى حالة الطلبات والإرجاع والاستبدال وأسئلة المنتجات من دون انتظار على الخط.',
        video: 'يعرض المنتجات مباشرة، يقترح المقاسات والبدائل، ويرشد العميل إلى إتمام الشراء خلال المكالمة.',
        chat: 'يقترح المنتجات ويشارك الروابط والمخزون، يستعيد السلال المتروكة عبر WhatsApp وInstagram، ويتابع بعد التوصيل.',
        steps: ['الإجابة عن السؤال', 'التحقق من المخزون والطلب', 'إرسال رابط الدفع', 'المتابعة'],
        alt: 'متجر تجزئة يخدمه وكيل Talkys',
      },
      {
        label: 'العيادات والرعاية الصحية',
        title: 'العيادات والرعاية الصحية',
        lead: 'مواعيد محجوزة، غياب أقل، واستقبال أهدأ.',
        calls: 'يحجز المواعيد ويعدّلها ويلغيها، يجيب عن أسئلة الأطباء والخدمات والتأمين، ويحوّل الحالات العاجلة إلى الطاقم.',
        video: 'يستقبل المرضى عبر مكالمة فيديو للإجابة عن أسئلة ما قبل الزيارة ويشرح لهم تعليمات التحضير.',
        chat: 'يرسل التذكيرات والتأكيدات عبر WhatsApp، يتولّى إعادة الجدولة، ويشارك الموقع وساعات العمل.',
        steps: ['إيجاد موعد متاح', 'حجز الموعد', 'إرسال تذكير', 'التصعيد عند الحاجة'],
        alt: 'استقبال عيادة يدعمه وكيل Talkys',
      },
      {
        label: 'العقارات',
        title: 'العقارات',
        lead: 'المطوّر الذي يردّ أولاً يكسب المشتري غالباً.',
        calls: 'يردّ على كل استفسار فوراً، يتحقّق من الميزانية والموقع والتوقيت، ويحجز المعاينات مع الوكيل المناسب.',
        video: 'يعرض الوحدات والمخطّطات وخطط الدفع عبر مكالمة فيديو للمشترين في الخارج أو خارج ساعات العمل.',
        chat: 'يرسل الكتيّبات والأسعار ومواقع المشاريع عبر WhatsApp، ويواصل المتابعة حتى يصبح المشتري جاهزاً.',
        steps: ['تأهيل المشتري', 'حجز معاينة', 'التسجيل في CRM', 'التحويل إلى وكيل'],
        alt: 'مشروع عقاري يروّج له وكيل Talkys',
      },
      {
        label: 'الصالونات والتجميل',
        title: 'الصالونات والتجميل',
        lead: 'تقويم ممتلئ من دون أن تترك عميلاً لتردّ على الهاتف.',
        calls: 'يحجز المواعيد ويعدّلها ويلغيها مع المختص المناسب، ويجيب عن أسئلة الخدمات والأسعار.',
        video: 'يشرح للعملاء العلاجات والباقات عبر مكالمة فيديو قبل الحجز.',
        chat: 'يحجز عبر WhatsApp ورسائل Instagram، يرسل التذكيرات، ويملأ الإلغاءات المفاجئة من قائمة الانتظار.',
        steps: ['اختيار الخدمة', 'حجز المختص', 'إرسال تذكير', 'ملء الإلغاءات'],
        alt: 'صالون تجميل يستخدم Talkys للحجوزات',
      },
      {
        label: 'الخدمات اللوجستية والتوصيل',
        title: 'الخدمات اللوجستية والتوصيل',
        lead: '«أين طلبي؟» يُجاب عنه قبل أن يراه فريقك.',
        calls: 'يقدّم حالة الشحنة لحظياً، يعيد جدولة التوصيل، يستقبل طلبات الاستلام الجديدة، ويسجّل الشكاوى.',
        video: 'يساعد العملاء من الشركات عبر مكالمة فيديو في عروض الأسعار وخيارات الخدمة وتنظيم مواعيد الاستلام الدورية.',
        chat: 'يرسل تحديثات التتبّع ومواعيد التسليم عبر WhatsApp والرسائل النصية، ويؤكّد العناوين قبل انطلاق السائق.',
        steps: ['تحديد الشحنة', 'مشاركة الحالة', 'إعادة الجدولة أو التسجيل', 'إبلاغ السائق'],
        alt: 'أسطول توصيل يدعمه وكيل Talkys',
      },
    ],
    closingTitle: 'لا ترى قطاعك هنا؟',
    closingText:
      'إذا كان عملاؤك يتصلون بك أو يراسلونك أو يكلّمونك بالفيديو، فـ Talkys قادر على ذلك. أخبرنا كيف يعمل نشاطك وسنصمّم الوكيل على مقاسه.',
    closingPrimary: 'احجز عرضاً تجريبياً',
    closingSecondary: 'اقرأ الأسئلة الشائعة',
  },
};

function ChannelCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[var(--indigo-500)] shadow-xs">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="font-display text-base font-semibold text-[var(--text-primary)]">{title}</h3>
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">{text}</p>
    </div>
  );
}

function IndustryFeature({ index, item }: { index: number; item: Industry }) {
  const t = useCopy(copy);
  const v = visuals[index];
  const Icon = v.icon;
  const flip = index % 2 === 1;

  return (
    <section id={v.id} className="scroll-mt-28 overflow-hidden rounded-[28px] border border-[var(--border-color)] bg-white shadow-card">
      <div className="grid lg:grid-cols-2">
        <div className={cn('relative min-h-[260px] bg-[var(--bg-primary)]', flip && 'lg:order-last')}>
          <img
            src={v.image}
            alt={item.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={v.focus ? { objectPosition: v.focus } : undefined}
          />
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--indigo-50)] text-[var(--indigo-500)]">
              <Icon className="h-5 w-5" />
            </span>
            <p className="section-label">{t.forLabel}</p>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)] sm:text-4xl">{item.title}</h2>
          <p className="mt-4 font-display text-xl font-medium leading-snug text-[var(--text-primary)]">{item.lead}</p>

          <div className="mt-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <RefreshCw aria-hidden className="h-4 w-4 text-[var(--accent)]" />
              {t.stackTitle}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {v.stack.map((tool) => (
                <li
                  key={tool}
                  dir="ltr"
                  className="rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-1 text-[13px] font-medium text-[var(--text-secondary)]"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Button asChild variant="brand-outline" size="lg">
              <Link href="/#contact">
                {t.cta}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-5 border-t border-[var(--border-subtle)] p-6 sm:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <ChannelCard icon={Phone} title={t.channels.calls} text={item.calls} />
          <ChannelCard icon={Video} title={t.channels.video} text={item.video} />
          <ChannelCard icon={MessageCircle} title={t.channels.chat} text={item.chat} />
        </div>
        <StepChain label={`${item.title} ${t.flowLabel}`} steps={item.steps} size="sm" />
      </div>
    </section>
  );
}

export function UseCasesContent() {
  const t = useCopy(copy);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <section className="relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="hero-glow" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24 lg:pb-16">
          <SectionHeader as="h1" align="left" eyebrow={t.eyebrow} title={t.title} description={t.description} />
          <nav aria-label={t.jumpLabel} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {t.industries.map((item, i) => {
              const { id, icon: Icon, image, focus } = visuals[i];
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className="ind-tile group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-white p-3 pe-4 shadow-xs sm:p-4"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <span aria-hidden className="ind-tile-media">
                    <img src={image} alt="" loading="lazy" style={focus ? { objectPosition: focus } : undefined} />
                  </span>
                  <span className="ind-tile-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--indigo-50)] text-[var(--indigo-500)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-[var(--text-primary)] sm:text-[15px]">{item.label}</span>
                  <span aria-hidden className="hidden shrink-0 rtl:-scale-x-100 sm:block">
                    <ArrowRight className="ind-tile-arrow h-4 w-4 text-[var(--indigo-500)]" />
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-8 lg:space-y-10">
          {t.industries.map((item, index) => (
            <IndustryFeature key={visuals[index].id} index={index} item={item} />
          ))}
        </div>

        <section className="relative mt-10 overflow-hidden glass-panel-premium p-8 text-center sm:p-12 lg:mt-12">
          <div className="hero-glow" />
          <div className="relative">
            <h2 className="mb-3 font-display text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)] sm:text-4xl">{t.closingTitle}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-[var(--text-secondary)]">{t.closingText}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="brand" size="xl">
                <Link href="/#contact">
                  {t.closingPrimary}
                  <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                </Link>
              </Button>
              <Button asChild variant="brand-outline" size="xl">
                <Link href="/faq/">{t.closingSecondary}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
