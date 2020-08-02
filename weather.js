const COORDS = "coords";
const API_KEYS = "63e2e6ad9158c295ac55788f3cfb479d";
//API: Application Programming Interface, 다른 서버로부터 손쉽게 데이터를 가져올 수 있는 수단
const weather = document.querySelector(".js_weather");

//---★ JS: 웹사이트로 request를 보내고 응답을 통해 데이터 얻음. 새로고침 안해도 내 웹사이트에 적용시킬 수 있음, 실시간 Update 中!!!

function saveWeather() {
  localStorage.setItem(WEATHER_LS, JSON.stringify(weatherArray));
}

function getWeather(lati,longi) { //argument: latitude & logitude
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${API_KEYS}&units=metric`
  ).then(function(response) {
    return response.json();
  }).then(function(json) {
    const temperature = json.main.temp;
    const feelsLikeTemp = json.main.feels_like;
    const place = json.name;
    const whether1 = json.weather[0].description;
    //const whether2 = json.weather[1].description;

    //weatherArray?
    weather.innerText = `🌡: ${temperature}℃
    🏃‍♀️: ${feelsLikeTemp}℃
    ${whether1}
    @${place}`;
  }); //then함수: date가 완전히 들어온 후 함수 호출
  /* & ${whether2}*/
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, // == latitude: latitude,
    longitude // == longitude: logitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cannot access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() { //Coords = Coordinate
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  }
  else {
    const parsedCoords = JSON.parse(loadedCoords);
    console.log(parsedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
