const state = {
  cartItems: [],
};

//getters
const getters = {
  getCartItems: (state, getters, rootState) => {
    return state.cartItems.map(({id, quantity}) => {

      const product = rootState.products.productList.find(product => product.id === id)
      {
        return {
          name: product.product_name,
          price: product.cost_per_unit,
          quantity
        }
      }

    })
  },

  getCartTotalPrice: (state, getters) => {
    return getters.getCartItems.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
};

//actions


