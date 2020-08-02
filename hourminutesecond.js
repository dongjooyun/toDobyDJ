const clockContainer = document.querySelector(".js_clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10? `0${hours}` : hours
  }:${
    minutes < 10? `0${minutes}` : minutes
  }:${
  seconds < 10? `0${seconds}`:seconds
  }`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();



/* padding: 5px 0px 5px 5px; */
