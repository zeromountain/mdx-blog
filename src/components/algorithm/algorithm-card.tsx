'use client';

import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/react';
import { ChevronRight, Database, Layers, Network, Search, ListOrderedIcon as Sort, Text } from 'lucide-react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

interface AlgorithmCardProps {
  algorithm: {
    id: string;
    title: string;
    description: string;
    icon?: string;
    examples?: string[];
    category?: string;
  };
  isSubCategory?: boolean;
}

export function AlgorithmCard({ algorithm, isSubCategory = false }: AlgorithmCardProps) {
  const params = useParams();

  const icons = {
    search: <Search className="h-5 w-5" />,
    sort: <Sort className="h-5 w-5" />,
    network: <Network className="h-5 w-5" />,
    layers: <Layers className="h-5 w-5" />,
    database: <Database className="h-5 w-5" />,
    text: <Text className="h-5 w-5" />,
  };

  // 카테고리 페이지에서는 알고리즘 상세 페이지로, 메인 페이지에서는 카테고리 페이지로 링크
  const linkHref = isSubCategory
    ? `/${params.locale}/algorithms/${algorithm.category}/${algorithm.id}`
    : `/${params.locale}/algorithms/${algorithm.id}`;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={linkHref} className="block h-full">
        <CardHeader className="flex flex-col items-start gap-2 pb-3">
          <div className="flex items-center gap-2">
            {algorithm.icon && (
              <div className="rounded-md bg-primary/10 p-2 text-gray-500">
                {icons[algorithm.icon as keyof typeof icons]}
              </div>
            )}
            <p className="text-lg font-semibold text-black">{algorithm.title}</p>
          </div>
          <p className="text-sm text-gray-500">{algorithm.description}</p>
        </CardHeader>
        {algorithm.examples && (
          <CardBody className="pb-2">
            <div className="flex flex-wrap gap-2">
              {algorithm.examples.slice(0, 3).map((ex) => (
                <Chip key={ex} className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-500">
                  {ex}
                </Chip>
              ))}
              {algorithm.examples.length > 3 && (
                <Chip variant="bordered" className="rounded-full border-black bg-white px-2 py-1 text-sm text-black">
                  +{algorithm.examples.length - 3}
                </Chip>
              )}
            </div>
          </CardBody>
        )}
        <CardFooter className="pt-2 text-sm text-black">
          <div className="flex items-center">
            자세히 보기
            <ChevronRight className="ml-1 h-4 w-4" />
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
