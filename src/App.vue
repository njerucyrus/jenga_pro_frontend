<template>
  <div id="app">

    <router-view/>

    <jenga-pro-footer></jenga-pro-footer>
  </div>
</template>

<script>

  import JengaProFooter from "./components/Footer.vue";

  export default {
    components: {
      JengaProFooter,

    },
    name: 'App',
    methods: {
      reloadPage(){
        window.location.reload()
      }
    }

  }
</script>



