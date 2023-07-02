import './js-modules/header';
import './js-modules/subsription';
import './js-modules/info-banner';
import './js-modules/product-details';
import './js-modules/test.ts';
import { createApp } from 'vue';
import message from './js-modules/Catalog-products.vue';

createApp(message).mount('#catalog');
