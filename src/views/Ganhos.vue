<template>
  <div id="main-container">
    <InputsMonthYear @monthAndYear="getMonthAndYear" />
    <EarningsGrid :totalEarnings="totalEarnings" />
  </div>
</template>

<script>
import EarningsGrid from '@/components/EarningsGrid.vue';
import InputsMonthYear from '../components/InputsMonthYear.vue';
import helpers from '../Helpers/fetchHelpers';

const { getExpensesByYear } = helpers;

export default {
    name: 'Ganhos',
    components: {
      InputsMonthYear,
      EarningsGrid
    },
    data() {
      return {
        yearsInput: '',
        monthInput: '',
        totalEarnings: null
      }
    },
    methods: {
      async calculateExpenses() {
        if(this.yearsInput && this.monthInput){
          const allExpenses = await getExpensesByYear(this.yearsInput);
          const monthExpenses = allExpenses.find(list => list.id === this.monthInput);

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