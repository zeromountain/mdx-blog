'use client';

import { Button } from '@heroui/button';

import { useEffect, useRef, useState } from 'react';

interface StringVisualizerProps {
  text?: string;
  pattern?: string;
  matches?: number[];
  currentIndex?: number;
  lps?: number[];
}

export function StringVisualizer({
  text: initialText = 'ABABDABACDABABCABAB',
  pattern: initialPattern = 'ABABCABAB',
}: StringVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text] = useState(initialText);
  const [pattern] = useState(initialPattern);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // KMP 알고리즘 단계 생성
  useEffect(() => {
    const kmpSteps = generateKMPSteps(text, pattern);
    setSteps(kmpSteps);
  }, [text, pattern]);

  // KMP 알고리즘 단계 생성 함수
  const generateKMPSteps = (text: string, pattern: string) => {
    const steps = [];

    // LPS 배열 계산
    const lps = computeLPSArray(pattern);

    // 초기 상태 저장
    steps.push({
      textIndex: 0,
      patternIndex: 0,
      lps,
      matches: [],
      description: 'KMP 알고리즘 시작: LPS 배열 계산 완료',
    });

    let i = 0; // 텍스트 인덱스
    let j = 0; // 패턴 인덱스
    const matches: number[] = [];

    while (i < text.length) {
      // 현재 문자가 일치하는 경우
      if (pattern[j] === text[i]) {
        steps.push({
          textIndex: i,
          patternIndex: j,
          lps,
          matches: [...matches],
          description: `텍스트[${i}] = ${text[i]}, 패턴[${j}] = ${pattern[j]}, 일치!`,
        });

        i++;
        j++;
      }

      // 패턴을 모두 찾은 경우
      if (j === pattern.length) {
        const matchPosition = i - j;
        matches.push(matchPosition);

        steps.push({
          textIndex: i,
          patternIndex: j,
          lps,
          matches: [...matches],
          description: `패턴 발견! 위치: ${matchPosition}`,
        });

        j = lps[j - 1];

        steps.push({
          textIndex: i,
          patternIndex: j,
          lps,
          matches: [...matches],
          description: `패턴 인덱스를 LPS[${j - 1}] = ${j}로 업데이트`,
        });
      }
      // 불일치가 발생한 경우
      else if (i < text.length && pattern[j] !== text[i]) {
        if (j !== 0) {
          steps.push({
            textIndex: i,
            patternIndex: j,
            lps,
            matches: [...matches],
            description: `텍스트[${i}] = ${text[i]}, 패턴[${j}] = ${pattern[j]}, 불일치! LPS 사용`,
          });

          j = lps[j - 1];

          steps.push({
            textIndex: i,
            patternIndex: j,
            lps,
            matches: [...matches],
            description: `패턴 인덱스를 LPS[${j}] = ${j}로 업데이트`,
          });
        } else {
          steps.push({
            textIndex: i,
            patternIndex: j,
            lps,
            matches: [...matches],
            description: `텍스트[${i}] = ${text[i]}, 패턴[${j}] = ${pattern[j]}, 불일치! 텍스트 인덱스 증가`,
          });

          i++;
        }
      }
    }

    // 최종 상태 저장
    steps.push({
      textIndex: -1,
      patternIndex: -1,
      lps,
      matches,
      description: `KMP 알고리즘 완료: ${matches.length}개의 패턴 발견`,
    });

    return steps;
  };

  // LPS 배열 계산 함수
  const computeLPSArray = (pattern: string) => {
    const lps = new Array(pattern.length).fill(0);
    let length = 0;
    let i = 1;

    while (i < pattern.length) {
      if (pattern[i] === pattern[length]) {
        length++;
        lps[i] = length;
        i++;
      } else {
        if (length !== 0) {
          length = lps[length - 1];
        } else {
          lps[i] = 0;
          i++;
        }
      }
    }

    return lps;
  };

  // 다음 단계로 이동
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 이전 단계로 이동
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 처음으로 돌아가기
  const resetStep = () => {
    setCurrentStep(0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentStepData = steps[currentStep];
    if (!currentStepData) return;

    const { textIndex, patternIndex, lps, matches } = currentStepData;

    const cellWidth = 30;
    const cellHeight = 30;
    const startX = 50;
    const textY = 100;
    const patternY = 200;
    const lpsY = 250;

    // 텍스트 그리기
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 인덱스 표시
    for (let i = 0; i < text.length; i++) {
      ctx.fillStyle = '#6b7280';
      ctx.fillText(i.toString(), startX + i * cellWidth, textY - 40);
    }

    // 텍스트 문자열 그리기
    for (let i = 0; i < text.length; i++) {
      const x = startX + i * cellWidth;
      const y = textY;

      // 배경색 결정
      let bgColor = '#ffffff';

      // 현재 비교 중인 인덱스
      if (i === textIndex) {
        bgColor = '#fef3c7'; // 노란색 배경
      }

      // 매치된 부분
      for (const match of matches) {
        if (i >= match && i < match + pattern.length) {
          bgColor = '#d1fae5'; // 녹색 배경
        }
      }

      // 셀 그리기
      ctx.fillStyle = bgColor;
      ctx.fillRect(x - cellWidth / 2, y - cellHeight / 2, cellWidth, cellHeight);
      ctx.strokeStyle = '#d1d5db';
      ctx.strokeRect(x - cellWidth / 2, y - cellHeight / 2, cellWidth, cellHeight);

      // 문자 그리기
      ctx.fillStyle = '#000000';
      ctx.fillText(text[i], x, y);
    }

    // 패턴 문자열 그리기
    ctx.fillStyle = '#000000';
    ctx.fillText('패턴:', startX - 40, patternY);

    for (let i = 0; i < pattern.length; i++) {
      const x = startX + i * cellWidth;
      const y = patternY;

      // 배경색 결정
      let bgColor = '#ffffff';

      // 현재 비교 중인 패턴 인덱스
      if (i === patternIndex) {
        bgColor = '#fef3c7'; // 노란색 배경
      }

      // 셀 그리기
      ctx.fillStyle = bgColor;
      ctx.fillRect(x - cellWidth / 2, y - cellHeight / 2, cellWidth, cellHeight);
      ctx.strokeStyle = '#d1d5db';
      ctx.strokeRect(x - cellWidth / 2, y - cellHeight / 2, cellWidth, cellHeight);

      // 문자 그리기
      ctx.fillStyle = '#000000';
      ctx.fillText(pattern[i], x, y);
    }

    // LPS 배열 그리기
    if (lps && lps.length > 0) {
      ctx.fillStyle = '#000000';
      ctx.fillText('LPS:', startX - 40, lpsY);

      for (let i = 0; i < lps.length; i++) {
        const x = startX + i * cellWidth;
        const y = lpsY;

        // 셀 그리기
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(x - cellWidth / 2, y - cellHeight / 2, cellWidth, cellHeight);
        ctx.strokeStyle = '#d1d5db';
        ctx.strokeRect(x - cellWidth / 2, y - cellHeight / 2, cellWidth, cellHeight);

        // LPS 값 그리기
        ctx.fillStyle = '#000000';
        ctx.fillText(lps[i].toString(), x, y);
      }
    }

    // 설명 텍스트 표시
    if (currentStepData.description) {
      ctx.fillStyle = '#000000';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(currentStepData.description, canvas.width / 2, 50);
    }
  }, [steps, currentStep, text, pattern]);

  return (
    <div className="flex w-full flex-col items-center text-black">
      <canvas ref={canvasRef} width={800} height={300} className="h-auto w-full max-w-3xl" />

      <div className="mt-4 flex items-center space-x-4">
        <Button variant="bordered" size="sm" onClick={resetStep} disabled={currentStep === 0} className="text-black">
          처음으로
        </Button>
        <Button variant="bordered" size="sm" onClick={prevStep} disabled={currentStep === 0} className="text-black">
          이전 단계
        </Button>
        <div className="text-sm">
          단계: {currentStep + 1} / {steps.length}
        </div>
        <Button
          variant="bordered"
          size="sm"
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="text-black"
        >
          다음 단계
        </Button>
      </div>

      <p className="text-muted-foreground mt-2 text-sm">
        KMP 알고리즘 시각화 - 녹색 배경은 매치된 부분, 노란색 배경은 현재 비교 중인 위치를 나타냅니다.
      </p>
    </div>
  );
}
