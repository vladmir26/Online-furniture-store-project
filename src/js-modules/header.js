const header = document.getElementById('header');
const hamburgerLink = document.querySelector('.js-hamburger-link');
const searchLink = document.querySelector('.js-search-link');

hamburgerLink.addEventListener('click', (event) => {
  event.preventDefault();

  if (header.classList.contains('js-header--show-menu')) {
    header.classList.remove('js-header--show-menu');
  } else {
    header.classList.add('js-header--show-menu');
  }
  header.classList.remove('js-header--show-search');
});

searchLink.addEventListener('click', (event) => {
  event.preventDefault();

  if (header.classList.contains('js-header--show-search')) {
    header.classList.remove('js-header--show-search');
  } else {
    header.classList.add('js-header--show-search');
  }

  header.classList.remove('js-header--show-menu');
});
