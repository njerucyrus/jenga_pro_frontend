import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProductList from '@/components/ProductList'
import SingleProduct from '@/components/SingleProduct'
import ShoppingCart from '@/components/ShoppingCart'
import JengaProLogin from '@/components/Login'
import JengaProRegister from '@/components/Register'
import JengaProCartDetailView from '@/components/CartDetailView'
import JengaProCheckoutPage from '@/components/CheckoutPage'
import JengaProAbout from '@/components/About'
import JengaProContact from '@/components/Contact'
import JengaProLandingPage from '@/components/LandingPage'
import JengaProProfessionals from '@/components/Professionals'
import JengaProContracts from '@/components/Contracts'
import JengaProProfessionalSignUp from '@/components/ProfessionalSignUp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: JengaProLandingPage
    },

    {
      path: '/home',
      name: 'Home',
      component: Home
    },

    {
      path: '/products',
      name: 'Products',
      component: ProductList
    },

    {
      path: '/products/:id',
      name: 'SingleProduct',
      component: SingleProduct
    },

    {
      path: '/cart',
      name: 'ShoppingCart',
      component: ShoppingCart
    },

    {
      path: '/login',
      name: 'Login',
      component: JengaProLogin
    },

    {
      path: '/register',
      name: 'Register',
      component: JengaProRegister
    },

    {
      path: '/cart-detail',
      name: 'CartDetail',
      component: JengaProCartDetailView
    },

    {
      path: '/checkout',
      name: 'CheckoutPage',
      component: JengaProCheckoutPage,
      meta: {requiresAuth: true}
    },

    {
      path: '/about',
      name: 'About',
      component: JengaProAbout,

    },

    {
      path: '/contact',
      name: 'Contact',
      component: JengaProContact,

    },
    {
      path: '/professionals',
      name: 'Professionals',
      component: JengaProProfessionals,

    },
    {
      path: '/contracts',
      name: 'Contracts',
      component: JengaProContracts,

    },

    {
      path: '/professionals/create-account',
      name: 'ProfessionalSignUP',
      component: JengaProProfessionalSignUp,

    },

  ],

})
