// The Vue build version to load with the `import` command
//(runtime-only or standalone) has been set in webpack.base.conf with an alias.
// require('../static/plugins/js/jquery-1.11.3.min');
// // require('../static/js/init');
// require('../static/plugins/js/bootstrap.min');
// require('../static/plugins/js/bootstrap-dropdownhover.min');
// require('../static/plugins/js/countUp.min');
// require('../static/plugins/js/flickity.pkgd.min');
// require('../static/plugins/js/jquery.ajaxchimp.min');
// require('../static/plugins/js/jquery.fancybox.min');
// require('../static/plugins/js/jquery.fancybox.pack');
// require('../static/plugins/js/jquery.fitvids');
// require('../static/plugins/js/jquery.flexslider-min');
// require('../static/plugins/js/jquery.nav');
// require('../static/plugins/js/jquery.slicknav.min');
// require('../static/plugins/js/jquery-ui.min');
// require('../static/plugins/js/meanmenu');
// require('../static/plugins/js/nivo-lightbox.min');
// require('../static/plugins/js/selectize');
// require('../static/plugins/js/slick.min');
// require('../static/plugins/js/style-switch');
// require('../static/plugins/js/validator.min');
// require('../static/plugins/js/wow.min');
//

//
// //my css
//
// require('../static/fonts/flaticon.css');
// require('../static/plugins/css/fonts/slick.eot');
// require('../static/plugins/css/bootstrap.min.css');
// // require('../static/plugins/css/jquery.fancybox.min.css');
// require('../static/plugins/css/animate.css');
//
//  require('../static/plugins/css/flexslider.min.css');
//  require('../static/plugins/css/selectize.css');
//  require('../static/plugins/css/selectize.bootstrap3.css');
// // require('../static/plugins/css/jquery-ui.min.css');
//  require('../static/plugins/css/bootstrap-dropdownhover.min.css');
// // require('../static/plugins/css/meanmenu.css');


require('vue-flash-message/dist/vue-flash-message.min.css');

import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from "./store/index";

import VueFlashMessage from 'vue-flash-message';

Vue.use(VueFlashMessage ,{
  createShortcuts: false,
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App ,},
  template: '<App/>'
})
