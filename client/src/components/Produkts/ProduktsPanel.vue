<template>

  <panel title="Tabele kalorii produktów">

    <div class="text-xs-right">
                <v-tooltip top>
                  <v-btn
                    @click="dialog2=true"
                    color="teal accent-3"
                    class="buttonz"
                    fab
                    light
                    small
                    slot="activator"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                <span>Dodaj produkt</span>
                </v-tooltip>
    </div>


    <v-dialog
      v-model="dialog2"
      width="500"
    >

      <v-card class="form">

        <v-card-title
          class="form-title"
          primary-title

        >
          Dodaj produkt
        </v-card-title>


        <v-text-field
          autofocus
          maxlength="50"
          :rules="[required]"
          label="Nazwa produktu [100g]"
          v-model="produkt.title"
        ></v-text-field>

        <v-select
          value="try"
          v-model="produkt.kategoria"
          label="Kategoria"
          :items="items"
          item-text="state"


        ></v-select>

        <v-text-field
          maxlength="5"
          :rules="[required]"
          label="Kcal"
          v-model="produkt.kcal"
        ></v-text-field>

        <v-text-field
          maxlength="4"
          :rules="[required]"
          label="Białko [g]"
          v-model="produkt.bialko"
        ></v-text-field>

        <v-text-field
          maxlength="4"
          :rules="[required]"
          label="Węglowodany [g]"
          v-model="produkt.weglowodany"
        ></v-text-field>

        <v-text-field
          maxlength="4"
          :rules="[required]"
          label="Tłuszcze [g]"
          v-model="produkt.tluszcz"
        ></v-text-field>


        <v-card-actions class="form-button">

          <v-spacer>

          </v-spacer>

          <v-btn

            dark
            class="teal darken-2"
            @click="dialog2=false"
            >
            Anuluj
          </v-btn>

          <v-tooltip top>
          <v-btn
            slot="activator"
            dark
            class="teal darken-2"
            @click="create"
            >
            Zatwierdź
          </v-btn>
          <span>Pamiętaj, aby liczby dziesiętne wpisać po kropce, nie przecinku</span>
        </v-tooltip>

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
      :items="produkts"
      no-data-text="Tabela jest pusta"
      rows-per-page-text="Ilość rekordów na stronę">
      <template slot="items" scope="props">

        <td class="text-xs-left">
          {{props.item.title}}
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


        <td class="text-xs-right">
          <router-link :to="{path: `produkts/${props.item.id}/edit`}">

                  <v-icon> edit </v-icon>
          </router-link>
          <router-link :to="{path: `produkts/${props.item.id}`}">

                  <v-icon> delete </v-icon>
          </router-link>
        </td>

      </template>
    </v-data-table>

    <v-container fluid>

                <div class="text-xs-right">
                            <v-tooltip top>
                            <v-btn
                              slot="activator"
                              color="teal accent-3"
                              class="buttonx"
                              fab
                              @click="createEatenProduct"
                            >
                              <v-icon>add</v-icon>
                            </v-btn>
                            <span>Dodaj produkt do spożytych kcal</span>
                            </v-tooltip>
                </div>
        <v-layout row wrap align-center>

          <v-flex xs6>

            <v-subheader>Ilość kalorii w {{a = gramatura || 0}}g produktu: &nbsp;
               <strong> {{a =Number((0.01*gramatura*select.kcal).toFixed(1)) || 0}}kcal</strong> </v-subheader>

            <v-subheader>Ilość bialka w {{b = gramatura || 0}}g produktu: &nbsp;
               <strong> {{b = Number((0.01*gramatura*select.bialko).toFixed(1)) || 0}}g</strong> </v-subheader>

            <v-subheader>Ilość węglowodanów w {{c = gramatura || 0}}g produktu: &nbsp;
               <strong> {{c = Number((0.01*gramatura*select.weglowodany).toFixed(1)) || 0}}g</strong> </v-subheader>

            <v-subheader>Ilość tluszczy w {{d = gramatura || 0}}g produkt: &nbsp;
               <strong> {{d =Number((0.01*gramatura*select.tluszcz).toFixed(1)) || 0}}g</strong> </v-subheader>



          </v-flex>

          <v-flex xs2>
            <v-text-field
              v-model="gramatura"
              maxlength="5"
              label="Ile gram?"
            ></v-text-field>
          </v-flex>


          <v-flex xs4>
            <v-select
              v-model="select"
              :hint="` ${a = select.kcal || 0} kcal | ${b = select.bialko || 0} B | ${c = select.weglowodany || 0} W | ${d = select.tluszcz || 0} T `"
              :items="produkts"
              item-text="title"
              label="Wybierz produkt"
              persistent-hint
              return-object
              single-line
            ></v-select>


          </v-flex>


        </v-layout>
      </v-container>

  </panel>
</template>

<script>
import {mapState} from 'vuex'
import ProduktsService from '@/services/ProduktsService'
import AddingProduktsService from '@/services/AddingProduktsService'

export default {
  data () {
    return {
      dialog2: false,
      gramatura: '0',
      bialko: '0',
      weglowodany: '0',
      tluszcz: '0',
      select: {},
      dialog: false,
      produkt: {
        title: null,
        kategoria: null,
        kcal: null,
        bialko: null,
        weglowodany: null,
        tluszcz: null
      },
      addingprodukt: {
        title: null,
        gramatura: null,
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
          text: 'Nazwa produktu [100g]',
          value: 'title',
          align: 'left'
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
      addingprodukts: []
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
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.produkt)
        .every(key => !!this.produkt[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Wypełnij wymagane pola.'
        return
      }

      try {
        await ProduktsService.post(this.produkt)
        location.reload()
      } catch (err) {
        console.log(err)
      }
    },
    async createEatenProduct () {
      try {
        this.addingprodukt = (await AddingProduktsService.post({
          gramatura: this.gramatura,
          title: this.select.title,
          kcal: this.a * this.gramatura * 0.01,
          bialko: this.b * this.gramatura * 0.01,
          weglowodany: this.c * this.gramatura * 0.01,
          tluszcz: this.d * this.gramatura * 0.01
        })).data
        location.reload()
      } catch (err) {
        console.log(err)
      }
    },
    async cofniecie () {
      try {
        this.$router.go(this.$router.currentRoute)
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
      this.produkts = (await ProduktsService.index()).data
    }
  }
}
</script>

<style scoped>
.buttonz{
  position:sticky;
}

.buttonx{
  margin-top: -20px;
  margin-bottom: -100px;
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
