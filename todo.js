const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDOs();
}

function todoLine() {
  const checkBox = document.createElement("input");
  console.log(checkBox);

  checkBox.classList.add("line");
}

function saveToDOs() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBox = document.createElement("input");

  checkBox.type = "checkbox";
  checkBox.classList.add("checkbox");

  delBtn.innerText = "✖︎";
  checkBox.addEventListener("click", todoLine);
  delBtn.addEventListener("click", deleteToDo);

  const span = document.createElement("span");
  const newId = toDos.length + 1;

  span.innerText = text;
  span.classList.add("js-toDolist");

  li.appendChild(checkBox);
  li.appendChild(span);
  li.id = newId;
  li.appendChild(delBtn);
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDOs();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue === "") {
    alert("내용을 입력하세요!");
  } else {
    paintToDo(currentValue);
  }
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parseToDos = JSON.parse(loadedToDos);
    parseToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
