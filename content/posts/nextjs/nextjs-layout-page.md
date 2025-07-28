---
title: nextjs 레이아웃과 페이지
description: nextjs 레이아웃과 페이지 켄벤션 주요 내용
date: 2025-07-27
tags: ['nextjs']
status: Live
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

위 예시에서 HomePage 컴포넌트가 `/` 경로와 매핑되어 사용자에게 렌더링됩니다. Typescript(.tsx)와 Javascript(.js) 모두 사용가능하며, **반드시 기본 내보내기(`export default`)** 를 사용해야 합니다.

---

## 2. 레이아웃(Layout)과 공통 UI

`layout.tsx` 파일은 **여러 페이지에서 공유되는 UI**를 정의하는 데 사용됩니다. 레이아웃은 **페이지 간 전환 시 상태를 유지**하며 불필요한 리렌더링을 방지합니다. 예를 들어, 상단 네비게이션 바, 사이드바 등 공통 UI를 `layout.tsx` 에서 정의할 수 있습니다.

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>공통 네비게이션</header>
        <main>{children}</main>
        <footer>공통 푸터</footer>
      </body>
    </html>
  );
}
```

### 레이아웃의 특징

- children prop을 사용해 하위 페이지 또는 하위 레이아웃을 감쌉니다.
- 네비게이션 시 상태를 유지하여 **인터랙티브한 UI를 재렌더링하지 않습니다.**
- `app/layout.tsx` 는 **루트 레이아웃(Root Layout)** 역할을 하며, 반드시 `<html>`과 `<body>` 태그를 포함해야 합니다.

---

## 3. 중첩 라우트(Nested Routes)와 레이아웃

Next.js App Router에서는 폴더 구조가 곧 라우트 구조입니다. 예를 들어 `/dashboard/profile` 경로를 만들고 싶다면 다음과 같이 폴더를 구성합니다.

```txt
app/
 ├─ dashboard/
 │   ├─ layout.tsx
 │   └─ profile/
 │       └─ page.tsx
```

위 구조에서 `dashboard/layout.tsx` 는 `/dashboard` 와 그 하위 페이지들에만 **네스티드 레이아웃**이 됩니다.

---

## 4. 동적 세그먼트 (Dynamic Segments)

동적 라우트는 **대괄호([])** 로 폴더 이름을 감싸 정의합니다. 예를 들어, 블로그 포스트 경로 `/blog/[slug]` 를 만들기 위해 아래와 같이 구성할 수 있습니다.

```txt
app/
 └─ blog/
     └─ [slug]/
         └─ page.tsx
```

`[slug]` 값은 params로 접근할 수 있습니다.

```tsx
// app/blog/[slug]/page.tsx
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <h1>Post: {params.slug}</h1>;
}
```

정적 사이트 생성(SSG)을 위해 generateStaticParams 함수를 활용하면 빌드 시 동적 경로를 미리 생성할 수 있습니다.

---

## 5. 검색 파라미터 (Search Params)

URL의 **쿼리 파라미터**를 다루려면 서버 컴포넌트에서 searchParams를 사용할 수 있습니다.

```tsx
export default function Products({ searchParams }: { searchParams: { category?: string } }) {
  return <div>선택된 카테고리: {searchParams.category}</div>;
}
```

클라이언트 컴포넌트에서는 `useSearchParams` 훅을 사용하여 쿼리 파라미터에 접근할 수 있습니다.

---

## 6. 페이지 간 네비게이션

Next.js에서는 **next/link** 컴포넌트를 사용해 클라이언트 사이드 네비게이션을 구현합니다.

```tsx
import Link from 'next/link';

export default function BlogList() {
  return (
    <ul>
      <li>
        <Link href="/blog/nextjs-intro">Next.js 소개</Link>
      </li>
    </ul>
  );
}
```

`next/link` 는 **사전 로드(prefetching)** 기능을 제공해 페이지 전환 속도를 향상시킵니다. 보다 정교한 라우팅이 필요하다면 **useRouter** 훅을 사용할 수 있습니다.

---

## 7. 정리

- **page.tsx** : 경로와 직접 매핑되는 UI 페이지
- **layout.tsx** : 여러 페이지에서 공통으로 사용하는 UI (상태 유지 및 최상위 HTML 구조 제공)
- **중첩라우트** : 폴더 계층으로 구현 가능
- **동적 세그먼트** : `[slug]` 와 같은 폴더명으로 동적 경로 처리
- **next/link** : 빠른 클라이언트 사이드 네비게이션 지원

---

다음 포스팅에서는 App Router 기반에서 서버 컴포넌트와 클라이언트 컴포넌트를 조합하는 방법, 그리고 SEO 최적화를 위한 메타데이터 설정에 대해 다뤄볼 예정입니다.
