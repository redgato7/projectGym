<template>
  <panel title="Kalkulator spalania kalorii">

    <div class="opis">
      Kalkulator spalania kalorii, jest to narzędzie, które ukazuje,
      ile wydatkujemy energii, podczas wykonywanych aktywności fizycznych.

    </div>

    <v-btn
      @click="dialog = true"
      class="teal accent-3"
      light

    >
      <v-icon>accessibility</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="500"
    >

      <v-card class="form">

        <v-card-title
          class="form-title"
          primary-title

        >
          Kalkulator spalania kalorii
        </v-card-title>



<v-select
  v-model="select"
  @input="okejka"
  :items="items"
  item-text="state"
  label="Waga"
  persistent-hint
  return-object
  single-line
></v-select>

<v-select
  v-model="selected"
  @input="okejka"
  :items="items2"
  item-text="state"
  label="Aktywność"
  persistent-hint
  return-object
  single-line
></v-select>

        <v-text-field
          :value="form.iloscCzasu"
          v-model="form.iloscCzasu"
          name="iloscKLat"
          id="iloscCzasu"
          @keyup.enter="updateCzasu"
          @blur="updateCzasu"
          @input.native="updateCzasu"
          maxlength="3"
          label="Ilość czasu [min]"

        ></v-text-field>


        <v-text-field
          disabled
          v-model="form.total"
          step="any"
          class="form-control"
          name="total"
          id="total"
          maxlength="4"
          label="Ilość spalonych kcal"
          readonly
        ></v-text-field>



        <v-card-actions class="form-button">

          <v-spacer>

          </v-spacer>

          <v-tooltip top>
          <v-btn
            slot="activator"
            dark
            class="teal darken-2"
            @click="reset"
            >
            reset
          </v-btn>
          <span>Wyczyść formę</span>
          </v-tooltip>

          <v-tooltip top>
          <v-btn
            slot="activator"
            dark
            class="teal darken-2"
            @click="dialog = false"
            >
            Zamknij
          </v-btn>
          <span>Kliknij poza formę.</span>
          </v-tooltip>


          <v-spacer>

          </v-spacer>

        </v-card-actions>


      </v-card>

      </v-dialog>
  </panel>
</template>

<script>
import round from 'vue-round-filter'
export default {
  data () {
    return {
      dialog: false,
      form: {
        iloscCzasu: '',
        total: ''
      },
      items2: [
          { state: 'Podnoszenie ciężarów', wzor1_2: '90' },
          { state: 'Aerobik wodny', wzor1_2: '120' },
          { state: 'Yoga', wzor1_2: '120' },
          { state: 'Kalistenika', wzor1_2: '135' },
          { state: 'Jeździectwo', wzor1_2: '150' },
          { state: 'Aerobik (słaba intensywność)', wzor1_2: '165' },
          { state: 'Aerobik (duża intensywność)', wzor1_2: '210' },
          { state: 'Rowerek stacjonarny', wzor1_2: '210' },
          { state: 'Piłka nożna', wzor1_2: '210' },
          { state: 'Koszykówka', wzor1_2: '240' },
          { state: 'Wspinaczka górska', wzor1_2: '180' },
          { state: 'Hokej', wzor1_2: '240' },
          { state: 'Siatkówka', wzor1_2: '240' },
          { state: 'Boks', wzor1_2: '270' },
          { state: 'Skakanka', wzor1_2: '300' },
          { state: 'Pływanie (duża intensywność)', wzor1_2: '300' },
          { state: 'Bieganie (8km/h)', wzor1_2: '330' },
          { state: 'Bieganie (11km/h)', wzor1_2: '435' },
          { state: 'Jazda na rowerze (25km/h)', wzor1_2: '495' },
          { state: 'Wrestling', wzor1_2: '180' }
      ],
      items: [
          { state: 'Lekka (poniżej 60kg)', wzor1: '1' },
          { state: 'Średnia (około 70kg)', wzor1: '1.25' },
          { state: 'Ciężka (powyżej 80kg)', wzor1: '1.5' }
      ]
    }
  },
  filters: {
    round
  },
  methods: {
    updateCzasu (event) {
      this.form.iloscCzasu = event.target.value
      this.form.total = ((this.form.iloscCzasu * this.selected.wzor1_2) / 30) * this.select.wzor1
    },
    okejka () {
      this.form.total = ((this.form.iloscCzasu * this.selected.wzor1_2) / 30) * this.select.wzor1
    },
    reset () {
      this.form.iloscCzasu = ''
      this.selected = ''
      this.select = ''
      this.form.total = ''
    },
    async cofniecie () {
      try {
        this.$router.go(this.$router.currentRoute)
      } catch (err) {
        console.log(err)
      }
    }
  }
}

</script>

<style scoped>
@media (min-width: 100px) { /* sm */
    .form-button {
      margin-top: 20px;
    }
}

@media (min-width: 600px) { /* sm */
    .form-button {
      margin-top: 20px;
      margin-left: 54%;
    }
}

@media (min-width: 992px) { /* md */
  .form-button {
    margin-top: 20px;
    margin-left: 54%;
  }
}

@media (min-width: 1200px) { /* lg */
  .form-button {
    margin-top: 20px;
    margin-left: 54%;
  }
}

.form-title{
  font-size: 30px;
  display:inline-block;
  color: #00796B;
  margin-bottom: 30px;
  border-bottom: solid;
}

.form-title2{
  font-size: 30px;
  display:inline-block;
  color: #00796B;
  margin-bottom: 30px;
  border-bottom: solid;
}

.form{
padding-left: 20px;
padding-right: 20px;
padding-bottom: 20px;

}

.opis{
min-height: 100px;
display: block;
margin-top: 1em;
margin-bottom: 1em;
margin-left: 0;
margin-right: 0
}

.form-opis{
font-size: 20px;
display:inline-block;
color: #00796B;

}

.kcal{
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0
}


</style>
