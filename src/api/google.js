import store from '../store';
import qs from 'qs';
import axios from 'axios';
import request from 'request';

const google_api = process.env.VUE_APP_GOOGLE;

export default {
  fetchCommute(origin, destination) {
    console.log(google_api);
  }
}
