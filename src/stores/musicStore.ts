import { create } from 'zustand';
import { playlist } from '@/data/playlist';

/* ------------------------------------------------------------------ */
/*  SoundCloud Widget API types                                        */
/* ------------------------------------------------------------------ */
export interface SCWidget {
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

export interface SCWidgetEvents {
  READY: string;
  PLAY: string;
  PAUSE: string;
  FINISH: string;
  PLAY_PROGRESS: string;
}

export interface SCWidgetConstructor {
  (el: HTMLIFrameElement): SCWidget;
  Events: SCWidgetEvents;
}

declare global {
  interface Window {
    SC?: { Widget: SCWidgetConstructor };
  }
}

/* ------------------------------------------------------------------ */
/*  Store                                                              */
/* ------------------------------------------------------------------ */
interface MusicState {
  currentIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  ready: boolean;

  setCurrentIndex: (i: number) => void;
  setIsPlaying: (v: boolean) => void;
  setCurrentTime: (t: number) => void;
  setDuration: (d: number) => void;
  setVolume: (v: number) => void;
  setReady: (v: boolean) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  currentIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 10,
  ready: false,

  setCurrentIndex: (i) => set({ currentIndex: i, currentTime: 0, duration: 0, isPlaying: false }),
  setIsPlaying: (v) => set({ isPlaying: v }),
  setCurrentTime: (t) => set({ currentTime: t }),
  setDuration: (d) => set({ duration: d }),
  setVolume: (v) => set({ volume: v }),
  setReady: (v) => set({ ready: v }),
  nextTrack: () => set((s) => ({ currentIndex: (s.currentIndex + 1) % playlist.length, currentTime: 0, duration: 0, isPlaying: false })),
  prevTrack: () => set((s) => ({ currentIndex: (s.currentIndex - 1 + playlist.length) % playlist.length, currentTime: 0, duration: 0, isPlaying: false })),
}));

/* ------------------------------------------------------------------ */
/*  Singleton widget ref (not in store to avoid serialization issues)  */
/* ------------------------------------------------------------------ */
let _widget: SCWidget | null = null;
let _events: SCWidgetEvents | null = null;

export function setWidget(w: SCWidget | null, e: SCWidgetEvents | null) {
  _widget = w;
  _events = e;
}
export function getWidget() { return _widget; }
export function getWidgetEvents() { return _events; }

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
export function ensureSCApi(): Promise<void> {
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

export function formatTime(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  if (!isFinite(totalSec) || totalSec < 0) return '0:00';
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
