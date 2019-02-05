<template>

 <v-container grid-list-md text-xs-center mb-5>

  <v-layout row wrap>

    <v-flex :class="{
        xs12, sm12, md12, lg12: !isUserLoggedIn
      }">

      <v-card class="mb-2">

        <diets-search-panel />

      </v-card>

      <v-card class="mb-2" v-if="isUserLoggedIn">

        <diets-bookmarks  />

      </v-card>

      <v-card v-if="isUserLoggedIn">

        <recently-viewed-diets />

      </v-card>

    </v-flex>

    <v-flex :class="{
        xs12, sm12, md12, lg12: !isUserLoggedIn
      }">

      <v-card class="">


        <diets-panel />


      </v-card>

    </v-flex>

  </v-layout>

</v-container>

</template>

<script>
import DietsPanel from './DietsPanel'
import DietsBookmarks from './DietsBookmarks'
import RecentlyViewedDiets from './RecentlyViewedDiets'
import DietsSearchPanel from './DietsSearchPanel'
import DietsService from '@/services/DietsService'
import {mapState} from 'vuex'

export default {
  components: {
    DietsPanel,
    DietsSearchPanel,
    DietsBookmarks,
    RecentlyViewedDiets
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      diets: null
    }
  },
  async mounted () {
    this.diets = (await DietsService.index()).data
  }
}

</script>

<style scoped>

</style>
