import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:8000/api'});

const state = {
  users: [],
  /*pagination attr*/
  pages: [],
  count: 0,
  current_page: 1,
  num_pages: 0,
  next_url: '',
  prev_url: '',
  /*end of pagination attr*/
  auth_token: '',

}

const getters = {
  getUsers(state) {
    return state.users
  },
  /*pagination getters*/
  getPages(state) {
    return state.pages
  },
  getPageCount(state) {
    return state.num_pages
  },
  getCurrentPage(state) {
    return state.currentPage
  }
  ,
  getPreviousUrl(state) {
    return state.prev_url
  }
  ,
  getNextUrl(state) {
    return state.next_url
  },
  /*pagination getters END*/



  getToken(state) {
    return state.auth_token
  },


};

const actions = {
  fetchUsers({commit}) {
    //use profile endpoint to get more detailed object for the user.
    api.get(`/profiles`)
      .then(response => {
        commit('setUsers', response.data)
        console.log("user data",response.data)
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

  login({commit}, credentials) {
    api.post(`/obtain-token/`, {
      username: credentials.username,
      password: credentials.password
    })
      .then(response => {
        if (response.status === 200){
          commit("setUserToken", response.data.token)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
};

const mutations = {
  setUsers(state, payload) {
    state.users = payload.results;
    state.next_url = payload.links.next;
    state.prev_url = payload.links.previous;
    state.count = payload.count;
    state.num_pages = payload.pages;
    state.currentPage = payload.current_page;
    const links = [];

    for (let i = 1; i < state.num_pages; i++) {
      const link = `/Users/?page=${i}`;
      links.push({pageNumber: i, link: link})
    }
    state.pages = links;

  },

  setPage(state, payload) {
    state.users = payload.results;
    state.next_url = payload.links.next;
    state.prev_url = payload.links.previous;
    state.count = payload.count;
    state.num_pages = payload.pages;
    state.current_page = payload.current_page;

  }
};
