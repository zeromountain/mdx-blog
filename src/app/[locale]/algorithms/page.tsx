import { AlgorithmCard } from '@/components/algorithm/algorithm-card';
import { getCategoryInfo } from '@/lib/algorithms';

const getCategories = (category: string): string[] => {
  const categoryMap: Record<string, string[]> = {
    sorting: ['버블 정렬', '퀵 정렬', '병합 정렬', '삽입 정렬'],
    searching: ['이진 탐색', '선형 탐색', '깊이 우선 탐색', '너비 우선 탐색'],
    graph: ['다익스트라', '프림', '크루스칼', '벨만-포드'],
    dynamic: ['피보나치 수열', '배낭 문제', '최장 공통 부분 수열', '편집 거리'],
    'data-structures': ['배열', '연결 리스트', '스택', '큐', '해시 테이블', '트리'],
    string: ['KMP', '라빈-카프', '보이어-무어', '트라이'],
  };

  return categoryMap[category] || [];
};

export default function AlgorithmsPage() {
  const categories = ['sorting', 'searching', 'graph', 'dynamic', 'data-structures', 'string'];

  const categoryData = categories.map((category) => {
    const info = getCategoryInfo(category);
    return {
      id: category,
      ...info,
      examples: getCategories(category),
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoryData.map((category) => (
          <AlgorithmCard key={category.id} algorithm={category} />
        ))}
      </div>
    </div>
  );
}
