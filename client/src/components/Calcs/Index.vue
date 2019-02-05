<template>

  <v-container grid-list-md text-xs-center mb-5>

   <v-layout row wrap>

     <v-flex lg6>

       <v-card class="">

         <one-rep-max />

       </v-card>

     </v-flex>

     <v-flex lg6>

       <v-card class="">

         <BMI />

       </v-card>

     </v-flex>


  </v-layout>

  <v-layout row wrap>

    <v-flex lg4>

      <v-card class="">

        <calories-intake />

      </v-card>

    </v-flex>

    <v-flex lg4>

      <v-card class="">

        <calories-burned />

      </v-card>

    </v-flex>

    <v-flex lg4 >

      <v-card class="">

        <czysta-masa-miesniowa />

      </v-card>

    </v-flex>

 </v-layout>

 <v-layout row wrap>

   <v-flex lg6>

     <v-card class="">

       <VO2Max />

     </v-card>

   </v-flex>

   <v-flex lg6>

     <v-card class="">

       <Makro />

     </v-card>

   </v-flex>

</v-layout>

  </v-container>

</template>

<script>
import OneRepMax from './OneRepMax'
import BMI from './BMI'
import CzystaMasaMiesniowa from './CzystaMasaMiesniowa'
import CaloriesIntake from './CaloriesIntake'
import VO2Max from './VO2Max'
import CaloriesBurned from './CaloriesBurned'
import Makro from './Makro'

export default {
  components: {
    OneRepMax,
    BMI,
    CzystaMasaMiesniowa,
    CaloriesIntake,
    CaloriesBurned,
    VO2Max,
    Makro
  },
  data () {
    return {

    }
  }
}

</script>

<style scoped>


</style>
