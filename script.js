const form = document.querySelector('#city-form');

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
    .then(data => console.log(data));
}

// get weather by zip code


// render weather info


// when document is laoded
document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener('submit', onFormSubmit);
});
