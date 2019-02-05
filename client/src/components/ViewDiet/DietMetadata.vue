<template>
  <panel title="Charakterystyka dania">
    <v-layout>
      <v-flex xs10 sm12 md12 lg12>

        <v-subheader>Nazwa dania: &nbsp;
           <strong>{{diet.title}}</strong> </v-subheader>

        <v-subheader>Autor dania: &nbsp;
            <strong>{{diet.autor}}</strong> </v-subheader>

        <v-subheader>Typ dania: &nbsp;
            <strong>{{diet.typDania}}</strong> </v-subheader>

        <v-subheader>Składniki dania: &nbsp;
            <strong>{{diet.skladniki}}</strong> </v-subheader>

        <v-subheader>Ilość kalorii w 100 g produktu: &nbsp;
           <strong>{{diet.kcal}} kcal</strong> </v-subheader>

        <v-subheader>Ilość białka w 100 g produktu: &nbsp;
            <strong>{{diet.bialko}} g</strong> </v-subheader>

        <v-subheader>Ilość węglowodanów w 100 g produktu: &nbsp;
             <strong>{{diet.weglowodany}} g</strong> </v-subheader>

        <v-subheader>Ilość tłuszczy w 100 g produktu: &nbsp;
            <strong>{{diet.tluszcze}} g</strong> </v-subheader>

        <v-subheader>Ilość błonnika w 100 g produktu: &nbsp;
            <strong>{{diet.blonnik}} g</strong> </v-subheader>

      </v-flex>

      <v-flex xs2 sm12 md12 lg12>
        <img :src="diet.jakrobicUrl" />
        <br>
        {{diet.album}}

        <v-tooltip left>
        <v-btn
          slot="activator"
          fab
          dark
          class="teal darken-1"
          :to="{
            name: 'diet-edit',
            params () {
              return {
                dietId: diet.id
              }
            }
          }">
            <v-icon>edit</v-icon>
        </v-btn>
        <span>Edytuj danie</span>
        </v-tooltip>

        <v-tooltip top>
        <v-btn
          fab
          slot="activator"
          v-if="isUserLoggedIn && !dietbookmark"
          dark
          class="teal darken-1"
          @click="setAsDietBookmark">
        <v-icon>favorite</v-icon>
        </v-btn>
        <span>Dodaj do ulubionych</span>
      </v-tooltip>


        <v-tooltip top>
        <v-btn
          slot="activator"
          fab
          v-if="isUserLoggedIn && dietbookmark"
          dark
          class="teal darken-1"
          @click="unsetAsDietBookmark">
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
        @click="unsetAsDiet"
        >
        <v-icon>delete_forever</v-icon>
      </v-btn>
      <span>Usuń danie</span>
    </v-tooltip>

      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import DietBookmarksService from '@/services/DietBookmarksService'
import DietsService from '@/services/DietsService'

export default {
  props: [
    'diet'
  ],
  data () {
    return {
      dietbookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async diet () {
      if (!this.isUserLoggedIn) {
        return
      }

      try {
        const dietbookmarks = (await DietBookmarksService.index({
          dietId: this.diet.id
        })).data
        if (dietbookmarks.length) {
          this.dietbookmark = dietbookmarks[0]
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async setAsDietBookmark () {
      try {
        this.dietbookmark = (await DietBookmarksService.post({
          dietId: this.diet.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsDietBookmark () {
      try {
        await DietBookmarksService.delete(this.dietbookmark.id)
        this.dietbookmark = null
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsDiet () {
      try {
        await DietsService.delete(this.diet.id)
        this.diet = null
        this.$router.push({
          name: 'diets'
        })
        await DietBookmarksService.delete(this.dietbookmark.id)
        this.dietbookmark = null
        this.$router.push({
          name: 'diets'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

.diet-title {
  font-size: 30px;
}

.diet-autor {
  font-size: 24px;
}

.diet-typDania {
  font-size: 18px;
}

.diet-skladniki {
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
