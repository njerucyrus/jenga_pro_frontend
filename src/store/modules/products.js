
import api from '../api'
const state = {
  productList: [],
  product: {},
  pages: [],
  count: 0,
  current_page: 1,
  num_pages: 0,
  next_url: '',
  prev_url: '',
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
    return state.num_pages
  },
  getCurrentPage(state) {
    return state.current_page
  }
  ,
  getPreviousUrl(state) {
    return state.prev_url
  }
  ,
  getNextUrl(state) {
    return state.next_url
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
    state.next_url = payload.links.next;
    state.prev_url = payload.links.previous;
    state.count = payload.count;
    state.num_pages = payload.pages;
    state.currentPage = payload.current_page;
    const links = [];

    for (let i = 1; i < state.num_pages; i++) {
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
    state.next_url = payload.links.next;
    state.prev_url = payload.links.previous;
    state.count = payload.count;
    state.num_pages = payload.pages;
    state.current_page = payload.current_page;

  }

};

export default {
  state,
  getters,
  actions,
  mutations
}
