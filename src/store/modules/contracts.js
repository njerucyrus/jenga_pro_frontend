import api from './../api'

const state = {
  contracts: [],
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
  getContracts: (state) => {
    return state.contracts;
  },

  /*pagination getters*/
  getPages: (state) => {
    return state.pages
  },
  getPageCount: (state) => {
    return state.numPages
  },
  getCurrentPage: (state) => {
    return state.currentPage
  }
  ,
  getPreviousUrl: (state) => {
    return state.prevUrl
  },

  getNextUrl: (state) => {
    return state.nextUrl
  },
  /*pagination getters END*/

  getError: (state) => {
    return state.error
  },

  getLoading(state) {
    return state.loading
  },

  getSuccessMsg: (state) => {
    return state.successMsg
  },
};

const actions = {
  fetchContracts({commit}, username) {
    commit('setLoading', true);
    api.get(`/professionals/hires/${username}/`)
      .then(res => {
        commit('setLoading', false);
        commit('setContracts', res.data);

      })
      .catch(err => {
        commit('setLoading', false);
        console.log(err);
      })
  },

  fetchPage({commit}, link) {
    commit('setLoading', true);
    api.get(link)
      .then(res => {
        commit('setContracts', res.data);
        commit('setLoading', false);

      })
      .catch(err => {
        commit('setLoading', false);
        console.log(err);
      })
  },

  acceptContract({commit}, {pk, is_active, auth_token}) {
    commit('setLoading', true);
    commit('clearError');
    commit('clearSuccessMsg');
    api.patch(`/professionals/hires/${pk}/`, {is_active}, {
      headers: {
        Authorization: `Bearer ${auth_token}`
      }
    })
      .then(res => {
        console.log(res);
        commit('setLoading', false);
        let message = "Contract status updated.";
        commit('setSuccessMsg', message);
      })

      .catch(err => {
        console.log(err);
        commit('setLoading', false);
        let message = "Error occurred contract not updated";
        commit('setError', message);
      });
  },

  rejectContract({commit}, {pk, is_active, rejected, auth_token}) {
    commit('setLoading', true);
    commit('clearError');
    commit('clearSuccessMsg');

    api.patch(`/professionals/hires/${pk}/`, {is_active, rejected}, {
      headers: {
        Authorization: `Bearer ${auth_token}`
      }
    })
      .then(res => {
        console.log(res);
        commit('setLoading', false);
        let message = "Contract status updated.";
        commit('setSuccessMsg', message);
      })

      .catch(err => {
        console.log(err);
        commit('setLoading', false);
        let message = "Error occurred contract not updated";
        commit('setError', message);
      });
  },

  cancelContract({commit}, {pk, auth_token}) {
    commit('setLoading', true);
    commit('clearError');
    commit('clearSuccessMsg');

    api.delete(`/professionals/hires/${pk}/`, {}, {
      headers: {
        Authorization: `Bearer ${auth_token}`
      }
    })
      .then(res => {
        console.log(res);
        commit('setLoading', false);
        let message = "Contract status updated.";
        commit('setSuccessMsg', message);
      })
      .catch(err => {
        console.log(err);
        commit('setLoading', false);
        let message = "Error occurred contract not updated";
        commit('setError', message);
      });
  },

  endContract({commit}, {pk, is_active, ended}) {
    commit('setLoading', true);
    commit('clearError');
    commit('clearSuccessMsg');

    api.patch(`/professionals/hires/${pk}/`, {is_active, ended})
      .then(res => {
        console.log(res);
        commit('setLoading', false);
        let message = "Contract status updated.";
        commit('setSuccessMsg', message);
      })
      .catch(err => {
        console.log(err);
        commit('setLoading', false);

        let message = "Error occurred contract not updated";
        commit('setError', message);
      });
  }


};

const mutations = {
  setContracts(state, payload) {
    state.contracts = payload.results;
    state.nextUrl = payload.links.next;
    state.prevUrl = payload.links.previous;
    state.count = payload.count;
    state.numPages = payload.pages;
    state.currentPage = payload.current_page;
  },


  setLoading(state, payload) {
    state.loading = payload
  },

  setSuccessMsg(state, payload) {
    state.successMsg = payload;
  },

  setError(state, payload) {
    state.error = payload
  },

  clearError(state) {
    state.error = null
  },
  clearSuccessMsg(state) {
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

