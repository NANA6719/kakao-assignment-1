import { useState } from "react";

export default function TodoItem({ todo, fetchTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  async function handleToggleTodo() {
    await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: todo.text,
        completed: !todo.completed,
        date: todo.date,
      }),
    });

    fetchTodos();
  }

  async function handleDeleteTodo() {
    await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
    });

    fetchTodos();
  }

  async function handleSaveEdit() {
    const trimmedText = editText.trim();

    if (trimmedText === "") {
      alert("수정할 내용을 입력해주세요.");
      return;
    }

    await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: trimmedText,
        completed: todo.completed,
        date: todo.date,
      }),
    });

    setIsEditing(false);
    fetchTodos();
  }

  return (
    <li className={todo.completed ? "todo-item completed" : "todo-item"}>
      {isEditing ? (
        <>
          <input
            className="todo-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <button className="icon-button" onClick={handleSaveEdit}>
            ✓
          </button>

          <button
            className="icon-button"
            onClick={() => {
              setEditText(todo.text);
              setIsEditing(false);
            }}
          >
            ×
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className={todo.completed ? "check-button completed" : "check-button"}
            onClick={handleToggleTodo}
          >
            {todo.completed ? "✓" : ""}
          </button>

          <span className="todo-text">{todo.text}</span>

          <button
            type="button"
            className="icon-button"
            onClick={() => setIsEditing(true)}
          >
            ✎
          </button>

          <button
            type="button"
            className="icon-button"
            onClick={handleDeleteTodo}
          >
            ×
          </button>
        </>
      )}
    </li>
  );
}