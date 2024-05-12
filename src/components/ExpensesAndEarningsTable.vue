<template>
  <div v-if="tableInfo" class="table-responsive"> 
    <table class="table table-bordered">
      <thead class="table-light">
        <tr>
          <th scope="col">{{ tableName }}</th>
          <th scope="col" class="end-coluns">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in Object.entries(tableInfo)" :key="idx">
          <td>{{ item[0] }}</td>
          <td class="end-coluns">{{ item[1].toFixed(2) }}</td>
        </tr>
        <tr>
          <td class="totalSum">Total</td>
          <td class="end-coluns totalSum" v-if="sumAllItens">{{ itensSum }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ExpensesAndEarningsTable',
  props: {
    tableInfo: Object,
    tableName: String
  },
  data() {
    return {
      itensSum: 0
    }
  },
  computed: {
    sumAllItens() {
      if (this.tableInfo) {
        const getValues = Object.values(this.tableInfo);
        
        this.itensSum = getValues.reduce((prev, curr) => prev + curr, 0).toFixed(2);
        return true
      }
      return false;
    }
  }
}
</script>

<style scoped>
.table {
  border: 2px solid #f0f0f0;
}

.table th, .table td {
  border: 1px solid #f0f0f0;
}

.end-coluns {
  width:100px;
  text-align: center;
}

.totalSum {
  color: red;
  font-size: 1.2em;
}
</style>