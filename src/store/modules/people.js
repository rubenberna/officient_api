import OfficientApi from '../../api/officient';
import GoogleAPI from '../../api/google';
import { router } from '../../main';

const state = {
  people: [],
  person: null,
  loading: false,
  commute: null,
  timeEngagement: null
};

const getters = {
  everyone: state => state.people,
  person: state => state.person,
  loading: state => state.loading,
  commute: state => state.commute,
  timeEngagement: state => state.timeEngagement
};

const actions = {
  async fetchPeople({ rootState, commit }) {
    commit('setPeople', null);
    commit('loadingTrue');
    const { token } = rootState.auth;
    const response = await OfficientApi.fetchPeople(token);
    commit('setPeople', response.data.data);
    commit('loadingFalse');
  },
  async fetchPerson({ rootState, commit }, id) {
    commit('setPerson', null);
    commit('loadingTrue');
    const { token } = rootState.auth;
    const response = await OfficientApi.fetchPerson(token, id);
    commit('setPerson', response.data.data);
    router.push('person/:id');
    commit('loadingFalse');
  },
  async fetchCommute({ rootState, commit }) {
    commit('setCommute', null);
    const { person } = rootState.people;
    const origin_data = `${person.address.line_1},${person.address.city},${person.address.country_code}`
    const origin = origin_data.replace(" ", "");
    const response = await GoogleAPI.fetchCommute(origin);
    const commute = response.data.routes[0].legs[0];
    console.log(commute);
    commit('setCommute', commute)
  },
  async fetchWages({ rootState, commit}) {
    commit('setWages', null);
    const { token } = rootState.auth;
    const id = rootState.people.person.id;
    const response = await OfficientApi.fetchWages(token, id);
    const timeEngagement = response.data.data.weekly_time_engagement_minutes;
    commit('setTimeEngagement', timeEngagement);
  }
};

const mutations = {
  setPeople: (state, people) => {
    state.people = people;
  },
  setPerson: (state, person) => {
    state.person = person;
  },
  setCommute: (state, commute) => {
    state.commute = commute;
  },
  setTimeEngagement: (state, timeEngagement) => {
    state.timeEngagement = timeEngagement;
  },
  loadingTrue(state) {
     state.loading = true
   },
   loadingFalse(state) {
     state.loading = false
   }
};

export default {
  state,
  getters,
  actions,
  mutations
};
