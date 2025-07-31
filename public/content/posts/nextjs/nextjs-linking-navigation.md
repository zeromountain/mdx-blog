---
title: Next.js 링크와 네비게이션 완벽 가이드
description: Next.js에서 링크와 네비게이션이 어떻게 작동하는지, 프리페칭과 클라이언트 사이드 전환을 통한 성능 최적화 방법을 알아봅니다.
date: 2025-01-27
tags: ['nextjs', 'navigation', 'performance']
status: Live
slug: nextjs-linking-navigation
---

Next.js는 기본적으로 서버에서 라우트를 렌더링하므로, 클라이언트가 새 라우트를 보기 전에 서버 응답을 기다려야 합니다. 하지만 Next.js는 **prefetching**, **streaming**, **client-side transitions**을 통해 네비게이션을 빠르고 반응적으로 유지합니다.

이번 글에서는 Next.js에서 네비게이션이 어떻게 작동하는지, 그리고 동적 라우트와 느린 네트워크에 대해 어떻게 최적화할 수 있는지 자세히 알아보겠습니다.

---

## 1. 네비게이션 작동 원리

### 서버 렌더링의 기본 구조

Next.js는 서버가 기본적으로 페이지를 렌더링하며, 첫 방문과 이후 요청 시 서버가 서버 컴포넌트의 데이터를 생성합니다.

서버 렌더링의 두 가지 방식이 있습니다:

- **정적 렌더링**: 빌드 시 또는 재검증 시 캐시
- **동적 렌더링**: 요청 시 실시간으로 렌더링

서버 렌더링은 서버 응답을 기다려야 하므로 페이지 전환이 느릴 수 있지만, Next.js는 **사전 불러오기(`prefetch`)** 와 **클라이언트 측 전환**을 통해 속도를 향상시킵니다.

### 라우팅과 내비게이션의 기본 구조

Next.js에서 라우팅은 기본적으로 서버에서 렌더링되며, 페이지 기반 라우팅이 주로 사용됩니다.

- 앱 내 링크 이동은 `Link` 컴포넌트를 통해 수행
- 페이지 간의 클릭 시 클라이언트-사이드 전환 가능
- 동적 라우트는 폴더 이름에 대괄호 `[]`를 사용하여 매개변수 전달

### 서버와 클라이언트 컴포넌트의 내비게이션 특징

Next.js는 서버 및 클라이언트 컴포넌트를 지원하며, 이들 간의 전환은 `useRouter`를 통해 가능합니다.

- **서버 컴포넌트**: 기본적으로 서버에서 렌더링
- **클라이언트 컴포넌트**: 브라우저에서 실행
- 클라이언트 컴포넌트는 `'use client'`를 사용하여 명시적으로 지정

---

## 2. 프리페치(Prefetching)의 개념과 역할

### 프리페치란?

프리페치는 사용자 네비게이션 전에 경로를 배경에서 미리 로드하는 과정입니다. 이를 통해 링크 클릭 시 이미 데이터가 준비되어 있어 즉각적인 네비게이션 경험이 가능합니다.

Next.js는 사용자의 화면에 들어오는 링크에 대해 **자동으로 프리페치**를 수행합니다.

### 정적/동적 경로에 따른 프리페치 방식 차이

| 경로 타입     | 프리페치 방식                | 특징           |
| ------------- | ---------------------------- | -------------- |
| **정적 경로** | 전체 경로 프리페치           | 빠른 전환 가능 |
| **동적 경로** | 프리페치 생략 또는 부분 수행 | 서버 부하 감소 |

일부 프리페치는 `loading.tsx`가 존재하는 경우에만 가능하며, 이는 부분 프리페치 또는 로딩 대기를 의미합니다.

### 네비게이션 딜레이와 스트리밍

서버 응답을 기다리는 시간은 사용자에게 응답이 느리다는 인상을 줄 수 있습니다. **스트리밍**은 서버가 준비된 부분부터 클라이언트에 보내는 방식으로, 사용자에게 더 빠른 피드백을 제공합니다.

스트리밍은 동적 경로의 일부를 사전 요청하거나 레이아웃, 로딩 스켈레톤을 미리 요청하는 데 활용됩니다.

### loading.tsx로 구현하는 로딩 UI

`loading.tsx`는 경로의 로딩 상태에 보여줄 fallback UI를 구현하는 데 사용됩니다.

**장점:**

- 즉각적 네비게이션과 피드백 제공
- 공통 레이아웃 유지
- 네비게이션 차단 방지
- Core Web Vitals 개선

---

## 3. 클라이언트 사이드 전환으로 향상된 네비게이션 성능

### 클라이언트 사이드 전환이란?

Next.js는 클라이언트 사이드 전환을 사용하여 페이지 전환 시 전체 페이지를 새로 고침하지 않고 콘텐츠만 동적으로 업데이트합니다.

