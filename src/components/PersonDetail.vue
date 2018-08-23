<template>
  <div class="container">
    <appLoader :loading='loading' />
      {{ person }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from './Loader.vue'

export default {
  name: 'PersonDetail',
  computed: mapGetters(['person', 'loading']),
  components: {
    appLoader: Loader
  }
}
</script>

<style lang="css">
</style>
