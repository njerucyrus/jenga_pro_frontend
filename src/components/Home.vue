<template>
  <div>
  <product-list></product-list>
  </div>
</template>

<script>
  import ProductList from "./ProductList.vue";
  import JengaProMainHeader from "./MainHeader.vue";
export default {
  components: {
    JengaProMainHeader,
    ProductList,
    },
  name: 'Home',

  methods: {
    reloadPage(){
      window.location.reload()
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

