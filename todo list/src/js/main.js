import "../style/style.css";
import getLS from "./modules/getLS";

const unfinishedList = document.querySelector(".list.unfinished");
const finishedList = document.querySelector(".list.finished");
const inputTitle = document.querySelector(".input__field-title");
const inputBody = document.querySelector(".input__field-body");
const inputPriority = document.querySelector(".input__field-priority");
const btnAdd = document.querySelector(".input__btn-add");

const sortButton = document.querySelectorAll("button.sorted-button");

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

(function todo(taskList) {
  btnAdd.addEventListener("click", addTask);
  unfinishedList.addEventListener("click", deleteTask);
  unfinishedList.addEventListener("click", completeTask);
  finishedList.addEventListener("click", deleteTask);
  finishedList.addEventListener("click", completeTask);

  sortButton.forEach(elem => {
    elem.addEventListener("click", ({ target }) => {
      const params = target.dataset.sort;
      sortBy(params);
    });
  });
  renderAllTasks(taskList);

  function renderAllTasks(tasks = {}) {
    const finishedFragment = document.createDocumentFragment();
    const unfinishedFragment = document.createDocumentFragment();

    unfinishedList.innerHTML = "";
    finishedList.innerHTML = "";

    if (tasks.length > 0) {
      tasks.reverse().forEach(task => {
        if (task.isFinished) {
          const li = createDOMListItem(task);
          finishedFragment.appendChild(li);
          li.classList.add("complete");
        } else {
          const li = createDOMListItem(task);
          unfinishedFragment.appendChild(li);
        }
      });
    } else {
      const div = document.createElement("div");
      div.innerHTML = "List is empty";
      finishedFragment.appendChild(div);
      unfinishedFragment.appendChild(div);
    }

    unfinishedList.appendChild(unfinishedFragment);
    finishedList.appendChild(finishedFragment);
  }

  function createDOMListItem({ _id, priority, title, body, isFinished }) {
    const li = document.createElement("li");
    li.classList.add("list__item");
    li.setAttribute("data-task-id", _id);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = isFinished;
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
      isFinished: false,
      dateTime: Date.now()
    };

    return { ...newTask };
  }

  function addTask(e) {
    e.preventDefault();
    const title = inputTitle.value;
    const body = inputBody.value;
    const priority = inputPriority.value;

    if (!title) {
      alert("Enter field Title");
      return;
    }

    const task = createNewTask(title, body, priority);

    setLS(task);

    inputTitle.value = "";
    inputBody.value = "";
    inputPriority.value = "";

    renderAllTasks(getLS());
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
      renderAllTasks(getLS());
    }
  }

  function completeTask({ target }) {
    if (target.classList.contains("list__checkbox")) {
      const parent = target.closest("[data-task-id]");
      const getTasks = getLS();
      const id = parent.dataset.taskId;

      const completeTask = getTasks.map(item => {
        if (item._id == id) item.isFinished = !item.isFinished;
        return item;
      });
      localStorage.clear();

      completeTask.forEach(element => {
        setLS(element);
      });

      renderAllTasks(getLS());
      target.checked = !target.checked;
    }
  }

  function sortBy(sortParams) {
    const getTasks = getLS();
    let arr = [];
    if (sortParams !== "priority") {
      arr = getTasks.sort((a, b) => a[sortParams] - b[sortParams]);
      arr.reverse();
    } else arr = getTasks.sort((a, b) => a[sortParams] - b[sortParams]);
    renderAllTasks(arr);
  }
})(getLS());
