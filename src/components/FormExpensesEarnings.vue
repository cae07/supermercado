<template>
            <div id="forms-container" v-if="handleForm.isHabilit">
            <form v-if="handleForm.isExpenses" class="container">
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
                <label for="inputExpenseFamily">Tipo de Gasto</label>
                <select class="form-control" name="inputExpenseFamily" id="inputExpenseFamily" v-model="inputExpenseFamily">
                  <option value="">Selecione o tipo de gasto</option>
                  <option v-for="(expenseType, idx) in expensesType" :value="expenseType" :key="idx">
                    {{ expenseType }}
                  </option>
                </select>
                <div>
                    <button type="button" class="btn btn-danger" @click="handleExpenses($event)">Enviar</button>
                </div>
            </form>
    
            <form v-else class="container">
                <div class="form-group">
                    <label for="input-description">Descrição:</label>
                    <input type="text" class="form-control" id="input-description" placeholder="Digite a descrição" v-model="earningDescription">
                </div>
                <div class="form-group">
                    <label for="input-value">Valor:</label>
                    <input type="text" class="form-control" id="input-value" placeholder="Digite o valor" v-model="earningValue">
                </div>
                <div>
                    <button type="button" class="btn btn-success" @click="handleEarnings($event)">Enviar</button>
                </div>
            </form>
        </div>
</template>

<script>
import expensesType from '@/arrays.helpers/expensesType';

export default {
    name: 'FormExpensesEarnings',
    props: {
        handleForm: Object,
        handleDate: Object
    },
    data() {
        return {
            expensesType,
            expenseDescription: '',
            expenseValue: '',
            expenseInstallments: 0,
            inputExpenseFamily: '',
            earningDescription: '',
            earningValue: ''
        }
    },
    methods: {
        handleExpenses(event) {
            event.preventDefault();
            if (!this.validateExpensesInputs()) return;
            
            this.clearAllInputs();
        },
        handleEarnings(event) {
            event.preventDefault();
            if (!this.validateEarningsInputs()) return;
            
            this.clearAllInputs();
        },
        validateExpensesInputs() {
            const missingInput = !this.expenseDescription || !this.expenseValue || !this.inputExpenseFamily || this.inputExpenseFamily.includes('Selecione');
            return this.triggerAlerts(missingInput, true);
        },
        validateEarningsInputs() {
            const missingInput = !this.earningDescription || !this.earningValue;
            return this.triggerAlerts(missingInput, false);
        },
        triggerAlerts(missingInput, isExpense) {
            let isValid = true;
            const validNumberRegex = /^\d+$/;
            const isExpensesNumberValid = validNumberRegex.test(this.expenseValue);
            const isEarningsNumberValid = validNumberRegex.test(this.earningValue);

            if (missingInput) {
                global.alert("Por favor preencha todos os campos!");
                isValid = false;
            } else if (!isEarningsNumberValid && !isExpense || !isExpensesNumberValid && isExpense) {
                global.alert('Apenas números são permitidos no campo de valor.')
                isValid = false;
            } else if (this.expenseInstallments < 0) {
                global.alert('Não é permitido números negativos de parcelas');
                isValid = false;
            } else if (!this.handleDate.month) {
                global.alert('Por favor escolha um mês');
                isValid = false;
            }

            return isValid;
        },
        clearAllInputs() {
            this.expenseDescription = '';
            this.expenseValue = '';
            this.expenseInstallments = 0;
            this.inputExpenseFamily = '';
            this.earningDescription = '';
            this.earningValue = '';
        }
    }
}
</script>

<style scoped>

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