'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import { useMusicStore } from '@/stores/musicStore';
import { playlist } from '@/data/playlist';
import { WINDOW_IDS, WINDOW_META } from '@/lib/constants';

function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}

function StartMenu({ onClose, startBtnRef }: { onClose: () => void; startBtnRef: React.RefObject<HTMLButtonElement | null> }) {
  const openWindow = useWindowStore((s) => s.openWindow);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        startBtnRef.current && !startBtnRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('pointerdown', handleClick);
    return () => document.removeEventListener('pointerdown', handleClick);
  }, [onClose, startBtnRef]);

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className="absolute bottom-14 left-3 z-[10000] w-56 rounded-xl border border-surface/50 bg-panel p-2 shadow-lg shadow-black/40"
    >
      {WINDOW_IDS.map((id) => {
        const meta = WINDOW_META[id];
        return (
          <button
            key={id}
            onClick={() => {
              openWindow(id);
              onClose();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text/70 transition-colors hover:bg-surface hover:text-text/90"
          >
            <span className="text-base">{meta.icon}</span>
            <span>{meta.title}</span>
          </button>
        );
      })}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Taskbar                                                            */
/* ------------------------------------------------------------------ */
export default function Taskbar() {
  const windows = useWindowStore((s) => s.windows);
  const openWindow = useWindowStore((s) => s.openWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const topZIndex = useWindowStore((s) => s.topZIndex);
  const currentIndex = useMusicStore((s) => s.currentIndex);
  const isPlaying = useMusicStore((s) => s.isPlaying);
  const [startOpen, setStartOpen] = useState(false);
  const startBtnRef = useRef<HTMLButtonElement>(null);
  const track = playlist[currentIndex];

  const musicWin = windows.music;
  const musicVisible = musicWin.isOpen && !musicWin.isMinimized;

  // Filter music out of regular taskbar tabs — it lives in the right section
  const openWindows = WINDOW_IDS.filter((id) => id !== 'music' && windows[id].isOpen);

  const handleMusicClick = () => {
    if (!musicWin.isOpen) {
      openWindow('music');
    } else if (musicWin.isMinimized) {
      restoreWindow('music');
    } else if (musicWin.zIndex === topZIndex) {
      minimizeWindow('music');
    } else {
      focusWindow('music');
    }
  };

  return (
    <>
      <AnimatePresence>
        {startOpen && <StartMenu onClose={() => setStartOpen(false)} startBtnRef={startBtnRef} />}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 z-[9999] flex h-12 items-center border-t border-surface/50 bg-panel px-4">
        {/* Start button */}
        <button
          ref={startBtnRef}
          onClick={() => setStartOpen((prev) => !prev)}
          className={`mr-2 flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
            startOpen
              ? 'bg-accent/20 text-accent'
              : 'text-text/50 hover:bg-surface hover:text-text/70'
          }`}
          aria-label="Start menu"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="1" width="6" height="6" rx="1" />
            <rect x="9" y="1" width="6" height="6" rx="1" />
            <rect x="1" y="9" width="6" height="6" rx="1" />
            <rect x="9" y="9" width="6" height="6" rx="1" />
          </svg>
        </button>

        {/* Open window tabs */}
        <div className="flex items-center gap-1">
          <AnimatePresence mode="popLayout">
            {openWindows.map((id) => {
              const meta = WINDOW_META[id];
              const isMinimized = windows[id].isMinimized;

              return (
                <motion.button
                  key={id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: 'auto' }}
                  exit={{ opacity: 0, scale: 0.8, width: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    isMinimized
                      ? 'text-text/40 hover:bg-surface'
                      : 'bg-accent/15 text-accent/80 hover:bg-accent/25'
                  }`}
                  onClick={() => {
                    if (isMinimized) {
                      restoreWindow(id);
                    } else if (windows[id].zIndex === topZIndex) {
                      minimizeWindow(id);
                    } else {
                      focusWindow(id);
                    }
                  }}
                >
                  <span className="text-sm">{meta.icon}</span>
                  <span className="hidden whitespace-nowrap sm:inline">{meta.title}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right: music + clock */}
        <div className="ml-auto flex items-center gap-3">
          {/* Music button — acts as minimized music window */}
          <button
            onClick={handleMusicClick}
            className={`flex h-8 items-center gap-2 rounded-lg px-2 transition-colors ${
              musicVisible
                ? 'border border-accent/40 bg-accent/20 text-accent'
                : isPlaying
                  ? 'border border-accent/25 bg-accent/10 text-accent/70 hover:bg-accent/20 hover:text-accent'
                  : 'text-text/40 hover:bg-surface hover:text-text/60'
            }`}
            aria-label="Music player"
          >
            <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
            </svg>
            <span className="max-w-[120px] truncate text-xs">{track.title}</span>
            {isPlaying && (
              <span className="flex items-center gap-[2px]">
                <span className="inline-block h-2.5 w-[2px] animate-pulse rounded-full bg-current" style={{ animationDelay: '0ms' }} />
                <span className="inline-block h-3 w-[2px] animate-pulse rounded-full bg-current" style={{ animationDelay: '150ms' }} />
                <span className="inline-block h-2 w-[2px] animate-pulse rounded-full bg-current" style={{ animationDelay: '300ms' }} />
              </span>
            )}
          </button>

          <div className="text-xs text-text/40">
            <Clock />
          </div>
        </div>
      </div>
    </>
  );
}
