import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

// 테이블 관련 오류로 인해 remark-gfm 플러그인은 사용하지 않습니다
// import remarkGfm from 'remark-gfm';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    status: { type: 'string', required: true, default: 'Live' },
    slug: { type: 'string', required: true },
    category: { type: 'string' }, // 카테고리 필드 추가 (선택적)
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post.slug}`,
    },
    readingTime: {
      type: 'json',
      resolve: (doc) => readingTime(doc.body.raw),
    },
    // 파일 경로에서 카테고리 자동 추출
    category: {
      type: 'string',
      resolve: (doc) => {
        // posts/카테고리/파일명.mdx 형태에서 카테고리 추출
        const pathSegments = doc._raw.flattenedPath.split('/');
        // posts 다음에 오는 부분이 카테고리
        return pathSegments.length > 1 ? pathSegments[1] : 'uncategorized';
      },
    },
  },
}));

export const About = defineDocumentType(() => ({
  name: 'About',
  filePathPattern: `about/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
    order: { type: 'number', required: true }, // 표시 순서
    section: { type: 'string', required: true }, // 섹션 구분 (profile, skills, experience, projects)
    techStack: { type: 'list', of: { type: 'string' }, default: [] }, // 기술 스택
    thumbnail: { type: 'string' }, // 썸네일 이미지 경로
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => {
        // 폴더 경로를 포함한 slug 생성
        const pathWithoutFileExtension = doc._raw.flattenedPath.replace(/\.mdx$/, '');
        const pathSegments = pathWithoutFileExtension.split('/');
        return pathSegments.slice(1).join('/'); // about/ 이후의 경로를 사용
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, About],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});
