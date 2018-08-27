import store from '../store';
import qs from 'qs';
import axios from 'axios';
import request from 'request';

const google_api = process.env.VUE_APP_GOOGLE;
const PROXY = 'https://cors-anywhere.herokuapp.com/';
const ROOT = 'http://maps.googleapis.com/maps/api/directions/json?';
const OFFICE = '181Kortrijksesteenweg,Gent,BE';

export default {
  fetchCommute(origin) {
    return axios.get(`${PROXY}${ROOT}`, {
      params: {
        origin,
        destination: OFFICE,
        units: 'metric',
        region: 'BE',
        mode: 'transit'
      }
    })
  }
}
