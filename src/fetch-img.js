import axios from 'axios';

const KEY = '30832093-18366edc5a2dfa9c956b24a6c';
const URL = 'https://pixabay.com/api/';
let page = 1;

async function fetchData(word) {
  try {
    const response = await axios.get(
      `${URL}?key=${KEY}&q=${word}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    if (response.data.hits.length > 0) {
      page += 1;
      return response.data;
    } else {
      throw Error('photos Not Found');
    }
  } catch (error) {
    console.error(error);
  }
}

export default { fetchData };
