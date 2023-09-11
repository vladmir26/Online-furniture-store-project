<template>
  <section
    class="product-details container js-product-details"
  >
    <div class="product-details__wrapper container__grey-wrapper">
      <div class="product-details__image-inner-wrapper">
        <img
          class="product-details__image"
          src="../img/content-image/image-fourteen.png"
          alt="image-fourteen"
        >
      </div>
      <div class="product-details__description-inner-wrapper">
        <h1 class="product-details__heading">
          The Dandy Chair
        </h1>
        <p class="product-details__price-text">
          £250
        </p>
        <h2 class="product-details__title">
          Product description
        </h2>
        <p
          class="product-details__description-text"
        >
          A timeless design,
          with premium materials features as one of our most popular and iconic pieces.
          The dandy chair is perfect for
          any stylish living space with beech legs and lambskin leather upholstery.
        </p>
        <h2 class="product-details__title">
          Dimensions
        </h2>
        <div class="product-details__table-wrapper">
          <dl class="product-details__table-inner-wrapper">
            <dt class="product-details__title-table">
              Height
            </dt>
            <dd class="product-details__text-table">
              110cm
            </dd>
          </dl>
          <dl class="product-details__table-inner-wrapper">
            <dt class="product-details__title-table">
              Width
            </dt>
            <dd class="product-details__text-table">
              75cm
            </dd>
          </dl>
          <dl class="product-details__table-inner-wrapper">
            <dt class="product-details__title-table">
              Depth
            </dt>
            <dd class="product-details__text-table">
              50cm
            </dd>
          </dl>
        </div>
        <form
          action=""
          method="GET"
        >
          <label
            class="product-details__title-text"
            for="product-quantity"
          >
            Quantitity
          </label>
          <div
            class="product-details__input-wrapper"
          >
            <button
              class="product-details__minus"
              type="button"
              @click="addMinus"
            >
              -
            </button>
            <input
              id="product-quantity"
              class="product-details__input"
              type="number"
              name="product-quantity"
              :value="count"
            >
            <button
              class="product-details__plus"
              type="button"
              @click="addPlus"
            >
              +
            </button>
          </div>
          <div
            class="product-details__button-wrapper"
          >
            <button
              class="product-details__button"
              type="submit"
              @click.prevent="addCart(), activeAnimation()"
            >
              Add to cart
            </button>
            <div
              class="product-details__button-link-wrapper"
            >
              <a
                class="product-details__button-link"
                href="#"
              >
                Save to favorites
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="product-details__modal">
      <div class="product-details__modal-content">
        <p class="product-details__modal-text">
          All products added to cart
        </p>
        <div class="product-details__modal-wrapper">
          <a
            class="product-details-modal-link"
            href="#"
          >
            <button class="product-details__modal-button-link">
              Go to cart
            </button>
          </a>
          <button class="product-details__modal-button">
            Stay on this page
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useCountStore } from './store';

export default {
  data() {
    return {
      count: 1,
      isModalActive: false,
    };
  },
  computed: {
    limitedCounter() {
      return Math.max(this.count, 1);
    },
  },
  methods: {
    addPlus() {
      this.count += 1;
    },
    addMinus() {
      this.count -= 1;
      this.count = this.limitedCounter;
    },
    addCart() {
      const countStore = useCountStore();
      countStore.addCount(this.count);
    },
    activeAnimation() {
      const store = useCountStore();
      store.animationActive('6000');
    },
  },
};
</script>

<style lang="scss">
@import "../styles/components/variables.scss";

.product-details {
  &__modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
  }

  &__modal-content {
    width: 100%;
    max-width: 800px;
    padding: 20px;
    margin: auto;
    margin-top: 20%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: $background-third;
    border: 1px solid #888;
    transform: translateY(-50%);
  }

  &__modal-text {
    text-align: center;
  }

  &__modal-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  &__modal-button-link {
    width: 120px;
    height: 50px;
    margin-right: 16px;
    font-family: $font-secondary;
    color: $color-primary;
    background-color: $background-primary;
  }

  &__modal-button {
    width: 155px;
    height: 50px;
    font-family: $font-secondary;
    color: $background-primary;
    background-color: $color-primary;
  }

  .js-modal-active {
  z-index: 4;
}

.js-modal-active-animation {
  animation: modalFadeIn 0.5s ease forwards;
}

@keyframes modalFadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
}
</style>
