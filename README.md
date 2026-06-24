## 📌 프로젝트 소개

기존 React 기반 Todo 애플리케이션을 Next.js와 FastAPI를 활용한 풀스택 구조로 확장한 프로젝트입니다.

LocalStorage를 사용하던 방식에서 벗어나 FastAPI와 SQLite를 연동하여 데이터를 서버에서 관리하도록 변경했습니다.

또한 Next.js의 API Route를 활용하여 프론트엔드와 백엔드를 연결하고, 환경변수를 통해 설정값을 분리했습니다.

---

## 🛠️ 기술 스택

### Frontend

* Next.js
* React
* TypeScript

### Backend

* FastAPI
* SQLAlchemy
* SQLite

---

## 📂 프로젝트 구조

```text
backend
├── main.py
├── requirements.txt

frontend
├── app
│   ├── api
│   │   └── todos
│   ├── components
│   ├── error.tsx
│   ├── loading.tsx
│   ├── page.tsx
│   └── TodoAppClient.tsx
├── package.json
└── tsconfig.json
```

---

## ✨ 주요 기능

### Todo 기능

* Todo 목록 조회
* Todo 생성
* Todo 수정
* Todo 삭제

### 추가 기능

* 날짜별 Todo 관리
* 진행 중 / 완료 필터링
* Loading 화면 구현
* Error 화면 구현

---

## 🔗 데이터 흐름

```text
Client
↓
Next.js API Route
↓
FastAPI
↓
SQLite Database
```

---

## 📌 API 목록

| Method | URL              | 설명         |
| ------ | ---------------- | ---------- |
| GET    | /todos           | Todo 목록 조회 |
| POST   | /todos           | Todo 생성    |
| PUT    | /todos/{todo_id} | Todo 수정    |
| DELETE | /todos/{todo_id} | Todo 삭제    |

---

## ⚙️ 환경 변수

### frontend/.env.local

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
BACKEND_URL=http://localhost:8000
```

### backend/.env.local

```env
DATABASE_URL=sqlite:///./todos.db
```

---

## 🚀 실행 방법

### Backend 실행

```bash
cd backend

uvicorn main:app --reload
```

### Frontend 실행

```bash
cd frontend

npm install
npm run dev
```

```
```
