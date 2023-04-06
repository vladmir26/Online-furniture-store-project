<template>
    
</template>

<script>
import { onMounted } from 'vue';

export default {
    data() {
        return {
          products: []
          
        },
        onMounted(() => {
            
         let response  = fetch('https://dummyjson.com/products')
          .then(res => res.text())

          for (let key in response) {
            console.log(response[key])



          }

        
        })
    }
}
</script>