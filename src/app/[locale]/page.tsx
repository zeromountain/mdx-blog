'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('common');
  return (
    <div className="flex h-[calc(100vh-60px)] flex-col items-center justify-center bg-gradient-to-b">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="text-center"
      >
        <motion.h1
          className="mb-4 text-4xl font-bold md:text-6xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('greeting')} <span className="inline-block animate-wave">👋</span>
        </motion.h1>

        <motion.h2
          className="mb-6 text-2xl text-gray-300 md:text-3xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t('subtitle')}
        </motion.h2>

        <motion.p
          className="mx-auto max-w-2xl whitespace-pre-line text-lg text-gray-400 md:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {t('description')}
        </motion.p>
      </motion.section>
    </div>
  );
}
