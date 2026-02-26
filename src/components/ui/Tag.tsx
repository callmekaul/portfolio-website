'use client';

export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-white/60">
      {children}
    </span>
  );
}
