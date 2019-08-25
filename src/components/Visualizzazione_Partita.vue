<template>
    <b-container>
        <b-row class="col-up-offset-1">
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
                                           class="d-flex justify-content-between align-items-center"
                                           @click="selectTeam(teamData, 0)">
                            {{teamData.name}}
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>
            <b-col cols="3">
                <h3>Away</h3>
                <div style="height:450px; background-color: white">
                    <b-list-group class="teamList">
                        <b-list-group-item button v-for="teamData in appoggio" :key="teamData.id"
                                           class="d-flex justify-content-between align-items-center"
                                           @click="selectTeam(teamData, 1)">
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
      italian_team: [],
      english_team: [],
      spanish_team: [],
      french_team: [],
      german_team: [],
      nation_team: [],
      competitions: [],
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
      .then(this.division_team)
    fetch('/static/data/competitions.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.competitions = data))
      .then(this.setOptionsChampions)
      .then(this.filter_teams)
  },
  methods: {
    setOptionsChampions () {
      var output = []
      for (var i = 0; i < this.competitions.length; i++) {
        output.push(this.competitions[i].name)
      }
      this.championship.value = this.competitions[0].name
      this.championship.options = output
    },
    division_team () {
      for (var i = 0; i < this.teams.length; i++) {
        if (this.teams[i].type === 'club') {
          if (this.teams[i].area.name === 'Wales' || this.teams[i].area.name === 'England') {
            this.english_team.push(this.teams[i])
          } else if (this.teams[i].area.name === 'Italy') {
            this.italian_team.push(this.teams[i])
          } else if (this.teams[i].area.name === 'France') {
            this.french_team.push(this.teams[i])
          } else if (this.teams[i].area.name === 'Spain') {
            this.spanish_team.push(this.teams[i])
          } else if (this.teams[i].area.name === 'Germany') {
            this.german_team.push(this.teams[i])
          }
        } else {
          this.nation_team.push(this.teams[i])
        }
      }
    },
    filter_teams () {
      var champ = this.championship.value
      this.appoggio = []
      if (champ === this.competitions[0].name) {
        this.appoggio = this.italian_team
      } else if (champ === this.competitions[1].name) {
        this.appoggio = this.english_team
      } else if (champ === this.competitions[2].name) {
        this.appoggio = this.spanish_team
      } else if (champ === this.competitions[3].name) {
        this.appoggio = this.french_team
      } else if (champ === this.competitions[4].name) {
        this.appoggio = this.german_team
      } else if (champ === this.competitions[5].name || champ === this.competitions[6].name) {
        this.appoggio = this.nation_team
      }
    },
    selectTeam (teamSelected, home) {
      console.log('ciao')
    }
  },
  watch: {
    locazione: {
      handler (newVal) {
        this.filter_teams()
      },
      deep: true // force watching within properties
    },
    championship: {
      handler (newVal) {
        this.filter_teams()
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
