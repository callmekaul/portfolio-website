import Image from 'next/image'

export interface Project {
  company: string
  year: string
  title: string
  results: { title: string }[]
  link: string
  image: any
  description: string
}

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  return (
    <div className='bg-zinc-900/80 rounded-xl shadow-xl p-5 flex flex-col items-start w-[90vw] sm:w-80 md:w-80 max-w-xs mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-pink-400/20 border border-white/10'>
      <div className='w-full h-40 relative rounded-lg overflow-hidden mb-4'>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 320px'
        />
      </div>
      <div className='flex flex-col flex-1 w-full'>
        <h3 className='font-bold text-lg text-white mb-1'>{project.title}</h3>
        <span className='text-sm text-pink-300 mb-1'>
          {project.company} &middot; {project.year}
        </span>
        <p className='text-body text-sm mb-3 line-clamp-2'>
          {project.description}
        </p>
        <button
          className='btn btn-gradient w-full py-2 mt-auto rounded-lg text-base font-semibold'
          onClick={onOpen}
        >
          Open
        </button>
      </div>
    </div>
  )
}