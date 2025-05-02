export interface AlgorithmData {
  id: string;
  title: string;
  description: string;
  explanation: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  code: string;
  visualizerType: string;
  category: string;
}

const algorithmsData: Record<string, AlgorithmData> = {
  'bubble-sort': {
    id: 'bubble-sort',
    title: '버블 정렬 (Bubble Sort)',
    description: '인접한 두 원소를 비교하여 정렬하는 간단한 알고리즘',
    explanation: `
      버블 정렬은 가장 기본적인 정렬 알고리즘 중 하나입니다. 
      
      ## 작동 원리
      
      1. 배열의 첫 번째 요소부터 시작하여 인접한 요소와 비교합니다.
      2. 현재 요소가 다음 요소보다 크면 두 요소를 교환합니다.
      3. 배열의 끝까지 이 과정을 반복합니다.
      4. 한 번의 패스가 완료되면 가장 큰 요소가 배열의 끝에 위치하게 됩니다.
      5. 이 과정을 배열의 크기 - 1번 반복합니다.
      
      ## 특징
      
      - 구현이 매우 간단합니다.
      - 작은 데이터셋에서는 효율적일 수 있습니다.
      - 큰 데이터셋에서는 비효율적입니다.
      - 안정적인 정렬 알고리즘입니다(동일한 값의 상대적 순서가 유지됨).
    `,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    code: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // 교환
            }
        }
    }
    return arr;
}`,
    visualizerType: 'array',
    category: 'sorting',
  },
  'quick-sort': {
    id: 'quick-sort',
    title: '퀵 정렬 (Quick Sort)',
    description: '분할 정복 방법을 통해 빠르게 정렬하는 알고리즘',
    explanation: `
      퀵 정렬은 분할 정복(divide and conquer) 방법을 사용하는 효율적인 정렬 알고리즘입니다.
      
      ## 작동 원리
      
      1. 배열에서 하나의 요소를 선택합니다. 이 요소를 '피벗(pivot)'이라고 합니다.
      2. 피벗보다 작은 모든 요소를 피벗의 왼쪽으로, 큰 요소는 오른쪽으로 이동시킵니다.
      3. 피벗을 제외한 왼쪽 부분 배열과 오른쪽 부분 배열에 대해 재귀적으로 이 과정을 반복합니다.
      
      ## 특징
      
      - 평균적으로 매우 효율적인 정렬 알고리즘입니다.
      - 최악의 경우(이미 정렬된 배열)에는 성능이 저하될 수 있습니다.
      - 제자리 정렬(in-place sorting)이 가능합니다.
      - 불안정 정렬 알고리즘입니다(동일한 값의 상대적 순서가 바뀔 수 있음).
    `,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // 파티션 인덱스 찾기
    const pivotIndex = partition(arr, low, high);
    
    // 파티션 인덱스를 기준으로 왼쪽과 오른쪽 부분 배열 정렬
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  
  return arr;
}

function partition(arr, low, high) {
  // 피벗으로 마지막 요소 선택
  const pivot = arr[high];
  
  // 작은 요소의 인덱스
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    // 현재 요소가 피벗보다 작거나 같으면
    if (arr[j] <= pivot) {
      i++;
      // 요소 교환
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // 피벗을 올바른 위치로 이동
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  return i + 1;
}`,
    visualizerType: 'array',
    category: 'sorting',
  },
  'selection-sort': {
    id: 'selection-sort',
    title: '선택 정렬 (Selection Sort)',
    description: '배열에서 최소값을 찾아 맨 앞으로 이동시키는 정렬 알고리즘',
    explanation: `
      선택 정렬은 간단한 정렬 알고리즘으로, 배열에서 최소값을 찾아 맨 앞으로 이동시키는 방식으로 동작합니다.
      
      ## 작동 원리
      
      1. 배열에서 최소값을 찾습니다.
      2. 최소값을 배열의 첫 번째 위치와 교환합니다.
      3. 첫 번째 위치를 제외한 나머지 배열에서 최소값을 찾습니다.
      4. 이 최소값을 두 번째 위치와 교환합니다.
      5. 이 과정을 배열이 정렬될 때까지 반복합니다.
      
      ## 특징
      
      - 구현이 간단합니다.
      - 교환 횟수가 버블 정렬보다 적습니다.
      - 항상 O(n²) 시간 복잡도를 가집니다.
      - 불안정 정렬 알고리즘입니다(동일한 값의 상대적 순서가 바뀔 수 있음).
    `,
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    code: `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // 최소값의 인덱스 찾기
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // 최소값이 현재 위치와 다르면 교환
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}`,
    visualizerType: 'array',
    category: 'sorting',
  },
  'insertion-sort': {
    id: 'insertion-sort',
    title: '삽입 정렬 (Insertion Sort)',
    description: '배열의 요소를 하나씩 적절한 위치에 삽입하는 정렬 알고리즘',
    explanation: `
      삽입 정렬은 카드 게임에서 카드를 정렬하는 방식과 유사한 알고리즘입니다.
      
      ## 작동 원리
      
      1. 배열의 두 번째 요소부터 시작합니다.
      2. 현재 요소를 이미 정렬된 부분 배열의 적절한 위치에 삽입합니다.
      3. 이 과정을 배열의 마지막 요소까지 반복합니다.
      
      ## 특징
      
      - 작은 데이터셋이나 거의 정렬된 데이터에서 효율적입니다.
      - 온라인 알고리즘입니다(데이터가 들어오는 대로 정렬할 수 있음).
      - 안정적인 정렬 알고리즘입니다(동일한 값의 상대적 순서가 유지됨).
      - 제자리 정렬(in-place sorting)이 가능합니다.
    `,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    code: `function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    // 현재 요소를 임시 변수에 저장
    const key = arr[i];
    let j = i - 1;
    
    // key보다 큰 요소들을 오른쪽으로 이동
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // 적절한 위치에 key 삽입
    arr[j + 1] = key;
  }
  
  return arr;
}`,
    visualizerType: 'array',
    category: 'sorting',
  },
  'merge-sort': {
    id: 'merge-sort',
    title: '병합 정렬 (Merge Sort)',
    description: '분할 정복 방법을 사용하여 안정적으로 정렬하는 알고리즘',
    explanation: `
      병합 정렬은 분할 정복(divide and conquer) 방법을 사용하는 효율적이고 안정적인 정렬 알고리즘입니다.
      
      ## 작동 원리
      
      1. 배열을 절반으로 나눕니다.
      2. 각 부분 배열을 재귀적으로 정렬합니다.
      3. 정렬된 두 부분 배열을 병합하여 하나의 정렬된 배열을 만듭니다.
      
      ## 특징
      
      - 항상 O(n log n) 시간 복잡도를 보장합니다.
      - 안정적인 정렬 알고리즘입니다(동일한 값의 상대적 순서가 유지됨).
      - 추가 메모리가 필요합니다(제자리 정렬이 아님).
      - 연결 리스트 정렬에 효율적입니다.
    `,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    code: `function mergeSort(arr) {
  // 배열의 길이가 1 이하면 이미 정렬된 상태
  if (arr.length <= 1) {
    return arr;
  }
  
  // 배열을 절반으로 나누기
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  
  // 재귀적으로 각 부분 배열 정렬 후 병합
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // 두 배열의 요소를 비교하여 작은 값부터 결과 배열에 추가
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // 남은 요소들 추가
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`,
    visualizerType: 'array',
    category: 'sorting',
  },
  'heap-sort': {
    id: 'heap-sort',
    title: '힙 정렬 (Heap Sort)',
    description: '이진 힙 자료구조를 사용하여 정렬하는 알고리즘',
    explanation: `
      힙 정렬은 이진 힙(binary heap) 자료구조를 사용하는 비교 기반 정렬 알고리즘입니다.
      
      ## 작동 원리
      
      1. 배열을 최대 힙(max heap)으로 구성합니다.
      2. 힙의 루트(최대값)를 배열의 마지막 요소와 교환합니다.
      3. 힙의 크기를 1 감소시키고, 루트 노드에 대해 heapify 연산을 수행합니다.
      4. 힙의 크기가 1이 될 때까지 2-3 과정을 반복합니다.
      
      ## 특징
      
      - 항상 O(n log n) 시간 복잡도를 보장합니다.
      - 제자리 정렬(in-place sorting)이 가능합니다.
      - 불안정 정렬 알고리즘입니다(동일한 값의 상대적 순서가 바뀔 수 있음).
      - 선택 정렬의 개선된 버전으로 볼 수 있습니다.
    `,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(1)',
    code: `function heapSort(arr) {
  const n = arr.length;
  
  // 배열을 최대 힙으로 구성
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // 힙에서 요소를 하나씩 추출
  for (let i = n - 1; i > 0; i--) {
    // 현재 루트(최대값)를 배열의 끝으로 이동
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // 줄어든 힙에 대해 heapify 수행
    heapify(arr, i, 0);
  }
  
  return arr;
}

// 최대 힙을 유지하는 함수
function heapify(arr, n, i) {
  let largest = i; // 루트를 가장 큰 값으로 초기화
  const left = 2 * i + 1; // 왼쪽 자식
  const right = 2 * i + 2; // 오른쪽 자식
  
  // 왼쪽 자식이 루트보다 크면
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // 오른쪽 자식이 현재까지의 가장 큰 값보다 크면
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // 가장 큰 값이 루트가 아니면
  if (largest !== i) {
    // 루트와 가장 큰 값 교환
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    // 영향을 받은 서브트리에 대해 재귀적으로 heapify 수행
    heapify(arr, n, largest);
  }
}`,
    visualizerType: 'array',
    category: 'sorting',
  },
  'counting-sort': {
    id: 'counting-sort',
    title: '계수 정렬 (Counting Sort)',
    description: '요소의 발생 횟수를 세어 정렬하는 비교 기반이 아닌 알고리즘',
    explanation: `
      계수 정렬은 정수 또는 한정된 범위의 키를 가진 요소들을 정렬하는 선형 시간 알고리즘입니다.
      
      ## 작동 원리
      
      1. 입력 배열의 각 요소의 발생 횟수를 세어 카운트 배열에 저장합니다.
      2. 카운트 배열을 누적합으로 변환합니다.
      3. 입력 배열의 각 요소를 누적합 배열을 사용하여 출력 배열의 올바른 위치에 배치합니다.
      
      ## 특징
      
      - 비교 기반이 아닌 정렬 알고리즘입니다.
      - 요소의 범위가 작을 때 매우 효율적입니다.
      - 안정적인 정렬 알고리즘입니다(동일한 값의 상대적 순서가 유지됨).
      - 추가 메모리가 필요합니다.
    `,
    timeComplexity: {
      best: 'O(n + k)',
      average: 'O(n + k)',
      worst: 'O(n + k)',
    },
    spaceComplexity: 'O(n + k)',
    code: `function countingSort(arr) {
  // 배열이 비어있으면 빈 배열 반환
  if (arr.length === 0) return [];
  
  // 배열의 최대값 찾기
  const max = Math.max(...arr);
  
  // 카운트 배열 초기화 (0부터 max까지의 인덱스)
  const count = new Array(max + 1).fill(0);
  
  // 각 요소의 발생 횟수 세기
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
  }
  
  // 누적합으로 변환
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  
  // 결과 배열 초기화
  const output = new Array(arr.length);
  
  // 입력 배열을 역순으로 순회하며 요소를 올바른 위치에 배치
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  
  return output;
}`,
    visualizerType: 'array',
    category: 'sorting',
  },
  'radix-sort': {
    id: 'radix-sort',
    title: '기수 정렬 (Radix Sort)',
    description: '각 자릿수별로 정렬하는 비교 기반이 아닌 알고리즘',
    explanation: `
      기수 정렬은 각 자릿수별로 정렬하는 비교 기반이 아닌 정렬 알고리즘입니다.
      
      ## 작동 원리
      
      1. 가장 낮은 자릿수(일의 자리)부터 시작하여 각 자릿수별로 정렬합니다.
      2. 각 자릿수별 정렬은 안정적인 정렬 알고리즘(보통 계수 정렬)을 사용합니다.
      3. 가장 높은 자릿수까지 정렬을 완료하면 전체 배열이 정렬됩니다.
      
      ## 특징
      
      - 비교 기반이 아닌 정렬 알고리즘입니다.
      - 정수나 문자열과 같이 자릿수가 있는 데이터에 적합합니다.
      - 안정적인 정렬 알고리즘입니다(동일한 값의 상대적 순서가 유지됨).
      - 요소의 범위가 크더라도 자릿수가 작으면 효율적입니다.
    `,
    timeComplexity: {
      best: 'O(nk)',
      average: 'O(nk)',
      worst: 'O(nk)',
    },
    spaceComplexity: 'O(n + k)',
    code: `function radixSort(arr) {
  // 배열이 비어있으면 빈 배열 반환
  if (arr.length === 0) return [];
  
  // 배열의 최대값 찾기
  const max = Math.max(...arr);
  
  // 최대값의 자릿수 계산
  const maxDigits = Math.floor(Math.log10(max)) + 1;
  
  // 각 자릿수별로 정렬
  for (let digit = 0; digit < maxDigits; digit++) {
    // 10개의 버킷 초기화 (0-9)
    const buckets = Array.from({ length: 10 }, () => []);
    
    // 현재 자릿수에 따라 버킷에 요소 분배
    for (let i = 0; i < arr.length; i++) {
      const digitValue = Math.floor(arr[i] / Math.pow(10, digit)) % 10;
      buckets[digitValue].push(arr[i]);
    }
    
    // 버킷에서 요소를 순서대로 꺼내어 배열 재구성
    arr = [].concat(...buckets);
  }
  
  return arr;
}`,
    visualizerType: 'array',
    category: 'sorting',
  },
  'shell-sort': {
    id: 'shell-sort',
    title: '셸 정렬 (Shell Sort)',
    description: '삽입 정렬의 개선 버전으로, 간격을 두고 부분 배열을 정렬하는 알고리즘',
    explanation: `
      셸 정렬은 삽입 정렬의 개선 버전으로, 멀리 떨어진 요소들을 먼저 비교하여 큰 값을 빠르게 이동시킵니다.
      
      ## 작동 원리
      
      1. 간격(gap)을 선택합니다. 보통 배열 길이의 절반부터 시작합니다.
      2. 간격만큼 떨어진 요소들로 이루어진 부분 배열에 대해 삽입 정렬을 수행합니다.
      3. 간격을 줄이고(보통 절반으로) 2번 과정을 반복합니다.
      4. 간격이 1이 되면 전체 배열에 대해 삽입 정렬을 수행합니다.
      
      ## 특징
      
      - 삽입 정렬보다 효율적입니다.
      - 간격 시퀀스에 따라 성능이 크게 달라집니다.
      - 제자리 정렬(in-place sorting)이 가능합니다.
      - 불안정 정렬 알고리즘입니다(동일한 값의 상대적 순서가 바뀔 수 있음).
    `,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log² n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    code: `function shellSort(arr) {
  const n = arr.length;
  
  // 초기 간격 설정 (보통 배열 길이의 절반)
  let gap = Math.floor(n / 2);
  
  // 간격이 1이 될 때까지 반복
  while (gap > 0) {
    // 간격만큼 떨어진 요소들에 대해 삽입 정렬 수행
    for (let i = gap; i < n; i++) {
      // 현재 요소를 임시 변수에 저장
      const temp = arr[i];
      
      // 정렬된 부분 배열에서 적절한 위치 찾기
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      
      // 적절한 위치에 temp 삽입
      arr[j] = temp;
    }
    
    // 간격 줄이기 (보통 절반으로)
    gap = Math.floor(gap / 2);
  }
  
  return arr;
}`,
    visualizerType: 'array',
    category: 'sorting',
  },
  'binary-search': {
    id: 'binary-search',
    title: '이진 탐색 (Binary Search)',
    description: '정렬된 배열에서 중간 값을 기준으로 탐색 범위를 절반씩 줄여가며 찾는 알고리즘',
    explanation: `
      이진 탐색은 정렬된 배열에서 특정 값을 찾는 효율적인 알고리즘입니다.
      
      ## 작동 원리
      
      1. 배열의 중간 요소를 선택합니다.
      2. 중간 요소와 찾고자 하는 값을 비교합니다.
      3. 중간 요소가 찾고자 하는 값보다 크면, 왼쪽 절반에서 검색을 계속합니다.
      4. 중간 요소가 찾고자 하는 값보다 작으면, 오른쪽 절반에서 검색을 계속합니다.
      5. 중간 요소가 찾고자 하는 값과 같으면, 검색을 종료합니다.
      6. 찾고자 하는 값이 배열에 없으면, 적절한 값(예: -1)을 반환합니다.
      
      ## 특징
      
      - 정렬된 배열에서만 사용할 수 있습니다.
      - 선형 탐색보다 훨씬 효율적입니다.
      - 로그 시간 복잡도를 가집니다.
    `,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
    },
    spaceComplexity: 'O(1) (반복적 구현) 또는 O(log n) (재귀적 구현)',
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    // 중간 요소가 찾고자 하는 값인 경우
    if (arr[mid] === target) {
      return mid;
    }
    
    // 중간 요소가 찾고자 하는 값보다 큰 경우
    if (arr[mid] > target) {
      right = mid - 1;
    } 
    // 중간 요소가 찾고자 하는 값보다 작은 경우
    else {
      left = mid + 1;
    }
  }
  
  // 찾고자 하는 값이 배열에 없는 경우
  return -1;
}`,
    visualizerType: 'array',
    category: 'searching',
  },
  dijkstra: {
    id: 'dijkstra',
    title: "다익스트라 알고리즘 (Dijkstra's Algorithm)",
    description: '가중치가 있는 그래프에서 최단 경로를 찾는 알고리즘',
    explanation: `
    다익스트라 알고리즘은 그래프에서 한 정점에서 다른 모든 정점까지의 최단 경로를 찾는 알고리즘입니다.
    
    ## 작동 원리
    
    1. 시작 정점을 선택하고 해당 정점에서 다른 모든 정점까지의 거리를 무한대로 초기화합니다.
    2. 시작 정점의 거리를 0으로 설정하고, 방문하지 않은 정점 중 가장 거리가 짧은 정점을 선택합니다.
    3. 선택한 정점과 인접한 모든 정점에 대해, 현재까지의 거리보다 선택한 정점을 거쳐 가는 거리가 더 짧으면 거리를 업데이트합니다.
    4. 모든 정점을 방문할 때까지 2-3단계를 반복합니다.
    
    ## 특징
    
    - 음수 가중치가 없는 그래프에서만 정확한 결과를 보장합니다.
    - 그리디 알고리즘의 한 종류입니다.
    - 우선순위 큐를 사용하여 효율성을 개선할 수 있습니다.
  `,
    timeComplexity: {
      best: 'O((V+E) log V)',
      average: 'O((V+E) log V)',
      worst: 'O((V+E) log V)',
    },
    spaceComplexity: 'O(V)',
    code: `function dijkstra(graph, start) {
  const dist = {};
  const visited = {};
  const queue = [];
  
  // 모든 정점의 거리를 무한대로 초기화
  for (const vertex in graph) {
    dist[vertex] = Infinity;
    visited[vertex] = false;
  }
  
  // 시작 정점의 거리는 0
  dist[start] = 0;
  queue.push({ vertex: start, distance: 0 });
  
  while (queue.length > 0) {
    // 현재 거리가 가장 짧은 정점 찾기
    queue.sort((a, b) => a.distance - b.distance);
    const { vertex: current } = queue.shift();
    
    // 이미 방문한 정점은 건너뛰기
    if (visited[current]) continue;
    visited[current] = true;
    
    // 인접 정점 검사
    for (const [neighbor, weight] of graph[current]) {
      const distance = dist[current] + weight;
      
      // 더 짧은 경로를 찾았으면 업데이트
      if (distance < dist[neighbor]) {
        dist[neighbor] = distance;
        queue.push({ vertex: neighbor, distance });
      }
    }
  }
  
  return dist;
}`,
    visualizerType: 'graph',
    category: 'graph',
  },
  'fibonacci-dp': {
    id: 'fibonacci-dp',
    title: '피보나치 수열 (Fibonacci Sequence)',
    description: '동적 프로그래밍을 사용하여 피보나치 수열을 효율적으로 계산하는 알고리즘',
    explanation: `
    피보나치 수열은 각 숫자가 앞의 두 숫자의 합과 같은 수열입니다. 동적 프로그래밍은 이 문제를 효율적으로 해결하는 좋은 방법입니다.
    
    ## 피보나치 수열
    
    피보나치 수열은 다음과 같이 정의됩니다:
    - F(0) = 0
    - F(1) = 1
    - F(n) = F(n-1) + F(n-2), n > 1
    
    예: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
    
    ## 동적 프로그래밍 접근법
    
    1. **메모이제이션(Top-down)**: 재귀적으로 문제를 해결하되, 이미 계산한 값은 저장해두고 재사용합니다.
    2. **타뷸레이션(Bottom-up)**: 작은 하위 문제부터 시작하여 큰 문제로 진행하며 결과를 저장합니다.
    
    ## 장점
    
    - 단순 재귀 방식(O(2^n))보다 훨씬 효율적입니다(O(n)).
    - 이미 계산된 값을 저장하여 중복 계산을 방지합니다.
    
    ## 응용
    
    피보나치 수열은 자연 현상, 금융 모델링, 알고리즘 설계 등 다양한 분야에서 활용됩니다.
  `,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    code: `// 메모이제이션(Top-down) 방식
