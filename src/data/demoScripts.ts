import type { DemoIndustryId } from '@/data/demoIndustries';

/** Language of the scripted chat. Independent from the site locale. */
export type ChatLanguage = 'en' | 'ar';

export interface ChatMessage {
  side: 'customer' | 'agent';
  text?: string;
  /** Optional image attachment (public path). */
  image?: string;
}

const CAR_PHOTO = '/dealership-jetour.jpg';

// Illustrative conversations only: prices, dates and products are sample data.
const EN: Record<DemoIndustryId, ChatMessage[]> = {
  restaurant: [
    { side: 'customer', text: 'Hi! Do you deliver to Downtown?' },
    { side: 'agent', text: 'We do, about 35 minutes. What can I get you?' },
    { side: 'customer', text: '2 chicken shawarmas and a large fries' },
    { side: 'agent', text: 'Garlic sauce on the side?' },
    { side: 'customer', text: 'Yes please, and one Pepsi' },
    { side: 'agent', text: 'That’s $12.50. Card on delivery?' },
    { side: 'customer', text: 'Perfect 🙏' },
    { side: 'agent', text: 'Order confirmed ✓ The driver will call when close.' },
  ],
  dealership: [
    { side: 'customer', text: 'Hi! Is the Jetour Traveller still available?' },
    { side: 'agent', text: 'It is. Here’s the one on our floor 📸' },
    { side: 'agent', image: CAR_PHOTO },
    { side: 'customer', text: 'Looks great. Can I test drive it?' },
    { side: 'agent', text: 'Thursday at 5pm works?' },
    { side: 'customer', text: 'Perfect' },
    { side: 'agent', text: 'Booked ✓ Please bring your driving licence.' },
  ],
  hotel: [
    { side: 'customer', text: 'Sea-view room for July 15–17?' },
    { side: 'agent', text: 'Available! $180 a night, breakfast included.' },
    { side: 'customer', text: 'Two guests. Please book it' },
    { side: 'agent', text: 'Shall I use the card on file?' },
    { side: 'customer', text: 'Yes' },
    { side: 'agent', text: 'Confirmed ✓ See you on July 15 🌊' },
  ],
  retail: [
    { side: 'customer', text: 'Is the brown leather bag still in stock?' },
    { side: 'agent', text: 'Yes! Delivery or pickup?' },
    { side: 'customer', text: 'Delivery today if possible' },
    { side: 'agent', text: 'Does 5–6pm work for you?' },
    { side: 'customer', text: 'Yes' },
    { side: 'agent', text: '$95 + $5 delivery. Shall I confirm?' },
    { side: 'customer', text: 'Confirm' },
    { side: 'agent', text: 'Done ✓ Tracking link sent to your phone.' },
  ],
};

const AR: Record<DemoIndustryId, ChatMessage[]> = {
  restaurant: [
    { side: 'customer', text: 'مرحباً! هل توصلون إلى وسط المدينة؟' },
    { side: 'agent', text: 'نعم، خلال ٣٥ دقيقة تقريباً. ماذا تودّ أن تطلب؟' },
    { side: 'customer', text: 'شاورما دجاج عدد ٢ وبطاطا كبيرة' },
    { side: 'agent', text: 'هل تريد صلصة الثوم على الجانب؟' },
    { side: 'customer', text: 'نعم من فضلك، ومعها بيبسي' },
    { side: 'agent', text: 'المجموع ١٢٫٥ دولار. الدفع بالبطاقة عند الاستلام؟' },
    { side: 'customer', text: 'ممتاز 🙏' },
    { side: 'agent', text: 'تم تأكيد الطلب ✓ سيتصل بك السائق عند اقترابه.' },
  ],
  dealership: [
    { side: 'customer', text: 'مرحباً! هل سيارة Jetour Traveller ما زالت متوفرة؟' },
    { side: 'agent', text: 'نعم، هذه هي الموجودة في المعرض 📸' },
    { side: 'agent', image: CAR_PHOTO },
    { side: 'customer', text: 'رائعة! هل يمكنني تجربة القيادة؟' },
    { side: 'agent', text: 'هل يناسبك يوم الخميس الساعة الخامسة مساءً؟' },
    { side: 'customer', text: 'ممتاز' },
    { side: 'agent', text: 'تم الحجز ✓ يُرجى إحضار رخصة القيادة.' },
  ],
  hotel: [
    { side: 'customer', text: 'هل تتوفر غرفة مطلّة على البحر من ١٥ إلى ١٧ يوليو؟' },
    { side: 'agent', text: 'متوفرة! ١٨٠ دولاراً لليلة مع الإفطار.' },
    { side: 'customer', text: 'لشخصين، احجزها من فضلك' },
    { side: 'agent', text: 'هل أستخدم البطاقة المسجّلة لدينا؟' },
    { side: 'customer', text: 'نعم' },
    { side: 'agent', text: 'تم التأكيد ✓ بانتظارك في ١٥ يوليو 🌊' },
  ],
  retail: [
    { side: 'customer', text: 'هل الحقيبة الجلدية البنية ما زالت متوفرة؟' },
    { side: 'agent', text: 'نعم! توصيل أم استلام من المتجر؟' },
    { side: 'customer', text: 'توصيل اليوم إن أمكن' },
    { side: 'agent', text: 'هل يناسبك بين الخامسة والسادسة مساءً؟' },
    { side: 'customer', text: 'نعم' },
    { side: 'agent', text: '٩٥ دولاراً + ٥ للتوصيل. هل أؤكد الطلب؟' },
    { side: 'customer', text: 'أكّد' },
    { side: 'agent', text: 'تم ✓ أرسلنا رابط التتبّع إلى هاتفك.' },
  ],
};

export const DEMO_SCRIPTS: Record<ChatLanguage, Record<DemoIndustryId, ChatMessage[]>> = { en: EN, ar: AR };
