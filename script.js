document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput").value;
  if (taskInput === "") return;

  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  const taskText = document.createElement("span");
  taskText.textContent = taskInput;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-check-input me-2";
  checkbox.addEventListener("change", function() {
    taskText.classList.toggle("completed", this.checked);
    updateTaskStatus(taskText.textContent, this.checked);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function() {
    taskList.removeChild(li);
    removeTask(taskText.textContent);
  });
  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  saveTask(taskInput);

  document.getElementById("taskInput").value = "";
}

function saveTask(task) {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.push({ text: task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function loadTasks() {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addUIItem(task.text, task.completed));
}

function addUIItem(task, completed) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  const taskText = document.createElement("span");
  taskText.textContent = task;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-check-input me-2";
  checkbox.checked = completed;
  checkbox.addEventListener("change", function() {
    taskText.classList.toggle("completed", this.checked);
    updateTaskStatus(taskText.textContent, this.checked);
  });

  if (completed) {
    taskText.classList.add("completed");
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function() {
    taskList.removeChild(li);
    removeTask(taskText.textContent);
  });

  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function updateTaskStatus(task, completed) {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks = savedTasks.map(t => t.text === task ? { ...t, completed } : t);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function removeTask(task) {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks = savedTasks.filter(t => t.text !== task);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}