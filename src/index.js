const hamburger = document.querySelector('.wrapper__hamburger');
const search = document.querySelector('.wrapper__search');
const searchLink = document.querySelector('.wrapper__search-link');
const formheader = document.querySelector('.wrapper__form');
const hamburgerLink = document.querySelector('.wrapper__hamburger-link');
const menu = document.querySelector('.menu');
const closeMenu = document.querySelector('.close-menu');
const closeForm = document.querySelector('.close-form');

hamburger.addEventListener('click', (event) => {
  event.preventDefault();
  menu.classList.add('menu-active');
  hamburgerLink.classList.add('wrapper__hamburger-link--active');
  closeMenu.classList.add('close-menu--active');
  formheader.classList.remove('wrapper__form--active');
  closeForm.classList.remove('close-form--active');
  searchLink.classList.remove('wrapper__search-link--active');
});

closeMenu.addEventListener('click', () => {
  menu.classList.remove('menu-active');
  closeMenu.classList.remove('close-menu--active');
  hamburgerLink.classList.remove('wrapper__hamburger-link--active');
});

search.addEventListener('click', (event) => {
  event.preventDefault();
  formheader.classList.add('wrapper__form--active');
  searchLink.classList.add('wrapper__search-link--active');
  closeForm.classList.add('close-form--active');
  menu.classList.remove('menu-active');
  closeMenu.classList.remove('close-menu--active');
  hamburgerLink.classList.remove('wrapper__hamburger-link--active');
});

closeForm.addEventListener('click', () => {
  formheader.classList.remove('wrapper__form--active');
  closeForm.classList.remove('close-form--active');
  searchLink.classList.remove('wrapper__search-link--active');
});

const formSubscription = document.querySelectorAll('.js-subscription-form');

formSubscription.forEach((elem) => {
  elem.addEventListener('submit', (event) => {
    event.preventDefault();
    const buttonSubscription = event.target.querySelectorAll('.js-subscription-button');
    buttonSubscription.forEach((el) => {
      const btntext = el.textContent;
      el.textContent = '';
      el.innerHTML += '<i class="fa fa-spinner fa-spin"/>';
      el.disabled = true;

      setTimeout(() => {
        el.textContent = btntext;
        el.disabled = false;
        elem.innerHTML += '<div class="window">Спасибо за заявку</div>';
      }, 10000);
    });
  });
});
