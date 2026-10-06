'use client';

import { useEffect, useRef } from 'react';
import { useCopy } from '@/i18n/LocaleContext';

/**
 * Cinematic homepage backdrop. One field of light particles tells the Talkys story as the
 * page scrolls: it awakens as a core, listens as sound waves, understands as a network,
 * structures itself into layers, acts as flowing streams, reaches everywhere as a globe
 * and settles into a halo. Each chapter is tied to the section on screen; the particles
 * glide between formations with inertia and leave short motion trails.
 *
 * Canvas 2D, transparent over the white page. Under reduced motion it draws still
 * frames (no drift, no trails) and only changes formation as sections change.
 */

type Vec = { x: number; y: number; z: number };
type Formation = (i: number, t: number, aspect: number) => Vec;

/** `light` = strength of the teal / aqua / coral light layers for that chapter. */
const CHAPTERS = [
  { light: [1, 0.35, 0] },
  { light: [1, 0, 0.25] },
  { light: [0.2, 1, 0] },
  { light: [0.35, 0.8, 0.3] },
  { light: [0.2, 0.4, 1] },
  { light: [0.55, 1, 0.2] },
  { light: [0, 0.35, 1] },
] as const;

const copy = {
  en: { chapters: ['Awaken', 'Listen', 'Understand', 'Structure', 'Act', 'Everywhere', 'Outcome'] },
  ar: { chapters: ['انطلاق', 'إصغاء', 'فهم', 'تنظيم', 'تنفيذ', 'في كل مكان', 'نتيجة'] },
};

/** Light layers and particle colours come from the brand tokens in index.css. */
const LIGHTS = ['--blue-400', '--indigo-500', '--plum-500'];
// Depth buckets: radius and opacity for far / mid / near particles.
const DEPTH_R = [1.05, 1.6, 2.3];
const DEPTH_A = [0.26, 0.44, 0.66];

/** Which chapter each homepage section belongs to. */
const SECTION_CHAPTER: Record<string, number> = {
  top: 0,
  'social-proof': 0,
  demo: 1,
  positioning: 2,
  'how-it-works': 2,
  platform: 3,
  features: 3,
  workflows: 4,
  integrations: 4,
  industries: 4,
  channels: 5,
  analytics: 5,
  pricing: 6,
  contact: 6,
};

const COLOR_TOKENS = ['--blue-400', '--indigo-500', '--indigo-400', '--plum-500'];
// Neutral fallback (teal-grey) if a token can't be read.
const FALLBACK_RGB: [number, number, number] = [60, 110, 120];

/** Resolve a hex colour token (e.g. `--indigo-500`) to an RGB triplet for canvas drawing. */
function tokenRgb(name: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const m = raw.match(/^#([0-9a-f]{6})$/i);
  if (!m) return FALLBACK_RGB;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const frac = (x: number) => x - Math.floor(x);

function rotateY(v: Vec, a: number): Vec {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: v.x * c + v.z * s, y: v.y, z: -v.x * s + v.z * c };
}
function rotateX(v: Vec, a: number): Vec {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: v.x, y: v.y * c - v.z * s, z: v.y * s + v.z * c };
}

