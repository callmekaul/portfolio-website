'use client';

import DesktopIcon from './DesktopIcon';
import { WINDOW_IDS, WINDOW_META } from '@/lib/constants';
import { WindowId } from '@/types';

const UTILITY_IDS: WindowId[] = ['display', 'music'];

export default function DesktopIcons() {
  const mainIds = WINDOW_IDS.filter((id) => !UTILITY_IDS.includes(id));

  return (
    <div className="window-scroll absolute right-6 top-6 bottom-14 flex gap-6 overflow-y-auto">
      {/* Portfolio icons */}
      <div className="flex flex-col gap-5">
        {mainIds.map((id) => (
          <DesktopIcon
            key={id}
            id={id}
            icon={WINDOW_META[id].icon}
            label={WINDOW_META[id].title}
          />
        ))}
      </div>
      {/* Utility icons (display, music) */}
      <div className="flex flex-col gap-5">
        {UTILITY_IDS.map((id) => (
          <DesktopIcon
            key={id}
            id={id}
            icon={WINDOW_META[id].icon}
            label={WINDOW_META[id].title}
          />
        ))}
      </div>
    </div>
  );
}
