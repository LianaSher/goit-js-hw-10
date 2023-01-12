import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');
const countryListEl = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  let inputValue = evt.target.value.trim();
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
  if (!inputValue) {
    return;
  }
  fetchCountries(inputValue)
    .then(isSpecificName)
    .then(markup)
    .catch(err => console.log(err));
}

function isSpecificName(data) {
  if (data.length >= 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  return data;
}

function markup(data) {
  if (data.length > 1) {
    const countriesList = data
      .map(
        ({ flags, name }) =>
          `<li><img src="${flags.svg}" alt="country flag">${name.official}</li>`
      )
      .join('');

    renderMarkupList(countriesList);
  } else {
    const [country] = data;
    console.log(country);
    const { flags, name, capital, population, languages } = country;

    const countryMarkup = `<img src="${flags.svg}" alt="flag" />
    <h1>${name.official}</h1>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${Object.values(languages)}</p>`;

    renderMarkupOneCountry(countryMarkup);
  }
}

function renderMarkupList(markup) {
  countryListEl.insertAdjacentHTML('beforeend', markup);
}
function renderMarkupOneCountry(markup) {
  countryInfoEl.insertAdjacentHTML('beforeend', markup);
}
