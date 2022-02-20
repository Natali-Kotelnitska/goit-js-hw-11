import axios from 'axios';

const API_KEY = '25749157-a4c917c2bcd06827218e6e0f4';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchImages() {
    return await axios
      .get(
        `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=${this.per_page}`,
        {
          params: {
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            // per_page: 40,
          },
        },
      )
      .then(response => {
        if (response.data.hits.length === 0) {
          throw new Error();
        }
        this.page += 1;

        return response.data;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}
