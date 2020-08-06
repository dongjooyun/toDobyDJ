const td_form = document.querySelector(".js_todo_form");
const td_input = td_form.querySelector("input");
const toDoList = document.querySelector(".js_toDoList");
//const checkicon = toDo.querySelector("i");
const ToDo_LS = "ToDo"; //ToDo in localStorage
let ToDoArray = []; //from line.19 -> const는 변환 불가이므로 let 선언!
const tdGuide = document.querySelector(".toDoGuide");

function deleteToDo(event) {
  const btn = event.target;
  const deletedli = btn.parentNode;
  toDoList.removeChild(deletedli);
  const deletedToDo = ToDoArray.filter(function(toDoObj) {
    //array의 요소 각각에 대하여 filter 실시 후 새로운 array에 해당 요소 추가, filter의 argument = 각 element가 주어진 boolean문에 대하여 T인지 F인지 판별하는 함수.
    //fuction(toDoObj) = 이름 없는 함수(외부에서 new 이름 부여 가능), argument: toDoObj
    return toDoObj.id !== parseInt(deletedli.id); //ToDoList에 있는 객체의 아이디가 li의 아이디(HTML)와 다르면 True를 return
    //if) 지운 객체 id = 1
    //li에는 1이라는 id 無므로 deletedToDo array에 해당 객체 추가됨
    //li.id는 string, toDoObj.id는 int이므로 string => int by.parseInt()
  });
  ToDoArray = deletedToDo; //기존 array를 삭제되어 변경된 ToDo array로 교체.
  saveToDo(); //local storage에 저장.
}

function saveToDo() {
  localStorage.setItem(ToDo_LS, JSON.stringify(ToDoArray));
}
//실제로 todo 입력해보면 [object Object]가 주르륵 나옴
//WHY? JS는 local storage에 모든 data 값을 string으로 저장함.
//이때 필요한건 뭐?! JSON.stringify()!
//JSON = JavaScript Object Notation, 데이터를 전달할 때 JS가 다룰 수 있도록 object <=> 다른 datatype으로 변환하는 기능.

function showToDo(text) {
  const li = document.createElement("li"); //목록 영역
  const deleteBtn = document.createElement("button"); //체크 아이콘
  const whatToDo = document.createElement("toDo"); //할일 texts
  const liId = ToDoArray.length + 1; //li에 부여하는 id - for todo 완료 시 check

  deleteBtn.innerText = `✔`;
  deleteBtn.addEventListener("click", deleteToDo); //eventHandler -> line.7
  whatToDo.innerText = text;
  li.appendChild(deleteBtn);
  li.appendChild(whatToDo); //appendChild: 상위 클래스에 하위 클래스 요소 집어넣기
  li.id = liId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: liId
  };

  ToDoArray.push(toDoObj);
  saveToDo();
}

function handleSubmitToDo(event) {
  event.preventDefault();
  const currentValue = td_input.value;
  showToDo(currentValue);
  td_input.value = ""; //for 입력창 초기화
}

function loadToDo() {
  const loadedToDo = localStorage.getItem(ToDo_LS);
  if (loadedToDo !== null) {
    const parsedToDo = JSON.parse(loadedToDo); //string을 객체(object)로 변환
    parsedToDo.forEach(function(toDoObj) {
      //array의 요소 각각에 대하여(for each) 새로 정의된 함수 실시, for each의 argument = 새로 정의된 함수
      //fuction(toDoObj) = 이름 없는 함수(외부에서 new 이름 부여 가능), argument: toDoObj
      showToDo(toDoObj.text);
    });
  }
  //else는 필요 없음, why? greeting과 달리 form을 지우면 안됨, 입력값 들어오면 무조건 fix.
}

function init() {
  loadToDo();
  td_form.addEventListener("submit", handleSubmitToDo); //eventHandler -> line.51
  tdGuide.innerText = `Check if you're done🔥`;
}

init();
