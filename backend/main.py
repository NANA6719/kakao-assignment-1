from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel

# DB 설정
DATABASE_URL = "sqlite:///./todos.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# DB 모델 (테이블 구조 정의)
class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    completed = Column(Boolean, default=False)
    date = Column(String, nullable=False)


# Pydantic 스키마 (요청/응답 데이터 구조 정의)
class TodoCreate(BaseModel):
    text: str
    completed: bool = False
    date: str


class TodoUpdate(BaseModel):
    text: str
    completed: bool
    date: str


# 테이블 생성
Base.metadata.create_all(bind=engine)


# FastAPI 앱 생성
app = FastAPI(title="Todo API")


# FastAPI 앱 미들웨어 및 CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# DB 세션 의존성
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# 엔드포인트 구현
@app.get("/")
def root():
    return {"message": "Todo API 서버입니다."}


@app.get("/todos")
def get_todos(db: Session = Depends(get_db)):
    todos = db.query(Todo).all()
    return todos


@app.post("/todos")
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    new_todo = Todo(
        text=todo.text,
        completed=todo.completed,
        date=todo.date,
    )

    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)

    return new_todo


@app.put("/todos/{todo_id}")
def update_todo(
    todo_id: int,
    todo: TodoUpdate,
    db: Session = Depends(get_db)
):
    target_todo = db.query(Todo).filter(Todo.id == todo_id).first()

    if target_todo is None:
        raise HTTPException(status_code=404, detail="Todo를 찾을 수 없습니다.")

    target_todo.text = todo.text
    target_todo.completed = todo.completed
    target_todo.date = todo.date

    db.commit()
    db.refresh(target_todo)

    return target_todo


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    target_todo = db.query(Todo).filter(Todo.id == todo_id).first()

    if target_todo is None:
        raise HTTPException(status_code=404, detail="Todo를 찾을 수 없습니다.")

    db.delete(target_todo)
    db.commit()

    return {"message": "Todo가 삭제되었습니다."}