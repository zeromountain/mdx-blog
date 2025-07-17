---
title: JSX란?
description: React의 JSX의 개념
date: 2025-04-25
tags: [react]
status: Live
slug: jsx
---

# ✅ JSX(JavaScript XML)란?

JSX는 JavaScript 내부에서 **HTML을 작성할 수 있게 해주는 확장 문법**입니다.

React에서 UI를 직관적이고 선언적으로 작성할 수 있도록 도와줍니다.

---

## 🔷 1. JSX의 기본 개념

JSX는 다음과 같은 코드 형태를 가집니다.

```javascript
const element = <h1>Hello, world!</h1>;
```

- JSX는 실제로는 JavaScript의 표현식(Expression)입니다.
- 브라우저에서 바로 실행될 수 없고, **바벨(Babel)** 과 같은 도구를 사용해 JavaScript로 변환되어야 합니다.

위 JSX 코드는 Babel과 같은 도구에 의해 다음 JavaScript 코드로 변환됩니다:

```javascript
const element = React.createElement('h1', null, 'Hello, world!');
```

---

## 🔷 2. JSX의 동작 원리

JSX를 사용할 때 실제로는 다음 단계가 수행됩니다:

**① JSX 코드 작성**

```jsx
<div className="container">
  <h1>Hello</h1>
  <button onClick={handleClick}>Click</button>
</div>
```

**▼ 변환(Babel 등을 통해 변환)**

```javascript
React.createElement('div', null, React.createElement('h1', null, 'Hello, world!'));
```

- JSX 코드는 **가상 DOM 객체를 생성하는 React.createElement() 함수 호출로 변환**됩니다.
- 이를 통해 React는 UI를 실제 DOM에 렌더링할 수 있게 됩니다.

---

## 🔷 3. JSX의 구현 방법 (내부적으로 일어나는 일)

JSX는 기본적으로 다음 함수 호출로 변환됩니다.

```jsx
React.createElement(
  type, // 태그 이름이나 컴포넌트
  [props], // 속성(props) 객체
  [...children], // 자식 요소
);
```

**📌 예시**

다음 JSX 코드를 살펴봅시다.

```jsx
<MyComponent color="red">Hello, world!</MyComponent>
```

이 코드는 다음과 같은 JavaScript로 변환됩니다.

```jsx
React.createElement(MyComponent, { color: 'red' }, 'Hello, world!');
```

---

## 🔷 3-1. JSX의 속성(props)

JSX에서 속성을 지정하면 React는 객체로 변환하여 컴포넌트에 전달합니다.

```jsx
// JSX
<MyComponent isActive={true} name="React" />
```

```javascript
// 변환된 형태
React.createElement(MyComponent, { isActive: true, name: 'React' });
```

---

## 🔷 3. JSX 구현 방법 (바벨로 변환)

JSX를 사용하기 위해선 **빌드 도구**가 필요합니다. 주로 Babel이 사용됩니다.

**✅ 설치**

```
npm install @babel/core @babel/preset-react
```

**✅ JSX 컴파일 예시**

- 원본 JSX

```jsx
<div className="container">
  <h1>Hello, React!</h1>
</div>
```

- 컴파일된 JavaScript 코드

```javascript
React.createElement('div', { className: 'container' }, React.createElement('h1', null, 'Hello, React!'));
```

---

## 🔷 3. JSX를 통해 단방향 데이터 흐름 구현하기

React는 컴포넌트 간의 데이터를 **단방향**으로 전달하기 위해 props를 사용합니다.

- **상위 컴포넌트**

```jsx
function Parent() {
  const [message, setMessage] = useState('Hello from Parent!');

  return <Child message={message} />;
}
```

- **하위 컴포넌트**

```jsx
function Child({ message }) {
  return <div>{message}</div>;
}
```

데이터는 위에서 아래로만 흐르며, 하위 컴포넌트에서는 전달받은 데이터를 변경할 수 없습니다.

---

## 🔷 3. JSX의 주요 장점

- **직관적 코드 작성**: HTML과 비슷한 문법으로 UI 구조를 쉽게 작성할 수 있습니다.
- **가독성 향상**: 코드만 보고도 UI의 구조를 쉽게 이해할 수 있습니다.
- **생산성 향상**: 선언적 프로그래밍 방식을 통해 UI 개발의 생산성을 높일 수 있습니다.

---

## 🔷 4. JSX 주의사항

- JSX는 예약어를 일부 변경하여 사용합니다. 예를 들어, class 대신 className, for 대신 htmlFor를 사용해야 합니다.
- 모든 JSX 표현식은 **하나의 부모 요소**로 감싸져야 합니다. (단일 요소 규칙)

---

## 🔷 3. JSX를 사용하는데 필요한 설정

JSX를 사용하는 React 프로젝트는 보통 아래 도구로 설정됩니다.

- **Babel**

JSX를 JavaScript로 변환하는 역할

- **Webpack 또는 Vite**

여러 JavaScript 파일 및 리소스를 번들링하고 최적화하여 제공합니다.

- **Create React App 또는 Next.js**

위 설정을 간편하게 포함하여 즉시 사용 가능한 환경 제공

---

## 📌 정리

- JSX는 가독성 좋은 선언적 UI를 간편하게 작성하도록 도와줍니다.
- **JSX → React.createElement() → Virtual DOM → Real DOM**의 흐름을 기억하면,
- React가 UI를 어떻게 렌더링하는지 이해하는 데 도움이 됩니다.
