'use client';

import { useIsMobile } from '@/hooks/useIsMobile';

export default function ResumeWindow() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <p className="text-sm text-white/50">
          Tap below to view or download my resume.
        </p>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/[0.08] bg-white/[0.06] px-6 py-3 text-sm text-white/70 transition-colors hover:bg-white/[0.1]"
        >
          Open Resume ↗
        </a>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col" style={{ minHeight: 500 }}>
      <div className="mb-3 flex justify-end">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white/70"
        >
          Open in New Tab ↗
        </a>
      </div>
      <iframe
        src="/resume.pdf"
        className="flex-1 rounded-lg border border-white/[0.06]"
        title="Resume"
        style={{ minHeight: 450 }}
      />
    </div>
  );
}
