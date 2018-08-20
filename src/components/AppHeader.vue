<template>
  <div class="app-header container">
    <h1>App Header</h1>
    <div class="app-header_sub">
      <p class="app-header_sub_intro">Things to say about this amazing app that is so great, so absolutely awsome, that even I have no words to describe it</p>
      <div class="right menu">
        <a href="#" class="ui item" @click="login">Login</a>
        <div class="item">
          <div class="ui icon input">
            <input type="text" placeholder="Search...">
            <i class="search link icon"></i>
          </div>
        </div>
        <div class="item">
          <a class="ui item logout">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'AppHeader',
    methods: mapActions(['login'])
  };
</script>

<style lang="scss" scoped>
  .app-header {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      border-bottom: 1px solid black;
      padding-top: 20px;

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
            .ui.item.logout {
              padding-left: 20px;
              font-weight: bold;
            }
          }
      }
  }
</style>

http://localhost:8080/oauth2/callback?code=c32ef15103bb0867a336808c794eb5ada05554ac&state=xyz
