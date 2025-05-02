'use client';

import { Button } from '@heroui/button';

import { useEffect, useRef, useState } from 'react';

interface GraphNode {
  id: string;
  x: number;
  y: number;
  distance?: number;
  visited?: boolean;
  isSource?: boolean;
}

interface GraphEdge {
  from: string;
  to: string;
  weight: number;
  active?: boolean;
}

interface GraphVisualizerProps {
  data: any;
  algorithm?: string;
  step?: number;
}

export function GraphVisualizer({ algorithm = 'dijkstra' }: GraphVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: 'A', x: 100, y: 100 },
    { id: 'B', x: 300, y: 50 },
    { id: 'C', x: 350, y: 250 },
    { id: 'D', x: 200, y: 300 },
    { id: 'E', x: 500, y: 150 },
  ]);
  const [edges, setEdges] = useState<GraphEdge[]>([
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'D', weight: 2 },
    { from: 'B', to: 'C', weight: 3 },
    { from: 'B', to: 'E', weight: 5 },
    { from: 'C', to: 'E', weight: 1 },
    { from: 'D', to: 'C', weight: 6 },
  ]);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // 다익스트라 알고리즘 단계 생성
  useEffect(() => {
    if (algorithm === 'dijkstra') {
      const dijkstraSteps = generateDijkstraSteps('A');
      setSteps(dijkstraSteps);
    }
  }, [algorithm]);

  // 현재 단계에 따라 노드와 엣지 상태 업데이트
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];

      // 노드 상태 업데이트
      const updatedNodes = nodes.map((node) => ({
        ...node,
        distance: step.distances[node.id],
        visited: step.visited.includes(node.id),
        isSource: node.id === step.source,
      }));

      // 엣지 상태 업데이트
      const updatedEdges = edges.map((edge) => ({
        ...edge,
        active: step.activeEdges.some((e: any) => e.from === edge.from && e.to === edge.to),
      }));

      setNodes(updatedNodes);
      setEdges(updatedEdges);
    }
  }, [currentStep, steps]);

  // 다익스트라 알고리즘 단계 생성 함수
  const generateDijkstraSteps = (source: string) => {
    const steps = [];
    const distances: Record<string, number> = {};
    const visited: string[] = [];
    const activeEdges: { from: string; to: string }[] = [];

    // 그래프 생성
    const graph: Record<string, Array<[string, number]>> = {};
    nodes.forEach((node) => {
      graph[node.id] = [];
    });

    edges.forEach((edge) => {
      graph[edge.from].push([edge.to, edge.weight]);
    });

    // 초기화
    nodes.forEach((node) => {
      distances[node.id] = node.id === source ? 0 : Number.POSITIVE_INFINITY;
    });

    // 초기 상태 저장
    steps.push({
      distances: { ...distances },
      visited: [...visited],
      activeEdges: [...activeEdges],
      source,
    });

    // 다익스트라 알고리즘 실행
    for (let i = 0; i < nodes.length; i++) {
      // 방문하지 않은 노드 중 최소 거리 노드 찾기
      let minDistance = Number.POSITIVE_INFINITY;
      let minNode = '';

      for (const node of nodes) {
        if (!visited.includes(node.id) && distances[node.id] < minDistance) {
          minDistance = distances[node.id];
          minNode = node.id;
        }
      }

      // 모든 노드가 방문되었거나 연결되지 않은 노드만 남은 경우
      if (minNode === '') break;

      // 노드 방문 처리
      visited.push(minNode);

      // 인접 노드 거리 업데이트
      for (const [neighbor, weight] of graph[minNode]) {
        const newDistance = distances[minNode] + weight;

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          const filteredActiveEdges = activeEdges.filter((e) => e.to !== neighbor);
          activeEdges.splice(0, activeEdges.length, ...filteredActiveEdges, { from: minNode, to: neighbor });
        }
      }

      // 현재 상태 저장
      steps.push({
        distances: { ...distances },
        visited: [...visited],
        activeEdges: [...activeEdges],
        source,
        current: minNode,
      });
    }

    return steps;
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

    // 간선 그리기
    edges.forEach((edge) => {
      const from = nodes.find((n) => n.id === edge.from);
      const to = nodes.find((n) => n.id === edge.to);

      if (from && to) {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);

        // 활성화된 간선은 더 두껍고 다른 색상으로 표시
        if (edge.active) {
          ctx.strokeStyle = '#10b981'; // 녹색
          ctx.lineWidth = 3;
        } else {
          ctx.strokeStyle = '#6b7280';
          ctx.lineWidth = 2;
        }

        ctx.stroke();

        // 가중치 표시
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(midX, midY, 15, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#000000';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(edge.weight.toString(), midX, midY);
      }
    });

    // 노드 그리기
    nodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);

      // 노드 색상 결정
      if (node.isSource) {
        ctx.fillStyle = '#8b5cf6'; // 보라색 (시작 노드)
      } else if (node.visited) {
        ctx.fillStyle = '#10b981'; // 녹색 (방문한 노드)
      } else {
        ctx.fillStyle = '#3b82f6'; // 파란색 (기본)
      }

      ctx.fill();

      // 노드 ID 표시
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.id, node.x, node.y);

      // 거리 표시
      if (node.distance !== undefined && node.distance !== Number.POSITIVE_INFINITY) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(node.x + 20, node.y - 20, 15, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#000000';
        ctx.font = '12px sans-serif';
        ctx.fillText(node.distance.toString(), node.x + 20, node.y - 20);
      }
    });
  }, [nodes, edges]);

  return (
    <div className="flex w-full flex-col items-center text-black">
      <canvas ref={canvasRef} width={600} height={400} className="h-auto w-full max-w-3xl rounded-md border" />

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

      <div className="text-muted-foreground mt-4 max-w-3xl text-sm">
        {currentStep === 0 ? (
          <p>다익스트라 알고리즘 시작: 노드 A에서 시작하여 모든 노드까지의 최단 경로를 찾습니다.</p>
        ) : currentStep === steps.length - 1 ? (
          <p>알고리즘 완료: 모든 노드까지의 최단 경로를 찾았습니다.</p>
        ) : (
          <p>
            현재 노드 {steps[currentStep].current}에서 인접한 노드들의 거리를 업데이트하고 있습니다. 보라색은 시작 노드,
            녹색은 방문한 노드, 파란색은 아직 방문하지 않은 노드입니다.
          </p>
        )}
      </div>
    </div>
  );
}
