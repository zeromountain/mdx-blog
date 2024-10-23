import { notFound } from 'next/navigation';

import bookmarkPlugin from '@notion-render/bookmark-plugin';
import { NotionRenderer } from '@notion-render/client';
import hljsPlugin from '@notion-render/hljs-plugin';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { fetchBySlug, fetchPageBlocks, notion } from '@/lib/notion';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetchBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const blocks = (await fetchPageBlocks(post.id)) as BlockObjectResponse[];

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin({}));
  renderer.use(bookmarkPlugin(undefined));

  const html = await renderer.render(...blocks);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
      className="prose"
    />
  );
}
