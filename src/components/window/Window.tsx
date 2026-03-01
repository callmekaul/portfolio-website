'use client';

import { motion, useDragControls, useMotionValue } from 'framer-motion';
import { ReactNode, useCallback, useRef, useEffect } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import WindowTitleBar from './WindowTitleBar';
import { WindowId } from '@/types';
import { WINDOW_META } from '@/lib/constants';

interface WindowProps {
  id: WindowId;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

const MIN_WIDTH = 320;
const MIN_HEIGHT = 240;

type ResizeDir = 'e' | 'w' | 's' | 'se' | 'sw';

export default function Window({ id, constraintsRef, children }: WindowProps) {
  const dragControls = useDragControls();
  const windowState = useWindowStore((s) => s.windows[id]);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const updatePosition = useWindowStore((s) => s.updatePosition);
  const updateSize = useWindowStore((s) => s.updateSize);
  const meta = WINDOW_META[id];

  // Motion values to control drag transform directly
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const resizeRef = useRef<{
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    startPosX: number;
    startPosY: number;
    dir: ResizeDir;
  } | null>(null);

  const handlePointerDown = useCallback(() => {
    focusWindow(id);
  }, [focusWindow, id]);

  // When maximize state changes, reset drag offset
  const isMaximized = windowState.isMaximized;
  useEffect(() => {
    dragX.set(0);
    dragY.set(0);
  }, [isMaximized, dragX, dragY]);

  const onResizeStart = useCallback(
    (dir: ResizeDir) => (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      focusWindow(id);

      const store = useWindowStore.getState();
      const win = store.windows[id];

      // Account for current drag offset in starting position
      const currentDragX = dragX.get();
      const currentDragY = dragY.get();

      resizeRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startW: win.size.width,
        startH: win.size.height,
        startPosX: win.position.x + currentDragX,
        startPosY: win.position.y + currentDragY,
        dir,
      };

      const onMove = (ev: PointerEvent) => {
        if (!resizeRef.current) return;
        const { startX, startY, startW, startH, startPosX, startPosY, dir: d } = resizeRef.current;
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;

        let newW = startW;
        let newH = startH;
        let newX = startPosX;
        let newY = startPosY;

        if (d === 'e' || d === 'se') newW = Math.max(MIN_WIDTH, startW + dx);
        if (d === 'w' || d === 'sw') {
          newW = Math.max(MIN_WIDTH, startW - dx);
          newX = startPosX + (startW - newW);
        }
        if (d === 's' || d === 'se' || d === 'sw') newH = Math.max(MIN_HEIGHT, startH + dy);

        updateSize(id, { width: newW, height: newH });
        updatePosition(id, { x: newX, y: newY });
        // Reset drag offset since we're updating position directly
        dragX.set(0);
        dragY.set(0);
      };

      const onUp = () => {
        resizeRef.current = null;
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    },
    [focusWindow, id, updateSize, updatePosition, dragX, dragY]
  );

  return (
    <motion.div
      style={
        isMaximized
          ? {
              zIndex: windowState.zIndex,
              left: 0,
              top: 0,
              width: '100%',
              height: 'calc(100dvh - 48px)',
              x: dragX,
              y: dragY,
              pointerEvents: windowState.isMinimized ? 'none' : 'auto',
            }
          : {
              zIndex: windowState.zIndex,
              left: windowState.position.x,
              top: windowState.position.y,
              width: windowState.size.width,
              height: windowState.size.height,
              x: dragX,
              y: dragY,
              pointerEvents: windowState.isMinimized ? 'none' : 'auto',
            }
      }
      initial={{ opacity: 0, scale: 0.92 }}
      animate={
        windowState.isMinimized
          ? { opacity: 0, scale: 0.85, transition: { duration: 0.2 } }
          : { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 28 } }
      }
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
      drag={!isMaximized}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      dragListener={false}
      onDrag={() => {
        // Clamp during drag so window can't leave viewport
        const store = useWindowStore.getState();
        const win = store.windows[id];
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const taskbarH = 48;
        const minVisible = 80;

        const rawX = win.position.x + dragX.get();
        const rawY = win.position.y + dragY.get();

        const clampedX = Math.max(-win.size.width + minVisible, Math.min(rawX, vw - minVisible));
        const clampedY = Math.max(0, Math.min(rawY, vh - taskbarH - 40));

        if (clampedX !== rawX) dragX.set(clampedX - win.position.x);
        if (clampedY !== rawY) dragY.set(clampedY - win.position.y);
      }}
      onDragEnd={() => {
        const dx = dragX.get();
        const dy = dragY.get();
        if (dx !== 0 || dy !== 0) {
          const store = useWindowStore.getState();
          const win = store.windows[id];
          updatePosition(id, {
            x: win.position.x + dx,
            y: win.position.y + dy,
          });
          dragX.set(0);
          dragY.set(0);
        }
      }}
      onPointerDown={handlePointerDown}
      className={`absolute flex flex-col border-[3px] border-panel bg-surface/[0.08] shadow-2xl shadow-black/40 backdrop-blur-xl ${
        isMaximized ? 'rounded-none' : 'rounded-2xl'
      }`}
    >
      <WindowTitleBar
        id={id}
        title={meta.title}
        icon={meta.icon}
        onPointerDown={(e) => {
          if (!isMaximized) dragControls.start(e);
        }}
      />
      <div className="window-scroll flex-1 overflow-y-auto p-6">
        {children}
      </div>

      {/* Resize handles — hidden when maximized */}
      {!isMaximized && (
        <>
          <div
            className="absolute right-0 top-0 h-full w-2 cursor-e-resize"
            onPointerDown={onResizeStart('e')}
          />
          <div
            className="absolute bottom-0 left-0 h-2 w-full cursor-s-resize"
            onPointerDown={onResizeStart('s')}
          />
          <div
            className="absolute left-0 top-0 h-full w-2 cursor-w-resize"
            onPointerDown={onResizeStart('w')}
          />
          <div
            className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize"
            onPointerDown={onResizeStart('se')}
          />
          <div
            className="absolute bottom-0 left-0 h-4 w-4 cursor-sw-resize"
            onPointerDown={onResizeStart('sw')}
          />
        </>
      )}
    </motion.div>
  );
}
