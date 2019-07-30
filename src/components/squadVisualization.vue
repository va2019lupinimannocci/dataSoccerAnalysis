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
      <b-col>
        <h3>Rank Visualization</h3>
        <div style="height:400px; background-color: #c8ffbd">
          <div v-for="teamData in teams" :key="teamData.wyId" class="teams-data">
            <div>
              <span class="officialName">{{teamData.officialName}}</span>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="time col-up-offset-1 col-bt-offset-1">
      <b-col>
        <h5>Description</h5>
        <div style="height:50px; background-color: #c8ffbd"></div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'squadVisualization',
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
      teams: []
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
    }

  }
}

</script>

<style scoped>

</style>
