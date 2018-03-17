<template>
  <div class="xt-cart">
    <ul>
      <li class="dropdown">
        <a href="" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">
          <i class="fa flaticon-shopping-cart"></i>
        </a>
        <ul class="dropdown-menu xt-cart-items">
          <li>
            <a href="">
              <img src="static/images/4.jpg" alt="">
              <h3>Lipstick</h3>
              <span class="cart-price"></span>
            </a>
          </li>
          <li>
            <a href="">
              <img src="static/images/1.jpg" alt="">
              <h3>T-Shirt</h3>
              <span class="cart-price">$499 </span>
            </a>
          </li>
          <li>
            <a href="">
              <img src="static/images/3.jpg" alt="">
              <h3>Shirt</h3>
              <span class="cart-price">$399</span>
            </a>
          </li>
          <li>
            <a href="" class="subtotal top-checkout">
              <h3>Subtotal : </h3>
              <span class="total-price">$999</span>
            </a>
          </li>
          <li>
            <a href="" class="process top-checkout">
              <h3 >Process to Checkout </h3>

            </a>
          </li>
        </ul>
      </li>
    </ul>
    <span class="xt-item-count">8</span>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "ShoppingCart",
    computed: {
      cartItems(){
        return this.$store.getters.getCartItems;
      }

    }
  }
</script>
