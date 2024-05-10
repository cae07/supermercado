<template>
        <div v-if="handleForm.isHabilit">
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
import helpers from '@/Helpers/fetchHelpers';

const {
    getExpensesByYear,
    updateExpenseWithId,
    updateNewMonthExpense
} = helpers;

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
        async handleExpenses(event) {
            event.preventDefault();
            if (!this.validateExpensesInputs()) return;
            const { year, month } = this.handleDate;

            const key = this.inputExpenseFamily;
            const description = this.expenseDescription;
            const value = parseFloat(this.expenseValue.replace(',', '.'));

            const getExpenses = await getExpensesByYear(year);
            const getMonthExpenses = getExpenses.find(item => item.id === month);

            if (getMonthExpenses) {
                const updatedExpenses = {
                    ...getMonthExpenses.gastos,
                    [key]: {
                        ...(getMonthExpenses.gastos[key] || {}),
                        [description]: (getMonthExpenses.gastos[key]?.[description] || 0) + value
                    }
                };
    
                const expense = { gastos: updatedExpenses };
                await updateExpenseWithId(year, month, JSON.stringify(expense));
            } else {
                const expense = {
                    id: month,
                    gastos: {
                        [key]: { [description]: value }
                    }
                }

                await updateNewMonthExpense(year, JSON.stringify(expense));
            }

            this.clearAllInputs();
        },
        async handleEarnings(event) {
            event.preventDefault();
            if (!this.validateEarningsInputs()) return;
            const { year, month } = this.handleDate;

            const description = this.earningDescription;
            const value = parseFloat(this.earningValue.replace(',','.'));

            const getExpenses = await getExpensesByYear(year);
            const getMonthExpenses = getExpenses.find(expense => expense.id === month);

            if (getMonthExpenses) {
                const updatedExpenses = {
                    ...getMonthExpenses.ganhos,
                    [description]: (getMonthExpenses.ganhos[description] || 0) + value

                };

                const expense = { ganhos: updatedExpenses };
                await updateExpenseWithId(year, month, JSON.stringify(expense));
            } else {
                const expense = {
                    id: month,
                    ganhos: {
                        [key]: { [description]: value }
                    }
                }

                await updateNewMonthExpense(year, JSON.stringify(expense));
            }
            
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
            const validNumberRegex = /^[\d.,]+$/;
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