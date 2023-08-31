<template>
  <section
    id="product"
    class="product-details container js-product-details"
  >
    <div class="product-details__wrapper container__grey-wrapper">
      <div class="product-details__image-inner-wrapper">
        <img
          class="product-details__image"
          src="../../images/content-image/image-fourteen.png"
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
            >
              -
            </button>
            <input
              id="product-quantity"
              class="product-details__input"
              type="number"
              name="product-quantity"
              value="1"
            >
            <button
              class="product-details__plus"
              type="button"
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
  </section>
</template>
