import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useCountStore = defineStore('CountStore', {
  state: () => ({
    countVisible: false,
    countAdd: 0,
  }),
  actions: {
    addCount(value) {
      this.countVisible = true;
      this.countAdd += Number(value);
    },

  },
});
