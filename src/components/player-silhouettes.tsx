'use client';

import { gsap } from 'gsap';

import { useEffect, useRef } from 'react';

// 선수 실루엣 SVG 경로 데이터
const playerPaths = [
  'M10,50 C10,30 15,20 25,15 C30,12 35,12 40,15 C45,18 47,25 47,30 C47,35 45,40 40,42 C38,43 35,43 32,42 L32,60 L28,60 L28,42 C25,43 22,43 20,42 C15,40 13,35 13,30 C13,25 15,20 20,18 C22,17 25,17 28,18 L28,10 L32,10 L32,18 C35,17 38,17 40,18 C42,19 43,20 44,22 L50,15 L53,18 L47,25 C48,27 48,30 47,32 L53,38 L50,41 L44,35 C43,37 42,38 40,39 L40,60 L36,60 L36,39 C33,40 30,40 27,39 L27,60 L23,60 L23,39 C20,38 18,36 17,33 L10,40 L7,37 L14,30 C13,28 13,25 14,23 L7,16 L10,13 L17,20 C18,18 20,17 22,16',
  'M30,10 C40,10 48,18 48,28 C48,38 40,46 30,46 C20,46 12,38 12,28 C12,18 20,10 30,10 Z M30,14 C22,14 16,20 16,28 C16,36 22,42 30,42 C38,42 44,36 44,28 C44,20 38,14 30,14 Z M22,60 L22,46 L38,46 L38,60 L22,60 Z',
  'M25,10 C35,10 43,18 43,28 C43,35 38,40 33,42 L33,60 L29,60 L29,42 C24,40 19,35 19,28 C19,18 27,10 37,10 Z M30,14 C24,14 19,20 19,26 C19,32 24,38 30,38 C36,38 41,32 41,26 C41,20 36,14 30,14 Z',
];

interface PlayerSilhouette {
  id: number;
  path: string;
  x: number;
  y: number;
  scale: number;
  speed: number;
  direction: number;
}

export default function PlayerSilhouettes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playersRef = useRef<PlayerSilhouette[]>([]);

  // 선수 실루엣 초기화
  useEffect(() => {
    if (!containerRef.current) return;

    // 5-8명의 선수 생성
    const playerCount = Math.floor(Math.random() * 4) + 5;
    const players: PlayerSilhouette[] = [];

    for (let i = 0; i < playerCount; i++) {
      players.push({
        id: i,
        path: playerPaths[Math.floor(Math.random() * playerPaths.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0.5 + Math.random() * 0.5, // 0.5 ~ 1.0 사이의 크기
        speed: 0.5 + Math.random() * 1.5, // 0.5 ~ 2.0 사이의 속도
        direction: Math.random() * Math.PI * 2, // 0 ~ 2π 사이의 방향
      });
    }

    playersRef.current = players;

    // 선수 실루엣 요소 생성
    players.forEach((player) => {
      const playerElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      playerElement.setAttribute('d', player.path);
      playerElement.setAttribute('fill', 'rgba(16, 185, 129, 0.2)');
      playerElement.setAttribute('stroke', 'rgba(16, 185, 129, 0.5)');
      playerElement.setAttribute('stroke-width', '1');
      playerElement.setAttribute('id', `player-${player.id}`);

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '60');
      svg.setAttribute('height', '60');
      svg.setAttribute('viewBox', '0 0 60 60');
      svg.setAttribute('class', 'absolute pointer-events-none');
      svg.setAttribute('id', `svg-${player.id}`);
      svg.appendChild(playerElement);

      if (containerRef.current) {
        containerRef.current.appendChild(svg);
      }

      // 초기 위치 설정
      gsap.set(`#svg-${player.id}`, {
        x: player.x,
        y: player.y,
        scale: player.scale,
        rotation: (player.direction * 180) / Math.PI + 90, // 방향에 따른 회전
      });
    });

    // 애니메이션 시작
    const animateId = requestAnimationFrame(animatePlayers);

    return () => {
      cancelAnimationFrame(animateId);
      // 생성된 SVG 요소 제거
      players.forEach((player) => {
        const svg = document.getElementById(`svg-${player.id}`);
        if (svg && containerRef.current) {
          containerRef.current.removeChild(svg);
        }
      });
    };
  }, []);

  // 선수 움직임 애니메이션
  const animatePlayers = () => {
    if (!containerRef.current) return;

    playersRef.current.forEach((player) => {
      // 현재 위치 업데이트
      player.x += Math.cos(player.direction) * player.speed;
      player.y += Math.sin(player.direction) * player.speed;

      // 화면 경계 체크 및 방향 전환
      if (player.x < -30) player.x = window.innerWidth + 30;
      if (player.x > window.innerWidth + 30) player.x = -30;
      if (player.y < -30) player.y = window.innerHeight + 30;
      if (player.y > window.innerHeight + 30) player.y = -30;

      // 가끔 방향 변경 (5% 확률)
      if (Math.random() < 0.005) {
        player.direction = Math.random() * Math.PI * 2;

        // 방향에 따른 회전 애니메이션
        gsap.to(`#svg-${player.id}`, {
          rotation: (player.direction * 180) / Math.PI + 90,
          duration: 0.5,
          ease: 'power1.out',
        });
      }

      // 위치 업데이트
      gsap.set(`#svg-${player.id}`, {
        x: player.x,
        y: player.y,
      });
    });

    requestAnimationFrame(animatePlayers);
  };

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden" />;
}