function buildFormations(count: number) {
  const rand = mulberry32(7);
  const seeds = Array.from({ length: count }, () => ({ a: rand(), b: rand(), c: rand(), d: rand() }));

  // Network nodes and their links (each node joins its two nearest neighbours).
  const NODE_COUNT = Math.min(64, Math.floor(count / 3));
  const nodes: Vec[] = Array.from({ length: NODE_COUNT }, () => {
    const ang = rand() * Math.PI * 2;
    const rad = Math.sqrt(rand());
    return { x: Math.cos(ang) * rad * 1.35, y: Math.sin(ang) * rad * 0.62, z: rand() * 1.6 - 0.8 };
  });
  const links: [number, number][] = [];
  nodes.forEach((n, i) => {
    const nearest = nodes
      .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter((e) => e.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2);
    nearest.forEach(({ j }) => {
      if (!links.some(([p, q]) => (p === j && q === i) || (p === i && q === j))) links.push([i, j]);
    });
  });

  const golden = Math.PI * (3 - Math.sqrt(5));

  // Awaken: a slowly turning three-arm spiral, like a galaxy forming.
  const core: Formation = (i, t, aspect) => {
    const s = seeds[i];
    const arm = i % 3;
    const r = 0.12 + Math.pow(s.a, 0.75) * Math.min(aspect, 1.6) * 0.78;
    const ang = arm * ((Math.PI * 2) / 3) + r * 3.4 + t * 0.07 + (s.b - 0.5) * (0.35 + r * 0.25);
    const p = { x: Math.cos(ang) * r, y: (s.c - 0.5) * 0.05, z: Math.sin(ang) * r };
    return rotateX(p, 1.15);
  };

  const wave: Formation = (i, t, aspect) => {
    const lines = 5;
    const k = i % lines;
    const u = (Math.floor(i / lines) / Math.ceil(count / lines)) * 2 - 1; // -1..1 along the line
    const x = u * aspect * 1.05;
    const envelope = Math.pow(Math.cos((u * Math.PI) / 2), 1.4);
    const y = Math.sin(u * 7 + t * 1.6 + k * 0.7) * 0.22 * envelope + (k - 2) * 0.045;
    return { x, y, z: (k - 2) * 0.25 };
  };

  const network: Formation = (i, t) => {
    const s = seeds[i];
    const n = nodes[i % NODE_COUNT];
    const isNode = i < NODE_COUNT;
    const spread = isNode ? 0 : 0.05 + s.a * 0.09;
    const ang = s.b * Math.PI * 2 + t * 0.3 * (s.c - 0.5);
    return {
      x: n.x + Math.cos(ang) * spread + Math.sin(t * 0.5 + i) * 0.01,
      y: n.y + Math.sin(ang) * spread + Math.cos(t * 0.4 + i) * 0.01,
      z: n.z,
    };
  };

  // Structure: stacked dot-grid slabs (the platform's layers), gently turning.
  const perLayer = Math.ceil(count / 5);
  const cols = Math.ceil(Math.sqrt(perLayer * 3));
  const rows = Math.ceil(perLayer / cols);
  const stack: Formation = (i, t, aspect) => {
    const k = i % 5;
    const j = Math.floor(i / 5);
    const u = ((j % cols) / Math.max(cols - 1, 1)) * 2 - 1;
    const v = (Math.floor(j / cols) / Math.max(rows - 1, 1)) * 2 - 1;
    // Kept flat (slab height ~0.22) so the five layers stay visibly separate (gap 0.3).
    const p = rotateY({ x: u * Math.min(aspect, 1.5) * 0.62, y: 0, z: v * 0.2 }, 0.06 + Math.sin(t * 0.18) * 0.05);
    const tilted = rotateX(p, 0.3);
    return { x: tilted.x, y: tilted.y + (k - 2) * 0.3 + Math.sin(t * 0.9 + k) * 0.012, z: tilted.z };
  };

  const stream: Formation = (i, t, aspect) => {
    const s = seeds[i];
    const lanes = 3;
    const k = i % lanes;
    const prog = frac(s.a + t * (0.05 + s.b * 0.03));
    const x = (prog * 2 - 1) * aspect * 1.15;
    const y = Math.sin(x * 1.3 + k * 0.9) * 0.22 + (k - 1) * 0.09 + (s.c - 0.5) * 0.035;
    return { x, y, z: (k - 1) * 0.35 };
  };

  const globe: Formation = (i, t) => {
    const y = 1 - (i / (count - 1)) * 2;
    const rr = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const p = { x: Math.cos(theta) * rr * 0.62, y: y * 0.62, z: Math.sin(theta) * rr * 0.62 };
    return rotateX(rotateY(p, t * 0.22), 0.35);
  };

  const halo: Formation = (i, t) => {
    const s = seeds[i];
    const ring = i % 5 !== 0;
    const ang = (i / count) * Math.PI * 2 * 3 + t * 0.1;
    const r = ring ? 0.66 + (s.a - 0.5) * 0.06 : s.a * 0.4;
    const p = { x: Math.cos(ang) * r * 1.25, y: ring ? 0 : (s.b - 0.5) * 0.2, z: Math.sin(ang) * r };
    return rotateX(p, 0.38);
  };

  return { formations: [core, wave, network, stack, stream, globe, halo], seeds, links };
}

