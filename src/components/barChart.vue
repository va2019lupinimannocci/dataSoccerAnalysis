<template>
  <div>
    <!-- Text interpolation using Mustache syntax, is a basic form of data binding -->
    <svg :width="outsideWidth" :height="outsideHeight">
      <g :transform="`translate(${margin.left},${margin.top})`">
        <g class="bars">
          <rect
            v-for="item in arr"
            class="bar"
            :x="scale.x(item.name)"
            :y="scale.y(item.value)"
            :width="scale.x.bandwidth()"
            :height="height - scale.y(item.value)"
            :key="item.key"
          ></rect>
          <g class="teams" v-axis:x="scale" :transform="`translate(0,${height})`"></g>
          <g v-axis:y="scale"></g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'HelloMyBar',
  props: {
    arr: {
      type: Array,
      default: () => [{name: 'city',
        value: 2

      },
      {
        name: 'utd',
        value: 4
      }]
    }
  },
  data () {
    return {
      width: 650,
      height: 350,
      margin: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
      }
    }
  },
  computed: {
    outsideWidth () {
      return this.width + this.margin.left + this.margin.right
    },
    outsideHeight () {
      return this.height + this.margin.top + this.margin.bottom
    },
    scale () {
      const x = d3
        .scaleBand()
        .domain(this.arr.map(x => x.name))
        .rangeRound([0, this.width])
        .padding(0.15)
      const y = d3
        .scaleLinear()
        .domain([0, Math.max(...this.arr.map(x => x.value))])
        .rangeRound([this.height, 0])
      return { x, y }
    },
    til () {
      return 'Order By Value'
    }
  },
  directives: {
    axis (el, binding) {
      const axis = binding.arg
      const axisMethod = { x: 'axisBottom', y: 'axisLeft' }[axis]
      const methodArg = binding.value[axis]

      d3.select(el).call(d3[axisMethod](methodArg))
    }
  }
}
</script>

<style scoped>
  rect {
    fill: #81FF5FA6;
  }
</style>
