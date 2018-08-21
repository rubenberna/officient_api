import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import store from './store';
import AuthHandler from './components/AuthHandler';
import PeopleList from './components/PeopleList';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history', // use browser router mode
  routes: [
    { path: '/oauth2/callback', component: AuthHandler },
    { path: '/', component: PeopleList}
  ]
});

new Vue ({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
