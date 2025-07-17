---
title: 컴포넌트 생명주기
description: 리액트의 컴포넌트 생명주기
date: 2025-04-28
tags: [react]
status: Live
slug: component-life-cycle
---

React의 컴포넌트 생명주기(Lifecycle)는 컴포넌트가 생성(mount), 업데이트(update), 제거(unmount)될 때 React가 호출하는 일련의 메서드입니다.

컴포넌트 생명주기를 이해하면 컴포넌트가 언제 렌더링되는지, 언제 데이터를 불러올지, 언제 자원을 정리할지 등을 명확하게 이해하고 관리할 수 있습니다.

# ✅ 생명주기(Lifecycle)란?

컴포넌트가 DOM에 나타나고(mount), 업데이트되고(update), 사라질 때(unmount), React는 특정 메서드를 호출합니다.

크게 세 가지 단계로 나뉩니다:

- **Mounting** (생성)
- **Updating** (업데이트)
- **Unmounting** (제거)

## 📌 클래스 컴포넌트에서의 생명주기 메서드

함수 컴포넌트는 Hooks(useEffect)로 관리하며, 클래스 컴포넌트에서만 lifecycle 메서드를 직접 사용합니다.

React 컴포넌트의 대표적인 생명주기 메서드는 다음과 같습니다:

- **Mounting**(생성 및 추가) : `constructor()`, `render()`, `componentDidMount()`
- **Updating**(업데이트) : `shouldComponentUpdate()`, `componentDidUpdate()`
- **Unmounting**(제거) : `componentWillUnmount()`

## 🔷 각 생명주기 단계의 동작 원리

### 📌 1. Mounting (생성 단계)

컴포넌트가 처음 DOM에 추가될 때 실행되는 단계입니다.

순서는 다음과 같습니다:
1. **constructor**
2. **getDerivedStateFromProps**
3. **render**
4. **componentDidMount**

- 보통 **초기 상태 설정**, API 호출, 외부 데이터 가져오기를 합니다.

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // 상태 초기화
  }

  static getDerivedStateFromProps(props, state) {
    // 상태 초기화 또는 변경 시 props에 따라 업데이트
    return null; // 변경 없으면 null 반환
  }

  componentDidMount() {
    // DOM 생성 후 호출되는 메서드 (API 요청 등 초기화 작업)
    console.log('Component mounted!');
  }

  render() {
    return <h1>{this.state.count}</h1>;
  }
}
```

### 📌 2. Updating (업데이트 단계)

컴포넌트의 상태(state)나 props가 변경될 때 실행됩니다.

순서는 다음과 같습니다:
1. **getDerivedStateFromProps**
2. **shouldComponentUpdate**
3. **render**
4. **getSnapshotBeforeUpdate**
5. **componentDidUpdate**

```jsx
shouldComponentUpdate(nextProps, nextState) {
  // 업데이트 여부 결정
  return nextState.count !== this.state.count;
}

componentDidUpdate(prevProps, prevState, snapshot) {
  // DOM 업데이트 이후 호출됨
  console.log('Component updated!');
}
```

- shouldComponentUpdate에서 **false**를 리턴하면 업데이트를 막을 수 있습니다.
- **componentDidUpdate**는 DOM 업데이트 후 호출되어, 업데이트 후 처리(예: 데이터 재요청)에 사용됩니다.

### 📌 3. Unmounting (제거 단계)

컴포넌트가 DOM에서 제거될 때 호출되는 메서드입니다.

이 단계는 메서드가 하나뿐입니다:

- **componentWillUnmount**

```jsx
componentWillUnmount() {
  // 이벤트 리스너 정리, 타이머 제거 등 리소스 정리
  console.log('Component unmounted!');
}
```

## 📌  생명주기 메서드 사용 예시 코드

다음은 각 단계를 명확하게 이해할 수 있도록 작성한 클래스형 컴포넌트 예시입니다.

```jsx
import React from 'react';

class LifecycleExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true; // 항상 업데이트
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    return null; // 스냅샷 값 반환 가능
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    console.log('render');
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          증가
        </button>
      </div>
    );
  }
}

export default LifecycleExample;
```

**로그 순서 예시**:

```
constructor
getDerivedStateFromProps
render
componentDidMount

(상태 변경 시)
getDerivedStateFromProps
shouldComponentUpdate
render
getSnapshotBeforeUpdate
componentDidUpdate
```

## 📌 Hooks로 구현 시 (함수형 컴포넌트)

최근 React는 함수형 컴포넌트와 훅(useEffect)을 사용합니다.

클래스 컴포넌트의 생명주기는 함수 컴포넌트에서 다음과 같이 표현됩니다:

```jsx
import React, { useState, useEffect } from 'react';

