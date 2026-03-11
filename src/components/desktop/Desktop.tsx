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
import MusicProvider from './MusicProvider';

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

      // Shrink width if wider than viewport (with padding)
      const maxW = vw - padding * 2;
      const defaultW = WINDOW_META[id].defaultSize.width;
      const targetW = Math.max(320, Math.min(defaultW, maxW));

      // Shrink height if taller than available space
      const availableH = vh - taskbarH - padding;
      const defaultH = WINDOW_META[id].defaultSize.height;
      const targetH = Math.max(240, Math.min(defaultH, availableH));

      if (targetW !== win.size.width || targetH !== win.size.height) {
        patch.size = { width: targetW, height: targetH };
      }

      // Reposition: ensure window fits within viewport
      const winW = patch.size ? patch.size.width : win.size.width;
      const winH = patch.size ? patch.size.height : win.size.height;
      let newX = win.position.x;
      let newY = win.position.y;

      // Push left if overflowing right edge
      if (newX + winW > vw - padding) {
        newX = Math.max(padding, vw - padding - winW);
      }
      // Push up if overflowing bottom (above taskbar)
      if (newY + winH > vh - taskbarH - padding) {
        newY = Math.max(0, vh - taskbarH - padding - winH);
      }

      if (newX !== win.position.x || newY !== win.position.y) {
        patch.position = { x: newX, y: newY };
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
      const { openWindow, minimizeWindow } = useWindowStore.getState();
      openWindow('contact');
      openWindow('about');
      // Open music minimized — shows in taskbar right section
      openWindow('music');
      minimizeWindow('music');
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
      <div className="pointer-events-none absolute inset-0 bg-bg/15" />

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'url(/noise.svg)', backgroundRepeat: 'repeat' }}
      />

      <MusicProvider />
      {isMobile && <MobileHero />}
      {!isMobile && <DesktopIcons />}
      <WindowManager constraintsRef={constraintsRef} />
      {isMobile ? <MobileDock /> : <Taskbar />}
    </div>
  );
}
