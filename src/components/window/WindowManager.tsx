'use client';

import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import { useIsMobile } from '@/hooks/useIsMobile';
import { WINDOW_IDS, WINDOW_META } from '@/lib/constants';
import Window from './Window';
import MobileSheet from './MobileSheet';
import AboutWindow from '../windows/AboutWindow';
import ExperienceWindow from '../windows/ExperienceWindow';
import ProjectsWindow from '../windows/ProjectsWindow';
import SkillsWindow from '../windows/SkillsWindow';
import ResumeWindow from '../windows/ResumeWindow';
import ContactWindow from '../windows/ContactWindow';
import DisplayWindow from '../windows/DisplayWindow';
import { WindowId } from '@/types';

const WINDOW_CONTENT: Record<WindowId, React.ReactNode> = {
  about: <AboutWindow />,
  experience: <ExperienceWindow />,
  projects: <ProjectsWindow />,
  skills: <SkillsWindow />,
  resume: <ResumeWindow />,
  contact: <ContactWindow />,
  display: <DisplayWindow />,
};

interface WindowManagerProps {
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

export default function WindowManager({ constraintsRef }: WindowManagerProps) {
  const windows = useWindowStore((s) => s.windows);
  const isMobile = useIsMobile();

  const openWindows = WINDOW_IDS.filter((id) => windows[id].isOpen);

  return (
    <AnimatePresence mode="popLayout">
      {openWindows.map((id) => {
        const meta = WINDOW_META[id];

        if (isMobile) {
          return (
            <MobileSheet key={id} id={id} title={meta.title} icon={meta.icon}>
              {WINDOW_CONTENT[id]}
            </MobileSheet>
          );
        }

        return (
          <Window key={id} id={id} constraintsRef={constraintsRef}>
            {WINDOW_CONTENT[id]}
          </Window>
        );
      })}
    </AnimatePresence>
  );
}
