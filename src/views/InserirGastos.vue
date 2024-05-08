<template>
    <div id="main-container">
        <ExpensesAndEarnings @expensesOrEarnings="handleExpensesOrEarnings" />
        <div id="forms-container" v-if="isHabilit">
            <form v-if="isExpenses" class="container">
                <div class="form-group">
                    <label for="input-description">Descrição:</label>
                    <input type="text" class="form-control" id="input-description" placeholder="Digite a descrição" v-model="expenseDescription">
                </div>
                <div class="form-group">
                    <label for="input-value">Valor:</label>
                    <input type="text" class="form-control" id="input-value" placeholder="Digite o valor" v-model="expenseValue">
                </div>
                <div class="form-group">
                    <label for="input-installments">Parcelas?</label>
                    <input type="number" class="form-control" id="input-installments" v-model="expenseInstallments">
                </div>
                <label for="inputProdFamily">Tipo de Gasto</label>
                <select class="form-control" name="inputProdFamily" id="inputProdFamily" v-model="inputProdFamily">
                  <option value="">Selecione o tipo de gasto</option>
                  <option v-for="(expenseType, idx) in expensesType" :value="expenseType" :key="idx">
                    {{ expenseType }}
                  </option>
                </select>
                <div>
                    <button type="button" class="btn btn-danger" @click="handleForm($event)">Enviar</button>
                </div>
            </form>
    
            <form v-else class="container">
                <div class="form-group">
                    <label for="input-description">Descrição:</label>
                    <input type="text" class="form-control" id="input-description" placeholder="Digite a descrição" v-model="expenseDescription">
                </div>
                <div class="form-group">
                    <label for="input-value">Valor:</label>
                    <input type="text" class="form-control" id="input-value" placeholder="Digite o valor" v-model="expenseValue">
                </div>
                <div>
                    <button type="button" class="btn btn-success" @click="handleForm($event)">Enviar</button>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import ExpensesAndEarnings from '@/components/ExpensesAndEarnings.vue';
import expensesType from '@/arrays.helpers/expensesType';

export default {
    name: 'InserirGastos',
    components: {
        ExpensesAndEarnings
    },
    data() {
        return {
            expensesType,
            isExpenses: true,
            isHabilit: false,
            expenseDescription: '',
            expenseValue: '',
            expenseInstallments: 0
        }
    },
    methods: {
        handleExpensesOrEarnings(type) {
            this.isExpenses = type;
            this.isHabilit = true;
        }
    }
}
</script>

<style scoped>
#main-container {
  display: flex;
  flex-direction: column;
}

#forms-container {
    margin-top: 60px;
}

.container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

label {
  font-weight: bold;
}

.form-control {
  margin-bottom: 10px;
}

.btn {
  margin-top: 10px;
  width: 210px;
}

.input-group-text {
  height: 37px
}

.btn-danger:hover {
  background-color: #f44336;
  color: #fff;
  box-shadow: 2px 2px 16px rgba(244, 67, 54, 0.7);
}

.btn-success:hover {
  background-color: #4CAF50;
  color: #fff;
  box-shadow: 0 4px 6px rgba(40, 167, 69, 0.7);
}

</style>
