export type DemoIndustryId = 'restaurant' | 'dealership' | 'hotel' | 'retail';

export interface DemoIndustry {
  id: DemoIndustryId;
  label: { en: string; ar: string };
  /** Business name shown in the mock call / chat header. */
  business: { en: string; ar: string };
  /** Recorded sample call. Only English recordings exist today. */
  audio: string;
  /** WebVTT captions for the sample call ("Customer: …" / "Agent: …" cues). */
  captions: string;
}

export const DEMO_INDUSTRIES: DemoIndustry[] = [
  {
    id: 'restaurant',
    label: { en: 'Restaurant', ar: 'مطعم' },
    business: { en: 'Your restaurant', ar: 'مطعمك' },
    audio: '/audio/restaurant-en.mp3',
    captions: '/captions/restaurant-en.vtt',
  },
  {
    id: 'dealership',
    label: { en: 'Car dealership', ar: 'معرض سيارات' },
    business: { en: 'Your showroom', ar: 'معرضك' },
    audio: '/audio/dealership-en.mp3',
    captions: '/captions/dealership-en.vtt',
  },
  {
    id: 'hotel',
    label: { en: 'Hotel', ar: 'فندق' },
    business: { en: 'Your hotel', ar: 'فندقك' },
    audio: '/audio/hotel-en.mp3',
    captions: '/captions/hotel-en.vtt',
  },
  {
    id: 'retail',
    label: { en: 'Retail', ar: 'متجر' },
    business: { en: 'Your store', ar: 'متجرك' },
    audio: '/audio/retail-en.mp3',
    captions: '/captions/retail-en.vtt',
  },
];
