import '../scss/index.scss';
import '../index.html';
import { getWeatherByCityName, getWeatherByZIP } from './api';
import { isNumber } from './helpers';

// when document is loaded
document.addEventListener("DOMContentLoaded", () => {
  // default city once the page loads
  getWeatherByCityName('Nis');

  const form = document.querySelector('.city-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const value = e.target.elements['city'].value;
    // check if user typed in ZIP code or city name
    isNumber(value) ? getWeatherByZIP(value) : getWeatherByCityName(value);
    // clear input
    e.target.elements['city'].value = '';
  });
});
