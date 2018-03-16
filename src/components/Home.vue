<template>
  <product-list></product-list>
</template>

<script>
  import Slider from "./Slider.vue";
  import ProductList from "./ProductList.vue";
export default {
  components: {
    ProductList,
    Slider,
    },
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

