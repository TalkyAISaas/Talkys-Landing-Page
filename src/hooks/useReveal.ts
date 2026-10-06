'use client';

import { useRef, type DependencyList, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const REVEAL_EASE = 'expo.out';

type RevealContext = {
  /** True when the visitor asked for reduced motion. */
  reduced: boolean;
  /** Fade (and, unless reduced, rise) the matched elements in once when they scroll into view. */
  reveal: (targets: gsap.TweenTarget, opts?: { trigger?: Element | string | null; stagger?: number; y?: number; start?: string }) => void;
};

/**
 * Scroll-reveal helper shared by every section.
 * Each `[data-reveal]` descendant fades + rises 20px, once, on entering the viewport.
 * Under prefers-reduced-motion it becomes a short opacity fade with no movement.
 * Extra section-specific motion goes in `setup`, which runs inside the same gsap context
 * (so everything is reverted on unmount).
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  setup?: (ctx: RevealContext) => void,
  deps: DependencyList = []
): RefObject<T | null> {
  const scope = useRef<T | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { reduced: '(prefers-reduced-motion: reduce)', full: '(prefers-reduced-motion: no-preference)' },
        (context) => {
          const reduced = Boolean(context.conditions?.reduced);
          const reveal: RevealContext['reveal'] = (targets, opts = {}) => {
            const els = gsap.utils.toArray<Element>(targets);
            if (!els.length) return;
            gsap.fromTo(
              els,
              { autoAlpha: 0, y: reduced ? 0 : (opts.y ?? 20) },
              {
                autoAlpha: 1,
                y: 0,
                duration: reduced ? 0.2 : 0.6,
                ease: reduced ? 'none' : REVEAL_EASE,
                stagger: reduced ? 0 : (opts.stagger ?? 0.06),
                scrollTrigger: {
                  trigger: opts.trigger ?? els[0],
                  start: opts.start ?? 'top 85%',
                  once: true,
                },
              }
            );
          };

          // Section headers: eyebrow, then the headline wipes up, then the description.
          const revealHeader = (header: HTMLElement) => {
            const [eyebrow, title, desc] = Array.from(header.children) as HTMLElement[];
            const tl = gsap.timeline({ scrollTrigger: { trigger: header, start: 'top 85%', once: true } });
            if (reduced) {
              tl.fromTo(header.children, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'none' });
              return;
            }
            if (eyebrow) tl.fromTo(eyebrow, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: REVEAL_EASE }, 0);
            if (title)
              tl.fromTo(
                title,
                { clipPath: 'inset(100% 0% -10% 0%)', y: 20 },
                { clipPath: 'inset(0% 0% -10% 0%)', y: 0, duration: 0.8, ease: REVEAL_EASE, clearProps: 'clipPath' },
                0.08
              );
            if (desc) tl.fromTo(desc, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: REVEAL_EASE }, 0.2);
          };

          const root = scope.current;
          if (root) {
            root.querySelectorAll<HTMLElement>('[data-reveal-header]').forEach(revealHeader);
            // Step chains cascade in once, the first time their panel scrolls into view.
            // `data-chain` is script-owned (React never renders it) so re-renders can't reset it;
            // once the cascade has played it goes to 'done' and tab switches rely on panel-swap alone.
            root.querySelectorAll<HTMLElement>('[data-inview]').forEach((el) => {
              el.dataset.chain = 'pending';
              ScrollTrigger.create({
                trigger: el,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                  el.dataset.chain = 'play';
                  gsap.delayedCall(1.2, () => (el.dataset.chain = 'done'));
                },
              });
            });
            root.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
              reveal(group.querySelectorAll(':scope > *'), { trigger: group });
            });
            root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => reveal(el));
          }
          setup?.({ reduced, reveal });
        }
      );
    },
    { scope, dependencies: [...deps] }
  );

  return scope;
}
