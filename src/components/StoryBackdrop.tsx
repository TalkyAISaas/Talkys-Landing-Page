'use client';

import { useEffect, useRef } from 'react';
import { useCopy } from '@/i18n/LocaleContext';

/**
 * Cinematic homepage backdrop. One field of light particles tells the Talkys story as the
 * page scrolls: it says hello as a chat bubble with typing dots, listens as a radial
 * equalizer, converses as two chat bubbles, builds itself into a turning cube, acts as a
 * flowing double helix, reaches everywhere as a torus and settles into a checkmark. Each chapter is tied to the section on screen; the particles
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
  en: { chapters: ['Hello', 'Listen', 'Converse', 'Build', 'Act', 'Everywhere', 'Done'] },
  ar: { chapters: ['مرحباً', 'إصغاء', 'حوار', 'بناء', 'تنفيذ', 'في كل مكان', 'تمّ'] },
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

type Pt = [number, number];

/** Arc-length sampler over a polyline: u in 0..1 maps evenly along its length. */
function polyline(points: Pt[], closed: boolean) {
  const pts = closed ? [...points, points[0]] : points;
  const cum = [0];
  for (let k = 1; k < pts.length; k++) cum.push(cum[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
  const total = cum[cum.length - 1];
  return (u: number): Pt => {
    const d = frac(u) * total;
    let k = 1;
    while (k < cum.length - 1 && cum[k] < d) k++;
    const f = (d - cum[k - 1]) / (cum[k] - cum[k - 1] || 1);
    return [pts[k - 1][0] + (pts[k][0] - pts[k - 1][0]) * f, pts[k - 1][1] + (pts[k][1] - pts[k - 1][1]) * f];
  };
}

/** Outline of a chat bubble: a rounded rectangle with a tail on its bottom edge (y grows downward). */
function bubbleOutline(hw: number, hh: number, radius: number, tailSide: 1 | -1): Pt[] {
  const pts: Pt[] = [];
  const corner = (cx: number, cy: number, from: number) => {
    for (let k = 0; k <= 6; k++) {
      const ang = from + (k / 6) * (Math.PI / 2);
      pts.push([cx + Math.cos(ang) * radius, cy + Math.sin(ang) * radius]);
    }
  };
  corner(hw - radius, hh - radius, 0); // bottom-right, then along the bottom edge leftwards
  const tx = tailSide * hw * 0.45;
  pts.push([tx + 0.13, hh], [tx + tailSide * 0.1, hh + 0.24], [tx - 0.13, hh]);
  corner(-hw + radius, hh - radius, Math.PI / 2); // bottom-left
  corner(-hw + radius, -hh + radius, Math.PI); // top-left
  corner(hw - radius, -hh + radius, (Math.PI * 3) / 2); // top-right
  return pts;
}

/** The twelve edges of an axis-aligned cube with half-size `h`. */
function cubeEdges(h: number): [Vec, Vec][] {
  const v = (x: number, y: number, z: number): Vec => ({ x: x * h, y: y * h, z: z * h });
  const edges: [Vec, Vec][] = [];
  for (const a of [-1, 1]) {
    for (const b of [-1, 1]) {
      edges.push([v(-1, a, b), v(1, a, b)], [v(a, -1, b), v(a, 1, b)], [v(a, b, -1), v(a, b, 1)]);
    }
  }
  return edges;
}

function buildFormations(count: number) {
  const rand = mulberry32(7);
  const seeds = Array.from({ length: count }, () => ({ a: rand(), b: rand(), c: rand(), d: rand() }));
  const golden = Math.PI * (3 - Math.sqrt(5));

  // Hello: one chat bubble, particles drifting along its outline, typing dots bobbing inside.
  const bigBubble = polyline(bubbleOutline(0.78, 0.44, 0.24, -1), true);
  const hello: Formation = (i, t) => {
    const s = seeds[i];
    let p: Vec;
    if (i % 4 === 0) {
      const k = Math.floor(i / 4) % 3;
      const ang = s.a * Math.PI * 2;
      const r = Math.sqrt(s.b) * 0.055;
      const bob = Math.max(0, Math.sin(t * 4 - k * 0.9)) * 0.07;
      p = { x: (k - 1) * 0.26 + Math.cos(ang) * r, y: -bob + Math.sin(ang) * r, z: (s.c - 0.5) * 0.06 };
    } else {
      const [x, y] = bigBubble(i / count + t * 0.015);
      p = { x: x + (s.b - 0.5) * 0.025, y: y + (s.c - 0.5) * 0.025, z: (s.a - 0.5) * 0.08 };
    }
    return rotateX(rotateY(p, Math.sin(t * 0.3) * 0.35), 0.12);
  };

  // Listen: a radial equalizer, its spokes pulsing like a voice.
  const SPOKES = 56;
  const perSpoke = Math.ceil(count / SPOKES);
  const listen: Formation = (i, t) => {
    const k = i % SPOKES;
    const m = Math.floor(i / SPOKES) / Math.max(perSpoke - 1, 1);
    const level = Math.abs(Math.sin(t * 2.3 + k * 0.55) * Math.sin(t * 1.1 + k * 0.21));
    const r = 0.3 + m * (0.06 + level * 0.36);
    const ang = (k / SPOKES) * Math.PI * 2 + t * 0.05;
    return rotateX({ x: Math.cos(ang) * r, y: Math.sin(ang) * r, z: 0 }, 0.25);
  };

  // Converse: two chat bubbles, customer and agent, floating opposite each other.
  const leftBubble = polyline(bubbleOutline(0.42, 0.24, 0.14, -1), true);
  const rightBubble = polyline(bubbleOutline(0.42, 0.24, 0.14, 1), true);
  const half = Math.ceil(count / 2);
  const converse: Formation = (i, t) => {
    const s = seeds[i];
    const side = i % 2;
    const [x, y] = (side ? rightBubble : leftBubble)(Math.floor(i / 2) / half + t * 0.02);
    const float = Math.sin(t * 0.8 + side * Math.PI) * 0.03;
    return {
      x: x + (side ? 0.4 : -0.4) + (s.b - 0.5) * 0.02,
      y: y + (side ? 0.2 : -0.22) + float + (s.c - 0.5) * 0.02,
      z: (side ? 0.15 : -0.15) + (s.a - 0.5) * 0.05,
    };
  };

  // Build: a wireframe cube with a smaller one turning the other way inside it.
  const edges = [...cubeEdges(0.46), ...cubeEdges(0.22)];
  const perEdge = Math.ceil(count / edges.length);
  const build: Formation = (i, t) => {
    const e = i % edges.length;
    const u = Math.floor(i / edges.length) / Math.max(perEdge - 1, 1);
    const [p0, p1] = edges[e];
    const p = { x: p0.x + (p1.x - p0.x) * u, y: p0.y + (p1.y - p0.y) * u, z: p0.z + (p1.z - p0.z) * u };
    const spin = e >= 12 ? -1 : 1;
    return rotateX(rotateY(p, spin * t * 0.25 + 0.6), 0.55);
  };

  // Act: a double helix of data flowing across the screen, with rungs between the strands.
  const act: Formation = (i, t, aspect) => {
    const s = seeds[i];
    const x = (frac(s.a + t * 0.035) * 2 - 1) * aspect * 1.1;
    const ang = x * 3.4 + t * 1.1;
    const k = i % 6 === 0 ? s.b * 2 - 1 : i % 2 ? 1 : -1;
    return { x, y: Math.cos(ang) * 0.24 * k, z: Math.sin(ang) * 0.22 * k };
  };

  // Everywhere: a turning torus.
  const everywhere: Formation = (i, t) => {
    const theta = (i / count) * Math.PI * 2;
    const phi = i * golden;
    const ring = 0.5 + 0.19 * Math.cos(phi);
    const p = { x: ring * Math.cos(theta), y: 0.19 * Math.sin(phi), z: ring * Math.sin(theta) };
    return rotateX(rotateY(p, t * 0.22), 1.05);
  };

  // Done: a ring with a checkmark inside it.
  const check = polyline([[-0.28, 0], [-0.08, 0.2], [0.3, -0.2]], false);
  const third = Math.ceil(count / 3);
  const done: Formation = (i, t) => {
    const s = seeds[i];
    let p: Vec;
    if (i % 3 === 0) {
      const [x, y] = check(Math.floor(i / 3) / third);
      p = { x: x + (s.b - 0.5) * 0.03, y: y + (s.c - 0.5) * 0.03, z: 0 };
    } else {
      const ang = (i / count) * Math.PI * 2 + t * 0.08;
      const r = 0.6 + (s.a - 0.5) * 0.05;
      p = { x: Math.cos(ang) * r, y: Math.sin(ang) * r, z: (s.b - 0.5) * 0.05 };
    }
    return rotateY(p, Math.sin(t * 0.35) * 0.3);
  };

  return { formations: [hello, listen, converse, build, act, everywhere, done], seeds };
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
    const { formations, seeds } = buildFormations(count);
    const COLORS = COLOR_TOKENS.map(tokenRgb);

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
