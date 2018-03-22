
const state = {
  cartItems: [],
  checkoutStatus: null,
  cartProds: []
};


//getters
const getters = {
  getCartItems: (state, getters, rootState) => {

    return state.cartItems.map(({id, quantity}) => {
      const product = rootState.products.productList.find(product => product.id === id)
        return {
         id:product.id,
          name: product.product_name,
          price: product.cost_per_unit,
          img_url: product.img1,
          quantity,
          sub_total: product.cost_per_unit * quantity
        }

    })
  },

  totalItems(state){
    return state.cartItems.length
  },

  getCartItemQuantityCount: (state, getters) =>{
    return getters.getCartItems.reduce((total, product) => {
      return total +  product.quantity
    }, 0)
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
      commit('pushProductToCart', {id: product.id, quantity: product.quantity})
    } else {
      if (product.quantity > 1){
        commit('incrementQtyWithMore', {item: cartItem, quantity: product.quantity})
      }else {
        commit('incrementItemQuantity', cartItem)
      }
    }
  },
  removeFromCart({state, commit}, product) {
    commit('popProductFromCart', product)
  }
};


const mutations = {
  pushProductToCart(state, payload) {
    state.cartItems.push({
        id:payload.id,
      quantity: payload.quantity
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
  },

  incrementQtyWithMore(state, payload){
    const cartItem = state.cartItems.find(item => item.id === payload.item.id);
    cartItem.quantity =parseInt(payload.quantity)
  }


};

export default {
  state,
  getters,
  actions,
  mutations
}


