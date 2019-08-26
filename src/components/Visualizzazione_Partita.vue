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
                        <b-list-group-item button v-for="teamData in appoggio" :key="teamData.id" ref="home_team"
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
                        <b-list-group-item button v-for="teamData in appoggio" :key="teamData.id" ref="away_team"
                                           class="d-flex justify-content-between align-items-center"
                                           @click="selectTeam(teamData, 1)">
                            {{teamData.name}}
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>
            <b-col cols="6">
                <h3>Info match</h3>
                <div style="height:500px; background-color: #DFDFDF">
                    <h2>{{title_match}}</h2>
                    <b-list-group>
                        <b-list-group-item class="info_match" style="text-align: left;">
                            {{ date_match }}
                        </b-list-group-item>
                        <b-list-group-item class="info_match" style="text-align: left;">
                            {{ gameWeek_match }}
                        </b-list-group-item>
                        <b-list-group-item class="info_match" style="text-align: left;">
                            {{ duration_match }}
                        </b-list-group-item>
                        <b-list-group-item class="info_match" style="text-align: left;">
                            {{ referee_match }}
                        </b-list-group-item>
                        <b-list-group-item class="info_match" style="text-align: left;">
                            {{ first_assistant }}
                        </b-list-group-item>
                        <b-list-group-item class="info_match" style="text-align: left;">
                            {{ second_assistant }}
                        </b-list-group-item>
                        <b-list-group-item class="info_match" style="text-align: left;">
                            {{ fourth_assistant }}
                        </b-list-group-item>
                    </b-list-group>
                </div>
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
      matches_England: {},
      matches_European_Championship: {},
      matches_France: {},
      matches_Germany: {},
      matches_Italy: {},
      matches_Spain: {},
      matches_World_Cup: {},
      competitions: [],
      appoggio: [],
      home_team: {},
      away_team: {},
      title_match: 'Select two valid team',
      date_match: '',
      gameWeek_match: '',
      duration_match: '',
      referee_match: '',
      first_assistant: '',
      second_assistant: '',
      fourth_assistant: ''

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
    fetch('/static/data/matches/matches_England.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.matches_England = data))
    fetch('/static/data/matches/matches_European_Championship.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.matches_European_Championship = data))
    fetch('/static/data/matches/matches_France.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.matches_France = data))
    fetch('/static/data/matches/matches_Germany.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.matches_Germany = data))
    fetch('/static/data/matches/matches_Spain.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.matches_Spain = data))
    fetch('/static/data/matches/matches_Italy.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.matches_Italy = data))
    fetch('/static/data/matches/matches_World_Cup.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.matches_World_Cup = data))
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
    color_list_item (teamSelected, home) {
      if (home === 0) {
        for (var i = 0; i < this.$refs.home_team; i++) {
          console.log(this.$refs.home_team[i].textNode)
          if (this.$refs.home_team[i].text === teamSelected.name) {
            console.log(this.$refs.home_team[i].name)
          }
        }
      } else {
        for (var j = 0; i < this.$refs.away_team; i++) {
          if (this.$refs.away_team[j].text === teamSelected.name) {
            console.log(this.$refs.away_team[j].name)
          }
        }
      }
    },
    selectTeam (teamSelected, home) {
      if (home === 0) {
        this.home_team = teamSelected
      } else {
        this.away_team = teamSelected
      }
      if ((Object.keys(this.home_team).length === 0) || (Object.keys(this.away_team).length === 0)) {
        console.log('Selezionare due squadre')
        return
      }
      if (this.home_team.name === this.away_team.name) {
        console.log('Squadre uguali')
        return
      }
      this.show_info_match()
      // this.color_list_item()
    },
    show_info_match () {
      var champ = this.championship.value
      var match = {}
      if (champ === this.competitions[0].name) {
        match = this.find_match(this.matches_Italy)
        this.title_match = match.label
        var d = match.dateutc.split(' ')
        this.date_match = 'Date match: ' + d[0]
        this.gameWeek_match = 'Game week: ' + match.gameweek
        this.duration_match = 'Duration match: ' + match.duration
      } else if (champ === this.competitions[1].name) {
        this.title_match = 'Prova2'
        this.date_match = 'Ciao2'
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
    find_match (obj) {
      var homeId = this.home_team.wyId
      var awayId = this.away_team.wyId
      for (var i = 0; i < obj.length; i++) {
        if (typeof obj[i].teamsData[homeId] !== 'undefined' && typeof obj[i].teamsData[awayId] !== 'undefined') {
          return obj[i]
        }
      }
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
    .info_match {
        height: 50px;
        margin-bottom: 10px;
        font-size: 20px;
    }
</style>
