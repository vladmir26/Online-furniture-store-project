export default class ProductDetails {
  constructor() {
    const input = document.querySelector('.product-details__input');
    const plus = document.querySelector('.product-details__plus');
    const minus = document.querySelector('.product-details__minus');
    const addCart = document.querySelector('.product-details__button');
    const productCount = document.querySelector('.wrapper__product-count');
    const modal = document.querySelector('.product-details__modal');
    const modalContent = document.querySelector('.product-details__modal-content');
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
      productCount.textContent = +(productCount.textContent) + (+(input.value));
      localStorage.setItem('count', productCount.textContent);
      input.value = 1;
      modal.classList.add('js-modal-active');
      modal.classList.add('js-modal-active-animation');
      body.classList.add('js-scroll');
    });
    modalbutton.addEventListener('click', () => {
      modal.classList.remove('js-modal-active');
      modal.classList.remove('js-modal-active-animation');
      body.classList.remove('js-scroll');
      productCount.classList.add('wrapper__product-count-active-animation');
      setTimeout(() => {
        productCount.classList.remove('wrapper__product-count-active-animation');
      }, '2000');
    });

    modal.addEventListener('click', (event) => {
      if (!modalContent.contains(event.target)) {
        modal.classList.remove('js-modal-active');
        modal.classList.remove('js-modal-active-animation');
        body.classList.remove('js-scroll');
        productCount.classList.add('wrapper__product-count-active-animation');
        setTimeout(() => {
          productCount.classList.remove('wrapper__product-count-active-animation');
        }, '2000');
      }
    });
  }
}
