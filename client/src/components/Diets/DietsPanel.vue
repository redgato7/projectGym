<template>

  <panel title="Dania">

    <v-btn
      slot="action"
      :to="{
        name: 'diets-create'
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
      v-for="diet in diets"
      class="diet"
      :key="diet.id">

        <v-layout>

          <v-flex xs6>
            <img class="album-image" :src="diet.jakrobicUrl" />
          </v-flex>

          <v-flex xs12>
            <div class="diet-title">
              {{diet.title}}
            </div>
            <div class="diet-autor">
              {{diet.autor}}
            </div>
            <div class="diet-typDania">
              {{diet.typDania}}
            </div>
            <div class="diet-skladniki">
              {{diet.skladniki}}
            </div>

            <v-btn
              fab
              dark
              class="teal darken-2"
              :to="{
                name: 'diet',
                params: {
                  dietId: diet.id
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
import DietsService from '@/services/DietsService'

export default {
  data () {
    return {
      diets: null,
      currentPage: 0,
      pageSize: 3,
      visibleDiets: []
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.diets = (await DietsService.index(value)).data
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
.diet {
  padding: 10px;
  height: auto;
}

.diet-title {
  font-size: 25px;
}

.diet-autor {
  font-size: 18px;
}

.diet-typDania {
  font-size: 15px;
}

.diet-skladniki {
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
