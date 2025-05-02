'use client';

import { Button } from '@heroui/button';
import { Slider } from '@heroui/react';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';

import { useEffect, useState } from 'react';

import type { AlgorithmData } from '@/lib/algorithms';

import { ArrayVisualizer } from './visualizers/array-visualizer';
import { FibonacciVisualizer } from './visualizers/finbonacci-visualizer';
import { GraphVisualizer } from './visualizers/graph-visualizer';
import { StringVisualizer } from './visualizers/string-visualizer';
import { TreeVisualizer } from './visualizers/tree-visualizer';

interface AlgorithmVisualizerProps {
  algorithm: AlgorithmData;
}

export function AlgorithmVisualizer({ algorithm }: AlgorithmVisualizerProps) {
  const [data, setData] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [visualizationSteps, setVisualizationSteps] = useState<any[]>([]);

  // 초기 데이터 생성
  useEffect(() => {
    generateRandomData();
  }, []);

  const generateRandomData = () => {
    const newData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setData(newData);
    setCurrentStep(0);
    setIsPlaying(false);

    // 알고리즘에 따라 시각화 단계 생성
    if (algorithm.id === 'bubble-sort') {
      const steps = generateBubbleSortSteps([...newData]);
      setVisualizationSteps(steps);
      setTotalSteps(steps.length);
    } else if (algorithm.id === 'selection-sort') {
      const steps = generateSelectionSortSteps([...newData]);
      setVisualizationSteps(steps);
      setTotalSteps(steps.length);
    } else if (algorithm.id === 'insertion-sort') {
      const steps = generateInsertionSortSteps([...newData]);
      setVisualizationSteps(steps);
      setTotalSteps(steps.length);
    } else if (algorithm.id === 'merge-sort') {
      const steps = generateMergeSortSteps([...newData]);
      setVisualizationSteps(steps);
      setTotalSteps(steps.length);
    } else if (algorithm.id === 'quick-sort') {
      const steps = generateQuickSortSteps([...newData]);
      setVisualizationSteps(steps);
      setTotalSteps(steps.length);
    } else if (algorithm.id === 'heap-sort') {
      const steps = generateHeapSortSteps([...newData]);
      setVisualizationSteps(steps);
      setTotalSteps(steps.length);
    } else if (algorithm.id === 'counting-sort') {
      const steps = generateCountingSortSteps([...newData]);
      setVisualizationSteps(steps);
      setTotalSteps(steps.length);
    } else if (algorithm.id === 'radix-sort') {
      const steps = generateRadixSortSteps([...newData]);
      setVisualizationSteps(steps);
      setTotalSteps(steps.length);
    } else if (algorithm.id === 'shell-sort') {
      const steps = generateShellSortSteps([...newData]);
      setVisualizationSteps(steps);
      setTotalSteps(steps.length);
    } else if (algorithm.id === 'binary-search') {
      // 이진 탐색을 위해 데이터 정렬
      const sortedData = [...newData].sort((a, b) => a - b);
      setData(sortedData);

      // 랜덤 타겟 값 (배열에 있는 값 중 하나)
      const targetIndex = Math.floor(Math.random() * sortedData.length);
      const target = sortedData[targetIndex];

      const steps = generateBinarySearchSteps([...sortedData], target);
      setVisualizationSteps(steps);
      setTotalSteps(steps.length);
    }
  };

  // 버블 정렬 시각화 단계 생성
  const generateBubbleSortSteps = (arr: number[]) => {
    const steps = [];
    const n = arr.length;

    // 초기 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
    });

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        // 비교 중인 요소 표시
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapped: false,
        });

        if (arr[j] > arr[j + 1]) {
          // 요소 교환
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;

          // 교환 후 상태 저장
          steps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapped: true,
          });
        }
      }

      if (!swapped) break;
    }

    // 최종 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: true,
    });

    return steps;
  };

  // 선택 정렬 시각화 단계 생성
  const generateSelectionSortSteps = (arr: number[]) => {
    const steps = [];
    const n = arr.length;

    // 초기 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
    });

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      // 최소값 찾기 과정
      for (let j = i + 1; j < n; j++) {
        // 현재 요소와 비교 중인 요소 표시
        steps.push({
          array: [...arr],
          comparing: [minIndex, j],
          swapped: false,
        });

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      // 최소값이 현재 위치와 다르면 교환
      if (minIndex !== i) {
        // 교환 전 상태 저장
        steps.push({
          array: [...arr],
          comparing: [i, minIndex],
          swapped: false,
        });

        // 요소 교환
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

        // 교환 후 상태 저장
        steps.push({
          array: [...arr],
          comparing: [i, minIndex],
          swapped: true,
        });
      }
    }

    // 최종 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: true,
    });

    return steps;
  };

  // 삽입 정렬 시각화 단계 생성
  const generateInsertionSortSteps = (arr: number[]) => {
    const steps = [];
    const n = arr.length;

    // 초기 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
    });

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      // 현재 요소 표시
      steps.push({
        array: [...arr],
        comparing: [i],
        swapped: false,
      });

      while (j >= 0 && arr[j] > key) {
        // 비교 중인 요소 표시
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapped: false,
        });

        // 요소 이동
        arr[j + 1] = arr[j];

        // 이동 후 상태 저장
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapped: true,
        });

        j--;
      }

      arr[j + 1] = key;

      // 삽입 후 상태 저장
      steps.push({
        array: [...arr],
        comparing: [j + 1],
        swapped: true,
      });
    }

    // 최종 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: true,
    });

    return steps;
  };

  // 병합 정렬 시각화 단계 생성
  const generateMergeSortSteps = (arr: number[]) => {
    const steps = [];

    // 초기 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
    });

    // 병합 정렬 실행
    mergeSortWithSteps(arr, 0, arr.length - 1, steps);

    // 최종 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: true,
    });

    return steps;
  };

  // 병합 정렬 재귀 함수
  const mergeSortWithSteps = (arr: number[], left: number, right: number, steps: any[]) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      // 분할 상태 저장
      steps.push({
        array: [...arr],
        comparing: [left, right],
        swapped: false,
        message: `분할: [${left}..${mid}], [${mid + 1}..${right}]`,
      });

      // 왼쪽 부분 배열 정렬
      mergeSortWithSteps(arr, left, mid, steps);

      // 오른쪽 부분 배열 정렬
      mergeSortWithSteps(arr, mid + 1, right, steps);

      // 병합
      merge(arr, left, mid, right, steps);
    }
  };

  // 병합 함수
  const merge = (arr: number[], left: number, mid: number, right: number, steps: any[]) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    // 임시 배열 생성
    const L = new Array(n1);
    const R = new Array(n2);

    // 데이터 복사
    for (let i = 0; i < n1; i++) {
      L[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
      R[j] = arr[mid + 1 + j];
    }

    // 병합 과정
    let i = 0,
      j = 0,
      k = left;

    while (i < n1 && j < n2) {
      // 비교 중인 요소 표시
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        swapped: false,
        message: `비교: L[${i}]=${L[i]}, R[${j}]=${R[j]}`,
      });

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }

      // 병합 후 상태 저장
      steps.push({
        array: [...arr],
        comparing: [k],
        swapped: true,
        message: `병합: arr[${k}]=${arr[k]}`,
      });

      k++;
    }

    // 남은 요소 처리
    while (i < n1) {
      arr[k] = L[i];
      steps.push({
        array: [...arr],
        comparing: [k],
        swapped: true,
        message: `남은 요소 추가: arr[${k}]=${arr[k]}`,
      });
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      steps.push({
        array: [...arr],
        comparing: [k],
        swapped: true,
        message: `남은 요소 추가: arr[${k}]=${arr[k]}`,
      });
      j++;
      k++;
    }
  };

  // 퀵 정렬 시각화 단계 생성
  const generateQuickSortSteps = (arr: number[]) => {
    const steps = [];

    // 초기 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
    });

    // 퀵 정렬 실행
    quickSortWithSteps(arr, 0, arr.length - 1, steps);

    // 최종 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: true,
    });

    return steps;
  };

  // 퀵 정렬 재귀 함수
  const quickSortWithSteps = (arr: number[], low: number, high: number, steps: any[]) => {
    if (low < high) {
      // 파티션 인덱스 찾기
      const pivotIndex = partitionWithSteps(arr, low, high, steps);

      // 파티션 인덱스를 기준으로 왼쪽과 오른쪽 부분 배열 정렬
      quickSortWithSteps(arr, low, pivotIndex - 1, steps);
      quickSortWithSteps(arr, pivotIndex + 1, high, steps);
    }
  };

  // 파티션 함수
  const partitionWithSteps = (arr: number[], low: number, high: number, steps: any[]) => {
    // 피벗으로 마지막 요소 선택
    const pivot = arr[high];

    // 피벗 선택 상태 저장
    steps.push({
      array: [...arr],
      comparing: [high],
      swapped: false,
      message: `피벗 선택: ${pivot}`,
    });

    // 작은 요소의 인덱스
    let i = low - 1;

    for (let j = low; j < high; j++) {
      // 현재 요소와 피벗 비교
      steps.push({
        array: [...arr],
        comparing: [j, high],
        swapped: false,
        message: `비교: arr[${j}]=${arr[j]}, pivot=${pivot}`,
      });

      // 현재 요소가 피벗보다 작거나 같으면
      if (arr[j] <= pivot) {
        i++;

        // 요소 교환
        if (i !== j) {
          steps.push({
            array: [...arr],
            comparing: [i, j],
            swapped: false,
            message: `교환 예정: arr[${i}]=${arr[i]}, arr[${j}]=${arr[j]}`,
          });
          [arr[i], arr[j]] = [arr[j], arr[i]];

          steps.push({
            array: [...arr],
            comparing: [i, j],
            swapped: true,
            message: `교환 완료: arr[${i}]=${arr[i]}, arr[${j}]=${arr[j]}`,
          });
        }
      }
    }

    // 피벗을 올바른 위치로 이동
    steps.push({
      array: [...arr],
      comparing: [i + 1, high],
      swapped: false,
      message: `피벗 위치 교환 예정: arr[${i + 1}]=${arr[i + 1]}, arr[${high}]=${arr[high]}`,
    });
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    steps.push({
      array: [...arr],
      comparing: [i + 1, high],
      swapped: true,
      message: `피벗 위치 교환 완료: arr[${i + 1}]=${arr[i + 1]}, arr[${high}]=${arr[high]}`,
    });

    return i + 1;
  };

  // 힙 정렬 시각화 단계 생성
  const generateHeapSortSteps = (arr: number[]) => {
    const steps = [];
    const n = arr.length;

    // 초기 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      message: '힙 정렬 시작',
    });

    // 배열을 최대 힙으로 구성
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapifyWithSteps(arr, n, i, steps);
    }

    // 힙에서 요소를 하나씩 추출
    for (let i = n - 1; i > 0; i--) {
      // 현재 루트(최대값)를 배열의 끝으로 이동
      steps.push({
        array: [...arr],
        comparing: [0, i],
        swapped: false,
        message: `루트 노드와 마지막 노드 교환 예정: arr[0]=${arr[0]}, arr[${i}]=${arr[i]}`,
      });
      [arr[0], arr[i]] = [arr[i], arr[0]];

      steps.push({
        array: [...arr],
        comparing: [0, i],
        swapped: true,
        message: `루트 노드와 마지막 노드 교환 완료: arr[0]=${arr[0]}, arr[${i}]=${arr[i]}`,
      });

      // 줄어든 힙에 대해 heapify 수행
      heapifyWithSteps(arr, i, 0, steps);
    }

    // 최종 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: true,
      message: '힙 정렬 완료',
    });

    return steps;
  };

  // 최대 힙을 유지하는 함수
  const heapifyWithSteps = (arr: number[], n: number, i: number, steps: any[]) => {
    let largest = i; // 루트를 가장 큰 값으로 초기화
    const left = 2 * i + 1; // 왼쪽 자식
    const right = 2 * i + 2; // 오른쪽 자식

    // 왼쪽 자식이 루트보다 크면
    if (left < n) {
      steps.push({
        array: [...arr],
        comparing: [largest, left],
        swapped: false,
        message: `비교: arr[${largest}]=${arr[largest]}, arr[${left}]=${arr[left]}`,
      });

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    // 오른쪽 자식이 현재까지의 가장 큰 값보다 크면
    if (right < n) {
      steps.push({
        array: [...arr],
        comparing: [largest, right],
        swapped: false,
        message: `비교: arr[${largest}]=${arr[largest]}, arr[${right}]=${arr[right]}`,
      });

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    // 가장 큰 값이 루트가 아니면
    if (largest !== i) {
      steps.push({
        array: [...arr],
        comparing: [i, largest],
        swapped: false,
        message: `교환 예정: arr[${i}]=${arr[i]}, arr[${largest}]=${arr[largest]}`,
      });

      // 루트와 가장 큰 값 교환
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      steps.push({
        array: [...arr],
        comparing: [i, largest],
        swapped: true,
        message: `교환 완료: arr[${i}]=${arr[i]}, arr[${largest}]=${arr[largest]}`,
      });

      // 영향을 받은 서브트리에 대해 재귀적으로 heapify 수행
      heapifyWithSteps(arr, n, largest, steps);
    }
  };

  // 계수 정렬 시각화 단계 생성
  const generateCountingSortSteps = (arr: number[]) => {
    const steps = [];

    // 초기 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      message: '계수 정렬 시작',
    });

    // 배열이 비어있으면 빈 배열 반환
    if (arr.length === 0) {
      steps.push({
        array: [],
        comparing: [],
        swapped: false,
        completed: true,
        message: '배열이 비어있습니다',
      });
      return steps;
    }

    // 배열의 최대값 찾기
    const max = Math.max(...arr);

    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      message: `최대값 찾기: ${max}`,
    });

    // 카운트 배열 초기화 (0부터 max까지의 인덱스)
    const count = new Array(max + 1).fill(0);

    // 각 요소의 발생 횟수 세기
    for (let i = 0; i < arr.length; i++) {
      count[arr[i]]++;

      steps.push({
        array: [...arr],
        comparing: [i],
        swapped: false,
        message: `카운트 증가: count[${arr[i]}] = ${count[arr[i]]}`,
        countArray: [...count],
      });
    }

    // 누적합으로 변환
    for (let i = 1; i <= max; i++) {
      count[i] += count[i - 1];

      steps.push({
        array: [...arr],
        comparing: [],
        swapped: false,
        message: `누적합 계산: count[${i}] = ${count[i]}`,
        countArray: [...count],
      });
    }

    // 결과 배열 초기화
    const output = new Array(arr.length);

    // 입력 배열을 역순으로 순회하며 요소를 올바른 위치에 배치
    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[arr[i]] - 1] = arr[i];
      count[arr[i]]--;

      steps.push({
        array: [...output],
        comparing: [count[arr[i]]],
        swapped: true,
        message: `요소 배치: output[${count[arr[i]]}] = ${arr[i]}`,
        countArray: [...count],
      });
    }

    // 원본 배열에 결과 복사
    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
    }

    // 최종 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: true,
      message: '계수 정렬 완료',
    });

    return steps;
  };

  // 기수 정렬 시각화 단계 생성
  const generateRadixSortSteps = (arr: number[]) => {
    const steps = [];

    // 초기 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      message: '기수 정렬 시작',
    });

    // 배열이 비어있으면 빈 배열 반환
    if (arr.length === 0) {
      steps.push({
        array: [],
        comparing: [],
        swapped: false,
        completed: true,
        message: '배열이 비어있습니다',
      });
      return steps;
    }

    // 배열의 최대값 찾기
    const max = Math.max(...arr);

    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      message: `최대값 찾기: ${max}`,
    });

    // 최대값의 자릿수 계산
    const maxDigits = Math.floor(Math.log10(max)) + 1;

    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      message: `최대 자릿수: ${maxDigits}`,
    });

    // 각 자릿수별로 정렬
    for (let digit = 0; digit < maxDigits; digit++) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapped: false,
        message: `${digit + 1}번째 자릿수 정렬 시작`,
      });

      // 10개의 버킷 초기화 (0-9)
      const buckets: number[][] = Array.from({ length: 10 }, () => []);

      // 현재 자릿수에 따라 버킷에 요소 분배
      for (let i = 0; i < arr.length; i++) {
        const digitValue = Math.floor(arr[i] / Math.pow(10, digit)) % 10;
        buckets[digitValue].push(arr[i]);

        steps.push({
          array: [...arr],
          comparing: [i],
          swapped: false,
          message: `요소 ${arr[i]}의 ${digit + 1}번째 자릿수: ${digitValue}, 버킷 ${digitValue}에 추가`,
          buckets: buckets.map((bucket) => [...bucket]),
        });
      }

      // 버킷에서 요소를 순서대로 꺼내어 배열 재구성
      let index = 0;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
          arr[index] = buckets[i][j];

          steps.push({
            array: [...arr],
            comparing: [index],
            swapped: true,
            message: `버킷 ${i}에서 요소 ${buckets[i][j]} 가져오기`,
            buckets: buckets.map((bucket) => [...bucket]),
          });

          index++;
        }
      }

      steps.push({
        array: [...arr],
        comparing: [],
        swapped: false,
        message: `${digit + 1}번째 자릿수 정렬 완료`,
      });
    }

    // 최종 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: true,
      message: '기수 정렬 완료',
    });

    return steps;
  };

  // 셸 정렬 시각화 단계 생성
  const generateShellSortSteps = (arr: number[]) => {
    const steps = [];
    const n = arr.length;

    // 초기 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      message: '셸 정렬 시작',
    });

    // 초기 간격 설정 (보통 배열 길이의 절반)
    let gap = Math.floor(n / 2);

    // 간격이 1이 될 때까지 반복
    while (gap > 0) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapped: false,
        message: `현재 간격: ${gap}`,
      });

      // 간격만큼 떨어진 요소들에 대해 삽입 정렬 수행
      for (let i = gap; i < n; i++) {
        // 현재 요소를 임시 변수에 저장
        const temp = arr[i];

        steps.push({
          array: [...arr],
          comparing: [i],
          swapped: false,
          message: `현재 요소: arr[${i}] = ${temp}`,
        });

        // 정렬된 부분 배열에서 적절한 위치 찾기
        let j = i;
        while (j >= gap && arr[j - gap] > temp) {
          steps.push({
            array: [...arr],
            comparing: [j, j - gap],
            swapped: false,
            message: `비교: arr[${j - gap}] = ${arr[j - gap]} > ${temp}`,
          });

          arr[j] = arr[j - gap];

          steps.push({
            array: [...arr],
            comparing: [j, j - gap],
            swapped: true,
            message: `이동: arr[${j}] = arr[${j - gap}]`,
          });

          j -= gap;
        }

        // 적절한 위치에 temp 삽입
        arr[j] = temp;

        steps.push({
          array: [...arr],
          comparing: [j],
          swapped: true,
          message: `삽입: arr[${j}] = ${temp}`,
        });
      }

      // 간격 줄이기 (보통 절반으로)
      gap = Math.floor(gap / 2);
    }

    // 최종 상태 저장
    steps.push({
      array: [...arr],
      comparing: [],
      swapped: false,
      completed: true,
      message: '셸 정렬 완료',
    });

    return steps;
  };

  // 이진 탐색 시각화 단계 생성
  const generateBinarySearchSteps = (arr: number[], target: number) => {
    const steps = [];
    let left = 0;
    let right = arr.length - 1;

    // 초기 상태 저장
    steps.push({
      array: [...arr],
      left,
      right,
      mid: null,
      target,
      found: false,
    });

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      // 중간 요소 선택 상태 저장
      steps.push({
        array: [...arr],
        left,
        right,
        mid,
        target,
        found: false,
      });

      if (arr[mid] === target) {
        // 찾은 경우
        steps.push({
          array: [...arr],
          left,
          right,
          mid,
          target,
          found: true,
        });
        break;
      }

      if (arr[mid] > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    // 찾지 못한 경우 최종 상태 저장
    if (left > right) {
      steps.push({
        array: [...arr],
        left: null,
        right: null,
        mid: null,
        target,
        found: false,
        notFound: true,
      });
    }

    return steps;
  };

  // 재생/일시정지 토글
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // 처음으로 돌아가기
  const resetVisualization = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // 다음 단계로 이동
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  };

  // 이전 단계로 이동
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 자동 재생 효과
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && currentStep < totalSteps - 1) {
      const delay = 1000 - speed * 9; // 속도 조절 (1-100 범위를 100-1000ms로 변환)
      timer = setTimeout(() => {
        nextStep();
      }, delay);
    } else if (currentStep >= totalSteps - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStep, speed, totalSteps]);

  // 현재 시각화 단계 데이터
  const currentStepData = visualizationSteps[currentStep] || { array: data };

  // 특정 알고리즘에 대한 컨트롤 표시 여부
  const showControls = algorithm.category === 'sorting' || algorithm.id === 'binary-search';

  return (
    <div className="space-y-6">
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border p-4">
        {algorithm.visualizerType === 'array' && algorithm.category !== 'string' && algorithm.id !== 'fibonacci-dp' && (
          <ArrayVisualizer
            data={currentStepData.array || data}
            comparing={currentStepData.comparing || []}
            swapped={currentStepData.swapped || false}
            target={currentStepData.target}
            left={currentStepData.left}
            right={currentStepData.right}
            mid={currentStepData.mid}
            found={currentStepData.found}
            notFound={currentStepData.notFound}
            completed={currentStepData.completed}
          />
        )}
        {algorithm.visualizerType === 'graph' && <GraphVisualizer data={currentStepData} algorithm={algorithm.id} />}
        {algorithm.visualizerType === 'tree' && <TreeVisualizer />}
        {algorithm.id === 'fibonacci-dp' && <FibonacciVisualizer n={10} />}
        {algorithm.category === 'string' && <StringVisualizer />}
      </div>

      {showControls && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="bordered" size="sm" onClick={resetVisualization}>
                <SkipBack className="h-4 w-4 text-black" />
              </Button>
              <Button variant="bordered" size="sm" onClick={prevStep} disabled={currentStep === 0}>
                <SkipBack className="h-4 w-4 text-black" />
              </Button>
              <Button onClick={togglePlay}>
                {isPlaying ? (
                  <Pause className="mr-2 h-4 w-4 text-black" />
                ) : (
                  <Play className="mr-2 h-4 w-4 text-black" />
                )}
                {isPlaying ? '일시정지' : '재생'}
              </Button>
              <Button variant="bordered" size="sm" onClick={nextStep} disabled={currentStep === totalSteps - 1}>
                <SkipForward className="h-4 w-4 text-black" />
              </Button>
            </div>
            <Button variant="bordered" onClick={generateRandomData} className="text-black">
              새 데이터 생성
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">속도</span>
              <span className="text-sm">{speed}%</span>
            </div>
            <Slider
              value={[speed]}
              minValue={1}
              maxValue={100}
              step={1}
              onChange={(value) => {
                if (isNaN(Number(value))) return;

                setSpeed(Number(value));
              }}
            />
          </div>

          <div className="text-muted-foreground flex items-center justify-between text-sm">
            <span>
              단계: {currentStep + 1} / {totalSteps}
            </span>
            {currentStepData.completed && <span className="font-medium text-green-500">정렬 완료!</span>}
            {currentStepData.found && (
              <span className="font-medium text-green-500">찾았습니다! 인덱스: {currentStepData.mid}</span>
            )}
            {currentStepData.notFound && <span className="font-medium text-red-500">값을 찾을 수 없습니다.</span>}
          </div>
        </div>
      )}
    </div>
  );
}
