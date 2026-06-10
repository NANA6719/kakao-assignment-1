import { useState } from "react";

/**
 * TodoForm
 *
 * 역할:
 * - 사용자가 Todo 내용을 입력한다.
 * - 추가 버튼을 누르면 새로운 Todo를 생성한다.
 * - 생성된 Todo에는 현재 선택된 날짜(selectedDate)가 함께 저장된다.
 */
export default function TodoForm({ selectedDate, setTodos }) {
  // 입력창에 입력된 값을 관리하는 상태
  const [inputValue, setInputValue] = useState("");

  /**
   * Todo 추가 함수
   */
  function handleAddTodo(e) {
    e.preventDefault();

    // 앞뒤 공백 제거
    const trimmedText = inputValue.trim();

    // 빈 값 입력 방지
    if (trimmedText === "") {
      alert("할 일을 입력해주세요.");
      return;
    }

    // 새 Todo 객체 생성
    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmedText,
      completed: false,
      date: selectedDate,
    };

    // 기존 todos 배열 뒤에 새 Todo 추가
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    // 입력창 초기화
    setInputValue("");
  }

  return (
    <form
      onSubmit={handleAddTodo}
      className="mb-6 flex gap-3"
    >
      {/* Todo 입력창 */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add Item"
        className=" flex-1 min-w-[300px] rounded-xl border-b px-4 py-3 outline-none"
      />

      {/* 추가 버튼 */}
      <button
        type="submit" 
        className="add-button rounded-xl bg-purple-500 px-5 py-3 font-bold text-white"
      >
        +
      </button>
    </form>
  );
}