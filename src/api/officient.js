import qs from 'qs';

const CLIENT_ID =	'504607';
const ROOT_URL = 'https://app.officient.io';

export default {
  something() {
    const querystring = {
      client_id: CLIENT_ID,
      state: 'xyz'
    };
    window.location = `${ROOT_URL}/authorize?${qs.stringify(querystring)}`;
  }
};