export function StoryBackdrop() {
  const t = useCopy(copy);
  const namesRef = useRef(t.chapters);
  const chapterIdxRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chapterNumRef = useRef<HTMLSpanElement>(null);
  const chapterNameRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const lightRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Chapter names follow the site language without restarting the animation.
  useEffect(() => {
    namesRef.current = t.chapters;
    if (chapterNameRef.current) chapterNameRef.current.textContent = t.chapters[chapterIdxRef.current];
  }, [t.chapters]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = window.innerWidth < 768 ? 180 : 320;
    const { formations, seeds, links } = buildFormations(count);
    const COLORS = COLOR_TOKENS.map(tokenRgb);
    const linkRgb = tokenRgb('--indigo-500').join(',');

    let width = 0;
    let height = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Sections in page order, each tagged with its chapter.
    let sections: { top: number; height: number; chapter: number }[] = [];
    const measure = () => {
      sections = Object.entries(SECTION_CHAPTER)
        .map(([id, chapter]) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { top: r.top + window.scrollY, height: r.height, chapter };
        })
        .filter((s): s is { top: number; height: number; chapter: number } => s !== null)
        .sort((a, b) => a.top - b.top);
    };
    measure();

    const targetPhase = () => {
      if (!sections.length) return 0;
      const y = window.scrollY + height * 0.5;
      let idx = 0;
      for (let i = 0; i < sections.length; i++) if (sections[i].top <= y) idx = i;
      const cur = sections[idx];
      const next = sections[idx + 1];
      if (!next || next.chapter === cur.chapter) return cur.chapter;
      // Hand over to the next chapter during the last 45% of the section.
      const local = clamp01(((y - cur.top) / cur.height - 0.55) / 0.45);
      return cur.chapter + (next.chapter - cur.chapter) * easeInOut(local);
    };

    let phase = targetPhase();
    let lastChapter = -1;
    let scrollVel = 0;
    let lastScroll = window.scrollY;
    const prev = new Float32Array(count * 2).fill(NaN);
    const xs = new Float32Array(count);
    const ys = new Float32Array(count);
    const zs = new Float32Array(count);
    const buckets: number[][] = Array.from({ length: COLORS.length * 3 }, () => []);
    const start = performance.now();
    let raf = 0;

    const updateHud = (p: number) => {
      const chapter = Math.round(p);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${(p / (CHAPTERS.length - 1)).toFixed(4)})`;
      if (chapter === lastChapter) return;
      lastChapter = chapter;
      chapterIdxRef.current = chapter;
      if (chapterNumRef.current) chapterNumRef.current.textContent = String(chapter + 1).padStart(2, '0');
      if (chapterNameRef.current) chapterNameRef.current.textContent = namesRef.current[chapter];
    };

    const draw = (now: number) => {
      const t = reduced ? 0 : (now - start) / 1000;
      const goal = targetPhase();
      phase = reduced ? goal : phase + (goal - phase) * 0.06;

      const sy = window.scrollY;
      scrollVel += (sy - lastScroll - scrollVel) * 0.15;
      lastScroll = sy;

      const S = Math.min(width, height * 1.25) * 0.46;
      const aspect = width / (2 * S);
      const cx = width * 0.5;
      const cy = height * 0.52 - (reduced ? 0 : Math.max(-40, Math.min(40, scrollVel * 0.6)));

      const a = Math.min(Math.floor(phase), CHAPTERS.length - 2);
      const blend = phase - a;
      const fa = formations[a];
      const fb = formations[a + 1];

      ctx.clearRect(0, 0, width, height);

      // Chapter lighting lives in CSS layers; only their opacity changes (compositor-only).
      const la = CHAPTERS[a].light;
      const lb = CHAPTERS[a + 1].light;
      lightRefs.current.forEach((el, k) => {
        if (el) el.style.opacity = (la[k] + (lb[k] - la[k]) * blend).toFixed(3);
      });

      // Project every particle.
      for (let i = 0; i < count; i++) {
        const s = seeds[i];
        // Particles travel between formations slightly out of step, like a flock.
        const local = easeInOut(clamp01(blend * 1.5 - s.d * 0.5));
        const p = fa(i, t, aspect);
        const q = fb(i, t, aspect);
        const x = p.x + (q.x - p.x) * local;
        const y = p.y + (q.y - p.y) * local;
        const z = p.z + (q.z - p.z) * local;
        const persp = 1 / (1 + z * 0.35);
        xs[i] = cx + x * S * persp;
        ys[i] = cy + y * S * persp;
        zs[i] = z;
      }

      // Network links fade in around the "Understand" chapter.
      const linkAlpha = clamp01(1 - Math.abs(phase - 2) * 2.2);
      if (linkAlpha > 0.01) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(${linkRgb},${(0.16 * linkAlpha).toFixed(3)})`;
        ctx.beginPath();
        for (const [i, j] of links) {
          ctx.moveTo(xs[i], ys[i]);
          ctx.lineTo(xs[j], ys[j]);
        }
        ctx.stroke();
      }

      // Particles as short streaks from where they were last frame (a still particle is a
      // zero-length streak, which a round cap draws as a dot). Batched into one path per
      // colour x depth bucket so a frame is ~12 draw calls, not hundreds.
      for (const bucket of buckets) bucket.length = 0;
      for (let i = 0; i < count; i++) {
        const depth = Math.min(2, Math.floor(clamp01((1 - zs[i]) / 2) * 3));
        const col = Math.min(COLORS.length - 1, Math.floor(clamp01((xs[i] / width) * 0.8 + seeds[i].c * 0.2) * COLORS.length));
        buckets[col * 3 + depth].push(i);
      }
      ctx.lineCap = 'round';
      buckets.forEach((members, b) => {
        if (!members.length) return;
        const col = COLORS[Math.floor(b / 3)];
        const depth = b % 3;
        ctx.beginPath();
        for (const i of members) {
          const px = prev[i * 2];
          const py = prev[i * 2 + 1];
          const moved = Number.isNaN(px) ? 0 : Math.hypot(xs[i] - px, ys[i] - py);
          if (!reduced && moved > 1.2 && moved < 160) ctx.moveTo(px, py);
          else ctx.moveTo(xs[i], ys[i] - 0.01);
          ctx.lineTo(xs[i], ys[i]);
        }
        // Nearest particles get a soft halo, same path drawn wider and fainter.
        if (depth === 2) {
          ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},0.09)`;
          ctx.lineWidth = DEPTH_R[depth] * 6;
          ctx.stroke();
        }
        ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${DEPTH_A[depth]})`;
        ctx.lineWidth = DEPTH_R[depth] * 2;
        ctx.stroke();
      });
      for (let i = 0; i < count; i++) {
        prev[i * 2] = xs[i];
        prev[i * 2 + 1] = ys[i];
      }

      updateHud(phase);
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const redrawStill = () => requestAnimationFrame(draw);
    const onResize = () => {
      resize();
      measure();
      prev.fill(NaN);
      if (reduced) redrawStill();
    };
    // Section heights change as images load and content reveals; re-measure lazily.
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', onResize);
    if (reduced) window.addEventListener('scroll', redrawStill, { passive: true });

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', redrawStill);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
        {LIGHTS.map((token, k) => (
          <div
            key={token}
            ref={(el) => {
              lightRefs.current[k] = el;
            }}
            className="absolute inset-0"
            style={{ opacity: 0, background: `radial-gradient(60% 55% at 50% 52%, color-mix(in srgb, var(${token}) 11%, transparent), transparent 70%)` }}
          />
        ))}
        <canvas ref={canvasRef} className="relative h-full w-full" />
      </div>
      {/* Chapter marker (wide screens only, decorative) */}
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-6 start-6 z-40 hidden items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-white/80 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] shadow-xs backdrop-blur xl:flex"
      >
        <span ref={chapterNumRef} className="font-semibold text-[var(--indigo-500)]">
          01
        </span>
        <span className="relative h-px w-16 overflow-hidden bg-[var(--indigo-100)]">
          <span ref={progressRef} className="absolute inset-0 origin-left bg-[var(--indigo-400)] rtl:origin-right" style={{ transform: 'scaleX(0)' }} />
        </span>
        {/* Text is written by the animation loop (and the locale effect), not by React */}
        <span ref={chapterNameRef} className="text-[var(--text-secondary)]" />
      </div>
    </>
  );
}
