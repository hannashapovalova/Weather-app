
//Change temperature Celsius/Farenhait

function tempFarenhait(event) {
    event.preventDefault();
    let farenhait = document.querySelector(".temperature");
    farenhait.innerHTML = "70"; //add real data
}
let showTempF = document.querySelector("#farenheit");
showTempF.addEventListener("click", tempFarenhait);

function tempCelsius(event) {
    event.preventDefault();
    let celsius = document.querySelector(".temperature");
    celsius.innerHTML = "21"; //add real data
}
let showTempC = document.querySelector("#celsius");
showTempC.addEventListener("click", tempCelsius);

// Current Dates, Hours, Minutes, Day, Months

let now = new Date ();
let date = document.querySelector("#current-date");
let currentDate = now.getDate();
date.innerHTML = `${currentDate}`;

let housrs = document.querySelector("#current-hours");
let currentHours = now.getHours();
if (currentHours < 10) {
    currentHours = `0${currentHours}`;
} 
housrs.innerHTML = `${currentHours}`;

let minutes = document.querySelector("#current-minutes");
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
}
minutes.innerHTML = `${currentMinutes}`;

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentMonth = months[now.getMonth()];
  let month = document.querySelector("#current-month");
  month.innerHTML = `${currentMonth}`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
let currentDayOfWeeek = days[now.getDay()];
let dayOfWeek = document.querySelector("#current-day-of-week");
dayOfWeek.innerHTML = `${currentDayOfWeeek}`;

// API 

function getApiWeather(city){
    let apiKey = "238f6bbecd817b0849866bc3d0d8b987";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
}

// Search Form

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    getApiWeather(searchInput.value);
    let h2 = document.querySelector("h2");
    if (searchInput.value) {
    h2.innerHTML = `${searchInput.value}`;
    } else {
    h2.innerHTML = null;
    alert("Please, type a city...");
    }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Real Temperature, Wind, Humidity

function showTemperature(response) {
    let temp = Math.round(response.data.main.temp);
    let showTemp = document.querySelector(".temperature");
    showTemp.innerHTML = `${temp}`;

    let wind = Math.round(response.data.wind.speed);
    let showWind = document.querySelector("#wind-speed");
    showWind.innerHTML = `${wind}`;
    
    let humidity = Math.round(response.data.main.humidity);
    let showHumidity = document.querySelector("#humidity");
    showHumidity.innerHTML = `${humidity}`;
}

// Get current city and temp by Geolocation

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "238f6bbecd817b0849866bc3d0d8b987";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentData);
}

function showCurrentData(response) {
  let city = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${city}`;
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = `${temp}°C`;
}

function findMeButton() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", findMeButton);