function fibonacciMemoization(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacciMemoization(n - 1, memo) + fibonacciMemoization(n - 2, memo);
  return memo[n];
}

// 타뷸레이션(Bottom-up) 방식
function fibonacciTabulation(n) {
  if (n <= 1) return n;
  
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// 공간 최적화 방식
function fibonacciOptimized(n) {
  if (n <= 1) return n;
  
  let prev = 0;
  let current = 1;
  
  for (let i = 2; i <= n; i++) {
    const next = prev + current;
    prev = current;
    current = next;
  }
  
  return current;
}`,
    visualizerType: 'array',
    category: 'dynamic',
  },
  'linked-list': {
    id: 'linked-list',
    title: '연결 리스트 (Linked List)',
    description: '각 노드가 데이터와 다음 노드에 대한 참조를 가지는 선형 자료 구조',
    explanation: `
    연결 리스트는 각 요소(노드)가 데이터와 다음 노드를 가리키는 참조로 구성된 선형 자료 구조입니다.
    
    ## 연결 리스트의 종류
    
    1. **단일 연결 리스트(Singly Linked List)**: 각 노드가 다음 노드에 대한 참조만 가집니다.
    2. **이중 연결 리스트(Doubly Linked List)**: 각 노드가 이전 노드와 다음 노드에 대한 참조를 모두 가집니다.
    3. **원형 연결 리스트(Circular Linked List)**: 마지막 노드가 첫 번째 노드를 가리키는 연결 리스트입니다.
    
    ## 주요 연산
    
    - **삽입(Insertion)**: 리스트의 시작, 끝 또는 중간에 새 노드를 추가합니다.
    - **삭제(Deletion)**: 리스트에서 노드를 제거합니다.
    - **탐색(Search)**: 특정 값을 가진 노드를 찾습니다.
    - **순회(Traversal)**: 리스트의 모든 노드를 방문합니다.
    
    ## 장점
    
    - 동적 크기 조정: 필요에 따라 크기가 늘어나거나 줄어들 수 있습니다.
    - 삽입 및 삭제가 효율적: 특히 리스트의 시작 또는 끝에서 O(1) 시간 복잡도를 가집니다.
    
    ## 단점
    
    - 임의 접근이 비효율적: 특정 인덱스의 요소에 접근하려면 O(n) 시간이 필요합니다.
    - 추가 메모리 사용: 각 노드는 데이터 외에도 다음 노드에 대한 참조를 저장해야 합니다.
    
    ## 응용
    
    - 스택 및 큐 구현
    - 해시 테이블의 체이닝
    - 그래프의 인접 리스트 표현
    - LRU 캐시 구현
  `,
    timeComplexity: {
      best: 'O(1) for insertion/deletion at known position',
      average: 'O(n) for search',
      worst: 'O(n) for search',
    },
    spaceComplexity: 'O(n)',
    code: `// 단일 연결 리스트 구현
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // 리스트의 끝에 노드 추가
  append(data) {
    const newNode = new Node(data);
    
    // 리스트가 비어있는 경우
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      
      // 마지막 노드를 찾음
      while (current.next) {
        current = current.next;
      }
      
      // 마지막 노드의 다음을 새 노드로 설정
      current.next = newNode;
    }
    
    this.size++;
  }
  
  // 리스트의 시작에 노드 추가
  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  
  // 특정 위치에 노드 삽입
  insertAt(data, index) {
    // 인덱스가 범위를 벗어나는 경우
    if (index < 0 || index > this.size) {
      return false;
    }
    
    // 리스트의 시작에 삽입하는 경우
    if (index === 0) {
      this.prepend(data);
      return true;
    }
    
    const newNode = new Node(data);
    let current = this.head;
    let previous = null;
    let count = 0;
    
    // 삽입 위치까지 이동
    while (count < index) {
      previous = current;
      current = current.next;
      count++;
    }
    
    // 새 노드 삽입
    newNode.next = current;
    previous.next = newNode;
    this.size++;
    return true;
  }
  
  // 특정 값을 가진 노드 삭제
  remove(data) {
    if (!this.head) {
      return null;
    }
    
    // 헤드 노드가 삭제할 노드인 경우
    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    
    let current = this.head;
    let previous = null;
    
    // 삭제할 노드 찾기
    while (current && current.data !== data) {
      previous = current;
      current = current.next;
    }
    
    // 노드를 찾지 못한 경우
    if (!current) {
      return false;
    }
    
    // 노드 삭제
    previous.next = current.next;
    this.size--;
    return true;
  }
  
  // 리스트의 모든 노드 출력
  printList() {
    let current = this.head;
    const values = [];
    
    while (current) {
      values.push(current.data);
      current = current.next;
    }
    
    return values.join(' -> ');
  }
  
  // 리스트의 크기 반환
  getSize() {
    return this.size;
  }
  
  // 리스트가 비어있는지 확인
  isEmpty() {
    return this.size === 0;
  }
}`,
    visualizerType: 'tree',
    category: 'data-structures',
  },
  'kmp-algorithm': {
    id: 'kmp-algorithm',
    title: 'KMP 알고리즘 (Knuth-Morris-Pratt Algorithm)',
    description: '문자열 내에서 패턴을 효율적으로 검색하는 문자열 매칭 알고리즘',
    explanation: `
    KMP(Knuth-Morris-Pratt) 알고리즘은 문자열 내에서 특정 패턴을 검색하는 효율적인 알고리즘입니다. 이 알고리즘은 이미 일치한 문자들에 대한 정보를 활용하여 불필요한 비교를 건너뛰는 방식으로 동작합니다.
    
    ## 작동 원리
    
    1. **접두사 함수(Prefix Function) 계산**: 패턴 내에서 접두사와 접미사가 일치하는 최대 길이를 계산합니다.
    2. **패턴 검색**: 접두사 함수를 사용하여 텍스트에서 패턴을 검색합니다. 불일치가 발생하면, 접두사 함수를 통해 얼마나 뒤로 이동해야 하는지 결정합니다.
    
    ## 특징
    
    - 전처리 단계에서 패턴을 분석하여 접두사 함수(또는 실패 함수)를 생성합니다.
    - 불일치가 발생했을 때, 처음부터 다시 비교하지 않고 접두사 함수를 사용하여 효율적으로 이동합니다.
    - 최악의 경우에도 O(n+m) 시간 복잡도를 보장합니다. (n은 텍스트 길이, m은 패턴 길이)
    
    ## 장점
    
    - 단순한 문자열 검색 알고리즘(O(nm))보다 효율적입니다.
    - 패턴이 긴 경우에 특히 유용합니다.
    - 전체 텍스트를 한 번만 스캔하면 됩니다.
    
    ## 응용
    
    - 텍스트 편집기의 검색 기능
    - 바이오인포매틱스에서 DNA 서열 매칭
    - 네트워크 패킷 검사
    - 데이터 압축 알고리즘
  `,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n+m)',
      worst: 'O(n+m)',
    },
    spaceComplexity: 'O(m)',
    code: `// KMP 알고리즘 구현
