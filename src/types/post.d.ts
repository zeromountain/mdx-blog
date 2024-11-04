export type TextType = {
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  href?: string;
  plain_text: string;
  text: {
    content: string;
    link?: string;
  };
  type: 'text';
};

export interface ITag {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface IPost {
  id: string;
  title: string;
  tags: ITag[];
  cover: string;
  icon: string;
  publishTime: string;
}

export interface PostDatabaseResponse {
  id: string;
  properties: {
    created_at: {
      id: string;
      created_time: string;
      type: 'created_time';
    };
    featured_image: {
      id: string;
      files: {
        file: {
          url: string;
          expiry_time: string;
        };
        name: string;
        type: 'file';
      }[];
      type: 'files';
    };
    name: {
      id: string;
      title: TextType[];
      type: 'title';
    };
    slug: {
      id: string;
      rich_text: TextType[];
      type: 'rich_text';
    };
    status: {
      id: string;
      status: {
        id: string;
        color: string;
        name: string;
      };
      type: 'status';
    };
    tag: {
      id: string;
      multi_select: ITag[];
      type: 'multi_select';
    };
    title: {
      id: string;
      rich_text: TextType[];
      type: 'rich_text';
    };
  };
  url: string;
  created_time: string;
  cover: {
    external?: {
      url?: string;
    };
  };
  icon?: {
    external?: {
      url?: string;
    };
  };
}

export interface PostContentResult {
  object: string;
  id: string;
  parent: any[];
  created_time: string;
  last_edited_time: string;
  created_by: any[];
  last_edited_by: any[];
  has_children: boolean;
  archived: boolean;
  in_trash: boolean;
  type: string;
  paragraph: {
    rich_text: TextType[];
    color: string;
  }[];
}

export interface PostContentResponse {
  object: string;
  results: any[];
  next_cursor?: string;
  has_more: boolean;
  type: string;
  block: any;
  request_id: string;
}

export interface TagDatabaseResponse {
  id: string;
  color: string;
  name: string;
  description: string;
}
