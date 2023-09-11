import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './js-modules/header';
import './js-modules/subsription';
import './js-modules/info-banner';
import message from './js-modules/Catalog-products.vue';
import mes from './js-modules/Product-details.vue';
import mess from './js-modules/Product-count.vue';

createApp(message).mount('#catalog');
createApp(mes).use(createPinia()).mount('#product');
createApp(mess).mount('#product-count');

$(window).on('load', () => {
  const infoBannerClosed = localStorage.getItem('infoBannerClosed');
  if (!(infoBannerClosed && infoBannerClosed === 'true')) {
    $('.info-banner').removeClass('hidden');
    $('#header').addClass('header');
  }
});
