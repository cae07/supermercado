<template>
  <div class="main-container">
    <BarChart />
    <InputsMonthYear @monthAndYear="getMonthAndYear" />
    <PieChart />
  </div>
</template>

<script>
import PieChart from '@/components/PieChart.vue';
import BarChart from '@/components/BarChart.vue';
import InputsMonthYear from '@/components/InputsMonthYear.vue';

export default {
  name: 'Graficos',
  components: {
    PieChart,
    BarChart,
    InputsMonthYear
  },
  data() {
    return {
      yearsInput: '',
      monthInput: ''
    }
  },
  methods: {
    getMonthAndYear({ year, month}) {
        this.yearsInput = year;
        this.monthInput = month;
      }
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 3%;
  align-items: center;
}
</style>