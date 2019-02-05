<template>
  <panel title="Kalkulator makroskładników">

    <div class="opis">
      Kalkulator makroskładników po podaniu aktualnej diety
      i zapotrzebowania kalorycznego
      pozwala nam uwzględnić ile gram bialka, weglowodanów oraz tluszczy
      powinno znajdować się w jednym posilku żeby uzupelnić wszystkie makroskładniki
      w danym dniu.
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
          Kalkulator makrosładników
        </v-card-title>

        <v-text-field
          :value="form.iloscKcal"
          v-model="form.iloscKcal"
          name="iloscKcal"
          id="iloscKcal"
          @keyup.enter="updateKcal"
          @blur="updateKcal"
          @input.native="updateKcal"
          maxlength="4"
          label="Zapotrzebowanie kcal"

        ></v-text-field>

          <v-select
            v-model="selected"
            @input="okejka"
            :items="items2"
            item-text="state"
            label="Ilość posiłków dziennie"
            persistent-hint
            return-object
            single-line
          ></v-select>


        <v-select
          v-model="select"
          @input="okejka"
          :items="items"
          item-text="state"
          label="Dieta"
          persistent-hint
          return-object
          single-line
        ></v-select>


        <v-text-field
          disabled
          v-model="form.bialko"
          step="any"
          class="form-control"
          name="bialko"
          id="bialko"
          label="Ilość białka w posiłku [g]"
          readonly
        ></v-text-field>

        <v-text-field
          disabled
          v-model="form.weglowodany"
          step="any"
          class="form-control"
          name="total"
          id="total"
          maxlength="4"
          label="Ilość węglowodanów w posiłku [g]"
          readonly
        ></v-text-field>

        <v-text-field
          disabled
          v-model="form.tluszcze"
          step="any"
          class="form-control"
          name="total"
          id="total"
          maxlength="4"
          label="Ilość tłuszczy w posiłku [g]"
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
            @click="dialog2 = true"
            >
            Więcej
          </v-btn>
          <span>Info dotyczące diet</span>
          </v-tooltip>

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

                    <p class="kcal">Dieta umiarkowana</p>
                    <p class="kcal2">Białko 25%, Węglowodany 50%, Tłuszcze 25%</p><br>
                    <p class="kcal">Dieta wysokobiałkowa</p>
                    <p class="kcal2">Białko 35%, Węglowodany 45%, Tłuszcze 30%</p><br>
                    <p class="kcal">Dieta niskowęglowodanowa</p>
                    <p class="kcal2">Białko 45%, Węglowodany 10%, Tłuszcze 45%</p><br>
                    <p class="kcal">Dieta ketogeniczna</p>
                    <p class="kcal2">Białko 35%, Węglowodany 5%, Tłuszcze 60%</p>




                    <v-card-actions class="form-button">

                      <v-spacer>

                      </v-spacer>

                      <v-btn
                        slot="activator"
                        dark
                        color="teal darken-2"
                        class="buttonZamknij"
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
      model: null,
      form: {
        iloscCzasu: '',
        total: '',
        bialko: '',
        weglowodany: '',
        tluszcze: '',
        x: '',
        x1: '',
        x2: ''
      },
      items: [
          { state: 'Umiarkowana', bialko: '0.25', wegle: '0.5', tluszcze: '0.25' },
          { state: 'Wysokobiałkowa', bialko: '0.35', wegle: '0.45', tluszcze: '0.3' },
          { state: 'Niskowęglowodanowa', bialko: '0.45', wegle: '0.1', tluszcze: '0.45' },
          { state: 'Ketogeniczna', bialko: '0.35', wegle: '0.05', tluszcze: '0.6' }

      ],
      items2: [
          { state: '1' },
          { state: '2' },
          { state: '3' },
          { state: '4' },
          { state: '5' },
          { state: '6' },
          { state: '7' },
          { state: '8' }

      ]
    }
  },
  filters: {
    round
  },
  methods: {
    updateKcal (event) {
      this.form.iloscKcal = event.target.value
      this.x = ((this.form.iloscKcal * this.select.bialko) / 4) / this.selected.state
      this.form.bialko = Number((this.x).toFixed(1))
      this.x1 = ((this.form.iloscKcal * this.select.wegle) / 4) / this.selected.state
      this.form.weglowodany = Number((this.x1).toFixed(1))
      this.x2 = ((this.form.iloscKcal * this.select.tluszcze) / 9) / this.selected.state
      this.form.tluszcze = Number((this.x2).toFixed(1))
    },
    okejka () {
      this.x = ((this.form.iloscKcal * this.select.bialko) / 4) / this.selected.state
      this.form.bialko = Number((this.x).toFixed(1))
      this.x1 = ((this.form.iloscKcal * this.select.wegle) / 4) / this.selected.state
      this.form.weglowodany = Number((this.x1).toFixed(1))
      this.x2 = ((this.form.iloscKcal * this.select.tluszcze) / 9) / this.selected.state
      this.form.tluszcze = Number((this.x2).toFixed(1))
    },
    reset () {
      this.form.iloscKcal = ''
      this.form.bialko = ''
      this.form.weglowodany = ''
      this.form.tluszcze = ''
      this.select = ''
      this.selected = ''
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
    .buttonZamknij {
      margin-top: 20px;
    }
}

@media (min-width: 600px) { /* sm */
  .buttonZamknij {
    margin-top: 20px;
    margin-right: 50%;
    }
}

@media (min-width: 992px) { /* md */
  .buttonZamknij {
    margin-top: 20px;
    margin-right: 50%;
  }
}

@media (min-width: 1200px) { /* lg */
  .buttonZamknij {
    margin-top: 20px;
    margin-right: 50%;
  }
}

@media (min-width: 100px) { /* sm */
    .form-button {
      margin-top: 20px;
    }
}

@media (min-width: 600px) { /* sm */
    .form-button {
      margin-top: 20px;
      margin-left: 32%;
    }
}

@media (min-width: 992px) { /* md */
  .form-button {
    margin-top: 20px;
    margin-left: 32%;
  }
}

@media (min-width: 1200px) { /* lg */
  .form-button {
    margin-top: 20px;
    margin-left: 32%;
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

.form-opis2{
font-size: 15px;
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

.kcal2{
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0
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


table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    justify-content: center;
}

td, th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
    width: 100%;

}


table tr:nth-child(even) {
    background-color: #80CBC4;
}
table tr:nth-child(odd) {
   background-color: #B2DFDB;
}
table th {
    background-color: #00796B;
    color: white;
}




</style>
