<template>
  <div>
    <jenga-pro-login-header></jenga-pro-login-header>
    <div class="container container-fluid" style="margin-bottom: 70px;">
      <div class="row">
        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-md-offset-1">
          <form-wizard @on-complete="onComplete" title="Checkout in 3 steps" subtitle="Complete checkout in 3 steps"
                       error-color="#a94442"
                       back-button-text="GO BACK"
                       next-button-text="SAVE AND CONTINUE"
                       finish-button-text="COMPLETE CHECKOUT"
          >
            <tab-content title="Shipping info" icon="ti-truck" :before-change="validateFirstTab">
              <div class="col-md-12">
                <vue-form-generator :model="model"
                                    :schema="firstTabSchema"
                                    :options="formOptions"
                                    ref="firstTabForm">

                </vue-form-generator>
              </div>

            </tab-content>
            <tab-content title="Order Preview" icon="ti-shopping-cart">

              <div class="col-md-12">
                <div class="table-responsive">
                  <table class="table table-responsive">
                    <thead>
                    <tr style="font-weight: bold">
                      <td>ITEM</td>
                      <td>QUANTITY</td>
                      <td>UNIT PRICE</td>
                      <td>SUBTOTAL</td>
                      <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in cartItems">
                      <td>
                        <div>
                          <img :src="item.img_url" class="thumbnail" v-if="item.img_url" height="100" width="100"
                               alt="Jenga Pro Cart Image">
                          <img src="static/images/no_image.png" class="thumbnail" height="100" width="100"
                               v-else="!item.img_url" alt="Jenga Pro Cart Image">
                          <span>{{item.name}}</span>
                        </div>
                      </td>
                      <td>
                        <div class="row">
                          <div class="col-md-6">
                            <div class="col-md-6" style="margin-top: 5px">
                              <span class="pull-left" style="font-weight: bolder">{{item.quantity}}</span>
                            </div>
                            <div class="col-md-6">

                            </div>
                          </div>

                        </div>

                      </td>
                      <td>
                        <span>Ksh {{item.price}}</span>
                      </td>
                      <td>
                        <span>Ksh {{item.sub_total}}</span>
                      </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                      <td>

                      </td>
                      <td></td>
                      <td></td>
                      <td>
                        <div>
                          <span class="pull-right" style="font-weight: bolder">Total: Ksh {{cartTotal}}.00</span>
                          <br>
                          <div style="margin-top: 10px">
                          </div>
                        </div>
                      </td>
                    </tr>

                    </tfoot>
                  </table>
                </div>
              </div>

            </tab-content>
            <tab-content title="Payment" icon="ti-credit-card">
              <div class="col-md-12" v-if="!loading">
                <flash-message></flash-message>
                <h5>Make payment here</h5>
              </div>
              <div class="loader" v-if="loading"></div>

            </tab-content>

          </form-wizard>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'


  import JengaProLoginHeader from "./LoginHeader.vue";
  import JengaProCartDetailView from "./CartDetailView.vue";
  import * as VueFormGenerator from "vue-form-generator";

  export default {
    name: "JengaProCheckoutPage",
    components: {
      JengaProCartDetailView,
      JengaProLoginHeader,
    },

    data() {
      return {
        model: {
          shipping_address: '',
          phone_number: '',
          email: ''

        },

        formOptions: {
          validationErrorClass: "has-error",
          validationSuccessClass: "has-success",
          validateAfterChanged: true
        },

        firstTabSchema: {
          fields: [{
            type: "input",
            inputType: "text",
            label: "Shipping Address (Location)",
            model: "shipping_address",
            required: true,
            validator: VueFormGenerator.validators.string,
            styleClasses: 'col-xs-12'
          },
            {
              type: "input",
              inputType: "text",
              label: "Phone Number",
              model: "phone_number",
              required: true,
              validator: VueFormGenerator.validators.string,
              styleClasses: 'col-xs-12'
            },
            {
              type: "input",
              inputType: "text",
              label: "Email",
              model: "email",
              required: true,
              validator: VueFormGenerator.validators.email,
              styleClasses: 'col-xs-12'
            }
          ]
        },
      }
    },


    computed: {
      ...mapGetters({
        cartItems: 'getCartItems',
        cartTotal: 'getCartTotalPrice',
        totalItems: 'totalItems',
        cartQuantityCount: 'getCartItemQuantityCount',
        cartCount: 'totalItems',
        orderDetails: 'getOrderDetails',
        currentUser: 'auth/getCurrentUser',
        loading: 'getLoading',
        checkoutStatus: 'getCheckoutStatus',

      })
    },

    methods: {

      validateFirstTab: function () {
        return this.$refs.firstTabForm.validate();
      },

      onComplete: function () {
        const orderId = this.orderId(8);
        const payload = {
          shipping: {
            shipping_address: this.model.shipping_address,
            phone_number: this.model.phone_number,
            email: this.model.email
          },
          order: {
            order_id: orderId,
            order_details: this.orderDetails,
            total_cost: this.cartTotal,
            ordered_by: this.currentUser.user.id,
            is_paid: 0,
          }
        };
        this.checkout(payload);
      },

      orderId: function (length) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
      },


      checkout(payload) {
        const confirm = window.confirm("Proceed to checkout ?")
        if (confirm) {
          this.$store.dispatch('checkout', payload);
        }
      },
    },

    watch: {
      checkoutStatus(newValue) {
          if (newValue === 'successful'){
            //show a flash message of success
            this.flash('Checkout completed successfully. We emailed you the invoice check your mail inbox',
              'success', {
              timeout: 1000,
                important: true,
            });
          }else if (newValue === 'failed'){
            this.flash('Checkout failed please try again',
              'success', {
                timeout: 1000,
                important: true,
              });

          }
      }
    }


  }
</script>

<style scoped>
  .loader,
  .loader:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }

  .loader {
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 255, 255, 0.2);
    border-right: 1.1em solid rgba(255, 255, 255, 0.2);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
    border-left: 1.1em solid #e74c3c;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
