'use client';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 ${className}`}
    >
      {children}
    </div>
  );
}
