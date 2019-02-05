<template>
  <v-content>
      <section>
        <v-parallax :src="require('../assets/mou.jpg')" height="850">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="../assets/podpis.png" alt="Vuetify.js" height="100">
            <h1 class="white--text mb-2 display-1 text-xs-center">Project Gym</h1>
            <div class="subheading mb-3 text-xs-center">Powered by Vue.js as a front-end and Node.js / Express.js as a back-end</div>

          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">Są dwa fundamenty jeśli chodzi o zaczęcie swojej przygody z siłownią</h2>

            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="teal--text text--darken-1">fitness_center</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Trening</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="teal--text text--darken-1">fastfood</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Dieta</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="require('../assets/mou2.jpg')" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">Z naszą aplikacją pierwsze kroki na siłowni są bardzo łatwe</div>
            <em>Zarejestruj się już teraz!</em>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Pomysł na aplikację webową</div>
                </v-card-title>
                Chcieliśmy żeby każdy początkujący na siłowni wiedział jak się do tego zabrać, dodatkowe informacje na pewno znajdą też u nas weterani
                                   oraz stali bywalcy. Wystarczy się zarejestrować żeby w skorzystać z wszystkich funkcjonalności serwisu.

              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Skontaktuj się z nami</div>
                </v-card-title>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="teal--text text--darken-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Słupsk, PL</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="teal--text text--darken-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>dawidzebacki@gmail.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
</v-content>
</template>

<script>
  export default {

  }
</script>
<style scoped>

.parallax { /* xs */
  width: 100%;
}

@media (min-width: 768px) { /* sm */
    .parallax {
        width: 100%;
    }
}

@media (min-width: 992px) { /* md */
    .parallax {
        width: 100%;
    }
}

@media (min-width: 1200px) { /* lg */
    .parallax {
        width: 100%;
        margin: ;
    }
}

img {
    height: 25%
}

p {
  color: #fff;
text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
display: block;
margin-top: 1em;
margin-bottom: 1em;
margin-left: 0;
margin-right: 0
}

h1{
  color: #fff;
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
    display: block;
font-size: 2em;
margin-top: 0.67em;
margin-bottom: 0.67em;
margin-left: 0;
margin-right: 0;
font-weight: bold;
}

h2{
  color: #fff;
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
    display: block;
    font-size: 1.5em;
    margin-top: 0.83em;
    margin-bottom: 0.83em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
}
</style>
