---
title: 서버 컴포넌트와 클라이언틑 컴포넌트의 사용
description: Next.js에서 Server Component와 Client Component의 차이점과 사용 시점, 데이터 전달 방식 등을 설명하며, 최적의 성능과 사용자 경험을 위한 조합 방법을 안내합니다.
date: 2025-07-31
tags: ['nextjs']
status: Live
slug: server-component-client-component-usage
---

**Server Component**와 **Client Component**는 React 애플리케이션의 성능과 사용자 경험을 크게 향상시킵니다.

Server Component는 서버에서 데이터를 가져오고 UI를 렌더링하는 데 사용되며, Client Component는 상호작용 및 브라우저 API가 필요한 경우에 사용됩니다.

이 가이드에서는 두 컴포넌트의 차이점과 언제 사용해야 하는지, 그리고 어떻게 효과적으로 조합할 수 있는지 자세히 알아보겠습니다.

---

## 1. Server Component와 Client Component 사용 시점

### Server Component 언제 사용할까?

Server Component는 다음과 같은 상황에서 사용합니다:

- **데이터 페칭**: 데이터베이스나 API에서 데이터를 가져올 때
- **보안**: API 키와 같은 민감한 정보를 클라이우드에 노출하지 않을 때
- **성능 최적화**: JavaScript 번들 크기를 줄이고 FCP(First Contentful Paint)를 개선할 때
- **스트리밍**: 점진적으로 콘텐츠를 클라이언트로 스트리밍할 때

### Client Component 언제 사용할까?

Client Component는 다음과 같은 상황에서 사용합니다:

- **상태 관리**: `useState`, `useReducer` 등이 필요할 때
- **이벤트 핸들러**: 사용자 상호작용을 처리할 때
- **생명 주기 로직**: `useEffect`, `useLayoutEffect` 등이 필요할 때
- **브라우저 API**: `window`, `document` 등 브라우저 전용 API 사용 시
- **커스텀 훅**: 클라이언트 전용 로직이 포함된 훅 사용 시

### 기본 원칙

기본적으로 레이아웃과 페이지는 **Server Component**로 설정되며, 상호작용이나 브라우저 API가 필요할 때만 **Client Component**를 사용합니다.

---

## 2. 서버 컴포넌트와 클라이언트 컴포넌트의 작동 방식

### 서버에서의 렌더링 과정

1. **서버 컴포넌트 렌더링**: Next.js가 React의 API를 사용하여 서버에서 렌더링을 조율
2. **RSC 페이로드 생성**: 서버 컴포넌트는 React Server Component 페이로드라는 특별한 데이터 형식으로 렌더링
3. **스트리밍**: 압축된 이진 표현을 클라이언트로 전송

### 클라이언트에서의 처리 과정

1. **초기 로드**: HTML이 비대화형 미리보기를 즉시 표시
2. **RSC 페이로드 처리**: 클라이언트와 서버 컴포넌트 트리를 조정
3. **이후 탐색**: RSC 페이로드가 미리 가져오기 및 캐싱되어 즉각적인 네비게이션 가능

### 실제 동작 예시

```tsx
// Server Component
async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <LikeButton postId={post.id} /> {/* Client Component */}
    </article>
  );
}

// Client Component
('use client');
function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);

  return <button onClick={() => setLiked(!liked)}>{liked ? '❤️' : ''} 좋아요</button>;
}
```

---

## 3. 클라이언트 컴포넌트 사용하기

### "use client" 지시어

클라이언트 컴포넌트는 파일 상단에 `"use client"` 지시어를 추가하여 생성합니다.

```tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>클릭 수: {count}</button>;
}
```

### 경계 선언의 중요성

`"use client"`는 서버와 클라이언트 모듈 그래프(트리) 간의 경계를 선언하는 데 사용됩니다. 이 지시어가 지정된 파일은 모든 가져오기(import) 및 자식 컴포넌트가 클라이언트 번들에 포함됨을 의미합니다.

### 최적화 팁

클라이언트 JavaScript 번들의 크기를 줄이기 위해, **특정 상호작용 컴포넌트에만** `'use client'`를 추가하는 것이 좋습니다.

```tsx
// ❌ 나쁜 예시 - 전체 레이아웃이 클라이언트 컴포넌트
'use client';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>정적 헤더</header>
      <main>{children}</main>
      <footer>정적 푸터</footer>
    </div>
  );
}

// ✅ 좋은 예시 - 상호작용이 필요한 부분만 클라이언트 컴포넌트
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>정적 헤더</header>
      <main>{children}</main>
      <SearchBar /> {/* 클라이언트 컴포넌트 */}
      <footer>정적 푸터</footer>
    </div>
  );
}
```

---

## 4. 서버 컴포넌트와 클라이언트 컴포넌트 간 데이터 전달 방법

### Props를 통한 데이터 전달

서버 컴포넌트에서 클라이언트 컴포넌트로 데이터는 props를 통해 전달됩니다.

