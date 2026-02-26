'use client';

import DesktopIcon from './DesktopIcon';
import { WINDOW_IDS, WINDOW_META } from '@/lib/constants';

export default function DesktopIcons() {
  return (
    <div className="absolute right-6 top-6 flex flex-col gap-5">
      {WINDOW_IDS.map((id) => (
        <DesktopIcon
          key={id}
          id={id}
          icon={WINDOW_META[id].icon}
          label={WINDOW_META[id].title}
        />
      ))}
    </div>
  );
}
