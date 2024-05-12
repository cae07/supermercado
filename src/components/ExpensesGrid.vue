<template>
  <div>
    <div v-if="expenses" class="container mt-5">
      <h2>Gastos = R${{ this.allItensSum }}</h2>
      <ExpensesAndEarningsTable :tableInfo="expenses.casa" tableName="Casa" />
      <ExpensesAndEarningsTable :tableInfo="expenses.alimentacao" tableName="Alimentação" />
      <ExpensesAndEarningsTable :tableInfo="expenses.carro" tableName="Carro" />
      <ExpensesAndEarningsTable :tableInfo="expenses.dogs" tableName="Dogs" />
      <ExpensesAndEarningsTable :tableInfo="expenses.passeios" tableName="Passeios" />
      <ExpensesAndEarningsTable :tableInfo="expenses['cartao de credito']" tableName="Cartão de Crédito" />
      <ExpensesAndEarningsTable :tableInfo="expenses.farmacia" tableName="Farmácia" />
      <ExpensesAndEarningsTable :tableInfo="expenses.trybe" tableName="Trybe" />
      <ExpensesAndEarningsTable :tableInfo="expenses.outros" tableName="Outros" />
    </div>
    <h1 v-else>Não foram encontrados recursos para esse filtro</h1>
  </div>
</template>

<script>
import ExpensesAndEarningsTable from './ExpensesAndEarningsTable.vue';

export default {
    name: 'ExpensesGrid',
    components: {
      ExpensesAndEarningsTable
    },
    props: {
      expenses: Object,
      earnings: Object,
      allItensSum: Number
    }
}
</script>

<style scoped>
.container {
  max-width: 50vw;
  margin-left: 16vw;
}

h1 {
  margin-top: 15vh;
  margin-left: 14vw;
  text-shadow: 3px 3px 7px #808080;
  color: #FF4500;
}

h2 {
  text-shadow: 1px 1px 4px #808080;
  color: #FF4500;
}
</style>
