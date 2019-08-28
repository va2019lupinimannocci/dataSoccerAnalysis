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
        <b-row class="field col-up-offset-1 row_team">
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
                <div style="height:250px; background-color: #DFDFDF">
                    <h4>{{title_match}}</h4>
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
                    </b-list-group>
                </div>
            </b-col>
            <b-col>
            </b-col>
        </b-row>
        <b-row class="col-up-offset-1">
            <b-col cols="6">
                <div style="height:700px; background-color: #DFDFDF;">
                    <h3>Home team</h3>
                    <b-list-group class="teamList">
                        <b-list-group-item button v-for="players in playersHome" :key="players.id"
                                           class="d-flex justify-content-between align-items-center">
                            {{ players.lastName}}
                            <b-badge variant="primary" pill>{{players.role}}</b-badge>
                        </b-list-group-item>
                    </b-list-group>
                    <b-list-group>
                        <b-list-group-item button v-for="players in playersSubHome" :key="players.id"
                                           class="d-flex justify-content-between align-items-center">
                            {{ players.lastName}}
                            <b-badge variant="primary" pill>{{players.role}}</b-badge>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>
            <b-col cols="6">
                <div style="height:700px; background-color: #DFDFDF;">
                    <h3>Away team</h3>
                    <b-list-group class="teamList">
                        <b-list-group-item button v-for="players in playersAway" :key="players.id"
                                           class="d-flex justify-content-between align-items-center">
                            {{ players.lastName}}
                            <b-badge variant="primary" pill>{{players.role}}</b-badge>
                        </b-list-group-item>
                    </b-list-group>
                    <b-list-group>
                        <b-list-group-item button v-for="players in playersSubAway" :key="players.id"
                                           class="d-flex justify-content-between align-items-center">
                            {{ players.lastName}}
                            <b-badge variant="primary" pill>{{players.role}}</b-badge>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>
        </b-row>
        <b-row class="time col-up-offset-1 col-bt-offset-1">
            <b-col>
                <h3>Campo partita</h3>
                <div style="height:500px; background-color: #ADF2A5"></div>
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
      european_team: [],
      world_team: [],
      matches_England: {},
      matches_European_Championship: {},
      matches_France: {},
      matches_Germany: {},
      matches_Italy: {},
      matches_Spain: {},
      matches_World_Cup: {},
      competitions: [],
      referees: {},
      players_data: {},
      appoggio: [],
      home_team: {},
      away_team: {},
      current_match: {},
      playersHome: [],
      playersSubHome: [],
      playersAway: [],
      playersSubAway: [],
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
    fetch('/static/data/players.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.players_data = data))
    /* fetch('/static/data/referees.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.referees = data)) */
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
          this.world_team.push(this.teams[i])
          this.european_team.push(this.teams[i])
        }
      }
      // console.log(Object.values(this.matches_European_Championship[0].teamsData)[0].teamId)
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
      } else if (champ === this.competitions[5].name) {
        this.appoggio = this.european_team
      } else if (champ === this.competitions[6].name) {
        this.appoggio = this.world_team
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
        this.title_match = 'Select the second team'
        console.log('Selezionare due squadre')
        return
      }
      if (this.home_team.name === this.away_team.name) {
        this.title_match = 'Select two different teams'
        this.date_match = ''
        this.gameWeek_match = ''
        this.duration_match = ''
        this.playersHome = []
        this.playersSubHome = []
        this.playersAway = []
        this.playersSubAway = []
        console.log('Squadre uguali')
        return
      }
      this.set_current_match()
      this.show_info_match()
      this.show_formation()
      // this.color_list_item()
    },
    set_current_match  () {
      var champ = this.championship.value
      if (champ === this.competitions[0].name) {
        this.current_match = this.find_match(this.matches_Italy)
      } else if (champ === this.competitions[1].name) {
        this.current_match = this.find_match(this.matches_England)
      } else if (champ === this.competitions[2].name) {
        this.current_match = this.find_match(this.matches_Spain)
      } else if (champ === this.competitions[3].name) {
        this.current_match = this.find_match(this.matches_France)
      } else if (champ === this.competitions[4].name) {
        this.current_match = this.find_match(this.matches_Germany)
      } else if (champ === this.competitions[5].name) {
        this.current_match = this.find_match(this.matches_European_Championship)
      } else if (champ === this.competitions[6].name) {
        this.current_match = this.find_match(this.matches_World_Cup)
      }
    },
    show_formation () {
      var formazioneHome = {}
      var sostituzioneHome = {}
      var formazioneAway = {}
      var sostituzioneAway = {}
      var bench = {}
      var i = 0
      var j = 0
      var p = {}
      var x = {}
      var inp = {}
      var sub = null
      var app = []
      this.playersHome = []
      this.playersSubHome = []
      this.playersAway = []
      this.playersSubAway = []

      if (this.current_match.teamsData[this.home_team.wyId].hasFormation) {
        formazioneHome = this.current_match.teamsData[this.home_team.wyId].formation.lineup
        sostituzioneHome = this.current_match.teamsData[this.home_team.wyId].formation.substitutions
        for (i = 0; i < formazioneHome.length; i++) {
          p = this.get_person(this.players_data, formazioneHome[i].playerId)
          for (j = 0; j < sostituzioneHome.length; j++) {
            if (formazioneHome[i].playerId === sostituzioneHome[j].playerOut) {
              sub = sostituzioneHome[j].minute
            }
          }
          x = {
            name: p.firstName,
            lastName: p.lastName,
            role: p.role.code3,
            goals: formazioneHome.goals,
            yellowCards: formazioneHome.yellowCards,
            redCards: formazioneHome.redCards,
            substitutionMinute: sub
          }
          app.push(x)
        }
        this.playersHome = this.orderByRole(app)

        app = []
        bench = this.current_match.teamsData[this.home_team.wyId].formation.bench
        for (i = 0; i < sostituzioneHome.length; i++) {
          p = this.get_person(this.players_data, sostituzioneHome[i].playerIn)
          for (j = 0; j < bench.length; j++) {
            if (bench[j].playerId === sostituzioneHome[i].playerIn) {
              inp = bench[j]
              x = {
                name: p.firstName,
                lastName: p.lastName,
                role: p.role.code3,
                goals: inp.goals,
                yellowCards: inp.yellowCards,
                redCards: inp.redCards,
                playerOut: sostituzioneHome.playerOut,
                substitutionMinute: sostituzioneHome.minute
              }
              app.push(x)
            }
          }
        }
        this.playersSubHome = this.orderByRole(app)
      }

      app = []
      if (this.current_match.teamsData[this.away_team.wyId].hasFormation) {
        formazioneAway = this.current_match.teamsData[this.away_team.wyId].formation.lineup
        for (i = 0; i < formazioneAway.length; i++) {
          p = this.get_person(this.players_data, formazioneAway[i].playerId)
          x = {
            name: p.firstName,
            lastName: p.lastName,
            role: p.role.code3,
            goals: formazioneAway.goals,
            yellowCards: formazioneAway.yellowCards,
            redCards: formazioneAway.redCards
          }
          app.push(x)
        }
        this.playersAway = this.orderByRole(app)

        app = []
        sostituzioneAway = this.current_match.teamsData[this.away_team.wyId].formation.substitutions
        bench = this.current_match.teamsData[this.away_team.wyId].formation.bench
        for (i = 0; i < sostituzioneAway.length; i++) {
          p = this.get_person(this.players_data, sostituzioneAway[i].playerIn)
          for (j = 0; j < bench.length; j++) {
            if (bench[j].playerId === sostituzioneAway[i].playerIn) {
              inp = bench[j]
              x = {
                name: p.firstName,
                lastName: p.lastName,
                role: p.role.code3,
                goals: inp.goals,
                yellowCards: inp.yellowCards,
                redCards: inp.redCards,
                playerOut: sostituzioneAway.playerOut,
                minute: sostituzioneAway.minute
              }
              app.push(x)
            }
          }
        }
        this.playersSubAway = this.orderByRole(app)
      }
    },
    orderByRole (obj) {
      var i
      var arr = []

      for (i = 0; i < obj.length; i++) {
        if (obj[i].role === 'GKP') {
          arr.push(obj[i])
          break
        }
      }
      for (i = 0; i < obj.length; i++) {
        if (obj[i].role === 'DEF') {
          arr.push(obj[i])
        }
      }
      for (i = 0; i < obj.length; i++) {
        if (obj[i].role === 'MID') {
          arr.push(obj[i])
        }
      }
      for (i = 0; i < obj.length; i++) {
        if (obj[i].role === 'FWD') {
          arr.push(obj[i])
        }
      }
      return arr
    },
    show_info_match () {
      var d = ''
      this.title_match = this.current_match.label
      d = this.current_match.dateutc.split(' ')
      this.date_match = 'Date match: ' + d[0]
      this.gameWeek_match = 'Game week: ' + this.current_match.gameweek
      this.duration_match = 'Duration match: ' + this.current_match.duration
    },
    find_match (obj) {
      var homeId = this.home_team.wyId
      var awayId = this.away_team.wyId
      for (var i = 0; i < obj.length; i++) {
        if (typeof obj[i].teamsData[homeId] !== 'undefined' && typeof obj[i].teamsData[awayId] !== 'undefined') {
          if (obj[i].teamsData[homeId].side === 'home' && obj[i].teamsData[awayId].side === 'away') {
            return obj[i]
          }
        }
      }
    },
    get_person (obj, id) {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].wyId === id) {
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
        max-height: 450px;
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
    .row_team {
        height: 500px;
    }
</style>
