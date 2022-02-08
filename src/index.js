import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './fetchImages';
import { page } from './fetchImages';
import { resetPage } from './fetchImages';
export const API_KEY = '25611286-d3301de9845eb7113c68c548e';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  input: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
let request = '';

// refs.loadMoreBtn.addEventListener('click', formGetInput);
refs.input.addEventListener('submit', formGetInput);

function formGetInput(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  resetPage();
  request = refs.input.searchQuery.value;
  getInputApi(request);
}

async function getInputApi(request) {
  const responseFromApi = await fetchImages(request);
  // console.log('~ responseFromApi', responseFromApi);
  makeGallery(responseFromApi);
}

function makeGallery(images) {
  const totalHits = images.data.totalHits;
  alerts(totalHits);

  console.log('~ totalHits', totalHits);
  const arrayImg = images.data.hits;
  // console.log('~ arrayImg', arrayImg);
  const marcup = arrayImg
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<a class="gallery__item" href="${largeImageURL}"><div class="photo-card"><div class="img-container"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></div><div class="info"><p class="info-item"><b>Likes</b><br>${likes}</p><p class="info-item"><b>Views</b><br>${views}</p><p class="info-item"><b>Comments</b><br>${comments}</p><p class="info-item"><b>Downloads</b><br>${downloads}</p></div></div></a>`,
    )
    .join('');
  // console.log(marcup);
  renderGallery(marcup);
}
function renderGallery(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery__item');
  lightbox.refresh();
}

window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    getInputApi(request);
  }
});

function alerts(totalHits) {
  const totalImages = (page - 2) * 40;
  console.log('~ page', page);
  console.log('~ totalImages', totalImages);
  if (totalHits === 0) {
    return Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`,
    );
  }

  if (totalHits / totalImages <= 1) {
    console.log('~ page', page);
    return Notify.failure(`We're sorry, but you've reached the end of search results.`);
  }

  if (page === 2) {
    return Notify.success(`Hooray! We found ${totalHits} images.`);
  }
}
// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
//   downloads - количество загрузок.

// const DEBOUNCE_DELAY = 300;
// let markup = '';
// const refs = {
//   input: document.querySelector('#search-box'),
//   ulItems: document.querySelector('.country-list'),
// };

// refs.input.addEventListener('input', debounce(postInputApi, DEBOUNCE_DELAY));

// function postInputApi() {
//   const inputValue = refs.input.value.trim();

//   if (inputValue === '') {
//     return;
//   }

//   fetchCountries(inputValue)
//     .then(countries => {
//       if (countries.length > 10) {
//         return toMachCoutries(countries);
//       }
//       if (countries.length === 1) {
//         return oneCountry(countries);
//       }
//       listCountries(countries);
//       // renderCountriesList(countries)
//     })
//     .catch(error => {
//       refs.ulItems.innerHTML = '';
//       Notify.failure(`❌ ${error} Oops, there is no country with that name`);
//     });
// }

// function toMachCoutries() {
//   Notify.success(`Too many matches found. Please enter a more specific name`);
//   return;
// }

// function oneCountry(countries) {
//   markup = countries
//     .map(
//       ({ capital, flags: { svg }, languages, name: { official }, population }) =>
//         `<li class="li"><div class="country"><img class="icon" src="${svg}" width="40px"><H3>${official}</H3></div><p><b>Capital:</b> ${capital}</p><p><b>Population:</b> ${population}</p><p><b>language:</b> ${Object.values(
//           languages,
//         )}</p></li>`,
//     )
//     .join('');
//   renderCountreisList();
// }

// function listCountries(countries) {
//   markup = countries
//     .map(
//       ({ flags: { svg }, name: { official } }) =>
//         `<li class="country"><img class="icon" src="${svg}" width="40px"><H4>${official}</H4></li>`,
//     )
//     .join('');
//   renderCountreisList();
// }

// function renderCountreisList() {
//   refs.ulItems.innerHTML = markup;
// }

{
  /* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>; */
}
