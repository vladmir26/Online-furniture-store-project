import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useCountStore = defineStore('CountStore', {
  state: () => ({
    countVisible: false,
    count: 1,
  }),
  actions: {
    addCount() {
      this.countVisible = true;
    },
    addCountCart(quantity) {
      this.count = quantity;
    },

  },
});
