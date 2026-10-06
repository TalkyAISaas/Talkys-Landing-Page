import {
  BedDouble,
  CalendarCheck,
  CalendarClock,
  Car,
  ClipboardList,
  ConciergeBell,
  CreditCard,
  Gauge,
  Heart,
  HeartPulse,
  House,
  KeyRound,
  MapPin,
  Package,
  Receipt,
  Scissors,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Stethoscope,
  Tag,
  Truck,
  UtensilsCrossed,
  Wrench,
  Building2,
  Bike,
  type LucideIcon,
} from 'lucide-react';
import type { Locale } from '@/i18n/LocaleContext';

export type IndustryId =
  | 'restaurants'
  | 'hotels'
  | 'dealerships'
  | 'retail'
  | 'clinics'
  | 'real-estate'
  | 'salons'
  | 'logistics';

/** Everything user-visible about an industry, in one locale. `ar` mirrors `en`. */
export type IndustryCopy = {
  label: string;
  /** Where and when the sample conversation happens, e.g. "WhatsApp · 11:40 PM". */
  channel: string;
  /** Illustrative customer message (mock data, not a real customer). */
  customer: string;
  /** The agent's reply. */
  reply: string;
  /** What the agent does end to end, as a conversation → action chain. */
  chain: string[];
  /** Three things the agent completes, cycled in the animated visual. */
  outcomes: [string, string, string];
  imageAlt: string;
};

export type Industry = {
  id: IndustryId;
  icon: LucideIcon;
  /** Four related icons that orbit the industry icon in <IndustryVisual>. */
  satellites: [LucideIcon, LucideIcon, LucideIcon, LucideIcon];
  /** Photo in /public (landscape, ~16:9). */
  image: string;
  /** Which part of the image a narrow crop should show (CSS object-position). */
  tileFocus?: string;
  /** Shown in the homepage Industries section. */
  featured: boolean;
  /** English label, kept for callers that are not localised yet. Prefer `industry[locale].label`. */
  label: string;
  en: IndustryCopy;
  ar: IndustryCopy;
};

type IndustryInput = Omit<Industry, 'label'>;

