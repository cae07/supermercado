<template>
  <div id="main-container">
    <InputsMonthYear @monthAndYear="getMonthAndYear" />
    <ExpensesGrid :expenses="totalExpenses" :allItensSum="allItensSum" />
  </div>
</template>

<script>
import ExpensesGrid from '@/components/ExpensesGrid.vue';
import InputsMonthYear from '../components/InputsMonthYear.vue';
import helpers from '../Helpers/fetchHelpers';
import handles from '../Helpers/handles.helper';

const { getAllMarketProductsByYear, getExpensesByYear } = helpers;
const { handleSumOfAllExpenses, handleSupermarketExpenses } = handles;

export default {
    name: 'Gastos',
    components: {
      InputsMonthYear,
      ExpensesGrid
    },
    data() {
        return {
            yearsInput: '',
            monthInput: '',
            totalExpenses: null,
            totalEarnings: null,
            allItensSum: 0

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
      sumOfAllExpenses(monthExpenses) {
        this.allItensSum = handleSumOfAllExpenses(monthExpenses);
      },
      async getMonthAndYear({ year, month}) {
        this.yearsInput = year;
        this.monthInput = month;
        await this.calculateExpenses();
      }
    }
}
</script>

<style scoped>
#main-container {
  display: flex;
  flex-direction: column;
}

</style>