function LifecycleExample() {
  const [count, setCount] = useState(0);

  // Mount (componentDidMount)
  useEffect(() => {
    console.log('Component Mounted');

    // Unmount 단계에서 실행될 정리함수 반환
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  // count가 변경될 때마다 실행 (componentDidUpdate와 유사)
  useEffect(() => {
    console.log('Component updated:', count);
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

## 📌 정리

React 컴포넌트는 Mount, Update, Unmount 단계에 따라 특정 메서드를 호출하여 동작합니다.

- **Mount** 단계에서는 초기화 작업과 데이터 로드를 수행합니다.
- **Update** 단계에서는 UI가 최신 상태로 유지되도록 업데이트 여부를 결정합니다.
- **Unmount** 단계에서는 리소스를 정리하고 메모리 누수를 방지합니다.

생명주기 메서드 및 훅(useEffect)을 적절히 활용하면 React 컴포넌트가 효율적으로 관리됩니다.

---
SNS 서비스를 예로 들어 React의 컴포넌트 생명주기(Lifecycle) 원리를 쉽게 설명해 보겠습니다.

아래는 SNS에서 흔히 볼 수 있는 피드(Feed) 컴포넌트를 예로 들어 생명주기 메서드를 설명한 것입니다.

---

### ✅ SNS 앱의 피드 컴포넌트 생명주기 예시

SNS 앱을 생각하면, 다음과 같은 과정이 일어납니다:

1. 처음 피드를 로딩할 때 (Mount)
2. 사용자가 새 게시물을 작성하거나 스크롤하여 데이터를 더 불러올 때 (Update)
3. 다른 화면으로 이동하거나 앱을 종료할 때 (Unmount)

---

#### 🔷 1단계: Mount (피드 컴포넌트 생성)

피드 컴포넌트가 처음 화면에 나타나는 시점입니다.

이때 필요한 작업:

- 서버에서 최신 게시물 목록 가져오기 (API 호출)
- 초기 화면 설정 (데이터가 오기 전 로딩 화면)

**📌 Mount 단계에서의 주요 메서드**

- **constructor**
- 상태(state) 초기 설정 (게시물 목록, 로딩 상태 등)
- **render**
- 컴포넌트의 초기 UI 렌더링 (로딩 화면 등)
- **componentDidMount**
- 서버에서 실제 게시물 데이터를 받아옴 (API 요청)

**▶️ 예제 코드**

```jsx
class FeedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],          // 게시물 목록 초기화
      loading: true,      // 로딩 상태 관리
    };
  }

  componentDidMount() {
    // 컴포넌트가 화면에 등장한 후 데이터 요청
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => this.setState({ posts: data, loading: false }));
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {this.state.posts.map(post => (
          <Post key={post.id} data={post} />
        ))}
      </div>
    );
  }
}
```

---

#### 🔷 2단계: Update (피드 컴포넌트 업데이트)

사용자가 피드에서 새로운 게시물을 작성하거나, 스크롤하여 다음 게시물 목록을 불러올 때 이 단계가 발생합니다.

이때 필요한 작업:

- 업데이트된 상태(state)에 따라 다시 렌더링
- 필요 시 서버에서 추가 데이터를 요청

**📌 Update 단계에서의 주요 메서드**
- **shouldComponentUpdate**
- 불필요한 렌더링을 막기 위해, 실제 변경이 있을 때만 업데이트 결정
- **render**
- 업데이트된 상태를 화면에 다시 그립니다.
- **componentDidUpdate**
- 데이터 변경이 발생하면 추가 작업(API 재요청 등)을 수행합니다.

**▶️ 예제 코드 (새로운 게시물 추가)**

```jsx
componentDidUpdate(prevProps, prevState) {
  if (prevState.posts.length !== this.state.posts.length) {
    console.log('새로운 게시물이 추가되었습니다.');
  }
}

handleNewPost = (newPost) => {
  this.setState(prevState => ({
    posts: [newPost, ...prevState.posts],
  }));
};
```

이 과정에서 사용자가 새 게시물을 올리면 상태(state.posts)가 변경되고,

컴포넌트는 자동으로 **render() → componentDidUpdate()**를 실행하여 UI를 갱신합니다.

---

#### 🔷 3단계: Unmount (피드 컴포넌트 제거)

사용자가 다른 화면(예: 프로필, 설정)으로 이동하거나 앱을 종료할 때, 피드 컴포넌트가 화면에서 제거되는 단계입니다.

이때 필요한 작업:
- 타이머, 이벤트 리스너 제거
- 불필요한 요청 취소 (메모리 누수 방지)

**📌 Unmount 단계에서의 주요 메서드**

- **componentWillUnmount**
- 이벤트 리스너 및 리소스 정리

**▶️ 예제 코드 (이벤트 리스너 제거)**

```jsx
componentDidMount() {
  window.addEventListener('scroll', this.handleScroll);
}

componentWillUnmount() {
  window.removeEventListener('scroll', this.handleScroll);
  console.log('피드 컴포넌트가 화면에서 제거됨.');
}

handleScroll = () => {
  // 무한스크롤 처리 로직
};
```

- 피드의 무한 스크롤 기능을 구현할 때, 컴포넌트가 제거되면 **반드시 이벤트 리스너를 정리**하여 메모리 누수를 막아야 합니다.


#### 📌 함수형 컴포넌트에서의 구현 (useEffect 활용)

최근에는 함수형 컴포넌트를 사용하는 경우가 많습니다.

함수형 컴포넌트의 생명주기 관리에는 useEffect 훅을 사용합니다.

**▶️ 함수형 예제 (Mount, Update, Unmount 모두 처리)**

```jsx
import React, { useState, useEffect } from 'react';

function FeedComponent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mount (생성 단계)
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });

    // Unmount (제거 단계)
    return () => {
      console.log('Feed 컴포넌트 제거됨');
    };
  }, []); // 빈 배열([])은 마운트와 언마운트 때만 실행됨

  useEffect(() => {
    // Update (업데이트 단계)
    console.log('게시물 목록이 업데이트됨:', posts.length);
  }, [posts]); // posts 상태가 변경될 때만 실행됨

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} data={post} />
      ))}
    </div>
  );
}
```

- Mount 시 데이터 로딩
- 게시물 목록(posts)이 변경될 때마다 업데이트 로직 실행
- 컴포넌트 제거 시(Unmount) 리소스 정리
