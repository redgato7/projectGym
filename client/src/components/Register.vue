<template>
  <v-app id="rejestracja">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6 lg4>
            <v-card class="elevation-12">
              <v-toolbar dark color="teal darken-1">
                <v-toolbar-title>Rejestracja</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="email" label="Email" v-model="email"></v-text-field>
                  <v-text-field v-model="password" autocomplete="new-password" prepend-icon="lock"
                   label="Hasło" type="password" @keyup.enter="register"
                   :append-icon="e1 ? 'visibility' : 'visibility_off'"
                   :append-icon-cb="() => (e1 = !e1)"
                   :type="e1 ? 'password' : 'text'"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer>
                  <v-btn
                  dark
                  color="teal darken-1"
                  @click="register">
                  Zarejestruj
                </v-btn>
              </v-spacer>
              </v-card-actions>
              <div class="danger-alert" v-html="error" />
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script> // skrypt jest obiektem z roznymi metodami jak wykonac usluge
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () { // data przypisuje wartosci które możemy przypisać wyżej w <template>
    return {
      e1: true,
      email: '',
      password: '',
      error: null
    }
  },
  methods: { // methods pozwalaja na ustalenie metod jak maja dzialac kody w ktorych mamy dostep z <template>
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'trainings'
        })
      } catch (error) {
        this.error = error.response.data.error // wyswietlenie errora z jakimkolwiek problemem z emailem lub haslem Authenticationcontrollerpolicy
      }
    }
  }
} // style scoped pozwala na ustalenie stylu jedynie w tym pliku vue
</script>

<style scoped>
#rejestracja{
  background: #c2e59c; /* fallback for old browsers */
 background: -webkit-linear-gradient(to right, #c2e59c, #64b3f4); /* Chrome 10-25, Safari 5.1-6 */
 background: linear-gradient(to right, #c2e59c, #64b3f4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

</style>
