import api from '../../api/officient';

const state = {
  people: [],
  person: null,
  loading: false
};

const getters = {
  everyone: state => state.people,
  loading: state => state.loading
};

const actions = {
  async fetchPeople({ rootState, commit }) {
    commit('loadingTrue');
    const { token } = rootState.auth;
    const response = await api.fetchPeople(token);
    commit('setPeople', response.data.data);
    commit('loadingFalse');
  },
  async fetchPerson({ rootState, commit }, id) {
    const { token } = rootState.auth;
    const response = await api.fetchPerson(token, id);
    console.log(response.data.data);
    commit('setPerson', response.data.data);
    // router.push('person/id');
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
