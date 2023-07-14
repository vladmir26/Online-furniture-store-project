<template>
  <aside
    id="catalog"
    class="filters"
  >
    <div class="filters__wrapper">
      <h2 class="visially-hidden">
        Filters
      </h2>
      <div class="filters__button-wrapper">
        <button
          class="filters__button-first"
          @click="appearanceAcordion"
        >
          Filters
        </button>
        <select
          v-model="sorting"
          class="filters__button-second"
          name="sorting"
        >
          <option value="popular">
            Popular
          </option>
          <option value="cheap">
            Cheapest first
          </option>
          <option value="expensive">
            Expensive first
          </option>
        </select>
      </div>
      <div
        :class="{ 'filters__accordion-wrapper': true,
                  'active-accordion': isFiltersAccordionHidden }"
      >
        <h3 class="filters__title">
          <button
            :class="{ 'accordion': true, 'active': filtersAccordionStatus.categories }"
            @click="filtersAccordion"
          >
            Categories
          </button>
        </h3>
        <ul
          :class="{'panel filters__list-categories': true,
                   'active': filtersAccordionStatus.categories,
                   'filters__list-categories--scroll panel--scroll': isCategoriesScrollHidden,
          }"
        >
          <li
            v-for="item in categories"
            :key="item"
            class="filters__item"
          >
            <input
              :id="item"
              class="filters__checkbox"
              type="checkbox"
              name="categories"
              :value="item"
              @change="filterItems"
            >
            <label
              class="filters__label"
              :for="item"
            >{{ item.charAt(0).toUpperCase() + item.slice(1) }}</label>
          </li>
        </ul>
        <h3 class="filters__title">
          <button
            :class="{ 'accordion': true, 'active': filtersAccordionStatus.price }"
            @click="filtersAccordion"
          >
            Price
          </button>
        </h3>
        <ul :class="{ 'panel filters__list': true, 'active': filtersAccordionStatus.price }">
          <li
            v-for="item in priceRange"
            :key="item"
            class="filters__item"
          >
            <input
              :id="item.id"
              class="filters__checkbox"
              type="checkbox"
              name="price"
              :value="item.id"
              @change="filterItems"
            >
            <label
              class="filters__label"
              :for="item.id"
            >{{ item.name }}</label>
          </li>
        </ul>
        <h3 class="filters__title">
          <button
            :class="{ 'accordion': true, 'active': filtersAccordionStatus.brands }"
            @click="filtersAccordion"
          >
            Brands
          </button>
        </h3>
        <ul
          :class="{
            'panel panel--scroll filters__list--scroll': true,
            'active': filtersAccordionStatus.brands
          }"
        >
          <li
            v-for="item in brands"
            :key="item"
            class="filters__item"
          >
            <input
              :id="item"
              class="filters__checkbox"
              type="checkbox"
              name="brands"
              :value="item"
              @change="filterItems"
            >
            <label
              class="filters__label"
              :for="item"
            >{{ item }}</label>
          </li>
        </ul>
      </div>
    </div>
  </aside>
  <section class="products-catalog">
    <h2 class="visially-hidden">
      Products catalog
    </h2>
    <ul class="products-catalog__list">
      <li
        v-for="item in productsSorted"
        :key="item"
        class="products-catalog__item"
      >
        <a
          class="products-catalog__link"
          href="#"
        >
          <img
            class="products-catalog__image"
            :src="item.images[0]"
            alt="image-first"
          >
          <h3 class="products-catalog__title">{{ item.title }}</h3>
          <p class="products-catalog__text">£{{ item.price }}</p>
        </a>
      </li>
    </ul>
    <div
      v-show="!filters.length && !isLoadMoreHidden"
      class="products-catalog__button-link-wrapper"
    >
      <a
        class="products-catalog__button-link"
        href="#"
        @click.prevent="loadingProducts"
      >Load more</a>
    </div>
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
      isLoadMoreHidden: false,
      isFiltersAccordionHidden: false,
      isCategoriesScrollHidden: false,
      filtersAccordionStatus: {
        categories: false,
        price: false,
        brands: false,
      },
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
      }
      const resArr = [];
      this.products.forEach((item) => {
        this.filters.forEach((filter) => {
          if (typeof filter === 'string' && (filter === item.brand || filter === item.category) && !resArr.includes(item)) {
            resArr.push(item);
          }
          if (typeof filter !== 'string' && ((item.price >= filter.minValue && item.price <= filter.maxValue) && !resArr.includes(item))) {
            resArr.push(item);
          }
        });
      });

      return resArr;
    },
    productsSorted() {
      const sorted = [...this.productsfiltered];
      if (this.sorting === 'popular') {
        return this.productsfiltered;
      }

      if (this.sorting === 'cheap') {
        return sorted.sort((a, b) => a.price - b.price);
      }

      if (this.sorting === 'expensive') {
        return sorted.sort((a, b) => b.price - a.price);
      }
      return false;
    },
  },
  created() {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((res) => {
        this.products = res.products;
        console.log(res);
        this.createFilters();
      })
      .catch(console.log);
  },
  methods: {
    appearanceAcordion() {
      this.isFiltersAccordionHidden = !this.isFiltersAccordionHidden;
    },
    filtersAccordion(event) {
      const filterName = event.target.innerText.toLowerCase();
      this.filtersAccordionStatus[filterName] = !this.filtersAccordionStatus[filterName];
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
    loadingProducts() {
      fetch(`https://dummyjson.com/products?limit=${this.limit}&skip=${this.counter * this.limit}`)
        .then((res) => res.json())
        .then((res) => {
          this.counter += 1;
          this.products = this.products.concat(res.products);
          this.createFilters();
          this.isCategoriesScrollHidden = true;
          if (res.limit < this.limit) {
            this.isLoadMoreHidden = true;
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

  &__accordion-wrapper {
    margin-bottom: 50px;
  }

  &__list--scroll {
    width: 270px;
    max-height: 250px;
    overflow-y: scroll;
  }

  &__list-categories {
    margin-bottom: 48px;
    max-height: 130px;
  }

  &__list-categories--scroll {
    overflow-y: scroll;
  }

  &__button-first {
    display: none;
  }

  &__button-wrapper {
    display: block;
  }

  &__button-second {
    position: relative;
    width: 120px;
    height: 40px;
    margin-bottom: 20px;
    font-family: $font-secondary;
    font-size: 14px;
    color: $background-primary;
    background-color: $background-third;
    border-width: 0;
    appearance: none;
    text-align: center;
  }

  &__button-second:not([multiple]) {
    padding-right: 5px;
    background-repeat: no-repeat;
    background-position: 105px 16px;
    background-size: 10px 10px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cpath d='M70.3 13.8L40 66.3 9.7 13.8z' fill='%23000'%3E%3C/path%3E%3C/svg%3E");
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

  &__checkbox:checked+&__label::after {
    opacity: 1;
  }

  &__checkbox:checked+&__label::before {
    background-color: #4e4d93;
    opacity: 1;
  }
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

.products-catalog__list {
  margin-bottom: 45px;
}

.accordion {
  color: #2a254b;
  font-family: $font-primary;
  cursor: default;
}

@media screen and (max-width: 767px) {
  .filters {
    &__accordion-wrapper {
      display: none;
      margin-right: 50px;
    }

    &__button-wrapper {
      display: block;
      margin-right: auto;
      margin-left: auto;
    }

    &__button-first {
      display: inline-block;
    }

    &__sorting {
      display: block;
      margin-top: 20px;
    }
  }

  .accordion {
    background-color: #eee;
    color: #2a254b;
    font-family: $font-primary;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.4s;
  }

  .accordion--brands {
    padding-top: 20px;
  }

  .active-accordion {
    display: block;
  }

  .active,
  .accordion:hover {
    background-color: #ccc;
  }

  .panel {
    padding: 0 18px 20px;
    background-color: white;
    display: none;
    overflow: hidden;

    &.active {
      display: block;
    }
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
