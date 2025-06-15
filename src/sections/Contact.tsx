'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiMessageCircle, FiSend } from 'react-icons/fi'

export const ContactSection = () => {
  const [form, setForm] = useState({ name: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrate email service
    setSubmitted(true)
  }

  return (
    <section
      id='contact'
      className='relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-16 snap-start'
    >
      {/* card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='relative z-10 flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white/5 backdrop-blur-lg ring-1 ring-white/10 lg:flex-row'
      >
        {/* left info panel */}
        <div className='hidden w-full flex-col justify-center gap-6 bg-gradient-to-br from-blue-900/40 via-blue-800/20 to-transparent px-12 py-16 lg:flex lg:w-1/2'>
          <h2 className='text-4xl font-extrabold text-white'>Let’s Talk</h2>
          <p className='text-zinc-300'>
            Have an idea, a question, or just want to say hi? Drop me a
            message—my inbox is always open.
          </p>
          <a
            href='mailto:theadityakaul@gmail.com'
            className='inline-flex items-center gap-2 text-pink-400 underline decoration-pink-400/30 underline-offset-4 hover:opacity-80'
          >
            <FiMail /> theadityakaul@gmail.com
          </a>
        </div>

        {/* right form panel */}
        <div className='w-full px-6 py-10 sm:px-12 lg:w-1/2'>
          <h2 className='mb-2 text-3xl font-semibold text-white lg:hidden'>
            Contact
          </h2>
          <p className='mb-6 text-zinc-300 lg:hidden'>
            I’d love to hear from you! Fill out the form or email&nbsp;
            <a
              href='mailto:theadityakaul@gmail.com'
              className='text-pink-400 underline underline-offset-4'
            >
              theadityakaul@gmail.com
            </a>
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className='flex flex-col items-center gap-4 text-center'
            >
              <span className='text-4xl text-green-400'>✅</span>
              <p className='text-lg font-medium text-green-300'>
                Thanks for reaching out!
                <br />
                I’ll be in touch soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* floating input */}
              {[
                {
                  id: 'name',
                  type: 'text',
                  icon: FiUser,
                  placeholder: 'Name',
                },
                {
                  id: 'subject',
                  type: 'text',
                  icon: FiMail,
                  placeholder: 'Subject',
                },
              ].map(({ id, type, icon: Icon, placeholder }) => (
                <div key={id} className='relative'>
                  <Icon className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400' />
                  <input
                    id={id}
                    name={id}
                    type={type}
                    required
                    placeholder={placeholder}
                    value={form[id as keyof typeof form]}
                    onChange={handleChange}
                    className='w-full rounded-xl bg-zinc-900/70 px-12 py-3 text-white backdrop-blur-md ring-1 ring-white/10 focus:ring-2 focus:ring-pink-500'
                  />
                </div>
              ))}

              {/* message */}
              <div className='relative'>
                <FiMessageCircle className='pointer-events-none absolute left-4 top-4 text-zinc-400' />
                <textarea
                  id='message'
                  name='message'
                  required
                  rows={5}
                  placeholder='Message'
                  value={form.message}
                  onChange={handleChange}
                  className='w-full resize-none rounded-xl bg-zinc-900/70 px-12 py-3 text-white backdrop-blur-md ring-1 ring-white/10 focus:ring-2 focus:ring-pink-500'
                />
              </div>

              {/* send button */}
              <button
                type='submit'
                className='relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:scale-[1.02] focus:outline-none'
              >
                <FiSend className='text-xl' />
                Send Message
                <span className='absolute inset-0 -z-10 animate-pulse bg-gradient-to-r from-pink-600 to-purple-600 opacity-20 blur-2xl'></span>
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}
