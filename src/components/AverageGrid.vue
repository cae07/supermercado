<template>
  <div class="container mt-5">
    {{ console.log(productsList) }}
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Media</th>
            <th scope="col">Medida</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.media }}</td>
            <td>{{ item.medida }}</td>
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
  max-width: 600px;
}

.table {
  border: 2px solid #f0f0f0;
}

.table th, .table td {
  border: 1px solid #f0f0f0;
}
</style>
