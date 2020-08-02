const gr_form = document.querySelector(".js_greeting_form");
const gr_input = gr_form.querySelector("input");
const greeting = document.querySelector(".js_greeting");
const USER_LS = "currentUser"; //User in Local Storage
const SHOWING_CN = "showing"; //Showing ClassName

function saveName(text) { //로컬스토리지에 currentUser의 값 저장
  localStorage.setItem(USER_LS, text);
}

function handleSubmitName(event) { //form 제출 이벤트의 핸들러
  event.preventDefault(); //for prevent default event(기존에 프로그래밍되어있던 어딘가로 입력된 사용자이름이 날라가는 거)
  const currentValue = gr_input.value;
  showGreeting(currentValue);
  saveName(currentValue);
}

function askForName() { //currentUser의 값 물어봄
  gr_form.classList.add(SHOWING_CN);
  gr_form.addEventListener("submit", handleSubmitName); //eventHandler -> line.11
}

function showGreeting(text) { //사용자이름을 받으면 기존의 질문 form 지우고 인사 mode
  gr_form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  const date = new Date();
  const hours = date.getHours();
  /*
  const time = ;
  if (hours>=6 && hours<12) {
    time = "morning";
  }
  else if (hours>=12 && hours<18) {
    time = "afternoon";
  }
  else if (hours>=18 && hours<24) {
    time = "evening";
  }
  else if (hours>=0 && hours<6) {
    time = "Night";
  }
  */
  greeting.innerText = `${
    hours >= 6 && hours < 18? `Have a nice day` : `Hope you had a good day`}, ${text}`;
}

function loadName() { //로컬스토리지의 Key값으로 currentUser 지정, 유무에 따라 함수 실행
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) { //if no user
    askForName();
  }
  else { //if user exists
    showGreeting(currentUser); //for 새로고침해도 인사말 fix.
  }
}

function init() {
  loadName();
}

init();
