import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import people from './modules/people';
import SuiVue from 'semantic-ui-vue';

Vue.use(Vuex);
Vue.use(SuiVue);

export default new Vuex.Store({
  modules: {
    auth,
    people
  }
});
