'use client';

import { BedDouble, Building2, Car, Scissors, ShoppingBag, Stethoscope, Truck, UtensilsCrossed } from 'lucide-react';
import { useCopy, useLocale } from '@/i18n/LocaleContext';

const icons = [UtensilsCrossed, BedDouble, Car, ShoppingBag, Stethoscope, Building2, Scissors, Truck];

const copy = {
  en: {
    label: 'Built for businesses that live on conversations',
    aria: 'Industries Talkys serves',
    industries: [
      'Restaurants & cafés',
      'Hotels & hospitality',
      'Car dealerships',
      'Retail & e-commerce',
      'Clinics & healthcare',
      'Real estate',
      'Salons & beauty',
      'Logistics & delivery',
    ],
  },
  ar: {
    label: 'مصمَّم للأعمال التي تعيش على التواصل مع عملائها',
    aria: 'القطاعات التي يخدمها Talkys',
    industries: [
      'المطاعم والمقاهي',
      'الفنادق والضيافة',
      'معارض السيارات',
      'التجزئة والتجارة الإلكترونية',
      'العيادات والرعاية الصحية',
      'العقارات',
      'صالونات التجميل',
      'الخدمات اللوجستية والتوصيل',
    ],
  },
};

function IndustryRow({ items, hidden = false }: { items: string[]; hidden?: boolean }) {
  const { dir } = useLocale();
  return (
    <ul className="flex shrink-0 items-center gap-3 pe-3" aria-hidden={hidden || undefined}>
      {items.map((name, i) => {
        const Icon = icons[i];
        return (
          <li
            key={name}
            dir={dir}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--border-color)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-secondary)]"
          >
            <Icon className="h-4 w-4 text-[var(--indigo-400)]" />
            {name}
          </li>
        );
      })}
    </ul>
  );
}

/** Industries marquee under the hero. */
export function TrustStrip() {
  const t = useCopy(copy);

  return (
    <section id="social-proof" aria-label={t.aria} className="relative pb-16 lg:pb-20">
      <p className="px-4 text-center text-sm font-medium text-[var(--text-muted)]">{t.label}</p>
      {/* The marquee track scrolls in one physical direction, so it stays LTR; each pill keeps its own text direction. */}
      <div dir="ltr" className="marquee marquee-mask mt-5 overflow-hidden">
        <div className="marquee-track">
          <IndustryRow items={t.industries} />
          <IndustryRow items={t.industries} hidden />
        </div>
      </div>
    </section>
  );
}