```tsx
// Server Component
async function UserProfile({ userId }: { userId: string }) {
  const user = await fetchUser(userId);

  return (
    <div>
      <h1>{user.name}</h1>
      <UserActions user={user} /> {/* Client Component */}
    </div>
  );
}

// Client Component
('use client');
function UserActions({ user }: { user: User }) {
  const [isFollowing, setIsFollowing] = useState(false);

  return <button onClick={() => setIsFollowing(!isFollowing)}>{isFollowing ? '언팔로우' : '팔로우'}</button>;
}
```

### 데이터 스트리밍

`use` 훅을 통해 서버 컴포넌트에서 클라이언트 컴포넌트로 데이터 스트리밍을 수행할 수 있습니다.

```tsx
import { use } from 'react';

// Server Component
async function PostList() {
  const postsPromise = fetchPosts();

  return (
    <div>
      <PostListClient postsPromise={postsPromise} />
    </div>
  );
}

// Client Component
('use client');

function PostListClient({ postsPromise }: { postsPromise: Promise<Post[]> }) {
  const posts = use(postsPromise);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### 주의사항

- 클라이언트 컴포넌트에 전달되는 props는 **React에 의해 직렬화 가능**해야 합니다
- **React 컨텍스트**는 서버 컴포넌트에서 지원되지 않으므로 클라이언트 컴포넌트를 사용해야 합니다

---

## 5. 서버와 클라이언트 컴포넌트 활용하기

### Provider 패턴

서버 컴포넌트는 제공자를 직접 렌더링할 수 있으며, 모든 클라이언트 컴포넌트가 이 컨텍스트를 소비할 수 있습니다.

```tsx
// Server Component
import { ThemeProvider } from './theme-provider';
import { useTheme } from './theme-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

// Client Component
('use client');

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '🌞' : '🌙'}</button>
  );
}
```

### 서드파티 컴포넌트 래핑

서드파티 컴포넌트가 클라이언트 전용 기능에 의존할 경우, 클라이언트 컴포넌트로 감싸서 사용합니다.

```tsx
// ❌ 오류 발생
import { Carousel } from 'some-carousel-library';

export default function Gallery() {
  return <Carousel />; // useState를 사용하는 컴포넌트
}

// ✅ 올바른 사용법
'use client';
import { Carousel } from 'some-carousel-library';

function ClientCarousel() {
  return <Carousel />;
}

export default function Gallery() {
  return <ClientCarousel />;
}
```

### 라이브러리 개발자를 위한 가이드

라이브러리 저자는 클라이언트 전용 기능이 필요한 진입점에 `"use client"` 지시어를 추가해야 합니다.

```tsx
// 라이브러리 컴포넌트
'use client';
export function InteractiveComponent() {
  const [state, setState] = useState();
  // 클라이언트 전용 로직
}
```

---

## 6. 성능 최적화 전략

### 번들 크기 최적화

```tsx
// ✅ 좋은 예시 - 필요한 부분만 클라이언트 컴포넌트
export default function ProductPage({ product }: { product: Product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <AddToCartButton productId={product.id} /> {/* 클라이언트 컴포넌트 */}
    </div>
  );
}
```

### 조건부 렌더링

```tsx
// Server Component
async function Dashboard() {
  const user = await getCurrentUser();

  return (
    <div>
      <h1>대시보드</h1>
      {user.isAdmin && <AdminPanel />} {/* 조건부 클라이언트 컴포넌트 */}
    </div>
  );
}
```

### 지연 로딩

```tsx
// Client Component를 지연 로딩
import dynamic from 'next/dynamic';

const HeavyClientComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>로딩 중...</div>,
  ssr: false, // 클라이언트에서만 렌더링
});
```

---

## 7. 주의사항과 제한사항

### Server Component 제한사항

- `useState`, `useEffect` 등 클라이언트 훅 사용 불가
- 이벤트 핸들러 직접 사용 불가
- 브라우저 API 직접 접근 불가

### Client Component 제한사항

- 서버 전용 API 직접 호출 불가
- 데이터베이스 직접 접근 불가
- 환경 변수 중 `NEXT_PUBLIC_` 접두사가 없는 것 접근 불가

### 마이그레이션 고려사항

기존 React 컴포넌트를 Next.js 13+로 마이그레이션할 때:

1. **기본적으로 Server Component로 시작**
2. **상호작용이 필요한 부분만 Client Component로 변환**
3. **점진적으로 최적화**

---

## 마무리

Server Component와 Client Component를 적절히 조합하면 최적의 성능과 사용자 경험을 제공할 수 있습니다.

**핵심 원칙:**

- 기본적으로 Server Component 사용
- 상호작용이 필요한 부분만 Client Component 사용
- 번들 크기와 성능을 고려한 신중한 선택

다음 포스팅에서는 Next.js의 데이터 페칭과 캐싱 전략에 대해 다뤄볼 예정입니다.
