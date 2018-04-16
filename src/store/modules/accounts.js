import api from '../api'

const state = {
  professionals: [],
  loading: false,
  error: null,
  successMsg: null,

  /*pagination attr*/
  pages: [],
  count: 0,
  currentPage: 1,
  numPages: 0,
  nextUrl: '',
  prevUrl: '',
  /*end of pagination attr*/

};

const getters = {

  getAccounts(state){
    return state.professionals
  },

  /*pagination getters*/
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
  },

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

};

const actions = {

  fetchProfessionals({commit}) {
    api.get(`/professionals/`)
      .then(response => {
        commit('setProfessionals', response.data)
      })
      .catch(error => {
       console.log(error)
      })
  },


  searchProfessionals({commit}, {query, category}){
    commit('setLoading', true);
    api.get(`/professionals/query/?q=${query}&category=${category}`)
      .then(res => {
        commit('setProfessionals', res.data);
        commit('setLoading', false);

      })
      .catch(err => {
        commit('setLoading', false);
        console.log(err)
      })
  },

  filterByCategory({commit}, {query, category}) {
    commit('setLoading', true);


    api.get(`/professionals/query/?q=${query}&category=${category}`)
      .then(res => {
        commit('setProfessionals', res.data);
        commit('setLoading', false);

      })
      .catch(err => {
        commit('setLoading', false);
        console.log(err);
      })
  },

  fetchPage({commit}, link){
    commit('setLoading', true);
    api.get(link)
      .then(res => {
        commit('setProfessionals', res.data);
        commit('setLoading', false);

      })
      .catch(err => {
        commit('setLoading', false);
        console.log(err);
      })
  },

  createAccount({commit}, payload) {
    commit('setLoading', true);
    commit('clearError');
    commit('clearSuccessMsg');
    api.post(`/users/`, payload)
      .then(response => {
        if (response.status === 201) {
          commit('setLoading', false);
          const message = "Account created Successfully. Redirecting to Login page...";
          commit('setSuccessMsg', message);
          console.log("res created " ,response );

        } else {

          let message = "An error occurred while creating your account please try again later"
          commit('setError', message);
          commit('setLoading', false);

        }
      })
      .catch(error => {
        let message = "An error occurred while creating your account please try again later"
        commit('setError', message);
        commit('setLoading', false);
        console.log(error);

      })

  },


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



};
 export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

