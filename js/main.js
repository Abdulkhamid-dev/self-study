var modal = document.getElementById("myModal");
var modalSecond = document.getElementById("myModalSecond");
const btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var spanSecond = document.getElementsByClassName("close-second")[0];
let form = document.getElementById("form");
let todolist = document.getElementById("todo_list");

let monthNum = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const { to_do, icon_category, description, date_inp, status_category } = form;
let d = date_inp.value;
rendering();
form.onsubmit = function date(e) {
  e.preventDefault();
  let toDoArr;
  if (localStorage.toDoArr) {
    toDoArr = JSON.parse(localStorage.getItem("toDoArr"));
  } else {
    toDoArr = [];
  }
  let doName = document.querySelector("#doName").value;
  let doCategory = document.querySelector("#doCategory").value;
  let description = document.querySelector(".description").value;
  let doStatus = document.querySelector("#doStatus").value;
  let dataInp = document.querySelector("#inp_time").value;
  let day = new Date(document.querySelector("#inp_time").value).getDate();
  let monthGet = new Date(document.querySelector("#inp_time").value).getMonth();
  let hours = new Date(document.querySelector("#inp_time").value).getHours();
  let minutes = new Date(
    document.querySelector("#inp_time").value
  ).getMinutes();
  let month = monthNum[monthGet];
  let year = new Date(
    document.querySelector("#inp_time").value
  ).getUTCFullYear();
  // console.log(
  //   day,
  //   month,
  //   year,
  //   hours,
  //   minutes,
  //   doName,
  //   doCategory,
  //   doStatus,
  //   description
  // );

  let toDoObj = {
    id: Date.now(),
    todoName: doName,
    todoCategory: doCategory,
    todoDescription: description,
    todoDay: day,
    todoMonth: month,
    todoHours: hours,
    todoMinutes: minutes,
    todoStatus: doStatus,
  };
  toDoArr.push(toDoObj);
  localStorage.setItem("toDoArr", JSON.stringify(toDoArr));
  console.log(toDoObj);
  description = "";
  doName = "";
  doCategory = "";
  doStatus = "";
  dataInp = "";
  rendering();
};

// let dayNum = date_inp.value;
function rendering() {
  todolist.innerHTML = "";
  var getDataFromLocalStorage = localStorage.getItem("toDoArr");
  var todos = JSON.parse(getDataFromLocalStorage);
  if (localStorage.getItem("toDoArr")) {
    todos.forEach((item) => {
      const {
        id,
        todoName,
        todoCategory,
        todoDescription,
        todoDay,
        todoMonth,
        todoHours,
        todoMinutes,
        todoStatus,
      } = item;
      toDo = `
      <div class="each_todo" >
      <div class="date_todo">
        <span>
          <p class="day">${todoDay}</p>
          <p class="month">${todoMonth}</p>
        </span>
        <p class="clock">${todoHours}:${todoMinutes}</p>
      </div>
      <span class="name_todo">
        <h3>${todoName}</h3>
        <p>${todoDescription}</p>
      </span>
      <img
        class="icon_img"
        src="assets/img/${
          todoCategory === "Sport"
            ? "emojione_person-running-light-skin-tone.svg"
            : todoCategory === "Education"
            ? "emojione_orange-book.svg"
            : todoCategory === "Interteiment"
            ? "noto-v1_beach-with-umbrella.svg"
            : todoCategory === "Chores"
            ? "emojione_house-with-garden.svg"
            : ""
        }"
      />
      <button class="status_btn" style='${
        todoStatus === "Not started"
          ? `margin-left: 40px;
          position: relative;
          width: 107px;
          height: 38px;
          background: rgba(232, 232, 232, 0.29);
          border-radius: 27px;
          font-size: 15px;
          color: #AAAAAA;
          border: none;
          cursor: pointer;`
          : todoStatus === "Started"
          ? `  margin-left: 40px;
          position: relative;
          width: 107px;
          height: 38px;
          background: rgba(186, 226, 255, 0.24);
          border-radius: 27px;
          font-size: 15px;
          color: #0092fc;
          border: none;
          cursor: pointer;`
          : todoStatus === "Complited"
          ? `margin-left: 40px;
          position: relative;
          width: 107px;
          height: 38px;
          background: rgba(0, 255, 148, 0.14);
          border-radius: 27px;
          font-size: 15px;
          color: #01CC5E;
          border: none;
          cursor: pointer;`
          : todoStatus === "Canceled"
          ? `margin-left: 40px;
          position: relative;
          width: 107px;
          height: 38px;
          background: rgba(255, 6, 96, 0.17);
          border-radius: 27px;
          font-size: 15px;
          color: #ED4C5C;
          border: none;
          cursor: pointer;`
          : " "
      }'>${todoStatus}</button>
      <div class="edit_btn" id='${id}'>
        <div id='edit'>
          <img src="assets/img/bi_vector-pen.svg" alt="" />
        </div>
        <div onclick='deleteEach(this)' >
          <img src="assets/img/bx_bx-trash.svg" alt="" />
        </div>
      </div>
    </div>
      `;
      todolist.innerHTML += toDo;
    });
  } else {
  }
}

function clearAll() {
  localStorage.clear();
  rendering();
}
function deleteEach(el) {
  el.parentElement.parentElement.remove();
  var elId = el.parentElement.id;
  var todoParse = JSON.parse(localStorage.getItem("toDoArr"));
  let toDo = todoParse.filter((i) => i?.id.toString() !== elId);
  localStorage.setItem("toDoArr", JSON.stringify(toDo));
}

btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
spanSecond.onclick = function () {
  modalSecond.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
window.onclick = function (event) {
  if (event.target == modalSecond) {
    modalSecond.style.display = "none";
  }
};

if (document.getElementById("edit")) {
  let editBtn = document.getElementById("edit");
  editBtn.onclick = function () {
    modalSecond.style.display = "block";
  };
} else {
}
