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
    <div>
      <div>
        <h4>Top and Bottom</h4>
        <b-card-group deck>
          <b-card img-src="https://placekitten.com/1000/300" img-alt="Card image" img-top>
            <b-card-text>
              Some quick example text to build on the card and make up the bulk of the card's content.
            </b-card-text>
          </b-card>

          <b-card img-src="https://placekitten.com/1000/300" img-alt="Card image" img-bottom>
            <b-card-text>
              Some quick example text to build on the card and make up the bulk of the card's content.
            </b-card-text>
          </b-card>
        </b-card-group>
      </div>
      <div class="mt-4">
        <h4>Left and Right (or Start and End)</h4>
        <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left class="mb-3">
          <b-card-text>
            Some quick example text to build on the card and make up the bulk of the card's content.
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
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
