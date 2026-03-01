'use client';

import { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useWindowStore } from '@/stores/windowStore';
import { useThemeStore } from '@/stores/themeStore';
import { WINDOW_IDS, WINDOW_META } from '@/lib/constants';
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

  // Open default windows on desktop only (once)
  const hasOpened = useRef(false);
  useEffect(() => {
    if (!isMobile && !hasOpened.current) {
      hasOpened.current = true;
      const { openWindow } = useWindowStore.getState();
      openWindow('music');
      openWindow('about');
    }
  }, [isMobile]);

  // Vertical resize: adjust window heights when browser height changes
  useEffect(() => {
    const taskbarH = 48;
    const padding = 8;

    const handleResize = () => {
      const vh = window.innerHeight;
      const { windows, batchUpdate } = useWindowStore.getState();
      const updates: Record<string, { size: { width: number; height: number } }> = {};

      for (const id of WINDOW_IDS) {
        const win = windows[id];
        if (!win.isOpen || win.isMaximized) continue;

        const available = vh - taskbarH - padding - win.position.y;
        const maxH = WINDOW_META[id].defaultSize.height;
        const targetH = Math.max(240, Math.min(maxH, available));

        if (targetH !== win.size.height) {
          updates[id] = { size: { width: win.size.width, height: targetH } };
        }
      }

      if (Object.keys(updates).length > 0) {
        batchUpdate(updates);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
