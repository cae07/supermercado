<template>
    <div class="input-container">
      <div class="form-group row">
        <label for="yearsInput" class="col-sm-2 col-form-label">Ano:</label>
        <div class="col-sm-10">
          <select @change="getMonthAndYear" class="form-control" name="yearsInput" id="yearsInput" v-model="yearsInput">
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
          <select @change="getMonthAndYear" class="form-control" name="monthInput" id="monthInput" v-model="monthInput">
            <option value="">Selecione o mês</option>
            <option v-for="(month, idx) in months" :value="month" :key="idx">
              {{ month }}
            </option>
          </select>
        </div>
      </div>
    </div>
</template>

<script>
import arrays from '../arrays.helpers';

const { years, months } = arrays;

export default {
    name: 'InputsMonthYear',
    data() {
        return {
            years,
            months,
            yearsInput: '',
            monthInput: ''
        }
    },
    methods: {
      async getMonthAndYear() {
        this.$emit('monthAndYear', { year: this.yearsInput, month: this.monthInput });
      },
      updateYear() {
        const today = new Date(Date.now());
        this.yearsInput = today.getFullYear();
      }
    },
    mounted() {
      this.updateYear();
    }
}
</script>

<style scoped>

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
</style>