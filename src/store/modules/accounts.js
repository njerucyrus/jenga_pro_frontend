import api from '../api'

const state = {
  users: [],
  /*pagination attr*/
  pages: [],
  count: 0,
  current_page: 1,
  numPages: 0,
  nextUrl: '',
  prevUrl: '',
  /*end of pagination attr*/
  loading: false,
  error: null,
  successMsg: null,

};

const getters = {
  getUsers(state) {
    return state.users
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

};

const actions = {
  fetchUsers({commit}) {
    //use profile endpoint to get more detailed object for the user.
    api.get(`/profiles/`)
      .then(response => {
        commit('setUsers', response.data)
        console.log("user ", response.data.results)
      })
      .catch(error => {
        console.log(error)
      })
  },

  //pagination actions
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
  },
  //end pagination action

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

  }


};

const mutations = {
  setUsers(state, payload) {
    state.users = payload.results;
    state.nextUrl = payload.links.next;
    state.prevUrl = payload.links.previous;
    state.count = payload.count;
    state.numPages = payload.pages;
    state.currentPage = payload.current_page;
    const links = [];

    for (let i = 1; i < state.numPages; i++) {
      const link = `/Users/?page=${i}`;
      links.push({pageNumber: i, link: link})
    }
    state.pages = links;

  },

  setPage(state, payload) {
    state.users = payload.results;
    state.nextUrl = payload.links.next;
    state.prevUrl = payload.links.previous;
    state.count = payload.count;
    state.numPages = payload.pages;
    state.current_page = payload.current_page;

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
  }

};
 export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

