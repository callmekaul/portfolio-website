'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { playlist } from '@/data/playlist';

/* ------------------------------------------------------------------ */
/*  YouTube IFrame API types (minimal)                                 */
/* ------------------------------------------------------------------ */
interface YTPlayer {
  loadVideoById: (videoId: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}

interface YTPlayerEvent {
  data: number;
  target: YTPlayer;
}

/* Player state constants */
const YT_UNSTARTED = -1;
const YT_ENDED = 0;
const YT_PLAYING = 1;
const YT_PAUSED = 2;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function formatTime(seconds: number) {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Load the YT IFrame API script once globally */
function ensureYTApi(): Promise<void> {
  return new Promise((resolve) => {
    if ((window as unknown as Record<string, unknown>).YT &&
        (window as unknown as Record<string, unknown>).YTReady) {
      resolve();
      return;
    }

    // If script tag already exists, wait for callback
    if (document.getElementById('yt-iframe-api')) {
      const check = setInterval(() => {
        if ((window as unknown as Record<string, unknown>).YTReady) {
          clearInterval(check);
          resolve();
        }
      }, 50);
      return;
    }

    (window as unknown as Record<string, () => void>).onYouTubeIframeAPIReady = () => {
      (window as unknown as Record<string, boolean>).YTReady = true;
      resolve();
    };

    const tag = document.createElement('script');
    tag.id = 'yt-iframe-api';
    tag.src = 'https://www.youtube.com/iframe_api';
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

  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pendingIndex = useRef<number | null>(null);

  const track = playlist[currentIndex];

  /* ---- Tick: poll current time from YT player ---- */
  const startTick = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      setCurrentTime(p.getCurrentTime());
      const d = p.getDuration();
      if (d > 0) setDuration(d);
    }, 250);
  }, []);

  const stopTick = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /* ---- Initialize YT player ---- */
  useEffect(() => {
    let destroyed = false;

    ensureYTApi().then(() => {
      if (destroyed || !containerRef.current) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const YT = (window as any).YT;

      const player: YTPlayer = new YT.Player(containerRef.current, {
        height: '0',
        width: '0',
        videoId: playlist[0].videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            playerRef.current = player;
            setReady(true);
            // If a track was selected before ready
            if (pendingIndex.current !== null) {
              player.loadVideoById(playlist[pendingIndex.current].videoId);
              pendingIndex.current = null;
            }
          },
          onStateChange: (e: YTPlayerEvent) => {
            if (e.data === YT_PLAYING) {
              setIsPlaying(true);
              startTick();
            } else if (e.data === YT_PAUSED) {
              setIsPlaying(false);
              stopTick();
            } else if (e.data === YT_ENDED) {
              setIsPlaying(false);
              stopTick();
              // Auto-advance
              setCurrentIndex((i) => (i + 1) % playlist.length);
            } else if (e.data === YT_UNSTARTED) {
              setIsPlaying(false);
            }
          },
        },
      });
    });

    return () => {
      destroyed = true;
      stopTick();
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---- Load new video when track changes ---- */
  useEffect(() => {
    const p = playerRef.current;
    if (!p || !ready) {
      pendingIndex.current = currentIndex;
      return;
    }
    setCurrentTime(0);
    setDuration(0);
    p.loadVideoById(track.videoId);
  }, [currentIndex, track.videoId, ready]);

  /* ---- Controls ---- */
  const togglePlay = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (isPlaying) {
      p.pauseVideo();
    } else {
      p.playVideo();
    }
  }, [isPlaying]);

  const prevTrack = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % playlist.length);
  }, []);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const p = playerRef.current;
    const bar = progressRef.current;
    if (!p || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    p.seekTo(ratio * duration, true);
    setCurrentTime(ratio * duration);
  }, [duration]);

  const selectTrack = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex h-full flex-col gap-5">
      {/* Hidden YT player container */}
      <div className="absolute h-0 w-0 overflow-hidden">
        <div ref={containerRef} />
      </div>

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

      {/* Playlist */}
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent/40">
          Playlist
        </p>
        <div className="space-y-1">
          {playlist.map((t, i) => (
            <button
              key={t.videoId}
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
