'use client';

import { motion } from 'framer-motion';

export default function Home() {
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
          안녕하세요! <span className="animate-wave inline-block">👋</span>
        </motion.h1>

        <motion.h2
          className="mb-6 text-2xl text-gray-300 md:text-3xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          프론트엔드 개발자 손영산입니다
        </motion.h2>

        <motion.p
          className="mx-auto max-w-2xl whitespace-pre-line text-lg text-gray-400 md:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          창의적인 문제 해결과 사용자 중심의 웹 경험 창출에 열정을 가지고 있습니다.{'\n'} React, TypeScript, Next.js를
          사용해 개발하고 있으며,{'\n'} 새로운 기술을 배우고 성장하는 것에 즐거움을 느낍니다.
        </motion.p>
      </motion.section>
    </div>
  );
}
