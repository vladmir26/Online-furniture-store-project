<template>
    <aside class="filters" id="catalog">
    <div class="filters__wrapper">
        <h2 class="visially-hidden">Filters</h2>
        <div class="filters__button-wrapper"><button class="filters__button-first">Filters</button><button @click="buttonClick" class="filters__button-second">Sorting</button></div>
        <h3 class="filters__title">Categories</h3>
        <ul class="filters__list">
            <li v-for="item in categories" class="filters__item">
               <input class="filters__checkbox" :id="item" type="checkbox" name="categories" :value="item">
               <label  class="filters__label" :for="item">{{ item.charAt(0).toUpperCase() + item.slice(1) }}</label>
            </li> 
        </ul>
        <h3 class="filters__title">Price</h3>
        <ul class="filters__list">
            <li class="filters__item"><input class="filters__checkbox" id="checkbox-price-one" type="checkbox" name="price" value="price-one" /><label class="filters__label" for="checkbox-price-one">0 - 100</label></li>
            <li class="filters__item"><input class="filters__checkbox" id="checkbox-price-two" type="checkbox" name="price" value="price-two" /><label class="filters__label" for="checkbox-price-two">101 - 250</label></li>
            <li class="filters__item"><input class="filters__checkbox" id="checkbox-price-third" type="checkbox" name="price" value="price-third" /><label class="filters__label" for="checkbox-price-third">250 +</label></li>
        </ul>
        <h3 class="filters__title">Brands</h3>
        <ul class="filters__list">
            <li class="filters__item" v-for="item in brands">
               <input class="filters__checkbox" :id="item" type="checkbox" name="categories" :value="item">
               <label class="filters__label" :for="item">{{ item }}</label>
            </li> 
        </ul>
    </div>
    </aside>
    <section class="products-catalog">
    <h2 class="visially-hidden">Products catalog</h2>
    <ul class="products-catalog__list">
        <li v-for="item in products" class="products-catalog__item"> <a class="products-catalog__link" href="#">
                <img class="products-catalog__image" :src="item.images[0]" alt="image-first" />
                <h3 class="products-catalog__title">{{ item.title }}</h3>
                <p class="products-catalog__text">£{{ item.price }}</p>
            </a>
        </li>
    </ul>
    <div class="products-catalog__button-link-wrapper"><a class="products-catalog__button-link" href="#">Load more</a></div>
</section>
</template>

<script>

export default {
    data() {
        return {
           products: [],
           categories: [],
           brands: [],
           productsSmartphones: [],
           sorting: ['Popular', 'Cheapest first', 'Expensive first']

        }
        },
        created() {
            fetch('https://dummyjson.com/products')
              .then((res) => res.json())
              .then(res => {
                this.products = res.products;

                this.products.forEach((product) => {
                    if(!this.categories.includes(product.category)) {
                        this.categories.push(product.category);
                    }

                    if(!this.brands.includes(product.brand)) {
                        this.brands.push(product.brand);
                    }
                })
                    console.log(this.products);
                    console.log(this.categories);
                    //console.log(this.brands);

                    this.products.filter(item =>  {
                      if (item.category === 'smartphones') {
                      this.productsSmartphones.push(item)
                   }
                }
                );

                console.log(this.productsSmartphones);


                     

                })
              .catch(console.log)
        },
        methods: {
          buttonClick(event) {
            event.target.innerHTML += `<ul class='js-string-list'><li>${this.sorting[0]}</li><li>${this.sorting[1]}</li><li>${this.sorting[2]}</li></ul>`;
            
            if(event.target.classList.contains('filters__button-second::after')) {
             event.target.classList.remove('filters__button-second::after');
        }
    }
}
}
</script>

<style lang="scss">

@import "../styles/components/variables.scss";


.filters {
    &__button-wrapper {
        display: block;
    }

    &__button-first {
        display: none;
    }

    &__button-second {
        position: relative;
        width: 120px;
        height: 40px;
        font-family: $font-secondary;
        color: $background-primary;
        background-color: $background-third;
    }
}

.filters__button-second::after {
    position: absolute;
    top: 12;
    width: 0;
    height: 0;
    margin-top: 5px;
    margin-left: 12px;
    content: '';
    border-style: solid;
    border-width: 8px 8px 0 8px;
    border-color: #000000 transparent transparent transparent;
  }
  .filters__button-second-triangle::after {
    position: absolute;
    top: 12;
    width: 0;
    height: 0;
    content: '';
    border-style: solid;
    border-width: 8px 16px 8px 0;
    border-color: transparent #000000 transparent transparent;
  }
  .js-string-list {
    position: absolute;
    width: 120px;
    margin-bottom: 35px;
    margin-left: 95px;
    background-color: $background-third;
    text-align: start;
  }
</style>