'use client';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`rounded-xl border border-surface/[0.06] bg-surface/[0.03] p-5 ${className}`}
    >
      {children}
    </div>
  );
}
