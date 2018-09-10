import { convertTemperature } from './helpers';

const body = document.querySelector('body');

// render weather info
export default function renderWeatherInfo({ cod, message, weather, name, sys, main }) {
  // handle invalid city
  if (cod === '404') {
    return alert(message);
  }
  // set bg
  setBackgroundImage(weather[0].main.toLowerCase());
  // clone the weather info template
  const weatherTemplate = document.querySelector('#weather-info-template .weather-info');
  const newWeather = weatherTemplate.cloneNode(true);
  // populate the template with correct info
  newWeather.querySelector('.city-name').innerText = `${name}, ${sys.country}`;
  newWeather.querySelector('.text').innerText = weather[0].description;
  newWeather.querySelector('.icon').src = `http://openweathermap.org/img/w/${weather[0].icon}.png`;
  newWeather.querySelector('.humidity span').innerText = main.humidity;
  newWeather.querySelector('.pressure span').innerText = main.pressure;
  newWeather.querySelector('#temp').innerText = main.temp;
  newWeather.querySelector('button').addEventListener('click', e => {
    const tempToConvert = newWeather.querySelector('#temp').innerText;
    newWeather.querySelector('#temp').innerText = convertTemperature(tempToConvert);
    toggleButtonLabel(e.target);
  });
  // remove the old one and append new one to the body
  if (body.querySelectorAll('.weather-info').length > 1) {
    body.removeChild(body.querySelectorAll('.weather-info')[1]);
  }
  body.append(newWeather);
}

// set background image based on weather
function setBackgroundImage(weather) {
  const atmosphere = ['mist', 'smoke', 'haze', 'sand', 'fog', 'dust', 'squalls', 'tornado'];
  body.className = atmosphere.indexOf(weather) !== -1 ? 'fog' : weather;
}

function toggleButtonLabel(button) {
  if (button.innerText === 'Convert to Fahrenheit') {
    button.innerText = 'Convert to Celsius';
  } else {
    button.innerText = 'Convert to Fahrenheit';
  }
}

function updateTemperatureText(newTemp) {
  
}
