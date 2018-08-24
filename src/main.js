import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import store from './store';
import AuthHandler from './components/AuthHandler';
import PeopleList from './components/PeopleList';
import PersonDetail from './components/PersonDetail';
require('dotenv').config();

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history', // use browser router mode
  routes: [
    { path: '/oauth2/callback', component: AuthHandler },
    { path: '/', component: PeopleList},
    { path: '/person/id', component: PersonDetail }
  ]
});

new Vue ({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
