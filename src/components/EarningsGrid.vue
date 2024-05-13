<template>
  <div v-if="totalEarnings" class="container mt-5">
    <h2 v-if="sumAllItens">Ganhos = R${{ this.itensSum }}</h2>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col"  class="end-coluns">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in Object.entries(totalEarnings)" :key="idx">
            <td>{{ item[0] }}</td>
            <td class="end-coluns">{{ item[1].toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <h1 v-else>Não foram encontrados dados para o filtro escolhido.</h1>
</template>

<script>
export default {
  name: 'EarningsGrid',
  props: {
    totalEarnings: Object
  },
  data() {
    return {
      itensSum: 0
    }
  },
  computed: {
    sumAllItens() {
      if (this.totalEarnings) {
        const getValues = Object.values(this.totalEarnings);
        
        this.itensSum = getValues.reduce((prev, curr) => prev + curr, 0).toFixed(2);
        return true
      }
      return false;
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 50vw;
  margin-left: 16vw;
}

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

h2 {
  color: #28a745;
  text-shadow: 1px 1px 4px #808080;
}

h1 {
  margin-top: 15vh;
  margin-left: 12vw;
  text-shadow: 3px 3px 7px #808080;
  color: #FF4500;
}
</style>