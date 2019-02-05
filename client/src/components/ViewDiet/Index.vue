

<template>

 <v-container grid-list-md text-xs-center mb-5>

  <v-layout row wrap>

    <v-flex xs12 sm12 md12 lg12>

        <diet-metadata class="mb-2" :diet="diet" />

    </v-flex>

    <v-flex xs12 sm12 md12 lg12>

        <you-tube class="mb-2" :youtubeId="diet.youtubeId" />

    </v-flex>

    <v-flex xs12 sm12 md12 lg6>

        <tab class="mb-2" :diet="diet" />

    </v-flex>

    <v-flex xs12 sm12 md12 lg6>

        <lyrics :diet="diet" />

    </v-flex>


  </v-layout>

</v-container>

</template>

<script>
import {mapState} from 'vuex'
import Lyrics from './Lyrics'
import Tab from './Tab'
import DietMetadata from './DietMetadata'
import YouTube from './YouTube'
import DietsService from '@/services/DietsService'
import DietHistorieService from '@/services/DietHistorieService'

export default {
  data () {
    return {
      diet: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  async mounted () {
    const dietId = this.route.params.dietId
    this.diet = (await DietsService.show(dietId)).data

    if (this.isUserLoggedIn) {
      DietHistorieService.post({
        dietId: dietId
      })
    }
  },
  components: {
    DietMetadata,
    YouTube,
    Lyrics,
    Tab
  }
}
</script>

<style scoped>
</style>
