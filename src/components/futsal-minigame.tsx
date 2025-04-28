'use client';

import { Pause, Play, RefreshCw, Trophy } from 'lucide-react';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@nextui-org/button';

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  color: string;
  isUser?: boolean;
}

export default function FutsalMinigame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [score, setScore] = useState({ player: 0, opponent: 0 });
  const [gameMessage, setGameMessage] = useState('축구공을 클릭하여 게임 시작!');
  const [showControls, setShowControls] = useState(true);

  // 게임 상태 참조
  const gameStateRef = useRef({
    player: {
      x: 0,
      y: 0,
      width: 30,
      height: 30,
      speed: 5,
      color: '#10b981',
      isUser: true,
    },
    opponents: [] as Player[],
    ball: {
      x: 0,
      y: 0,
      radius: 10,
      speedX: 0,
      speedY: 0,
    },
    playerGoal: {
      x: 0,
      y: 0,
      width: 10,
      height: 100,
    },
    opponentGoal: {
      x: 0,
      y: 0,
      width: 10,
      height: 100,
    },
    keys: {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      Space: false,
    },
    canvasWidth: 0,
    canvasHeight: 0,
    animationFrameId: 0,
    lastTimestamp: 0,
  });

  // 게임 초기화
  const initGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    gameStateRef.current.canvasWidth = width;
    gameStateRef.current.canvasHeight = height;

    // 플레이어 초기화
    gameStateRef.current.player = {
      x: width * 0.2,
      y: height / 2,
      width: 30,
      height: 30,
      speed: 5,
      color: '#10b981',
      isUser: true,
    };

    // 상대 선수 초기화
    gameStateRef.current.opponents = [
      {
        x: width * 0.7,
        y: height / 2 - 50,
        width: 30,
        height: 30,
        speed: 2,
        color: '#ef4444',
      },
      {
        x: width * 0.7,
        y: height / 2 + 50,
        width: 30,
        height: 30,
        speed: 2,
        color: '#ef4444',
      },
    ];

    // 공 초기화
    gameStateRef.current.ball = {
      x: width / 2,
      y: height / 2,
      radius: 10,
      speedX: 0,
      speedY: 0,
    };

    // 골대 초기화
    gameStateRef.current.playerGoal = {
      x: 0,
      y: height / 2 - 50,
      width: 10,
      height: 100,
    };

    gameStateRef.current.opponentGoal = {
      x: width - 10,
      y: height / 2 - 50,
      width: 10,
      height: 100,
    };

    setScore({ player: 0, opponent: 0 });
    setGameMessage('게임 시작!');
    setTimeout(() => setGameMessage(''), 1500);
  };

  // 게임 시작
  const startGame = () => {
    if (gameStarted && !gamePaused) return;

    initGame();
    setGameStarted(true);
    setGamePaused(false);
    setShowControls(false);

    // 키보드 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 게임 루프 시작
    gameStateRef.current.lastTimestamp = performance.now();
    gameStateRef.current.animationFrameId = requestAnimationFrame(gameLoop);
  };

  // 게임 일시정지/재개
  const togglePause = () => {
    if (!gameStarted) return;

    if (gamePaused) {
      setGamePaused(false);
      gameStateRef.current.lastTimestamp = performance.now();
      gameStateRef.current.animationFrameId = requestAnimationFrame(gameLoop);
    } else {
      setGamePaused(true);
      cancelAnimationFrame(gameStateRef.current.animationFrameId);
    }
  };

  // 게임 재시작
  const restartGame = () => {
    cancelAnimationFrame(gameStateRef.current.animationFrameId);
    initGame();
    setGamePaused(false);
    gameStateRef.current.lastTimestamp = performance.now();
    gameStateRef.current.animationFrameId = requestAnimationFrame(gameLoop);
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'ArrowUp') gameStateRef.current.keys.ArrowUp = true;
    if (e.code === 'ArrowDown') gameStateRef.current.keys.ArrowDown = true;
    if (e.code === 'ArrowLeft') gameStateRef.current.keys.ArrowLeft = true;
    if (e.code === 'ArrowRight') gameStateRef.current.keys.ArrowRight = true;
    if (e.code === 'Space') gameStateRef.current.keys.Space = true;

    // 방향키로 스크롤 방지
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
      e.preventDefault();
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'ArrowUp') gameStateRef.current.keys.ArrowUp = false;
    if (e.code === 'ArrowDown') gameStateRef.current.keys.ArrowDown = false;
    if (e.code === 'ArrowLeft') gameStateRef.current.keys.ArrowLeft = false;
    if (e.code === 'ArrowRight') gameStateRef.current.keys.ArrowRight = false;
    if (e.code === 'Space') gameStateRef.current.keys.Space = false;
  };

  // 게임 루프
  const gameLoop = (timestamp: number) => {
    const deltaTime = timestamp - gameStateRef.current.lastTimestamp;
    gameStateRef.current.lastTimestamp = timestamp;

    updateGame(deltaTime / 16); // 60fps 기준으로 정규화
    renderGame();

    gameStateRef.current.animationFrameId = requestAnimationFrame(gameLoop);
  };

  // 게임 상태 업데이트
  const updateGame = (deltaTime: number) => {
    const { player, opponents, ball, keys, canvasWidth, canvasHeight, playerGoal, opponentGoal } = gameStateRef.current;

    // 플레이어 이동
    if (keys.ArrowUp) player.y -= player.speed * deltaTime;
    if (keys.ArrowDown) player.y += player.speed * deltaTime;
    if (keys.ArrowLeft) player.x -= player.speed * deltaTime;
    if (keys.ArrowRight) player.x += player.speed * deltaTime;

    // 플레이어 경계 체크
    player.x = Math.max(player.width / 2, Math.min(canvasWidth - player.width / 2, player.x));
    player.y = Math.max(player.height / 2, Math.min(canvasHeight - player.height / 2, player.y));

    // 상대 선수 AI
    opponents.forEach((opponent) => {
      // 공을 향해 이동
      const dx = ball.x - opponent.x;
      const dy = ball.y - opponent.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 10) {
        opponent.x += (dx / distance) * opponent.speed * deltaTime;
        opponent.y += (dy / distance) * opponent.speed * deltaTime;
      }
    });

    // 공 이동
    ball.x += ball.speedX * deltaTime;
    ball.y += ball.speedY * deltaTime;

    // 공 감속 (마찰)
    ball.speedX *= 0.98;
    ball.speedY *= 0.98;

    // 공 벽 충돌
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvasWidth) {
      // 골대 영역인지 확인
      if (
        (ball.x - ball.radius < playerGoal.x + playerGoal.width &&
          ball.y > playerGoal.y &&
          ball.y < playerGoal.y + playerGoal.height) ||
        (ball.x + ball.radius > opponentGoal.x &&
          ball.y > opponentGoal.y &&
          ball.y < opponentGoal.y + opponentGoal.height)
      ) {
        // 골인!
        if (ball.x - ball.radius < playerGoal.x + playerGoal.width) {
          // 상대 득점
          setScore((prev) => ({ ...prev, opponent: prev.opponent + 1 }));
          setGameMessage('상대 팀 득점!');
        } else {
          // 플레이어 득점
          setScore((prev) => ({ ...prev, player: prev.player + 1 }));
          setGameMessage('득점!');
        }

        // 공 위치 초기화
        ball.x = canvasWidth / 2;
        ball.y = canvasHeight / 2;
        ball.speedX = 0;
        ball.speedY = 0;

        setTimeout(() => setGameMessage(''), 1500);
      } else {
        // 일반 벽 충돌
        ball.speedX = -ball.speedX * 0.8;
        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
        } else {
          ball.x = canvasWidth - ball.radius;
        }
      }
    }

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvasHeight) {
      ball.speedY = -ball.speedY * 0.8;
      if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
      } else {
        ball.y = canvasHeight - ball.radius;
      }
    }

    // 플레이어와 공 충돌
    const playerBallDx = player.x - ball.x;
    const playerBallDy = player.y - ball.y;
    const playerBallDistance = Math.sqrt(playerBallDx * playerBallDx + playerBallDy * playerBallDy);

    if (playerBallDistance < player.width / 2 + ball.radius) {
      // 충돌 시 공에 힘 전달
      const power = keys.Space ? 15 : 5; // 스페이스바 누르면 강한 슛

      const angle = Math.atan2(playerBallDy, playerBallDx);
      ball.speedX = -Math.cos(angle) * power;
      ball.speedY = -Math.sin(angle) * power;
    }

    // 상대 선수와 공 충돌
    opponents.forEach((opponent) => {
      const opponentBallDx = opponent.x - ball.x;
      const opponentBallDy = opponent.y - ball.y;
      const opponentBallDistance = Math.sqrt(opponentBallDx * opponentBallDx + opponentBallDy * opponentBallDy);

      if (opponentBallDistance < opponent.width / 2 + ball.radius) {
        // 충돌 시 공에 힘 전달
        const angle = Math.atan2(opponentBallDy, opponentBallDx);
        ball.speedX = -Math.cos(angle) * 3;
        ball.speedY = -Math.sin(angle) * 3;
      }
    });
  };

  // 게임 렌더링
  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { player, opponents, ball, playerGoal, opponentGoal } = gameStateRef.current;

    // 캔버스 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 필드 그리기
    ctx.fillStyle = '#0a3b0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 중앙선 그리기
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // 중앙원 그리기
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
    ctx.stroke();

    // 골대 그리기
    ctx.fillStyle = 'white';
    ctx.fillRect(playerGoal.x, playerGoal.y, playerGoal.width, playerGoal.height);
    ctx.fillRect(opponentGoal.x, opponentGoal.y, opponentGoal.width, opponentGoal.height);

    // 플레이어 그리기
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.width / 2, 0, Math.PI * 2);
    ctx.fill();

    // 상대 선수 그리기
    opponents.forEach((opponent) => {
      ctx.fillStyle = opponent.color;
      ctx.beginPath();
      ctx.arc(opponent.x, opponent.y, opponent.width / 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // 공 그리기
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // 공 패턴 그리기
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // 메시지 그리기
    if (gameMessage) {
      ctx.fillStyle = 'white';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(gameMessage, canvas.width / 2, canvas.height / 2 - 50);
    }
  };

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 캔버스 크기 설정
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = 400;

        if (gameStarted) {
          initGame();
        } else {
          // 초기 화면 그리기
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0a3b0a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 중앙선 그리기
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.stroke();

            // 중앙원 그리기
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
            ctx.stroke();

            // 공 그리기
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 12, 0, Math.PI * 2);
            ctx.fill();

            // 시작 메시지
            ctx.fillStyle = 'white';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('축구공을 클릭하여 게임 시작!', canvas.width / 2, canvas.height / 2 - 50);
          }
        }
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // 클릭 이벤트 핸들러
    const handleCanvasClick = (e: MouseEvent) => {
      if (!gameStarted) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 중앙 공을 클릭했는지 확인
        const dx = x - canvas.width / 2;
        const dy = y - canvas.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) {
          startGame();
        }
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(gameStateRef.current.animationFrameId);
    };
  }, [gameStarted]);

  return (
    <div className="w-full rounded-lg bg-black/50 p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">풋살 미니게임</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full bg-green-500/20 px-3 py-1 text-green-500">
            <Trophy className="mr-1 h-4 w-4" />
            <span>
              {score.player} - {score.opponent}
            </span>
          </div>
          {gameStarted && (
            <>
              <Button
                size="sm"
                variant="light"
                className="border-green-500 text-green-500 hover:bg-green-500/10"
                onClick={togglePause}
              >
                {gamePaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="light"
                className="border-green-500 text-green-500 hover:bg-green-500/10"
                onClick={restartGame}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="relative w-full">
        <canvas ref={canvasRef} className="h-[400px] w-full cursor-pointer rounded-md" />

        {showControls && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-black/70 text-white">
            <h4 className="mb-4 text-lg font-bold">게임 조작법</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="rounded bg-white/20 px-2 py-1">↑↓←→</span>
                <span>플레이어 이동</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="rounded bg-white/20 px-2 py-1">Space</span>
                <span>강한 슛</span>
              </li>
            </ul>
            <Button className="mt-6 bg-green-500 text-white hover:bg-green-600" onClick={startGame}>
              게임 시작
            </Button>
          </div>
        )}
      </div>

      {gameStarted && !showControls && (
        <div className="mt-2 text-center text-xs text-gray-400">방향키로 이동, 스페이스바로 강한 슛</div>
      )}
    </div>
  );
}
