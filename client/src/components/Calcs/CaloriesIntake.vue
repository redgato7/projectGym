<template>
  <panel title="Kalkulator zapotrzebowania kalorii">

    <div class="opis">
      Oblicz ile kalorii dziennie potrzebuje twój organizm w zależności od Twojego wieku, wzrostu,
      wagi i trybu życia oraz jaki jest twój wskaźnik BMR.

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
          Kalkulator zapotrzebowania kalorycznego
        </v-card-title>



<v-select
  v-model="select"
  @input="okejka"
  :items="items"
  item-text="state"
  label="Płeć"
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
          :value="form.iloscKg"
          v-model="form.iloscKg"
          name="iloscKg"
          id="iloscKg"
          @keyup.enter="updateKg"
          @blur="updateKg"
          @input.native="updateKg"
          maxlength="3"
          label="Waga [kg]"

        ></v-text-field>

        <v-text-field
          :value="form.iloscCm"
          v-model="form.iloscCm"
          name="iloscCm"
          id="iloscCm"
          @keyup.enter="updateCm"
          @blur="updateCm"
          @input.native="updateCm"
          maxlength="3"
          label="Wzrost [cm]"

        ></v-text-field>

        <v-text-field
          :value="form.iloscLat"
          v-model="form.iloscLat"
          name="iloscLat"
          id="iloscLat"
          @keyup.enter="updateLat"
          @blur="updateLat"
          @input.native="updateLat"
          maxlength="2"
          label="Wiek"

        ></v-text-field>



        <v-text-field
          disabled
          v-model="form.total"
          step="any"
          class="form-control"
          name="total"
          id="total"
          maxlength="4"
          label="Zapotrzebowanie"
          readonly
        ></v-text-field>

        <div class="danger-alert" v-if="this.form.iloscKg > 250">
          Zbyt duża waga, niepoprawny wynik
        </div>
        <div class="danger-alert" v-if="this.form.iloscCm > 255 || (this.form.iloscCm <= (54) && this.form.iloscCm >= (1))">
          Niepoprawny wzrost
        </div>
        <div else>
        </div>


        <v-card-actions class="form-button">

          <v-spacer>

          </v-spacer>

          <v-btn
            dark
            class="teal darken-2"
            @click="dialog2 = true"
            v-if="this.form.total > 0"
            >
            Więcej
          </v-btn>

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


          <v-dialog v-model="dialog2" max-width="500px" >
                  <v-card class="form">
                    <v-card-title
                      class="form-title2"
                      primary-title

                    >
                      Rezultat
                    </v-card-title>

                    <p class="kcal">Żeby <span class="redText">schudnąć</span> 1kg / tyg potrzebujesz:</p>
                    <p class="kcal2"> {{this.form.total - 1000 | round}} kcal</p>
                    <p class="kcal">Żeby <span class="redText">schudnąć</span> 0.5kg / tyg potrzebujesz:</p>
                    <p class="kcal2"> {{this.form.total - 500 | round}} kcal</p>
                    <p class="kcal">Żeby <span class="blueText">utrzymać</span> wagę potrzebujesz:</p>
                    <p class="kcal2"> {{this.form.total | round}} kcal</p>
                    <p class="kcal">Żeby <span class="greenText">przytyć</span> 0.5kg / tyg potrzebujesz:</p>
                    <p class="kcal2"> {{this.form.total + 500 | round}} kcal</p>
                    <p class="kcal">Żeby <span class="greenText">przytyć</span> 1kg / tyg potrzebujesz:</p>
                    <p class="kcal2"> {{this.form.total + 1000 | round}} kcal</p>

                    <v-card-actions class="form-button">

                      <v-spacer>

                      </v-spacer>

                      <v-btn
                        slot="activator"
                        dark
                        class="teal darken-2"
                        @click="dialog2=false"
                        >
                        Zamknij
                      </v-btn>

                      <v-spacer>

                      </v-spacer>

                    </v-card-actions>
                  </v-card>
                </v-dialog>


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
      dialog2: false,
      form: {
        iloscLat: '',
        iloscKg: '',
        iloscCm: '',
        total: '',
        x: ''
      },
      items2: [
          { state: 'BMR (utrzymanie funkcji życiowych)', wzor5: '1' },
          { state: 'Znikoma (brak ćwiczeń)', wzor5: '1.2' },
          { state: 'Bardzo mała (lekkie treningi)', wzor5: '1.375' },
          { state: 'Umiarkowana (treningi średniej intensywności)', wzor5: '1.55' },
          { state: 'Duża (ciężkie treningi)', wzor5: '1.725' },
          { state: 'Bardzo duża (ciężkie treningi, praca fizyczna)', wzor5: '1.9' }
      ],
      items: [
          { state: 'Mężczyzna', wzor1: '66.4730', wzor2: '13.7516', wzor3: '5.0033', wzor4: '6.7550' },
          { state: 'Kobieta', wzor1: '655.0955', wzor2: '9.5634', wzor3: '1.8496', wzor4: '4.6756' }
      ]
    }
  },
  filters: {
    round
  },
  methods: {
    updateKg (event) {
      this.form.iloscKg = event.target.value
      this.x = (this.select.wzor1 - (-(this.select.wzor2 * this.form.iloscKg)) - (-(this.select.wzor3 * this.form.iloscCm)) -
      (this.select.wzor4 * this.form.iloscLat)) * this.selected.wzor5
      this.form.total = Number((this.x).toFixed(1)) + ' kcal'
    },
    updateCm (event) {
      this.form.iloscCm = event.target.value
      this.x = (this.select.wzor1 - (-(this.select.wzor2 * this.form.iloscKg)) - (-(this.select.wzor3 * this.form.iloscCm)) -
      (this.select.wzor4 * this.form.iloscLat)) * this.selected.wzor5
      this.form.total = Number((this.x).toFixed(1)) + ' kcal'
    },
    updateLat (event) {
      this.form.iloscLat = event.target.value
      this.x = (this.select.wzor1 - (-(this.select.wzor2 * this.form.iloscKg)) - (-(this.select.wzor3 * this.form.iloscCm)) -
      (this.select.wzor4 * this.form.iloscLat)) * this.selected.wzor5
      this.form.total = Number((this.x).toFixed(1)) + ' kcal'
    },
    okejka () {
      this.x = (this.select.wzor1 - (-(this.select.wzor2 * this.form.iloscKg)) - (-(this.select.wzor3 * this.form.iloscCm)) -
      (this.select.wzor4 * this.form.iloscLat)) * this.selected.wzor5
      this.form.total = Number((this.x).toFixed(1)) + ' kcal'
    },
    reset () {
      this.selected = ''
      this.select = ''
      this.form.iloscKg = ''
      this.form.iloscCm = ''
      this.form.iloscLat = ''
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

  text-align: center;
}

.kcal2{

  text-align: center;

}

.redText{
  font-weight: bold;
  font-style: italic;
  color: red;
}

.blueText{
  font-weight: bold;
  font-style: italic;
  color: blue;
}

.greenText{
  font-weight: bold;
  font-style: italic;
  color: green;
}


</style>
