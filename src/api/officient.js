import store from '../store';
import qs from 'qs';
import axios from 'axios';
import request from 'request';

const CLIENT_ID =	'504608';
const CLIENT_SECRET = 'ayW8KiD4x3t8nYRY1G0YDUTVpf3rkRZRulZES2Gy5fWDQFoYpd';
const ROOT_URL = 'https://api.officient.io/';
const PROXY = 'https://cors-anywhere.herokuapp.com/';

export default {
  login() {
    const querystring = {
      client_id: CLIENT_ID,
      state: 'xyz'
    };
    window.location = `${ROOT_URL}/authorize?${qs.stringify(querystring)}`;
  },
  oAuth() {
    const query = qs.parse(window.location.search.replace('?', ''));
    const code = query.code;

    const options = { method: 'POST',
      url: `${PROXY}${ROOT_URL}1.0/token`,
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
         store.dispatch('finalizeLogin', token);
       });
  },
  fetchPeople(token) {
    const page = 0;
    return axios.get(`${PROXY}${ROOT_URL}/1.0/people/list?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  fetchPerson(token, id) {
    return axios.get(`${PROXY}${ROOT_URL}/1.0/people/${id}/detail`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
};

/*
--- Axios ---
return axios.get(`${PROXY}${ROOT_URL}/1.0/people/list?page=0`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

-- Fetch --
fetch(`${PROXY}${ROOT_URL}/1.0/people/list?page=1`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(function(res){
  console.log(res.json());
})

-- Node --

const options = { method: 'GET',
  url: `${PROXY}${ROOT_URL}1.0/people/list`,
  qs: { page: '0' },
  headers: {
    Authorization: `Bearer ${token}`,
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

});

*/
