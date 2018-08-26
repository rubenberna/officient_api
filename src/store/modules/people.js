import OfficientApi from '../../api/officient';
import GoogleAPI from '../../api/google';
import { router } from '../../main';

const state = {
  people: [],
  person: null,
  loading: false,
  commute: null
};

const getters = {
  everyone: state => state.people,
  person: state => state.person,
  loading: state => state.loading,
  commute: state => state.commute
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
    const origin = `${person.address.city},${person.address.country_code}`
    const response = await GoogleAPI.fetchCommute(origin);
    // console.log(response);
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
