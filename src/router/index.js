import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProductList from '@/components/ProductList'
import ShoppingCart from '@/components/ShoppingCart'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductList
    },
    {
      path: '/cart',
      name: 'ShoppingCart',
      component: ShoppingCart
    }


  ]
})
