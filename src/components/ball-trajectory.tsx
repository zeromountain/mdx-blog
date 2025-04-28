'use client';

import { useEffect, useRef } from 'react';

export default function BallTrajectory() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trajectoryRef = useRef<{
    active: boolean;
    points: { x: number; y: number; opacity: number }[];
  }>({
    active: false,
    points: [],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 캔버스 크기 설정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 마우스 이벤트 리스너
    const handleMouseDown = () => {
      trajectoryRef.current.active = true;
      trajectoryRef.current.points = [];
    };

    const handleMouseUp = () => {
      trajectoryRef.current.active = false;

      // 궤적 페이드 아웃
      const fadeInterval = setInterval(() => {
        trajectoryRef.current.points.forEach((point) => {
          point.opacity -= 0.05;
        });

        // 모든 점이 사라지면 배열 비우기
        if (trajectoryRef.current.points.every((point) => point.opacity <= 0)) {
          trajectoryRef.current.points = [];
          clearInterval(fadeInterval);
        }

        drawTrajectory();
      }, 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!trajectoryRef.current.active) return;

      // 새 점 추가 (5px 간격으로)
      const lastPoint = trajectoryRef.current.points[trajectoryRef.current.points.length - 1];
      if (!lastPoint || Math.sqrt(Math.pow(e.clientX - lastPoint.x, 2) + Math.pow(e.clientY - lastPoint.y, 2)) > 5) {
        trajectoryRef.current.points.push({
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
        });
      }

      drawTrajectory();
    };

    // 궤적 그리기
    const drawTrajectory = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 점 그리기
      trajectoryRef.current.points.forEach((point, index) => {
        if (point.opacity <= 0) return;

        // 공 그리기
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3 * point.opacity, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${point.opacity * 0.7})`;
        ctx.fill();

        // 선 그리기 (두 번째 점부터)
        if (index > 0) {
          const prevPoint = trajectoryRef.current.points[index - 1];
          ctx.beginPath();
          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(point.x, point.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${point.opacity * 0.5})`;
          ctx.lineWidth = 2 * point.opacity;
          ctx.stroke();
        }
      });
    };

    // 이벤트 리스너 등록
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-20 h-full w-full" />;
}
