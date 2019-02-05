<template>
  <div>

    <v-dialog
      v-model="dialog1"
      width="500"
      persistent
    >
      <v-card class="form">

        <v-card-title
          class="form-title"
          primary-title

        >
          Usuń produkt
        </v-card-title>


        <v-text-field
          maxlength="50"
          :rules="[required]"
          counter="50"
          label="Nazwa produktu [100g]"
          v-model="produkt.title"
          disabled
        ></v-text-field>

        <v-select
          value="try"
          v-model="produkt.kategoria"
          label="Kategoria"
          :items="items"
          item-text="state"
          disabled

        ></v-select>

        <v-text-field
          maxlength="5"
          :rules="[required]"
          label="Kcal"
          v-model="produkt.kcal"
          disabled

        ></v-text-field>

        <v-text-field
          maxlength="4"
          :rules="[required]"
          label="Białko [g]"
          v-model="produkt.bialko"
          disabled

        ></v-text-field>

        <v-text-field
          maxlength="4"
          :rules="[required]"
          label="Węglowodany [g]"
          v-model="produkt.weglowodany"
          disabled

        ></v-text-field>

        <v-text-field
          maxlength="4"
          :rules="[required]"
          label="Tłuszcze [g]"
          v-model="produkt.tluszcz"
          disabled

        ></v-text-field>


        <v-card-actions class="form-button">

          <v-spacer>

          </v-spacer>


          <v-btn

            dark
            class="teal darken-2"
            @click="cofniecie"
            >
            Anuluj
          </v-btn>

          <v-tooltip top>
          <v-btn
            slot="activator"
            dark
            class="teal darken-2"
            @click="unsetAsProduktEntirely"
            >
            Zatwierdź
          </v-btn>
          <span>Czy na pewno chcesz usunąć ten produkt?</span>
          </v-tooltip>

          <v-spacer>

          </v-spacer>

        </v-card-actions>

        <div class="danger-alert" v-if="error">
          {{error}}
        </div>

      </v-card>

      </v-dialog>
</div>

</template>

<script>
import ProduktsService from '@/services/ProduktsService'
import ProduktBookmarksService from '@/services/ProduktBookmarksService'

export default {
  data () {
    return {
      select: {},
      dialog1: true,
      produkt: {
        title: null,
        kategoria: null,
        kcal: null,
        bialko: null,
        weglowodany: null,
        tluszcz: null
      },
      required: (value) => !!value || 'Pole wymagane',
      items: ['Mięso', 'Owoce', 'Warzywa', 'Pieczywo', 'Nabiał', 'Art. spożywcze']
    }
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.produkt)
        .every(key => !!this.produkt[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Wypełnij wymagane pola.'
        return
      }

      const produktId = this.$store.state.route.params.produktId
      try {
        await ProduktsService.put(this.produkt)
        this.$router.push({
          name: 'produkts',
          params: {
            produktId: produktId
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsProduktBookmark () {
      try {
        await ProduktBookmarksService.delete(this.produktbookmark.id)
        this.produktbookmark = null
        this.$router.push({
          name: 'produkts'
        })
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsProduktEntirely () {
      try {
        await ProduktsService.delete(this.produkt.id)
        this.produkt = null
        this.$router.push({
          name: 'produkts'
        })
      } catch (err) {
        console.log(err)
      }
    },
    async cofniecie () {
      try {
        this.$router.push({name: 'produkts'})
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const produktId = this.$store.state.route.params.produktId
      this.produkt = (await ProduktsService.show(produktId)).data
    } catch (err) {
      console.log(err)
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
      margin-left: 51%;
    }
}

@media (min-width: 992px) { /* md */
  .form-button {
    margin-top: 20px;
    margin-left: 51%;
  }
}

@media (min-width: 1200px) { /* lg */
  .form-button {
    margin-top: 20px;
    margin-left: 51%;
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


</style>
