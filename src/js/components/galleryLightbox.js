import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox(
  '.photo-card a',
  /* options */
  {
    captionsData: 'alt',
    // captionSelector: 'self',
    // captionType: 'attr',

    captionDelay: 250,
    // enableKeyboard: true,
  },
);

export { lightbox };
