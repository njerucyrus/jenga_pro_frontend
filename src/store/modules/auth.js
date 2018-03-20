import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:8000/api/'})

const state = {
  isLoggedIn: false,
  auth_token: null,
  loading: false,
  error: null,
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
  }

}


const actions = {
  login({commit}, credentials) {
    commit('setLoading', true);
    commit('clearError');
    api.post(`/obtain-token/`, {
      username: credentials.username,
      password: credentials.password
    })
      .then(response => {
        commit('setLoading', false);
        if (response.status === 200) {
          commit("setAuthToken", response.data.token)
        } else if (response.status === 400) {
          let message = "Invalid username or password";
          commit('setError', message)
        } else {
          let message = "Internal server error occurred please try again later"
          commit('setError', message)
        }
      })
      .catch(error => {
        commit('setLoading', false);
        commit('setError', error);
        console.log(error)
      })
  },

  logout({commit}){
    commit('setAuthToken', null)
  }

};


const mutations = {
  setLoading(state, payload){
    state.loading = payload
  },

  setAuthToken(state, payload){
    state.auth_token = payload;
  },

  setError(state, payload){
    state.error = payload
  },

  clearError(state){
    state.error = null
  }

};


export default {
  state,
  getters,
  actions,
  mutations,
}
