<template>
  <div class="chart-container">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <Pie id="chart" :key="chartKey" :data="data" :options="options" />
    </div>
  </div>
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
  props: {
    monthExpenses: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Pie 
  },
  data() {
    return {
      loading: true,
      chartKey: 0,  // Key to force re-rendering
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: ['#836FFF', '#00FFFF', '#008080', '#00FA9A', '#ADFF2F', '#FFFF00', '#4B0082', '#8B008B', '#FF4500'],
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            align: 'start',
            labels: {
              boxWidth: 20,
              padding: 20
            }
          }
        }
      }
    }
  },
  watch: {
    monthExpenses: {
      handler: 'updateChartData',
      immediate: true
    }
  },
  methods: {
    updateChartData() {
      if (this.monthExpenses?.gastos) {
        const { gastos } = this.monthExpenses;

        const labels = Object.keys(gastos);
        const data = labels.map(category => {
          const total = Object.values(gastos[category]).reduce((acc, curr) => acc + curr, 0);
          return Number(total).toFixed(2);
        });

        this.data.labels = labels;
        this.data.datasets[0].data = data.map(item => Number(item));
        this.loading = false;
      } else {
        this.data.labels = [];
        this.data.datasets[0].data = [];
        this.loading = true;
      }

      // Change the key to force re-render
      this.chartKey += 1;
    }
  },
  mounted() {
    this.updateChartData();
  }
}
</script>

<style scoped>
.chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row; /* Layout in row */
  max-width: 100%;
  max-height: 100%;
  margin-top: 5%;
}
#chart {
  width: 60vw;
  height: 60vh
}
</style>
