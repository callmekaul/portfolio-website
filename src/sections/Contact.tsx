'use client'

import { useState } from 'react'

export const ContactSection = () => {
  const [form, setForm] = useState({
    name: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Integrate with your email API/service here
    setSubmitted(true)
  }

  return (
    <section
      id='contact'
      className='flex flex-col min-h-screen w-full min-w-0 justify-center items-center snap-start'
    >
      <div className='w-full flex flex-col md:flex-row bg-zinc-900/70 overflow-hidden'>
        {/* Info panel or illustration (optional) */}
        <div className='hidden md:flex flex-col justify-center items-start w-1/2 px-12 py-16 bg-gradient-to-br from-blue-900/40 via-blue-800/20 to-transparent'>
          <h2 className='heading mb-4'>Contact</h2>
          <p className='text-body mb-8'>
            Interested in working together or have a question? Fill out the form
            or email me at{' '}
            <a
              href='mailto:theadityakaul@gmail.com'
              className='text-blue-400 underline'
            >
              theadityakaul@gmail.com
            </a>
          </p>
          {/* You can add an illustration or avatar here if you want */}
        </div>
        {/* Form */}
        <div className='w-full md:w-1/2 flex flex-col justify-center px-6 py-10 md:px-12'>
          <h2 className='heading mb-6 text-left md:hidden'>Contact</h2>
          <p className='text-body mb-8 md:hidden'>
            Interested in working together or have a question? Fill out the form
            or email me at{' '}
            <a
              href='mailto:theadityakaul@gmail.com'
              className='text-blue-400 underline'
            >
              theadityakaul@gmail.com
            </a>
          </p>
          {submitted ? (
            <div className='text-green-400 text-lg font-semibold text-center py-8'>
              Thank you for reaching out! I will get back to you soon.
            </div>
          ) : (
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
              <div className='relative'>
                <input
                  id='name'
                  name='name'
                  type='text'
                  required
                  autoComplete='name'
                  placeholder='Name'
                  className='w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none text-white placeholder:text-zinc-400'
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className='relative'>
                <input
                  id='subject'
                  name='subject'
                  type='text'
                  required
                  placeholder='Subject'
                  className='w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none text-white placeholder:text-zinc-400'
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>
              <div className='relative'>
                <textarea
                  id='message'
                  name='message'
                  required
                  rows={5}
                  placeholder='Message'
                  className='w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none text-white placeholder:text-zinc-400 resize-none'
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <button
                type='submit'
                className='btn btn-gradient w-full py-3 text-lg font-semibold rounded-full mt-2'
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
