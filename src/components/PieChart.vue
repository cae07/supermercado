<template>
  <div class="chart-container">
    <div v-if="loading"></div>
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
    },
    chartSide: String
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
            backgroundColor: ['#D3D3D3', '#0000FF', '#7FFFD4', '#ADFF2F', '#D2691E', '#FF00FF', '#DC143C', '#FFFF00', '#87CEEB', '#00008B'],
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
            align: 'center',
            labels: {
              boxWidth: 35,
              padding: 10
            }
          },
        },
        layout: {
          padding: {
            right: 90 // Ajuste este valor para mover a legenda mais para a esquerda
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
  max-width: 80%;
  max-height: 80%;
  margin-top: 5%;
}
#chart {
  width: 52vw;
  height: 52vh
}
</style>
