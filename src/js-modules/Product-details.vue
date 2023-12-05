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
        <form>
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
              type="button"
              @click.prevent="addCart()"
            >
              Add to cart
            </button>
            <div
              class="product-details__button-link-wrapper"
            >
              <button
                class="product-details__button-link"
                type="button"
              >
                Save to favorites
              </button>
            </div>
          </div>
        </form>
        <dialog id="dialogBox">
          <section>
            <p>All products added to cart</p>
          </section>
          <footer>
            <a
              class="primary"
              href="/cart"
            >
              Go to cart
            </a>
            <button
              type="button"
              class="secondary"
              @click="closeDialog()"
            >
              Stay on this page
            </button>
          </footer>
        </dialog>
      </div>
    </div>
  </section>
</template>

<script>
import { mapStores } from 'pinia';
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
    ...mapStores(useCountStore),
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
      const dialogBoxId = document.getElementById('dialogBox');
      dialogBoxId.showModal();
      this.countStore.addCount(this.count);
      this.countStore.animationActive('6000');
    },
    closeDialog() {
      const dialogBoxId = document.getElementById('dialogBox');
      dialogBoxId.close();
    },
  },
};
HTMLDialogElement.prototype.triggerShow = HTMLDialogElement.prototype.showModal;
// eslint-disable-next-line func-names
HTMLDialogElement.prototype.showModal = function () {
  this.triggerShow();
  // eslint-disable-next-line consistent-return
  this.onclick = (event) => {
    const rect = this.getBoundingClientRect();
    if (event.clientY < rect.top || event.clientY > rect.bottom) return this.close();
    if (event.clientX < rect.left || event.clientX > rect.right) return this.close();
  };
};
</script>

<style lang="scss">
@import "../styles/components/variables.scss";

html:has(dialog[open]:modal) {
  overflow: hidden;
}

#dialogBox {
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

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  section {
    text-align: center;
  }

  footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .primary {
    padding: 1rem 2rem;
    margin-right: 16px;
    font-family: 'Satoshi';
    color: #fff;
    background-color: #2a254b;
  }

  .secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 178px;
    height: 56px;
    font-family: 'Satoshi';
    opacity: 1;
  }
}
</style>
