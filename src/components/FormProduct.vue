<template>
    <form class="container">
      <div class="form-group">
        <label for="yearsInput">Ano:</label>
        <select v-on:change="getAllProducts" class="form-control" name="yearsInput" id="yearsInput" v-model="yearsInput">
          <option value="">Selecione o ano</option>
          <option v-for="(year, idx) in years" :value="year" :key="idx">{{ year }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="monthInput">Mês:</label>
        <select v-on:change="getAllProducts" class="form-control" name="monthInput" id="monthInput" v-model="monthInput">
          <option value="">Selecione o mês</option>
          <option v-for="(month, idx) in months" :value="month" :key="idx">{{ month }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="input-product">Produto</label>
        <input @keyup.enter="handleProduct" type="text" class="form-control" id="input-product" placeholder="Digite o produto" v-model="productName">
      </div>
      <div class="form-group">
        <button type="button" @click="handleProduct" class="btn btn-primary">Pesquisar alimento</button>
      </div>
      <div class="form-group">
        <label for="input-value">Valor</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>
          </div>
          <input :disabled="disabled" type="text" class="form-control" id="input-value" placeholder="Digite o valor" v-model="value">
        </div>
      </div>
      <div class="form-group">
        <label for="inputQtd">Quantidade</label>
        <input :disabled="disabled" type="number" class="form-control" id="inputQtd" placeholder="Digite a quantidade" v-model="inputQtd">
      </div>
      <div class="form-group">
        <label for="inputMeasure">Medida</label>
        <select :disabled="disabledeasure" class="form-control" name="inputMeasure" id="inputMeasure" v-model="inputMeasure">
          <option value="">Selecione a medida</option>
          <option v-for="(item, idx) in measure" :value="item" :key="idx">
            {{ item }}
          </option>
        </select>
        <label for="inputProdFamily">Tipo Produto</label>
        <select :disabled="disabledProdFamily" class="form-control" name="inputProdFamily" id="inputProdFamily" v-model="inputProdFamily">
          <option value="">Selecione o tipo do produto</option>
          <option v-for="(item, idx) in productFamily" :value="item" :key="idx">
            {{ item }}
          </option>
        </select>
      </div>
      <div>
        <button type="button" class="btn btn-success" @click="handleForm($event)">Enviar</button>
      </div>
    </form>
    
    </template>
    
    <script>
    import arrays from '../arrays.helpers';
    import helpers from '../Helpers/fetchHelpers';

    const { years, months, measure, productFamily } = arrays;
    const { getAllProductsHelper, updateProductHelper, addNewProductHelper } = helpers;
    const today = new Date(Date.now());
    
    export default {
      name: 'Home',
      data: () => {
        return {
          years,
          months,
          measure,
          productFamily,
          yearsInput: '',
          monthInput: '',
          productName: '',
          value: '',
          inputQtd: '',
          inputMeasure: '',
          inputProdFamily: '',
          disabledeasure: true,
          disabledProdFamily: true,
          disabled: true,
          allProducts: []
        }
      },
      methods: {
        handleProduct() {
          if (!this.productName) {
            global.alert("Por favor insira um produto para liberar os próximos campos.");
          } else {
            const getProduct = this.allProducts.find(item => item.nome == this.productName.toLowerCase());
      
            if(getProduct){
              this.inputMeasure = getProduct.medida;
              this.inputProdFamily = getProduct.tipo;
              this.disabledeasure = true;
              this.disabledProdFamily = true;
              this.disabled = false;
            } else {
              this.disabledeasure = false;
              this.disabledProdFamily = false;
              this.disabled = false;
            }
          }
    
        },
        handleForm(event) {
          
          event.preventDefault();
          const dateToFetch = this.monthInput.toLowerCase().concat('-').concat(this.yearsInput);
          const missingInput = !this.productName ||!this.value || !this.inputQtd || !this.inputMeasure || !this.inputProdFamily;

          if (event.key === 'Enter' || missingInput) {
            global.alert("Por favor preencha todos os campos.");
            return null;
          } else {
            const getProduct = this.allProducts.find(item => item.nome == this.productName.toLowerCase());
      
            if (getProduct) {
              console.log('quantidadeInput', this.inputQtd);
              console.log('quantidadeProduto', getProduct.quantidade);
              console.log('soma', getProduct.quantidade + this.inputQtd );

              console.log('valorInput', parseFloat(this.value.replace(',', '.')));
              console.log('valorProduto', getProduct.valor);
              console.log('soma', getProduct.valor + parseFloat(this.value.replace(',', '.')));
              const data = {
                quantidade: getProduct.quantidade + this.inputQtd,
                valor: getProduct.valor + parseFloat(this.value.replace(',', '.'))
              }

              updateProductHelper(dateToFetch, getProduct.id, JSON.stringify(data));
  
            } else {
              const newProduct = {
                nome: this.productName.toLowerCase(),
                quantidade: this.inputQtd,
                valor: parseFloat(this.value.replace(',', '.')),
                medida: this.inputMeasure,
                tipo: this.inputProdFamily
              }

              addNewProductHelper(dateToFetch, JSON.stringify(newProduct));
            }
            this.resetInputs();
            setTimeout(() => {
              this.getAllProducts();
            }, 200);
          }
          
        },
        resetInputs() {
          this.productName = '';
          this.inputQtd = '';
          this.value = '';
          this.inputMeasure = '';
          this.inputProdFamily = '';
          this.disabledeasure = true;
          this.disabledProdFamily = true;
        },
        async getAllProducts() {
          const dateToFetch = this.monthInput.toLowerCase().concat('-').concat(this.yearsInput);
          const allProducts = await getAllProductsHelper(dateToFetch);

          this.allProducts = allProducts;
        },
        setTimeAndMonth() {
          this.yearsInput = today.getFullYear();
          this.monthInput = months[today.getMonth()];
        }
      },
      mounted() {
        this.setTimeAndMonth();
        this.getAllProducts();
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
      }
    
      .input-group-text {
        height: 37px
      }

      .btn {
        width: 210px;
      }

    </style>
    