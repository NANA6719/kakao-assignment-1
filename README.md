# Todo App - React

## 프로젝트 소개

1주차 과제에서 Vanilla JavaScript로 구현한 Todo App을 React Function Component 구조로 마이그레이션한 프로젝트입니다

기존 기능을 React의 상태(State) 기반 구조로 재설계하였으며, useState와 useEffect를 활용하여 데이터 관리와 LocalStorage 저장을 구현했습니다

또한 컴포넌트 단위로 UI를 분리하여 유지보수성과 재사용성을 향상시켰습니다

---

## 주요 기능

### Todo CRUD

* Todo 생성(Create)
* Todo 수정(Update)
* Todo 삭제(Delete)
* Todo 완료 처리(Complete)

### 상태별 필터링

* ALL : 전체 Todo 조회
* ING : 진행 중 Todo 조회
* CLEAR : 완료된 Todo 조회

### 일간 뷰

* 이전 날짜 / 다음 날짜 이동
* 날짜별 Todo 관리
* 선택한 날짜의 Todo만 표시

### 주간 뷰

* 이전 주 / 다음 주 이동
* 주간 달력 표시
* 날짜 선택 시 일간 뷰와 연동
* 날짜별 Todo 개수 표시

### Local Storage

* Todo 데이터 자동 저장
* 새로고침 후 데이터 유지
* 주간 뷰 상태 유지

---

## 과제 1 대비 개선 사항

### 1. Vanilla JS → React 마이그레이션

기존에는 DOM을 직접 조작하여 화면을 변경했지만 React에서는 상태(State)가 변경되면 UI가 자동으로 렌더링되도록 개선했습니다.

### 2. Prompt 기반 수정 기능 제거

기존:

* prompt()를 이용한 Todo 수정

개선:

* 인라인 편집 UI 제공
* React 상태를 이용한 편집 모드 전환

### 3. Local Storage 구조 개선

기존:

* 생성, 수정, 삭제 함수마다 localStorage 저장 호출

개선:

* useEffect를 이용한 자동 저장
* todos 상태 변경 시 자동 동기화

### 4. 컴포넌트 분리

기존:

* 하나의 파일에서 대부분의 기능 처리

개선:

* MainPanel
* SidePanel
* DateNavigator
* TodoForm
* TodoList
* TodoItem
* FilterTabs
* WeekNavigator
* WeekDayCard

각 기능을 독립 컴포넌트로 분리하여 유지보수성을 향상

### 5. 안정성 개선

* JSON.parse 예외 처리
* Local Storage 초기화 처리
* 고유 ID 생성 방식 개선

---

## 기술 스택

### Frontend

* React
* Vite

### State Management

* useState
* useEffect

### Storage

* Local Storage

### Styling

* CSS3

---

## 프로젝트 구조

```text
src
├── App.jsx
├── main.jsx
├── index.css
│
├── MainPanel
│   ├── MainPanel.jsx
│   ├── DateNavigator.jsx
│   ├── TodoForm.jsx
│   ├── TodoList.jsx
│   └── TodoItem.jsx
│
└── SidePanel
    ├── SidePanel.jsx
    ├── FilterTabs.jsx
    ├── WeekNavigator.jsx
    └── WeekDayCard.jsx
```

---

## 설치 및 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/NANA6719/kakao-assignment-1.git
```

### 2. 프로젝트 폴더 이동

```bash
cd kakao-assignment-1
```

### 3. 의존성 설치

```bash
npm install
```

### 4. 개발 서버 실행

```bash
npm run dev
```

### 5. 브라우저 접속

```text
http://localhost:5173
```

---

## 학습 내용

이번 과제를 통해 다음 내용을 학습했습니다.

* React Function Component 구조 설계
* useState를 이용한 상태 관리
* useEffect를 이용한 부수 효과 처리
* Local Storage 연동
* 컴포넌트 분리 및 Props 전달
* React 기반 CRUD 구현
* 날짜 기반 Todo 관리 기능 구현
* 주간/일간 뷰 상태 동기화

```
```
