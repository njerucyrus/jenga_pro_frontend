<template>
  <div>
    <jenga-pro-login-header></jenga-pro-login-header>
    <section class="xt-xt-single-product" style="margin-top: 15px; margin-bottom: 25px;">
      <div class="container container-fluid">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <flash-message></flash-message>
          <div class="table-responsive">
            <table class="table table-responsive">
              <thead>
              <th colspan="5">Cart Details <span class="pull-right">
                <router-link :to="{path: '/'}">
                <a href="#" class="btn btn-default pull-right" style="margin-bottom: 15px">Continue Shopping</a>
                </router-link>
              </span>
              </th>
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
                        <!--<span class="pull-left" style="font-weight: bolder">{{item.quantity}}</span>-->
                        <input type="number" v-bind="{value: item.quantity}" min="1" class="form-control pull-right" disabled/>
                      </div>
                      <div class="col-md-6">

                      </div>
                    </div>
                    <!--<button v-on:click="updateCartItemQty({id: item.id, quantity: parseInt($event.target.value)})">update qty</button>-->

                  </div>

                </td>
                <td>
                  <span>Ksh {{item.price}}</span>
                </td>
                <td>
                  <span>Ksh {{item.sub_total}}</span>
                </td>
                <td>
                  <button class="btn btn-xs btn-fill pull-left" @click="removeItem({id:item.id})">Remove</button>
                </td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td>
                  <span style="font-weight: bolder">Total Ksh {{ cartTotal }}</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div>
                    <span  class="pull-right" style="font-weight: bolder">Total: Ksh {{cartTotal}}.00</span>
                    <br>
                    <div style="margin-top: 10px">
                      <a class="btn btn-success pull-right"><router-link :to="{name: 'CheckoutPage'}">Checkout now</router-link></a>
                    </div>
                  </div>
                </td>
              </tr>

              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import JengaProLoginHeader from "./LoginHeader.vue";

  export default {
    components: {
      JengaProLoginHeader,
      },

    name: "JengaProCartDetailView",
    data(){
      return {
        itemQty: 1
      }
    },

    computed: {
      ...mapGetters({
        cartItems: 'getCartItems',
        cartTotal: 'getCartTotalPrice',
        totalItems: 'totalItems',
        cartQuantityCount: 'getCartItemQuantityCount',
        cartCount: 'totalItems',

      })
      ,
    },
    methods: {
      removeItem: function (payload) {
        const confirm = window.confirm("Remove item from cart")
        if (confirm){
          this.$store.dispatch('removeFromCart', payload)
        }
      },


    },

    watch: {
      cartCount(newCount, oldCount) {
        if (newCount > oldCount) {
          this.flash('Item Added to the cart', 'success', {
            timeout: 1000,
          });
        } else if (newCount < oldCount) {
          this.flash('Item Removed', 'info', {
            timeout: 1000,
          });
        }

      },
      cartQuantityCount(newCount, oldCount) {

        if (newCount && oldCount >0) {
          this.flash('item quantity updated ', 'success', {
            timeout: 1000,
          });

        }
      }
    },


  }
</script>
