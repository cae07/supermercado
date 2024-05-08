<template>
  <nav id="list-btns">
    <button id="btn-expenses" type="button" class="btn btn-secondary btn-lg" :class="{ 'btn-danger': clickedExpenses }" @click="handleExpensesOrEanings(true)">Gastos</button>
    <button id="btn-earnings" type="button" class="btn btn-secondary btn-lg" :class="{ 'btn-success': clickedEarnings }" @click="handleExpensesOrEanings(false)">Ganhos</button>
  </nav>
</template>

<script>
  export default {
    name: 'ExpensesAndEarnings',
    data() {
      return {
        clickedExpenses: false,
        clickedEarnings: false,
      }
    },
    methods: {
      handleExpensesOrEanings(type) {
        this.$emit('expensesOrEarnings', type);
        this.clickedExpenses = type;
        this.clickedEarnings = !type;
      }
    }
  }
</script>

<style scoped>
#list-btns {
    width: 80vw;
    margin: 25px 0 0 30px;
    display: flex;
    justify-content: space-around;
}

.btn {
    width: 300px;
    box-shadow: 4px 4px 8px #808080;
    transition: background-color 0.3s ease;
    padding: 10px 20px;
    border: none;
}

#btn-earnings:hover {
  background-color: #4CAF50;
  color: #fff;
  box-shadow: 0 4px 6px rgba(40, 167, 69, 0.7);
}

#btn-expenses:hover {
  background-color: #f44336;
  color: #fff;
  box-shadow: 0 4px 6px rgba(244, 67, 54, 0.7);
}
</style>