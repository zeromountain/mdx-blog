'use client';

import copy from 'copy-to-clipboard';
import { Check, Copy } from 'lucide-react';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { Highlight, themes } from 'prism-react-renderer';

import NextImage from 'next/image';

import { Children, ReactNode, isValidElement, useMemo, useState } from 'react';

interface MDXContentProps {
  code: string;
}

// 이미지 컴포넌트 타입 정의
interface CustomImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  [key: string]: any; // 기타 props 타입 정의
}

// 로컬 이미지인지 확인하는 함수
const isLocalImage = (src: string) => {
  return !src.startsWith('http') && !src.startsWith('https') && !src.startsWith('//');
};

// 이미지 컴포넌트
const CustomImage = ({ src, alt, width, height, ...rest }: CustomImageProps) => {
  if (!src) return null;

  // 로컬 이미지 경로 처리
  const imgSrc = isLocalImage(src) ? `/images/${src}` : src;

  return (
    <div className="my-6 overflow-hidden rounded-lg">
      <NextImage
        src={imgSrc}
        alt={alt || ''}
        width={width || 800}
        height={height || 450}
        className="transition-transform duration-500 ease-in-out hover:scale-105"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '500px',
          objectFit: 'contain',
        }}
        unoptimized
        onError={(e) => {
          // 이미지 로드 실패 시 기본 이미지 표시
          const target = e.target as HTMLImageElement;
          target.src = '/projects/project-default.png';
          target.onerror = null; // 무한 루프 방지
        }}
        {...rest}
      />
      {alt && <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">{alt}</p>}
    </div>
  );
};

// CodeBlock 컴포넌트 타입 정의
interface CodeBlockProps {
  className?: string;
  children: string | ReactNode;
}

const CodeBlock = ({ className, children }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  // 언어 추출 및 문자열로 변환
  const language = className ? className.replace(/language-/, '') : '';
  const codeString = typeof children === 'string' ? children : String(children);

  const handleCopy = () => {
    copy(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <div className="absolute right-2 top-2 z-10">
        <button
          onClick={handleCopy}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800/60 text-gray-200 backdrop-blur transition-colors hover:bg-gray-700/70"
          aria-label="복사하기"
        >
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>

      <Highlight theme={themes.nightOwl} code={codeString.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto rounded-lg p-4 text-sm`}
            style={{
              ...style,
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} style={{ display: 'flex' }}>
                <span className="mr-4 inline-block w-5 text-right opacity-50">{i + 1}</span>
                <span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  const components = {
    pre: (props: any) => <>{props.children}</>,
    code: (props: any) => {
      const { className, children } = props;
      // 인라인 코드인지 코드 블록인지 확인
      const isInlineCode = !className;
      if (isInlineCode) {
        return (
          <code className="rounded-md bg-gray-100 px-1 py-0.5 font-normal text-primary-700 dark:bg-gray-800 dark:text-primary-400">
            {children}
          </code>
        );
      }

      return <CodeBlock className={className}>{children}</CodeBlock>;
    },
    img: (props: any) => {
      // key prop을 추출하여 전달하지 않음 (React 경고 방지)
      const { key, ...rest } = props; // eslint-disable-line @typescript-eslint/no-unused-vars
      return <CustomImage {...rest} />;
    },
    p: (props: any) => {
      // key prop을 추출하여 전달하지 않음
      const { key, children, ...rest } = props; // eslint-disable-line @typescript-eslint/no-unused-vars
      // 자식 요소가 img 컴포넌트인 경우 p 태그를 사용하지 않음
      if (
        Children.toArray(children).some((child) => isValidElement(child) && (child.type === 'img' || child.props?.src))
      ) {
        return <>{children}</>;
      }
      return (
        <p className="text-sm" {...rest}>
          {children}
        </p>
      );
    },
    h1: (props: any) => <h1 className="mb-4 mt-8 text-3xl font-bold" {...props} />,
    h2: (props: any) => <h2 className="mb-3 mt-6 text-2xl font-bold" {...props} />,
    h3: (props: any) => <h3 className="mb-2 mt-5 text-xl font-semibold" {...props} />,
    h4: (props: any) => <h4 className="mb-2 mt-4 text-lg font-semibold" {...props} />,
    h5: (props: any) => <h5 className="mb-1 mt-3 text-base font-semibold" {...props} />,
    h6: (props: any) => <h6 className="mb-1 mt-3 text-sm font-semibold" {...props} />,
    ul: (props: any) => <ul className="my-3 list-inside list-disc pl-4 text-sm" {...props} />,
    ol: (props: any) => <ol className="my-3 list-inside list-decimal pl-4 text-sm" {...props} />,
    li: (props: any) => <li className="my-1 text-sm" {...props} />,
    a: (props: any) => <a className="text-primary-600 hover:underline dark:text-primary-400" {...props} />,
    blockquote: (props: any) => (
      <blockquote
        className="border-l-4 border-gray-200 py-1 pl-4 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300"
        {...props}
      />
    ),
    table: (props: any) => (
      <div className="my-4 overflow-x-auto">
        <table className="w-full min-w-full border-collapse rounded-md text-sm" {...props} />
      </div>
    ),
    thead: (props: any) => <thead className="bg-gray-50 dark:bg-gray-800" {...props} />,
    tbody: (props: any) => <tbody {...props} />,
    tr: (props: any) => <tr className="border-b border-gray-200 dark:border-gray-700" {...props} />,
    th: (props: any) => <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300" {...props} />,
    td: (props: any) => <td className="p-3 text-gray-600 dark:text-gray-400" {...props} />,
  };

  return (
    <div className="mdx-container text-gray-800 dark:text-gray-200">
      <Component components={components} />
    </div>
  );
}
