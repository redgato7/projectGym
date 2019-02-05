<template>
  <div id="app">
    <v-app>
      <page-header />

      <main>

          <router-view></router-view>
          
      </main>

      <page-footer />
    </v-app>
  </div>
</template>

<script>

import PageHeader from '@/components/Header.vue'
import PageFooter from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #c2e59c; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #c2e59c, #64b3f4); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #c2e59c, #64b3f4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.danger-alert {
  color: red;
  font-weight: bold;
}
</style>
