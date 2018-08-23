<template>
  <div class="container">
    <div v-if="isLoggedIn" class="people-list">
      <table class="ui very basic collapsing celled table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Email address</th>
          </tr>
        </thead>
        <tbody v-for='(person, i) in everyone' :key='`person-${i}`'>
          <tr @click.prevent='personDetail(person)'>
            <td>
              <h4 class="ui image header">
                <i class="address card icon"></i>
                <div class="content">
                  {{ person.name }}
                  <div class="sub header">{{ person.role_name }}</div>
                </div>
              </h4>
            </td>
            <td>
              {{ person.email}}
            </td>
          </tr>
        </tbody>
      </table>
      <appLoader :loading='loading' />
    </div>
      <h1 v-else>Please login to get started</h1>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Loader from './Loader.vue'

  export default {
    name: 'PeopleList',
    components: {
      appLoader: Loader
    },
    computed: mapGetters(['everyone', 'isLoggedIn', 'loading']),
    methods: {
      ...mapActions(['fetchPeople', 'fetchPerson']),
      personDetail(person) {
        this.fetchPerson(person.id);
      }
    },
    created() {
      this.fetchPeople();
    }
  }
</script>

<style lang="css" scoped>
  .container {
    margin-top: 55px;
  }

  th {
    font-size: 16px;
    border-top: 0px;
  }

  tr:hover {
    background-color: #f7f7f7;
    cursor: pointer;
  }
  i {
    color: #62929a;
  }
</style>
