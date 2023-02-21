const hamburger = document.querySelector('.wrapper__hamburger');
const menu = document.querySelector('.menu');
const closeMenu = document.querySelector('.close');

hamburger.addEventListener('click', (event) => {
  event.preventDefault();
  menu.classList.add('menu-active');
  closeMenu.classList.add('close-active');
});

closeMenu.addEventListener('click', () => {
  menu.classList.remove('menu-active');
  closeMenu.classList.remove('close-active');
});

const formSubscription = document.querySelector('.subscription__form');
const buttonSubscription = document.getElementById('button');

formSubscription.addEventListener('submit', (event) => {
  event.preventDefault();
  buttonSubscription.textContent = '';
  buttonSubscription.innerHTML += `<i class='fa fa-spinner fa-spin'/>`;
  buttonSubscription.disabled = true;
});

const formFooter = document.querySelector('.footer__form');
const buttonFooter = document.querySelector('.footer__button');

formFooter.addEventListener('submit', (event) => {
  event.preventDefault();
  buttonFooter.textContent = '';
  buttonFooter.innerHTML += `<i class='fa fa-spinner fa-spin'/>`;
  buttonFooter.disabled = true;
});
