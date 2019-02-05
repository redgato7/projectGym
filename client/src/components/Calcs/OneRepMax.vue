<template>
  <panel title="Kalkulator maksymalnego powtórzenia">

    <div class="opis">
      Kalkulator pozwala na oszacowanie jednego maksymalnego powtórzenia, które jesteś w stanie wykonać na podstawie kilku
      powtórzeń z mniejszym ciężarem. Wprowadź ciężar, oraz maksymalną ilość powtórzeń jaką jesteś w stanie nim wykonać.
      Otrzymasz wynik, który z dużym prawdopodobieństwem będzie odpowiadał ciężarowi jaki podniesiesz w jednym powtórzeniu.
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
           Kalkulator maksymalnego powtórzenia
        </v-card-title>



        <v-text-field
          :value="form.sale_quantity"
          name="sale_quantity"
          id="sale_quantity"
          @keyup.enter="updateQuantity"
          @blur="updateQuantity"
          @input.native="updateQuantity"
          maxlength="4"
          label="Ilość powtórzeń"

        ></v-text-field>

        <v-text-field
          :value="form.sale_rate"
          name="sale_rate"
          id="sale_rate"
          @keyup.enter="updateRate"
          @blur="updateRate"
          @input.native="updateRate"
          maxlength="4"
          label="Ilość kg"

        ></v-text-field>



        <v-text-field
          disabled
          v-model="form.sale_total"
          step="any"
          class="form-control"
          name="sale_total"
          id="sale_total"
          maxlength="1"
          label="Maksymalnie jedno powtórzenie"
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
          <span>Kliknij poza formę</span>
          </v-tooltip>

          <v-spacer>

          </v-spacer>

        </v-card-actions>

        <div class="danger-alert" v-if="error">
          {{error}}
        </div>

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
      this.x = (100 * this.form.sale_rate) / (101.3 - 2.67123 * this.form.sale_quantity)
      this.form.sale_total = Number((this.x).toFixed(1)) + ' kg'
    },
    updateRate (event) {
      this.form.sale_rate = event.target.value
      this.x = (100 * this.form.sale_rate) / (101.3 - 2.67123 * this.form.sale_quantity)
      this.form.sale_total = Number((this.x).toFixed(1)) + ' kg'
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




</style>
