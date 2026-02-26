import { create } from 'zustand';
import { WindowId, WindowState, WindowStore } from '@/types';
import { WINDOW_DEFAULTS, WINDOW_IDS } from '@/lib/constants';

const initialWindows = Object.fromEntries(
  WINDOW_IDS.map((id) => [
    id,
    {
      id,
      isOpen: false,
      isMinimized: false,
      zIndex: 0,
      position: WINDOW_DEFAULTS[id].position,
    },
  ])
) as Record<WindowId, WindowState>;

export const useWindowStore = create<WindowStore>((set) => ({
  windows: initialWindows,
  topZIndex: 0,

  openWindow: (id) =>
    set((state) => {
      const newZ = state.topZIndex + 1;
      return {
        topZIndex: newZ,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isOpen: true, isMinimized: false, zIndex: newZ },
        },
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: false },
      },
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true },
      },
    })),

  restoreWindow: (id) =>
    set((state) => {
      const newZ = state.topZIndex + 1;
      return {
        topZIndex: newZ,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMinimized: false, zIndex: newZ },
        },
      };
    }),

  focusWindow: (id) =>
    set((state) => {
      if (state.windows[id].zIndex === state.topZIndex) return state;
      const newZ = state.topZIndex + 1;
      return {
        topZIndex: newZ,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], zIndex: newZ },
        },
      };
    }),

  updatePosition: (id, pos) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], position: pos },
      },
    })),
}));
