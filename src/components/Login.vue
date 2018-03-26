<template>
  <div>
    <jenga-pro-login-header></jenga-pro-login-header>
    <div class="container" style="margin-top: 50px; margin-bottom: 50px;">
      <div class="row" style="background: transparent">
        <div class="col-lg-8 col-md-8 col-xs-8 col-md-push-2">
          <div class="panel panel-info">
            <h6 class="panel-heading" style="margin-top:0px;" v-if="!loading">Login Here</h6>
            <h6 class="panel-heading" style="margin-top:0px; align-content: center;" v-if="loading">Authenticating...</h6>
            <div class="panel-body" v-if="loading">
              <div class="loader"></div>
            </div>
            <div class="panel-body" v-if="!loading">
              <div id="errors" v-if="errors">
                <ul class="list-group">
                  <li class="list-group-item alert-danger" v-for="error in errors">{{error}}</li>
                </ul>
              </div>
              <flash-message></flash-message>

              <form class="form-group" @submit.prevent="validateForm">
                <div class="form-group">
                  <label for="username" class="sr-only">Username</label>
                  <input type="text" id="username" class="form-control" v-model="username" placeholder="Enter Your Email or Username">
                </div>
                <div class="form-group">
                  <label for="password" class="sr-only">Password</label>
                  <input type="password" id="password" class="form-control" v-model="password"
                         placeholder="Enter Your Password">
                </div>
                <div>
                  <button type="submit" class="btn btn-default pull-left" @click="doLogin">Login</button>
                  <span class="pull-right"><a href="#">Forgot Password</a></span>
                </div>
              </form>
            </div>
            <div class="row" v-if="!loading">
              <div class="container-fluid">
                <div class="panel-footer">
                  <router-link :to="{name: 'Register'}">
                    <a href="#"> Don't have an account ?</a>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import JengaProLoginHeader from "./LoginHeader.vue";
  import {mapGetters} from 'vuex'

  export default {
    components: {
      JengaProLoginHeader,
    },
    name: "JengaProLogin",

    data() {
      return {
        username: '',
        password: '',
        errors: []
      }
    },

    computed: {
      ...mapGetters({
        loading: 'auth/getLoading',
        isLoggedIn: 'auth/getIsLoggedIn',
        error: 'auth/getError',
        successMsg: 'auth/getSuccessMsg'
      }),
    },

    methods: {
      validateForm: function () {
        if (this.username && this.password) return true;
        this.errors = [];
        if (!this.username) this.errors.push("Email cannot be blank")
        if (!this.password) this.errors.push("Password cannot be blank")
      },

//      checkLoggedIn(){
//        if (this.isLoggedIn){
//          this.$router.push('/')
//        }
//      },

      doLogin() {
        if (this.validateForm()) {
          const credentials = {
            username: this.username,
            password: this.password
          };

          this.$store.dispatch('auth/login', credentials)
        }
      },

    },
    watch: {
      successMsg(newVal, oldVal) {

        if (newVal !== null) {
          this.flash(newVal, 'success', {
            timeout: 1000,
            important: true
          });

          const vm = this;
          window.setTimeout(function () {
            vm.$router.push('/')
          }, 1000)
        }

      },

      error(newVal, oldVal) {
        if (newVal !== null) {
          this.flash(newVal, 'error', {
            timeout: 3000,
          });

        }
      }

    },


  }
</script>
