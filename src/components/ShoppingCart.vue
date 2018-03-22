<template>
  <div class="xt-cart">

    <ul>
      <li class="dropdown">
        <a href="" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">
          <i class="fa flaticon-shopping-cart"></i>
        </a>
        <ul class="dropdown-menu xt-cart-items">
          <li v-for="product in cartItems">
            <a>
              <img :src="product.img_url" v-if="product.img_url" alt="Jenga Pro Cart Image">
              <img src="static/images/no_image.png" v-else="!product.img_url" alt="Jenga Pro Cart Image">
              <h3>{{product.name}}</h3>
              <span class="cart-price">Ksh {{product.price}} ||<span>Qty {{ product.quantity }}</span></span>
              <br>
            </a>


          </li>


          <li>
            <a href="#" class="subtotal top-checkout">
              <h3>TOTAL COST </h3>
              <span class="total-price">Ksh {{ cartTotal }} </span>
            </a>
          </li>
          <li>
            <a href="#" class="process top-checkout" @click="goToCartDetail">

              <h3>Proceed to Checkout</h3>
            </a>

          </li>
        </ul>
      </li>
    </ul>
    <span class="xt-item-count">{{totalItems}}</span>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "ShoppingCart",

    computed: {
      ...mapGetters({
        cartItems: 'getCartItems',
        cartTotal: 'getCartTotalPrice',
        totalItems: 'totalItems'

      })
      ,
    },
    methods: {
      goToCartDetail(){
        this.$router.push('/cart-detail')
      }
    }


  }
</script>
