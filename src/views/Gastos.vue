<template>
  <div id="main-container">
    <InputsMonthYear @monthAndYear="getMonthAndYear" />
    <ExpensesGrid :expenses="totalExpenses" :earnings="totalEarnings" :allItensSum="allItensSum" />
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
            totalEarnings: null,
            allItensSum: 0

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
            const total = parseFloat(monthProducts?.produtos.reduce((prev, curr) => prev + curr.value, 0).toFixed(2)) || 0;
            if (!monthExpenses.gastos.alimentacao) {
              monthExpenses.gastos = {
                    ...monthExpenses.gastos,
                    alimentacao: {
                      supermercado: total
                    }
                };
            } else {
              monthExpenses.gastos.alimentacao.supermercado = total;

            }
          }

          this.handleSumOfAllExpenses(monthExpenses);
          
          this.totalExpenses = monthExpenses?.gastos;
          this.totalEarnings = monthExpenses?.ganhos;

        }
      },
      handleSumOfAllExpenses(monthExpenses) {
        let totalSum = 0;
        if (monthExpenses?.gastos) {
          const { gastos } = monthExpenses;

          for(let itens of Object.values(gastos)){
            if (itens) {
              for (let item of Object.values(itens)) {
                totalSum += item;
              }

            }
          }
        }
        this.allItensSum = totalSum.toFixed(2);
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
