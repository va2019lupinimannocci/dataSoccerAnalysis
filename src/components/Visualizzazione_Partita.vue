<template>
    <b-container>
        <b-row class="field col-up-offset-1">
            <b-col cols="6">
                <h3>Campo da gioco</h3>
                <div style="height:600px; background-color: #C8FFBD"></div>
            </b-col>
            <b-col>
                <h3>Filtri sui dati</h3>
                <div style="height:600px; background-color: #C8FFBD">
                    <b-form-group  class="text-align col-up-offset-1 col-lf-offset-1"  label="Seleziona i dati che vuoi visualizzare">
                        <b-form-checkbox-group
                                v-model=selected
                                :options="eventType.options"
                                name="eventType"
                                buttons
                                stacked
                        ></b-form-checkbox-group>
                    </b-form-group>
                </div>
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
/*
import Vue from 'vue'
import crossfilter from 'crossfilter'

// crossfilter data management
let cf; // crossfilter instance
let dYear; // dimension for Year
let dRecordType; // dimension for RecordType
let dVesselType; // dimension for VesselType
*/

export default {
  name: 'Visualizzazione_Partita',
  data () {
    return {
      eventType: {
        value: 'Goal',
        options: ['Goal', 'Passaggio', 'Offside']
      }
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
</style>
