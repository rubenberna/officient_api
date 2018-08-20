import api from '../../api/officient';
import qs from 'qs';

const CLIENT_ID =	'504607';
const CLIENT_SECRET = 'DDSOnWNTuOZDNt4NJgPcG5vOup5uYM3NCOr5GDWUcOl685ScDP';
const TOKEN_URL = 'https://api.officient.io/1.0/token';
const GRANT_TYPE = 'refresh_token';

const state = {
  token: null
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
    const querystring = {
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: GRANT_TYPE
    };
    const request = require("request");
    const options = { method: 'POST',
      url: TOKEN_URL,
      body: `${qs.stringify(querystring)}`};

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });  
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

// ?code=387a97cfc958fdd5f4e5000999e8fefd309a32e7&state=xyz
// #access_token=1928391238192381923&expires
