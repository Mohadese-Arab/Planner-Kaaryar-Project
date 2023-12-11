// ---- DOM Selector ----//
const todoList = document.getElementById("todoList");
const todoForm = document.getElementById("todoForm");
const taskInputEl = document.getElementById("taskInput");

// ---- to do array ----//
const tasksArray = getTasks();

//---- get tasks ----//
function getTasks() {
  const getTasks = localStorage.getItem("tasks");
  const tasks = JSON.parse(getTasks);
  return getTasks ? tasks : [];
}

// ---- create task function ----//
const addTask = () => {
  const taskValue = taskInputEl.value.trim();
  if (taskValue) {
    const data = {
      title: taskValue,
      id: tasksArray.length ? tasksArray[tasksArray.length - 1].id + 1 : 1,
    };
    tasksArray.push(data);
  } else {
    alert("لطفا تسک خود را بنویسید");
  }

  const tasksJson = JSON.stringify(tasksArray);
  localStorage.setItem("tasks", tasksJson);
};

//---- print tasks in the list ----//
const printTasks = () => {
  for (let task of tasksArray) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("d-flex", "align-center", "item");
    taskItem.innerHTML = `${task.title} <i class="bx bx-trash deleteBtn"></i>`;
    taskItem.id = task.id;
    todoList.prepend(taskItem);
    if (task.title.length > 25) {
      taskItem.innerHTML = `${task.title.slice(0, 20)}<span>...</span> <i class="bx bx-trash deleteBtn"></i>`;
    }
  }
  const mediaQuery = window.matchMedia("(min-width : 481px)");
  function handle(mediaQuery) {
    if (mediaQuery.matches) {
      if (tasksArray.length > 12) {
        todoList.style.height = "535px";
        todoList.style.overflowY = "auto";
      }
    }
  }
  handle(mediaQuery);
};
printTasks();

//---- form submit ----//
todoForm.addEventListener("submit", () => {
  addTask();
  taskInputEl.value = "";
});

//---- delete task function ----//
const deleteTask = (idNumber) => {
  tasksArray.map((task, index) => {
    if (task.id === idNumber) {
      tasksArray.splice(index, 1);
    }
  });
  const tasks = JSON.stringify(tasksArray);
  localStorage.setItem("tasks", tasks);
};

//---- delete task ----//
todoList.addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
    const makeSure = confirm("آیا مطمئن هستید؟");
    if (makeSure) {
      const idNumber = +e.target.parentElement.id;
      deleteTask(idNumber);
      e.target.parentElement.remove();
    }
  }
});

window.onload = () => {
  taskInputEl.focus();
};