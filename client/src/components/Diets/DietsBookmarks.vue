<template>
  <panel title="Ulubione dania">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="dietbookmarks"
      no-data-text="Tabela jest pusta"
      rows-per-page-text="Ilość rekordów na stronę">
      <template slot="items" scope="props">

        <td class="text-xs-left">
          {{props.item.title}}
        </td>

        <td class="text-xs-left">
          {{props.item.autor}}
        </td>

        <td class="text-xs-right">

          <router-link :to="{path: `diets/${props.item.DietId}`}">

                  <v-icon> pageview </v-icon>
          </router-link>

          <router-link :to="{path: `diets/${props.item.DietId}/edit`}">

                  <v-icon> edit </v-icon>
          </router-link>
        </td>

      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import DietBookmarksService from '@/services/DietBookmarksService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Tytuł',
          value: 'title',
          align: 'left'
        },
        {
          text: 'Autor',
          value: 'autor',
          align: 'left'
        },
        {
          text: '',
          value: 'id',
          sortable: false,
          align: 'right'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      dietbookmarks: []
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
      this.dietbookmarks = (await DietBookmarksService.index()).data
    }
  }
}
</script>

<style>

</style>
