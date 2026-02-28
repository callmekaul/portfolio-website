'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Desktop from '@/components/desktop/Desktop';
import SplashScreen from '@/components/SplashScreen';

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!entered && (
          <SplashScreen onEnter={() => setEntered(true)} />
        )}
      </AnimatePresence>
      {entered && <Desktop />}
    </>
  );
}
