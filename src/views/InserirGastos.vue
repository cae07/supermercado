<template>
    <div id="main-container">
        <ExpensesAndEarnings @expensesOrEarnings="handleExpensesOrEarnings" />
        <InputsMonthYear @monthAndYear="handleMonthYear" />
        <FormExpensesEarnings :handleForm="props" :handleDate="monthYear" />
    </div>
</template>

<script>
import ExpensesAndEarnings from '@/components/ExpensesAndEarnings.vue';
import FormExpensesEarnings from '@/components/FormExpensesEarnings.vue';
import InputsMonthYear from '@/components/InputsMonthYear.vue';

export default {
    name: 'InserirGastos',
    components: {
        ExpensesAndEarnings,
        FormExpensesEarnings,
        InputsMonthYear
    },
    data() {
        return {
            props: {
                isExpenses: true,
                isHabilit: false,
            },
            monthYear: {}
        }
    },
    methods: {
        handleExpensesOrEarnings(type) {
            this.props = {
                isExpenses: type,
                isHabilit: true,
            }
        },
        handleMonthYear({ year, month}) {
            this.monthYear = { year, month };
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
