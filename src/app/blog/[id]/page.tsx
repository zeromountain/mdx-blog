import bookmarkPlugin from '@notion-render/bookmark-plugin';
import { NotionRenderer } from '@notion-render/client';
import hljsPlugin from '@notion-render/hljs-plugin';

import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { BackButton } from '@/components/common/back';
import { fetchBySlug, fetchPageBlocks, fetchTags, notion } from '@/lib/notion';

import BlogContent from './_components/blog-content';

export default async function SlugPost({ params }: { params: { id: string } }) {
  const post = await fetchBySlug(params.id);
  const tags = await fetchTags();

  console.log({ tags });

  if (!post) {
    return <div>Not Found Post</div>;
  }

  const blocks = (await fetchPageBlocks(post.id)) as BlockObjectResponse[];

  // console.log({ post });

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin({}));
  renderer.use(bookmarkPlugin(undefined));

  // console.log({ block: blocks.find((block) => block.type === 'code')?.code.language });

  const html = await renderer.render(...blocks);

  return (
    <>
      <BackButton />
      {/* <BlogContent recordMap={post} /> */}
    </>
  );
}
