const API_KEY = '30832093-18366edc5a2dfa9c956b24a6c';
const URL = 'https://pixabay.com/api/';

function fetchImg(word) {
  return fetch(
    `${URL}?key=${API_KEY}&q=${word}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
  ).then(response => {
    return response.json();
  });
}

export default { fetchImg };
