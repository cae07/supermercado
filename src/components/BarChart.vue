<template>
  <InputsMonthYear @monthAndYear="getMonthAndYear" :isBarChart="true" />
  <div v-if="loading">Escolha o ano</div>
  <div v-else>
    <Bar :key="chartKey" class="chartBar" :data="data" :options="options" />
    <h2 :class="{ 'earnings': isPositive, 'expenses': !isPositive }">
      Total investido ano {{ actualYear }}: {{ (earnings - expenses).toFixed(2) }}
    </h2>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import helpers from '../Helpers/fetchHelpers';
import months from '../arrays.helpers/month'
import handles from '../Helpers/handles.helper';
import InputsMonthYear from '../components/InputsMonthYear.vue';

const { getExpensesByYear, getAllMarketProductsByYear } = helpers;
const { handleSumOfAllExpenses, handleSupermarketExpenses } = handles;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
  name: 'BarChart',
  components: {
    Bar,
    InputsMonthYear
  },
  data() {
    return {
      monthInput: '',
      loading: true,
      expenses: 0,
      earnings: 0,
      isPositive: true,
      actualYear: '',
      chartKey: 0,
      data: {
        labels: months,
        datasets: [
          {
            label: 'Gastos',
            backgroundColor: '#f87979',
            data: []
          },
          {
            label: 'Rendimentos',
            backgroundColor: '#00c04b',
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: false
          },
          y: {
            stacked: false
          }
        }
      }
    }
  },
  methods: {
    getEarningsData(allExpenses) {
      const earnings = months.map(month => {
        const findMonth = allExpenses.find(expense => expense.id === month);

        if (findMonth && findMonth.ganhos) {
          const values = Object.values(findMonth.ganhos);
          return values.reduce((prev, curr) => prev + curr, 0).toFixed(2);
        }

        return 0;
      });

      this.earnings = earnings.reduce((curr, prev) => curr + Number(prev), 0);
      return earnings;
    },
    getExpensesData(allExpenses, allProducts) {
      const expenses = months.map(month => {
        const monthExpense = handleSupermarketExpenses(allExpenses, allProducts, month);
        
        return handleSumOfAllExpenses(monthExpense);
      });

      this.expenses = expenses.reduce((curr, prev) => curr + Number(prev), 0);
      return expenses;
    },
    async getMonthAndYear({ year }) {
        if (year) {
          const allExpenses = await getExpensesByYear(year);
          const allProducts = await getAllMarketProductsByYear(year);
      
          const expensesData = this.getExpensesData(allExpenses, allProducts);
          const earningsData = this.getEarningsData(allExpenses);
          
          this.data.datasets[0].data = expensesData;
          this.data.datasets[1].data = earningsData;
      
          this.isPositive = this.earnings - this.expenses >= 0;
          this.loading = false;
          this.chartKey += 1;
        }
      }
  },
}
</script>
<style scoped>
.chartBar { 
  width:  70vw;
}

.earnings {
  color: #00c04b;
}

.expenses {
  color: red
}

h2 {
  text-align: center;
  padding-top: 25PX;
}
</style>