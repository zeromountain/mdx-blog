---
title: 가상돔이란?
description: 리액트의 가상돔 개념정리
date: 2025-04-23
tags: [react, virtual-dom]
status: Live
slug: virtual-dom
---

# Virtual DOM

Virtual DOM이란?

- Virtual DOM은 실제 DOM을 메모리상에서 Javascript 객체로 표현한 것입니다.
- React가 UI를 효율적으로 업데이트하기 위해 사용하며, 실제 DOM 변경을 최소화하여 성능을 향상시키는 역할을 합니다.

## 🚩 Virtual DOM의 동작 원리

### 1️⃣ 초기 렌더링

- 처음 컴포넌트가 렌더링되면 React는 전체 UI를 가상 DOM 객체 트리로 변환합니다.
- 가상 DOM은 메모리에서 실제 DOM 구조를 추상화한 자바스크립트 객체입니다.

```jsx
const App = () => <h1>Hello, World!</h1>;
```

- 이 JSX는 내부적으로 다음과 같이 가상 DOM 객체로 변환됩니다.

```js
{
  type: 'h1',
  props: { children: 'Hello, World!' }
}
```

이 객체를 바탕으로 React가 실제 DOM에 렌더링합니다.

### 2️⃣ 상태(State) 변화 시 동작

- 컴포넌트의 상태가 변하면 React는 새로운 가상 DOM을 생성합니다.
- React는 이전 가상 DOM과 새로운 가상 DOM을 비교하여 차이점(Diff)을 찾아냅니다.
  - 이 과정을 재조정(Reconciliation)이라고 부릅니다.

```jsx
const App = ({ name }) => <h1>Hello, {name}!</h1>;
```

```js
// 이전 가상 돔
{
  type: 'h1',
  props: { children: 'Hello, World!' }
}

// 변경 후 새 가상 돔
{
  type: 'h1',
  props: { children: 'Hello, React!' }
}
```

### 3️⃣ Diffing 알고리즘 (Reconciliation)

React가 두 가상 DOM 간의 변경사항을 효율적으로 찾는 방법을 `Diffing`이라고 합니다.

- 타입이 다른 요소 : React는 이전 요소를 제거하고 새로운 요소로 교체합니다.
- 타입이 같은 요소 : React는 속성(props)과 하위 자식(children)을 비교하여 최소한의 변경사항만을 찾아냅니다.

```jsx
// 변경전
<ul>
  <li key="A">Apple</li>
  <li key="B">Banana</li>
</ul>

// 변경후
<ul>
  <li key="B">Banana</li>
  <li key="A">Apple</li>
  <li key="C">Cherry</li>
</ul>
```

위의 예시에서 React는 다음과 같이 동작합니다.

- 기존의 Apple과 Banana 요소 순서가 바뀌었으므로, 순서만 변경합니다.
- Cherry는 새로운 요소로 판단되어 새로 추가됩니다.

React는 키 속성을 활용해 이 비교를 매우 효율적으로 처리합니다. (key의 값이 고유해야하는 이유)

### 4️⃣ 실제 DOM에 업데이트 적용

- React가 최소한의 변경사항을 찾아내면, 이를 실제 DOM에 적용합니다.
- 이를 통해 성능상 비용이 큰 DOM 조작을 최소화할 수 있습니다.

## 🚩 Virtual DOM의 구현 방법 (원리적 관점)

Virtual DOM의 기본 구현 과정을 간단히 요약하면 다음과 같습니다.

### ① 가상 DOM 객체 생성

```javascript
// 간단한 가상 DOM 구현 예제
function createElement(type, props, ...children) {
  return { type, props: props || {}, children };
}

// 사용 예시
const myVDOM = createElement(
  'div',
  { id: 'root' },
  createElement('h1', null, 'Hello, Virtual DOM'),
  createElement('p', null, 'This is a paragraph.'),
);
```

### ② Diffing 알고리즘 구현

두 가상 DOM 객체를 비교하여 차이를 찾는 단순한 예시는 다음과 같습니다.

```javascript
function diff(oldNode, newNode) {
  // 타입이 다르면 교체
  if (oldNode.type !== newNode.type) {
    return { type: 'REPLACE', newNode };
  }

  // 속성 비교
  if (JSON.stringify(oldNode.props) !== JSON.stringify(newNode.props)) {
    return { type: 'UPDATE_PROPS', props: newNode.props };
  }

  // 자식 노드 재귀적 비교 (생략)
  // ...

  return null; // 변경사항 없음
}
```

### ③ 실제 DOM에 변경사항 반영

차이점을 실제 DOM에 적용하는 단순한 예시입니다.

```javascript
function updateDOM(parent, diff, index = 0) {
  const target = parent.childNodes[index];

  switch (diff.type) {
    case 'REPLACE':
      parent.replaceChild(createRealElement(diff.newNode), target);
      break;
    // 기타 추가적 케이스 처리 가능 (INSERT, UPDATE 등)
  }
}
```

이와 같은 작업을 React는 매우 정교하고 최적화된 방식으로 수행합니다.

## 📌 정리: Virtual DOM의 장점

- **성능 최적화**: DOM 조작 횟수를 최소화하여 UI 업데이트 속도를 향상
- **쉬운 유지보수**: 코드가 명확하게 구조화되어 관리 용이
- **플랫폼 독립성**: 가상 DOM 덕분에 React Native 등 다른 환경에서도 같은 원리로 UI 관리 가능

이 원리를 이해하면 React의 성능을 효율적으로 최적화하거나 문제를 해결하는 데 유용하게 활용할 수 있습니다.
