import api from '../../api/officient';
import qs from 'qs';
import { router } from '../../main';

const CLIENT_ID =	'504607';
const CLIENT_SECRET = 'DDSOnWNTuOZDNt4NJgPcG5vOup5uYM3NCOr5GDWUcOl685ScDP';
const TOKEN_URL = 'https://api.officient.io/1.0/token';
const GRANT_TYPE = 'authorization_code';
const PROXY = 'https://cors-anywhere.herokuapp.com/';

const TEMP_TOKEN = '05e4f86b8e8b5139e8f2495ba753098a0685a931';

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
  const querystring = {
    grant_type: 'authorization_code',
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  };

  const request = require("request");
  const options = { method: 'POST',
    url: 'https://cors-anywhere.herokuapp.com/https://api.officient.io/1.0/token',
    body: `${qs.stringify(querystring)}`};
   request(options, function (error, response, body) {
    if (error) throw new Error(error);
     console.log(body);
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


code=8b2969e6fbae5f5d0dbf3bf24b44e3d39407ad2a&
client_id=504607
&client_secret=DDSOnWNTuOZDNt4NJgPcG5vOup5uYM3NCOr5GDWUcOl685ScDP&
grant_type=authorization_code

code=8b2969e6fbae5f5d0dbf3bf24b44e3d39407ad2a&
client_id=504607&
client_secret=DDSOnWNTuOZDNt4NJgPcG5vOup5uYM3NCOr5GDWUcOl685ScDP&
grant_type=authorization_code&
refresh_token='
