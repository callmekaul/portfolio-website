'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { playlist } from '@/data/playlist';

/* ------------------------------------------------------------------ */
/*  SoundCloud Widget API types (minimal)                              */
/* ------------------------------------------------------------------ */
interface SCWidget {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seekTo: (ms: number) => void;
  getPosition: (cb: (pos: number) => void) => void;
  getDuration: (cb: (dur: number) => void) => void;
  setVolume: (volume: number) => void;
  getVolume: (cb: (volume: number) => void) => void;
  isPaused: (cb: (paused: boolean) => void) => void;
  load: (url: string, options: Record<string, unknown>) => void;
  bind: (event: string, cb: (...args: unknown[]) => void) => void;
  unbind: (event: string) => void;
}

interface SCWidgetEvents {
  READY: string;
  PLAY: string;
  PAUSE: string;
  FINISH: string;
  PLAY_PROGRESS: string;
}

interface SCWidgetConstructor {
  (el: HTMLIFrameElement): SCWidget;
  Events: SCWidgetEvents;
}

declare global {
  interface Window {
    SC?: { Widget: SCWidgetConstructor };
  }
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function formatTime(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  if (!isFinite(totalSec) || totalSec < 0) return '0:00';
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function ensureSCApi(): Promise<void> {
  return new Promise((resolve) => {
    if (window.SC?.Widget) {
      resolve();
      return;
    }

    if (document.getElementById('sc-widget-api')) {
      const check = setInterval(() => {
        if (window.SC?.Widget) {
          clearInterval(check);
          resolve();
        }
      }, 50);
      return;
    }

    const tag = document.createElement('script');
    tag.id = 'sc-widget-api';
    tag.src = 'https://w.soundcloud.com/player/api.js';
    tag.onload = () => {
      const check = setInterval(() => {
        if (window.SC?.Widget) {
          clearInterval(check);
          resolve();
        }
      }, 50);
    };
    document.head.appendChild(tag);
  });
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function MusicWindow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [volume, setVolume] = useState(10);
  const [isSeeking, setIsSeeking] = useState(false);

  const widgetRef = useRef<SCWidget | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<SCWidgetEvents | null>(null);
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  const track = playlist[currentIndex];

  /** Bind all playback events to the widget. Called after every load(). */
  const bindEvents = useCallback((widget: SCWidget, events: SCWidgetEvents) => {
    widget.bind(events.PLAY, () => {
      setIsPlaying(true);
      widget.getDuration((d: number) => setDuration(d));
      widget.getVolume((v: number) => {
        if (v !== volume) widget.setVolume(volume);
      });
    });

    widget.bind(events.PAUSE, () => setIsPlaying(false));

    widget.bind(events.FINISH, () => {
      setIsPlaying(false);
      setCurrentIndex((i) => (i + 1) % playlist.length);
    });

    widget.bind(events.PLAY_PROGRESS, (data: unknown) => {
      const d = data as { currentPosition: number };
      setIsSeeking((seeking) => {
        if (!seeking) setCurrentTime(d.currentPosition);
        return seeking;
      });
    });
  }, []);

  /* ---- Initialize SC widget ---- */
  useEffect(() => {
    let destroyed = false;

    ensureSCApi().then(() => {
      if (destroyed || !iframeRef.current || !window.SC) return;

      const widget = window.SC.Widget(iframeRef.current);
      const events = window.SC.Widget.Events;
      widgetRef.current = widget;
      eventsRef.current = events;

      widget.bind(events.READY, () => {
        if (destroyed) return;
        setReady(true);
        bindEvents(widget, events);
      });
    });

    return () => {
      destroyed = true;
      widgetRef.current = null;
    };
  }, [bindEvents]);

  /* ---- Load new track when index changes ---- */
  useEffect(() => {
    const w = widgetRef.current;
    const events = eventsRef.current;
    if (!w || !events || !ready) return;

    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    w.load(track.trackUrl, {
      auto_play: true,
      show_artwork: false,
      callback: () => {
        bindEvents(w, events);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, ready]);

  /* ---- Controls ---- */
  const togglePlay = useCallback(() => {
    widgetRef.current?.toggle();
  }, []);

  const prevTrack = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % playlist.length);
  }, []);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const w = widgetRef.current;
    const bar = progressRef.current;
    if (!w || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetMs = ratio * duration;

    setIsSeeking(true);
    setCurrentTime(targetMs);
    w.seekTo(targetMs);

    // Wait for SC to actually seek, then unlock progress updates
    setTimeout(() => {
      w.getPosition((pos: number) => {
        setCurrentTime(pos);
        setIsSeeking(false);
      });
    }, 300);
  }, [duration]);

  const changeVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    widgetRef.current?.setVolume(v);
  }, []);

  const selectTrack = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(playlist[0].trackUrl)}&auto_play=false&show_artwork=false&show_playcount=false&show_user=false&buying=false&sharing=false&download=false&color=%2322d3ee`;

  return (
    <div className="flex h-full flex-col gap-5">
      {/* Hidden SC widget iframe */}
      <iframe
        ref={iframeRef}
        className="absolute h-0 w-0 overflow-hidden"
        src={embedUrl}
        allow="autoplay"
        tabIndex={-1}
      />

      {/* Now Playing */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/30 to-secondary/30 text-2xl">
          {isPlaying ? '♫' : '♪'}
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-text/90">{track.title}</p>
          <p className="truncate text-sm text-text/40">{track.artist}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div
          ref={progressRef}
          className="group relative h-1.5 cursor-pointer rounded-full bg-surface/[0.08]"
          onClick={seek}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-accent/70 transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-accent opacity-0 shadow-md transition-opacity group-hover:opacity-100"
            style={{ left: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-text/25">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button onClick={prevTrack} className="text-text/40 transition-colors hover:text-text/70">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        <button
          onClick={togglePlay}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent transition-colors hover:bg-accent/30"
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6zm8-14v14h4V5z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button onClick={nextTrack} className="text-text/40 transition-colors hover:text-text/70">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6z" />
          </svg>
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3">
        <svg className="shrink-0 text-text/30" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.14v7.72A4.5 4.5 0 0016.5 12z" />
        </svg>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={changeVolume}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-surface/[0.08] accent-accent [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
        />
        <svg className="shrink-0 text-text/30" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.14v7.72A4.5 4.5 0 0016.5 12zM14 3.23v2.06a8 8 0 010 13.42v2.06A10 10 0 0014 3.23z" />
        </svg>
      </div>

      {/* Playlist */}
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent/40">
          Playlist
        </p>
        <div className="space-y-1">
          {playlist.map((t, i) => (
            <button
              key={t.trackUrl}
              onClick={() => selectTrack(i)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                i === currentIndex
                  ? 'bg-accent/[0.08] text-accent/80'
                  : 'text-text/50 hover:bg-surface/[0.05] hover:text-text/70'
              }`}
            >
              <span className="w-5 text-center text-xs text-text/25">
                {i === currentIndex && isPlaying ? '▶' : i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{t.title}</p>
                <p className="truncate text-xs text-text/30">{t.artist}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
