<template>
  <panel title="Kalkulator BMI">

    <div class="opis">
    Kalkulator BMI (Body Mass Index) daje każdemu możliwość szybkiego
     i wygodego obliczenia własnego wskaźnika masy ciała. BMI obliczamy dzieląc masę ciała
    (w kilogramach) przez wzrost do kwadratu (w metrach). Wskaźnik ten wykorzystywany jest
     przede wszystkim do oceny ryzyka pojawienia się groźnych chorób: miażdżycy, choroby
      niedokrwiennej serca, udaru mózgu, czy nawet nowotworów. Większość
     tych chorób jest związana z otyłością i dlatego kalkulator BMI to tak przydatne narzędzie.
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
          Kalkulator BMI
        </v-card-title>



        <v-text-field
          :value="form.sale_quantity"
          name="sale_quantity"
          id="sale_quantity"
          @keyup.enter="updateQuantity"
          @blur="updateQuantity"
          @input.native="updateQuantity"
          maxlength="3"
          label="Waga [kg]"

        ></v-text-field>

        <v-text-field
          :value="form.sale_rate"
          name="sale_rate"
          id="sale_rate"
          @keyup.enter="updateRate"
          @blur="updateRate"
          @input.native="updateRate"
          maxlength="3"
          label="Wzrost [cm]"

        ></v-text-field>



        <v-text-field
          disabled
          v-model="form.sale_total"
          step="any"
          class="form-control"
          name="sale_total"
          id="sale_total"
          maxlength="4"
          label="Współczynnik BMI"
          readonly
        ></v-text-field>

        <div class="form-opis" v-if="this.form.sale_total < 16 && this.form.sale_total >= 10">
          Wygłodzenie
        </div>
        <div class="form-opis" v-if="this.form.sale_total < 16.99 && this.form.sale_total >= 16 ">
          Wychudzenie
        </div>
        <div class="form-opis" v-if="this.form.sale_total < 18.49 && this.form.sale_total >= 17 ">
          Niedowaga
        </div>
        <div class="form-opis" v-if="this.form.sale_total < 24.99 && this.form.sale_total >= 18.5">
          Wartość prawidłowa
        </div>
        <div class="form-opis" v-if="this.form.sale_total < 29.99 && this.form.sale_total >= 25">
          Nadwaga
        </div>
        <div class="form-opis" v-if="this.form.sale_total < 34.99 && this.form.sale_total >= 30">
          I stopień otyłości
        </div>
        <div class="form-opis" v-if="this.form.sale_total < 39.99 && this.form.sale_total >= 35">
          II stopień otyłości
        </div>
        <div class="form-opis" v-if="this.form.sale_total < 80 && this.form.sale_total >= 40">
          Otyłość skrajna
        </div>
        <div class="danger-alert" v-if="this.form.sale_total < 9.99 && this.form.sale_total > 0">
          Wprowadzono nieprawidłowe dane
        </div>
        <div class="danger-alert" v-if="this.form.sale_total < 9990000 && this.form.sale_total > 80.01">
          Wprowadzono nieprawidłowe dane
        </div>

        <v-card-actions class="form-button">

          <v-spacer>

          </v-spacer>


          <v-tooltip left>
          <v-btn
            slot="activator"
            dark
            class="teal darken-2"
            @click="reset"
            right
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
            right
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

export default {
  data () {
    return {
      dialog: false,
      form: {
        sale_quantity: '',
        sale_rate: '',
        sale_total: '',
        x: ''
      }
    }
  },
  methods: {
    updateQuantity (event) {
      this.form.sale_quantity = event.target.value
      this.x = this.form.sale_quantity / ((this.form.sale_rate / 100) * (this.form.sale_rate / 100))
      this.form.sale_total = Number((this.x).toFixed(1))
    },
    updateRate (event) {
      this.form.sale_rate = event.target.value
      this.x = this.form.sale_quantity / ((this.form.sale_rate / 100) * (this.form.sale_rate / 100))
      this.form.sale_total = Number((this.x).toFixed(1)) || 0
    },
    reset () {
      this.form.sale_quantity = ''
      this.form.sale_rate = ''
      this.form.sale_total = ''
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
      margin-left: 57%;
    }
}

@media (min-width: 992px) { /* md */
  .form-button {
    margin-top: 20px;
    margin-left: 57%;
  }
}

@media (min-width: 1200px) { /* lg */
  .form-button {
    margin-top: 20px;
    margin-left: 57%;
  }
}

.form-title{
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
min-height: 150px;
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


</style>
