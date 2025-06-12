import Image from 'next/image'
import type { Project } from './ProjectCard'

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in'>
      <div className='bg-zinc-900/95 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-modal-pop border border-pink-400/10'>
        <button
          className='absolute top-3 right-3 text-zinc-400 hover:text-pink-400 text-2xl font-bold focus:outline-none'
          onClick={onClose}
          aria-label='Close'
        >
          &times;
        </button>
        <div className='w-full h-48 relative rounded-lg overflow-hidden mb-4'>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 400px'
          />
        </div>
        <h3 className='font-bold text-2xl text-white mb-1'>{project.title}</h3>
        <span className='text-sm text-pink-300 mb-2'>
          {project.company} &middot; {project.year}
        </span>
        <p className='text-body mb-4'>{project.description}</p>
        <ul className='mb-4 list-disc list-inside text-sm text-blue-200'>
          {project.results.map((r, i) => (
            <li key={i}>{r.title}</li>
          ))}
        </ul>
        <a
          href={project.link}
          target='_blank'
          rel='noopener noreferrer'
          className='btn btn-gradient w-full py-2 rounded-lg text-base font-semibold text-center'
        >
          View Demo
        </a>
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fade-in 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-modal-pop {
          animation: modal-pop 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes modal-pop {
          0% {
            transform: scale(0.85) translateY(40px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}