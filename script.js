document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (task !== "") {
    const tasks = getTasks();
    tasks.push({ text: task, completed: false });
    saveTasks(tasks);
    input.value = "";
    renderTasks();
  }
}

function getTasks() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  const tasks = getTasks();
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
    }
    li.onclick = () => toggleTask(index);
    list.appendChild(li);
  });
}

function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

function loadTasks() {
  renderTasks();
}
