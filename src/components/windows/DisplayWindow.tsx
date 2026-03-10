'use client';

import { useThemeStore, THEME_PRESETS, WALLPAPER_OPTIONS } from '@/stores/themeStore';
import { ThemePreset, WallpaperType } from '@/types';

export default function DisplayWindow() {
  const { theme, wallpaper, setTheme, setWallpaper } = useThemeStore();

  return (
    <div className="space-y-6">
      {/* Theme Presets */}
      <div>
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent/60">
          Theme
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {(Object.keys(THEME_PRESETS) as ThemePreset[]).map((key) => {
            const preset = THEME_PRESETS[key];
            const isActive = theme === key;
            return (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`group flex flex-col items-center gap-2 rounded-xl border p-3 transition-colors ${
                  isActive
                    ? 'border-accent/50 bg-accent/15'
                    : 'border-surface/50 bg-surface/20 hover:border-surface/70 hover:bg-surface/40'
                }`}
              >
                {/* Color swatches */}
                <div className="flex w-full gap-1">
                  <div
                    className="h-6 flex-1 rounded-md"
                    style={{ background: preset.colors.bg }}
                  />
                  <div
                    className="h-6 flex-1 rounded-md"
                    style={{ background: preset.colors.accent }}
                  />
                  <div
                    className="h-6 flex-1 rounded-md"
                    style={{ background: preset.colors.secondary }}
                  />
                </div>
                <span
                  className={`text-xs font-medium ${
                    isActive ? 'text-accent' : 'text-text/40'
                  }`}
                >
                  {preset.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Wallpaper */}
      <div>
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent/60">
          Wallpaper
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {(Object.keys(WALLPAPER_OPTIONS) as WallpaperType[]).map((key) => {
            const opt = WALLPAPER_OPTIONS[key];
            const isActive = wallpaper === key;
            return (
              <button
                key={key}
                onClick={() => setWallpaper(key)}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  isActive
                    ? 'border-accent/50 bg-accent/15'
                    : 'border-surface/50 bg-surface/20 hover:border-surface/70 hover:bg-surface/40'
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    isActive ? 'text-accent' : 'text-text/50'
                  }`}
                >
                  {opt.label}
                </span>
                <p
                  className={`mt-0.5 text-xs ${
                    isActive ? 'text-accent/60' : 'text-text/40'
                  }`}
                >
                  {opt.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
