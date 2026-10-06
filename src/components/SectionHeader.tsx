import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
  as?: 'h1' | 'h2';
};

export function SectionHeader({ eyebrow, title, description, align = 'center', className, as: Heading = 'h2' }: SectionHeaderProps) {
  return (
    <div
      data-reveal-header
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-start',
        className
      )}
    >
      <p className="section-label mb-3">{eyebrow}</p>
      <Heading
        className={cn(
          'font-display font-bold tracking-[-0.025em] text-[var(--text-primary)]',
          Heading === 'h1' ? 'text-4xl sm:text-5xl lg:text-6xl leading-[1.05]' : 'text-3xl sm:text-4xl lg:text-[44px] leading-[1.1]'
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            'mt-4 text-base lg:text-lg leading-relaxed text-[var(--text-secondary)] max-w-2xl',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
