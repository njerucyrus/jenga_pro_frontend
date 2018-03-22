<template>
<div>
  <jenga-pro-main-header></jenga-pro-main-header>

  <div class="xt-product-subpage">
    <link rel="stylesheet" href="static/css/style.css">
    <div class="container">
      <div class="row">
        <div class="col-md-9 col-md-push-3">
          <!--end singlw item info -->
          <div class="xt-feature-product">
            <div class="section-separator">
              <div class="xt-filter-nav">
                <div class="form-group col-md-4 col-sm-4 col-xs-12">
                  <div class="xt-select xt-search-opt xt-item-view-count">
                    <select class="xt-category-search select-beast">
                      <option>Shirt</option>
                      <option>Pant</option>
                      <option>Jeans</option>
                      <option>Jackets</option>
                    </select>
                  </div>
                  <div class="xt-search-opt xt-search-btn">
                    <button type="button" class="btn-search"><i class="fa fa-long-arrow-down"></i></button>
                  </div>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-8 xt-show-item">
                  <label>Show: </label>
                  <div class="xt-select xt-search-opt xt-item-view-count">
                    <select class="xt-category-search select-beast">
                      <option>4</option>
                      <option>8</option>
                      <option>12</option>
                      <option>20</option>
                      <option>40</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-5 col-sm-5 col-xs-12">
                  <div class="xt-page-pagination">
                    <nav aria-label="Page navigation">
                      <ul class="pagination xt-pagination">
                        <li><a href="#" v-on:click.prevent="getPrevPage(prevUrl)" :class="{'disabled': prevUrl}" aria-label="Previous"><i class="fa fa-caret-left"></i></a></li>

                        <li v-for="page in pages.slice(0,6)" v-on:click.prevent="getPage(page.link)" :class="{'active': currentPage===page.pageNumber}"><a href="#">{{page.pageNumber}}</a></li>

                        <li><a href="#" v-on:click.prevent="getNextPage(nextUrl)" :class="{'disabled': nextUrl}" aria-label="Next"><i class="fa fa-caret-right"></i></a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div class="clearfix"></div>
                <div class="col-xs-12 xt-top-hr">
                  <hr class="xt-hr">
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="xt-each-feature">
                <!--product item-->
                <div class="col-md-4 col-sm-4" v-for="product in products">
                  <div class="xt-feature">
                    <div class="product-img" >
                      <router-link :to="{name:'SingleProduct', params:{id: product.id} }">
                      <img v-if="product.img1" :src="product.img1" alt="" height="250" width="358" @click="reloadPage">
                        <img v-else="!product.img1" src="static/images/no_image.png" alt="" height="120" width="220">
                      </router-link>
                      <span class="product-tag xt-uppercase">sale!</span>
                    </div>
                    <div class="product-info">
                      <div class="product-title">
                        <span class="category xt-uppercase">{{product.product_name }}</span>
                        <span class="name xt-semibold">Units Of Measure </span>
                      </div>
                      <div class="price-tag pull-right">
                        <span class="old-price">@ Ksh {{product.cost_per_unit}}</span>
                        <span class="new-price xt-semibold">{{product.measuring_unit.unit_name}}</span>
                      </div>
                      <div class="xt-featured-caption">
                        <div class="product-title">
                          <span class="category xt-uppercase">{{product.product_name }}</span>
                          <span class="name xt-semibold">Units</span>
                        </div>
                        <div class="price-tag pull-right">
                          <span class="old-price">@Ksh{{product.cost_per_unit}}</span>
                          <span class="new-price xt-semibold">{{product.measuring_unit.unit_name}}</span>
                        </div>
                        <div class="add-cart">
                          <button class="btn btn-fill" @click="addToCart({id: product.id, quantity:1})">Add to cart</button>
                          <ul class="reaction">
                            <li><a href=""><i class="fa fa-search"></i></a></li>
                            <li><a href=""><i class="fa fa-heart-o"></i></a></li>
                            <li><a href=""><i class="fa fa-bar-chart-o"></i></a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--end of product item-->

              </div>
              <div class="clearfix"></div>
              <div class="col-md-12 xt-bottom-hr">
                <hr class="xt-hr">
              </div>
              <div class="xt-filter-nav padding-bottom-60">
                <div class="col-md-2 col-sm-2 col-xs-6">
                  <div class="xt-view">
                    <a href="" class="active"><i class="fa fa-th-large"></i></a>
                    <a href=""><i class="fa fa-navicon"></i></a>
                  </div>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-6 xt-show-item">
                  <label>Show: </label>
                  <div class="xt-select xt-search-opt xt-item-view-count">
                    <select class="xt-category-search select-beast">
                      <option>4</option>
                      <option>8</option>
                      <option>12</option>
                      <option>20</option>
                      <option>40</option>
                    </select>
                  </div>
                </div>
                <!--Bottom Pagination here-->
                <div class="col-md-5 col-sm-5 col-xs-12 col-md-push-2">
                  <div class="xt-page-pagination">
                    <nav aria-label="Page navigation">
                      <ul class="pagination xt-pagination">
                        <li><a href="#" v-on:click.prevent="getPrevPage(prevUrl)" :class="{'disabled': !nextUrl}" aria-label="Previous"><i class="fa fa-caret-left"></i></a></li>

                        <li v-for="page in pages.slice(0,6)" v-on:click.prevent="getPage(page.link)" :class="{'active': currentPage===page.pageNumber}"><a href="#">{{page.pageNumber}}</a></li>

                        <li><a href="#" v-on:click.prevent="getNextPage(nextUrl)" :class="{'disabled': !nextUrl}" aria-label="Next"><i class="fa fa-caret-right"></i></a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <!---->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>

  import {mapGetters, mapActions} from 'vuex'
  import axios from 'axios'
  import JengaProMainHeader from "./MainHeader.vue";
  export default {
    components: {JengaProMainHeader},
    name: 'ProductList',

    computed: {
      ...mapGetters(
        {
          products: 'getProducts',
          pages: 'getPages',
          pageCount: 'getPageCount',
          currentPage: 'getCurrentPage',
          nextUrl: 'getNextUrl',
          prevUrl: 'getPreviousUrl',
          cartQuantityCount: 'getCartItemQuantityCount',
          cartCount: 'totalItems',

        }
      )

    },

    methods: {
      ...mapActions(
      [
        'addToCart'
      ]),

      getPage(link) {
        this.$store.dispatch('fetchPage', link)
      },
      getNextPage(nextPageUrl){
        this.$store.dispatch('fetchNextPage', nextPageUrl)
      },
      getPrevPage(prevPageUrl){
        this.$store.dispatch('fetchPreviousPage', prevPageUrl)
      },

      reloadPage(){
        window.location.reload()
      }
    },



    created() {
      this.$store.dispatch('fetchProducts');
//
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