function kmpSearch(text, pattern) {
  if (pattern.length === 0) return 0;
  if (pattern.length > text.length) return -1;
  
  // 접두사 함수(실패 함수) 계산
  const lps = computeLPSArray(pattern);
  const matches = [];
  
  let i = 0; // 텍스트 인덱스
  let j = 0; // 패턴 인덱스
  
  while (i < text.length) {
    // 현재 문자가 일치하는 경우
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }
    
    // 패턴을 모두 찾은 경우
    if (j === pattern.length) {
      matches.push(i - j); // 패턴의 시작 위치 저장
      j = lps[j - 1]; // 다음 일치를 위해 j 업데이트
    }
    // 불일치가 발생한 경우
    else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1]; // 접두사 함수를 사용하여 j 업데이트
      } else {
        i++; // j가 0이면 텍스트의 다음 문자로 이동
      }
    }
  }
  
  return matches.length > 0 ? matches : -1;
}

// 접두사 함수(LPS, Longest Prefix Suffix) 계산
function computeLPSArray(pattern) {
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
}`,
    visualizerType: 'array',
    category: 'string',
  },
  // 다른 알고리즘 데이터를 추가할 수 있습니다.
};

export function getAlgorithmData(id: string): AlgorithmData | undefined {
  return algorithmsData[id];
}

export function getAllAlgorithms(): AlgorithmData[] {
  return Object.values(algorithmsData);
}

// 카테고리별 알고리즘 목록을 반환하는 함수
export function getAlgorithmsByCategory(category: string): AlgorithmData[] {
  return Object.values(algorithmsData).filter((algorithm) => algorithm.category === category);
}

// 카테고리 정보를 반환하는 함수
export function getCategoryInfo(category: string) {
  const categoryInfo: Record<string, { title: string; description: string; icon: string }> = {
    sorting: {
      title: '정렬 알고리즘',
      description: '데이터를 특정 순서대로 배열하는 알고리즘',
      icon: 'sort',
    },
    searching: {
      title: '탐색 알고리즘',
      description: '데이터 구조에서 특정 값을 찾는 알고리즘',
      icon: 'search',
    },
    graph: {
      title: '그래프 알고리즘',
      description: '그래프 구조를 다루는 알고리즘',
      icon: 'network',
    },
    dynamic: {
      title: '동적 프로그래밍',
      description: '복잡한 문제를 하위 문제로 나누어 해결하는 방법',
      icon: 'layers',
    },
    'data-structures': {
      title: '자료 구조',
      description: '데이터를 효율적으로 저장하고 접근하는 방법',
      icon: 'database',
    },
    string: {
      title: '문자열 알고리즘',
      description: '문자열을 처리하는 알고리즘',
      icon: 'text',
    },
  };

  return categoryInfo[category];
}
