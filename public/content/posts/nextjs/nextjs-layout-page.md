---
title: nextjs 레이아웃과 페이지
description: nextjs 레이아웃과 페이지 켄벤션 주요 내용
date: 2025-07-27
tags: ['nextjs']
status: Draft
slug: nextjs-layout-page
---

# Next.js App Router에서 Layout과 Page 이해하기

Next.js 13부터 도입된 App Router는 기존 pages 디렉토리 기반 라우팅보다 더 직관적이고 유연한 라우팅 방식을 제공합니다.
이 글에서는 App Router 방식에서 **layout과 page 파일의 역할**, **라우트 구성 방법**, **동적 세그먼트 활용**, 그리고 **페이지 간 네비게이션**에 대해 살펴봅니다.

---

## 1. 페이지(Page) 생성과 구조

Next.js에서 `페이지(Page)`는 **특정 경로에 매핑되는 UI**입니다.
App Router 방식에서는 app 디렉토리 내에 `page.tsx` 또는 `page.js` 파일을 생성하면 해당 파일이 자동으로 라우트 됩니다.

예를들어, 루트 경로(`/`)에 페이지를 만들고 싶다면 app/page.tsx 파일에 아래와 같이 React 컴포넌트를 작성합니다.

```tsx
// app/page.tsx

export default function HomePage() {
  return <div>홈페이지입니다!</div>;
}
```

위 예시에서 HomePage 컴포넌트가 `/` 경로와 매핑되어 사용자에게 렌더링됩니다.
Typescript(.tsx)와 Javascript(.js) 모두 사용가능하며, **반드시 기본 내보내기**를 사용해야 합니다.
