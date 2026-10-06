'use client';

import { Languages } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, toggleLocale } = useLocale();
  const isAr = locale === 'ar';

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
      className={cn(
        'inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-[var(--border-color)] bg-white px-3 text-sm font-semibold text-[var(--text-secondary)] transition-[color,border-color,transform] duration-150 ease-out-strong hover:border-[var(--indigo-300)] hover:text-[var(--accent)] active:scale-[0.97]',
        className
      )}
    >
      <Languages aria-hidden className="h-4 w-4" />
      <span lang={isAr ? 'en' : 'ar'}>{isAr ? 'EN' : 'عربي'}</span>
    </button>
  );
}
