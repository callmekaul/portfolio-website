'use client';

import { motion, useDragControls } from 'framer-motion';
import { ReactNode, useCallback } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import WindowTitleBar from './WindowTitleBar';
import { WindowId } from '@/types';
import { WINDOW_META } from '@/lib/constants';

interface WindowProps {
  id: WindowId;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

export default function Window({ id, constraintsRef, children }: WindowProps) {
  const dragControls = useDragControls();
  const windowState = useWindowStore((s) => s.windows[id]);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const updatePosition = useWindowStore((s) => s.updatePosition);
  const meta = WINDOW_META[id];

  const handlePointerDown = useCallback(() => {
    focusWindow(id);
  }, [focusWindow, id]);

  return (
    <motion.div
      style={{
        zIndex: windowState.zIndex,
        left: windowState.position.x,
        top: windowState.position.y,
        width: meta.defaultSize.width,
        maxHeight: 'calc(100dvh - 80px)',
      }}
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={
        windowState.isMinimized
          ? { opacity: 0, scale: 0.85, y: 40, transition: { duration: 0.2 } }
          : { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 28 } }
      }
      exit={{ opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.15 } }}
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.05}
      dragListener={false}
      onPointerDown={handlePointerDown}
      className="absolute flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-xl"
    >
      <WindowTitleBar
        id={id}
        title={meta.title}
        icon={meta.icon}
        onPointerDown={(e) => dragControls.start(e)}
      />
      <div className="window-scroll flex-1 overflow-y-auto p-5">
        {children}
      </div>
    </motion.div>
  );
}
