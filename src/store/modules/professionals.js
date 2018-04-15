import api from './../api';

const state = {
  isSearching: false,
  professionals: [],
  /*pagination attr*/
  pages: [],
  count: 0,
  currentPage: 1,
  numPages: 0,
  nextUrl: '',
  prevUrl: '',
  /*end of pagination attr*/
  loading: false,
  error: null,
  successMsg: null,
};

const getters = {
  getAccounts(state){
    return state.professionals
  },

  /*pagination getters*/
  getPages(state) {
    return state.pages
  },

  getCount(state){
    return state.count
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
  },
  /*pagination getters END*/

  getError(state) {
    return state.error
  },

  getLoading(state) {
    return state.loading
  },

  getSuccessMsg(state){
    return state.successMsg
  },
  getIsSearching(state){
    return state.isSearching
  }

};

const actions = {

  fetchProfessionals(context) {
    //use profile endpoint to get more detailed object for the user.
    api.get(`/professionals/`)
      .then(response => {
        context.commit('setProfessionals', response.data)
        console.log("Fetched professionals ", response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },


  searchProfessionals({commit}, {query, category}){
    commit('setLoading', true);
    commit('isSearching', true);
    api.get(`/professionals/query/?q=${query}&category=${category}`)
      .then(res => {

        console.log("Search results ", res.data.results);
        commit('setProfessionals', res.data);
        commit('setLoading', false);
        commit('isSearching', false);
      })
      .catch(err => {
        commit('setLoading', false);
        commit('isSearching', false);
        console.log(err)
      })
  },

  filterByCategory({commit}, {query, category}) {
    commit('setLoading', true);
    commit('isSearching', true);


    api.get(`/professionals/query/?q=${query}&category=${category}`)
      .then(res => {
        console.log("Filter Search results ", res.data.results);
        commit('setProfessionals', res.data);
        commit('setLoading', false);
        commit('isSearching', false);
      })
      .catch(err => {
        commit('setLoading', false);
        commit('isSearching', false);
        console.log(err);
      })
  },


  //pagination actions
  fetchPage(context, link) {

    api.get(link)
      .then(response => {
        context.commit('setPage', response.data);
        console.log("page data, ", response.data)
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
  },
  //end pagination action



};

const mutations = {

  setProfessionals(state, payload){
    state.professionals = payload.results;
    state.nextUrl = payload.links.next;
    state.prevUrl = payload.links.previous;
    state.count = payload.count;
    state.numPages = payload.pages;
    state.currentPage = payload.current_page;
  },

  setPage(state, payload) {
    state.professionals = payload.results;
    state.nextUrl = payload.links.next;
    state.prevUrl = payload.links.previous;
    state.count = payload.count;
    state.numPages = payload.pages;
    state.currentPage = payload.current_page;

  },



  setLoading(state, payload){
    state.loading = payload
  },

  setSuccessMsg(state, payload){
    state.successMsg = payload;
  },

  setError(state, payload){
    state.error = payload
  },

  clearError(state){
    state.error = null
  },
  clearSuccessMsg(state){
    state.successMsg = null
  },

  isSearching(state, payload){
    state.isSearching = payload
  }

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations

}
