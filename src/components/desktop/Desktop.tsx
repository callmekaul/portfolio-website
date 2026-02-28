'use client';

import { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useWindowStore } from '@/stores/windowStore';
import { useThemeStore } from '@/stores/themeStore';
import { WINDOW_IDS } from '@/lib/constants';
import DesktopIcons from './DesktopIcons';
import DesktopGreeting from './DesktopGreeting';
import MobileDock from './MobileDock';
import WindowManager from '../window/WindowManager';
import Taskbar from './Taskbar';
import Wallpaper from './Wallpaper';

export default function Desktop() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Initialize theme on mount (triggers rehydration from localStorage)
  useThemeStore();

  // Escape key closes the topmost open window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const { windows, topZIndex } = useWindowStore.getState();
        const topWindow = WINDOW_IDS.find(
          (id) => windows[id].isOpen && !windows[id].isMinimized && windows[id].zIndex === topZIndex
        );
        if (topWindow) {
          useWindowStore.getState().closeWindow(topWindow);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={constraintsRef}
      className="relative h-dvh w-screen overflow-hidden bg-bg"
    >
      {/* Wallpaper (lowest z) */}
      <Wallpaper />

      {/* Translucent background overlay (between wallpaper and content) */}
      <div className="pointer-events-none absolute inset-0 bg-bg/30" />

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'url(/noise.svg)', backgroundRepeat: 'repeat' }}
      />

      {/* Centered greeting */}
      <DesktopGreeting />

      {!isMobile && <DesktopIcons />}
      <WindowManager constraintsRef={constraintsRef} />
      {isMobile ? <MobileDock /> : <Taskbar />}
    </div>
  );
}
