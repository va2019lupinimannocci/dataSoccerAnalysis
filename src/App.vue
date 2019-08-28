<template>
  <div id="enter">
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
  <div id="app">
    <div class="filter-info">
      <ul v-if="tempNames" class="name-list">
        <li
          v-for="(item, index) in tempNames"
          :key="index"
          :style="{ color: colorScale(item.group) }"
          @mouseover="activeItem = item;"
          @mouseleave="activeItem = null;"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <div class="parallel-container">
      <!-- SVG Entry -->
      <parallel-coord
        class="coords"
        v-if="dataset"
        :dataset="dataset"
        :column-data="columnData"
        :filtered.sync="allFiltered"
        :filtered-sample.sync="filteredSample"
        :render-count="$data.$sampleAmount"
        :active-item="activeItem"
        :color="getColor"
        :line-style="getLineStyle"
      />
    </div>
  </div>
  </div>
</template>

<script>
import ParallelCoord from './components/ParallelCoord/index.vue'
import * as d3 from 'd3'
import _ from 'lodash'

window.d3 = d3

export default {
  name: 'App',
  components: {
    ParallelCoord
  },
  filters: {
    asString (object) {
      return Object.entries(object)
        .map(v => {
          return `${v[0]}: ${v[1]}`
        })
        .join('\n')
    }
  },
  data () {
    return {
      groupNames: [],
      $sampleAmount: 100,
      dataset: null,
      ignoredDimensions: ['name', 'id', 'group'],
      allFiltered: null,
      filteredSample: null,
      activeItem: null,
      testScale: d3
        .scaleLinear()
        .domain([1, 100])
        .range([50, 800])
    }
  },
  mounted () {
    window.scaler = this.testScale
  },
  beforeCreate () {
    d3.csv(
      './static/mod.csv'
    ).then(d => {
      // filter and set numbers
      const groups = []
      const cleaned = d.reduce((prev, cur) => {
        // return entries forced to numbers
        const entries = Object.entries(cur).map(v => {
          const f = parseFloat(v[1])
          const isNumber = !isNaN(f)
          return [v[0], isNumber ? f : v[1]]
        })

        const hasAllValues = entries.every(v => {
          return v[1] != null
        })

        if (hasAllValues) {
          if (!groups.includes(cur.group)) groups.push(cur.group)
          prev.push(
            entries.reduce((p, curv) => {
              const f = parseFloat(curv[1])
              if (!isNaN(f)) {
                p[curv[0]] = f
              } else {
                p[curv[0]] = curv[1]
              }
              return p
            }, {})
          )
        }

        return prev
      }, [])

      this.groupNames = Object.freeze(groups)
      this.dataset = cleaned
    })
  },
  computed: {
    /**
             * An array of dimension key names
             */
    columnKeys () {
      if (this.dataset) {
        return Object.keys(this.dataset[0]).filter(v => {
          return !this.ignoredDimensions.includes(v)
        })
      }
    },

    colorScale () {
      return d3
        .scaleOrdinal()
        .domain(this.groupNames)
        .range([...d3.schemeDark2, '#fff'])
    },

    /**
             * Creates columns to pass to the parallel coord
             */
    columnData () {
      if (this.columnKeys) {
        return this.columnKeys.map(v => {
          return {
            name: v
          }
        })
      }
    },

    tempNames () {
      const v = _.sampleSize(this.filteredSample, 50)
      v.sort((a, b) => {
        if (a.group < b.group) {
          return -1
        } else {
          return 1
        }
      })
      return v
    }
  },
  methods: {
    getColor (item) {
      return this.colorScale(item.group)
    },
    getLineStyle (item) {
      const sameGroup = this.activeItem && this.activeItem.group === item.group
      return {
        transition: 'opacity 300ms ease',
        opacity: sameGroup ? 1 : this.activeItem ? 0.15 : 0.55,
        strokeWidth: sameGroup ? 3 : 1
      }
    }
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
    background-color: white;
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
        color: #0dffa1;
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
</style>
