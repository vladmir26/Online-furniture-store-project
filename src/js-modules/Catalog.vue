<template>
    <aside class="filters" id="catalog">
    <div class="filters__wrapper">
       <h2 class="visially-hidden">Filters</h2>
       <div class="filters__button-wrapper"><button class="filters__button-first">Filters</button>
       <select name="sorting" v-model="sorting">
           <option value="popular">Popular</option>
           <option value="cheap">Cheapest first</option>
           <option value="expensive">Expensive first</option>
        </select>
        </div>
        <h3 class="filters__title">Categories</h3>
        <ul class="filters__list">
            <li v-for="item in categories" class="filters__item">
               <input class="filters__checkbox" :id="item" type="checkbox" @change="filterItems" name="categories" :value="item">
               <label  class="filters__label" :for="item">{{ item.charAt(0).toUpperCase() + item.slice(1) }}</label>
            </li> 
        </ul>
        <h3 class="filters__title">Price</h3>
        <ul class="filters__list">
            <li class="filters__item" v-for="item in prises">
              <input class="filters__checkbox" :id="item" type="checkbox" name="price" :value="item" />
              <label class="filters__label" :for="item"></label>
            </li>
        </ul>
        <h3 class="filters__title">Brands</h3>
        <ul class="filters__list">
            <li class="filters__item" v-for="item in brands">
               <input class="filters__checkbox" :id="item" type="checkbox" @change="filterItems" name="categories" :value="item">
               <label class="filters__label" :for="item">{{ item }}</label>
            </li> 
        </ul>
    </div>
    </aside>
    <section class="products-catalog">
    <h2 class="visially-hidden">Products catalog</h2>
    <ul class="products-catalog__list">
        <li v-for="item in productsSorted" class="products-catalog__item"> <a class="products-catalog__link" href="#">
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
           prises: [],
           filters: [],
           priceFilters: [],
           sorting: 'popular'

        }
        },
        computed: {
          productsfiltered() {
            if (!this.filters.length) {
              return this.products;
            } else {
              return this.products.filter(item => this.filters.includes(item.brand) || this.filters.includes(item.category))
            }
          },
          productsSorted() {
            if (this.sorting === 'popular') {
              return this.productsfiltered;
            } else if (this.sorting === 'cheap') {
              return this.productsfiltered.sort((a, b) => a.price - b.price);
            } else if (this.sorting === 'expensive') {
              return this.productsfiltered.sort((a, b) => b.price - a.price);
            }
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

                    if(!this.prises.includes(product.price)) {
                        this.prises.push(product.price);
                    }
                })      
                console.log(this.prises);
                })
              .catch(console.log)
        },
        methods: { 

    filterItems(event) {
       if(event.target.checked) {
          this.filters.push(event.target.value)
      } else {
          this.filters = this.filters.filter(item => item !== event.target.value);  
      }
    },

    filterPrice(event) {

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
    margin-top: 5px;
    margin-left: 12px;
    content: '';
    border-style: solid;
    border-width: 8px 8px 8px 0;
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