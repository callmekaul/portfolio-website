import { WindowId, WindowMeta, WindowDefault } from '@/types';

export const WINDOW_IDS: WindowId[] = ['about', 'experience', 'projects', 'skills', 'resume', 'contact', 'display', 'music'];

export const WINDOW_META: Record<WindowId, WindowMeta> = {
  about:      { title: 'About Me',    icon: '👤', defaultSize: { width: 620, height: 820 } },
  experience: { title: 'Experience',  icon: '💼', defaultSize: { width: 620, height: 560 } },
  projects:   { title: 'Projects',    icon: '🚀', defaultSize: { width: 700, height: 560 } },
  skills:     { title: 'Skills',      icon: '⚡', defaultSize: { width: 520, height: 480 } },
  resume:     { title: 'Resume',      icon: '📄', defaultSize: { width: 700, height: 750 } },
  contact:    { title: 'Contact',     icon: '✉️',  defaultSize: { width: 520, height: 720 } },
  display:    { title: 'Display',    icon: '🎨', defaultSize: { width: 480, height: 520 } },
  music:      { title: 'Music',      icon: '🎵', defaultSize: { width: 420, height: 520 } },
};

export const WINDOW_DEFAULTS: Record<WindowId, WindowDefault> = {
  about:      { position: { x: 650, y: 30  }, size: WINDOW_META.about.defaultSize },
  experience: { position: { x: 100, y: 60  }, size: WINDOW_META.experience.defaultSize },
  projects:   { position: { x: 140, y: 80  }, size: WINDOW_META.projects.defaultSize },
  skills:     { position: { x: 180, y: 100 }, size: WINDOW_META.skills.defaultSize },
  resume:     { position: { x: 80,  y: 30  }, size: WINDOW_META.resume.defaultSize },
  contact:    { position: { x: 220, y: 120 }, size: WINDOW_META.contact.defaultSize },
  display:    { position: { x: 160, y: 60  }, size: WINDOW_META.display.defaultSize },
  music:      { position: { x: 30,  y: 30  }, size: WINDOW_META.music.defaultSize },
};
