<template>
  <b-container>
    <b-row class="mt-3">
      <h1>Squad Visualization</h1>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group label="Select Dimension">
          <b-form-checkbox-group
            v-model="locazione.value"
            :options="locazione.options"
            name="buttonsLocation"
            buttons
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Select a Championship" :disabled="checkBool()">
          <b-form-checkbox-group
            v-model="championship.value"
            :options="championship.options"
            name="buttonsBoats"
            buttons
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="field col-up-offset-1">
      <b-col cols="4">
        <h3>Rank Visualization</h3>
        <div style="height:600px; background-color: white">
          <b-list-group class="teamList">
            <b-list-group-item button v-for="teamData in appoggio" :key="teamData.id"
                               class="d-flex justify-content-between align-items-center"
                               @click="teamStatsFromId(teamData.name)">
              {{teamData.name}}
              <b-badge variant="primary" pill>{{teamData.abbr}}</b-badge>
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
      <b-col>
        <h3>Team's Stats Visualization</h3>
        <div style="height:500px; background-color: whitesmoke">
          <!--<rank-graph v-bind:class="[toggleClass]"/>-->
          <b-button variant="outline-success" size="sm" v-on:click="isHidden = true">Hide Legend</b-button>
          <b-button variant="outline-success" size="sm" v-on:click="isHidden = !isHidden">Show Legend</b-button>

          <div v-if="!isHidden" style="position: center">
              <b-list-group horizontal style="margin-left: 40px; margin-top: 5px">
                <b-list-group-item variant="success"><strong>Go</strong>al</b-list-group-item>
                <b-list-group-item variant="success"><strong>Pa</strong>sses</b-list-group-item>
                <b-list-group-item variant="success"><strong>Ai</strong>r duel</b-list-group-item>
                <b-list-group-item variant="success"><strong>Dr</strong>ibbling</b-list-group-item>
                <b-list-group-item variant="success"><strong>Ki</strong>ck</b-list-group-item>
                <b-list-group-item variant="success"><strong>Cr</strong>osses</b-list-group-item>
                <b-list-group-item variant="success"><strong>De</strong>fense</b-list-group-item>
              </b-list-group>
          </div>
          <div>
          <v-radar
            :stats="stats"
            :polycolor="polycolor"
            :radar="radar"
            :scale="scale">
          </v-radar>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="3">
        <b-list-group>
          <b-list-group-item button variant="dark" @click="passToBarchart('Goal')">Goal</b-list-group-item>
          <b-list-group-item button variant="dark" @click="passToBarchart('Number of Passes')">Number of Passes</b-list-group-item>
          <b-list-group-item button variant="dark" @click="passToBarchart('Air Duel')">Air Duel</b-list-group-item>
          <b-list-group-item button variant="dark" @click="passToBarchart('Number of Foul')">Number of Foul</b-list-group-item>
          <b-list-group-item button variant="dark" @click="passToBarchart('Dribbling')">Dribbling</b-list-group-item>
          <b-list-group-item button variant="dark" @click="passToBarchart('Corner')">Corner</b-list-group-item>
          <b-list-group-item button variant="dark" @click="passToBarchart('Cross')">Cross</b-list-group-item>
          <b-list-group-item button variant="dark" @click="passToBarchart('Kick')">Kick</b-list-group-item>
          <b-list-group-item button variant="dark" @click="passToBarchart('Defense')">Defense</b-list-group-item>
        </b-list-group>

      </b-col>
      <b-col>
        <h3>Barchart Based on {{this.dimension}}</h3>
        <div style="height:400px; background-color: whitesmoke">

            <BarChart :arr="this.grouped"></BarChart>
        </div>
      </b-col>
    </b-row>
    <div style="height: 20px"></div>
    <b-row>
      <b-col>
        <h3>Visualization Description</h3>
        <div class="description">
          <p>This visualization, based on dimension selected, has the scope to help the team
          manager to check what are the problem related to his team.</p>
          <p>In particular, in the first part of visualization there is the possibility to shift
          between club team (and all the major leauges available from data) or national team. Once
          the team manager find his team, he could check his team's stats and understand those skills
          that are needed to improve.</p>
          <p>In the second part of the visualization instead is possibile to check, regarding different measures,
          the screenshoot of all the contender inside the same league.</p>
          <p>The measure considered are: <b-link @click="passToBarchart('Goal')">Goal</b-link>,
            <b-link @click="passToBarchart('Number of Passes')">Number of Passes</b-link>, <b-link  @click="passToBarchart('Air Duel')">Air Duel</b-link>,
            <b-link @click="passToBarchart('Number of Foul')">Number of Foul</b-link>, <b-link @click="passToBarchart('Dribbling')">Dribbling</b-link>,
            <b-link @click="passToBarchart('Corner')">Corner</b-link>, <b-link @click="passToBarchart('Cross')">Cross</b-link>, <b-link @click="passToBarchart('Kick')">Kick</b-link> and
            <b-link @click="passToBarchart('Defense')">Defense</b-link>.</p>
          <p>The data are precomputed inside Anaconda, for each team has been extracted all the metrics available
          inside the visualization, then an interpolation has been applied in order to have all the metrics between values 0 and 100.</p>

        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Radar from 'vue-radar'
