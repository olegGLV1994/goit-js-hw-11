import FETCH from './fetch-img';

const refs = {
  form: document.querySelector('.search-form'),
  button: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', searchForm);
refs.button.addEventListener('click', onFetchClick);

let word = '';

function searchForm(e) {
  e.preventDefault();
  word = e.currentTarget.elements.searchQuery.value;
  FETCH.fetchImg(word).then(onFetchResolve).catch(onFetchError);
}

function onFetchClick() {
  FETCH.fetchImg(word).then(onFetchResolve).catch(onFetchError);
}

function onFetchResolve(photoCards) {
  console.log('=>>>>>', photoCards);
  const card = photoCards.hits.map(markup).join('');
  refs.gallery.innerHTML = card;
}

function onFetchError(error) {
  console.log(error);
}
function markup(status) {
  const { webformatURL, tags, likes, views, comments, downloads } = status;
  return `
  <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class='img-card' />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views:</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments:</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b> ${downloads}
    </p>
  </div>
</div>
  `;
}
