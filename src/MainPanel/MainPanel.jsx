/**
 * 왼쪽 메인 영역 묶음 입니다.
 * 
 * DateNavigator - 날짜 이전/다음 이동 
 * TodoForm - Todo 입력 + 추가 버튼
 * TodoList - 선택한 날짜의 Todo 목록 출력, 삭제, 수정
 */
import DateNavigator from "./DateNavigator";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function MainPanel({
  todos,
  setTodos,
  selectedDate,
  setSelectedDate,
  filter,
}) {
  return (
    <main className="main-panel">
      <div className="top-area">
        <DateNavigator
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <TodoForm selectedDate={selectedDate} setTodos={setTodos} />
      </div>

      <TodoList
        todos={todos}
        setTodos={setTodos}
        selectedDate={selectedDate}
        filter={filter}
      />
    </main>
  );
}