import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemePreset, WallpaperType, ThemeColors, ThemeStore } from '@/types';

export const THEME_PRESETS: Record<ThemePreset, { label: string; colors: ThemeColors }> = {
  cyber: {
    label: 'Cyber',
    colors: { bg: '#06060c', panel: '#12122a', surface: '#1c1c3a', accent: '#ff2a6d', secondary: '#05d9e8', text: '#f0e8ff' },
  },
  ocean: {
    label: 'Ocean',
    colors: { bg: '#040c1a', panel: '#0c1e3c', surface: '#14284e', accent: '#38bdf8', secondary: '#2dd4bf', text: '#dbeafe' },
  },
  ember: {
    label: 'Ember',
    colors: { bg: '#0e0606', panel: '#261010', surface: '#381a1a', accent: '#fb923c', secondary: '#f472b6', text: '#fff0e8' },
  },
  sunset: {
    label: 'Sunset',
    colors: { bg: '#120818', panel: '#221030', surface: '#321a48', accent: '#fbbf24', secondary: '#f472b6', text: '#fff0f5' },
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
      wallpaper: 'clouds',

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
