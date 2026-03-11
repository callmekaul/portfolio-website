'use client';

import { useState, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { about } from '@/data/about';
import { services, highlightKeyword } from '@/data/services';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

const SWIPE_THRESHOLD = 50;

export default function ContactWindow() {
  const [page, setPage] = useState(0); // 0 = services, 1 = form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const constraintsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD && page === 0) {
      setPage(1);
    } else if (info.offset.x > SWIPE_THRESHOLD && page === 1) {
      setPage(0);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div ref={constraintsRef} className="window-scroll relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          className="h-full"
        >
          <AnimatePresence mode="wait" initial={false}>
            {page === 0 ? (
              <motion.div
                key="services"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="space-y-5 px-1"
              >
                {services.map((s, i) => (
                  <div key={i} className="space-y-1.5">
                    <p className="text-base font-medium leading-snug text-text sm:text-lg">
                      {s.question}
                    </p>
                    <p className="text-xs leading-relaxed text-secondary sm:text-sm">
                      {highlightKeyword(s.answer, s.keyword)}
                    </p>
                  </div>
                ))}

                <div className="pt-2">
                  <p className="text-base leading-relaxed text-text sm:text-lg">
                    Want someone to do it for you?
                  </p>
                  <button
                    onClick={() => setPage(1)}
                    className="mt-3 w-full rounded-lg border border-accent/30 bg-accent/15 py-2.5 text-sm text-accent transition-colors hover:bg-accent/25 sm:py-3 sm:text-base"
                  >
                    Contact Me
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 60, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="h-full overflow-y-auto space-y-6 px-1 pb-2"
              >
                {/* Socials */}
                <div>
                  <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
                    Connect
                  </p>
                  <div className="flex gap-3">
                    <SocialLink href={about.socials.github} label="GitHub">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </SocialLink>
                    <SocialLink href={about.socials.linkedin} label="LinkedIn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </SocialLink>
                    <SocialLink href={`mailto:${about.socials.email}`} label="Email">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="M22 4L12 13L2 4"/>
                      </svg>
                    </SocialLink>
                  </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <p className="text-sm font-medium uppercase tracking-wider text-accent">
                    Send a Message
                  </p>

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="absolute h-0 w-0 overflow-hidden opacity-0"
                  />

                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-surface/50 bg-surface/30 px-3 py-2.5 text-sm text-text outline-none placeholder:text-text/30 focus:border-accent/40 sm:px-4 sm:py-3 sm:text-base"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-surface/50 bg-surface/30 px-3 py-2.5 text-sm text-text outline-none placeholder:text-text/30 focus:border-accent/40 sm:px-4 sm:py-3 sm:text-base"
                  />
                  <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-surface/50 bg-surface/30 px-3 py-2.5 text-sm text-text outline-none placeholder:text-text/30 focus:border-accent/40 sm:px-4 sm:py-3 sm:text-base"
                  />

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full rounded-lg border border-accent/30 bg-accent/15 py-2.5 text-sm text-accent transition-colors hover:bg-accent/25 disabled:opacity-50 sm:py-3 sm:text-base"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>

                  {status === 'sent' && (
                    <p className="text-center text-sm text-green-400">
                      Message sent successfully!
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-center text-sm text-red-400">
                      Failed to send. Please try again.
                    </p>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 pb-1 pt-3">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`h-1.5 rounded-full transition-all ${
              page === i
                ? 'w-6 bg-accent'
                : 'w-1.5 bg-text/20 hover:bg-text/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-xl border border-surface/50 bg-surface/30 text-text transition-colors hover:border-accent/40 hover:bg-accent/15 hover:text-accent"
    >
      {children}
    </a>
  );
}
