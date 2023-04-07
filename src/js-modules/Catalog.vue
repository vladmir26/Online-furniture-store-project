<template>
    <section class="products-catalog" id="catalog">
    <h2 class="visially-hidden">Products catalog</h2>
    <ul class="products-catalog__list">
        <li v-for="(item, index) in {products}" class="products-catalog__item"> <a class="products-catalog__link" href="#">
                <img class="products-catalog__image" src="" alt="image-first" />
                <h3 class="products-catalog__title">{{ index[0] }} - {{ item.title }} </h3>
            </a></li>
        <li class="products-catalog__item"> <a class="products-catalog__link" href="#">
                <img class="products-catalog__image" src="" alt="image-second" />
                <h3 class="products-catalog__title">Rustic Vase Set</h3>
                <p class="products-catalog__text">£155</p>
            </a></li>
        <li class="products-catalog__item"> <a class="products-catalog__link" href="#">
                <img class="products-catalog__image" src="" alt="image-nine" />
                <h3 class="products-catalog__title">The Yellow chair</h3>
                <p class="products-catalog__text">£250</p>
            </a></li>
        <li class="products-catalog__item"> <a class="products-catalog__link" href="#">
                <img class="products-catalog__image" src="" alt="image-third" />
                <h3 class="products-catalog__title">The Silky Vase</h3>
                <p class="products-catalog__text">£125</p>
            </a></li>
        <li class="products-catalog__item"> <a class="products-catalog__link" href="#">
                <img class="products-catalog__image" src="" alt="image-fourth" />
                <h3 class="products-catalog__title">The Lucy Lamp</h3>
                <p class="products-catalog__text">£399</p>
            </a></li>
        <li class="products-catalog__item"> <a class="products-catalog__link" href="#">
                <img class="products-catalog__image" src="" alt="image-sixth" />
                <h3 class="products-catalog__title">The Dandy chair</h3>
                <p class="products-catalog__text">£250</p>
            </a></li>
        <li class="products-catalog__item"> <a class="products-catalog__link" href="#">
                <img class="products-catalog__image" src="" alt="image-ten" />
                <h3 class="products-catalog__title">The Multiple Lamps</h3>
                <p class="products-catalog__text">£250 </p>
            </a></li>
        <li class="products-catalog__item"> <a class="products-catalog__link" href="#">
                <img class="products-catalog__image" src="" alt="image-eleven" />
                <h3 class="products-catalog__title">The Small Vase</h3>
                <p class="products-catalog__text">£250</p>
            </a></li>
        <li class="products-catalog__item"> <a class="products-catalog__link" href="#">
                <img class="products-catalog__image" src="" alt="image-twelve" />
                <h3 class="products-catalog__title">The Multiple chairs</h3>
                <p class="products-catalog__text">£250</p>
            </a></li>
    </ul>
    <div class="products-catalog__button-link-wrapper"><a class="products-catalog__button-link" href="#">Load more</a></div>
</section>
</template>

<script>
import { onMounted } from 'vue'

export default {
    data() {
        return {
          products: [],
        
        },
        onMounted(() => {

            fetch('https://dummyjson.com/products')
            .then(res => res.text())
            .then(res => {
             this.products = res.products;
             console.log(this.products);
             })
          })
        }}
</script>