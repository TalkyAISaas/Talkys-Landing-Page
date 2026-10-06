import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type StepChainProps = {
  steps: string[];
  label: string;
  className?: string;
  size?: 'sm' | 'md';
};

/**
 * A process drawn as connected steps: chip › chip › chip.
 * Rendered as an ordered list so assistive tech reads it as a sequence.
 * Chips carry `data-chain-step` so sections can stagger them in.
 */
export function StepChain({ steps, label, className, size = 'md' }: StepChainProps) {
  return (
    <ol aria-label={label} className={cn('flex flex-wrap items-center gap-y-2', className)}>
      {steps.map((step, index) => (
        <li key={step} data-chain-step style={{ '--i': index } as React.CSSProperties} className="flex items-center">
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-lg border border-[var(--indigo-100)] bg-white font-medium text-[var(--text-primary)] shadow-xs',
              size === 'sm' ? 'px-2.5 py-1 text-[13px]' : 'px-3 py-1.5 text-sm'
            )}
          >
            <span className="font-mono text-[11px] font-semibold tabular-nums text-[var(--indigo-400)]">{String(index + 1).padStart(2, '0')}</span>
            {step}
          </span>
          {index < steps.length - 1 && <ChevronRight aria-hidden className="mx-1 h-4 w-4 shrink-0 text-[var(--indigo-300)]" />}
        </li>
      ))}
    </ol>
  );
}
