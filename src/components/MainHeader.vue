<template>
  <header id="xt-home" class="xt-header">
    <div class="main-navigation">
      <nav class="navbar navbar-fixed-top nav-scroll">
        <div class="container">
          <div class="row">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span aria-hidden="true" class="icon"></span>
              </button>
              <a class="navbar-brand" href="#"><img src="/static/images/flogo.png" alt=""
                                                             class="img-responsive"></a>
            </div>

            <div class="collapse navbar-collapse" id="js-navbar-menu">
              <div class="col-md-6 col-md-offset-3">
                <flash-message></flash-message>
              </div>
              <ul class="nav navbar-nav navbar-right ep-mobile-menu" id="navbar-nav">
                <li class="active" @click="reloadPage">
                  <a href="#">
                    <router-link to="/">Home</router-link>
                  </a></li>
                <li @click="reloadPage">
                  <a href="#">
                    <router-link to="/professionals">Professionals</router-link>
                  </a>
                </li>

                <li v-if="isLoggedIn">
                  <a>
                    <router-link :to="{name: 'Contracts'}">My Contracts</router-link>
                  </a>
                </li>

                <li>
                  <a>
                  <router-link :to="{name: 'About'}">About</router-link>
                </a>
                </li>
                <li class="dropdown xt-drop-nav">
                  <a href="" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">
                    Services <span class="caret"></span>
                  </a>
                  <ul class="dropdown-menu">
                    <li><a href="#">Power Connection</a></li>
                    <li><a href="#">Water Connection</a></li>
                    <li><a href="#">Request Building Plan</a></li>
                    <li><a href="#">Approval</a></li>
                    <li><a href="#">Certification</a></li>
                  </ul>
                </li>
                <li><a href="">Blog</a></li>
                <li>
                  <a>
                    <router-link :to="{name: 'Contact'}">Contact</router-link>
                  </a>
                </li>
                <li v-if="isLoggedIn" v-on:click="logout">
                  <a>
                   Logout
                  </a>
                </li>
                <li v-if="!isLoggedIn">
                  <a>
                    <router-link :to="{name: 'Login'}">Login</router-link>
                  </a>
                </li>
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
              <input type="text" class="form-control" placeholder="Search for products here"/>
            </div>
            <div class="form-group xt-form xt-search-cat col-md-4 col-sm-4 col-xs-5 padding-left-o ">
              <div class="xt-select xt-search-opt">
                <select class="xt-dropdown-search select-beast">
                  <option>All Categories</option>
                  <option>Sand</option>
                  <option>Building Stones</option>
                  <option>Ballast</option>
                  <option>Tiles</option>
                  <option>Roofing Materials</option>
                  <option>Metal</option>
                  <option>Timber</option>
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
  import  {mapGetters} from 'vuex'

  export default {
    components: {
      ProductCategory,
      ShoppingCart
    },
    name: "JengaProMainHeader",

    computed: {
      ...mapGetters({
        isLoggedIn: 'auth/getIsLoggedIn',
        token: 'auth/getAuthToken',
        cartItems: 'getCartItems'
      })
    },

    methods: {
      reloadPage: function(){
        window.location.reload()
      },

      logout: function (e) {
        e.preventDefault()
       const confirm =  window.confirm("Are you sure you want to logout ?")
        if (confirm){
          this.$store.dispatch('auth/logout')
          this.flash("You are now logged out", 'info', {
            timeout: 1000,
          })
          this.$router.push('/')
        }
      }
    },





  }
</script>
