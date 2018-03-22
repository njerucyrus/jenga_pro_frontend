<template>
  <header id="xt-home" class="xt-header">
    <div class="header-top">
      <div class="container">
        <div class="row">
          <div class="xt-language col-md-6 col-sm-6 col-xs-12">
            <div class="each-nav">
              <ul>
                <li class="dropdown">
                  <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                     aria-expanded="false">English <span class="fa fa-angle-down"></span> </a>
                  <ul class="dropdown-menu xt-lang-dropdown">
                    <li><a href="#">France</a></li>
                    <li><a href="#">Bangla</a></li>
                    <li><a href="#">Swidesh</a></li>
                  </ul>
                </li>
                <li class="dropdown">
                  <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                     aria-expanded="false">USD <span class="fa fa-angle-down"></span> </a>
                  <ul class="dropdown-menu xt-lang-dropdown">
                    <li><a href="#">USD</a></li>
                    <li><a href="#">EURO</a></li>
                    <li><a href="#">Riyal</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div class="user-nav pull-right col-md-6 col-sm-6 col-xs-12">
            <ul>
              <li><a href="">My wishlist</a></li>
              <li v-if="cartItems">
                <router-link :to="{name: 'CartDetail'}">
                  <a href="">Checkout</a>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="main-navigation">
      <nav class="navbar navbar-fixed-top nav-scroll" style="background-color:rgba(134,143,72,0.18) !important;">
        <div class="container">
          <div class="row">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span aria-hidden="true" class="icon"></span>
              </button>
              <a class="navbar-brand" href="#"><img src="static/images/flogo.png" alt=""
                                                             class="img-responsive"></a>
            </div>

            <div class="collapse navbar-collapse" id="js-navbar-menu">
              <div class="col-md-6 col-md-offset-3">
              </div>
              <ul class="nav navbar-nav navbar-right ep-mobile-menu" id="navbar-nav">
                <li class="active" @click="reloadPage()">
                  <a href="">
                    <router-link to="/">Home</router-link>
                  </a></li>
                <li @click="reloadPage">
                  <a href="#">
                    <router-link to="/products">Shop</router-link>
                  </a>
                </li>
                <li><a href="">About</a></li>
                <li class="dropdown xt-drop-nav">
                  <a href="" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">
                    Services <span class="caret"></span>
                  </a>
                  <ul class="dropdown-menu">
                    <li><a href="#">Find Professionals</a></li>
                    <li><a href="#">Request Service</a></li>
                    <li><a href="#">Get A Building Plan</a></li>
                    <li><a href="#">Order Utility Services</a></li>
                  </ul>
                </li>
                <li><a href="">Blog</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {

    name: 'JengaProLoginHeader',
    methods: {
      reloadPage(){
        window.location.reload()
      }
    },
    computed: {
      ...mapGetters({
        cartItems: 'getCartItems'
      })
    }



  }
</script>