이 방식은 공유 레이아웃과 UI를 유지하며, prefetch된 로딩 상태 또는 새 페이지로 교체하여 사용자 경험을 개선합니다.

### 전환 속도를 저해하는 일반적 요인

1. **동적 라우트에서 loading.tsx 부재**

   - 서버에 요청해야 하는 동적 라우트에서는 `loading.tsx`가 없으면 대기시간 동안 응답이 느리게 느껴질 수 있습니다.

2. **generateStaticParams 누락**
   - 동적 라우트에서 `generateStaticParams`가 누락된 경우, 요청 시 서버 렌더링으로 fallback되어 느린 응답을 유발합니다.

### 느린 네트워크 환경에서의 문제와 해결책

느리거나 불안정한 네트워크에서는 prefetch가 끝나기 전에 링크 클릭이 발생하여 fallback UI인 `loading.js`가 즉시 표시되지 않을 수 있습니다.

**해결책:**

- `loading.tsx` 추가
- `generateStaticParams` 구현
- 네트워크 상태에 따른 조건부 프리페치

---

## 4. 링크 상태를 이용한 사용자 피드백 표시 방법

### useLinkStatus 훅 활용

[`useLinkStatus`](https://nextjs.org/docs/app/api-reference/functions/use-link-status) 훅을 사용하여 전환 중임을 사용자에게 즉각적인 시각적 피드백(스피너 또는 글림)으로 보여줄 수 있습니다.

```tsx
const { isPending } = useLinkStatus();

if (isPending) {
  return <LoadingSpinner />;
}
```

### 로딩 인디케이터 구현 팁

- 지연 시간(예: 100ms)을 두고 시작
- 초기에 투명도로 숨긴 후 애니메이션 적용
- 지정한 지연 시간보다 오래 걸릴 때만 표시하여 불필요한 깜박임 방지

### 사전 데이터 프리페칭 비활성화

`prefetch` 속성을 `false`로 지정하여 사전 로딩을 비활성화할 수 있습니다.

```tsx
<Link href="/large-list" prefetch={false}>
  큰 리스트 보기
</Link>
```

**적용 사례:**

- 큰 리스트나 무한 스크롤 테이블
- 리소스 절약이 필요한 경우
- 호버 시에만 프리페칭하는 전략

---

## 5. 브라우저의 히스토리 API 활용 방법

### pushState와 replaceState

Next.js에서는 native `window.history`의 `pushState`와 `replaceState` 메서드를 사용하여 페이지를 새로고침하지 않고 브라우저 히스토리 스택을 업데이트할 수 있습니다.

#### pushState 사용 예시

```tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function SortProducts() {
  const searchParams = useSearchParams();

  function updateSorting(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortOrder);
    window.history.pushState(null, '', `?${params.toString()}`);
  }

  return (
    <>
      <button onClick={() => updateSorting('asc')}>Sort Ascending</button>
      <button onClick={() => updateSorting('desc')}>Sort Descending</button>
    </>
  );
}
```

#### replaceState 사용 예시

```tsx
'use client';

import { usePathname } from 'next/navigation';

// 애플리케이션의 지역(locale) 변경

export function LocaleSwitcher() {
  const pathname = usePathname();

  function switchLocale(locale: string) {
    // e.g. '/en/about' or '/fr/contact'
    const newPath = `/${locale}${pathname}`;
    window.history.replaceState(null, '', newPath);
  }

  return (
    <>
      <button onClick={() => switchLocale('en')}>English</button>
      <button onClick={() => switchLocale('fr')}>French</button>
    </>
  );
}
```

### pushState vs replaceState

| 메서드           | 특징                      | 사용 사례                 |
| ---------------- | ------------------------- | ------------------------- |
| **pushState**    | 새 항목을 히스토리에 추가 | 제품 정렬, 필터링         |
| **replaceState** | 현재 히스토리 항목을 교체 | 지역 변경, 인증 상태 변경 |

---

## 6. 성능 최적화 팁

### 정적 생성 활용

```tsx
// 동적 라우트에서 정적 생성
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

### 로딩 상태 관리

```tsx
// loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
    </div>
  );
}
```

### 조건부 프리페치

```tsx
// 네트워크 상태에 따른 조건부 프리페치
const isSlowNetwork = useNetworkStatus();

<Link href="/heavy-page" prefetch={!isSlowNetwork}>
  무거운 페이지
</Link>;
```

---

## 7. 정리

Next.js의 네비게이션 시스템은 서버 렌더링의 장점을 유지하면서도 클라이언트 사이드의 빠른 전환을 제공합니다. 프리페칭, 스트리밍, 클라이언트 사이드 전환을 적절히 활용하면 사용자 경험을 크게 향상시킬 수 있습니다.

---

다음 포스팅에서는 Next.js의 데이터 페칭과 캐싱 전략에 대해 다뤄볼 예정입니다.
