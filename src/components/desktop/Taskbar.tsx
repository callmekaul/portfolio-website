'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
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

function StartMenu({ onClose }: { onClose: () => void }) {
  const openWindow = useWindowStore((s) => s.openWindow);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('pointerdown', handleClick);
    return () => document.removeEventListener('pointerdown', handleClick);
  }, [onClose]);

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className="absolute bottom-14 left-3 z-[10000] w-56 rounded-xl border border-surface/[0.12] bg-panel p-2"
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
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text/60 transition-colors hover:bg-surface/[0.08] hover:text-text/80"
          >
            <span className="text-base">{meta.icon}</span>
            <span>{meta.title}</span>
          </button>
        );
      })}
    </motion.div>
  );
}

export default function Taskbar() {
  const windows = useWindowStore((s) => s.windows);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const topZIndex = useWindowStore((s) => s.topZIndex);
  const [startOpen, setStartOpen] = useState(false);

  const openWindows = WINDOW_IDS.filter((id) => windows[id].isOpen);

  return (
    <>
      <AnimatePresence>
        {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 z-[9999] flex h-12 items-center border-t border-surface/[0.12] bg-panel px-4">
        {/* Start button */}
        <button
          onClick={() => setStartOpen((prev) => !prev)}
          className={`mr-2 flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
            startOpen
              ? 'bg-accent/[0.1] text-accent/70'
              : 'text-text/40 hover:bg-surface/[0.08] hover:text-text/60'
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
                      ? 'text-text/30 hover:bg-surface/[0.04]'
                      : 'bg-accent/[0.06] text-accent/60 hover:bg-accent/[0.1]'
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

        {/* Right: clock */}
        <div className="ml-auto text-xs text-text/25">
          <Clock />
        </div>
      </div>
    </>
  );
}
