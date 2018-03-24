// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import'vue-flash-message/dist/vue-flash-message.min.css'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from "./store/index";

import VueFlashMessage from 'vue-flash-message';
import VueFormGenerator from 'vue-form-generator'
import VueFormWizard from 'vue-form-wizard'

Vue.use(VueFlashMessage ,{
  createShortcuts: false,
})

Vue.use(VueFormWizard)
Vue.use(VueFormGenerator)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App ,},
  template: '<App/>',

})
