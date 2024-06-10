<template>
  <div class="main-container">
    <BarChart />
    <InputsMonthYear @monthAndYear="getMonthAndYear" />
    <PieChart :monthExpenses="monthExpenses" />
  </div>
</template>

<script>
import PieChart from '@/components/PieChart.vue';
import BarChart from '@/components/BarChart.vue';
import InputsMonthYear from '@/components/InputsMonthYear.vue';
import helpers from '../Helpers/fetchHelpers';
import handles from '../Helpers/handles.helper';

const { getExpensesByYear, getAllMarketProductsByYear } = helpers;
const { handleSupermarketExpenses } = handles;

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
      monthInput: '',
      monthExpenses: null
    }
  },
  methods: {
    async getMonthAndYear({ year, month}) {
      this.yearsInput = year;
      this.monthInput = month;

      await this.getExpenses();
    },
    async getExpenses() {
      if (this.yearsInput && this.monthInput) {
        const allExpenses = await getExpensesByYear(this.yearsInput);
        const allProducts = await getAllMarketProductsByYear(this.yearsInput);

        const monthExpense = handleSupermarketExpenses(allExpenses, allProducts, this.monthInput);
        this.monthExpenses = monthExpense || null;
      }
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