import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { BackButton } from '@/components/common/back';
import { fetchPages, fetchPostMetadata, fetchSlugPost } from '@/lib/notion';

import BlogContent from './_components/blog-content';

export const revalidate = 1800;

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({ params }: Props) => {
  const { title, tags, content } = await fetchPostMetadata(params.id);

  return {
    title,
    description: content,
    keywords: tags,
  };
};

export const generateStaticParams = async () => {
  const posts = (await fetchPages()) as unknown as DatabaseObjectResponse[];

  return posts.map((post) => ({ id: post.id }));
};

export default async function SlugPost({ params }: { params: { id: string } }) {
  const recordMap = await fetchSlugPost(params.id);

  return (
    <>
      <BackButton />
      <BlogContent recordMap={recordMap} />
    </>
  );
}
