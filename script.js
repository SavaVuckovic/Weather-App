const form = document.querySelector('#city-form');

function onFormSubmit(e) {
  e.preventDefault();
  const city = e.target.elements['city'].value;
  e.target.elements['city'].value = '';
}

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener('submit', onFormSubmit);
});
