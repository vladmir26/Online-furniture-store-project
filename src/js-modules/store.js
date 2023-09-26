import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useCountStore = defineStore('count', {
  state: () => ({
    countVisible: false,
    countAdd: 0,
    isActiveAnimation: false,
  }),
  actions: {
    addCount(value) {
      this.countVisible = true;
      this.countAdd += Number(value);
      localStorage.setItem('count-visible', this.countVisible);
      localStorage.setItem('count-add', this.countAdd);
    },
    addCountLocalStorage() {
      const storedCountVisible = localStorage.getItem('count-visible');
      const storedCountAdd = localStorage.getItem('count-add');
      if (storedCountVisible && storedCountAdd) {
        this.countVisible = true;
        this.countAdd = Number(storedCountAdd);
      }
    },
    animationActive(delay) {
      this.isActiveAnimation = true;
      setTimeout(() => {
        this.isActiveAnimation = false;
      }, delay);
    },
  },
});
