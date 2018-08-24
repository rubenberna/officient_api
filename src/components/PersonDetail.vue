<template>
  <div class="person-detail container">
    <div class="person-detail_loggedIn"
         v-if='isLoggedIn'>
         <appLoader :loading='loading'
         class="loader"/>
         <div class="person-detail-menu">
           <img class="person-detail-menu-image ui medium circular image"
           :src="person.avatar">

           <sui-grid>
              <sui-grid-column :width="4">
                <sui-menu fluid vertical tabular>
                  <a
                    v-for="item in items"
                    :key="item"
                    is="sui-menu-item"
                    :content="item"
                    :active="isActive(item)"
                    @click="select(item)"
                  />
                </sui-menu>
              </sui-grid-column>

              <sui-grid-column stretched :width="12">
                <sui-segment>
                  {{ itemInfo(person) }}

                </sui-segment>
              </sui-grid-column>
            </sui-grid>
         </div>
    </div>
    <h2 v-else
      class="container">
      You're not logged in...</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from './Loader.vue';
import SuiVue from 'semantic-ui-vue';

export default {
  name: 'PersonDetail',
  data() {
    return {
      items: ['Bio', 'Contacts', 'Commute', 'Wages'],
      active: 'Bio',
    };
  },
  methods: {
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      this.active = name;
    },
    itemInfo(person) {
      if (this.active === 'Bio') return`${person.name} started in ${person.current_role.start_date} as ${person.current_role.name}.`;
      if (this.active === 'Contacts') return `Email: ${person.email} Phone: ${person.phone}`;
    }
  },
  computed: {
    ...mapGetters(['person', 'loading', 'isLoggedIn']),
    gender(person) {
      if (person.gender === 'female') return "she";
      else "he";
    }
  },
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

  .ui.segment {
    width: 450px;
  }

  .loader {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -100px;
  }
</style>
