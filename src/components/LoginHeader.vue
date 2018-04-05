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
                <li>
                  <a>
                    <router-link :to="{name: 'About'}">About</router-link>
                  </a>
                </li>
                <li>
                  <a>
                    <router-link :to="{name: 'Login'}">Login</router-link>
                  </a>
                </li>
                <li>

                    <router-link :to="{name: 'Register'}">
                      <a> Sign Up</a>
                    </router-link>

                </li>
                <li>

                    <router-link :to="{path:'/'}">
                      <a class="btn btn-fill" style="padding: 2px;margin-bottom: 2px;"> Are you a professional?</a>
                    </router-link>

                </li>
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
      reloadPage() {
        window.location.reload()
      },
      logout: function (e) {
        e.preventDefault()
        const confirm = window.confirm("Are you sure you want to logout ?")
        if (confirm) {
          this.$store.dispatch('auth/logout')
          this.flash("You are now logged out", 'info', {
            timeout: 1000,
          })
          this.$router.push('/')
        }
      }
    },
    computed: {
      ...mapGetters({
        cartItems: 'getCartItems',
        totalItems: 'getCartItemQuantityCount',
        loggedIn: 'auth/getIsLoggedIn',
      })
    },

  }
</script>
