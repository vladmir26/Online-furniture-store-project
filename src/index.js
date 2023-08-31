import { createApp } from 'vue';
import './js-modules/header';
import './js-modules/subsription';
import './js-modules/info-banner';
import ProductDetails from './js-modules/product-details';
import message from './js-modules/Catalog-products.vue';
import mes from './js-modules/Product-details.vue';

createApp(message).mount('#catalog');
createApp(mes).mount('#product');

$(window).on('load', () => {
  const infoBannerClosed = localStorage.getItem('infoBannerClosed');
  if (!(infoBannerClosed && infoBannerClosed === 'true')) {
    $('.info-banner').removeClass('hidden');
    $('#header').addClass('header');
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
