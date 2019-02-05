<template>
  <v-app id="logowanie">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6 lg4>
            <v-card class="elevation-12">
              <v-toolbar dark color="teal darken-1">
                <v-toolbar-title>Logowanie</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="email" label="Email" v-model="email"></v-text-field>
                  <v-text-field v-model="password" autocomplete="new-password" prepend-icon="lock" label="Hasło"
                  @keyup.enter="login" :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"> </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer>
                  <v-btn
                  dark
                  color="teal darken-1"
                  @click="login">
                  Zaloguj
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

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      e1: true,
      email: '',
      password: '',
      error: null,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'trainings'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    changePassword () {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    }
  },
  watch: {

  }
}

</script>

<style scoped>
#logowanie{
  background: #c2e59c; /* fallback for old browsers */
 background: -webkit-linear-gradient(to right, #c2e59c, #64b3f4); /* Chrome 10-25, Safari 5.1-6 */
 background: linear-gradient(to right, #c2e59c, #64b3f4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.text {
  float:left;
}
</style>
