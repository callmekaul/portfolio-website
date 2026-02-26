'use client';

export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs text-white/60">
      {children}
    </span>
  );
}
