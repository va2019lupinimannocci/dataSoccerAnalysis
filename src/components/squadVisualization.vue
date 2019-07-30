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
        <div style="height:400px; background-color: #c8ffbd"></div>
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
                }
            }
        }
    }

</script>

<style scoped>

</style>
