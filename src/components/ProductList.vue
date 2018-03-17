<template>

  <div class="xt-product-subpage">
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
                        <li class="active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#" aria-label="Next"><i class="fa fa-caret-right"></i></a></li>
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
                    <div class="product-img">
                      <img v-if="product.img1" :src="product.img1" alt="" class="img-responsive" height="361" width="358">
                      <img v-else="!product.img1" src="static/images/no_image.png" alt="" class="img-responsive" height="120" width="220">
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
                          <button class="btn btn-fill" @click="addToCart(product)">Add to cart</button>
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
                <div class="form-group xt-shop-category col-md-4 col-sm-4 col-xs-12">
                  <div class="xt-select xt-search-opt">
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
                <div class="col-md-3 col-sm-3 col-xs-12">
                  <div class="xt-page-pagination">
                    <nav aria-label="Page navigation">
                      <ul class="pagination xt-pagination">
                        <li class="active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#" aria-label="Next"><i class="fa fa-caret-right"></i></a></li>
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


</template>
<script>

import axios from 'axios'
 import {mapGetters, mapActions }from 'vuex'
  export default {
    name: 'ProductList',

    computed: {
      products(){
       return this.$store.getters.getProducts;
      }

    },

    methods: mapActions(
      [
        'addToCart'
      ]

    ),

    created(){
      this.$store.dispatch('fetchProducts');


    }
  }
</script>
