<template>
<v-container grid-list-md text-xs-center>
  <v-layout row wrap mb-4>
    <v-flex xs12 sm12 md6 lg6>
      <panel title="Edycja ćwiczenia">
        <v-text-field
          maxlength="45"
          counter="45"
          label="Tytul"
          :rules="[required]"
          v-model="training.title"
        ></v-text-field>

        <v-text-field
          maxlength="30"
          counter="30"
          label="Autor"
          :rules="[required]"
          v-model="training.autor"
        ></v-text-field>

        <v-text-field
          maxlength="50"
          counter="50"
          label="Grupa mięśniowa"
          :rules="[required]"
          v-model="training.grupaMiesniowa"
        ></v-text-field>

        <v-text-field
          maxlength="100"
          counter="100"
          label="Angażowane mięśnie"
          :rules="[required]"
          v-model="training.angazowaneMiesnie"
        ></v-text-field>

        <v-text-field
          maxlength="250"
          counter="250"
          label="URL"
          :rules="[required]"
          v-model="training.jakrobicUrl"
        ></v-text-field>

        <v-text-field
          maxlength="100"
          counter="100"
          label="YouTube ID"
          :rules="[required]"
          v-model="training.youtubeId"
        ></v-text-field>

      </panel>
    </v-flex>

    <v-flex xs12 sm12 md6 lg6>
      <panel title="Struktura ćwiczenia">
        <v-text-field
          maxlength="2000"
          counter="2000"
          label="Uwagi"
          multi-line
          :rules="[required]"
          v-model="training.tab"
        ></v-text-field>

        <v-text-field
        maxlength="2000"
        counter="2000"
        label="Opis ćwiczenia"
        multi-line
        :rules="[required]"
        v-model="training.opis"
        ></v-text-field>

      </panel>

      <div class="danger-alert" v-if="error">
        {{error}}
      </div>

      <v-btn
        large
        dark
        class="teal darken-2"
        @click="save">
        Edytuj Ćwiczenie
      </v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import TrainingsService from '@/services/TrainingsService'

export default {
  data () {
    return {
      training: {
        title: null,
        autor: null,
        grupaMiesniowa: null,
        angazowaneMiesnie: null,
        jakrobicUrl: null,
        youtubeId: null,
        opis: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Pole wymagane.'
    }
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.training)
        .every(key => !!this.training[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Wypełnij wymagane pola.'
        return
      }

      const trainingId = this.$store.state.route.params.trainingId
      try {
        await TrainingsService.put(this.training)
        this.$router.push({
          name: 'training',
          params: {
            trainingId: trainingId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const trainingId = this.$store.state.route.params.trainingId
      this.training = (await TrainingsService.show(trainingId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>

</style>
