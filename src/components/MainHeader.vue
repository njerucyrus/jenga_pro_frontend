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
                    <li><a href="">France</a></li>
                    <li><a href="causes-list.html">Bangla</a></li>
                    <li><a href="causes-details.html">Swidesh</a></li>
                  </ul>
                </li>
                <li class="dropdown">
                  <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                     aria-expanded="false">USD <span class="fa fa-angle-down"></span> </a>
                  <ul class="dropdown-menu xt-lang-dropdown">
                    <li><a href="">USD</a></li>
                    <li><a href="causes-list.html">EURO</a></li>
                    <li><a href="causes-details.html">Riyal</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div class="user-nav pull-right col-md-6 col-sm-6 col-xs-12">
            <ul>
              <li><a href="">My wishlist</a></li>
              <li><a href="">Checkout</a></li>
              <li>
                <router-link :to="{name:'Login'}">
                  <a href="">login</a>
                </router-link>

              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="main-navigation">
      <nav class="navbar navbar-fixed-top nav-scroll">
        <div class="container">
          <div class="row">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span aria-hidden="true" class="icon"></span>
              </button>
              <a class="navbar-brand" href="index.html"><img src="static/images/flogo.png" alt=""
                                                             class="img-responsive"></a>
            </div>

            <div class="collapse navbar-collapse" id="js-navbar-menu">
              <div class="col-md-6 col-md-offset-3">
                <flash-message></flash-message>
              </div>
              <ul class="nav navbar-nav navbar-right ep-mobile-menu" id="navbar-nav">
                <li class="active" @click="reloadPage">
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
                <li><a href="contact-us.html">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <!--Mobile Menu-->
    <div class="main-color-bg">
      <div class="container">
        <div class="row">
          <div class="col-md-3 left-menu-wrapper">
            <div class="xt-sidenav hidden-xs hidden-sm">
              <nav>
                <product-category></product-category>
              </nav>
            </div>
          </div>

          <div class="col-md-8 col-sm-10 col-xs-12 xt-header-search">
            <div class="form-group xt-form search-bar  col-md-8 col-sm-8 col-xs-7 padding-right-o">
              <input type="text" class="form-control" placeholder="Search for snippets"/>
            </div>
            <div class="form-group xt-form xt-search-cat col-md-4 col-sm-4 col-xs-5 padding-left-o ">
              <div class="xt-select xt-search-opt">
                <select class="xt-dropdown-search select-beast">
                  <option>All Categories</option>
                  <option>Boutique</option>
                  <option>Shirt</option>
                  <option>Pants</option>
                  <option>Jeans</option>
                  <option>Bourkha</option>
                  <option>Hijab</option>
                  <option>T-Shirt</option>
                  <option>Coats</option>
                  <option>Blezzar</option>
                  <option>Gilets</option>
                  <option>3 Piece</option>
                  <option>Cosmetic</option>
                </select>
              </div>
              <div class="xt-search-opt xt-search-btn">
                <button type="button" class="btn btn-primary btn-search"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>
          <div class="col-md-1 col-sm-2 col-xs-2">
            <shopping-cart></shopping-cart>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
  import ShoppingCart from "./ShoppingCart.vue";
  import ProductCategory from "./ProductCategory.vue";

  export default {
    components: {
      ProductCategory,
      ShoppingCart
    },
    name: "JengaProMainHeader",

    methods: {
      reloadPage() {
        window.location.reload()
      }
    }

  }
</script>
