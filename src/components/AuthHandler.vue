<template>
  <div class="container">
    Please wait...
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import api from '../api/officient';

  export default {
    name: 'AuthHandler',
    methods: {
      ...mapActions(['finalizeLogin']),
      oAuth() {
        api.oAuth();
      }
    },
    created() {
      const auth_code = window.location.search;
      this.oAuth(auth_code);
    }
  };
</script>

<style lang="css" scoped>
</style>



//   import { mapActions } from 'vuex';
//
//   export default {
//     name: 'AuthHandler',
//     methods: mapActions(['finalizeLogin']),
//     created() {
//       this.finalizeLogin(window.location.search);
//     }
//   };
