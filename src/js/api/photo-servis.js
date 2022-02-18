const API_KEY = '25749157-a4c917c2bcd06827218e6e0f4';
const BASE_URL = 'https://pixabay.com/api/';
const options = {
  headers: {
    Authorization: API_KEY,
  },
  // params: {
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: 'true',
  // per_page: '40',
  // }
};
// key=${API_KEY}
export default class PhotosApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchPhotos() {
    // const url = `${BASE_URL}?q=${this.searchQuery}&image_type=&page=photo&orientation=horizontal&safesearch=true&${this.page}&per_page=40`;
    // fetch(`${BASE_URL}${name}?${searchParams}`)
    // https://pixabay.com/api/?q=${searchQuery}&image_type=
    return fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=&page=photo&orientation=horizontal&safesearch=true&${this.page}&per_page=40`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        this.page += 1;
        return data.hits;
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
