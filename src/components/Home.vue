<template>
 <slider></slider>
</template>

<script>

  import ProductList from "./ProductList.vue";
  import Slider from "./Slider.vue";
export default {
  components: {
    Slider,
    ProductList,
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

