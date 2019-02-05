<template>
  <panel title="Ostatnio przeglądane ćwiczenia">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="traininghistories"
      no-data-text="Tabela jest pusta"
      rows-per-page-text="Ilość rekordów na stronę">
      <template slot="items" scope="props">
        <td class="text-xs-left">
          {{props.item.title}}
        </td>
        <td class="text-xs-left">
          {{props.item.autor}}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import TrainingHistoriesService from '@/services/TrainingHistoriesService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Tytuł',
          value: 'title'
        },
        {
          text: 'Autor',
          value: 'autor'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      traininghistories: []
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
      this.traininghistories = (await TrainingHistoriesService.index()).data
    }
  }
}
</script>

<style>

</style>
