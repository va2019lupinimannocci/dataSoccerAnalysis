// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App'
import LandPage from './LandPage'
import VisualizzazionePartita from './components/Visualizzazione_Partita'
import VisualizzazioneSquadre from './components/squadVisualization'
import VisualizzazioneGiocatori from './VisualizzazioneGiocatori'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)

/**
 *  Definition of routes
 */
const routes = [
  {
    path: '/',
    component: LandPage
  },
  {
    path: '/matches',
    component: VisualizzazionePartita
  },
  {
    path: '/teams',
    component: VisualizzazioneSquadre
  },
  {
    path: '/players',
    component: VisualizzazioneGiocatori
  }
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
