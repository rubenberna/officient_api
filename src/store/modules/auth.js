import api from '../../api/officient';
import { router } from '../../main';

const GEN_TOKEN = 'db674fcbce189625e37f850e84b57227f1633e83';

const state = {
  token: window.localStorage.getItem('officient_token')
};

const getters = {
  isLoggedIn: state => !!state.token
};

const actions = {
  login: () => {
    api.login();
  },
  finalizeLogin({ commit }, token) {
      commit('setToken', token);
      window.localStorage.setItem('officient_token', token);
      router.push('/');
  },
  directLogin: ({ commit }, token) => {
    commit('setToken', GEN_TOKEN);
    window.localStorage.setItem('officient_token', token);
  },
  logout: ({ commit }) => {
    commit('setToken', null);
    window.localStorage.removeItem('officient_token');
  }
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
