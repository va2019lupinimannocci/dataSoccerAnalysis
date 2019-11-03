<template>
  <b-container>
    <div class="section">
      <b-row>
        <b-col offset-md="2"  md="8">
          <p class="section" style="font-size: 20px;">
            This project has been developed by <strong>Lorenzo Mannocci</strong> and <strong>Matteo Lupini</strong> during the Laurea Magistrale in Data Science And Business Informatics,
            for the course of <strong>Visual Analytics</strong>, held by the professor <strong>Salvatore Rinzivillo</strong>.
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col col="6" style="margin-left:2em; margin-right:2em;">
          <b-card no-body class="overflow-hidden" style="max-width: 100%; height:450px;">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img src="/static/image/lorenzo_mannocci.JPG" class="rounded-0"></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body title="Lorenzo Mannocci">
                  <b-card-text class="card-content">
                    <b-list-group class="card-content">
                      <b-list-group-item>
                        <p>Laurea triennale: </p>
                        <p style="font-weight: bold;">Ingegneria Informatica</p>
                      </b-list-group-item>
                      <b-list-group-item>
                        <p>Laurea magistrale: </p>
                        <p style="font-weight: bold;">Data Science And Business Informatics</p>
                      </b-list-group-item>
                      <b-list-group-item>
                        <b-link href="https://www.linkedin.com/in/lorenzo-mannocci/" target="_blank">
                          <b-img src="/static/image/linkedin.png" fluid alt="linkedin" style="height:40px;"></b-img>
                        </b-link>
                      </b-list-group-item>
                    </b-list-group>
                    <p style="font-weight:bold; font-size:15px; margin-top: 20px;">
                      mannocci.lore@gmail.com
                    </p>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col col="6" style="margin-right:2em;">
          <b-card no-body class="overflow-hidden" style="max-width: 100%; height:450px;">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img src="/static/image/matteo_lupini.jpeg" class="rounded-0"></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body title="Matteo Lupini">
                  <b-card-text class="card-content">
                    <b-list-group class="card-content">
                      <b-list-group-item>
                        <p>Laurea triennale: </p>
                        <p style="font-weight: bold;">Informatica</p>
                      </b-list-group-item>
                      <b-list-group-item>
                        <p>Laurea magistrale: </p>
                        <p style="font-weight: bold;">Data Science And Business Informatics</p>
                      </b-list-group-item>
                      <b-list-group-item>
                        <b-link href="http://linkedin.com/in/matteo-lupini-7a6052158" target="_blank">
                          <b-img src="/static/image/linkedin.png" fluid alt="linkedin" style="height:40px;"></b-img>
                        </b-link>
                      </b-list-group-item>
                    </b-list-group>
                    <p style="font-weight:bold; font-size:15px; margin-top: 20px;">
                      matteo.lupini5@gmail.com
                    </p>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div class="section">
      <h4>Visualizzazione squadre</h4>
      <b-img src="/static/image/visualizzazione_squadre.JPG" fluid alt="Responsive image"></b-img>
      <p>
        This visualization, based on dimension selected, has the scope to help the team
        manager to check what are the problem related to his team.
        In particular, in the first part of visualization there is the possibility to shift
        between club team (and all the major leauges available from data) or national team. Once
        the team manager find his team, he could check his team's stats and understand those skills
        that are needed to improve.
        In the second part of the visualization instead is possible to check, regarding different measures,
        the screen-shot of all the contender inside the same league.
        The measure considered are: Goal, Number of Passes, Air Duel, Number of Foul, Dribbling, Corner, Cross, Defense.
        The data are precomputed inside Anaconda, for each team has been extracted all the metrics available
        inside the visualization, then an interpolation has been applied in order to have all the metrics between values 0 and 100.
      </p>
    </div>
    <div class="section">
      <h4>Visualizzazione partita</h4>
      <b-img src="/static/image/visualizzazione_partite.JPG" fluid alt="Responsive image"></b-img>
      <p>
        This view shows the data related to a single match. It was designed for a TV viewer or for football programs.
        It is therefore necessary to select two teams (in the case of a club championship) or directly a match (in the case of national teams).
        In the first case, in fact, every team has played against every other team, while in the case of Europeans or the World Cup, not all teams compete against each other.
        Once the match has been selected, it is possible to view the information on the match in the upper right-hand tab.
        In the second part it appears the lineup of the match, and the substitutions made.
        For each player, goals, own goals, substitutions, yellow and red cards are displayed.
        Finally in the final part it is possible to scroll a cursor indicating the time of the game, and consequently display some events that occurred during the game: corners, offsides, fouls and shots.
        The colors in this case relate to the two teams: red for the home team and blue for the away team.
        Not all events are displayed, as the files containing all the events would have been too large for a fetch executed on page loading.
      </p>
    </div>
    <div class="section">
      <h4>Visualizzazione giocatore</h4>
      <b-img src="/static/image/visualizzazione_giocatore.png" fluid alt="Responsive image"></b-img>
      <p>
        This visualization, based on measure selected, has the scope to help the D.S. manager to check what are the football player that have a certain skills.
        In particular this is for market reasons, because every D.S. has the possibility to check what are the players that the team need.
        In the first part of the visualization there is the table in which we have all the possible measure over which we can filter players,
        with a list that let the viewer see who are the player in that specific measures's ranges.
        Clicking over a name inside the list will render on card on bottom the exact values of the player in all the measures.
        In the second part of visualization there is also the bubble chart which display all players in different size of bubbles based on player score (precomputed).
        This has the aim to improve in a visual way the research of the best player inside all the other obtained by the list.
        In the visualization there are 4 kinds of colours based on role: GoalKeeper, Defense, Midfielder, Forward.
      </p>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'LandPage'
}
</script>

<style scoped>
  .section {
    border: 1px solid;
    border-radius: 10px;
    padding: 1em;
    margin: 2em;
  }
  h4 {
    padding-bottom: 1em;
    padding-top: 1em;
  }
  p {
    padding-top: 2em;
    padding-left: 2em;
    padding-right: 2em;
  }
  .card-content p{
    padding-top: 0px;
    margin-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .card-content, b-card-body {
    padding-top: 10px;
  }
</style>
