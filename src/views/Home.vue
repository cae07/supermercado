<template>
<form @submit.prevent="handleForm" class="container">
  <div class="form-group">
    <label for="yearsInput">Ano:</label>
    <select class="form-control" name="yearsInput" id="yearsInput" v-model="yearsInput">
      <option value="">Selecione o ano</option>
      <option v-for="(year, idx) in years" :value="year" :key="idx">{{ year }}</option>
    </select>
  </div>
  <div class="form-group">
    <label for="monthInput">Mês:</label>
    <select class="form-control" name="monthInput" id="monthInput" v-model="monthInput">
      <option value="">Selecione o mês</option>
      <option v-for="(month, idx) in months" :value="month" :key="idx">{{ month }}</option>
    </select>
  </div>
  <div class="form-group">
    <label for="input-product">Produto</label>
    <input type="text" class="form-control" id="input-product" placeholder="Digite o produto" v-model="product">
  </div>
  <div class="form-group">
    <button @click="handleProduct" class="btn btn-primary">Pesquisar alimento</button>
  </div>
  <div class="form-group">
    <label for="input-value">Valor</label>
    <input type="text" class="form-control" id="input-value" placeholder="Digite o valor" v-model="value">
  </div>
  <div class="form-group">
    <label for="inputQtd">Quantidade</label>
    <input type="number" class="form-control" id="inputQtd" placeholder="Digite a quantidade" v-model="inputQtd">
  </div>
  <div class="form-group">
    <label for="inputMeasure">Medida</label>
    <select :disabled="disabled" class="form-control" name="inputMeasure" id="inputMeasure" v-model="inputMeasure">
      <option value="">Selecione a medida</option>
      <option v-for="(item, idx) in measure" :value="item" :key="idx">{{ item }}</option>
    </select>
  </div>
  <button type="submit" class="btn btn-success">Enviar</button>
</form>

</template>

<script>
import batata from '../arrays.helpers';
const { years, months, measure } = batata;

export default {
  name: 'Home',
  data: () => {
    return {
      years,
      months,
      measure,
      yearsInput: '',
      monthInput: '',
      product: '',
      value: '',
      inputQtd: '',
      inputMeasure: '',
      disabled: true,
      allProducts: []
    }
  },
  methods: {
    handleProduct() {
      const getProduct = this.allProducts.find(item => item.nome == this.product);

      if(getProduct){
        this.inputMeasure = getProduct.medida;
        this.disabled = true;
      } else {
        this.disabled = false;
      }

    },
    handleForm() {
      console.log(this.yearsInput);
      console.log(this.monthInput);
    },
    async getAllProducts() {
      const allProducts = await fetch('http://localhost:3000/alimento')
        .then(data => data.json());

      this.allProducts = allProducts;
    }
  },
  mounted() {
    this.getAllProducts();
  }
}
</script>

<style>
  /* Estilo para o formulário */
  .container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  /* Estilo para os rótulos */
  label {
    font-weight: bold;
  }

  /* Estilo para os campos de entrada */
  .form-control {
    margin-bottom: 10px;
  }

  /* Estilo para o botão */
  .btn {
    margin-top: 10px;
  }
</style>
