import api from '../api'

const state = {
  loading: false,
  error: null,
  successMsg: null,

};

const getters = {
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

  createAccount({commit}, payload) {
    console.log("account payload ",payload)
    commit('setLoading', true);
    commit('clearError');
    commit('clearSuccessMsg');
    api.post(`/users/`, payload)
      .then(response => {
        if (response.status === 201) {
          commit('setLoading', false)
          const message = "Account created Successfully. Redirecting to Login page...";
          commit('setSuccessMsg', message)
          console.log("res created " ,response )

        } else {

          let message = "An error occurred while creating your account please try again later"
          commit('setError', message);
          commit('setLoading', false);
          console.log("ACC_ERR0", response.data.username)
        }
      })
      .catch(error => {
        let message = "An error occurred while creating your account please try again later"
        commit('setError', message);
        commit('setLoading', false);
        console.log("ACC_ERR1", error.message)
      })

  },


};

const mutations = {

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

