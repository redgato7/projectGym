<template>
  <panel title="Kalkulator czystej masy ciała">

    <div class="opis">
    Kalkulator na podstawie wprowadzonych danych: wagi ciała,
    wzrostu oraz płci oblicza całkowitą masę ciała bez tkanki tłuszczowej
    (masa organów, krwi, kości, mięśni, skóry).
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
        Kalkulator beztłuszczowej masy ciała
        </v-card-title>



<v-select
  v-model="select"
  :value="wzor1"
  @input="okejka"
  :items="items"
  item-text="state"
  item-value="wzor1"
  label="Płeć"
  persistent-hint
  return-object
  single-line
></v-select>

        <v-text-field
          :value="form.sale_quantity"
          v-model="form.sale_quantity"
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
          v-model="form.sale_rate"
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
          v-model="form.sale_total "
          step="any"
          class="form-control"
          name="sale_total"
          id="sale_total"
          maxlength="4"
          label="Beztłuszczowa masa ciała"
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
export default {
  data () {
    return {
      dialog: false,
      form: {
        sale_quantity: '',
        sale_rate: '',
        sale_total: '',
        x: ''
      },
      items: [
          { state: 'Mężczyzna', wzor1: '0.407', wzor2: '0.267', wzor3: '19.2' },
          { state: 'Kobieta', wzor1: '0.252', wzor2: '0.473', wzor3: '48.3' }
      ]
    }
  },
  methods: {
    updateQuantity (event) {
      this.form.sale_quantity = event.target.value
      this.x = (this.select.wzor1 * this.form.sale_quantity) - (-(this.select.wzor2 * this.form.sale_rate)) - this.select.wzor3
      this.form.sale_total = Number((this.x).toFixed(1)) + 'kg'
    },
    updateRate (event) {
      this.form.sale_rate = event.target.value
      this.x = (this.select.wzor1 * this.form.sale_quantity) - (-(this.select.wzor2 * this.form.sale_rate)) - this.select.wzor3
      this.form.sale_total = Number((this.x).toFixed(1)) + 'kg'
    },
    okejka () {
      this.x = (this.select.wzor1 * this.form.sale_quantity) - (-(this.select.wzor2 * this.form.sale_rate)) - this.select.wzor3
      this.form.sale_total = Number((this.x).toFixed(1)) + 'kg'
    },
    reset () {
      this.form.sale_quantity = ''
      this.form.sale_rate = ''
      this.select = ''
      this.form.sale_total = ''
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


</style>
