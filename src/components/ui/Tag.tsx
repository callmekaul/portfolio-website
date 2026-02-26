'use client';

export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-md border border-cyan-400/10 bg-cyan-400/[0.06] px-3 py-1.5 text-sm text-cyan-300/60">
      {children}
    </span>
  );
}
