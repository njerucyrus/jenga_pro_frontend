import api from '../api'

const state = {
  isLoggedIn: false,
  auth_token: null,
  loading: false,
  error: null,
  success_msg: null
}

const getters = {

  getAuthToken(state) {
    return state.auth_token
  },
  getError(state) {
    return state.error
  },
  getLoading(state) {
    return state.loading
  },

  getSuccessMsg(state) {
    return state.success_msg
  },
  getIsLoggedIn(state){
    return state.isLoggedIn
  }
};


const actions = {
  login({commit}, credentials) {
    commit('setLoading', true);
    commit('clearError');
    commit('clearSuccessMsg');

    api.post(`/obtain-token/`, credentials)
      .then(response => {
        commit('setLoading', false);
        if (response.status === 200) {
          const message = "Login Successful. Redirecting..."
          commit('setSuccessMsg', message)
          commit("setAuthToken", response.data.token)
          commit("setIsLoggedIn", true)
        } else if (response.status === 400) {
          const message = "Invalid username or password";
          commit('setError', message)
        } else {
          const message = "Internal server error occurred please try again later";
          commit('setError', message)
        }
      })
      .catch(error => {
        commit('setLoading', false);
        const message = "Invalid username or password";
        commit('setError', message);
        console.log(error)
      })
  },

  logout({commit}) {
    commit('setIsLoggedIn', false);
    commit('setAuthToken', null);
  }

};


const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },

  setAuthToken(state, payload) {
    state.auth_token = payload;
  },

  setError(state, payload) {
    state.error = payload
  },

  clearError(state) {
    state.error = null
  },

  clearSuccessMsg(state) {
    state.success_msg = null
  },

  setSuccessMsg(state, payload) {
    state.success_msg = payload
  },

  setIsLoggedIn(state, payload){
    state.isLoggedIn = payload
  }

};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
