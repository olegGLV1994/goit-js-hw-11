import FETCH from './fetch-img';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  button: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', searchForm);
refs.button.addEventListener('click', onFetchClick);
refs.button.classList.add('is-hidden');

let word = '';
function searchForm(e) {
  e.preventDefault();
  word = e.target.elements.searchQuery.value.trim();
  if (word === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  FETCH.fetchImg(word).then(onFetchResolve).catch(onFetchError);
  refs.button.classList.remove('is-hidden');
}

function onFetchClick() {
  FETCH.fetchImg(word)
    .then(data => {
      const card = data.hits.map(markup).join('');
      refs.gallery.innerHTML += card;
      simpleLightbox(data);
    })
    .catch(err => {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    });
}

function onFetchResolve(photoCards) {
  if (photoCards.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else {
    Notiflix.Notify.success(`Hooray! We found ${photoCards.totalHits} images.`);
  }
  const card = photoCards.hits.map(markup).join('');
  refs.gallery.innerHTML = card;

  simpleLightbox(photoCards);
}

function onFetchError(error) {
  refs.button.classList.add('is-hidden');
  Notiflix.Notify.failure('Something went wrong');
}
function markup(status) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = status;

  return `
  <div class="photo-card"><a href='${largeImageURL}'>
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class='img-card' /></a>
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

function simpleLightbox() {
  let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionType: 'alt',
    captionDelay: 250,
  }).refresh();
}
