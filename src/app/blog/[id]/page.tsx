import { BackButton } from '@/components/common/back';
import { fetchSlugPost } from '@/lib/notion';

import BlogContent from './_components/blog-content';

export default async function SlugPost({ params }: { params: { id: string } }) {
  const recordMap = await fetchSlugPost(params.id);

  return (
    <>
      <BackButton />
      <BlogContent recordMap={recordMap} />
    </>
  );
}
