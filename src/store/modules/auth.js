import api from '../../api/officient';
import { router } from '../../main';

const TEMP_TOKEN = '038e9066e26741f73962c7cfe4e9c56f01831680';

const state = {
  token: window.localStorage.getItem('officient_token')
};

const getters = {
  isLoggedIn: state => !!state.token
};

const actions = {
  login: ({ commit }, token) => {
    commit('setToken', TEMP_TOKEN);
    window.localStorage.setItem('officient_token', TEMP_TOKEN);
    router.push('/');
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
