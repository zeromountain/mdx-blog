'use client';

import { Button } from '@heroui/button';

import { useEffect, useRef, useState } from 'react';

export function TreeVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [nodes, setNodes] = useState<{ data: number; x: number; y: number }[]>([
    { data: 10, x: 100, y: 200 },
    { data: 20, x: 200, y: 200 },
    { data: 30, x: 300, y: 200 },
    { data: 40, x: 400, y: 200 },
    { data: 50, x: 500, y: 200 },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<any[]>([]);
  const [newNodeValue, setNewNodeValue] = useState<number>(60);

  // 초기 단계 설정
  useEffect(() => {
    setSteps([
      {
        nodes: [...nodes],
        description: '초기 연결 리스트 상태',
        highlight: null,
      },
    ]);
  }, []);

  // 노드 추가 연산
  const appendNode = () => {
    setOperation('append');

    const newSteps = [];

    // 초기 상태
    newSteps.push({
      nodes: [...nodes],
      description: '새 노드를 추가하기 전 연결 리스트 상태',
      highlight: null,
    });

    // 새 노드 생성
    const newNode = {
      data: newNodeValue,
      x: nodes.length > 0 ? nodes[nodes.length - 1].x + 100 : 100,
      y: 200,
    };

    newSteps.push({
      nodes: [...nodes],
      newNode,
      description: `새 노드 생성: 값 = ${newNodeValue}`,
      highlight: null,
    });

    // 마지막 노드 찾기
    if (nodes.length > 0) {
      newSteps.push({
        nodes: [...nodes],
        newNode,
        description: '마지막 노드를 찾는 중...',
        highlight: nodes.length - 1,
      });
    }

    // 새 노드 연결
    const updatedNodes = [...nodes, newNode];
    newSteps.push({
      nodes: updatedNodes,
      description: '새 노드를 연결 리스트 끝에 추가',
      highlight: nodes.length,
    });

    // 최종 상태
    newSteps.push({
      nodes: updatedNodes,
      description: '노드 추가 완료',
      highlight: null,
    });

    setSteps(newSteps);
    setCurrentStep(0);
    setNodes(updatedNodes);
    setNewNodeValue(newNodeValue + 10);
  };

  // 노드 삭제 연산
  const removeNode = () => {
    if (nodes.length === 0) return;

    setOperation('remove');

    const newSteps = [];

    // 초기 상태
    newSteps.push({
      nodes: [...nodes],
      description: '노드를 삭제하기 전 연결 리스트 상태',
      highlight: null,
    });

    // 마지막 노드 하이라이트
    newSteps.push({
      nodes: [...nodes],
      description: '삭제할 마지막 노드 선택',
      highlight: nodes.length - 1,
    });

    // 이전 노드 하이라이트 (있는 경우)
    if (nodes.length > 1) {
      newSteps.push({
        nodes: [...nodes],
        description: '이전 노드의 next 포인터를 null로 변경',
        highlight: nodes.length - 2,
      });
    }

    // 노드 삭제
    const updatedNodes = nodes.slice(0, -1);
    newSteps.push({
      nodes: updatedNodes,
      description: '마지막 노드 삭제 완료',
      highlight: null,
    });

    setSteps(newSteps);
    setCurrentStep(0);
    setNodes(updatedNodes);
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

  // 연�� 취소
  const cancelOperation = () => {
    setOperation(null);
    setSteps([
      {
        nodes: [...nodes],
        description: '연결 리스트 현재 상태',
        highlight: null,
      },
    ]);
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

    const displayNodes = currentStepData.nodes;
    const highlight = currentStepData.highlight;
    const newNode = currentStepData.newNode;

    // 노드 간 연결 그리기
    for (let i = 0; i < displayNodes.length - 1; i++) {
      const current = displayNodes[i];
      const next = displayNodes[i + 1];

      // 화살표 그리기
      ctx.beginPath();
      ctx.moveTo(current.x + 25, current.y);
      ctx.lineTo(next.x - 25, current.y);
      ctx.strokeStyle = i === highlight || i + 1 === highlight ? '#f59e0b' : '#6b7280';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 화살표 머리 그리기
      ctx.beginPath();
      ctx.moveTo(next.x - 25, current.y);
      ctx.lineTo(next.x - 35, current.y - 5);
      ctx.lineTo(next.x - 35, current.y + 5);
      ctx.fillStyle = i === highlight || i + 1 === highlight ? '#f59e0b' : '#6b7280';
      ctx.fill();
    }

    // 노드 그리기
    displayNodes.forEach((node: { data: number; x: number; y: number }, index: number) => {
      // 노드 원 그리기
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
      ctx.fillStyle = index === highlight ? '#f59e0b' : '#3b82f6';
      ctx.fill();

      // 노드 값 표시
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.data.toString(), node.x, node.y);

      // next 포인터 표시
      if (index !== displayNodes.length - 1) {
        ctx.fillStyle = '#000000';
        ctx.font = '12px sans-serif';
        ctx.fillText('next', node.x + 50, node.y - 15);
      } else {
        // 마지막 노드의 next는 null
        ctx.fillStyle = '#000000';
        ctx.font = '12px sans-serif';
        ctx.fillText('null', node.x + 50, node.y);
      }
    });

    // 헤드 포인터 표시
    if (displayNodes.length > 0) {
      ctx.fillStyle = '#000000';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('head', displayNodes[0].x - 35, displayNodes[0].y);

      // 헤드 화살표 그리기
      ctx.beginPath();
      ctx.moveTo(displayNodes[0].x - 30, displayNodes[0].y);
      ctx.lineTo(displayNodes[0].x - 25, displayNodes[0].y);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 화살표 머리 그리기
      ctx.beginPath();
      ctx.moveTo(displayNodes[0].x - 25, displayNodes[0].y);
      ctx.lineTo(displayNodes[0].x - 35, displayNodes[0].y - 5);
      ctx.lineTo(displayNodes[0].x - 35, displayNodes[0].y + 5);
      ctx.fillStyle = '#000000';
      ctx.fill();
    }

    // 새 노드 그리기 (추가 연산 중일 때)
    if (newNode) {
      ctx.beginPath();
      ctx.arc(newNode.x, newNode.y, 25, 0, 2 * Math.PI);
      ctx.fillStyle = '#10b981'; // 녹색
      ctx.fill();

      // 노드 값 표시
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(newNode.data.toString(), newNode.x, newNode.y);
    }

    // 설명 텍스트 표시
    if (currentStepData.description) {
      ctx.fillStyle = '#000000';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(currentStepData.description, canvas.width / 2, 50);
    }
  }, [steps, currentStep]);

  return (
    <div className="flex w-full flex-col items-center overflow-x-auto text-black">
      <canvas ref={canvasRef} width={600} height={300} className="h-auto w-full max-w-3xl" />

      {!operation ? (
        <div className="mt-4 flex items-center space-x-4">
          <Button variant="bordered" size="sm" onClick={appendNode} className="text-black">
            노드 추가
          </Button>
          <Button
            variant="bordered"
            size="sm"
            onClick={removeNode}
            disabled={nodes.length === 0}
            className="text-black"
          >
            노드 삭제
          </Button>
        </div>
      ) : (
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
          <Button variant="bordered" size="sm" onClick={cancelOperation} className="text-black">
            완료
          </Button>
        </div>
      )}

      <p className="text-muted-foreground mt-2 text-sm">
        연결 리스트 시각화 - 각 노드는 데이터와 다음 노드를 가리키는 참조를 포함합니다.
      </p>
    </div>
  );
}
