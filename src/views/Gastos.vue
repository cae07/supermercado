<template>
  <div id="main-container">
    <InputsMonthYear @monthAndYear="getMonthAndYear" />
    <ExpensesGrid :expenses="totalExpenses" :earnings="totalEarnings" />
  </div>
</template>

<script>
import ExpensesGrid from '@/components/ExpensesGrid.vue';
import InputsMonthYear from '../components/InputsMonthYear.vue';
import helpers from '../Helpers/fetchHelpers';

const { getAllMarketProductsByYear, getExpensesByYear } = helpers;

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
            totalEarnings: null

        }
    },
    methods: {
      async calculateExpenses() {
        if (this.yearsInput && this.monthInput) {
          const allProducts = await getAllMarketProductsByYear(this.yearsInput);
          const allExpenses = await getExpensesByYear(this.yearsInput);

          const monthProducts = allProducts.find(list => list.id === this.monthInput);
          const monthExpenses = allExpenses.find(list => list.id === this.monthInput);

          if (monthExpenses && monthProducts) {
            monthExpenses.gastos.alimentacao.supermercado = parseFloat(monthProducts?.produtos.reduce((prev, curr) => prev + curr.value, 0).toFixed(2)) || 0;
          }

          this.totalExpenses = monthExpenses?.gastos;
          this.totalEarnings = monthExpenses?.ganhos;

        }
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