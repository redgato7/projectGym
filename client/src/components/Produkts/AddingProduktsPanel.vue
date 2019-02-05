<template>

  <panel title="Spożyte produkty">

    <div class="text-xs-right">
        <v-tooltip top>
        <v-btn
          @click="dialog = true"
          color="teal accent-3"
          class="buttonDodaj"
          fab
          light
          small
          slot="activator"
        >
          <v-icon>clear</v-icon>
        </v-btn>
        <span>Usuń produkt ze spożytych kcal</span>
        </v-tooltip>
    </div>

      <v-dialog
        v-model="dialog"
        width="500"
      >


        <v-card class="form">

          <v-card-title
            class="form-title"
            primary-title


          >
            Usuń produkt ze spożytych kcal
          </v-card-title>

          <v-select
            v-model="select"
            :items="addingprodukts"
            item-text="title"
            item-value="kcal"
            label="Wybierz produkt lub danie"
            persistent-hint
            return-object
            single-line
          ></v-select>

          <v-card-actions class="form-button">

            <v-spacer>

            </v-spacer>

            <v-btn

              dark
              class="teal darken-2"
              @click="dialog=false"
              >
              Anuluj
            </v-btn>

            <v-btn

              dark
              class="teal darken-2"
              @click="usuwanie"
              >
              Zatwierdź
            </v-btn>

            <v-spacer>

            </v-spacer>

          </v-card-actions>

          <div class="danger-alert" v-if="error">
            {{error}}
          </div>

        </v-card>
        </v-dialog>

    <v-data-table
      class="tablex"
      :headers="headers"
      :pagination.sync="pagination"
      :items="addingprodukts"
      no-data-text="Tabela jest pusta"
      rows-per-page-text="Ilość rekordów na stronę"
      total-items
      >
      <template slot="items" scope="props">

        <td class="text-xs-left">
          {{props.item.title}}
        </td>

        <td class="text-xs-right">
          {{props.item.gramatura}}
        </td>

        <td class="text-xs-right">
          {{props.item.kcal}}
        </td>

        <td class="text-xs-right">
          {{props.item.bialko}}
        </td>

        <td class="text-xs-right">
          {{props.item.weglowodany}}
        </td>

        <td class="text-xs-right">
          {{props.item.tluszcz}}
        </td>

      </template>
    </v-data-table>

    <div v-for="addingprodukt in addingprodukts" v-if="!addingprodukt.isComplete">
      
    </div>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import AddingProduktsService from '@/services/AddingProduktsService'
import ProduktsService from '@/services/ProduktsService'

export default {
  data () {
    return {
      dialog3: false,
      bialko: '0',
      weglowodany: '0',
      tluszcz: '0',
      select: {},
      dialog: false,
      addingprodukt: {
        title: null,
        kategoria: null,
        kcal: null,
        bialko: null,
        weglowodany: null,
        tluszcz: null
      },
      error: null,
      required: (value) => !!value || 'Pole wymagane',
      items: ['Mięso', 'Owoce', 'Warzywa', 'Pieczywo', 'Nabiał', 'Art. spożywcze'],
      headers: [
        {
          text: 'Nazwa produktu',
          value: 'title',
          align: 'left'
        },
        {
          text: 'Gramatura',
          value: 'gramatura',
          align: 'right'
        },
        {
          text: 'kcal',
          value: 'kcal',
          align: 'right'
        },
        {
          text: 'B [g]',
          value: 'bialko',
          align: 'right'
        },
        {
          text: 'W [g]',
          value: 'weglowodany',
          align: 'right'
        },
        {
          text: 'T [g]',
          value: 'tluszcz',
          align: 'right'
        }
      ],
      headers1: [
        {
          text: 'Nazwa produktu',
          value: 'title'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      produkts: [],
      addingprodukts: [],
      gramatura1: [100, 200, 300]
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.produkts = (await ProduktsService.index(value)).data
      }
    }
  },
  methods: {
    async create () {
      try {
        this.addingprodukt = (await AddingProduktsService.post({
          produktId: this.select.id,
          gramatura: this.selected.gramatura
        })).data
        location.reload()
      } catch (err) {
        console.log(err)
      }
    },
    async createEatenProduct () {
      try {
        this.addingprodukt = (await AddingProduktsService.post({
          gramatura: this.gramatura
        })).data
        location.reload()
      } catch (err) {
        console.log(err)
      }
    },
    async usuwanie () {
      try {
        await AddingProduktsService.delete(this.select.id)
        this.addingprodukt = null
        location.reload()
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.addingprodukts = (await AddingProduktsService.index()).data
    }
  }
}
</script>

<style scoped>

.buttonDodaj {

}

.tablex{
  margin-top: -20px;
}

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


</style>
