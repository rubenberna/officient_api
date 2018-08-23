<template>
  <div class="person-detail container">
    <div class="person-detail_loggedIn"
         v-if='isLoggedIn'>
         <appLoader :loading='loading'
         class="loader"/>
         {{ person }}
    </div>
    <h2 v-else
      class="container">You're not logged in...</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from './Loader.vue'

export default {
  name: 'PersonDetail',
  computed: mapGetters(['person', 'loading', 'isLoggedIn']),
  components: {
    appLoader: Loader
  }
}
</script>

<style lang="css">
  .loader {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -100px;
  }
</style>
