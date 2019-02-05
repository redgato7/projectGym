<template>
<v-container grid-list-md text-xs-center>
  <v-layout row wrap mb-5>
    <v-flex xs12 sm12 md6 lg6>
      <panel title="Edycja dania">
        <v-text-field
          maxlength="45"
          counter="45"
          label="Tytul"
          :rules="[required]"
          v-model="diet.title"
        ></v-text-field>

        <v-text-field
          maxlength="30"
          counter="30"
          label="Autor"
          :rules="[required]"
          v-model="diet.autor"
        ></v-text-field>

        <v-text-field
          maxlength="50"
          counter="50"
          label="Typ dania"
          :rules="[required]"
          v-model="diet.typDania"
        ></v-text-field>

        <v-text-field
          maxlength="100"
          counter="100"
          label="Skladniki"
          :rules="[required]"
          v-model="diet.skladniki"
        ></v-text-field>

        <v-text-field
          maxlength="4"
          counter="4"
          label="Ilosc kcal"
          :rules="[required]"
          v-model="diet.kcal"
        ></v-text-field>

        <v-text-field
          maxlength="3"
          counter="3"
          label="Ilosc bialka [g]"
          :rules="[required]"
          v-model="diet.bialko"
        ></v-text-field>

        <v-text-field
          maxlength="3"
          counter="3"
          label="Ilosc węglowodanów [g]"
          :rules="[required]"
          v-model="diet.weglowodany"
        ></v-text-field>

        <v-text-field
          maxlength="3"
          counter="3"
          label="Ilosc tluszczy [g]"
          :rules="[required]"
          v-model="diet.tluszcze"
        ></v-text-field>

        <v-text-field
          maxlength="3"
          counter="3"
          label="Ilosc blonnika [g]"
          :rules="[required]"
          v-model="diet.blonnik"
        ></v-text-field>

        <v-text-field
          maxlength="250"
          counter="250"
          label="URL"
          :rules="[required]"
          v-model="diet.jakrobicUrl"
        ></v-text-field>

        <v-text-field
          maxlength="100"
          counter="100"
          label="YouTube ID"
          :rules="[required]"
          v-model="diet.youtubeId"
        ></v-text-field>

      </panel>
    </v-flex>

    <v-flex xs12 sm12 md6 lg6>
      <panel title="Struktura dania">
        <v-text-field
          maxlength="2000"
          counter="2000"
          label="Uwagi"
          multi-line
          :rules="[required]"
          v-model="diet.tab"
        ></v-text-field>

        <v-text-field
        maxlength="2000"
        counter="2000"
        label="Opis dania"
        multi-line
        :rules="[required]"
        v-model="diet.opis"
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
        Edytuj Danie
      </v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import DietsService from '@/services/DietsService'

export default {
  data () {
    return {
      diet: {
        title: null,
        autor: null,
        typDania: null,
        skladniki: null,
        kcal: null,
        bialko: null,
        weglowodany: null,
        tluszcze: null,
        blonnik: null,
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
        .keys(this.diet)
        .every(key => !!this.diet[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Wypełnij wymagane pola.'
        return
      }

      const dietId = this.$store.state.route.params.dietId
      try {
        await DietsService.put(this.diet)
        this.$router.push({
          name: 'diet',
          params: {
            dietId: dietId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const dietId = this.$store.state.route.params.dietId
      this.diet = (await DietsService.show(dietId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
</style>
