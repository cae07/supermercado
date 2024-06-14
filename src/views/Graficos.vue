<template>
  <div class="main-container">
    <BarChart />
  </div>
</template>

<script>
import BarChart from '@/components/BarChart.vue';

export default {
  name: 'Graficos',
  components: {
    BarChart
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  margin-left: 3%;
  align-items: center;
  margin-top: 5vh;
}
</style>