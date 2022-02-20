import Notiflix from 'notiflix';
import './sass/main.scss';
import { refs } from './js/components/references';
import imagesCardTml from './templates/imagesCard.hbs';
import ImagesApiService from './js/api/images-servis.js';
import LoadMoreBtn from './js/components/load-more-btn.js';
import { lightbox } from './js/components/galleryLightbox';
import { options } from './js/components/notify';
// import { onScroll } from './js/components/scroll.js';

//  Classes
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imagesApiService = new ImagesApiService(); // imagesApiService - це Об'єкт.

// Events
refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onOpenLightbox);

// Callback, Functions
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

  // onScroll();;
  refs.form.reset();
}

function onLoadMore() {
  imagesApiService
    .fetchImages()
    .then(data => {
      renderImagesMarkup(data.hits);

      if (imagesApiService.page === 2) {
        notice(data.totalHits);
      }
    })
    .catch(data => {
      loadMoreBtn.hide();
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    });
}

function notice(total) {
  Notiflix.Notify.success(`Hooray! We found ${total} images.`);
}
//Render GalleryMarkup
function renderImagesMarkup(data) {
  if (data.length > 20) {
    loadMoreBtn.show();
  } else {
    loadMoreBtn.hide();
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
  }
  refs.gallery.insertAdjacentHTML('beforeend', imagesCardTml(data));
  lightbox.refresh();
}

function onOpenLightbox(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  lightbox.open();
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}
