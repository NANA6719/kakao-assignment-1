const STORAGE_KEY = "jellyTodoList";

const selectedDateText = document.getElementById("selectedDateText");
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const messageText = document.getElementById("messageText");
const weekView = document.getElementById("weekView");
const weekRangeText = document.getElementById("weekRangeText");

const previousDateButton = document.getElementById("previousDateButton");
const nextDateButton = document.getElementById("nextDateButton");
const previousWeekButton = document.getElementById("previousWeekButton");
const nextWeekButton = document.getElementById("nextWeekButton");

let todos = loadTodosFromStorage();
let selectedDate = new Date();
let currentFilter = "all";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function loadTodosFromStorage() {
  const savedTodos = localStorage.getItem(STORAGE_KEY);
  return savedTodos ? JSON.parse(savedTodos) : [];
}

function saveTodosToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function showMessage(message) {
  messageText.textContent = message;

  setTimeout(() => {
    messageText.textContent = "";
  }, 1800);
}

function addTodo(todoText) {
  const newTodo = {
    id: Date.now(),
    text: todoText,
    date: formatDate(selectedDate),
    isCompleted: false
  };

  todos.push(newTodo);
  saveTodosToStorage();
  render();
}

function deleteTodo(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
  saveTodosToStorage();
  render();
}

function toggleTodoComplete(todoId) {
  todos = todos.map((todo) => {
    if (todo.id === todoId) {
      return {
        ...todo,
        isCompleted: !todo.isCompleted
      };
    }

    return todo;
  });

  saveTodosToStorage();
  render();
}

function editTodo(todoId) {
  const targetTodo = todos.find((todo) => todo.id === todoId);
  const editedText = prompt("수정할 내용을 입력하세요.", targetTodo.text);

  if (!editedText || editedText.trim() === "") {
    showMessage("빈 값으로 수정할 수 없습니다.");
    return;
  }

  todos = todos.map((todo) => {
    if (todo.id === todoId) {
      return {
        ...todo,
        text: editedText.trim()
      };
    }

    return todo;
  });

  saveTodosToStorage();
  render();
}

function getFilteredTodos() {
  const selectedDateString = formatDate(selectedDate);

  return todos.filter((todo) => {
    const isSameDate = todo.date === selectedDateString;
    const isMatchedFilter =
      currentFilter === "all" ||
      (currentFilter === "ing" && !todo.isCompleted) ||
      (currentFilter === "clear" && todo.isCompleted);

    return isSameDate && isMatchedFilter;
  });
}

function renderTodos() {
  const filteredTodos = getFilteredTodos();
  todoList.innerHTML = "";

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `<p class="empty-message">등록된 Todo가 없습니다.</p>`;
    return;
  }

  filteredTodos.forEach((todo) => {
    const todoItem = document.createElement("article");
    todoItem.className = `todo-item ${todo.isCompleted ? "completed" : ""}`;

    todoItem.innerHTML = `
      <button class="check-button ${todo.isCompleted ? "completed" : ""}" type="button"> ${todo.isCompleted ? "✓" : ""}</button>
      <span class="todo-text">${todo.text}</span>
      <button class="icon-button edit-button" type="button">✏️</button>
      <button class="icon-button delete-button" type="button">🗑️</button>
    `;

    todoItem.querySelector(".check-button").addEventListener("click", () => {
      toggleTodoComplete(todo.id);
    });

    todoItem.querySelector(".edit-button").addEventListener("click", () => {
      editTodo(todo.id);
    });

    todoItem.querySelector(".delete-button").addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    todoList.appendChild(todoItem);
  });
}

function getMonday(date) {
  const copiedDate = new Date(date);
  const day = copiedDate.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  copiedDate.setDate(copiedDate.getDate() + diff);
  return copiedDate;
}

function renderWeekView() {
  const monday = getMonday(selectedDate);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  weekRangeText.textContent = `${formatDate(monday)} ~ ${formatDate(sunday)}`;
  weekView.innerHTML = "";

  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const todayString = formatDate(new Date());
  const selectedDateString = formatDate(selectedDate);

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);

    const currentDateString = formatDate(currentDate);
    const todoCount = todos.filter((todo) => todo.date === currentDateString).length;

    const weekDay = document.createElement("button");
    weekDay.type = "button";
    weekDay.className = "week-day";

    if (currentDateString === selectedDateString) {
      weekDay.classList.add("selected");
    }

    if (currentDateString === todayString) {
      weekDay.classList.add("today");
    }

    weekDay.innerHTML = `
      <div class="week-date">
        <strong>${dayNames[i]}</strong>
        <span>${currentDateString}</span>
      </div>
      <span class="week-count">${todoCount}개</span>
    `;

    weekDay.addEventListener("click", () => {
      selectedDate = currentDate;
      render();
    });

    weekView.appendChild(weekDay);
  }
}

function renderSelectedDate() {
  selectedDateText.textContent = formatDate(selectedDate);
}

function renderFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-button");

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === currentFilter);
  });
}

function render() {
  renderSelectedDate();
  renderFilterButtons();
  renderTodos();
  renderWeekView();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  if (todoText === "") {
    showMessage("Todo 내용을 입력해주세요.");
    return;
  }

  addTodo(todoText);
  todoInput.value = "";
});

previousDateButton.addEventListener("click", () => {
  selectedDate.setDate(selectedDate.getDate() - 1);
  render();
});

nextDateButton.addEventListener("click", () => {
  selectedDate.setDate(selectedDate.getDate() + 1);
  render();
});

previousWeekButton.addEventListener("click", () => {
  selectedDate.setDate(selectedDate.getDate() - 7);
  render();
});

nextWeekButton.addEventListener("click", () => {
  selectedDate.setDate(selectedDate.getDate() + 7);
  render();
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    render();
  });
});

render();