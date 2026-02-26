'use client';

import { useWindowStore } from '@/stores/windowStore';
import { WindowId } from '@/types';

interface WindowTitleBarProps {
  id: WindowId;
  title: string;
  icon: string;
  onPointerDown: (e: React.PointerEvent) => void;
}

export default function WindowTitleBar({ id, title, icon, onPointerDown }: WindowTitleBarProps) {
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);

  return (
    <div
      className="flex cursor-grab items-center justify-between border-b border-white/[0.06] px-5 py-3.5 active:cursor-grabbing select-none"
      onPointerDown={onPointerDown}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span className="text-base font-medium text-white/80">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="flex h-7 w-7 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/[0.08] hover:text-white/70"
          onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Minimize"
        >
          <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor">
            <rect width="10" height="2" rx="1" />
          </svg>
        </button>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-red-500/20 hover:text-red-400"
          onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Close"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="1" y1="1" x2="9" y2="9" />
            <line x1="9" y1="1" x2="1" y2="9" />
          </svg>
        </button>
      </div>
    </div>
  );
}
