import { useState } from "react";

export default function TodoItem({ todo, setTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleToggleTodo() {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === todo.id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function handleDeleteTodo() {
    setTodos((prevTodos) =>
      prevTodos.filter((item) => item.id !== todo.id)
    );
  }

  function handleSaveEdit() {
    const trimmedText = editText.trim();

    if (trimmedText === "") {
      alert("수정할 내용을 입력해주세요.");
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === todo.id ? { ...item, text: trimmedText } : item
      )
    );

    setIsEditing(false);
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