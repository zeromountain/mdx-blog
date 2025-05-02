'use client';

import { Button } from '@heroui/button';
import { Check, Copy } from 'lucide-react';

import { useState } from 'react';

import type { AlgorithmData } from '@/lib/algorithms';

interface AlgorithmCodeProps {
  algorithm: AlgorithmData;
}

export function AlgorithmCode({ algorithm }: AlgorithmCodeProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(algorithm.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 text-black">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">구현 코드</h3>
        <Button variant="ghost" size="sm" onClick={copyToClipboard}>
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              복사됨
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              코드 복사
            </>
          )}
        </Button>
      </div>

      <div className="relative">
        <pre className="bg-muted overflow-x-auto rounded-md p-4">
          <code className="font-mono text-sm">{algorithm.code}</code>
        </pre>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">시간 복잡도</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-muted rounded-md p-3">
            <div className="text-muted-foreground text-xs">최선의 경우</div>
            <div className="font-mono">{algorithm.timeComplexity.best}</div>
          </div>
          <div className="bg-muted rounded-md p-3">
            <div className="text-muted-foreground text-xs">평균적인 경우</div>
            <div className="font-mono">{algorithm.timeComplexity.average}</div>
          </div>
          <div className="bg-muted rounded-md p-3">
            <div className="text-muted-foreground text-xs">최악의 경우</div>
            <div className="font-mono">{algorithm.timeComplexity.worst}</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium">공간 복잡도</h4>
        <div className="bg-muted mt-2 rounded-md p-3">
          <div className="font-mono">{algorithm.spaceComplexity}</div>
        </div>
      </div>
    </div>
  );
}
