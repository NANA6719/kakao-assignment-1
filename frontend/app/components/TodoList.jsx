import TodoItem from "./TodoItem";

export default function TodoList({ todos, fetchTodos, selectedDate, filter }) {
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
            <TodoItem key={todo.id} todo={todo} fetchTodos={fetchTodos} />
          ))}
        </ul>
      )}
    </section>
  );
}