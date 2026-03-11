'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playlist } from '@/data/playlist';
import { useWindowStore } from '@/stores/windowStore';
import { useMusicStore, getWidget, formatTime } from '@/stores/musicStore';
import { WINDOW_META } from '@/lib/constants';

const COMPACT_HEIGHT = 260;

export default function MusicWindow() {
  const [showPlaylist, setShowPlaylist] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);

  const currentIndex = useMusicStore((s) => s.currentIndex);
  const isPlaying = useMusicStore((s) => s.isPlaying);
  const currentTime = useMusicStore((s) => s.currentTime);
  const duration = useMusicStore((s) => s.duration);
  const volume = useMusicStore((s) => s.volume);

  const updateSize = useWindowStore((s) => s.updateSize);

  const track = playlist[currentIndex];

  const togglePlaylist = useCallback(() => {
    const next = !showPlaylist;
    setShowPlaylist(next);
    requestAnimationFrame(() => {
      const fullH = WINDOW_META.music.defaultSize.height;
      updateSize('music', {
        width: WINDOW_META.music.defaultSize.width,
        height: next ? fullH : COMPACT_HEIGHT,
      });
    });
  }, [showPlaylist, updateSize]);

  const togglePlay = useCallback(() => {
    getWidget()?.toggle();
  }, []);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const w = getWidget();
    const bar = progressRef.current;
    if (!w || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetMs = ratio * duration;

    useMusicStore.getState().setCurrentTime(targetMs);
    w.seekTo(targetMs);
  }, [duration]);

  const changeVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    useMusicStore.getState().setVolume(v);
    getWidget()?.setVolume(v);
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Now Playing */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/30 to-secondary/30 text-2xl">
          {isPlaying ? '♫' : '♪'}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-text/90">{track.title}</p>
          <p className="truncate text-sm text-text/40">{track.artist}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div
          ref={progressRef}
          className="group relative h-1.5 cursor-pointer rounded-full bg-surface/30"
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
        <div className="flex justify-between text-[11px] text-text/40">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between">
        {/* Volume */}
        <div className="flex w-24 items-center gap-2">
          <svg className="shrink-0 text-text/45" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.14v7.72A4.5 4.5 0 0016.5 12z" />
          </svg>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={changeVolume}
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-surface/30 accent-accent [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
          />
        </div>

        {/* Playback controls */}
        <div className="flex items-center gap-5">
          <button onClick={() => useMusicStore.getState().prevTrack()} className="text-text/50 transition-colors hover:text-text/80">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/20 text-accent transition-colors hover:bg-accent/30"
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

          <button onClick={() => useMusicStore.getState().nextTrack()} className="text-text/50 transition-colors hover:text-text/80">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6z" />
            </svg>
          </button>
        </div>

        {/* Playlist toggle */}
        <button
          onClick={togglePlaylist}
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
            showPlaylist ? 'bg-accent/20 text-accent' : 'text-text/40 hover:text-text/70'
          }`}
          title="Toggle playlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
          </svg>
        </button>
      </div>

      {/* Playlist (collapsible) */}
      <AnimatePresence initial={false}>
        {showPlaylist && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="min-h-0 overflow-hidden"
          >
            <div className="window-scroll max-h-[240px] space-y-1 overflow-y-auto border-t border-surface/30 pt-3">
              {playlist.map((t, i) => (
                <button
                  key={t.trackUrl}
                  onClick={() => useMusicStore.getState().setCurrentIndex(i)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                    i === currentIndex
                      ? 'bg-accent/15 text-accent'
                      : 'text-text/60 hover:bg-surface/30 hover:text-text/80'
                  }`}
                >
                  <span className="w-5 text-center text-xs text-text/40">
                    {i === currentIndex && isPlaying ? '▶' : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{t.title}</p>
                    <p className="truncate text-xs text-text/45">{t.artist}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
