<template>
  <panel title="Ulubione ćwiczenia">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="trainingbookmarks"
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

          <router-link :to="{path: `trainings/${props.item.TrainingId}`}">

                  <v-icon> pageview </v-icon>
          </router-link>

          <router-link :to="{path: `trainings/${props.item.TrainingId}/edit`}">

                  <v-icon> edit </v-icon>
          </router-link>
        </td>

      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import TrainingBookmarksService from '@/services/TrainingBookmarksService'

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
      trainingbookmarks: []
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
      this.trainingbookmarks = (await TrainingBookmarksService.index()).data
    }
  }
}
</script>

<style>

</style>
