const unfinishedList = document.querySelector(".list.unfinished");
const finishedList = document.querySelector(".list.finished");
const inputTitle = document.querySelector(".input__field-title");
const inputBody = document.querySelector(".input__field-body");
const inputPriority = document.querySelector(".input__field-priority");
const btnAdd = document.querySelector(".input__btn-add");

function getLS() {
  const ls = JSON.parse(localStorage.getItem("tasks"));

  return ls ? ls : [];
}

function setLS(task) {
  if (localStorage.getItem("tasks") == null) {
    let taskArr = [];
    taskArr.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskArr));
  } else {
    let myTask = JSON.parse(localStorage.getItem("tasks"));
    myTask.push(task);
    localStorage.setItem("tasks", JSON.stringify(myTask));
  }
}

const getTasks = getLS();

(function todo(taskList) {
  btnAdd.addEventListener("click", addTask);
  unfinishedList.addEventListener("click", deleteTask);
  unfinishedList.addEventListener("click", completeTask);

  renderAllTasks(taskList);

  function renderAllTasks(tasks = {}) {
    const fragment = document.createDocumentFragment();

    if (tasks.length > 0) {
      tasks.reverse().forEach(task => {
        const li = createDOMListItem(task);
        fragment.appendChild(li);
      });
    } else {
      const div = document.createElement("div");
      div.innerHTML = "List is empty";
      fragment.appendChild(div);
    }

    unfinishedList.appendChild(fragment);
  }

  function createDOMListItem({ _id, priority, title, body }) {
    const li = document.createElement("li");
    li.classList.add("list__item");
    li.setAttribute("data-task-id", _id);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("list__checkbox");

    const span = document.createElement("span");
    span.classList.add("list__title");
    span.textContent = title;

    const button = document.createElement("button");
    button.classList.add("list__btn-delete");
    button.textContent = "Delete task";

    const paragraph = document.createElement("p");
    paragraph.classList.add("list__text");
    paragraph.textContent = body;

    const prioritySpan = document.createElement("span");
    prioritySpan.classList.add("list__priority");
    prioritySpan.textContent = `Priority: ${priority}`;

    const arrFields = [input, span, prioritySpan, button, paragraph];
    arrFields.forEach(e => {
      li.appendChild(e);
    });

    return li;
  }

  function createNewTask(title, body, priority) {
    const newTask = {
      _id: `task-${Math.random()}`,
      title,
      body,
      priority,
      isFinished: false
    };

    return { ...newTask };
  }

  function addTask(e) {
    e.preventDefault();
    let title = inputTitle.value;
    let body = inputBody.value;
    let priority = inputPriority.value;

    if (!title) {
      alert("Enter field Title");
      return;
    }

    const task = createNewTask(title, body, priority);
    const li = createDOMListItem(task);

    setLS(task);

    inputTitle.value = "";
    inputBody.value = "";
    inputPriority.value = "";
    const getTasks = getLS();

    unfinishedList.innerHTML = "";
    renderAllTasks(getTasks);
  }

  function deleteTask({ target }) {
    if (target.classList.contains("list__btn-delete")) {
      const parent = target.closest("[data-task-id]");

      const id = parent.dataset.taskId;
      const getTasks = getLS();

      const filtered = getTasks.filter(item => item._id !== id);
      localStorage.clear();

      filtered.forEach(element => {
        setLS(element);
      });

      parent.remove();
    }
  }

  function completeTask({ target }) {
    if (target.classList.contains("list__checkbox")) {
      const parent = target.closest("[data-task-id]");

      parent.classList.toggle("complete");
    }
  }
})(getTasks);
