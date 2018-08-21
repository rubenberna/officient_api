<template>
  <div class="">
    People List
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'PeopleList',
    methods: mapActions(['fetchPeople']),
    created() {
      this.fetchPeople();
    }
  }
</script>

<style lang="css" scoped>
</style>
