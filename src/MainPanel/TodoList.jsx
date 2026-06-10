/**
 * TodoList
 *
 * 역할:
 * - 전체 todos 중에서 현재 선택된 날짜(selectedDate)에 해당하는 Todo만 보여준다.
 * - filter 상태에 따라 전체 / 진행중 / 완료 Todo를 나누어 보여준다.
 * - 완료 상태 변경과 삭제 기능을 처리한다.
 */
import TodoItem from "./TodoItem";

export default function TodoList({ todos, setTodos, selectedDate, filter }) {
  const dateTodos = todos.filter((todo) => todo.date === selectedDate);

  const filteredTodos = dateTodos.filter((todo) => {
    if (filter === "ing") return todo.completed === false;
    if (filter === "clear") return todo.completed === true;
    return true;
  });

  return (
    <section className="todo-list">
      {filteredTodos.length === 0 ? (
        <p className="empty-message">등록된 Todo가 없습니다.</p>
      ) : (
        <ul>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
          ))}
        </ul>
      )}
    </section>
  );
}