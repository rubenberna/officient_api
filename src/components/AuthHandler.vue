<template>
  <div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import OfficientApi from '../api/officient';

  export default {
    name: 'AuthHandler',
    methods: {
      ...mapActions(['finalizeLogin']),
      oAuth() {
        OfficientApi.oAuth();
      }
    },
    created() {
      const auth_code = window.location.search;
      this.oAuth(auth_code);
    }
  };
</script>

<style lang="css" scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
