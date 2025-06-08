import React from 'react'

interface SectionBoxProps {
  children: React.ReactNode
}

export const SectionBox = ({ children }: SectionBoxProps) => (
  <div className='border-2 border-blue-600 rounded-md'>{children}</div>
)
