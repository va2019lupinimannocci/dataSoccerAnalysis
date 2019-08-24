<template>
    <b-container>
        <b-row class="col-up-offset-1">
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
                <b-form-group label="Select a Championship">
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
            <b-col cols="3">
                <h3>Home</h3>
                <div style="height:450px; background-color: white">
                    <b-list-group class="teamList">
                        <b-list-group-item button v-for="teamData in appoggio" :key="teamData.id"
                                           class="d-flex justify-content-between align-items-center">
                            {{teamData.name}}
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>
            <b-col cols="3">
                <h3>Fuori casa</h3>
                <div style="height:450px; background-color: white">
                    <b-list-group class="teamList">
                        <b-list-group-item button v-for="teamData in appoggio" :key="teamData.id"
                                           class="d-flex justify-content-between align-items-center">
                            {{teamData.name}}
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>
            <b-col cols="6">
                <h3>Info match</h3>
                <div style="height:500px; background-color: #DFDFDF"></div>
            </b-col>
            <b-col>
            </b-col>
        </b-row>
        <b-row class="col-up-offset-1">
            <b-col cols="3">
                <h3>Home</h3>
            </b-col>
            <b-col cols="3">
                <h3>Fuori casa</h3>
            </b-col>
            <b-col cols="6">
                <h3>Campo partita</h3>
                <div style="height:500px; background-color: #ADF2A5"></div>
            </b-col>
        </b-row>
        <b-row class="time col-up-offset-1 col-bt-offset-1">
            <b-col>
                <h5>Slider tempo partita</h5>
                <div style="height:50px; background-color: #C8FFBD"></div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'Visualizzazione_Partita',
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
      teams: [],
      appoggio: []
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
    }
  },
  watch: {
    locazione: {
      handler (newVal) {
        this.filterByElement()
      },
      deep: true // force watching within properties
    },
    championship: {
      handler (newVal) {
        this.filterByElement()
      },
      deep: true // force watching within properties
    }
  }
}
</script>

<style scoped>
    .col-up-offset-1{
        margin-top: 1em;
    }
    .col-bt-offset-1 {
        margin-bottom: 1em;
    }

    .col-lf-offset-1 {
        margin-left: 1em;
    }

    .text-align {
        text-align: left;
    }
    .teamList {
        max-height: 500px;
        margin-bottom: 10px;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        overflow-style: marquee-block;
    }
</style>
