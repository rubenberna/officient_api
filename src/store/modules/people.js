import OfficientApi from '../../api/officient';
import { router } from '../../main';

const state = {
  people: [],
  person: null,
  loading: false
};

const getters = {
  everyone: state => state.people,
  person: state => state.person,
  loading: state => state.loading
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
    router.push('person/id');
    const response = await OfficientApi.fetchPerson(token, id);
    console.log(response.data.data);
    commit('setPerson', response.data.data);
    commit('loadingFalse');
  }
};

const mutations = {
  setPeople: (state, people) => {
    state.people = people;
  },
  setPerson: (state, person) => {
    state.person = person;
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
