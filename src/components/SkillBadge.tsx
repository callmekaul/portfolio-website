import React from 'react'

export interface SkillBadgeProps {
  name: string
  level: 1 | 2 | 3 | 4
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ name, level }) => {
  const percent = level * 25

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/60 border border-white/15 shadow-md backdrop-blur-md flex-shrink-0 min-w-[180px] max-w-full">
      <span className="font-medium text-white text-sm whitespace-nowrap">{name}</span>
      <div className="flex items-center h-3 w-20 sm:w-24 md:w-28 lg:w-32 flex-shrink-0">
        <div className="relative w-full h-full rounded-full border border-white/20 bg-white/5 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-400/70 via-pink-400/60 to-fuchsia-600/80 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  )
}
