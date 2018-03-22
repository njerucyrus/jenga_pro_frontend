<template>
  <div>
    <jenga-pro-main-header></jenga-pro-main-header>
    <section class="xt-xt-single-product" style="margin-top: 15px; margin-bottom: 25px;">
      <div class="container container-fluid">
        <div class="col-md-9 col-md-offset-0 col-md-push-3">
          <div class="table-responsive">
            <table class="table table-responsive">
              <thead>
              <th colspan="4">Cart Details <span class="pull-right">
                <router-link :to="{path: '/'}">
                <a href="#" class="btn btn-default" style="margin-bottom: 15px">Continue Shopping</a>
                </router-link>
              </span>
              </th>
              <tr style="font-weight: bold">
                <td>ITEM</td>
                <td>QUANTITY</td>
                <td>UNIT PRICE</td>
                <td>SUBTOTAL</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in cartItems">
                <td>
                  <div class="panel-body">
                    <img :src="item.img_url" class="thumbnail" v-if="item.img_url" height="100" width="100"
                         alt="Jenga Pro Cart Image">
                    <img src="static/images/no_image.png" class="thumbnail" height="100" width="100"
                         v-else="!item.img_url" alt="Jenga Pro Cart Image">
                    <span>{{item.name}}</span>
                  </div>
                </td>
                <td>
                  <input type="text" v-bind="{value: item.quantity}" class="form-control" style="width: 55px" disabled/>
                </td>
                <td>
                  <span>Ksh {{item.price}}</span>
                </td>
                <td>
                  <span>Ksh {{item.sub_total}}</span>
                  <br><br>
                  <button class="btn btn-xs btn-fill" @click="removeItem({id:item.id})">Remove</button>

                </td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <div>
                    <span style="font-weight: bolder">Total: Ksh {{cartTotal}}.00</span>
                    <br>
                    <div style="margin-top: 10px">
                    <button class="btn btn-fill">Checkout now</button>
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
  import JengaProMainHeader from "./MainHeader.vue";
  import {mapGetters} from 'vuex'

  export default {
    components: {JengaProMainHeader},

    name: "JengaProCartDetailView",

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
      }


    },

    watch: {
      cartCount(newCount, oldCount) {
        if (newCount > oldCount) {
          this.flash('Item Added to the cart', 'success', {
            timeout: 3000,
          });
        } else if (newCount < oldCount) {
          this.flash('Item Removed', 'info', {
            timeout: 3000,
          });
        }

      },
      cartQuantityCount(newCount, oldCount) {

        if (newCount && oldCount >0) {
          this.flash('item quantity updated ', 'success', {
            timeout: 3000,
          });

        }
      }
    }

  }
</script>
