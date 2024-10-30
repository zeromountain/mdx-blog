import { IPost, ITag, PostDatabaseResponse, TagDatabaseResponse } from '@/types/post';

export function isIPost(obj: unknown): obj is IPost {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const o = obj as IPost;

  return (
    typeof o.id === 'string' &&
    typeof o.title === 'string' &&
    Array.isArray(o.tags) &&
    o.tags.every(isITag) &&
    typeof o.cover === 'string' &&
    typeof o.icon === 'string' &&
    typeof o.publishTime === 'string'
  );
}

export function isPostDatabaseResponse(obj: unknown): obj is PostDatabaseResponse {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const o = obj as PostDatabaseResponse;

  // console.log('isPostDatabaseResponse', { type: typeof obj.properties, properties: obj.properties });

  if (typeof o.id !== 'string') return false;
  if (typeof o.properties !== 'object' || o.properties === null) return false;
  if (typeof o.properties.title !== 'object' || !Array.isArray(o.properties.title.rich_text)) return false;
  // if (!o.properties.title.rich_text.every((titleItem) => typeof titleItem.plain_text !== 'string')) return false;
  if (typeof o.properties.tag !== 'object' || !Array.isArray(o.properties.tag.multi_select)) return false;
  // if (
  //   !o.properties.tag.multi_select.every(
  //     (tag) => typeof tag.id !== 'string' && typeof tag.name !== 'string' && typeof tag.color !== 'string',
  //   )
  // )
  //   return false;
  if (typeof o.properties.created_at !== 'object') return false;
  if (typeof o.properties.created_at.created_time !== 'string') return false;

  return true;
}

export class Post implements IPost {
  public id;
  public title;
  public tags;
  public cover;
  public icon;
  public publishTime;

  protected constructor(post: IPost) {
    this.id = post.id;
    this.title = post.title;
    this.tags = post.tags.map(Tag.create);
    this.cover = post.cover;
    this.icon = post.icon;
    this.publishTime = post.publishTime;
  }

  public static create(data: unknown) {
    if (data instanceof Post) return data;
    if (isIPost(data)) {
      console.log('isIPost');
      return new Post(data);
    }
    if (isPostDatabaseResponse(data)) {
      console.log('isPostDatabaseResponse');
      const title = data.properties.title.rich_text[0] ? data.properties.title.rich_text[0]?.plain_text : '';
      const tags = data.properties.tag.multi_select;
      const cover = data.cover?.external?.url ?? '/default.webp';
      const icon = data.icon?.external?.url ?? '/mascot.webp';
      const publishTime = data.properties.created_at.created_time;
      // return new Post({
      //   id: data.id,
      //   title,
      //   tags,
      //   cover,
      //   icon,
      //   publishTime,
      // });

      return {
        id: data.id,
        title,
        tags,
        cover,
        icon,
        publishTime,
      };
    }
    throw Error('Post 객체 생성 오류');
    // return {
    //   id: '',
    //   title: '',
    //   tags: [],
    //   cover: '',
    //   icon: '',
    //   publishTime: '',
    // };
  }
}

export function isITag(obj: unknown): obj is ITag {
  const o = obj as ITag;
  return (
    o !== null &&
    typeof o === 'object' &&
    typeof o.id === 'string' &&
    typeof o.name === 'string' &&
    typeof o.color === 'string'
  );
}

export function isTagDatabaseResponse(obj: unknown): obj is TagDatabaseResponse {
  const o = obj as TagDatabaseResponse;
  return o !== null && typeof o.color === 'string' && typeof o.id === 'string' && typeof o.name === 'string';
}

export class Tag implements ITag {
  public id;
  public name;
  public color;
  public description;

  protected constructor(tag: ITag) {
    this.id = tag.id;
    this.name = tag.name;
    this.color = tag.color;
    this.description = tag.description;
  }

  public static create(data: unknown) {
    if (data instanceof Tag) return data;
    if (isITag(data)) {
      return new Tag(data);
    }
    if (isTagDatabaseResponse(data)) {
      return new Tag(data);
    }
    throw Error('Tag 객체 생성 오류');
  }
}
