'use client';

export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-md border border-accent/25 bg-accent/10 px-3 py-1.5 text-sm text-accent">
      {children}
    </span>
  );
}
