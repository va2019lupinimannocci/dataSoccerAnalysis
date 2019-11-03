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
        <b-row class="col-up-offset-1 row_team">
            <template v-if="championship.value!=='European Championship'&&championship.value!=='World Cup'">
                <b-col cols="3">
                    <h3>Home</h3>
                    <div style="height:500px; background-color: white">
                        <b-list-group class="teamList">
                            <b-list-group-item button v-for="(teamData, index) in appoggio" :key="teamData.id" ref="home_team"
                                               class="d-flex justify-content-between align-items-center"
                                               v-bind:style=" {backgroundColor:color_list_home[index].color} "
                                               @click="selectTeam(teamData, 0, index)">
                                {{teamData.name}}
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </b-col>
                <b-col cols="3">
                    <h3>Away</h3>
                    <div style="height:500px; background-color: white">
                        <b-list-group class="teamList">
                            <b-list-group-item button v-for="(teamData, index2) in appoggio" :key="teamData.id" ref="away_team"
                                               class="d-flex justify-content-between align-items-center"
                                               v-bind:style=" {backgroundColor:color_list_away[index2].color} "
                                               @click="selectTeam(teamData, 1, index2)">
                                {{teamData.name}}
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </b-col>
            </template>
            <template v-else>
                <b-col cols="6">
                    <b-list-group class="teamList">
                        <b-list-group-item  button v-for="(m, index3) in national_match" :key="m.id" ref="nations"
                                           class="d-flex justify-content-between align-items-center"
                                           v-bind:style=" {backgroundColor:color_nation[index3].color} "
                                           @click="select_match(m, index3)">
                            {{m.label.split(',')[0]}}
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
            </template>
            <b-col cols="6">
                <h3>Info match</h3>
                <div style="height:240px; background-color: #DFDFDF; border-radius: 5px;">
                    <h4 style="padding-top:10px; padding-bottom: 10px; background-color: #A5FDA5; border-radius:5px;">{{title_match}}</h4>
                    <template v-if = "date_match !== ''">
                        <b-list-group style=" max-width: 97%; padding-left:1em;">
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
                    </template>
                </div>
                <b-row>
                    <b-col>
                        <h3 class ="col-up-offset-1">Symbol legend</h3>
                    </b-col>
                </b-row>
                <div style="background-color: #DFDFDF; border-radius:5px;">
                    <b-row>
                        <b-col cols="6">
                            <b-list-group style="padding-left: 1em; padding-bottom: 1em;" class="col-up-offset-1">
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    Goal: <b-img class="icon-goal col-lf-offset-1" src="/static/image/icon-goal.png" fluid alt="goal" v-b-popover.hover="" title="Goal"></b-img>
                                </b-list-group-item>
                                <b-list-group-item class="d-flex justify-content-between align-items-center" style="text-align: left;">
                                    Own goal: <b-img class="icon-goal col-lf-offset-1" src="/static/image/icon-own-goal.png" fluid alt="goal" v-b-popover.hover="" title="Own goal"></b-img>
                                </b-list-group-item>
                                <b-list-group-item class="d-flex justify-content-between align-items-center" style="text-align: left;">
                                    Substitution: <b-img class="icon-goal col-lf-offset-1" src="/static/image/icon-sub-blue.png" fluid alt="goal" v-b-popover.hover="" title="Substitution"></b-img>
                                </b-list-group-item>
                                <b-list-group-item class="d-flex justify-content-between align-items-center" style="text-align: left;">
                                    Yellow card: <b-img class="icon-goal col-lf-offset-1" src="/static/image/icon-yellow-card.png" fluid alt="goal" v-b-popover.hover="" title="Yellow card"></b-img>
                                </b-list-group-item>
                                <b-list-group-item class="d-flex justify-content-between align-items-center" style="text-align: left;">
                                    Red card: <b-img class="icon-goal col-lf-offset-1" src="/static/image/icon-red-card.png" fluid alt="goal" v-b-popover.hover="" title="Red card"></b-img>
                                </b-list-group-item>
                            </b-list-group>
                        </b-col>
                        <b-col cols="6">
                            <b-list-group style="padding-right:1em;" class=" col-up-offset-1">
                                <b-list-group-item class="d-flex justify-content-between align-items-center" style="text-align: left;">
                                    Shot: <b-img class="icon-goal col-lf-offset-1" src="/static/image/icon-shot-away.png" fluid alt="goal" v-b-popover.hover="" title="Shot"></b-img>
                                </b-list-group-item>
                                <b-list-group-item class="d-flex justify-content-between align-items-center" style="text-align: left;">
                                    Corner: <b-img class="icon-goal col-lf-offset-1" src="/static/image/icon-corner-away.png" fluid alt="goal" v-b-popover.hover="" title="Corner"></b-img>
                                </b-list-group-item>
                                <b-list-group-item class="d-flex justify-content-between align-items-center" style="text-align: left;">
                                    Offside: <b-img class="icon-goal col-lf-offset-1" src="/static/image/icon-offside-away.png" fluid alt="goal" v-b-popover.hover="" title="Offside"></b-img>
                                </b-list-group-item>
                                <b-list-group-item class="d-flex justify-content-between align-items-center" style="text-align: left;">
                                    Foul: <b-img class="icon-goal col-lf-offset-1" src="/static/image/icon-foul-away.png" fluid alt="goal" v-b-popover.hover="" title="Foul"></b-img>
                                </b-list-group-item>
                            </b-list-group>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
        </b-row>
        <b-row class="col-up-offset-1">
            <b-col cols="6">
                <div style="height:900px; background-color: #DFDFDF; border-radius:5px;">
                    <h3 style="padding-top:10px; padding-bottom: 10px; background-color: #FDA5A5; border-radius:5px;">Home team</h3>
                    <template v-if = "coachHome !== ''">
                        <b-list-group class="playerList">
                            <b-list-group-item button class="d-flex align-items-center">
                               {{ coachHome }}
                                <b-badge class="col-lf-offset-1" variant="primary" pill>COACH</b-badge>
                             </b-list-group-item>
                        </b-list-group>
                    </template>
                    <template v-if = "this.playersHome.length !== 0" >
                        <h4>Line up</h4>
                    </template>
                    <b-list-group class="playerList">
                        <b-list-group-item button v-for="players in playersHome" :key="players.id"
                                           class="d-flex align-items-center">
                            {{ players.lastName}}
                            <template v-if = "players.goals > 0">
                                <template v-for="index in parseInt(players.goals)">
                                    <b-img :key="'home-goal-'+index" class="icon-goal col-lf-offset-1" src="/static/image/icon-goal.png" fluid alt="goal" v-b-popover.hover="" title="Goal"></b-img>
                                </template>
                            </template>
                            <template v-if = "players.ownGoals > 0&&no_own_goal_home===true">
                                <template v-for="index in parseInt(players.ownGoals)">
                                    <b-img :key="'home-own-goal-'+index" class="icon-goal col-lf-offset-1" src="/static/image/icon-own-goal.png" fluid alt="goal" v-b-popover.hover="" title="Own goal"></b-img>
                                </template>
                            </template>
                            <template v-if = "players.yellowCards > 0">
                                <b-img class="icon-card col-lf-offset-1" src="/static/image/icon-yellow-card.png" fluid alt="yellow card" v-b-popover.hover="players.yellowCards" title="Minute yellow card:"></b-img>
                            </template>
                            <template v-if = "players.redCards > 0">
                                <b-img class="icon-card col-lf-offset-1" src="/static/image/icon-red-card.png" fluid alt="red card" v-b-popover.hover="players.redCards" title="Minute red card:"></b-img>
                            </template>
                            <template v-if = "players.substitutionMinute > 0">
                                <b-img class="icon-card col-lf-offset-1" v-bind:src="players.nameImage" fluid alt="substitution" v-b-popover.hover="String(players.substitutionMinute)" title="Minute substitution:"></b-img>
                            </template>
                            <b-badge class="col-lf-offset-1" variant="primary" pill>{{players.role}}</b-badge>
                        </b-list-group-item>
                    </b-list-group>
                    <b-list-group>
                        <template v-if = "this.playersHome.length !== 0" >
                            <h4>Substitutions</h4>
                        </template>
                        <b-list-group-item button v-for="players in playersSubHome" :key="players.id"
                                           class="d-flex align-items-center">
                            {{ players.lastName}}
                            <template v-if = "players.goals > 0">
                                <template v-for="index in parseInt(players.goals)">
                                    <b-img :key="'sub-home-goal-'+index" class="icon-goal col-lf-offset-1" src="/static/image/icon-goal.png" fluid alt="goal" v-b-popover.hover="" title="Goal"></b-img>
                                </template>
                            </template>
                            <template v-if = "players.ownGoals > 0&&no_own_goal_home===true">
                                <template v-for="index in parseInt(players.ownGoals)">
                                    <b-img :key="'sub-home-own-goal-'+index" class="icon-goal col-lf-offset-1" src="/static/image/icon-own-goal.png" fluid alt="goal" v-b-popover.hover="" title="Own goal"></b-img>
                                </template>
                            </template>
                            <template v-if = "players.yellowCards > 0">
                                <b-img class="icon-card col-lf-offset-1" src="/static/image/icon-yellow-card.png" fluid alt="yellow card" v-b-popover.hover="players.yellowCards" title="Minute yellow card:"></b-img>
                            </template>
                            <template v-if = "players.redCards > 0">
                                <b-img class="icon-card col-lf-offset-1" src="/static/image/icon-red-card.png" fluid alt="red card" v-b-popover.hover="players.redCards" title="Minute red card:"></b-img>
                            </template>
                            <template v-if = "players.substitutionMinute > 0">
                                <b-img class="icon-card col-lf-offset-1" v-bind:src="players.nameImage" fluid alt="substitution" v-b-popover.hover="String(players.substitutionMinute)" title="Minute substitution:"></b-img>
                            </template>
                            <b-badge class="col-lf-offset-1" variant="primary" pill>{{players.role}}</b-badge>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>
            <b-col cols="6">
                <div style="height:900px; background-color: #DFDFDF; border-radius:5px;">
                    <h3 style="padding-top:10px; padding-bottom: 10px; background-color: #A5E3FD; border-radius:5px;">Away team</h3>
                    <template v-if = "coachAway !== ''">
                        <b-list-group class="playerList">
                            <b-list-group-item button class="d-flex align-items-center">
                                {{ coachAway }}
                                <b-badge class="col-lf-offset-1" variant="primary" pill>COACH</b-badge>
                            </b-list-group-item>
                        </b-list-group>
                    </template>
                    <template v-if = "this.playersAway.length !== 0" >
                        <h4>Line up</h4>
                    </template>
                    <b-list-group class="playerList">
                        <b-list-group-item button v-for="players in playersAway" :key="players.id"
                                           class="d-flex align-items-center">
                            {{ players.lastName}}
                            <template v-if = "players.goals > 0">
                                <template v-for="index in parseInt(players.goals)">
                                    <b-img :key="'away-goal-'+index" class="icon-goal col-lf-offset-1" src="/static/image/icon-goal.png" fluid alt="goal" v-b-popover.hover="" title="Goal"></b-img>
                                </template>
                            </template>
                            <template v-if = "players.ownGoals > 0&&no_own_goal_away===false">
                                <template v-for="index in parseInt(players.ownGoals)">
                                    <b-img :key="'away-own-goal-'+index" class="icon-goal col-lf-offset-1" src="/static/image/icon-own-goal.png" fluid alt="goal" v-b-popover.hover="" title="Own goal"></b-img>
                                </template>
                            </template>
                            <template v-if = "players.yellowCards > 0">
                                <b-img class="icon-card col-lf-offset-1" src="/static/image/icon-yellow-card.png" fluid alt="yellow card" v-b-popover.hover="players.yellowCards" title="Minute yellow card:"></b-img>
                            </template>
                            <template v-if = "players.redCards > 0">
                                <b-img class="icon-card col-lf-offset-1" src="/static/image/icon-red-card.png" fluid alt="red card" v-b-popover.hover="players.redCards" title="Minute red card:"></b-img>
                            </template>
                            <template v-if = "players.substitutionMinute > 0">
                                <b-img class="icon-card col-lf-offset-1" v-bind:src="players.nameImage" fluid alt="substitution" v-b-popover.hover="String(players.substitutionMinute)" title="Minute substitution:"></b-img>
                            </template>
                            <b-badge class="col-lf-offset-1" variant="primary" pill>{{players.role}}</b-badge>
                        </b-list-group-item>
                    </b-list-group>
                    <b-list-group>
                        <template v-if = "this.playersAway.length !== 0" >
                            <h4>Substitutions</h4>
                        </template>
                        <b-list-group-item button v-for="players in playersSubAway" :key="players.id"
                                           class="d-flex align-items-center">
                            {{ players.lastName}}
                            <template v-if = "players.goals > 0">
                                <template v-for="index in parseInt(players.goals)">
                                    <b-img :key="'sub-away-goal-'+index" class="icon-goal col-lf-offset-1" src="/static/image/icon-goal.png" fluid alt="goal" v-b-popover.hover="" title="Goal"></b-img>
                                </template>
                            </template>
                            <template v-if = "players.ownGoals > 0&&no_own_goal_away===false">
                                <template v-for="index in parseInt(players.ownGoals)">
                                    <b-img :key="'sub-away-own-goal-'+index" class="icon-goal col-lf-offset-1" src="/static/image/icon-own-goal.png" fluid alt="goal" v-b-popover.hover="" title="Own goal"></b-img>
                                </template>
                            </template>
                            <template v-if = "players.yellowCards > 0">
                                <b-img class="icon-card col-lf-offset-1" src="/static/image/icon-yellow-card.png" fluid alt="yellow card" v-b-popover.hover="players.yellowCards" title="Minute yellow card:"></b-img>
                            </template>
                            <template v-if = "players.redCards > 0">
                                <b-img class="icon-card col-lf-offset-1" src="/static/image/icon-red-card.png" fluid alt="red card" v-b-popover.hover="players.redCards" title="Minute red card:"></b-img>
                            </template>
                            <template v-if = "players.substitutionMinute > 0">
                                <b-img class="icon-card col-lf-offset-1" v-bind:src="players.nameImage" fluid alt="substitution" v-b-popover.hover="String(players.substitutionMinute)" title="Minute substitution:"></b-img>
                            </template>
                            <b-badge class="col-lf-offset-1" variant="primary" pill>{{players.role}}</b-badge>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <div id="field">
            </div>
        </b-row>
        <b-row>
            <b-input-group prepend="0" append="100" class="mt-3">
                <b-form-input id="timeRange" v-model="timeInterval" type="range"
                                             min="0" max="100" step="0.5"
                                             @input="load_event_field()"
                >
                </b-form-input>
            </b-input-group>
            <div class="col-bt-offset-1">Time match: {{timeInterval}}</div>
        </b-row>
        <b-row>
            <p style="border: 1px solid; border-radius: 5px; padding: 1em;">
                This view shows the data related to a single match. It was designed for a TV viewer or for football programs.
                It is therefore necessary to select two teams (in the case of a club championship) or directly a match (in the case of national teams).
                In the first case, in fact, every team has played against every other team, while in the case of Europeans or the World Cup, not all teams compete against each other.
                Once the match has been selected, it is possible to view the information on the match in the upper right-hand tab.
                In the lower part, instead, it appears the lineup of the match, and the substitutions made.
                For each player, goals, own goals, substitutions, yellow and red cards are displayed.
                Finally in the final part it is possible to scroll a cursor indicating the time of the game, and consequently display some events that occurred during the game: corners, offsides, fouls and shots.
                The colors in this case relate to the two teams: red for the home team and blue for the away team.
                Not all events are displayed, as the files containing all the events would have been too large for a fetch executed on page loading.
            </p>
        </b-row>
    </b-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const d3 = require('d3')

