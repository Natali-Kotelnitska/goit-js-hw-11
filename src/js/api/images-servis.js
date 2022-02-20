import axios from 'axios';
import Notiflix from 'notiflix';
const API_KEY = '25749157-a4c917c2bcd06827218e6e0f4';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    return await axios
      .get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}`, {
        params: {
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
        },
      })
      .then(response => {
        console.log(response.data.hits.length);
        if (response.data.hits.length === 0) {
          console.log('Hello Response');
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
