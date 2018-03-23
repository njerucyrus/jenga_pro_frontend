import api from '../api'

const state = {

}

const getters = {
  getOrderDetails(state, getters, rootState, rootGetters){
    const cartItems = rootGetters.getCartItems;
    const details = []
    cartItems.forEach(item =>{
      const detail = `${item.quantity } ${item.unit_name} of ${item.name} @ KSH ${item.price}\n`
      details.push(detail)
    });

    return details.join(', ');
  }
}


const actions = {

}

const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
