'use client';

import { useEffect, useRef } from 'react';

interface ArrayVisualizerProps {
  data: number[];
  comparing?: number[];
  swapped?: boolean;
  target?: number;
  left?: number | null;
  right?: number | null;
  mid?: number | null;
  found?: boolean;
  notFound?: boolean;
  completed?: boolean;
}

export function ArrayVisualizer({
  data,
  comparing = [],
  swapped = false,
  target,
  left,
  right,
  mid,
  found,
  notFound,
  completed,
}: ArrayVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기 설정
    const width = canvas.width;
    const height = canvas.height;

    // 캔버스 초기화
    ctx.clearRect(0, 0, width, height);

    // 배열 요소 그리기
    const barWidth = Math.min(width / data.length - 4, 60);
    const maxValue = Math.max(...data, 1);

    data.forEach((value, index) => {
      // 막대 높이 계산 (최대 높이의 80%까지 사용)
      const barHeight = (value / maxValue) * (height * 0.8);

      // 막대 위치 계산
      const x = (width / data.length) * index + (width / data.length - barWidth) / 2;
      const y = height - barHeight - 30; // 아래에 텍스트를 위한 공간 확보

      // 막대 색상 결정
      let color = '#3b82f6'; // 기본 색�� (파란색)

      if (comparing.includes(index)) {
        color = swapped ? '#ef4444' : '#f59e0b'; // 교환 시 빨간색, 비교 시 주황색
      }

      if (completed) {
        color = '#10b981'; // 완료 시 녹색
      }

      // 이진 탐색 시각화를 위한 색상
      if (target !== undefined) {
        if (left !== null && right !== null && index >= Number(left) && index <= Number(right)) {
          color = '#8b5cf6'; // 현재 검색 범위 (보라색)
        }

        if (index === mid) {
          color = found ? '#10b981' : '#f59e0b'; // 찾은 경우 녹색, 아닌 경우 주황색
        }
      }

      // 막대 그리기
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth, barHeight);

      // 값 텍스트 그리기
      ctx.fillStyle = '#000000';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, height - 10);

      // 인덱스 텍스트 그리기
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px sans-serif';
      ctx.fillText(index.toString(), x + barWidth / 2, height - 25);
    });

    // 타겟 값 표시 (이진 탐색)
    if (target !== undefined) {
      ctx.fillStyle = '#000000';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`찾는 값: ${target}`, 10, 20);
    }
  }, [data, comparing, swapped, target, left, right, mid, found, notFound, completed]);

  return (
    <div className="flex w-full flex-col items-center">
      <canvas ref={canvasRef} width={800} height={400} className="h-auto w-full max-w-3xl" />
    </div>
  );
}
