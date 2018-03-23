import Vue from 'vue';
import Vuex from 'vuex';
import cart from './modules/cart'
import products from './modules/products';
import accounts from './modules/accounts';
import auth from './modules/auth';
import orders from './modules/orders';

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
const debug = true;

// const localStoragePlugin = store => {
//   store.subscribe((mutation, { cart }) => {
//     window.localStorage.setItem('shopping_cart', JSON.stringify(cart.cartItems))
//   })
// }
// const plugins = [localStoragePlugin];
const plugins = [createPersistedState()];

export const store = new Vuex.Store({
 modules:{
   cart,
   products,
   accounts,
   auth,
   orders
 },
  strict: debug,
  plugins

});
