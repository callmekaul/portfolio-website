'use client';

import { useState, FormEvent } from 'react';
import { about } from '@/data/about';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactWindow() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

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

  return (
    <div className="space-y-6">
      {/* Socials */}
      <div>
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-cyan-400/40">
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
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-400/40">
          Send a Message
        </p>

        {/* Honeypot — hidden from real users, bots auto-fill it */}
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
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-base text-white/80 outline-none placeholder:text-white/20 focus:border-cyan-400/25"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-base text-white/80 outline-none placeholder:text-white/20 focus:border-cyan-400/25"
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-base text-white/80 outline-none placeholder:text-white/20 focus:border-cyan-400/25"
        />

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full rounded-lg border border-cyan-400/15 bg-cyan-400/[0.07] py-3 text-base text-cyan-300/70 transition-colors hover:bg-cyan-400/[0.12] disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'sent' && (
          <p className="text-center text-sm text-green-400/70">
            Message sent successfully!
          </p>
        )}
        {status === 'error' && (
          <p className="text-center text-sm text-red-400/70">
            Failed to send. Please try again.
          </p>
        )}
      </form>
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
      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/40 transition-colors hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-cyan-300/70"
    >
      {children}
    </a>
  );
}
