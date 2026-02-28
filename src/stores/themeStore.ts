import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemePreset, WallpaperType, ThemeColors, ThemeStore } from '@/types';

export const THEME_PRESETS: Record<ThemePreset, { label: string; colors: ThemeColors }> = {
  cyber: {
    label: 'Cyber',
    colors: { bg: '#06060c', panel: '#1a1a2e', surface: '#ffffff', accent: '#22d3ee', secondary: '#c084fc', text: '#ffffff' },
  },
  ocean: {
    label: 'Ocean',
    colors: { bg: '#050a18', panel: '#0f2847', surface: '#a0c4ff', accent: '#38bdf8', secondary: '#2dd4bf', text: '#e0f0ff' },
  },
  ember: {
    label: 'Ember',
    colors: { bg: '#120808', panel: '#2e1515', surface: '#ffd0b0', accent: '#fb923c', secondary: '#f472b6', text: '#fff0e8' },
  },
  arctic: {
    label: 'Arctic',
    colors: { bg: '#e8edf2', panel: '#cdd5de', surface: '#1e293b', accent: '#0284c7', secondary: '#7c3aed', text: '#000000' },
  },
};

export const WALLPAPER_OPTIONS: Record<WallpaperType, { label: string; description: string }> = {
  matrix: { label: 'Matrix',  description: 'Falling character rain' },
  clouds: { label: 'Clouds',  description: 'Scrolling pixel clouds' },
  stars:  { label: 'Stars',   description: 'Twinkling star field' },
  aurora: { label: 'Aurora',  description: 'Shifting gradient bands' },
  grid:   { label: 'Grid',    description: 'Grid with cursor glow' },
  none:   { label: 'None',    description: 'Clean solid background' },
};

function applyTheme(theme: ThemePreset) {
  const { colors } = THEME_PRESETS[theme];
  const el = document.documentElement;
  el.style.setProperty('--color-bg', colors.bg);
  el.style.setProperty('--color-panel', colors.panel);
  el.style.setProperty('--color-surface', colors.surface);
  el.style.setProperty('--color-accent', colors.accent);
  el.style.setProperty('--color-secondary', colors.secondary);
  el.style.setProperty('--color-text', colors.text);
}

function applyWallpaper(wallpaper: WallpaperType) {
  document.documentElement.setAttribute('data-wallpaper', wallpaper);
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'cyber',
      wallpaper: 'grid',

      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },

      setWallpaper: (wallpaper) => {
        applyWallpaper(wallpaper);
        set({ wallpaper });
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
          applyWallpaper(state.wallpaper);
        }
      },
    }
  )
);
