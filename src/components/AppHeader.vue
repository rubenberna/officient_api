<template>
  <div class="app-header container">
    <router-link to="/">
      <h1 class="app-header-title">App Header</h1></router-link>
    <div class="app-header_sub">
      <p class="app-header_sub_intro">Things to say about this amazing app that is so great, so absolutely awsome, that I have no words to describe it</p>
      <div class="right menu">
          <div v-if="isLoggedIn"
               class="loggedIn">
            <div class="ui icon input">
              <input type="text"
                     placeholder="Search...">
              <i class="search link icon"></i>
            </div>
            <a class="ui item logout"
               @click="logout">
               Logout
            </a>
          </div>
          <a v-else
             href="#"
             class="ui item"
             @click="login">Login</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'AppHeader',
    computed: mapGetters(['isLoggedIn']),
    methods: mapActions(['login', 'logout']),
  };
</script>

<style lang="scss" scoped>
  .app-header {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      border-bottom: 1px solid black;
      padding-top: 20px;

      .app-header-title {
        color: black;
      }

      .app-header_sub {
          display: flex;
          justify-content: space-between;
          padding: 10px 0 20px;
          .app-header_sub_intro {
            max-width: 300px;
          }
          .right.menu {
            display: flex;
            align-items: center;
            .ui.item {
              padding-left: 20px;
              font-size: 17px;
              color: inherit;
              font-weight: bold;
              text-decoration: none;
              cursor: pointer;
            }
          }
      }
  }
</style>
