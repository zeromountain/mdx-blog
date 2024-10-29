import bookmarkPlugin from '@notion-render/bookmark-plugin';
import { NotionRenderer } from '@notion-render/client';
import hljsPlugin from '@notion-render/hljs-plugin';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { BackButton } from '@/components/common/back';
import { fetchBySlug, fetchPageBlocks, notion } from '@/lib/notion';

export default async function SlugPost({ params }: { params: { id: string } }) {
  const post = await fetchBySlug(params.id);

  if (!post) {
    return <div>Not Found Post</div>;
  }

  const blocks = (await fetchPageBlocks(post.id)) as BlockObjectResponse[];

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin({}));
  renderer.use(bookmarkPlugin(undefined));

  const html = await renderer.render(...blocks);

  return (
    <>
      <BackButton />
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
        className="prose w-full max-w-screen-md overflow-hidden scrollbar-hide"
      />
    </>
  );
}
