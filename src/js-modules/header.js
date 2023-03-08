const header = document.getElementById('header');
const body = document.getElementById('body');
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

  if (body.classList.contains('js-disable-scroll')) {
    body.classList.remove('js-disable-scroll');
  } else {
    body.classList.add('js-disable-scroll');
  }
});

searchLink.addEventListener('click', (event) => {
  event.preventDefault();

  if (header.classList.contains('js-header--show-search')) {
    header.classList.remove('js-header--show-search');
  } else {
    header.classList.add('js-header--show-search');
  }

  if (body.classList.contains('js-disable-scroll')) {
    body.classList.remove('js-disable-scroll');
  } else {
    body.classList.add('js-disable-scroll');
  }

  header.classList.remove('js-header--show-menu');
});
