import api from '../api'

const state = {
  cartItems: [],
  checkoutStatus: null,
  loading: false,
  successMsg: null,
  error: null,
  operatingRegions: []

};


//getters
const getters = {

  getCartItems: (state, getters, rootState) => {
    return state.cartItems.map(({id, quantity}) => {
      const product = rootState.products.productList.find(product => product.id === id)
      return {
        id: product.id,
        name: product.product_name,
        price: product.cost_per_unit,
        unit_name: product.measuring_unit.unit_name,
        img_url: product.img1,
        quantity,
        sub_total: product.cost_per_unit * quantity
      }

    })
  },

  totalItems: (state) => {
    return state.cartItems.length
  },


  getCartItemQuantityCount: (state, getters) => {
    return getters.getCartItems.reduce((total, product) => {
      return total + product.quantity
    }, 0)
  },

  getCartTotalPrice: (state, getters) => {
    return getters.getCartItems.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  },

  getOrderDetails: (state, getters) => {
    //this method returns a string representation of cart items on checkout/
    //the string representation is used to create the order details
    const details = [];
    getters.getCartItems.forEach(item => {
      const detail = `${item.quantity } ${item.unit_name} of ${item.name} @ KSH ${item.price}`
      details.push(detail)
    });

    return details.join('\n');
  },
  getLoading(state) {
    return state.loading
  },

  getCheckoutStatus: (state) =>{
    return state.checkoutStatus;
  },

  getOperatingRegions: (state) =>{
    return state.operatingRegions
  }


};

//actions

const actions = {
  addToCart({state, commit}, product) {
    const cartItem = state.cartItems.find(item => item.id === product.id)
    if (!cartItem) {
      commit('pushProductToCart', {id: product.id, quantity: product.quantity})
    } else {
      if (product.quantity > 1) {
        let payload = {item: cartItem, quantity: product.quantity};
        commit('incrementQtyWithMore', payload)
      }
      else {
        commit('incrementItemQuantity', cartItem)
      }
    }
  },
  removeFromCart({state, commit}, product) {
    commit('popProductFromCart', product)
  },

  checkout({state, commit}, {order, shipping}) {

    commit('setLoading', true);
    commit('clearError');
    commit('clearSuccessMsg');
    commit('clearCheckoutStatus');
    const savedCartItems = [...state.cartItems];

    api.post(`/orders/`, order)
      .then(response => {
        if (response.status === 201) {
          //add order id to the shipping info for creating fk relation
          shipping['order'] = response.data.id;
          //make api call to shipping endpoint to create the resource
          api.post(`/orders/shipping/`, shipping)
            .then(response => {
              if (response.status === 201) {

                commit('setLoading', false)
                commit('setCheckoutStatus', 'successful');
                commit('setCartItems', {items: []});

                const message = "Checkout completed successfully"
                commit('setSuccessMsg', message)

              } else {

                const message = "An error occurred while processing your checkout please try again later"

                commit('setError', message)
                commit('setLoading', false)
                commit('setCheckoutStatus', 'failed');
                //Rollback the cart items incase there is error
                commit('setCartItems', savedCartItems);

                console.log("error ", response)

              }
            })
            .catch(error => {

              commit('setLoading', false)

              const message = "An error occurred while processing your checkout please try again later";
              commit('setError', message);
              commit('setCheckoutStatus', 'failed');
              //Rollback the cart items incase there is error
              commit('setCartItems', {items: savedCartItems});
              console.log("error ", error);
            })
        }
      })
  },

  //get the location operating in
  fetchOperationalRegions({commit}) {
    api.get(`/regions/query/?active=1`)
      .then(response => {
        if (response.status === 200) {
          commit('setOperationalRegions', response.data)
        }
      })
      .catch(error => {
        console.log(error)
      });
  }
};


const mutations = {
  pushProductToCart(state, payload) {
    state.cartItems.push({
      id: payload.id,
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

  incrementQtyWithMore(state, payload) {
    const cartItem = state.cartItems.find(item => item.id === payload.item.id);
    cartItem.quantity = parseInt(payload.quantity)
  },

  setLoading(state, payload) {
    state.loading = payload
  },

  setSuccessMsg(state, payload) {
    state.successMsg = payload;
  },

  setError(state, payload) {
    state.error = payload
  },

  clearError(state) {
    state.error = null
  },
  clearSuccessMsg(state) {
    state.successMsg = null
  },
  clearCheckoutStatus(state) {
    state.checkoutStatus = null
  },

  setOperationalRegions(state, {results}){
    state.operatingRegions = results
  }


};

export default {
  state,
  getters,
  actions,
  mutations
}


