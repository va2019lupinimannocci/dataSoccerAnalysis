<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">VA Soccer data</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Visualizzazione squadre</b-nav-item>
          <b-nav-item href="#">Visualizzazione giocatori</b-nav-item>
          <b-nav-item href="#">Visualizzazione partita</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Visualizzazione_Partita></Visualizzazione_Partita>
  </div>
</template>

<script>
// eslint-disable-next-line camelcase
import Visualizzazione_Partita from '@/components/Visualizzazione_Partita'
export default {
  name: 'App',
  components: {Visualizzazione_Partita}
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
