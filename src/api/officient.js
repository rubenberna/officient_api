import qs from 'qs';
import axios from 'axios';

const CLIENT_ID =	'504607';
const ROOT_URL = 'https://app.officient.io';

export default {
  fetchPeople(token) {
    const request = require("request");

    const options = { method: 'GET',
    url: 'https://api.officient.io/1.0/people/list',
    qs: { page: '1' },
    headers: {
      Authorization: `Bearer ${token}`,
    }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });

  }
};

// return axios.get(`${ROOT_URL}/1.0/people/list?page=1`, {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });


// return axios.get(`${ROOT_URL}/1.0/people/list`, {
//   qs: { page: '1'},
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });

//


// var data = JSON.stringify(false);
//
// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;
//
// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === this.DONE) {
//     console.log(this.responseText);
//   }
// });
//
// xhr.open("GET", "https://api.officient.io/1.0/people/list?page=1", {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });
//
// xhr.send(data);
