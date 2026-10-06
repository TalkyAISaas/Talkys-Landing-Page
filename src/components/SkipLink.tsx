'use client';

import { useCopy } from '@/i18n/LocaleContext';

export function SkipLink() {
  const label = useCopy({ en: 'Skip to content', ar: 'انتقل إلى المحتوى' });
  return (
    <a href="#main-content" className="skip-link">
      {label}
    </a>
  );
}
