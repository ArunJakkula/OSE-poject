const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.done ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = todo.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = todo.done ? "Undo" : "Done";
    toggleBtn.onclick = () => {
      todos[index].done = !todos[index].done;
      saveTodos();
      renderTodos();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    };

    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.push({ text, done: false });
    input.value = "";
    saveTodos();
    renderTodos();
  }
};

renderTodos();
