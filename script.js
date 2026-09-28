let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(event) {
  event.preventDefault();
  let input = document.getElementById("task-input");
  let error = document.getElementById("error-msg");
  let text = input.value.trim();

  if (text === "") {
    error.textContent = "Task cannot be empty.";
    return;
  }

  tasks.push({ text: text, done: false });
  error.textContent = "";
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks = tasks.filter(function (task, i) {
    return i !== index;
  });
  saveTasks();
  renderTasks();
}

function renderTasks() {
  let list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach(function (task, index) {
    let li = document.createElement("li");
    if (task.done) {
      li.className = "completed";
    }

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onclick = function () {
      toggleTask(index);
    };

    let span = document.createElement("span");
    span.textContent = task.text;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      deleteTask(index);
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  if (tasks.length === 0) {
    document.getElementById("empty-msg").style.display = "block";
  } else {
    document.getElementById("empty-msg").style.display = "none";
  }
}

document.getElementById("task-form").onsubmit = addTask;

renderTasks();