import BarChart from './barChart'

export default {
  name: 'squadVisualization',
  components: {
    'v-radar': Radar,
    BarChart
  },
  data () {
    return {
      locazione: {
        value: 'World',
        options: ['World', 'Single Nations']
      },
      championship: {
        value: 'Italy',
        options: ['France', 'Germany', 'Italy', 'Spain', 'England']
      },
      booleanoss: false,
      isHidden: false,
      teams: [],
      dimension: 'select a measure',
      appoggio: [],
      info: [],
      toggleClass: 'ani1',
      radar: {
        size: '425', // pixel unit
        viewbox: '800', // unit used inside the svg (here 400px = 1000 unités)
        radius: '300', // same unit than above (diamètre = 900), keep the radius < (viewbox / 2)
        structure: {
          external: { // external stroke of the structure's polygon
            strokeColor: 'rgba(0, 0, 0, 1)', // color (any css format is usable (hexa, rgb, rgba...))
            strokeWidth: '2' // pixel unit
          },
          internals: { // internals stroke of the structure's polygon (one every 10%)
            strokeColor: 'rgba(0, 0, 0, 1)', // color (any css format is usable (hexa, rgb, rgba...))
            strokeWidth: '1' // pixel unit
          },
          average: { // average polygon (placed at 50%)
            strokeColor: 'rgba(0, 0, 0, 1)', // stroke color (any css format is usable (hexa, rgb, rgba...))
            strokeWidth: '2', // pixel unit
            fillColor: 'rgba(0, 0, 0, .5)' // polygon color (any css format is usable (hexa, rgb, rgba...))
          }
        },
        lines: { // lines from center to summits
          strokeColor: 'rgba(0, 0, 0, 1)', // color (any css format is usable (hexa, rgb, rgba...))
          strokeWidth: '1' // pixel unit
        }
      },
      scale: { // scales of corresponding statistic
        goal: 100, // key must be equal to the corresponding statistic, lowercased and without accents
        passes: 100,
        airduel: 100,
        dribbling: 100,
        kick: 100,
        cross: 100,
        defense: 100
      },
      stats: [
        {
          name: 'Goal', // string
          value: 0, // int
          shortName: 'Goal' // The two first letters are used to be display next to their corresponding summits
        },
        {
          name: 'Passes',
          value: 0,
          shortName: 'Pass'
        },
        {
          name: 'Air Duel',
          value: 0,
          shortName: 'Air Duel'
        },
        {
          name: 'Dribbling',
          value: 0,
          shortName: 'Dribbling'
        },
        {
          name: 'Kick',
          value: 0,
          shortName: 'Kick'
        },
        {
          name: 'Crosses',
          value: 0,
          shortName: 'Cross'
        },
        {
          name: 'Defense',
          value: 0,
          shortName: 'Defense'
        }
      ],
      polycolor: '#81FF5FA6', // color (any css format is usable (hexa, rgb, rgba...))
      selected: '',
      grouped: [{ name: 'Manchester City', value: 80 },
        { name: 'Manchester United', value: 99 },
        { name: 'Arsenal', value: 70 },
        { name: 'Chelsea', value: 12 },
        { name: 'Stoke City', value: 23 },
        { name: 'Huddersfield', value: 23 },
        { name: 'West Ham', value: 8 },
        { name: 'Watford', value: 6 },
        { name: 'Liverpool', value: 100 },
        { name: 'Leicester', value: 9 }]
    }
  },
  mounted () {
    fetch('/static/data/teams.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.teams = data))
      .then(this.getDistinctValuesLocation)
      .then(this.getDistinctValuesChampionship)
    fetch('/static/data/results1.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.info = data))
      .then(this.filterByElement)
      .then(this.passToBarchart(this.dimension))
  },
  methods: {
    getDistinctValuesLocation () {
      var flags = []
      var output = []
      var l = this.teams.length
      var i
      for (i = 0; i < l; i++) {
        if (flags[this.teams[i].type]) continue
        flags[this.teams[i].type] = true
        output.push(this.jsUcfirst(this.teams[i].type))
      }
      console.log(output.length)
      this.locazione.options = output
      this.locazione.value = this.locazione.options[0]
    },
    getDistinctValuesChampionship () {
      var visited = []
      this.teams.forEach(function (team) {
        if (team.type === 'club') {
          const teamArea = team.area && team.area.name
          console.log(teamArea)
          visited.push(teamArea)
        }
      })
      var flags = []
      var output = []
      var l = visited.length
      var i
      for (i = 0; i < l; i++) {
        if (flags[visited[i]]) continue
        flags[visited[i]] = true
        output.push(this.jsUcfirst(visited[i]))
      }
      console.log(output.length)
      this.championship.options = output
      this.championship.value = this.championship.options[0]
      console.log('visited')
      console.log(visited.length)
    },
    jsUcfirst (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    jsLcfirst (string) {
      return string.charAt(0).toLowerCase() + string.slice(1)
    },
    usePippoArray (array) {
      this.appoggio = array
      this.rankByScore(this.appoggio)
    },
    filterByElement () {
      var pippoArray = []
      var valueNational = this.jsLcfirst(this.locazione.value)
      if (valueNational === 'club') {
        var valueChampionship = this.championship.value
        this.info.forEach(function (teamInfo) {
          if (teamInfo.type === valueNational && teamInfo.area === valueChampionship) {
            console.log('entrato')
            pippoArray.push(teamInfo)
          }
        })
      }
      if (valueNational === 'national') {
        this.info.forEach(function (teamInfo) {
          if (teamInfo.type === valueNational) {
            console.log('entrato')
            pippoArray.push(teamInfo)
          }
        })
      }
      this.usePippoArray(pippoArray)
    },
    rankByScore (array) {
      array.forEach(function (team) {
        var score = ((team.winStreak * 3) + (team.pairStreak))
        team['score'] = score
      })
      array.sort(function (a, b) {
        return b.score - a.score
      })
    },
    teamStatsFromId (id) {
      console.log('entrato')
      let teamStats
      this.appoggio.forEach(function (team) {
        if (team.name === id) {
          console.log('match')
          teamStats = [{
            name: 'Goal', // string
            value: team.goal, // int
            shortName: 'Goal' // The two first letters are used to be display next to their corresponding summits
          },
          {
            name: 'Passes',
            value: team.nummberPass,
            shortName: 'Pass'
          },
          {
            name: 'Air Duel',
            value: team.airDuel,
            shortName: 'AirDuel'
          },
          {
            name: 'Dribbling',
            value: team.dribbling,
            shortName: 'Dr'
          },
          {
            name: 'Kick',
            value: team.kick,
            shortName: 'Kick'
          },
          {
            name: 'Crosses',
            value: team.cross,
            shortName: 'Cross'
          },
          {
            name: 'Defense',
            value: team.defense,
            shortName: 'Defense'
          }]
          console.log(teamStats)
        }
      })
      this.stats = []
      this.stats = teamStats
      console.log(this.stats)
    },
    passToBarchart (selection) {
      this.dimension = selection
      console.log('entrato')
      let data = []
      if (selection === 'Goal') {
        this.appoggio.forEach(function (team) {
          data.push({name: team.abbr, value: team.goal})
        })
      }
      if (selection === 'Number of Passes') {
        this.appoggio.forEach(function (team) {
          data.push({name: team.abbr, value: team.nummberPass})
        })
      }
      if (selection === 'Air Duel') {
        this.appoggio.forEach(function (team) {
          data.push({name: team.abbr, value: team.airDuel})
        })
      }
      if (selection === 'Number of Foul') {
        this.appoggio.forEach(function (team) {
          data.push({name: team.abbr, value: team.numberFoul})
        })
      }
      if (selection === 'Dribbling') {
        this.appoggio.forEach(function (team) {
          data.push({name: team.abbr, value: team.dribbling})
        })
      }
      if (selection === 'Corner') {
        this.appoggio.forEach(function (team) {
          data.push({name: team.abbr, value: team.corner})
        })
      }
      if (selection === 'Cross') {
        this.appoggio.forEach(function (team) {
          data.push({name: team.abbr, value: team.cross})
        })
      }
      if (selection === 'Kick') {
        this.appoggio.forEach(function (team) {
          data.push({name: team.abbr, value: team.kick})
        })
      }
      if (selection === 'Defense') {
        this.appoggio.forEach(function (team) {
          data.push({name: team.abbr, value: team.defense})
        })
      }
      this.grouped = data
      console.log(data)
      console.log(this.grouped)
    },
    checkBool () {
      return this.booleanoss
    }
  },
  watch: {
    locazione: {
      handler (newVal) {
        this.filterByElement()
        this.passToBarchart(this.dimension)
      },
      deep: true // force watching within properties
    },
    championship: {
      handler (newVal) {
        this.filterByElement()
        this.passToBarchart(this.dimension)
      },
      deep: true // force watching within properties
    }

  }
}

</script>

<style scoped>
  .teamList {
    max-height: 450px;
    margin-bottom: 10px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    overflow-style: marquee-block;
  }

</style>
