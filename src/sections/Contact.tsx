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
    setSubmitted(true)
  }

  return (
    <section
      id='contact'
      className='relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-16 snap-start'
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='relative z-10 flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl glass-card lg:flex-row'
      >
        {/* left info panel */}
        <div className='hidden w-full flex-col justify-center gap-6 px-12 py-16 lg:flex lg:w-1/2'>
          <h2 className='text-4xl font-extrabold text-white'>Let’s Talk</h2>
          <p className='text-zinc-300'>
            Have an idea, a question, or just want to say hi? Drop me a
            message—my inbox is always open.
          </p>
          <a
            href='mailto:theadityakaul@gmail.com'
            className='inline-flex items-center gap-2 text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 underline-offset-4 hover:opacity-80'
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
              className='text-[var(--color-accent)] underline underline-offset-4'
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
                  <Icon className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)]' />
                  <input
                    id={id}
                    name={id}
                    type={type}
                    required
                    placeholder={placeholder}
                    value={form[id as keyof typeof form]}
                    onChange={handleChange}
                    className='w-full rounded-xl bg-[var(--color-bg-glass)] px-12 py-3 text-white backdrop-blur-md ring-1 ring-[var(--color-primary)]/20 focus:ring-2 focus:ring-[var(--color-primary)]'
                  />
                </div>
              ))}
              {/* message */}
              <div className='relative'>
                <FiMessageCircle className='pointer-events-none absolute left-4 top-4 text-[var(--color-muted)]' />
                <textarea
                  id='message'
                  name='message'
                  required
                  rows={5}
                  placeholder='Message'
                  value={form.message}
                  onChange={handleChange}
                  className='w-full resize-none rounded-xl bg-[var(--color-bg-glass)] px-12 py-3 text-white backdrop-blur-md ring-1 ring-[var(--color-primary)]/20 focus:ring-2 focus:ring-[var(--color-primary)]'
                />
              </div>
              {/* send button */}
              <button
                type='submit'
                className='btn btn-gradient w-full flex items-center justify-center gap-2'
              >
                <FiSend className='text-xl' />
                Send Message
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}
