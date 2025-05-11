const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task));
}

function saveTasks() {
  const tasks = Array.from(taskList.children).map(li => li.querySelector("span").textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  span.onclick = () => {
    span.classList.toggle("completed");
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function addTask() {
  const text = taskInput.value.trim();
  if (text !== "") {
    createTaskElement(text);
    saveTasks();
    taskInput.value = "";
  }
}

loadTasks();

