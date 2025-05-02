'use client';

import { Button } from '@heroui/button';

import { useEffect, useRef, useState } from 'react';

interface FibonacciVisualizerProps {
  n: number;
}

export function FibonacciVisualizer({ n = 10 }: FibonacciVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentN, setCurrentN] = useState(0);
  const [fibonacci, setFibonacci] = useState<number[]>([0, 1]);
  const [callTree, setCallTree] = useState<{ [key: number]: number }>({});
  const [showCallTree, setShowCallTree] = useState(false);

  // 피보나치 수열 계산 및 호출 트리 생성
  useEffect(() => {
    if (currentN <= 1) {
      setFibonacci([0, 1].slice(0, currentN + 1));
      setCallTree({});
      return;
    }

    const fib = [0, 1];
    const calls: { [key: number]: number } = {};

    // 메모이제이션을 사용하여 호출 횟수 추적
    const fibWithCalls = (n: number, memo: { [key: number]: number } = {}): number => {
      if (n in memo) return memo[n];

      calls[n] = (calls[n] || 0) + 1;

      if (n <= 1) return n;

      memo[n] = fibWithCalls(n - 1, memo) + fibWithCalls(n - 2, memo);
      return memo[n];
    };

    // 순차적으로 계산
    for (let i = 2; i <= currentN; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }

    // 호출 트리 계산 (재귀 호출 시뮬레이션)
    if (currentN > 1) {
      fibWithCalls(currentN);
    }

    setFibonacci(fib);
    setCallTree(calls);
  }, [currentN]);

  // 다음 단계로 이동
  const nextStep = () => {
    if (currentN < n) {
      setCurrentN(currentN + 1);
    }
  };

  // 이전 단계로 이동
  const prevStep = () => {
    if (currentN > 0) {
      setCurrentN(currentN - 1);
    }
  };

  // 처음으로 돌아가기
  const resetStep = () => {
    setCurrentN(0);
  };

  // 호출 트리 표시 토글
  const toggleCallTree = () => {
    setShowCallTree(!showCallTree);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 시각화 설정
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const barWidth = (width - padding * 2) / (n + 1);
    const maxValue = Math.max(...fibonacci, 1);
    const scale = (height - padding * 2) / maxValue;

    // 막대 그래프 그리기
    fibonacci.forEach((value, index) => {
      const x = padding + index * barWidth;
      const barHeight = value * scale;
      const y = height - padding - barHeight;

      // 막대 그리기
      ctx.fillStyle = index === currentN ? '#10b981' : '#3b82f6';
      ctx.fillRect(x, y, barWidth - 4, barHeight);

      // 값 표시
      ctx.fillStyle = '#000000';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 10);

      // 인덱스 표시
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px sans-serif';
      ctx.fillText(index.toString(), x + barWidth / 2, height - padding + 15);
    });

    // X축 그리기
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.strokeStyle = '#d1d5db';
    ctx.stroke();

    // Y축 그리기
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // 호출 트리 그리기 (선택적)
    if (showCallTree && currentN > 1) {
      const treeStartX = width / 2;
      const treeStartY = 50;
      const nodeRadius = 15;
      const levelHeight = 40;

      // 루트 노드 그리기
      ctx.beginPath();
      ctx.arc(treeStartX, treeStartY, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#8b5cf6';
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`F(${currentN})`, treeStartX, treeStartY);

      // 호출 횟수 표시
      if (currentN > 1) {
        ctx.fillStyle = '#000000';
        ctx.font = '10px sans-serif';
        ctx.fillText(`호출: ${callTree[currentN] || 1}회`, treeStartX, treeStartY + 25);
      }

      // 자식 노드 그리기 (간단한 표현)
      if (currentN > 1) {
        // F(n-1) 노드
        const leftX = treeStartX - 50;
        const leftY = treeStartY + levelHeight;

        ctx.beginPath();
        ctx.arc(leftX, leftY, nodeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = '12px sans-serif';
        ctx.fillText(`F(${currentN - 1})`, leftX, leftY);

        // F(n-2) 노드
        const rightX = treeStartX + 50;
        const rightY = treeStartY + levelHeight;

        ctx.beginPath();
        ctx.arc(rightX, rightY, nodeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = '12px sans-serif';
        ctx.fillText(`F(${currentN - 2})`, rightX, rightY);

        // 연결선 그리기
        ctx.beginPath();
        ctx.moveTo(treeStartX, treeStartY + nodeRadius);
        ctx.lineTo(leftX, leftY - nodeRadius);
        ctx.strokeStyle = '#6b7280';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(treeStartX, treeStartY + nodeRadius);
        ctx.lineTo(rightX, rightY - nodeRadius);
        ctx.stroke();
      }
    }
  }, [fibonacci, currentN, n, showCallTree, callTree]);

  return (
    <div className="flex w-full flex-col items-center text-black">
      <canvas ref={canvasRef} width={800} height={400} className="h-auto w-full max-w-3xl" />

      <div className="mt-4 flex items-center space-x-4">
        <Button variant="bordered" size="sm" onClick={resetStep} disabled={currentN === 0} className="text-black">
          처음으로
        </Button>
        <Button variant="bordered" size="sm" onClick={prevStep} disabled={currentN === 0} className="text-black">
          이전 단계
        </Button>
        <div className="text-sm">
          F({currentN}) = {fibonacci[currentN]}
        </div>
        <Button variant="bordered" size="sm" onClick={nextStep} disabled={currentN === n} className="text-black">
          다음 단계
        </Button>
        <Button variant="bordered" size="sm" onClick={toggleCallTree} className="text-black">
          {showCallTree ? '호출 트리 숨기기' : '호출 트리 보기'}
        </Button>
      </div>

      <p className="text-muted-foreground mt-2 text-sm">
        피보나치 수열의 처음 {currentN + 1}개 항목을 보여줍니다. F(n) = F(n-1) + F(n-2)
      </p>
    </div>
  );
}
