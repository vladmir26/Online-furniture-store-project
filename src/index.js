import { createApp } from 'vue';
import './js-modules/header';
import './js-modules/subsription';
import './js-modules/info-banner';
import ProductDetails from './js-modules/product-details';
import './js-modules/test.ts';
import message from './js-modules/Catalog-products.vue';

createApp(message).mount('#catalog');

$(window).on('load', () => {
  const infoBannerClosed = localStorage.getItem('infoBannerClosed');
  if (infoBannerClosed && infoBannerClosed === 'true') {
    $('.info-banner').addClass('hidden');
  }

  const storage = localStorage.getItem('count');
  if (storage) {
    const productCount = document.querySelector('.wrapper__product-count');
    productCount.classList.add('wrapper__product-count-active');
    productCount.classList.remove('wrapper__product-count-active-animation');
    productCount.textContent = storage;
  }
});

const productDetails = document.querySelector('.js-product-details');

if (productDetails) {
  new ProductDetails();
}
