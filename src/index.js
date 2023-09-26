import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './js-modules/header';
import './js-modules/subsription';
import './js-modules/info-banner';
import Catalog from './js-modules/Catalog-products.vue';
import ProductDetails from './js-modules/Product-details.vue';
import ProductCount from './js-modules/Product-count.vue';

createApp(Catalog).mount('#catalog');
createApp(ProductDetails).use(createPinia()).mount('#product');
createApp(ProductCount).mount('#product-count');

$(window).on('load', () => {
  const infoBannerClosed = localStorage.getItem('infoBannerClosed');
  if (!(infoBannerClosed && infoBannerClosed === 'true')) {
    $('.info-banner').removeClass('hidden');
    $('#header').addClass('header');
  }
});
