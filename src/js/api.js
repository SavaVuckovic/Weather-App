import renderWeatherInfo from './dom';

const KEY = 'd320faf89d1840d0568c490f52c819d3';

// get weather by city name
export function getWeatherByCityName(city) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=${KEY}&q=${city}&units=imperial`)
    .then(res => res.json())
    .then(data => renderWeatherInfo(data))
    .catch(err => alert(err));
}

// get weather by zip code
export function getWeatherByZIP(zip) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=${KEY}&zip=${zip}&units=imperial`)
    .then(res => res.json())
    .then(data => renderWeatherInfo(data))
    .catch(err => alert(err));
}