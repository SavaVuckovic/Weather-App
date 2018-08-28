
const KEY = 'd320faf89d1840d0568c490f52c819d3';
let currentTemp = 'F';

// check if value is a number
export function isNumber(value) {
  return /^\d+$/.test(value);
}

// get weather by city name
export function getWeatherByCityName(city) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=${KEY}&q=${city}&units=imperial`)
    .then(res => res.json())
    .then(data => renderWeatherInfo(data));
}

// get weather by zip code
export function getWeatherByZIP(zip) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=${KEY}&zip=${zip}&units=imperial`)
    .then(res => res.json())
    .then(data => renderWeatherInfo(data));
}

// check if number is float
function isFloat(n) {
  return n === +n && n !== (n|0);
}

// set background image based on weather
function setBackgroundImage(weather) {
  const body = document.querySelector('body');
  const atmosphere = ['mist', 'smoke', 'haze', 'sand', 'fog', 'dust', 'squalls', 'tornado'];
  if (atmosphere.indexOf(weather) !== -1) {
    body.style.backgroundImage = `url(images/fog.jpg)`;
  } else {
    body.style.backgroundImage = `url(images/${weather}.jpg)`;
  }
}

// render weather info
function renderWeatherInfo(data) {
  // handle invalid city
  if (data.cod === '404') {
    return alert(data.message);
  }
  // set bg
  // setBackgroundImage(data.weather[0].main.toLowerCase());

  // populate the template with correct info
  const weatherTemplate = document.querySelector('#weather-info-template .weather-info');
  const newWeather = weatherTemplate.cloneNode(true);
  newWeather.querySelector('.city-name').innerText = `${data.name}, ${data.sys.country}`;
  newWeather.querySelector('.text').innerText = data.weather[0].description;
  newWeather.querySelector('.icon').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  newWeather.querySelector('.humidity span').innerText = data.main.humidity;
  newWeather.querySelector('.pressure span').innerText = data.main.pressure;
  newWeather.querySelector('#temp').innerText = data.main.temp;
  newWeather.querySelector('button').addEventListener('click', e => {
    const tempToConvert = document.querySelector('#temp').innerText;
    const newTemp = convertTemperature(tempToConvert);
    updateTemperatureText(newTemp);
    toggleButtonLabel(e.target);
  });
  // remove the old one and append new one to the body
  const body = document.querySelector('body');
  if (body.querySelectorAll('.weather-info').length > 1) {
    body.removeChild(body.querySelectorAll('.weather-info')[1]);
  }
  body.append(newWeather);
}

// convert from fahrenheit to celsius
function convertTemperature(tempToConvert) {
  let newTemp;
  if (currentTemp === 'F') {
    // fahrenheit to celsius
    newTemp = (tempToConvert - 32) * 5 / 9;
    currentTemp = 'C';
  } else {
    // celsius to fahrenheit
    newTemp = tempToConvert * 9 / 5 + 32;
    currentTemp = 'F';
  }
  // round the temperature if it is float
  if (isFloat(newTemp)) {
    newTemp = newTemp.toFixed(1);
  }

  return newTemp;
}

function toggleButtonLabel(button) {
  if (button.innerText === 'Convert to Fahrenheit') {
    button.innerText = 'Convert to Celsius';
  } else {
    button.innerText = 'Convert to Fahrenheit';
  }
}

function updateTemperatureText(newTemp) {
  document.querySelector('#temp').innerText = newTemp;
}
