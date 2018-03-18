import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:8000/api'});

const state = {
    productList: []
};

//getters

const getters = {
  getProducts(state){
    return state.productList;
  },
};


//actions
const actions = {
  fetchProducts(context) {
    api.get(`/products/`)
      .then(response => {
        context.commit('setProducts', response.data.data);
        console.log(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
};



//mutations
const mutations = {
  setProducts(state, products){
    state.productList = products
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
