import photoCardTml from './templates/photoCard.hbs';
import './sass/main.scss';
import PhotosApiservice from './api/photo-servis.js';

const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'), // Карточки изображений
  loadMoreBtn: document.querySelector('.load-more'),
};
// photosApiService - це Об'єкт. Доступ photosApiService.query;
const photosApiService = new PhotosApiservice();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  // const searchQuery = e.currentTarget.elements.searchQuery.value;
  photosApiService.query = e.currentTarget.elements.searchQuery.value;
  photosApiService.resetPage();
  photosApiService.fetchPhotos().then(appendPhotosMarkup);
  // fetch
  // const options = {
  //     headers: {
  //         API_KEY: '25749157-a4c917c2bcd06827218e6e0f4',
  //     },
  //     params: {
  //     q: `${searchQuery}`,
  //         image_type: 'photo',
  //         orientation: 'horizontal',
  //         safesearch: 'true',
  //         // default 1, 20
  //     page: '1',
  //     per_page: '40',
  //     }
  // },
}
// const BASE_URL = `https://pixabay.com/api/`;
// // fetch(`${BASE_URL}${name}?${searchParams}`)
// // https://pixabay.com/api/?q=${searchQuery}&image_type=
// fetch(`${BASE_URL}?key=${API_KEY}&q=`, options).then(response => {
//     if (!response.ok) {
//         throw new Error(response.status)
//     }
//     return response.json();
// });

function onLoadMore() {
  photosApiService.fetchPhotos().then(appendPhotosMarkup);
}

function appendPhotosMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', photoCardTml(data));
}
// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.
