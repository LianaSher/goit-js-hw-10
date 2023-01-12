import Notiflix from 'notiflix';
function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,languages,population`
  )
    .then(response => {
      if (response.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(data => {
      return data;
    });
}

export { fetchCountries };
