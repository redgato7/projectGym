

<template>

 <v-container grid-list-md text-xs-center mb-5>

  <v-layout row wrap>

    <v-flex xs12 sm12 md12 lg12>

        <training-metadata class="mb-2" :training="training" />

    </v-flex>

    <v-flex xs12 sm12 md12 lg12>

        <you-tube class="mb-2" :youtubeId="training.youtubeId" />

    </v-flex>

    <v-flex xs12 sm12 md12 lg6>

        <tab class="mb-2" :training="training" />

    </v-flex>

    <v-flex xs12 sm12 md12 lg6>

        <lyrics :training="training" />

    </v-flex>


  </v-layout>

</v-container>

</template>

<script>
import {mapState} from 'vuex'
import Lyrics from './Lyrics'
import Tab from './Tab'
import TrainingMetadata from './TrainingMetadata'
import YouTube from './YouTube'
import TrainingsService from '@/services/TrainingsService'
import TrainingHistoriesService from '@/services/TrainingHistoriesService'

export default {
  data () {
    return {
      training: {}
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
    const trainingId = this.route.params.trainingId
    this.training = (await TrainingsService.show(trainingId)).data

    if (this.isUserLoggedIn) {
      TrainingHistoriesService.post({
        trainingId: trainingId
      })
    }
  },
  components: {
    TrainingMetadata,
    YouTube,
    Lyrics,
    Tab
  }
}
</script>

<style scoped>
</style>
