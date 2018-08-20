import qs from 'qs';

const CLIENT_ID =	'504607';
const ROOT_URL = 'https://app.officient.io';

export default {
  login() {
    const querystring = {
      client_id: CLIENT_ID,
      state: 'xyz'
    };
    window.location = `${ROOT_URL}/authorize?${qs.stringify(querystring)}`;
  }
};

/*
CLIENT ID	504607
CLIENT SECRET	DDSOnWNTuOZDNt4NJgPcG5vOup5uYM3NCOr5GDWUcOl685ScDP
REDIRECT URI	http://localhost:8080/oauth2/callback

https://app.officient.io/authorize?client_id={client_id}&state=xyz

https://api.imgur.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=REQUESTED_RESPONSE_TYPE&state=APPLICATION_STATE

window.location = `${ROOT_URL}/authorize?client_id=${CLIENT_ID}&state=xyz`;
*/
