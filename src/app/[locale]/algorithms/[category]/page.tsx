import { notFound } from 'next/navigation';

import { AlgorithmCard } from '@/components/algorithm/algorithm-card';
import { getAlgorithmsByCategory } from '@/lib/algorithms';

interface AlgorithmsCategoryPageProps {
  params: {
    category: string;
  };
}

export default function AlgorithmsCategoryPage({ params }: AlgorithmsCategoryPageProps) {
  const { category } = params;

  const algorithms = getAlgorithmsByCategory(category);

  if (!algorithms || algorithms.length === 0) {
    notFound();
  }

  const categoryNames = {
    sorting: '정렬 알고리즘',
    searching: '탐색 알고리즘',
    graph: '그래프 알고리즘',
    dynamic: '동적 계획법',
    'data-structures': '자료 구조',
    string: '문자열 알고리즘',
  };

  const categoryName = categoryNames[category as keyof typeof categoryNames];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">{categoryName}</h1>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {algorithms.map((algorithm) => (
          <AlgorithmCard key={algorithm.id} algorithm={algorithm} isSubCategory />
        ))}
      </div>
    </div>
  );
}
