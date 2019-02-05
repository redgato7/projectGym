<template>
  <panel title="Szukaj">
    <v-text-field
      label="Wyszukaj mięso, owoce, warzywa, pieczywo, nabiał lub art. spożywcze"
      v-model="search"
    ></v-text-field>
  </panel>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'produkts'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<style>

</style>