const data: IndustryInput[] = [
  {
    id: 'restaurants',
    icon: UtensilsCrossed,
    satellites: [Bike, Receipt, CalendarCheck, Star],
    image: '/industry-food-warm.jpg',
    featured: true,
    en: {
      label: 'Restaurants & cafés',
      channel: 'Phone call · 8:15 PM',
      customer: '“Hi, can I get two chicken shawarma plates delivered to Achrafieh? And do you have a table for four on Friday?”',
      reply: '“Of course. Two shawarma plates, that’s 18 dollars with delivery, about 35 minutes. And Friday at 8 for four is free, shall I book it under your name?”',
      chain: ['Answer the call', 'Take the order', 'Push it to the POS', 'Book the table', 'Send WhatsApp confirmation'],
      outcomes: ['Order sent to Foodics', 'Table for 4 booked on Friday', 'Confirmation sent on WhatsApp'],
      imageAlt: 'A busy restaurant dining room',
    },
    ar: {
      label: 'المطاعم والمقاهي',
      channel: 'مكالمة هاتفية · 8:15 مساءً',
      customer: '«مرحبا، بدي طبقين شاورما دجاج توصيل على الأشرفية. وفي عندكم طاولة لأربعة يوم الجمعة؟»',
      reply: '«أكيد. طبقين شاورما، المجموع 18 دولار مع التوصيل، وبيوصلوا خلال 35 دقيقة تقريبًا. والجمعة الساعة 8 في طاولة لأربعة، بحجزها باسمك؟»',
      chain: ['الرد على المكالمة', 'تسجيل الطلب', 'إرساله إلى نظام نقاط البيع', 'حجز الطاولة', 'إرسال تأكيد عبر WhatsApp'],
      outcomes: ['الطلب أُرسل إلى Foodics', 'حُجزت طاولة لأربعة يوم الجمعة', 'أُرسل التأكيد عبر WhatsApp'],
      imageAlt: 'صالة مطعم مزدحمة',
    },
  },
  {
    id: 'hotels',
    icon: ConciergeBell,
    satellites: [BedDouble, UtensilsCrossed, KeyRound, Star],
    image: '/industry-realestate.jpg',
    tileFocus: '60% 50%',
    featured: true,
    en: {
      label: 'Hotels & hospitality',
      channel: 'WhatsApp · 2:10 AM',
      customer: '“Do you have a sea-view double from the 14th to the 17th? We land late, around midnight.”',
      reply: '“Yes, a sea-view double is available for those three nights at 140 USD a night, breakfast included. I’ve noted a late arrival so the front desk keeps it for you. Shall I send the payment link?”',
      chain: ['Check availability', 'Quote the rate', 'Book the room', 'Take the deposit', 'Handle room-service requests'],
      outcomes: ['3 nights booked, deposit paid', 'Late arrival noted for reception', 'Room service order sent to the kitchen'],
      imageAlt: 'A resort with a pool at dusk',
    },
    ar: {
      label: 'الفنادق والضيافة',
      channel: 'WhatsApp · 2:10 فجرًا',
      customer: '«هل لديكم غرفة مزدوجة بإطلالة على البحر من 14 إلى 17؟ سنصل متأخرين قرابة منتصف الليل.»',
      reply: '«نعم، تتوفر غرفة مزدوجة بإطلالة بحرية لهذه الليالي الثلاث بسعر 140 دولارًا لليلة مع الفطور. سجّلت وصولكم المتأخر ليحتفظ بها الاستقبال. هل أرسل لكم رابط الدفع؟»',
      chain: ['التحقق من التوفر', 'تقديم السعر', 'حجز الغرفة', 'تحصيل العربون', 'تلبية طلبات خدمة الغرف'],
      outcomes: ['حُجزت 3 ليالٍ ودُفع العربون', 'سُجّل الوصول المتأخر لدى الاستقبال', 'أُرسل طلب خدمة الغرف إلى المطبخ'],
      imageAlt: 'منتجع مع مسبح عند الغروب',
    },
  },
  {
    id: 'dealerships',
    icon: Car,
    satellites: [Gauge, CalendarCheck, CreditCard, Wrench],
    image: '/dealership-jetour.jpg',
    featured: true,
    en: {
      label: 'Car dealerships',
      channel: 'Instagram DM · 10:05 PM',
      customer: '“What’s the price of the new SUV in white? Can I test drive it this weekend?”',
      reply: '“The white one is in stock, here are the trims and prices. I have Saturday at 11 or 3 for a test drive. Which works for you? I’ll also send the financing options.”',
      chain: ['Answer the inquiry', 'Qualify the buyer', 'Book the test drive', 'Share financing options', 'Hand off to sales with a summary'],
      outcomes: ['Test drive booked for Saturday', 'Lead logged in the CRM', 'Sales rep briefed with the transcript'],
      imageAlt: 'An SUV in a car dealership showroom',
    },
    ar: {
      label: 'معارض السيارات',
      channel: 'رسالة Instagram · 10:05 مساءً',
      customer: '«كم سعر السيارة الـSUV الجديدة باللون الأبيض؟ وهل يمكنني تجربتها نهاية هذا الأسبوع؟»',
      reply: '«اللون الأبيض متوفر، وهذه الفئات وأسعارها. لدي موعدان لتجربة القيادة يوم السبت: 11 صباحًا أو 3 عصرًا. أيهما يناسبك؟ وسأرسل لك خيارات التمويل أيضًا.»',
      chain: ['الرد على الاستفسار', 'تأهيل المشتري', 'حجز تجربة القيادة', 'مشاركة خيارات التمويل', 'التحويل إلى المبيعات مع ملخص'],
      outcomes: ['حُجزت تجربة قيادة يوم السبت', 'سُجّل العميل في نظام CRM', 'استلم مندوب المبيعات النص الكامل'],
      imageAlt: 'سيارة SUV في صالة عرض سيارات',
    },
  },
  {
    id: 'retail',
    icon: ShoppingBag,
    satellites: [ShoppingCart, Tag, Package, Heart],
    image: '/industry-retail-warm.jpg',
    featured: true,
    en: {
      label: 'Retail & e-commerce',
      channel: 'Instagram DM · 1:20 AM',
      customer: '“Is this dress still available in medium? Where’s my last order, by the way?”',
      reply: '“Medium is in stock, here’s your checkout link. Your last order left the warehouse this morning and arrives tomorrow before 6 PM.”',
      chain: ['Check stock', 'Send the checkout link', 'Track the order', 'Process the return', 'Follow up after delivery'],
      outcomes: ['Checkout link sent, order paid', 'Delivery status shared', 'Return label sent on WhatsApp'],
      imageAlt: 'A clothing boutique interior',
    },
    ar: {
      label: 'التجزئة والتجارة الإلكترونية',
      channel: 'رسالة Instagram · 1:20 فجرًا',
      customer: '«هل هذا الفستان متوفر بمقاس وسط؟ وبالمناسبة، أين طلبي الأخير؟»',
      reply: '«المقاس الوسط متوفر، وهذا رابط الشراء. أما طلبك الأخير فقد غادر المستودع صباح اليوم ويصلك غدًا قبل السادسة مساءً.»',
      chain: ['التحقق من المخزون', 'إرسال رابط الشراء', 'تتبع الطلب', 'معالجة الإرجاع', 'المتابعة بعد التسليم'],
      outcomes: ['أُرسل رابط الشراء ودُفع الطلب', 'شُوركت حالة التوصيل', 'أُرسل ملصق الإرجاع عبر WhatsApp'],
      imageAlt: 'متجر ملابس من الداخل',
    },
  },
  {
    id: 'clinics',
    icon: HeartPulse,
    satellites: [Stethoscope, CalendarClock, ClipboardList, Heart],
    image: '/industry-health-warm.jpg',
    featured: true,
    en: {
      label: 'Clinics & healthcare',
      channel: 'Phone call · 7:30 AM',
      customer: '“I need to see a dermatologist this week. Do you take my insurance?”',
      reply: '“Yes, we work with your insurer. Dr. Nour has Wednesday at 4:30 or Thursday at 10. I’ll text you a reminder the day before, and what to bring.”',
      chain: ['Answer the call', 'Check insurance', 'Book the appointment', 'Send a reminder', 'Reschedule no-shows'],
      outcomes: ['Appointment booked for Wednesday', 'Reminder scheduled by SMS', 'Reception notified of a new patient'],
      imageAlt: 'A clinic reception area',
    },
    ar: {
      label: 'العيادات والرعاية الصحية',
      channel: 'مكالمة هاتفية · 7:30 صباحًا',
      customer: '«أحتاج موعدًا مع طبيب جلدية هذا الأسبوع. هل تقبلون تأميني؟»',
      reply: '«نعم، نتعامل مع شركة تأمينك. لدى الدكتورة نور موعد الأربعاء 4:30 عصرًا أو الخميس 10 صباحًا. سأرسل لك تذكيرًا قبل يوم مع ما يجب إحضاره.»',
      chain: ['الرد على المكالمة', 'التحقق من التأمين', 'حجز الموعد', 'إرسال تذكير', 'إعادة جدولة المواعيد الفائتة'],
      outcomes: ['حُجز موعد يوم الأربعاء', 'جُدول تذكير عبر SMS', 'أُبلغ الاستقبال بمريض جديد'],
      imageAlt: 'منطقة استقبال في عيادة',
    },
  },
  {
    id: 'real-estate',
    icon: Building2,
    satellites: [House, KeyRound, CalendarCheck, MapPin],
    image: '/industry-realestate-warm.jpg',
    featured: true,
    en: {
      label: 'Real estate',
      channel: 'WhatsApp · 9:40 PM',
      customer: '“I saw your ad for the 3-bedroom apartment. What’s the price, and can I visit Saturday?”',
      reply: '“It’s 3 bedrooms, 180 m², with parking. Here are the photos and the floor plan. I can book a viewing Saturday at 12 with our agent. Are you buying or renting?”',
      chain: ['Answer the lead', 'Share listing details', 'Qualify budget & timing', 'Book the viewing', 'Update the CRM'],
      outcomes: ['Viewing booked for Saturday', 'Budget and timing captured', 'Agent briefed in the CRM'],
      imageAlt: 'A villa with a garden at sunset',
    },
    ar: {
      label: 'العقارات',
      channel: 'WhatsApp · 9:40 مساءً',
      customer: '«رأيت إعلانكم عن الشقة بثلاث غرف نوم. كم السعر؟ وهل يمكنني زيارتها يوم السبت؟»',
      reply: '«الشقة بثلاث غرف نوم ومساحة 180 م² مع موقف سيارة. هذه الصور والمخطط. يمكنني حجز معاينة يوم السبت الساعة 12 مع وكيلنا. هل تبحث عن شراء أم إيجار؟»',
      chain: ['الرد على العميل المحتمل', 'مشاركة تفاصيل العقار', 'تأهيل الميزانية والتوقيت', 'حجز المعاينة', 'تحديث نظام CRM'],
      outcomes: ['حُجزت معاينة يوم السبت', 'سُجّلت الميزانية والتوقيت', 'استلم الوكيل الملخص في CRM'],
      imageAlt: 'فيلا مع حديقة عند الغروب',
    },
  },
  {
    id: 'salons',
    icon: Scissors,
    satellites: [CalendarCheck, Sparkles, Star, CreditCard],
    image: '/industry-salon-warm.jpg',
    featured: false,
    en: {
      label: 'Salons & beauty',
      channel: 'WhatsApp · 11:15 PM',
      customer: '“Can I book a blow-dry and nails tomorrow afternoon?”',
      reply: '“Tomorrow at 3 with Rana for the blow-dry, then nails at 4. Shall I confirm both?”',
      chain: ['Check the stylist’s calendar', 'Book the services', 'Send a reminder', 'Fill cancellations'],
      outcomes: ['Two services booked', 'Reminder sent the day before', 'Cancelled slot refilled'],
      imageAlt: 'A beauty salon interior',
    },
    ar: {
      label: 'الصالونات والتجميل',
      channel: 'WhatsApp · 11:15 مساءً',
      customer: '«هل يمكنني حجز تصفيف شعر وأظافر غدًا بعد الظهر؟»',
      reply: '«غدًا الساعة 3 مع رنا لتصفيف الشعر، ثم الأظافر الساعة 4. هل أؤكد الموعدين؟»',
      chain: ['التحقق من تقويم المصففة', 'حجز الخدمات', 'إرسال تذكير', 'ملء المواعيد الملغاة'],
      outcomes: ['حُجزت خدمتان', 'أُرسل تذكير قبل يوم', 'مُلئ موعد ملغى'],
      imageAlt: 'صالون تجميل من الداخل',
    },
  },
  {
    id: 'logistics',
    icon: Truck,
    satellites: [Package, MapPin, Bike, ClipboardList],
    image: '/industry-logistics-warm.jpg',
    featured: false,
    en: {
      label: 'Logistics & delivery',
      channel: 'Phone call · 6:50 PM',
      customer: '“My parcel was supposed to arrive today. Where is it?”',
      reply: '“It’s out for delivery and about 40 minutes away. Want me to ask the driver to call when he’s close?”',
      chain: ['Look up the shipment', 'Share the live status', 'Reschedule delivery', 'Log the request'],
      outcomes: ['Shipment status shared', 'Delivery rescheduled', 'Driver notified'],
      imageAlt: 'A delivery and logistics hub',
    },
    ar: {
      label: 'الخدمات اللوجستية والتوصيل',
      channel: 'مكالمة هاتفية · 6:50 مساءً',
      customer: '«كان من المفترض أن تصل شحنتي اليوم. أين هي؟»',
      reply: '«الشحنة مع المندوب الآن وتصلك خلال 40 دقيقة تقريبًا. هل تريد أن أطلب من السائق الاتصال بك عند اقترابه؟»',
      chain: ['البحث عن الشحنة', 'مشاركة الحالة المباشرة', 'إعادة جدولة التوصيل', 'تسجيل الطلب'],
      outcomes: ['شُوركت حالة الشحنة', 'أُعيدت جدولة التوصيل', 'أُبلغ السائق'],
      imageAlt: 'مركز توصيل وخدمات لوجستية',
    },
  },
];

export const industries: Industry[] = data.map((industry) => ({ ...industry, label: industry.en.label }));

/** The six industries shown on the homepage. */
export const featuredIndustries = industries.filter((industry) => industry.featured);

export const industryById = Object.fromEntries(industries.map((i) => [i.id, i])) as Record<string, Industry>;

/** One industry flattened for a locale: its shared fields plus that locale's copy. */
export function localizeIndustry(industry: Industry, locale: Locale) {
  const { en, ar, ...shared } = industry;
  return { ...shared, ...(locale === 'ar' ? ar : en) };
}
