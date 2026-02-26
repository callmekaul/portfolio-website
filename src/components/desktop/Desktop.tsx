'use client';

import { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useWindowStore } from '@/stores/windowStore';
import { WINDOW_IDS } from '@/lib/constants';
import DesktopIcons from './DesktopIcons';
import MobileDock from './MobileDock';
import WindowManager from '../window/WindowManager';
import Taskbar from './Taskbar';

export default function Desktop() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
      className="relative h-dvh w-screen overflow-hidden bg-[#0a0a0f]"
    >
      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'url(/noise.svg)', backgroundRepeat: 'repeat' }}
      />

      {!isMobile && <DesktopIcons />}
      <WindowManager constraintsRef={constraintsRef} />
      {isMobile ? <MobileDock /> : <Taskbar />}
    </div>
  );
}
