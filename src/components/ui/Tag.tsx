'use client';

export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-md border border-accent/10 bg-accent/[0.06] px-3 py-1.5 text-sm text-accent/60">
      {children}
    </span>
  );
}
