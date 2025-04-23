export interface About {
  _id: string;
  _raw: {
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: 'mdx';
    flattenedPath: string;
  };
  type: 'About';
  title: string;
  description?: string;
  order: number;
  section: string;
  slug: string;
  body: {
    raw: string;
    code: string;
  };
}

declare global {
  interface Window {
    __CONTENTLAYER_DATA: {
      allAbouts: About[];
      allPosts: Post[];
      // 기타 필요한 타입들...
    };
  }
}
