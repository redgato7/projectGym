<template>

 <v-container grid-list-md text-xs-center mb-4>

  <v-layout row wrap>

    <v-flex xs12 sm12 md12 lg12>

        <produkt-metadata class="mb-2" :produkt="produkt" />

    </v-flex>

  </v-layout>

</v-container>

</template>

<script>
import {mapState} from 'vuex'
import ProduktMetadata from './ProduktMetadata'

export default {
  data () {
    return {
      produkt: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  components: {
    ProduktMetadata
  }
}
</script>

<style scoped>
</style>
