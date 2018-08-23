import api from '../../api/officient';

const state = {
  people: [],
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
  }
};

const mutations = {
  setPeople: (state, people) => {
    state.people = people;
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
