'use client';

import { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useWindowStore } from '@/stores/windowStore';
import { useThemeStore } from '@/stores/themeStore';
import { WINDOW_IDS, WINDOW_META } from '@/lib/constants';
import DesktopIcons from './DesktopIcons';

import MobileHero from './MobileHero';
import MobileDock from './MobileDock';
import WindowManager from '../window/WindowManager';
import Taskbar from './Taskbar';
import Wallpaper from './Wallpaper';

export default function Desktop() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Initialize theme on mount (triggers rehydration from localStorage)
  useThemeStore();

  // Clamp open windows to fit viewport
  const clampWindows = useRef(() => {
    const taskbarH = 48;
    const padding = 8;
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const { windows, batchUpdate } = useWindowStore.getState();
    const updates: Record<string, Partial<{ size: { width: number; height: number }; position: { x: number; y: number } }>> = {};

    for (const id of WINDOW_IDS) {
      const win = windows[id];
      if (!win.isOpen || win.isMaximized) continue;

      const patch: typeof updates[string] = {};

      // Vertical: adjust height to fit
      const available = vh - taskbarH - padding - win.position.y;
      const maxH = WINDOW_META[id].defaultSize.height;
      const targetH = Math.max(240, Math.min(maxH, available));
      if (targetH !== win.size.height) {
        patch.size = { width: win.size.width, height: targetH };
      }

      // Horizontal: push window left so at least 25% stays visible
      const winW = patch.size ? patch.size.width : win.size.width;
      const maxX = vw - winW * 0.25;
      if (win.position.x > maxX) {
        patch.position = { x: Math.max(0, maxX), y: win.position.y };
      }

      if (patch.size || patch.position) {
        updates[id] = patch;
      }
    }

    if (Object.keys(updates).length > 0) {
      batchUpdate(updates);
    }
  });

  // Open default windows on desktop only (once, after mobile check resolves)
  const hasOpened = useRef(false);
  useEffect(() => {
    if (isMobile === null || hasOpened.current) return;
    if (!isMobile) {
      hasOpened.current = true;
      const { openWindow } = useWindowStore.getState();
      openWindow('music');
      openWindow('about');
      // Clamp immediately after opening so they fit the viewport
      clampWindows.current();
    }
    hasOpened.current = true;
  }, [isMobile]);

  // Clamp on browser resize
  useEffect(() => {
    const handler = () => clampWindows.current();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
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

      {isMobile && <MobileHero />}
      {!isMobile && <DesktopIcons />}
      <WindowManager constraintsRef={constraintsRef} />
      {isMobile ? <MobileDock /> : <Taskbar />}
    </div>
  );
}
