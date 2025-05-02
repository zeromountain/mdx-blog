'use client';

import { Card, CardBody, Tab, Tabs } from '@heroui/react';

import { notFound } from 'next/navigation';

import { AlgorithmCode } from '@/components/algorithm/algorithm-code';
import { AlgorithmExplanation } from '@/components/algorithm/algorithm-explanation';
import { AlgorithmVisualizer } from '@/components/algorithm/algorithm-visualizer';
import { getAlgorithmData } from '@/lib/algorithms';

interface AlgorithmsDetailPageProps {
  params: {
    category: string;
    id: string;
  };
}
export default function AlgorithmsDetailPage({ params }: AlgorithmsDetailPageProps) {
  const { id } = params;

  const algorithmData = getAlgorithmData(id);
  const tabs = [
    { key: 'visualization', label: '시각화' },
    { key: 'code', label: '코드' },
    { key: 'explanation', label: '설명' },
  ];

  if (!algorithmData) {
    notFound();
  }

  const renderTabContent = (tab: string) => {
    switch (tab) {
      case 'visualization':
        return <AlgorithmVisualizer algorithm={algorithmData} />;
      case 'code':
        return <AlgorithmCode algorithm={algorithmData} />;
      case 'explanation':
        return <AlgorithmExplanation algorithm={algorithmData} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs aria-label="Algorithm Tabs" fullWidth color="secondary">
        {tabs.map((tab) => (
          <Tab key={tab.key} title={tab.label} className="">
            <Card>
              <CardBody>{renderTabContent(tab.key)}</CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
