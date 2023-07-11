const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "d1a86552de255334f6117b348c4519bd";

const fetchWeather = async (query, type) => {
  const options = {
    params: {
      units: "metric",
      APPID: apiKey
    }
  };
  if (type === "city") {
    options.params.q = query;
  } else if ("location") {
    options.params.lon = query.lon;
    options.params.lat = query.lat;
  }
  const { data } = await axios.get(apiUrl, options);
  return data;
};

const searchInput = document.getElementById("search_input");
const form = document.querySelector("#search_form");
form.addEventListener("submit", fetchData);

const cityName = document.getElementById("city_name");
const temp = document.getElementById("degree_attribute");
const icon = document.getElementById("weather_icon").querySelector("img");
const description = document.getElementById("weather_description");
const humidity = document.getElementById("weather_humidity");
const windSpeed = document.getElementById("wind_speed");

async function fetchData(event) {
  event.preventDefault();

  const data = await fetchWeather(searchInput.value, "city");
  console.log(data);
  cityName.innerText = data.name;
  temp.innerText = Math.round(data.main.temp);
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  description.innerText = data.weather[0].description;
  humidity.innerHTML = `Humidity: ${Math.round(data.main.humidity)}`;
  windSpeed.innerHTML = `Wind Speed: ${data.wind.speed}`;
}

const appState = {
  degreeUnit: "c",
  weather: {}
};

// ..........................................................................

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

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

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();

let dateDay = document.getElementById("date_day");
dateDay.innerHTML = `${day}`;

let dateMonth = document.getElementById("date_month");
dateMonth.innerHTML = `${month} ${date}`;

let dateYear = document.getElementById("date_year");
dateYear.innerHTML = `${year}`;

// .....................................................................................

const degreeSpan = document.getElementById("degree_attribute");
const degreeSwitcher = document.querySelectorAll("button.degree-selector");

const toFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32);
const toCelsius = (fahrenheit) => Math.round(((fahrenheit - 32) * 5) / 9);

degreeSwitcher.forEach((switcher) => {
  switcher.addEventListener("click", (e) => {
    let value = parseInt(degreeSpan.innerText);
    if (appState.degreeUnit === "f") {
      degreeSpan.innerText = toCelsius(value);
      appState.degreeUnit = "c";
    } else {
      degreeSpan.innerText = toFahrenheit(value);
      appState.degreeUnit = "f";
    }
  });
});

// Bonus Point ..................................

async function getLocation(event) {
  event.preventDefault();
  const retrievePosition = async (position) => {
    console.log(position);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const data = await fetchWeather({ lat, lon }, "location");

    console.log(data);
  };

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

const currentLocation = document.getElementById("current_location");
currentLocation.addEventListener("click", getLocation);
