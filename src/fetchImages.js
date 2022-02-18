const axios = require('axios').default;
const API_KEY = '25611286-d3301de9845eb7113c68c548e';

export async function fetchImages(request, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: request,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page,
  });

  const response = await axios.get(`https://pixabay.com/api/?${params}`);
  return response;
}
