<template>
  <div>
    <jenga-pro-login-header></jenga-pro-login-header>
    <div class="container container-fluid" style="margin-top: 50px; margin-bottom: 50px;">
      <div class="row">
        <div class="col-lg-8 col-md-8 col-xs-8 col-md-offset-2 ">
          <div class="panel panel-info">
            <h6 class="panel-heading" style="margin-top:0px;">Register Here</h6>
            <div class="panel-body">
              <div id="flash-message">
                <flash-message></flash-message>
              </div>
              <div id="errors">
                <ul class="list-group">
                  <li v-if="errors" class="list-group-item alert-danger" v-for="error in errors">{{error}}</li>
                </ul>
              </div>
              <form @submit.prevent="validateForm">
                <div class="row">
                  <div class="col col-md-12">
                    <div class="col col-md-6">
                      <input type="text" class="form-control" v-model="firstName" placeholder="First Name"/>

                    </div>
                    <div class="col col-md-6">
                      <input type="text" class="form-control" v-model="lastName" placeholder="Last Name"/>
                    </div>
                  </div>
                </div>

                <div class="row" style="margin-top: 5px;">
                  <div class="col col-md-12">
                    <div class="col col-md-6">
                      <input type="email" class="form-control" v-model="email" placeholder="Email"/>
                      <span v-if="available && email !== ''" class="alert-success"
                            style="padding: 2px; margin: 2px;">Email is available</span>
                      <span v-else-if="!available && email !== ''" class="alert-danger"
                            style="padding: 2px; margin: 2px;">Account already taken</span>

                    </div>
                    <div class="col col-md-6">
                      <input type="text" class="form-control" v-model="phoneNumber" placeholder="Phone Number"/>
                    </div>
                  </div>
                </div>

                <div class="row" style="margin-top: 5px;">
                  <div class="col col-md-12">
                    <div class="col col-md-6">
                      <input type="password" class="form-control" v-model="password" placeholder="Password"/>
                    </div>
                    <div class="col col-md-6">
                      <input type="password" class="form-control" v-model="confirmPassword"
                             placeholder="Confirm Password"/>
                    </div>
                  </div>
                </div>
                <div class="row" style="margin-top: 5px;">
                  <div class="col col-md-12">
                    <div class="col-md-12">
                      <select v-model="accountType" class="form-control">
                        <option value="customer">Select Account Type</option>
                        <option value="Customer">Customer</option>
                        <option value="Foreman">Foreman</option>
                      </select>

                    </div>
                  </div>
                </div>

                <div class="row" style="margin-top: 15px;">
                  <div class="col-md-12">
                    <div class="col-md-12">
                      <button class="btn btn-default pull-left" @click="createAccount">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="row">
              <div class="container-fluid">
                <div class="panel-footer">
                  <a href="#"> Already have an account ?</a>
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
    components: {JengaProLoginHeader},
    name: "JengaProRegister",
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        accountType: 'Customer',
        available: true,
        errors: [],

      }
    },
    created() {
      this.$store.dispatch('accounts/fetchUsers')
    },

    computed: {
      ...mapGetters({
        users: 'accounts/getUsers',
        loading: 'accounts/getLoading',
        error: 'accounts/getError',
        successMsg: 'accounts/getSuccessMsg',
      }),

    },
    methods: {
      validateForm: function (e) {
        if (this.firstName && this.lastName && this.email && this.phoneNumber && this.password === this.confirmPassword) return true
        this.errors = []
        if (!this.firstName) this.errors.push("First Name is required")
        if (!this.lastName) this.errors.push("Last Name is required")
        if (!this.email) this.errors.push("Email is required")
        if (!this.phoneNumber) this.errors.push("Phone Number is required")
        if (!this.password && !this.confirmPassword) this.errors.push("Password is required")
        if (this.password !== this.confirmPassword) this.errors.push("Password did not match")

      },
      createAccount: function () {
        if (this.validateForm() && this.available) {
          const accountPayload = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            phone_number: this.phoneNumber,
            username: this.email,
            password: this.password,
            account_type: this.accountType
          };

          this.$store.dispatch('accounts/createAccount', accountPayload)
        }
      }

    },

    watch: {
      email(email) {
        const data = this.users.find(data => data.user.email === email);
        this.available = !data;
      },
      successMsg(newVal, oldVal) {

        if (newVal !== null) {
          this.flash(newVal, 'success', {
            timeout: 1000,
            important: true
          });

          const vm = this;
          window.setTimeout(function () {
            vm.$router.push('/login')
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


    }
  }
</script>
