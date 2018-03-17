
const state = {
  cartItems: JSON.parse(window.localStorage.getItem('shopping_cart') || '[]'),
  checkoutStatus: null,
};




//getters
const getters = {
  getCartItems: (state, getters, rootState) => {
    return state.cartItems.map(({id, quantity}) => {
      const item = rootState.products.productList.find(product => product.id === id)
      {
        return {
          name: item.product_name,
          price: item.cost_per_unit,
          img_url: item.img1,
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

const actions = {
  addToCart({state, commit}, product) {
    const cartItem = state.cartItems.find(item => item.id === product.id)
    if (!cartItem) {
      commit('pushProductToCart', {id: product.id})
    } else {
      commit('incrementItemQuantity', cartItem)
    }
  },
  removeFromCart({state, commit}, product) {
    commit('popProductFromCart', product)
  }
};


const mutations = {
  pushProductToCart(state, {id}) {
    state.cartItems.push({
      id,
      quantity: 1
    })
  },

  popProductFromCart(state, {id}) {
    state.cartItems.splice(state.cartItems.indexOf(state.cartItems.find(item => item.id === id)), 1)
  }
  ,
  setCartItems(state, {items}) {
    state.cartItems = items
  }
  ,
  setCheckoutStatus(state, status) {
    state.checkoutStatus = status
  },
  incrementItemQuantity(state, {id}) {
    const cartItem = state.cartItems.find(item => item.id === id);
    cartItem.quantity++
  }

};

export default {
  state,
  getters,
  actions,
  mutations
}


