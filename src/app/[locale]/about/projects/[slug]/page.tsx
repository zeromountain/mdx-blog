import { ArrowLeft } from 'lucide-react';

import Link from 'next/link';

export default function ProjectPage() {
  // contentlayer에서 모든 About 페이지가 로드되면 아래 코드를 사용
  // const project = allAbouts.find(
  //   (about) => about.section === 'projects' && about.slug === params.slug
  // );

  // 개발 중 메시지 표시
  return (
    <div className="mx-auto max-w-2xl px-4">
      {/* 뒤로 가기 버튼 */}
      <div className="mb-8">
        <Link
          href="/about"
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          목록으로 돌아가기
        </Link>
      </div>

      {/* 개발 중 메시지 */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-900/20">
        <h3 className="mb-2 font-medium">개발 중입니다</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          프로젝트 상세 페이지는 현재 개발 중입니다. 곧 완성될 예정입니다.
        </p>
      </div>
    </div>
  );
}
