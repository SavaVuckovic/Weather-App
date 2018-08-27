import '../scss/index.scss';
import '../index.html';
import {
  isNumber,
  getWeatherByZIP,
  getWeatherByCityName
} from './helpers';

const form = document.querySelector('#city-form');

// when document is laoded
document.addEventListener("DOMContentLoaded", () => {
  getWeatherByCityName('Nis');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const value = e.target.elements['city'].value;
    // check if user typed in ZIP code or city name
    if (isNumber(value)) {
      getWeatherByZIP(value);
    } else {
      getWeatherByCityName(value);
    }
    // clear input
    e.target.elements['city'].value = '';
  });
});
