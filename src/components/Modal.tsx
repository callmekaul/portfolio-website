import React from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-zinc-900 rounded-lg p-6 max-w-lg w-full relative shadow-lg">
        <button
          className="absolute top-2 right-3 text-zinc-400 hover:text-white text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h4 className="text-xl font-bold mb-4 text-center">{title}</h4>
        <div>{children}</div>
      </div>
    </div>
  )
}