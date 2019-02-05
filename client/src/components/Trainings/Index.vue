<template>

 <v-container grid-list-md text-xs-center mb-5>

  <v-layout row wrap>

    <v-flex :class="{
        xs12, sm12, md12, lg12: !isUserLoggedIn
      }">

      <v-card class="mb-2">

        <trainings-search-panel />

      </v-card>

      <v-card class="mb-2" v-if="isUserLoggedIn">

        <trainings-bookmarks  />

      </v-card>

      <v-card v-if="isUserLoggedIn">

        <recently-viewed-trainings />

      </v-card>

    </v-flex>

    <v-flex :class="{
        xs12, sm12, md12, lg12: !isUserLoggedIn
      }">

      <v-card class="">


        <trainings-panel />


      </v-card>

    </v-flex>

  </v-layout>

</v-container>

</template>

<script>
import TrainingsPanel from './TrainingsPanel'
import TrainingsBookmarks from './TrainingsBookmarks'
import RecentlyViewedTrainings from './RecentlyViewedTrainings'
import TrainingsSearchPanel from './TrainingsSearchPanel'
import TrainingsService from '@/services/TrainingsService'
import {mapState} from 'vuex'

export default {
  components: {
    TrainingsPanel,
    TrainingsSearchPanel,
    TrainingsBookmarks,
    RecentlyViewedTrainings
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      trainings: null
    }
  },
  async mounted () {
    this.trainings = (await TrainingsService.index()).data
  }
}
</script>

<style scoped>

</style>
