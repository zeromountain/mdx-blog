import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import React from "react";
import "server-only";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const fetchPages = React.cache(() => {
  return notion.databases
    .query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "status",
        status: {
          equals: "Live",
        },
      },
    })
    .then((res) => {
      const page = res.results[0] as PageObjectResponse;
      // console.log(page.properties?.name?.title?.[0]?.plain_text);
      return res.results as PageObjectResponse[];
    })
    .catch((err) => console.error(err));
});

export const fetchBySlug = React.cache((slug: string) => {
  return notion.databases
    .query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "slug",
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

export const fetchPageBlocks = React.cache((pageId: string) => {
  return notion.blocks.children
    .list({
      block_id: pageId,
    })
    .then((res) => res.results as BlockObjectResponse[])
    .catch((err) => console.error(err));
});
