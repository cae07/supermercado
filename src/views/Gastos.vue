<template>
  <div id="main-container">
    <div class="input-container">
      <div class="form-group row">
        <label for="yearsInput" class="col-sm-2 col-form-label">Ano:</label>
        <div class="col-sm-10">
          <select @change="calculateExpenses" class="form-control" name="yearsInput" id="yearsInput" v-model="yearsInput">
            <option value="">Selecione o ano</option>
            <option v-for="(year, idx) in years" :value="year" :key="idx">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="monthInput" class="col-sm-2 col-form-label">Mês:</label>
        <div class="col-sm-10">
          <select @change="calculateExpenses" class="form-control" name="monthInput" id="monthInput" v-model="monthInput">
            <option value="">Selecione o mês</option>
            <option v-for="(month, idx) in months" :value="month" :key="idx">
              {{ month }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <h1>R$ {{ totalExpenses }}</h1>
  </div>
</template>

<script>
import arrays from '../arrays.helpers';
import helpers from '../Helpers/fetchHelpers';

const { years, months } = arrays;
const { getAllProductsByDate } = helpers;

export default {
    name: 'Gastos',
    data() {
        return {
            years,
            months,
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

          const totalExpenses = allProducts.reduce((prev, curr) => prev + curr.value, 0);

          this.totalExpenses = totalExpenses.toFixed(2);
        }
      }
    }
}
</script>

<style scoped>
#main-container {
  display: flex;
  flex-direction: column;
}

.input-container { 
    display: flex;
    justify-content: space-around;
    width: 60vw;
    margin: 50px 0 50px 12vw;
}

.form-control {
    width: 250px;
    box-shadow: 4px 4px 10px #808080;
}

label {
  margin-right: -12px;
  font-size: 1.2em;
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