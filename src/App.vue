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
    <LandPage></LandPage>
  </div>
</template>

<script>
import LandPage from './LandPage'
export default {
  name: 'App',
  components: {
    LandPage
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
  }
  .section {
    border: 1px solid;
    border-radius: 10px;
    padding: 1em;
    margin: 2em;
  }
  h4 {
    padding-bottom: 1em;
    padding-top: 1em;
  }
  p {
    padding-top: 2em;
    padding-left: 2em;
    padding-right: 2em;
  }
  .card-content p{
    padding-top: 0px;
    margin-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .card-content, b-card-body {
    padding-top: 10px;
  }
</style>
