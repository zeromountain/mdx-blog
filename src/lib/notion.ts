import 'server-only';

import React from 'react';

import { Client } from '@notionhq/client';
import {
  BlockObjectResponse,
  DatabaseObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

import { NotionAPI } from 'notion-client';

import { PostContentResponse, PostDatabaseResponse } from '@/types/post';

const DATABASE_ID = process.env.NOTION_DATABASE_ID!;
const NOTION_USER = process.env.NOTION_USER_ID!;
const NOTION_TOKEN_V2 = process.env.NOTION_TOKEN_V2!;

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// @notionhq/client

export const fetchPages = React.cache(async () => {
  return await notion.databases
    .query({
      database_id: DATABASE_ID,
      filter: {
        property: 'status',
        status: {
          equals: 'Live',
        },
      },
    })
    .then((res) => {
      return res.results as DatabaseObjectResponse[];
    })
    .catch((err) => console.error(err));
});

export const fetchBySlug = React.cache(async (slug: string) => {
  return await notion.databases
    .query({
      database_id: DATABASE_ID,
      filter: {
        property: 'slug',
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => {
      return res.results[0] as PageObjectResponse | undefined;
    })
    .catch((err) => console.error(err));
});

export const fetchPageBlocks = React.cache(async (pageId: string) => {
  return await notion.blocks.children
    .list({
      block_id: pageId,
    })
    .then((res) => res.results as BlockObjectResponse[])
    .catch((err) => console.error(err));
});

export const fetchTags = React.cache(
  async () =>
    await notion.databases
      .retrieve({
        database_id: DATABASE_ID,
      })
      .then((res) => (res as any).properties.tag.multi_select.options),
);

// react-notion-x
const notionApi = new NotionAPI({
  activeUser: NOTION_USER,
  authToken: NOTION_TOKEN_V2,
});

export const fetchSlugPost = React.cache(async (slug: string) => await notionApi.getPage(slug));

export const fetchPostMetadata = React.cache(async (id: string) => {
  const pageResponse = (await notion.pages.retrieve({
    page_id: id,
  })) as unknown as PostDatabaseResponse;

  const contentResponse = (await notion.blocks.children.list({
    block_id: id,
  })) as unknown as PostContentResponse;

  // const title = pageResponse.properties.title[0].plain_text;
  const title = pageResponse.properties.title.rich_text[0].plain_text;
  const tags = pageResponse.properties.tag.multi_select.map((option) => option.name);

  const content =
    contentResponse.results
      .filter((block) => block.type === 'paragraph')
      .map((block) => block.paragraph.rich_text?.[0]?.plain_text || '')
      .join('')
      .substring(0, 100) || '';

  return {
    title,
    tags,
    content,
  };
});
