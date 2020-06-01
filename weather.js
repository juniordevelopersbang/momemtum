const API_KEY = "900dd3d6a094c46bddb0381b59c9d692";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");
const body = document.querySelector("body");
const weatherClock = document.querySelector(".clock");
const weatherGreetings = document.querySelector(".js-greetings");
const todolist = document.querySelector(".js-toDoList");
const li = todolist.querySelectorAll("li");

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      const imgweather = json.weather[0].main;

      weather.innerText = `${temperature} @ ${place} / ${imgweather}`;
      changeBg(imgweather);
    });
}

function changeBlack() {
  weatherClock.classList.remove("white");
  weatherClock.classList.add("black");

  weatherGreetings.classList.remove("white");
  weatherGreetings.classList.add("black");

  weather.classList.remove("white");
  weather.classList.add("black");

  li.forEach((item) => {
    item.classList.remove("white");
    item.classList.add("black");
  });
}

function changeWhite() {
  weatherClock.classList.remove("black");
  weatherClock.classList.add("white");

  weatherGreetings.classList.remove("black");
  weatherGreetings.classList.add("white");

  weather.classList.add("white");
  // weather.classList.remvoe("black");

  li.forEach((item) => {
    item.classList.remove("black");
    item.classList.add("white");
  });
}

function changeBg(imgweather) {
  const image = new Image();
  if (imgweather === "Clear") {
    image.src = `img/clear.jpg`;
    changeBlack();
  } else if (imgweather === "Rain") {
    image.src = `img/rain.jpg`;
    changeWhite();
  } else if (imgweather === "Clouds") {
    image.src = `img/Clouds.jpg`;
    changeBlack();
  } else if (imgweather === "Snow") {
    image.src = `img/Snow.jpg`;
    changeBlack();
  }
  image.classList.add("bgImage");
  body.prepend(image);
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("cant access geo location");
}

function askForCoord() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCodrds() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoord();
  } else {
    const parseCoords = JSON.parse(loadedCoords);

    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCodrds();
}

init();
