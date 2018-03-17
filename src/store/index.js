import Vue from 'vue';
import Vuex from 'vuex';
import cart from './modules/cart'
import products from './modules/products';

Vue.use(Vuex);
const debug = true;

const localStoragePlugin = store => {
  store.subscribe((mutation, { cart }) => {
    window.localStorage.setItem('shopping_cart', JSON.stringify(cart.cartItems))
  })
}

const plugins = [localStoragePlugin];

export const store = new Vuex.Store({
 modules:{
   cart,
   products
 },
  strict: debug,
  plugins

});
