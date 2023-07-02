const input = document.querySelector('.product-details__input');
const plus = document.querySelector('.product-details__plus');
const minus = document.querySelector('.product-details__minus');
const addCart = document.querySelector('.product-details__button');
const productCount = document.querySelector('.wrapper__product-count');

plus.addEventListener('click', () => {
  const valueNumber = Number(input.value) + 1;
  input.value = valueNumber;
});

minus.addEventListener('click', () => {
  const valueNumber = Number(input.value) - 1;
  if (valueNumber > 0) {
    input.value = valueNumber;
  }
});

addCart.addEventListener('click', (event) => {
  event.preventDefault();
  productCount.classList.add('wrapper__product-count-active');
  productCount.textContent = input.value;
  localStorage.setItem('count', productCount.textContent);
});

const storage = localStorage.getItem('count');

window.addEventListener('load', () => {
  if (storage) {
    productCount.classList.add('wrapper__product-count-active');
    productCount.textContent = storage;
  }
});
