const API_KEY = "ce8acfe66b1a427b91380126241906";

let dayEl = document.getElementById("dayf1");
const dateEl = document.getElementById("date");
const time = document.getElementById("time");
const submit = document.getElementById("submit");
const searchInput = document.getElementById("search-input");
const sunyNight = document.getElementById("suny_night");
const todayAm = document.querySelector(".today-am");
const todayPm = document.querySelector(".today-pm");
const WeatherType = document.querySelector(".Weather-type");
const locationn = document.querySelector(".location");
const tempp = document.getElementById("temp-am-2");

//display the day
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const day = new Date();
const dayName = days[day.getDay()];
dayEl.textContent = dayName;
// console.log(day);
// console.log(dayName);

//display the date
let month = day.toLocaleString("default", { month: "long" });
let date = day.getDate();
let year = day.getFullYear();
let hour = day.getHours();
let minutes = day.getMinutes();
const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
let ampm = hour >= 12 ? "PM" : "AM";
console.log(month, date, year, hour, minutes, ampm);
dateEl.textContent = `${date} ${month}`;

//add event
submit.addEventListener("click", (e) => {
  e.preventDefault();

  //check empty value
  if (searchInput.value !== "") {
    const search = searchInput.value;
    searchInput.value = "";
    fetchData(search);
  } else {
    alert("Please enter a valid city or country name.");
  }
});

fetchData();

async function fetchData(name = "giza") {
  try {
    const currentAPI_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${name}`;
    const forecastAPI_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${name}&days=3`;
    const currentData = await fetch(currentAPI_URL);
    const currentResult = await currentData.json();

    const forecastData = await fetch(forecastAPI_URL);
    const forecastResult = await forecastData.json();

    if (currentResult.error && currentResult.error.code === 1006) {
      alert("Please enter a valid city or country name.");
    } else {
      displayImgContent(currentResult, forecastResult);
      // displayForecast(forecastResult);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function displayImgContent(currentResult, forecastResult) {
  //! The Next Update
  // const hour = new Date().getHours();
  // const isMorning = hour >= 6 && hour < 18;
  // const backgroundImg = document.getElementsByTagName("section");

  // if (isMorning) {
  //     backgroundImg.src = "images/cloudy.jpg";
  //     console.log("صباحا");
  // } else {
  //     backgroundImg.src = "images/rainy.jpg";
  //     console.log("مساءا");
  // }

  sunyNight.innerHTML = `<img src="${currentResult.current.condition.icon}" alt="Weather Icon" />`;
  todayAm.innerHTML = `${forecastResult.forecast.forecastday[0].hour[20].temp_c}<sup>o</sup>C`;
  todayPm.innerHTML = `${forecastResult.forecast.forecastday[0].hour[8].temp_c}<sup>o</sup>C`;
  WeatherType.innerHTML = `${currentResult.current.condition.text}`;
  locationn.innerHTML = currentResult.location.name;
  document.getElementById("maxWind1").innerHTML = `<img
                      src="images/icon-wind.png"
                      alt="icon-wind"
                    />${currentResult.current.wind_kph} km/h`;

  document.getElementById("dayf2").innerHTML =
    forecastResult.forecast.forecastday[1].date;
  document.getElementById(
    "temp-am-2"
  ).innerHTML = `${forecastResult.forecast.forecastday[1].hour[20].temp_c}<sup>o</sup>C`;
  document.getElementById(
    "temp-pm-2"
  ).innerHTML = `${forecastResult.forecast.forecastday[1].hour[8].temp_c}<sup>o</sup>C`;
  document.getElementById(
    "weather-type-2"
  ).innerHTML = `${forecastResult.forecast.forecastday[1].day.condition.text}`;
  document.getElementById(
    "suny_night2"
  ).innerHTML = `<img src="${forecastResult.forecast.forecastday[1].day.condition.icon}" alt="Weather Icon" />`;
  document.getElementById("maxWind2").innerHTML = `<img
  src="images/icon-wind.png"
  alt="icon-wind"
/>${currentResult.current.wind_kph} km/h`;

  document.getElementById("dayf3").innerHTML =
    forecastResult.forecast.forecastday[2].date;

  document.getElementById(
    "temp-am-3"
  ).innerHTML = `${forecastResult.forecast.forecastday[2].hour[20].temp_c}<sup>o</sup>C`;
  document.getElementById(
    "temp-pm-3"
  ).innerHTML = `${forecastResult.forecast.forecastday[2].hour[8].temp_c}<sup>o</sup>C`;
  document.getElementById(
    "weather-type-3"
  ).innerHTML = `${forecastResult.forecast.forecastday[1].day.condition.text}`;
  document.getElementById(
    "suny_night3"
  ).innerHTML = `<img src="${forecastResult.forecast.forecastday[2].day.condition.icon}" alt="Weather Icon" />`;
  document.getElementById("maxWind3").innerHTML = `<img
  src="images/icon-wind.png"
  alt="icon-wind"
/>${currentResult.current.wind_kph} km/h`;
  console.log(forecastResult.forecast.forecastday[1].date);

  const date = new Date();
  const hoursIn12HrFormat = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  time.innerHTML = `${
    hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat
  }:${minutes < 10 ? "0" + minutes : minutes} <span id="am-pm">${ampm}</span>`;

  // console.log(todayAm);
  // console.log(forecastResult.forecast);
}
