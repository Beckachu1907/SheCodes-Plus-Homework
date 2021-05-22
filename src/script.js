let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
let currentDate = document.querySelector(".Day");
currentDate.innerHTML = `${day} ${hour}:${minutes}`;

function searchCity(city) {
  let apiKey = `912524c44b360a142d0416407a3dd299`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showConditions);
}

function searchBttn(event) {
  event.preventDefault();
  let city = document.querySelector(".City-Search").value;
  searchCity(city);
}

function showConditions(response) {
  document.querySelector(".City").innerHTML = response.data.name;
  document.querySelector(".Description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".Temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".Humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let emojiElement = document.querySelector("#Main-Emoji");
  emojiElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  emojiElement.setAttribute("alt", response.data.weather[0].description);
}

function searchLocation(position) {
  let apiKey = `912524c44b360a142d0416407a3dd299`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showConditions);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector(".btn");
button.addEventListener("click", searchBttn);

let form = document.querySelector(".City-Search");
form.addEventListener("submit", searchBttn);

let currentBttn = document.querySelector(".btn-primary");
currentBttn.addEventListener("click", currentLocation);
