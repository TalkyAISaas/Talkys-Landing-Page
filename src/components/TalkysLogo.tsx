import { cn } from '@/lib/utils';

/** The Talkys wordmark. Size it with a font-size class (e.g. `text-2xl`). */
export function TalkysLogo({ className }: { className?: string }) {
  return (
    <span role="img" aria-label="Talkys" className={cn('talkys-logo inline-block', className)}>
      Talkys<span className="talkys-logo-dot">.</span>
    </span>
  );
}
