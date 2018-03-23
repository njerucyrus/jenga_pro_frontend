
import api from '../api'

const state = {
  productList: [],
  product: {},
  pages: [],
  count: 0,
  currentPage: 1,
  numPages: 0,
  nextUrl: '',
  prevUrl: '',
};

//getters

const getters = {
  getProducts(state) {
    return state.productList;
  },
  getProduct(state) {
    return state.product;
  },
  getPages(state) {
    return state.pages
  },
  getPageCount(state) {
    return state.numPages
  },
  getCurrentPage(state) {
    return state.currentPage
  }
  ,
  getPreviousUrl(state) {
    return state.prevUrl
  }
  ,
  getNextUrl(state) {
    return state.nextUrl
  }

};


//actions
const actions = {
  fetchProducts(context) {
    api.get(`/products/`)
      .then(response => {
        context.commit('setProducts', response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },

  fetchProduct(context, id) {
    api.get(`/products/${id}/`)
      .then(response => {
        context.commit('setProduct', response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },


  fetchPage(context, link) {

    api.get(link)
      .then(response => {
        context.commit('setPage', response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })

  },

  fetchNextPage(context, nextURL) {
    api.get(nextURL)
      .then(response => {
        context.commit('setPage', response.data);
        console.log("next ", response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },

  fetchPreviousPage(context, prevURL) {
    api.get(prevURL)
      .then(response => {
        context.commit('setPage', response.data);
        console.log("prev", response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }


};

//mutations
const mutations = {
  setProducts(state, payload) {
    state.productList = payload.results;
    state.nextUrl = payload.links.next;
    state.prevUrl = payload.links.previous;
    state.count = payload.count;
    state.numPages = payload.pages;
    state.currentPage = payload.currentPage;
    const links = [];

    for (let i = 1; i < state.numPages; i++) {
      const link = `/products/?page=${i}`;
      links.push({pageNumber: i, link: link})
    }
    state.pages = links;

  },
  setProduct(state, payload) {
    state.product = payload
  },
  setPage(state, payload) {
    state.productList = payload.results;
    state.nextUrl = payload.links.next;
    state.prevUrl = payload.links.previous;
    state.count = payload.count;
    state.numPages = payload.pages;
    state.currentPage = payload.currentPage;

  }

};

export default {
  state,
  getters,
  actions,
  mutations
}
