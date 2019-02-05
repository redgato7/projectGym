<template>
  <panel title="Charakterystyka ćwiczenia">
    <v-layout>
      <v-flex xs10 sm12 md12 lg12>

        <v-subheader>Nazwa treningu: &nbsp;
           <strong>{{training.title}}</strong> </v-subheader>

        <v-subheader>Autor treningu: &nbsp;
            <strong>{{training.autor}}</strong> </v-subheader>

        <v-subheader>Grupa mięśniowa: &nbsp;
            <strong>{{training.grupaMiesniowa}}</strong> </v-subheader>

        <v-subheader>Angażowane mięśnie: &nbsp;
            <strong>{{training.angazowaneMiesnie}}</strong> </v-subheader>


      </v-flex>

      <v-flex xs2 sm12 md12 lg12>
        <img :src="training.jakrobicUrl" />
        <br>
        {{training.album}}

        <v-tooltip left>
        <v-btn
          slot="activator"
          fab
          dark
          class="teal darken-1"
          :to="{
            name: 'training-edit',
            params () {
              return {
                trainingId: training.id
              }
            }
          }">
            <v-icon>edit</v-icon>
        </v-btn>
        <span>Edytuj ćwiczenie</span>
        </v-tooltip>

        <v-tooltip top>
        <v-btn
          fab
          slot="activator"
          v-if="isUserLoggedIn && !trainingbookmark"
          dark
          class="teal darken-1"
          @click="setAsTrainingBookmark">
        <v-icon>favorite</v-icon>
        </v-btn>
        <span>Dodaj do ulubionych</span>
      </v-tooltip>


        <v-tooltip top>
        <v-btn
          slot="activator"
          fab
          v-if="isUserLoggedIn && trainingbookmark"
          dark
          class="teal darken-1"
          @click="unsetAsTrainingBookmark">
          <v-icon>delete</v-icon>
        </v-btn>
        <span>Usuń z ulubionych</span>
      </v-tooltip>

      <v-tooltip right>
      <v-btn
        slot="activator"
        fab
        dark
        class="teal darken-1"
        @click="unsetAsTraining"
        >
        <v-icon>delete_forever</v-icon>
      </v-btn>
      <span>Usuń ćwiczenie</span>
    </v-tooltip>

      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import TrainingBookmarksService from '@/services/TrainingBookmarksService'
import TrainingsService from '@/services/TrainingsService'

export default {
  props: [
    'training'
  ],
  data () {
    return {
      trainingbookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async training () {
      if (!this.isUserLoggedIn) {
        return
      }

      try {
        const trainingbookmarks = (await TrainingBookmarksService.index({
          trainingId: this.training.id
        })).data
        if (trainingbookmarks.length) {
          this.trainingbookmark = trainingbookmarks[0]
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async setAsTrainingBookmark () {
      try {
        this.trainingbookmark = (await TrainingBookmarksService.post({
          trainingId: this.training.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsTrainingBookmark () {
      try {
        await TrainingBookmarksService.delete(this.trainingbookmark.id)
        this.trainingbookmark = null
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsTraining () {
      try {
        await TrainingsService.delete(this.training.id)
        this.training = null
        this.$router.push({
          name: 'trainings'
        })
        await TrainingBookmarksService.delete(this.trainingbookmark.id)
        this.trainingbookmark = null
        this.$router.push({
          name: 'trainings'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.training-title {
  font-size: 30px;
}

.training-autor {
  font-size: 24px;
}

.training-grupamiesniowa {
  font-size: 18px;
}

.training-anagowanemiesnie {
  font-size: 18px;
}

img { /* xs */
  width: 60px;
  height: 60px;
}

@media (min-width: 768px) { /* sm */
    img {
        width: 180px;
        height: 180px;
    }
}

@media (min-width: 992px) { /* md */
    img {
        width: 240px;
        height: 240px;
    }
}

@media (min-width: 1200px) { /* lg */
    img {
        width: 300px;
        height: 300px;
    }
}
</style>
