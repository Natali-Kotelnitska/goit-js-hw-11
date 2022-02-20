import Notiflix from 'notiflix';
import imagesCardTml from './templates/imagesCard.hbs';
import './sass/main.scss';
import ImagesApiService from './js/api/images-servis.js';
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
const imagesApiService = new ImagesApiService();

refs.form.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  clearGalleryContainer();
  imagesApiService.resetPage();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (imagesApiService.query === '') {
    loadMoreBtn.hide();
    return Notiflix.Notify.warning('Please try again.');
  }
  onLoadMore();
  refs.form.reset();
}

function onLoadMore() {
  imagesApiService
    .fetchImages()
    .then(data => {
      console.log(data);
      console.log(data.hits);
      renderImagesMarkup(data.hits);
    })
    .catch(data => {
      loadMoreBtn.hide();
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.',
        {
          clickToClose: true,
          timeout: 2000,
        },
      );
    });
}

function renderImagesMarkup(data) {
  if (data.length > 20) {
    loadMoreBtn.show();
  } else {
    loadMoreBtn.hide();
  }
  refs.gallery.insertAdjacentHTML('beforeend', imagesCardTml(data));
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}
