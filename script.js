const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function saveTasks() {
  const tasks = Array.from(taskList.children).map(li => {
    return {
      text: li.querySelector("span").textContent,
      completed: li.querySelector("span").classList.contains("completed")
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(text, completed = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  span.classList.toggle("completed", completed);
  span.onclick = () => {
    span.classList.toggle("completed");
    saveTasks();
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
