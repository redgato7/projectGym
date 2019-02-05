<template>
  <v-container grid-list-md text-xs-center mb-5>

   <v-layout row wrap>

     <v-flex xs12 sm12 md6 lg6>

       <v-card class="mb-2">

         <produkts-search-panel  />

       </v-card>

       <v-card class="mb-2" v-if="isUserLoggedIn">

         <produkts-bookmarks />

       </v-card>

       <v-card class="mb-2">

         <adding-produkts-panel />

       </v-card>

     </v-flex>

     <v-flex xs12 sm12 md6 lg6>

       <v-card class="">

        <produkts-panel />

       </v-card>

     </v-flex>


  </v-layout>

</v-container>

</template>

<script>
import ProduktsPanel from './ProduktsPanel'
import ProduktsBookmarks from './ProduktsBookmarks'
import ProduktsSearchPanel from './ProduktsSearchPanel'
import ProduktsService from '@/services/ProduktsService'
import AddingProduktsPanel from './AddingProduktsPanel'
import {mapState} from 'vuex'

export default {
  components: {
    ProduktsBookmarks,
    ProduktsPanel,
    ProduktsSearchPanel,
    AddingProduktsPanel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      produkts: null
    }
  },
  async mounted () {
    this.produkts = (await ProduktsService.index()).data
  }
}
</script>

<style scoped>

</style>
