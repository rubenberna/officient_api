import api from '../../api/officient';

const TEMP_TOKEN = '038e9066e26741f73962c7cfe4e9c56f01831680';

const state = {
  token: null
};

const getters = {
  isLoggedIn: state => !!state.token
};

const actions = {
  login: ({ commit }, token) => {
    commit('setToken', TEMP_TOKEN);
    console.log(state.token);
  },
  logout: ({ commit }) => {
    commit('setToken', null);
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
