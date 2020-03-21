/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_style_css__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var unfinishedList = document.querySelector(".list.unfinished");
var finishedList = document.querySelector(".list.finished");
var inputTitle = document.querySelector(".input__field-title");
var inputBody = document.querySelector(".input__field-body");
var inputPriority = document.querySelector(".input__field-priority");
var btnAdd = document.querySelector(".input__btn-add");
var sortButton = document.querySelectorAll("button.sorted-button");

function getLS() {
  var ls = JSON.parse(localStorage.getItem("tasks"));
  return ls ? ls : [];
}

function setLS(task) {
  if (localStorage.getItem("tasks") == null) {
    var taskArr = [];
    taskArr.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskArr));
  } else {
    var myTask = JSON.parse(localStorage.getItem("tasks"));
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
  sortButton.forEach(function (elem) {
    elem.addEventListener("click", function (_ref) {
      var target = _ref.target;
      var params = target.dataset.sort;
      sortBy(params);
    });
  });
  renderAllTasks(taskList);

  function renderAllTasks() {
    var tasks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var finishedFragment = document.createDocumentFragment();
    var unfinishedFragment = document.createDocumentFragment();
    unfinishedList.innerHTML = "";
    finishedList.innerHTML = "";

    if (tasks.length > 0) {
      tasks.reverse().forEach(function (task) {
        if (task.isFinished) {
          debugger;
          var li = createDOMListItem(task, check = true);
          finishedFragment.appendChild(li);
          li.classList.add("complete");
        } else {
          var _li = createDOMListItem(task);

          unfinishedFragment.appendChild(_li);
        }
      });
    } else {
      var div = document.createElement("div");
      div.innerHTML = "List is empty";
      finishedFragment.appendChild(div);
      unfinishedFragment.appendChild(div);
    }

    unfinishedList.appendChild(unfinishedFragment);
    finishedList.appendChild(finishedFragment);
  }

  function createDOMListItem(_ref2) {
    var _id = _ref2._id,
        priority = _ref2.priority,
        title = _ref2.title,
        body = _ref2.body;
    var check = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var li = document.createElement("li");
    li.classList.add("list__item");
    li.setAttribute("data-task-id", _id);
    var input = document.createElement("input");
    input.type = "checkbox";
    input.checked = check;
    input.classList.add("list__checkbox");
    var span = document.createElement("span");
    span.classList.add("list__title");
    span.textContent = title;
    var button = document.createElement("button");
    button.classList.add("list__btn-delete");
    button.textContent = "Delete task";
    var paragraph = document.createElement("p");
    paragraph.classList.add("list__text");
    paragraph.textContent = body;
    var prioritySpan = document.createElement("span");
    prioritySpan.classList.add("list__priority");
    prioritySpan.textContent = "Priority: ".concat(priority);
    var arrFields = [input, span, prioritySpan, button, paragraph];
    arrFields.forEach(function (e) {
      li.appendChild(e);
    });
    return li;
  }

  function createNewTask(title, body, priority) {
    var newTask = {
      _id: "task-".concat(Math.random()),
      title: title,
      body: body,
      priority: priority,
      isFinished: false,
      dateTime: Date.now()
    };
    return _objectSpread({}, newTask);
  }

  function addTask(e) {
    e.preventDefault();
    var title = inputTitle.value;
    var body = inputBody.value;
    var priority = inputPriority.value;

    if (!title) {
      alert("Enter field Title");
      return;
    }

    var task = createNewTask(title, body, priority);
    setLS(task);
    inputTitle.value = "";
    inputBody.value = "";
    inputPriority.value = "";
    renderAllTasks(getLS());
  }

  function deleteTask(_ref3) {
    var target = _ref3.target;

    if (target.classList.contains("list__btn-delete")) {
      var parent = target.closest("[data-task-id]");
      var id = parent.dataset.taskId;
      var getTasks = getLS();
      var filtered = getTasks.filter(function (item) {
        return item._id !== id;
      });
      localStorage.clear();
      filtered.forEach(function (element) {
        setLS(element);
      });
      parent.remove();
      renderAllTasks(getLS());
    }
  }

  function completeTask(_ref4) {
    var target = _ref4.target;

    if (target.classList.contains("list__checkbox")) {
      var parent = target.closest("[data-task-id]");
      var getTasks = getLS();
      var id = parent.dataset.taskId;

      var _completeTask = getTasks.map(function (item) {
        if (item._id == id) item.isFinished = !item.isFinished;
        return item;
      });

      localStorage.clear();

      _completeTask.forEach(function (element) {
        setLS(element);
      });

      renderAllTasks(getLS());
      target.checked = !target.checked;
    }
  }

  function sortBy(sortParams) {
    var getTasks = getLS();
    var arr = [];

    if (sortParams !== "priority") {
      arr = getTasks.sort(function (a, b) {
        return a[sortParams] - b[sortParams];
      });
      arr.reverse();
    } else arr = getTasks.sort(function (a, b) {
      return a[sortParams] - b[sortParams];
    });

    renderAllTasks(arr);
  }
})(getLS());

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);