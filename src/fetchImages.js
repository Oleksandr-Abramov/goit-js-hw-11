const axios = require('axios').default;
import { API_KEY } from './index';
export let page = 1;
export function resetPage() {
  page = 1;
}
export async function fetchImages(request) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: request,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page,
  });
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?${params}`,
      //   `https://pixabay.com/api/?key=${API_KEY}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40$page=${page}`,
    );
    page += 1;
    // console.log(response);
    return response;
  } catch (error) {
    console.error('Ошибочка', error);
  }
}

// const searchParams = new URLSearchParams({
//   _limit: 5,
//   _sort: "name",
// });

// console.log(searchParams.toString()); // "_limit=5&_sort=name"

// const url = `https://jsonplaceholder.typicode.com/users?${searchParams}`;
// console.log(url); // "https://jsonplaceholder.typicode.com/users?_limit=5&_sort=name"
