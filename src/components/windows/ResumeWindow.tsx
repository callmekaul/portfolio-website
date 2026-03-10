'use client';

import { useIsMobile } from '@/hooks/useIsMobile';

export default function ResumeWindow() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-5 py-10">
        <p className="text-base text-text/50">
          Tap below to view or download my resume.
        </p>
        <a
          href="/AdityaKaul_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-accent/30 bg-accent/15 px-7 py-3.5 text-base text-accent transition-colors hover:bg-accent/25"
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
          href="/AdityaKaul_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-accent/30 bg-accent/15 px-5 py-2.5 text-sm text-accent transition-colors hover:bg-accent/25"
        >
          Open in New Tab ↗
        </a>
      </div>
      <iframe
        src="/AdityaKaul_CV.pdf"
        className="flex-1 rounded-lg border border-surface/50"
        title="Resume"
        style={{ minHeight: 450 }}
      />
    </div>
  );
}
