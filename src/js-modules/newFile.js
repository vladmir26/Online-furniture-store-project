import { mapStores } from 'pinia';
import { useCountStore } from './store';

export default (await import('vue')).defineComponent({
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
document.getElementById('dialog').addEventListener('click', ((event) => {
const rect = event.target.getBoundingClientRect();
console.log(
`
            ClientX: ${event.clientX},
            rect.left: ${rect.left},
            rect.right: ${rect.right},

            ClientY: ${event.clientY},
            rect.top: ${rect.left},
            rect.bottom: ${rect.bottom},
          `
);
if (rect.left > event.clientX
|| rect.right < event.clientX || rect.top > event.clientY || rect.bottom < event.clientY) {
window.dialog.close();
}
})
),
            ;
}
},
});
