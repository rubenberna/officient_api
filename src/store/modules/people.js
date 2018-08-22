import api from '../../api/officient';

const state = {
  people: []
};

const getters = {
  everyone: state => state.people
};

const actions = {
  async fetchPeople({ rootState }) {
    const { token } = rootState.auth;
    const response = await api.fetchPeople(token);
    // console.log(response);
  }
};

const mutations = {
  setPeople: (state, people) => {
    state.people = people;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
