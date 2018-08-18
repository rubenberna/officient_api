<template>
  <div class="app-header container">
    <h1>App Header</h1>
    <div class="app-header_sub">
      <p class="app-header_sub_intro">Things to say about this amazing app that is so great, so absolutely awsome, that even I can do it</p>
      <div class="right menu">
        <div class="item">
          <div class="ui icon input">
            <input type="text" placeholder="Search...">
            <i class="search link icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppHeader'
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
      }
  }
</style>
