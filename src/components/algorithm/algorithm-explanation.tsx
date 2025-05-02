'use client';

import ReactMarkdown from 'react-markdown';

import type { AlgorithmData } from '@/lib/algorithms';

interface AlgorithmExplanationProps {
  algorithm: AlgorithmData;
}

export function AlgorithmExplanation({ algorithm }: AlgorithmExplanationProps) {
  return (
    <div className="space-y-6 text-black">
      <ReactMarkdown>{algorithm.explanation}</ReactMarkdown>
    </div>
  );
}
