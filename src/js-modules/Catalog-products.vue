<template>
  <aside id="catalog" class="filters">
    <div class="filters__wrapper">
      <h2 class="visially-hidden">Filters</h2>
      <div class="filters__button-wrapper">
        <button class="filters__button-first">Filters</button>
        <select v-model="sorting" class="filters__sorting" name="sorting">
          <option value="popular">Popular</option>
          <option value="cheap">Cheapest first</option>
          <option value="expensive">Expensive first</option>
        </select>
      </div>
      <div class="filters__accordion-wrapper" @resize="appearanceAcordion">
        <h3 class="filters__title">Categories</h3>
        <ul class="filters__list">
          <li v-for="item in categories" class="filters__item">
            <input :id="item" class="filters__checkbox" type="checkbox" name="categories" :value="item" @change="filterItems">
            <label class="filters__label" :for="item">{{ item.charAt(0).toUpperCase() + item.slice(1) }}</label>
          </li>
        </ul>
        <h3 class="filters__title">Price</h3>
        <ul class="filters__list">
          <li v-for="item in priceRange" class="filters__item">
            <input :id="item.id" class="filters__checkbox" type="checkbox" name="price" :value="item.id" @change="filterItems">
            <label class="filters__label" :for="item.id">{{ item.name }}</label>
          </li>
        </ul>
        <h3 class="filters__title">Brands</h3>
        <ul class="filters__list--scroll">
          <li v-for="item in brands" class="filters__item">
            <input :id="item" class="filters__checkbox" type="checkbox" name="brands" :value="item" @change="filterItems">
            <label class="filters__label" :for="item">{{ item }}</label>
          </li>
        </ul>
      </div>
    </div>
  </aside>
  <section class="products-catalog">
    <h2 class="visially-hidden">Products catalog</h2>
    <ul class="products-catalog__list">
      <li v-for="item in productsSorted" class="products-catalog__item">
        <a class="products-catalog__link" href="#">
          <img class="products-catalog__image" :src="item.images[0]" alt="image-first">
          <h3 class="products-catalog__title">{{ item.title }}</h3>
          <p class="products-catalog__text">£{{ item.price }}</p>
        </a>
      </li>
    </ul>
    <div class="products-catalog__button-link-wrapper"><a class="products-catalog__button-link" href="#" @click.prevent="loadingProducts">Load more</a></div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      limit: 30,
      counter: 1,
      products: [],
      categories: [],
      brands: [],
      maxPrice: 0,
      priсes: [],
      filters: [],
      selectedPriceCategory: [],
      priceFilters: [],
      sorting: 'popular',
    };
  },
  computed: {
    oneThirdPrice() {
      return Math.ceil(this.maxPrice / 3);
    },
    priceRange() {
      return [{
        id: 1,
        name: `0 - ${this.oneThirdPrice}`,
        minValue: 0,
        maxValue: this.oneThirdPrice,
      },
      {
        id: 2,
        name: `${this.oneThirdPrice + 1} - ${this.oneThirdPrice * 2}`,
        minValue: this.oneThirdPrice + 1,
        maxValue: this.oneThirdPrice * 2,
      },
      {
        id: 3,
        name: `${this.oneThirdPrice * 2 + 1} - ${this.maxPrice}`,
        minValue: this.oneThirdPrice * 2 + 1,
        maxValue: this.maxPrice,
      },
      ];
    },
    productsfiltered() {
      if (!this.filters.length) {
        return this.products;
      } else {
        const resArr = [];
        this.products.forEach((item) => {
          this.filters.forEach((filter) => {
            if (typeof filter === 'string') {
              if ((filter === item.brand || filter === item.category) && !resArr.includes(item)) {
                resArr.push(item);
              }
            } else {
              if ((item.price >= filter.minValue && item.price <= filter.maxValue) && !resArr.includes(item)) {
                resArr.push(item);
              }
            }
          });
        });
        return resArr;
      }
    },
    productsSorted() {
      const sorted = [...this.productsfiltered];
      if (this.sorting === 'popular') {
        return this.productsfiltered;
      } else if (this.sorting === 'cheap') {
        return sorted.sort((a, b) => a.price - b.price);
      } else if (this.sorting === 'expensive') {
        return sorted.sort((a, b) => b.price - a.price);
      }
    },
  },
  created() {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((res) => {
        this.products = res.products;
        this.createFilters();
      })
      .catch(console.log);
  },
  methods: {
    FiltersAccordion(event) {
      event.target.classList.toggle('active');
      if (event.target.nextElementSibling.style.display === 'block' && document.event.target.clientWidth < 767) {
        event.target.nextElementSibling.style.display = 'none';
      } else {
        event.target.nextElementSibling.style.display = 'block';
      }
    },
    appearanceAcordion(event) {
      if (window.screen.width < 767) {
        event.target.innerHTML += `<button class="accordion" @click="FiltersAccordion">Categories</button>
        <ul class="panel">
          <li v-for="item in categories" class="filters__item">
            <input :id="item" class="filters__checkbox" type="checkbox" name="categories" :value="item" @change="filterItems">
            <label class="filters__label" :for="item">{{ item.charAt(0).toUpperCase() + item.slice(1) }}</label>
          </li>
        </ul>
        <button class="accordion" @click="FiltersAccordion">Price</button>
        <ul class="panel">
          <li v-for="item in priceRange" class="filters__item">
            <input :id="item.id" class="filters__checkbox" type="checkbox" name="price" :value="item.id" @change="filterItems">
            <label class="filters__label" :for="item.id">{{ item.name }}</label>
          </li>
        </ul>
        <button class="accordion" @click="FiltersAccordion">Brands</button>
        <ul class="panel--scroll">
          <li v-for="item in brands" class="filters__item">
            <input :id="item" class="filters__checkbox" type="checkbox" name="brands" :value="item" @change="filterItems">
            <label class="filters__label" :for="item">{{ item }}</label>
          </li>
        </ul>}`;
      }
    },
    createFilters() {
      this.products.forEach((product) => {
        if (!this.categories.includes(product.category)) {
          this.categories.push(product.category);
        }
        if (!this.brands.includes(product.brand)) {
          this.brands.push(product.brand);
        }
        this.maxPrice = product.price > this.maxPrice ? product.price : this.maxPrice;
      });
    },
    filterItems(event) {
      if (event.target.checked) {
        if (event.target.name === 'price') {
          this.filters.push(this.priceRange.find((price) => price.id === +event.target.value));
        } else {
          this.filters.push(event.target.value);
        }
      } else {
        this.filters = this.filters.filter((item) => (typeof item === 'string' && item !== event.target.value) || (typeof item === 'object' && item.id !== +event.target.value));
      }
    },
    loadingProducts(event) {
      fetch(`https://dummyjson.com/products?limit=${this.limit}&skip=${this.counter * this.limit}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          this.counter += 1;
          this.products = this.products.concat(res.products);
          this.createFilters();
          if (res.limit === 0) {
            event.target.classList.add('js-hidden');
          }
        })
        .catch(console.log);
    },
  },
};
</script>

<style lang="scss">

@import "../styles/components/variables.scss";

.filters {
  &__sorting {
    margin-bottom: 20px;
  }
  &__list--scroll {
     width: 270px;
     max-height: 250px;
     overflow-y: scroll;
  }
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
  &__checkbox {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }

  &__label {
    position: relative;
    display: block;
    padding-left: 25px;
    font-family: $font-secondary;
    cursor: pointer;
  }

  &__label::before {
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    width: 16px;
    height: 16px;
    margin-top: -10px;
    content: '';
    background-color: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 2px;
    opacity: 1;
  }

  &__label::after {
    position: absolute;
    top: 2px;
    left: 5px;
    width: 5px;
    height: 10px;
    content: '';
    border: solid #fff;
    border-width: 0 1px 1px 0;
    opacity: 0;
    transform: rotate(45deg);
  }

  &__checkbox:checked + &__label::after {
    opacity: 1;
  }

  &__checkbox:checked + &__label::before {
    background-color: #4e4d93;
    opacity: 1;
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
  .js-hidden {
    display: none;
  }
  @media screen and (max-width: 767px) {
    .filters {
      &__accordion-wrapper {
        display: block;
        margin-right: 50px;
      }
      &__sorting {
        display: block;
        margin-top: 20px;
      }
      &__list--scroll {
        display: none;
      }
    }
    .accordion {
      background-color: #eee;
      color: #444;
      cursor: pointer;
      padding: 18px;
      width: 100%;
      text-align: left;
      border: none;
      outline: none;
      transition: 0.4s;
    }
    .active, .accordion:hover {
      background-color: #ccc;
    }
   .panel {
      padding: 0 18px;
      background-color: white;
      display: none;
      overflow: hidden;
  }
  .panel--scroll {
      padding: 0 18px;
      background-color: white;
      display: none;
      overflow: hidden;
      width: 300px;
      max-height: 250px;
      overflow-y: scroll;
  }
}
</style>
