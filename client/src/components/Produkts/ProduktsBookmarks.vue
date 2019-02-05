<template>

<panel title="Ulubione produkty">

<div class="text-xs-right">

      <v-tooltip top>
      <v-btn
        @click="dialog2 = true"
        class="buttonDelete"
        fab
        light
        color="teal accent-3"
        small
        slot="activator"
      >
        <v-icon>clear</v-icon>
      </v-btn>
      <span>Usuń ulubiony produkt</span>
      </v-tooltip>

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
      <v-icon>add</v-icon>
    </v-btn>
    <span>Dodaj ulubiony produkt</span>
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
        Dodaj ulubiony produkt
      </v-card-title>

      <v-select
        v-model="select"
        :items="produkts"
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
          @click="create"
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

  <v-dialog
    v-model="dialog2"
    width="500"
  >


    <v-card class="form">

      <v-card-title
        class="form-title"
        primary-title


      >
        Usuń ulubiony produkt
      </v-card-title>

      <v-select
        v-model="select"
        :items="produktbookmarks"
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
          @click="dialog2=false"
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
      :items="produktbookmarks"
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

      </template>
    </v-data-table>

</panel>

</template>

<script>
import {mapState} from 'vuex'
import ProduktBookmarksService from '@/services/ProduktBookmarksService'
import ProduktsService from '@/services/ProduktsService'

export default {
  data () {
    return {
      dialog: false,
      dialog2: false,
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
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      produktbookmarks: [],
      produkts: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
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
        this.produktbookmark = (await ProduktBookmarksService.post({
          produktId: this.select.id
        })).data
        location.reload()
      } catch (err) {
        console.log(err)
      }
    },
    async usuwanies () {
      try {
        this.produktbookmark = (await ProduktBookmarksService.post({
          produktId: this.select.id
        })).data
        location.reload()
      } catch (err) {
        console.log(err)
      }
    },
    async usuwanie () {
      try {
        await ProduktBookmarksService.delete(this.select.id)
        this.produktbookmark = null
        location.reload()
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.produktbookmarks = (await ProduktBookmarksService.index()).data
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
  async cofniecie () {
    try {
      this.$router.go(this.$router.currentRoute)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>

.buttonDelete {

}

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
