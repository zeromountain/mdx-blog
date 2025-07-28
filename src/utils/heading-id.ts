import { ReactNode } from 'react';

/**
 * React children에서 텍스트를 추출합니다.
 */
export const extractTextFromChildren = (children: ReactNode): string => {
  if (typeof children === 'string') {
    return children;
  }
  
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }
  
  if (typeof children === 'object' && children !== null && 'props' in children) {
    return extractTextFromChildren(children.props.children);
  }
  
  return String(children);
};

/**
 * 텍스트에서 ID를 생성합니다.
 */
export const generateHeadingId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '-');
};