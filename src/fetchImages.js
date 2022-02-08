const axios = require('axios').default;
import { API_KEY } from './index';
export async function fetchImages(request) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true`,
    );
    // console.log(response);
    return response;
  } catch (error) {
    console.error('Ошибочка', error);
  }
}
