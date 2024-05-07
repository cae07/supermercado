<template>
  <div id="main-container">
    <InputsMonthYear @monthAndYear="getMonthAndYear" />
    <h1>R$ {{ totalExpenses }}</h1>
  </div>
</template>

<script>
import InputsMonthYear from '../components/InputsMonthYear.vue';
import helpers from '../Helpers/fetchHelpers';

const { getAllProductsByDate } = helpers;

export default {
    name: 'Gastos',
    components: {
      InputsMonthYear
    },
    data() {
        return {
            yearsInput: '',
            monthInput: '',
            totalExpenses: 0
        }
    },
    methods: {
      async calculateExpenses() {
        if (this.yearsInput && this.monthInput) {
          const dataToFetch = `${this.monthInput.toLowerCase()}-${this.yearsInput}`;
          const allProducts = await getAllProductsByDate(dataToFetch);

          this.totalExpenses = allProducts.reduce((prev, curr) => prev + curr.value, 0).toFixed(2);
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

h1 {
  margin-top: 15vh;
  margin-left: 55vh;
  width: 50vw;
  height: 50vh;
  font-size: 5em;
  text-shadow: 3px 3px 7px #808080;
  color: #FF4500;
}
</style>