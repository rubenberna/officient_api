<template>
  <div class="container">
   {{ person.id }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PersonDetail',
  computed: mapGetters(['person'])
}
</script>

<style lang="css">
</style>
