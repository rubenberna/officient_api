import api from '../../api/officient';
import qs from 'qs';
import request from 'request';
import { router } from '../../main';

const CLIENT_ID =	'504607';
const CLIENT_SECRET = 'DDSOnWNTuOZDNt4NJgPcG5vOup5uYM3NCOr5GDWUcOl685ScDP';

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
  finalizeLogin({ commit }, search) {
    const query = qs.parse(search.replace('?', ''));
    const code = query.code;

    const options = { method: 'POST',
      url: 'https://cors-anywhere.herokuapp.com/https://api.officient.io/1.0/token',
      headers: { 'content-type': 'application/json' },
      body:
       { grant_type: 'authorization_code',
         client_id: CLIENT_ID,
         client_secret: CLIENT_SECRET,
         code,
         redirect_uri: 'http://localhost:8080/oauth2/callback' },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let token = body.access_token;
      console.log(token);
      commit('setToken', token);
      window.localStorage.setItem('officient_token', token);
      router.push('/');
    });
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

// login: ({ commit }, token) => {
//   commit('setToken', TEMP_TOKEN);
//   window.localStorage.setItem('officient_token', TEMP_TOKEN);
//   router.push('/');
// },
