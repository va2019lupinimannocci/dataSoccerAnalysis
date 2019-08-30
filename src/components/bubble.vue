<template>
  <div>
    <svg width="800" height="500">
      <g
        class="flower"
        v-for="player in layoutData.children"
        :key="player.data.name"
        :style="{
          transform: `translate(${player.x}px, ${player.y}px)`
        }"
      >
        <circle class="player__circle" :r="player.r" :fill="player.data.color"></circle>
        <text class="player__label">{{ player.data.name }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
import { hierarchy, pack } from 'd3-hierarchy'
export default {
  name: 'bubble',
  data () {
    return {
      players: [
        {
          name: 'KK',
          amount: 25,
          color: '#cc2936'
        },
        {
          name: 'Manolas',
          amount: 30,
          color: '#00a03e'
        },
        {
          name: 'Lukaku',
          amount: 15,
          color: '#2a93d4'
        },
        {
          name: 'Paulo',
          amount: 9,
          color: '#F7AD0A'
        },
        {
          name: 'Narcissuses',
          amount: 9,
          color: '#F7AD0A'
        }
      ]
    }
  },

  computed: {
    transformedFlowerData () {
      return {
        name: 'Top Level',
        children: this.players.map(player => ({
          ...player,
          size: player.amount,
          parent: 'Top Level'
        }))
      }
    },

    layoutData () {
      // Generate a D3 hierarchy
      const rootHierarchy = hierarchy(this.transformedFlowerData)
        .sum(d => d.size)
        .sort((a, b) => {
          return b.value - a.value
        })

      // Pack the circles inside the viewbox
      return pack()
        .size([800, 500])
        .padding(10)(rootHierarchy)
    }
  }
}
</script>

<style>
  body {
    font: 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif;
  }

  svg {
    display: block;
    margin: 0 auto;
  }

  .flower {
    transition: transform 0.2s ease-in-out;
    text-anchor: middle;
  }

  .player__circle {
    transition: r 0.2s ease-in-out;
  }

  .player__label {
    fill: #fff;
    font-weight: bold;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
</style>
