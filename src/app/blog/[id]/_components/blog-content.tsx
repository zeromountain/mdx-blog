'use client';

import Image from 'next/image';

import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import 'react-notion-x/src/styles.css';

import { ExtendedRecordMap } from 'notion-types';

export default function BlogContent({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      components={{
        nextImage: Image,
        Code,
        Collection,
        Modal,
        Equation,
      }}
      fullPage={true}
      previewImages={false}
      disableHeader
    />
  );
}
