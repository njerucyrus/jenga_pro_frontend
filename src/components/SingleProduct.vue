<template>
  <div>
    <jenga-pro-main-header></jenga-pro-main-header>
    <section class="xt-xt-single-product">
      <div class="container">
        <div class="row">
          <div class="col-md-3 visible-xs visible-sm padding-right-o"></div>
          <div class="col-md-9 col-md-offset-3 padding-o">
            <div class="xt-product-inner">
              <div class="col-md-5">
                <div role="tabpanel" class="tab-pane active xt-product-tab">
                  <div class="tab-content xt-pro-small-image">
                    <!-- Tab panel-->
                    <div role="tabpanel" id="xt-pro-1" class="tab-pane fade">
                      <a class="grouped_elements" data-fancybox="gallery" href="">
                        <img :src="product.img2" v-if="product.img2" alt="product thumbs">
                        <img src="/static/images/no_image.png" v-else="!product.img2" alt="product thumbs">
                      </a>
                    </div>
                    <div role="tabpanel" id="xt-pro-2" class="tab-pane fade">
                      <a class="grouped_elements" data-fancybox="gallery" href="/static/images/s-2.jpg">
                        <a href="#xt-pro-4" role="tab" data-toggle="tab" aria-expanded="false">
                          <img :src="product.img3" v-if="product.img3" alt="product thumbs">
                          <img src="/static/images/no_image.png" v-else="!product.img3" alt="product thumbs">
                        </a>
                      </a>
                    </div>
                    <div role="tabpanel" id="xt-pro-3" class="tab-pane fade active in">
                      <a class="grouped_elements" data-fancybox="gallery" href="/static/images/s-3.jpg">
                        <img :src="product.img1" v-if="product.img1" alt="product thumbs" height="350" width="300">
                        <img src="/static/images/no_image.png" v-else="!product.img4" height="350" width="300"
                             alt="product thumbs">
                      </a>
                    </div>
                    <div role="tabpanel" id="xt-pro-4" class="tab-pane fade">
                      <a class="grouped_elements" data-fancybox="product.img5" href="product.img5">

                        <img :src="product.img5" v-if="product.img5" alt="product thumbs">
                        <img src="/static/images/no_image.png" v-else="!product.img5" alt="product thumbs">
                      </a>
                    </div>
                  </div>
                  <!-- Nav tabs -->
                  <ul id="tablist" class="xt-pro-thumbs-list" role="tablist">
                    <li role="presentation" class="">
                      <a href="#xt-pro-1" role="tab" data-toggle="tab" aria-expanded="false">
                        <a href="#xt-pro-4" role="tab" data-toggle="tab" aria-expanded="false">
                          <img :src="product.img2" v-if="product.img2" alt="product thumbs">
                          <img src="/static/images/no_image.png" v-else="!product.img2" alt="product thumbs">
                        </a>
                      </a>
                    </li>
                    <li role="presentation" class="">
                      <a href="#xt-pro-2" role="tab" data-toggle="tab" aria-expanded="false">
                        <a href="#xt-pro-4" role="tab" data-toggle="tab" aria-expanded="false">
                          <img :src="product.img3" v-if="product.img3" alt="product thumbs">
                          <img src="/static/images/no_image.png" v-else="!product.img3" alt="product thumbs">
                        </a>
                      </a>
                    </li>
                    <li role="presentation" class="active">
                      <a href="#xt-pro-3" role="tab" data-toggle="tab" aria-expanded="true">

                        <img :src="product.img4" v-if="product.img4" alt="product thumbs">
                        <img src="/static/images/no_image.png" v-else="!product.img4" alt="product thumbs">

                      </a>
                    </li>
                    <li role="presentation" class="active">
                      <a href="#xt-pro-4" role="tab" data-toggle="tab" aria-expanded="false">
                        <img :src="product.img5" v-if="product.img5" alt="product thumbs">
                        <img src="/static/images/no_image.png" v-else="!product.img5" alt="product thumbs">
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-7">
                <div class="each-product-info">
                  <h3>{{product.product_name}}</h3>
                  <span class="single-price"><b>Current Price:</b> Ksh {{product.cost_per_unit}}</span>
                  <p>{{product.description}},</p>
                  <div class="color-select">
                    Measuring Unit: {{ product.measuring_unit.unit_name }}
                  </div>
                  <div class="color-select" v-if="added">
                    Current Quantity: {{ quantity }}
                  </div>

                  <div class="select-quantity">
                    <input type="number" v-model="quantity" step="1" title="Qty" class="input-text qty text" size="4">

                  </div>
                  <div class="product-add-cart">

                    <button class="btn btn-fill" @click="addToCart({id:product.id, quantity: quantity})">
                      <span v-if="!added">Add to cart</span>
                      <span v-if="added">Update  Quantity</span>
                    </button>
                  </div>
                  <div class="product-additional-info">
                    <ul>
                      <li><b>Sku:</b>{{product.id}}</li>
                      <li><b>Category:</b><a href=""> Product Category</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br><br>
    </section>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import JengaProMainHeader from "./MainHeader.vue";

  export default {
    components: {JengaProMainHeader},
    name: "SingleProduct",
    data() {
      return {
        quantity: 1,
        added: false
      }

    },

    computed: {
      ...mapGetters({
        product: 'getProduct',
        cartQuantityCount: 'getCartItemQuantityCount',
        cartCount: 'totalItems',
      }),

    },
    methods: {
      ...mapActions(['addToCart']),
    },

    created() {
      this.$store.dispatch('fetchProduct', this.$route.params.id);
    },
    watch: {
      product(product) {
        if (product) {
          const cartProducts = JSON.parse(window.localStorage.getItem("vuex" || '[]')).cart.cartItems;
          //console.log(cartProducts)
          const record = cartProducts.find(p => p.id === product.id)
          this.added = record;
          if (record) {
            this.quantity = record.quantity
            console.log(record);
          }

        }
      },

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

        if (newCount && oldCount > 0) {
          this.flash('item quantity updated ', 'success', {
            timeout: 3000,
          });

        }
      }
    }

  }
</script>
