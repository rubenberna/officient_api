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
        You're not logged in...
    </h2>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Loader from './Loader.vue';
  import moment from 'moment';

  export default {
    name: 'Person',
    data() {
      return {
        items: ['Bio', 'Contacts', 'Commute', 'Schedule'],
        active: 'Bio'
      };
    },
    computed: {
      ...mapGetters(['person', 'loading', 'isLoggedIn', 'commute', 'schedule'])
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
        // BIO info
        if (this.active === 'Bio')
          return `<p>${person.name} started working with us ${this.getStartDate(person)} as '${person.current_role.name}'.</p>
          <p>${this.getGender(person)} was born in ${this.getBirthday(person)} and is ${person.civil_state}.</p>`;

        // Contacts info
        if (this.active === 'Contacts')
          return `<p> Email: ${person.email} </p>
          <p>Phone: ${person.phone} </p>`;

        // Commute info
        if (this.active === 'Commute')
          return `<p> On a daily basis, ${person.name.split(' ')[0]} travels ${commute.distance.text} to come to work, with an average duration of ${commute.duration.text} per trip. </p>
          <p> ${person.name.split(' ')[0]} lives in ${person.address.city} and the transports used may include: ${this.getTransport(commute)}.</p>
          <p>The weekly commute extends to ${this.getWeeklyCommute(commute)} hours.</p>`;

        // Schedule info
        if (this.active === 'Schedule') {
          let timetable = [];
          for (let day in schedule) {
            let hour = schedule[day] / 60;
            const dayCap = day.replace(/^\w/, c => c.toUpperCase());
            timetable.push(`${dayCap}: ${hour} hours`)
          }
          const weekdays = timetable.splice(0, 5);
          return `<ul style="list-style-type:none; padding-left:6px">
                    <li>${weekdays[0]}</li>
                    <li>${weekdays[1]}</li>
                    <li>${weekdays[2]}</li>
                    <li>${weekdays[3]}</li>
                    <li>${weekdays[4]}</li>
                  </ul>`
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
        if (transports.length > 2) {
          const last = transports.pop();
          return `${transports.join(", ")} and ${last}`;
        }
        if (transports.length > 1) {
          const last = transports.pop();
          return `${transports} and ${last}`;
        }
        else transports;
      },
      getWeeklyCommute(commute) {
        const durationWeek = commute.duration.value * 10;
        const durationWeekText = moment().startOf('day')
          .seconds(durationWeek)
          .format('h:mm');
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
