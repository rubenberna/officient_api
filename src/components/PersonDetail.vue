<template>
  <div class="person-detail container">
    <div class="person-detail_loggedIn"
         v-if='isLoggedIn'>
         <appLoader :loading='loading'
         class="loader"/>
         <div class="person-detail-menu">
           <img class="person-detail-menu-image ui medium circular image"
           :src="person.avatar">

           <div class="ui grid">
            <div class="four wide column">
              <div class="ui vertical fluid tabular menu">
                <a class="item active">
                  Bio
                </a>
                <a class="item">
                  Pics
                </a>
                <a class="item">
                  Companies
                </a>
                <a class="item">
                  Links
                </a>
              </div>
            </div>
            <div class="twelve wide stretched column">
              <div class="ui segment">
                This is an stretched grid column. This segment will always match the tab height
              </div>
            </div>
          </div>

         </div>
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

<style lang="css" scoped>
  .person-detail {
    margin-top: 100px;

  }

  .person-detail-menu {
    display: flex;
    justify-content: space-around;
  }

  .person-detail-menu-image.ui.medium.circular.image {
    width: 334px;
  }

  .loader {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -100px;
  }
</style>
