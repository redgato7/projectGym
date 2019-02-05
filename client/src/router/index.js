import Vue from 'vue'
import Vuetify from 'vuetify'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Trainings from '@/components/Trainings/Index'
import Calcs from '@/components/Calcs/Index'
import Produkts from '@/components/Produkts/Index'
import EditProdukt from '@/components/EditProdukt'
import ViewProdukt from '@/components/ViewProdukt/Index'
import CreateTraining from '@/components/CreateTraining'
import EditTraining from '@/components/EditTraining'
import ViewTraining from '@/components/ViewTraining/Index'
import Diets from '@/components/Diets/Index'
import CreateDiet from '@/components/CreateDiet'
import EditDiet from '@/components/EditDiet'
import ViewDiet from '@/components/ViewDiet/Index'
import Home from '@/components/Home'

Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  routes: [
    {
      path: '/calcs',
      name: 'calcs',
      component: Calcs
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/diets',
      name: 'diets',
      component: Diets
    },
    {
      path: '/diets/create',
      name: 'diets-create',
      component: CreateDiet
    },
    {
      path: '/diets/:dietId',
      name: 'diet',
      component: ViewDiet
    },
    {
      path: '/diets/:dietId/edit',
      name: 'diet-edit',
      component: EditDiet
    },
    {
      path: '/trainings',
      name: 'trainings',
      component: Trainings
    },
    {
      path: '/trainings/create',
      name: 'trainings-create',
      component: CreateTraining
    },
    {
      path: '/trainings/:trainingId',
      name: 'training',
      component: ViewTraining
    },
    {
      path: '/trainings/:trainingId/edit',
      name: 'training-edit',
      component: EditTraining
    },
    {
      path: '/produkts',
      name: 'produkts',
      component: Produkts
    },
    {
      path: '/produkts/:produktId',
      name: 'produkt',
      component: ViewProdukt
    },
    {
      path: '/produkts/:produktId/edit',
      name: 'produkt-edit',
      component: EditProdukt
    },
    {
      path: '*',
      redirect: 'home'
    }
  ]
})
