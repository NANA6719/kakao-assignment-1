import { useState } from "react";

export default function TodoForm({ selectedDate, fetchTodos }) {
  const [inputValue, setInputValue] = useState("");

  async function handleAddTodo(e) {
    e.preventDefault();

    const trimmedText = inputValue.trim();

    if (trimmedText === "") {
      alert("할 일을 입력해주세요.");
      return;
    }

    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: trimmedText,
        completed: false,
        date: selectedDate,
      }),
    });

    setInputValue("");
    fetchTodos();
  }

  return (
    <form onSubmit={handleAddTodo} className="mb-6 flex gap-3">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add Item"
        className=" flex-1 min-w-[300px] rounded-xl border-b px-4 py-3 outline-none"
      />

      <button
        type="submit"
        className="add-button rounded-xl bg-purple-500 px-5 py-3 font-bold text-white"
      >
        +
      </button>
    </form>
  );
}