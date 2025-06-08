'use client'

export const Header = () => {
  return (
    <div className='flex justify-center items-center w-full py-1.5'>
      <nav className='flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur'>
        <a href='#hero' className='nav-item'>
          Home
        </a>
        <a href='#skills' className='nav-item'>
          Skills
        </a>
        <a href='#roadmap' className='nav-item'>
          Roadmap
        </a>
        <a href='#projects' className='nav-item'>
          Projects
        </a>
      </nav>
    </div>
  )
}
