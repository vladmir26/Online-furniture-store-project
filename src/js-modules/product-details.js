export default class ProductDetails {
  constructor() {
    const input = document.querySelector('.product-details__input');
    const plus = document.querySelector('.product-details__plus');
    const minus = document.querySelector('.product-details__minus');
    const addCart = document.querySelector('.product-details__button');
    const productCount = document.querySelector('.wrapper__product-count');
    const modal = document.querySelector('.product-details__modal');
    const modalbutton = document.querySelector('.product-details__modal-button');
    const body = document.querySelector('.body');

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
      input.value = 1;
      modal.classList.add('js-modal-active');
      body.classList.add('js-scroll');
    });
    modalbutton.addEventListener('click', () => {
      modal.classList.remove('js-modal-active');
      body.classList.remove('js-scroll');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}
