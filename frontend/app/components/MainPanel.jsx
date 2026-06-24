import DateNavigator from "./DateNavigator";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function MainPanel({
  todos,
  setTodos,
  fetchTodos,
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

        <TodoForm
          selectedDate={selectedDate}
          fetchTodos={fetchTodos}
        />
      </div>

      <TodoList
        todos={todos}
        setTodos={setTodos}
        fetchTodos={fetchTodos}
        selectedDate={selectedDate}
        filter={filter}
      />
    </main>
  );
}