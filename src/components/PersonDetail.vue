<template>
  <div class="person-detail container">
    <div class="person-detail_loggedIn"
         v-if='isLoggedIn'>
         <appLoader :loading='loading'
         class="loader"/>
         <div class="person-detail-menu">
           <div class="person-detail-card">
             <img class="person-detail-menu-image ui medium circular image"
             :src="person.avatar">
             <h2>{{ person.name }}</h2>
           </div>

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
                  <div v-html='itemInfo(person, commute, schedule)'/>
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
import { mapActions, mapGetters } from 'vuex';
import Loader from './Loader.vue';
import moment from 'moment';

export default {
  name: 'PersonDetail',
  data() {
    return {
      items: ['Bio', 'Contacts', 'Commute', 'Schedule'],
      active: 'Bio',
    };
  },
  computed: {
    ...mapGetters(['person', 'loading', 'isLoggedIn', 'commute', 'schedule']),
  },
  methods: {
    ...mapActions(['fetchCommute', 'fetchWages']),
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      this.active = name;
    },
    itemInfo(person, commute, schedule) {
      if (this.active === 'Bio')
      return `${person.name} started working with us ${this.getStartDate(person)} as ${person.current_role.name}.
      ${this.getGender(person)} and was born in ${this.getBirthday(person)} and is ${person.civil_state}.`;

      if (this.active === 'Contacts')
        return `Email: ${person.email}
        Phone: ${person.phone}`;

      if (this.active === 'Commute')
      return `On a daily basis, ${person.name.split(' ')[0]} travels ${commute.distance.text} to come to work, with an average duration of ${commute.duration.text} per trip. The transports used may include: ${this.getTransport(commute)}. The weekly commute extends to ${this.getWeeklyCommute(commute)}`;

      if (this.active === 'Schedule') {
        let timetable = [];
        for (let day in schedule) {
          let hour = schedule[day] / 60;
          timetable.push(`${day}: ${hour} hours`)
        }
        const weekdays = timetable.splice(0, 5);
        return weekdays
      }
    },
    getBirthday(person) {
      return moment(person.birthdate).format("MMM Do YYYY");
    },
    getGender(person) {
      return person.gender === 'female' ? 'She' : 'He';
    },
    getStartDate(person) {
      return moment(person.current_role.start_date, "YYYYMMDD").fromNow();
    },
    getTransport(commute) {
      const steps = commute.steps;
      let transports = [];
      for (let i = 0; i < steps.length; i++) {
        let entry = steps[i];
        if (entry.travel_mode === "TRANSIT") {
          transports.push(entry.html_instructions);
        }
      }
      return transports;
    },
    getWeeklyCommute(commute) {
      const durationWeek = commute.duration.value * 10;
      const durationWeekText = moment().startOf('day')
        .seconds(durationWeek)
        .format('h:mm:ss');
      return durationWeekText;
    }
  },
  mounted() {
    this.fetchCommute();
    this.fetchWages();
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

  .person-detail-card {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #5c5757;
  }
  .person-detail-menu-image.ui.medium.circular.image {
    width: 334px;
    background: linear-gradient(to right, #5d4157, #a8caba);
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
