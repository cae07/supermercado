<template>
  <div>
    <div v-if="expenses" class="container mt-5">
      <ExpensesAndEarningsTable :tableInfo="expenses.casa" tableName="Casa" />
      <ExpensesAndEarningsTable :tableInfo="expenses.alimentacao" tableName="Alimentação" />
      <ExpensesAndEarningsTable :tableInfo="expenses.carro" tableName="Carro" />
      <ExpensesAndEarningsTable :tableInfo="expenses.dogs" tableName="Dogs" />
      <ExpensesAndEarningsTable :tableInfo="expenses.passeios" tableName="Passeios" />
      <ExpensesAndEarningsTable :tableInfo="expenses['cartao de credito']" tableName="Cartão de Crédito" />
      <ExpensesAndEarningsTable :tableInfo="expenses.farmacia" tableName="Farmácia" />
      <ExpensesAndEarningsTable :tableInfo="expenses.trybe" tableName="Trybe" />
      <ExpensesAndEarningsTable :tableInfo="expenses.outros" tableName="Outros" />
      <ExpensesAndEarningsTable :tableInfo="expenses.obra" tableName="Obra" />
    </div>
    <h1 id="not-found" v-else>Não foram encontrados dados para o filtro escolhido.</h1>
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
      expenses: Object
    }
}
</script>

<style scoped>
.container {
  max-width: 50vw;
  min-width: 38vw;
}

#not-found {
  margin-left: 12vw;

}

h1 {
  margin-top: 15vh;
  /* margin-left: 12vw; */
  text-shadow: 3px 3px 7px #808080;
  color: #FF4500;
}

h2 {
  text-shadow: 1px 1px 4px #808080;
  color: #FF4500;
}
</style>
