<template>
  <div>

  <product-list></product-list>
  </div>
</template>

<script>
  import ProductList from "./ProductList.vue";
  import JengaProMainHeader from "./MainHeader.vue";
  import {mapGetters} from 'vuex'

export default {
  components: {
    JengaProMainHeader,
    ProductList,
    },
  name: 'Home',

  methods: {
    ...mapGetters({
      regions: 'getOperatingRegions'
    }),
    reloadPage(){
      window.location.reload()
    },
  },
  created(){

    this.$store.dispatch('fetchOperationalRegions')
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

