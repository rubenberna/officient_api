<template>
  <div>
    <AppHeader> </AppHeader>
    <keep-alive><router-view></router-view></keep-alive>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader
  }
};

</script>
