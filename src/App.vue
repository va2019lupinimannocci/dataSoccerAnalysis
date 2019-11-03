<template>
  <div id="enter">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">VA Soccer data</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/teams">Visualizzazione squadre</b-nav-item>
          <b-nav-item href="#">Visualizzazione giocatori</b-nav-item>
          <b-nav-item to="/matches">Visualizzazione partita</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
// eslint-disable-next-line camelcase
export default {
  name: 'App',
  components: {
    VisualizzazioneGiocatori
  }
}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: black;
    margin: 0;
    padding: 50px;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    background-color: white;

    position: relative;
    display: grid;
    grid: 100% / 200px 1fr;
    column-gap: 25px;

    @media screen and (max-width: 1000px) {
      grid: minmax(500px, 1fr) 200px/100%;
      column-gap: 60px;
    }
  }

  .parallel-container {
    padding-top: 50px;
    padding-left: 25px;

    @media screen and (max-width: 1000px) {
      padding-bottom: 20px;
    }
  }

  .coords {
    width: 100%;
    height: 100%;
    background-color: #b4bdc2;
    overflow: visible;

    /deep/ text {
      user-select: none;
    }
  }

  rect.overlay {
    // fill: rgba(255, 255, 255, 0.14);
  }

  .filter-info {
    max-height: 100%;
    overflow: auto;
    color: black;
    padding: 10px;
    will-change: contents;
    background-color: white;
    border: 2px solid #17a2b8;

    @media screen and (max-width: 1000px) {
      order: 1;
    }
  }

  .name-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 10px;

    > li {
      cursor: pointer;
      padding-bottom: 10px;

      &:hover,
      &:active,
      &:focus {
        color: #17a2b8;
      }
    }
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(#fff, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    background-color: #17a2b8;
  }
  .description{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
