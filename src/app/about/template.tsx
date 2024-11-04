'use client';

import { motion } from 'framer-motion';

import { PropsWithChildren } from 'react';

export default function Template({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
