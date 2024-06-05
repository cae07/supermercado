<template>
  <Pie id="chart" :data="data" :options="options" />
</template>

<script>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  data() {
    return {
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 12, 24]
          }
        ]
      },
      options: {
        responsive: true
      }
    }
  }
}
</script>

<style scoped>
#chart {
  max-width: 40%;
  max-height: 40%;
  margin: 5%;
  margin-top: 10%
}
</style>
