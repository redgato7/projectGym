<template>
    <v-toolbar  class="teal darken-1" dark>
    <v-toolbar-title class="mr-4">
      <router-link
        class="home"
        tag="span"
        :to="{
          name: 'home'
        }">
        Project Gym
      </router-link>
    </v-toolbar-title>

    <v-toolbar-items>

      <v-btn
        flat
        dark
        :to="{
          name: 'trainings'
        }">
        Trening
      </v-btn>

      <v-btn
        flat
        dark
        :to="{
          name: 'diets'
        }">
        Dieta
      </v-btn>

      <v-btn
        flat
        dark
        :to="{
          name: 'produkts'
        }">
        Produkty
      </v-btn>

      <v-btn
        flat
        dark
        :to="{
          name: 'calcs'
        }">
        Kalkulatory
      </v-btn>

    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        :to="{
          name: 'login'
        }">
        Zaloguj
      </v-btn>

      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        :to="{
          name: 'register'
        }">
        Zarejestruj
      </v-btn>



      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        @click="logout">
        Wyloguj
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: skyblue;
}
</style>
