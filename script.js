const form = document.querySelector('#city-form');
const weatherInfo = document.querySelector('#weather-info');
const KEY = 'd320faf89d1840d0568c490f52c819d3';
let currentTemp = 'F';

// form submit handler
function onFormSubmit(e) {
  e.preventDefault();
  const city = e.target.elements['city'].value;
  getWeatherByCityName(city);
  e.target.elements['city'].value = '';
}

// get weather by city name
function getWeatherByCityName(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?APPID=${KEY}&q=${city}&units=imperial`;
  fetch(url)
    .then(res => res.json())
    .then(data => renderWeatherInfo(data));
}

// get weather by zip code


// set background image based on weather
function setBackgroundImage(weather) {
  document.querySelector('body').style.backgroundImage = `url(images/${weather}.jpg)`;
}

// render weather info
function renderWeatherInfo(data) {
  weatherInfo.innerHTML = '';
  console.log(data);
  // set bg
  setBackgroundImage(data.weather[0].main.toLowerCase());
  // city name
  const name = document.createElement('h1');
  name.innerText = `${data.name}, ${data.sys.country}`;
  weatherInfo.appendChild(name);
  // description & icon
  const descriptionWrapper = document.createElement('div');
  descriptionWrapper.classList.add('description');
  const description = document.createElement('span');
  description.innerText = data.weather[0].description;
  const icon = document.createElement('img');
  icon.setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
  icon.setAttribute('alt', 'weather-icon');
  descriptionWrapper.appendChild(description);
  descriptionWrapper.appendChild(icon);
  weatherInfo.appendChild(descriptionWrapper);
  // humidity
  const humidity = document.createElement('p');
  humidity.innerHTML = `humidity: <span>${data.main.humidity}</span>`;
  weatherInfo.appendChild(humidity);
  // pressure
  const pressure = document.createElement('p');
  pressure.innerHTML = `pressure: <span>${data.main.pressure}</span>`;
  weatherInfo.appendChild(pressure);
  // temperature
  const temperature = document.createElement('p');
  temperature.innerHTML = `temperature: <span id="temp">${data.main.temp}</span>`;
  weatherInfo.appendChild(temperature);
  // converting button
  const convertBtn = document.createElement('button');
  convertBtn.innerText = 'Convert to Celsius';
  convertBtn.addEventListener('click', convertTemperature);
  weatherInfo.appendChild(convertBtn);
}

// check if number is float
function isFloat(n) {
  return n === +n && n !== (n|0);
}

// convert from fahrenheit to celsius
function convertTemperature(e) {
  const tempDiv = document.querySelector('#temp');
  const tempToConvert = tempDiv.innerText;
  let newTemp;
  if (currentTemp === 'F') {
    // fahrenheit to celsius
    newTemp = (tempToConvert - 32) * 5 / 9;
    e.target.innerText = 'Convert to Fahrenheit';
    currentTemp = 'C';
  } else {
    // celsius to fahrenheit
    newTemp = tempToConvert * 9 / 5 + 32;
    e.target.innerText = 'Convert to Celsius';
    currentTemp = 'F';
  }
  // round the temperature if it is float and update in the UI
  if (isFloat(newTemp)) {
    newTemp = newTemp.toFixed(1);
  }
  tempDiv.innerText = newTemp;
}

// when document is laoded
document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener('submit', onFormSubmit);
});
