<template>
  <div class="container mt-5">
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th id="product-type-colum" scope="col">Tipo de Produto</th>
            <th scope="col">Nome</th>
            <th class="end-coluns" scope="col">Média</th>
            <th class="end-coluns" scope="col">Medida</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in productsList" :key="product.id">
            <td>{{ product.productType }}</td>
            <td>{{ product.name }}</td>
            <td class="end-coluns">{{ product.quantity }}</td>
            <td class="end-coluns">{{ product.measure }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AverageGrid',
  props: {
    productsList: Array
  },
  data() {
    return {
      items: [
        { name: 'Item 1', media: 10, medida: 'cm' },
        { name: 'Item 2', media: 8, medida: 'kg' },
        { name: 'Item 3', media: 15, medida: 'm' }
      ]
    };
  },
}

</script>

<style scoped>
.container {
  max-width: 60vw
}

.table {
  border: 2px solid #f0f0f0;
}

.table th, .table td {
  border: 1px solid #f0f0f0;
}

#product-type-colum {
  width: 14vw;
}

.end-coluns {
  text-align: center;
}
</style>
