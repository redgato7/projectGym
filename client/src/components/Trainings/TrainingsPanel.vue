<template>

  <panel title="Ćwiczenia">

    <v-btn
      slot="action"
      :to="{
        name: 'trainings-create'
      }"
      class="teal accent-3"
      light
      large
      absolute
      right
      middle
      fab>
      <v-icon>add</v-icon>
    </v-btn>

    <div class="scroll">

    <div
      v-for="training in trainings"
      class="training"
      :key="training.id">

        <v-layout>

          <v-flex xs6>
            <img class="album-image" :src="training.jakrobicUrl" />
          </v-flex>

          <v-flex xs12>
            <div class="training-title">
              {{training.title}}
            </div>
            <div class="training-autor">
              {{training.autor}}
            </div>
            <div class="grupaMiesniowa">
              {{training.grupaMiesniowa}}
            </div>
            <div class="angazowaneMiesnie">
              {{training.angazowaneMiesnie}}
            </div>

            <v-btn
              fab
              dark
              class="teal darken-2"
              :to="{
                name: 'training',
                params: {
                  trainingId: training.id
                }
              }">
              <v-icon large >pageview</v-icon>
            </v-btn>
          </v-flex>

        </v-layout>

    </div>

</div>
  </panel>


</template>


<script src="https://unpkg.com/vue"></script>
<script>
import TrainingsService from '@/services/TrainingsService'

export default {
  data () {
    return {
      trainings: null,
      currentPage: 0,
      pageSize: 3,
      visibleTrainings: []
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.trainings = (await TrainingsService.index(value)).data
      }
    }
  },
  methods: {
    scrollToEnd () {
      var container = document.querySelector('.scroll')
      var scrollHeight = container.scrollHeight
      container.scrollTop = scrollHeight
    }
  },
  mounted () {
    this.scrollToEnd()
  },
  updated () {
    this.scrollToEnd()
  }
}
</script>

<style scoped>
.training {
  padding: 10px;
  height: auto;
}

.training-title {
  font-size: 25px;
}

.training-autor {
  font-size: 18px;
}

.grupaMiesniowa {
  font-size: 15px;
}

.angazowaneMiesnie {
  font-size: 15px;
}

.album-image {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.scroll{
	width: auto;
  height: auto;
  max-height: 928px;
  overflow: auto;
	max-height: auto;
}
</style>
