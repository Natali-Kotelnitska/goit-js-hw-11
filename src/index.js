import photoCardTml from './templates/photoCard.hbs';
import './sass/main.scss';
import PhotosApiservice from './js/api/photo-servis.js';
import LoadMoreBtn from './js/components/load-more-btn.js';
const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'), // Карточки изображений
  // loadMoreBtn: document.querySelector('.load-more'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
// photosApiService - це Об'єкт. Доступ photosApiService.query;
const photosApiService = new PhotosApiservice();

refs.form.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  photosApiService.query = e.currentTarget.elements.searchQuery.value;
  // if (photosApiService.query === '') {
  //   return alert('Enter value');
  // }
  loadMoreBtn.show();

  photosApiService.resetPage();
  clearGalleryContainer();
  onLoadMore();
}

function onLoadMore() {
  loadMoreBtn.disable();
  photosApiService.fetchPhotos().then(data => {
    appendPhotosMarkup(data);
    loadMoreBtn.enable();
  });
}

function appendPhotosMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', photoCardTml(data));
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}
