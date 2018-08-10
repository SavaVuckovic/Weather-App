const form = document.querySelector('#city-form');
const weatherInfo = document.querySelector('#weather-info');

const KEY = 'd320faf89d1840d0568c490f52c819d3';

// form submit handler
function onFormSubmit(e) {
  e.preventDefault();
  const city = e.target.elements['city'].value;
  getWeatherByCityName(city);
  e.target.elements['city'].value = '';
}

// get weather by city name
function getWeatherByCityName(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?APPID=${KEY}&q=${city}`;
  fetch(url)
    .then(res => res.json())
    .then(data => renderWeatherInfo(data));
}

// get weather by zip code


// render weather info
function renderWeatherInfo(data) {
  weatherInfo.innerHTML = '';
  console.log(data);
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
}

// when document is laoded
document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener('submit', onFormSubmit);
});
