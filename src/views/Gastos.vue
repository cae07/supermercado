<template>
  <div id="main-container">
    <InputsMonthYear @monthAndYear="getMonthAndYear" />
    <h2 v-if="allItensSum">Gastos = R${{ this.allItensSum }}</h2>
    <main class="result-container">
      <ExpensesGrid id="expenses-grid" :expenses="totalExpenses" />
      <PieChart id="pieChart" :monthExpenses="monthExpenses" />
    </main>
  </div>
</template>

<script>
import ExpensesGrid from '@/components/ExpensesGrid.vue';
import InputsMonthYear from '../components/InputsMonthYear.vue';
import PieChart from '@/components/PieChart.vue';
import helpers from '../Helpers/fetchHelpers';
import handles from '../Helpers/handles.helper';

const { getAllMarketProductsByYear, getExpensesByYear } = helpers;
const { handleSumOfAllExpenses, handleSupermarketExpenses } = handles;

export default {
    name: 'Gastos',
    components: {
      InputsMonthYear,
      ExpensesGrid,
      PieChart
    },
    data() {
        return {
            yearsInput: '',
            monthInput: '',
            totalExpenses: null,
            totalEarnings: null,
            allItensSum: 0,
            monthExpenses: null

        }
    },
    methods: {
      async calculateExpenses() {
        if (this.yearsInput && this.monthInput) {
          const allProducts = await getAllMarketProductsByYear(this.yearsInput);
          const allExpenses = await getExpensesByYear(this.yearsInput);
          const monthExpenses = handleSupermarketExpenses(allExpenses, allProducts, this.monthInput);

          this.sumOfAllExpenses(monthExpenses);
          
          this.totalExpenses = monthExpenses?.gastos;
          this.totalEarnings = monthExpenses?.ganhos;

        }
      },
      async getExpenses() {
        if (this.yearsInput && this.monthInput) {
          const allExpenses = await getExpensesByYear(this.yearsInput);
          const allProducts = await getAllMarketProductsByYear(this.yearsInput);

          const monthExpense = handleSupermarketExpenses(allExpenses, allProducts, this.monthInput);
          this.monthExpenses = monthExpense || null;
        }
      },
      sumOfAllExpenses(monthExpenses) {
        this.allItensSum = handleSumOfAllExpenses(monthExpenses);
      },
      async getMonthAndYear({ year, month}) {
        this.yearsInput = year;
        this.monthInput = month;
        await this.calculateExpenses();
        await this.getExpenses();
      }
    }
}
</script>

<style scoped>
#main-container {
  display: flex;
  flex-direction: column;
}

.result-container {
  display: flex;
  max-width: 80vw;
  margin-left: 2vw;
}

#pieChart {
  position: absolute;
  top: 20vh;
  right: -5vw;
  width: 50%;
}

h2 {
  text-shadow: 1px 1px 4px #808080;
  color: #FF4500;
  width: 80vw;
  margin-top: 3vh;
  text-align: center;
}

</style>