export default {
  name: 'Visualizzazione_Partita',
  data () {
    return {
      championship: {
        value: 'Italy',
        options: ['France', 'Germany', 'Italy', 'Spain', 'England']
      },
      // contiene tutti i team e le loro informazioni
      teams: [],
      // contengono i team divisi per campionato, vengono settati on load page
      national_match: [],
      italian_team: [],
      english_team: [],
      spanish_team: [],
      french_team: [],
      german_team: [],
      european_team: [],
      world_team: [],

      // contengono i match divisi per campionato
      matches_England: {},
      matches_European_Championship: {},
      matches_France: {},
      matches_Germany: {},
      matches_Italy: {},
      matches_Spain: {},
      matches_World_Cup: {},

      // contiene i vari tipi di competizioni, serve per creare il menù in alto
      competitions: [],

      // contiene tutti i giocatori
      players_data: {},
      // contiene tutti i coaches
      coaches: {},
      // array di appoggio, contiene i teams da mostrare ad ogni nuovo campionato selezionato
      appoggio: [],

      // contengono i background color delle liste o dei match (nazionali) o dei team (club), servono per fare il v-bind quando si seleziona un team o match
      color_list_home: [],
      color_list_away: [],
      color_nation: [],

      // array che contiene i src delle iconi delle sostituzioni, usato per visualizzare icone di colore diverso per ogni sostituzione
      nameImage: [
        '/static/image/icon-sub-blue.png',
        '/static/image/icon-sub-green.png',
        '/static/image/icon-sub-violet.png',
        'static/image/icon-sub-orange.png'
      ],

      // contengono il team in casa e fuori casa selezionato del match
      home_team: {},
      away_team: {},

      // contiene il match corrente (uno solo)
      current_match: {},
      // contiene gli eventi del match correnti
      current_event: [],

      // contengono le lineup e le sostituzioni delle due squadre selezionate
      playersHome: [],
      playersSubHome: [],
      playersAway: [],
      playersSubAway: [],

      // allenatori visualizzati, possono rimanere vuote, perché non in tutti i match è riportato l'allenatore
      coachHome: '',
      coachAway: '',

      // info match visualizzate
      title_match: 'Select two valid team',
      date_match: '',
      gameWeek_match: '',
      duration_match: '',

      // gli autogoals hanno degli errori nei dati dei file JSON: ovvero sono corretti se effettivamente c'è stato un autogoal nella partita,
      // ma non lo sono e sono settati casualmente se non ci sono stati autogoal nella partita
      // queste due variabili tengono di conto se ci sono stati autogol nella partita nelle due squadre e in base a questo gli autogoal sono
      // visualizzati o meno. Per verificare se ci siano stati autogoal o meno, viene confrontato il risultato finale della partita con
      // i goal fatti, se c'è uno scarto, i goal mancanti sono degli autogoal e allora possono essere visualizzati
      no_own_goal_home: false,
      no_own_goal_away: false,

      // valore dello slider
      timeInterval: 0.5,
      // ampiezza dell'intervallo con cui vengono visualizzati gli eventi sul campo
      rangeBase: 1,

      // coordinate del campo nel svg, tutto deve essere shiftato di questi valori
      xCoord: 70,
      yCoord: 20,
      // colore del campo da calcio
      fillColor: '#f9fafa',
      // colore delle linee del campo da calcio
      lineColor: '#AEAEAE',
      // dimensioni campo da calcio
      widthRect: 1000,
      heightRect: 500,

      // contengono gli eventi divisi per campionato
      events_England: {},
      events_European_Championship: {},
      events_France: {},
      events_Germany: {},
      events_Italy: {},
      events_Spain: {},
      events_World_Cup: {}
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
    fetch('/static/data/coaches.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.coaches = data))
    fetch('/static/data/events/events_Italy.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.events_Italy = data))
    fetch('/static/data/events/events_England.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.events_England = data))
    fetch('/static/data/events/events_European_Championship.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.events_European_Championship = data))
    fetch('/static/data/events/events_France.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.events_France = data))
    fetch('/static/data/events/events_Germany.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.events_Germany = data))
    fetch('/static/data/events/events_Spain.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.events_Spain = data))
    fetch('/static/data/events/events_World_Cup.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => (this.events_World_Cup = data))

    // crea il campo da calcio con d3
    this.createField()
  },
  methods: {
    // setta i valuese e options del menù dei campionati
    setOptionsChampions () {
      var output = []
      for (var i = 0; i < this.competitions.length; i++) {
        output.push(this.competitions[i].name)
      }
      this.championship.value = this.competitions[0].name
      this.championship.options = output
    },

    // suddivide i team nei vari array, gli array delle nazionali non verranno poi usati, perché viene visualizzato direttamente il match
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
    },

    // on load page, dopo aver caricato i campionati e ogni volta che viene cambiato il valore del campionato selezionato
    // viene chiamata questa funzione che resetta gli array dei colori, l'array di appoggio e lo setta per il nuovo
    // campionato selezionato, nel caso di campionati per club e nel caso delle nazionali
    filter_teams () {
      var champ = this.championship.value
      this.appoggio = []
      this.color_list_away = []
      this.color_list_home = []
      this.color_nation = []
      this.national_match = []
      var i = 0
      var x = {}
      var y = {}
      var j = {}
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
        this.national_match = this.matches_European_Championship
        for (i = 0; i < this.matches_European_Championship.length; i++) {
          j = {
            color: '#FFFFFF'
          }
          this.color_nation.push(j)
        }
      } else if (champ === this.competitions[6].name) {
        this.appoggio = this.world_team
        this.national_match = this.matches_World_Cup
        for (i = 0; i < this.matches_World_Cup.length; i++) {
          j = {
            color: '#FFFFFF'
          }
          this.color_nation.push(j)
        }
      }

      for (i = 0; i < this.appoggio.length; i++) {
        x = {
          color: '#FFFFFF'
        }
        y = {
          color: '#FFFFFF'
        }
        this.color_list_home.push(x)
        this.color_list_away.push(y)
      }
    },

    // SOLO NAZIONALI!! DIRETTAMENTE SELEZIONATO IL MATCH
    // funzione chiamata ogni volta che viene cliccato un team: colora l'item della lista relativo al team selezionato (e ovviamente fa tornare bianco
    // il team selezionato precedentemente). Estrae dal match selezionato i due team, così da ricondursi al caso del campionato da club
    select_match (matchSelected, index) {
      var i = 0
      var item0 = Object.keys(matchSelected.teamsData)[0]
      var item1 = Object.keys(matchSelected.teamsData)[1]
      var idHome = 0
      var idAway = 0
      this.current_match = matchSelected
      for (i = 0; i < this.color_nation.length; i++) {
        this.color_nation[i].color = '#FFFFFF'
      }
      this.color_nation[index].color = '#A5FDA5'

      // il primo o il secondo team potrebbero essere il team in casa o fuori casa, per saperlo è necessario prima accedere il team e poi
      // guardare la proprietà 'side'
      if (matchSelected.teamsData[item0].side === 'home') {
        idHome = matchSelected.teamsData[item0].teamId
        idAway = matchSelected.teamsData[item1].teamId
      } else {
        idAway = matchSelected.teamsData[item0].teamId
        idHome = matchSelected.teamsData[item1].teamId
      }
      this.home_team = this.get_person(this.teams, idHome)
      this.away_team = this.get_person(this.teams, idAway)

      this.show_info_match()
      this.show_formation()

      // Chiamo la filter_events, che filtra gli eventi dal file passato, selezionando solo queli del match corrente
      if (this.championship.value === this.competitions[5].name) {
        this.current_match = this.find_match(this.matches_European_Championship)
        this.filter_events(this.events_European_Championship)
      } else {
        this.current_match = this.find_match(this.matches_World_Cup)
        this.filter_events(this.events_World_Cup)
      }

      // Anche all'inizio, prima che il cursore del range venga cambiato carico gli eventi del match attuale, se ve ne sono
      this.load_event_field()
    },

    // SOLO CLUB
    // colora l'item della lista del club selezionato
    color_list_item (teamSelected, home, index) {
      var i = 0
      if (home === 0) {
        for (i = 0; i < this.color_list_home.length; i++) {
          this.color_list_home[i].color = '#FFFFFF'
        }
        this.color_list_home[index].color = '#FDA5A5'
      } else {
        for (i = 0; i < this.color_list_away.length; i++) {
          this.color_list_away[i].color = '#FFFFFF'
        }
        this.color_list_away[index].color = '#A5E3FD'
      }
    },

    // SOLO CLUB!! NO NAZIONALI Vedi selectMatch()
    // Funzione chiamata ogni volta che si seleziona un team, anche nel caso in cui sia stato selezionato un solo team e l'altro ancora no
    selectTeam (teamSelected, home, index) {
      if (home === 0) {
        this.home_team = teamSelected
      } else {
        this.away_team = teamSelected
      }

      this.color_list_item(teamSelected, home, index)

      // Caso in cui ho selezionato un team per primo e l'altro non è ancora stato selezionato
      if ((Object.keys(this.home_team).length === 0) || (Object.keys(this.away_team).length === 0)) {
        this.title_match = 'Select the second team'
        console.log('Selezionare due squadre')
        return
      }

      // Caso in cui i due team selezionati sono uguali, elimino tutte le informazioni visualizzate
      if (this.home_team.name === this.away_team.name) {
        this.title_match = 'Select two different teams'
        this.date_match = ''
        this.gameWeek_match = ''
        this.duration_match = ''
        this.playersHome = []
        this.playersSubHome = []
        this.playersAway = []
        this.playersSubAway = []
        this.coachHome = ''
        this.coachAway = ''
        console.log('Squadre uguali')
        return
      }
      this.set_current_match()
      this.show_info_match()
      this.show_formation()
      this.load_event_field()
    },

    // SOLO CLUB!! NO NAZIONALI filter_events() chiamata dentro la selct_match()
    // Setta il match corrente, in base al campionato selezionato e poi sempre in base al campionato selezionato
    // fa un filtro chiamando la funzione, per selezionare solo gli eventi del match corrente
    set_current_match  () {
      var champ = this.championship.value
      if (champ === this.competitions[0].name) {
        this.current_match = this.find_match(this.matches_Italy)
        this.filter_events(this.events_Italy)
      } else if (champ === this.competitions[1].name) {
        this.current_match = this.find_match(this.matches_England)
        this.filter_events(this.events_England)
      } else if (champ === this.competitions[2].name) {
        this.current_match = this.find_match(this.matches_Spain)
        this.filter_events(this.events_Spain)
      } else if (champ === this.competitions[3].name) {
        this.current_match = this.find_match(this.matches_France)
        this.filter_events(this.events_France)
      } else if (champ === this.competitions[4].name) {
        this.current_match = this.find_match(this.matches_Germany)
        this.filter_events(this.events_Germany)
      }
    },

    // Filtra gli eventi, selezionando dall'array passato solamente gli eventi relativi al match corrente e li mette in current_event
    filter_events (eventsArray) {
      var i = 0
      this.current_event = []
      for (i = 0; i < eventsArray.length; i++) {
        if (eventsArray[i].matchId === this.current_match.wyId) {
          this.current_event.push(eventsArray[i])
        }
      }
    },

    // CLUB E NAZIONALI
    // Compie le medesime operazioni due volte, una per la squadra in casa e una per quella fuori casa
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
      var subMin = null
      var subIn = null
      var app = []
      var coach = ''
      var nm = null
      var index = 0
      var pointHome = 0
      var pointAway = 0
      this.playersHome = []
      this.playersSubHome = []
      this.playersAway = []
      this.playersSubAway = []

      // Non tutti i match riportano la formazione
      if (this.current_match.teamsData[this.home_team.wyId].hasFormation) {
        formazioneHome = this.current_match.teamsData[this.home_team.wyId].formation.lineup
        sostituzioneHome = this.current_match.teamsData[this.home_team.wyId].formation.substitutions

        // Seleziona il coach, che non necessariamente è riportato, ritrova i dati relativi all'id passato,
        // tramite la get_person()
        coach = this.get_person(this.coaches, this.current_match.teamsData[this.home_team.wyId].coachId)
        if (this.current_match.teamsData[this.home_team.wyId].coachId !== 0) {
          this.coachHome = 'Coach: ' + coach.lastName
        } else {
          this.coachHome = 'Coach: '
        }

        // Scorrendo tutti i giocatori della lineup, ottiene i dati per ogni giocatore e se il giocatore è stato sostituito,
        // ovvero è fra i giocatori presenti nell'array delle sostituzioni, salvo le informazioni relative al minuto della sostituzione
        // setto l'icona della sostituzione (diversa per ogni sostituzione) e aggiorno index che è appunto l'indice per non
        // utilizzare la stessa icona per due diverse sostituzioni
        for (i = 0; i < formazioneHome.length; i++) {
          p = this.get_person(this.players_data, formazioneHome[i].playerId)
          for (j = 0; j < sostituzioneHome.length; j++) {
            if (formazioneHome[i].playerId === sostituzioneHome[j].playerOut) {
              subMin = sostituzioneHome[j].minute
              subIn = sostituzioneHome[j].playerIn
              nm = this.nameImage[index]
              index = index + 1
            }
          }
          x = {
            name: p.firstName,
            lastName: p.lastName,
            role: p.role.code3,
            goals: formazioneHome[i].goals,
            ownGoals: formazioneHome[i].ownGoals,
            yellowCards: formazioneHome[i].yellowCards,
            redCards: formazioneHome[i].redCards,
            playerIn: subIn,
            substitutionMinute: subMin,
            nameImage: nm
          }

          // pointHome tiene la somma dei goal fatti dai giocatori, confrontato alla fine dell'array con il punteggio finale, per verificare
          // se mancano dei goal, in quel caso sono da tenere in considerazione gli autogoal (vedi errore nei dati)
          if (formazioneHome[i].goals !== 'null') {
            pointHome = pointHome + parseInt(formazioneHome[i].goals)
          }
          subMin = null
          subIn = null
          nm = null
          app.push(x)
        }
        // ordino i giocatori in base al ruolo, dal portiere all'attacco
        this.playersHome = this.orderByRole(app)

        // Qui estraggo le informazioni relative ai giocatori che entrano a partita in corso: le sostituzioni
        index = 0
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
                ownGoals: inp.ownGoals,
                yellowCards: inp.yellowCards,
                redCards: inp.redCards,
                playerOut: sostituzioneHome[i].playerOut,
                substitutionMinute: sostituzioneHome[i].minute,
                nameImage: this.nameImage[i]
              }
              if (inp.goals !== 'null') {
                pointHome = pointHome + parseInt(inp.goals)
              }
              app.push(x)
            }
          }
        }
        this.playersSubHome = this.orderByRole(app)

        // Controllo se i goal totali dei giocatori coincidono con il punteggio finale, per sapere se considerare gli autogoal o meno
        if (parseInt(this.current_match.teamsData[this.home_team.wyId].score) === pointHome) {
          this.no_own_goal_home = true
        } else {
          this.no_own_goal_home = false
        }
      }

      index = 0
      app = []
      if (this.current_match.teamsData[this.away_team.wyId].hasFormation) {
        formazioneAway = this.current_match.teamsData[this.away_team.wyId].formation.lineup
        sostituzioneAway = this.current_match.teamsData[this.away_team.wyId].formation.substitutions

        coach = this.get_person(this.coaches, this.current_match.teamsData[this.away_team.wyId].coachId)
        if (this.current_match.teamsData[this.away_team.wyId].coachId !== 0) {
          this.coachAway = 'Coach: ' + coach.lastName
        } else {
          this.coachAway = 'Coach: '
        }
        for (i = 0; i < formazioneAway.length; i++) {
          p = this.get_person(this.players_data, formazioneAway[i].playerId)
          for (j = 0; j < sostituzioneAway.length; j++) {
            if (formazioneAway[i].playerId === sostituzioneAway[j].playerOut) {
              subMin = sostituzioneAway[j].minute
              subIn = sostituzioneAway[j].playerIn
              nm = this.nameImage[index]
              index = index + 1
            }
          }
          x = {
            name: p.firstName,
            lastName: p.lastName,
            role: p.role.code3,
            goals: formazioneAway[i].goals,
            ownGoals: formazioneAway[i].ownGoals,
            yellowCards: formazioneAway[i].yellowCards,
            redCards: formazioneAway[i].redCards,
            playerIn: subIn,
            substitutionMinute: subMin,
            nameImage: nm
          }
          if (formazioneAway[i].goals !== 'null') {
            pointAway = pointAway + parseInt(formazioneAway[i].goals)
          }
          subMin = null
          subIn = null
          nm = null
          app.push(x)
        }
        this.playersAway = this.orderByRole(app)

        index = 0
        app = []
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
                ownGoals: inp.ownGoals,
                yellowCards: inp.yellowCards,
                redCards: inp.redCards,
                playerOut: sostituzioneAway[i].playerOut,
                substitutionMinute: sostituzioneAway[i].minute,
                nameImage: this.nameImage[i]
              }
              app.push(x)
              if (inp.goals !== 'null') {
                pointAway = pointAway + parseInt(inp.goals)
              }
            }
          }
        }
        this.playersSubAway = this.orderByRole(app)
        if (pointAway === parseInt(this.current_match.teamsData[this.away_team.wyId].score)) {
          this.no_own_goal_away = true
        } else {
          this.no_own_goal_away = false
        }
      }
    },

    // Ordina in base al ruolo
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

    // Aggiorna le info mostrate del match
    show_info_match () {
      var d = ''
      this.title_match = this.current_match.label
      d = this.current_match.dateutc.split(' ')
      this.date_match = 'Date match: ' + d[0]
      this.gameWeek_match = 'Game week: ' + this.current_match.gameweek
      this.duration_match = 'Duration match: ' + this.current_match.duration
    },

    // Date due squadre e l'array passato dei match, in base al campionato selezionato, trovail match corrispondente, considerando,
    // nel secondo if, che ci sono due match (solo nel caso dei club), che coinvologono le due squadre selezionate, la partita di andata
    // e quella di ritorno
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

    // Dato un'array in cui cercare un oggetto, lo trova sulla base dell'id passato
    get_person (obj, id) {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].wyId === id) {
          return obj[i]
        }
      }
    },

    // Per ogni evento del match, controlla se è relativo al minuto selezionato e nel caso chiama la funzione che crea l'icona
    // Rimuove le icone che sono attualmente presenti nel campo
    load_event_field () {
      if (this.current_match.length !== 0) {
        var svg = d3.select('svg')
        svg.selectAll('.previous').remove()
        var i = 0

        for (i = 0; i < this.current_event.length; i++) {
          if (this.check_event_second(this.current_event[i].eventSec, this.current_event[i].matchPeriod, i)) {
            console.log(this.current_event[i])
            this.print_event_field(this.current_event[i])
          }
        }
      }
    },

    // Controlla che l'evento selezionato sia da mostrare. I secondi nei dati sono segnati a partire dall'inizio della metà del tempo,
    // ovvero si riazzerano con il secondo tempo
    check_event_second (sec, period) {
      var time = this.timeInterval
      if (this.timeInterval >= 45) {
        time = this.timeInterval - 45
      }
      var min = time - this.rangeBase / 2
      var max = parseFloat(time) + this.rangeBase / 2

      if (min * 60 <= sec && max * 60 >= sec) {
        if (this.timeInterval <= 45 && period === '1H') {
          return true
        }
        if (this.timeInterval >= 45 && period === '2H') {
          return true
        }
      }
      return false
    },

    // Stampa l'icona, selezionando quella del colore giusta in base a quale squadra appartiene l'evento selezionato
    print_event_field (e) {
      var im = ''
      var home = false
      //  ['Offside', 'Shot', 'Corner', 'Foul']
      if (e.subEventName === '') {
        if (e.teamId === this.home_team.wyId) {
          im = '/static/image/icon-offside-home.png'
          home = true
        } else {
          im = '/static/image/icon-offside-away.png'
          home = false
        }
        this.append_image(e, im, home)
      } else if (e.subEventName === 'Shot') {
        if (e.teamId === this.home_team.wyId) {
          im = '/static/image/icon-shot-home.png'
          home = true
        } else {
          im = '/static/image/icon-shot-away.png'
          home = false
        }
        this.append_image(e, im, home)
      } else if (e.subEventName === 'Corner') {
        if (e.teamId === this.home_team.wyId) {
          im = '/static/image/icon-corner-home.png'
          home = true
        } else {
          im = '/static/image/icon-corner-away.png'
          home = false
        }
        this.append_image(e, im, home)
      } else if (e.subEventName === 'Foul') {
        if (e.teamId === this.home_team.wyId) {
          im = '/static/image/icon-foul-home.png'
          home = true
        } else {
          im = '/static/image/icon-foul-away.png'
          home = false
        }
        this.append_image(e, im, home)
      }
    },

    // Crea l'immagine nel campo da calcio
    append_image (e, im, home) {
      var svg = d3.select('svg')
      svg.append('image')
        .attr('xlink:href', im)
        .attr('width', 40)
        .attr('height', 40)
        .attr('x', this.posX(e.positions[0].x, home))
        .attr('y', this.posY(e.positions[0].y, home))
        .attr('class', 'previous')
    },

    // Le due funzioni ritornano la posizione sull'asse X e Y coretta nel svg
    // Nel caso degli eventi fuori casa è necessario correggerre con (100-percentage), perché nei dati le coordinate sono date rispetto all'attaccante
    // dunque cambiano in base al fatto che un evento appartenga a una squadra o all'altra
    // -20 è un fattore di scala per via della presenza delle linee del campo
    posX (percentage, home) {
      if (home === false) {
        return this.xCoord + (100 - percentage) * this.widthRect / 100 - 20
      } else {
        return this.xCoord + percentage * this.widthRect / 100 - 20
      }
    },
    posY (percentage, home) {
      if (home === false) {
        return this.yCoord + (100 - percentage) * this.heightRect / 100 - 20
      } else {
        return this.yCoord + percentage * this.heightRect / 100 - 20
      }
    },

    // Crea il campo da calcio con d3
    createField () {
      var holder = d3.select('#field') // select the element
        .append('svg') // append an SVG element to the body
        .attr('width', this.widthRect + 100)
        .attr('height', this.heightRect + 50)
        .style('margin-top', '40px')
      // draw a rectangle - pitch
      holder.append('rect') // attach a rectangle
        .attr('x', this.xCoord) // position the left of the rectangle
        .attr('y', this.yCoord) // position the top of the rectangle
        .attr('height', this.heightRect) // set the height
        .attr('width', this.widthRect) // set the width
        .style('stroke-width', 5) // set the stroke width
        .style('stroke', this.lineColor) // set the line colour
        .style('fill', this.fillColor) // set the fill colour
      // draw a rectangle - halves
      holder.append('rect') // attach a rectangle
        .attr('x', this.xCoord) // position the left of the rectangle
        .attr('y', this.yCoord) // position the top of the rectangle
        .attr('height', 500) // set the height
        .attr('width', 500) // set the width
        .style('stroke-width', 5) // set the stroke width
        .style('stroke', this.lineColor) // set the line colour
        .style('fill', this.fillColor) // set the fill colour
      // draw a circle - center circle
      holder.append('circle') // attach a circle
        .attr('cx', 500 + this.xCoord) // position the x-centre
        .attr('cy', 250 + this.yCoord) // position the y-centre
        .attr('r', 50) // set the radius
        .style('stroke-width', 5) // set the stroke width
        .style('stroke', this.lineColor) // set the line colour
        .style('fill', 'none') // set the fill colour
      // draw a rectangle - penalty area 1
      holder.append('rect') // attach a rectangle
        .attr('x', this.xCoord) // position the left of the rectangle
        .attr('y', 105 + this.yCoord) // position the top of the rectangle
        .attr('height', 290) // set the height
        .attr('width', 170) // set the width
        .style('stroke-width', 5) // set the stroke width
        .style('stroke', this.lineColor) // set the line colour
        .style('fill', this.fillColor) // set the fill colour
      // draw a rectangle - penalty area 2
      holder.append('rect') // attach a rectangle
        .attr('x', 830 + this.xCoord) // position the left of the rectangle
        .attr('y', 105 + this.yCoord) // position the top of the rectangle
        .attr('height', 290) // set the height
        .attr('width', 170) // set the width
        .style('stroke-width', 5) // set the stroke width
        .style('stroke', this.lineColor) // set the line colour
        .style('fill', this.fillColor) // set the fill colour
      // draw a rectangle - six yard box 1
      holder.append('rect') // attach a rectangle
        .attr('x', this.xCoord) // position the left of the rectangle
        .attr('y', 184 + this.yCoord) // position the top of the rectangle
        .attr('height', 132) // set the height
        .attr('width', 60) // set the width
        .style('stroke-width', 5) // set the stroke width
        .style('stroke', this.lineColor) // set the line colour
        .style('fill', this.fillColor) // set the fill colour
      // draw a rectangle - six yard box 2
      holder.append('rect') // attach a rectangle
        .attr('x', 940 + this.xCoord) // position the left of the rectangle
        .attr('y', 184 + this.yCoord) // position the top of the rectangle
        .attr('height', 132) // set the height
        .attr('width', 60) // set the width
        .style('stroke-width', 5) // set the stroke width
        .style('stroke', this.lineColor) // set the line colour
        .style('fill', this.fillColor) // set the fill colour
      // draw a circle - penalty spot 1
      holder.append('circle') // attach a circle
        .attr('cx', 120 + this.xCoord) // position the x-centre
        .attr('cy', 250) // position the y-centre
        .attr('r', 5) // set the radius
        .style('fill', this.lineColor) // set the fill colour
      // draw a circle - penalty spot 2
      holder.append('circle') // attach a circle
        .attr('cx', 880 + this.xCoord) // position the x-centre
        .attr('cy', 250 + this.yCoord) // position the y-centre
        .attr('r', 5) // set the radius
        .style('fill', this.lineColor) // set the fill colour
      // draw a circle - center spot
      holder.append('circle') // attach a circle
        .attr('cx', 500 + this.xCoord) // position the x-centre
        .attr('cy', 250 + this.yCoord) // position the y-centre
        .attr('r', 5) // set the radius
        .style('fill', this.lineColor) // set the fill colour
    }
  },
  watch: {
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
    h4 {
        font-size: 20px;
    }
    .teamList {
         max-height: 600px;
         margin-bottom: 10px;
         overflow: scroll;
         -webkit-overflow-scrolling: touch;
         overflow-style: marquee-block;
     }
    .playerList {
        max-height: 600px;
        margin-bottom: 10px;
    }
    .info_match {
        height: 50px;
        margin-bottom: 10px;
        font-size: 20px;
    }
    .row_team {
        height: 650px;
    }

    .icon-goal {
        height: 15px;
    }
    .icon-card {
        height: 20px;
    }
</style>
