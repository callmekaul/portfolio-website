'use client';

import { useEffect, useRef } from 'react';
import { useThemeStore } from '@/stores/themeStore';

/* ── Matrix Rain ─────────────────────────────────────────── */
function MatrixWallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    const fontSize = 14;
    let columns: number;
    let drops: number[];
    let lastTime = 0;
    const frameInterval = 50; // ms between frames (~20fps)

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -100);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw(time: number) {
      raf = requestAnimationFrame(draw);

      if (time - lastTime < frameInterval) return;
      lastTime = time;

      // Read accent color every frame so theme changes apply immediately
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-accent').trim() || '#22d3ee';

      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = accent;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.globalAlpha = 0.15 + Math.random() * 0.25;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.4 + Math.random() * 0.35;
      }

      ctx.globalAlpha = 1;
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />;
}

/* ── Pixel Clouds ────────────────────────────────────────── */
function CloudsWallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const pixelSize = 6;
    const cloudCount = 8;

    interface Cloud {
      x: number;
      y: number;
      speed: number;
      pixels: { dx: number; dy: number; opacity: number }[];
    }

    function makeCloud(): Cloud {
      const pixels: Cloud['pixels'] = [];
      const w = 8 + Math.floor(Math.random() * 12);
      const h = 3 + Math.floor(Math.random() * 4);

      for (let cy = 0; cy < h; cy++) {
        for (let cx = 0; cx < w; cx++) {
          const distFromCenter = Math.abs(cx - w / 2) / (w / 2) + Math.abs(cy - h / 2) / (h / 2);
          if (distFromCenter < 0.9 + Math.random() * 0.4) {
            pixels.push({ dx: cx, dy: cy, opacity: 0.03 + Math.random() * 0.06 });
          }
        }
      }

      return {
        x: Math.random() * (canvas.width + 200) - 100,
        y: 30 + Math.random() * (canvas.height * 0.6),
        speed: 0.15 + Math.random() * 0.3,
        pixels,
      };
    }

    let clouds: Cloud[] = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      clouds = Array.from({ length: cloudCount }, makeCloud);
    }

    resize();
    window.addEventListener('resize', resize);

    const surface = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim() || '#ffffff';

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const cloud of clouds) {
        for (const p of cloud.pixels) {
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = surface;
          ctx.fillRect(
            cloud.x + p.dx * pixelSize,
            cloud.y + p.dy * pixelSize,
            pixelSize - 1,
            pixelSize - 1
          );
        }

        cloud.x -= cloud.speed;
        if (cloud.x + 200 < 0) {
          cloud.x = canvas.width + 50;
          cloud.y = 30 + Math.random() * (canvas.height * 0.6);
        }
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

/* ── Stars (CSS) ─────────────────────────────────────────── */
function StarsWallpaper() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className={`star star-${i + 1}`} />
      ))}
    </div>
  );
}

/* ── Aurora (CSS) ────────────────────────────────────────── */
function AuroraWallpaper() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="aurora-band aurora-band-1" />
      <div className="aurora-band aurora-band-2" />
    </div>
  );
}

/* ── Grid with cursor shine ──────────────────────────────── */
function GridWallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const gap = 60;
    const shineRadius = 250;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    function handleMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener('mousemove', handleMove);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-accent').trim() || '#22d3ee';
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gap) {
        const dist = Math.abs(x - mx);
        const proximity = Math.max(0, 1 - dist / shineRadius);
        const alpha = 0.03 + proximity * 0.25;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = proximity > 0.01 ? accent : 'rgba(255,255,255,1)';
        ctx.globalAlpha = alpha;
        ctx.lineWidth = proximity > 0.3 ? 1.5 : 1;
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gap) {
        const dist = Math.abs(y - my);
        const proximity = Math.max(0, 1 - dist / shineRadius);
        const alpha = 0.03 + proximity * 0.25;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = proximity > 0.01 ? accent : 'rgba(255,255,255,1)';
        ctx.globalAlpha = alpha;
        ctx.lineWidth = proximity > 0.3 ? 1.5 : 1;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

/* ── Main Wallpaper Switch ───────────────────────────────── */
export default function Wallpaper() {
  const wallpaper = useThemeStore((s) => s.wallpaper);

  switch (wallpaper) {
    case 'matrix':
      return <MatrixWallpaper />;
    case 'clouds':
      return <CloudsWallpaper />;
    case 'stars':
      return <StarsWallpaper />;
    case 'aurora':
      return <AuroraWallpaper />;
    case 'grid':
      return <GridWallpaper />;
    case 'none':
    default:
      return null;
  }
}
