// The Vue build version to load with the `import` command
//(runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import'../static/plugins/js/jquery-1.11.3.min'
// // import'../static/js/init'
import'../static/plugins/js/bootstrap.min'
import'../static/plugins/js/bootstrap-dropdownhover.min'
import'../static/plugins/js/countUp.min'
import'../static/plugins/js/flickity.pkgd.min'
import'../static/plugins/js/jquery.ajaxchimp.min'
import'../static/plugins/js/jquery.fancybox.min'
import'../static/plugins/js/jquery.fancybox.pack'
import'../static/plugins/js/jquery.fitvids'
import'../static/plugins/js/jquery.flexslider-min'
import'../static/plugins/js/jquery.nav'
import'../static/plugins/js/jquery.slicknav.min'
import'../static/plugins/js/jquery-ui.min'
import'../static/plugins/js/meanmenu'
import'../static/plugins/js/nivo-lightbox.min'
import'../static/plugins/js/selectize'
import'../static/plugins/js/slick.min'
import'../static/plugins/js/style-switch'
import'../static/plugins/js/validator.min'
import'../static/plugins/js/wow.min'
//

//
// //my css
//
import '../static/fonts/flaticon.css'

// import '../static/plugins/css/bootstrap.min.css'
import '../static/plugins/css/jquery.fancybox.min.css'
import '../static/plugins/css/animate.css'

 import '../static/plugins/css/flexslider.min.css'
 import '../static/plugins/css/selectize.css'
 import '../static/plugins/css/selectize.bootstrap3.css'
  // import '../static/plugins/css/jquery-ui.min.css'
  import '../static/plugins/css/bootstrap-dropdownhover.min.css'
 // import '../static/plugins/css/meanmenu.css'


import'vue-flash-message/dist/vue-flash-message.min.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from "./store/index";

import VueFlashMessage from 'vue-flash-message';

Vue.use(VueFlashMessage ,{
  createShortcuts: false,
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App ,},
  template: '<App/>'
})
