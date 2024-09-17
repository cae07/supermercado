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
      <div id="handleProductCheckbox" class="form-group">
        <button type="button" @click="handleProduct" class="btn btn-primary">Pesquisar alimento</button>
        <label class="form-check-label" for="isUnity">
          <input class="form-check-input" type="checkbox" id="isUnity" v-model="isUnity">
          multiplica unitário
        </label>
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
    const {
      getAllProductsList,
      getAllMarketProductsByYear,
      postNewMonthProduct,
      deleteMarketMonth,
      updateProductsWithId,
      postNewProductInProductLis
    } = helpers;
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
          allProducts: [],
          existentProdutsList: [],
          existItem: true,
          isUnity: false
        }
      },
      methods: {
        handleProduct() {
          if (!this.productName) {
            global.alert("Por favor insira um produto para liberar os próximos campos.");
          } else {
            const getProduct = this.existentProdutsList.find(item => item.name == this.productName.toLowerCase());
      
            if(getProduct){
              this.inputMeasure = getProduct.measure;
              this.inputProdFamily = getProduct.productType;
              this.disabledeasure = true;
              this.disabledProdFamily = true;
              this.disabled = false;
              this.existItem = true;
            } else {
              this.disabledeasure = false;
              this.disabledProdFamily = false;
              this.disabled = false;
              this.existItem = false;
            }
          }
    
        },
        async handleForm(event) {
          event.preventDefault();

          const missingInput = !this.productName ||!this.value || !this.inputQtd || !this.inputMeasure || !this.inputProdFamily;
          const validNumberRegex = /^[\d.,]+$/;

          if (event.key === 'Enter' || missingInput) {
            global.alert("Por favor preencha todos os campos.");
            return null;
          } else if (!validNumberRegex.test(this.value)) {
            global.alert("Por favor digite um número válido.");
            return null;
          } else {
            await this.handleUpdateDatabases();
            
            this.resetInputs();
            await this.getAllProducts();
          }
          
        },
        async handleUpdateDatabases() {
            const monthProducts = this.allProducts.find(product => product?.id === this.monthInput);

            if (monthProducts) {
                await this.updateExistingMonth(monthProducts);
            } else {
                await this.createNewMonth();
            }

            await this.handleExistProductInGeneralList();
        },

        async handleExistProductInGeneralList() {
          if (!this.existItem) {
            const newProduct = {
              name: this.productName,
              measure: this.inputMeasure,
              productType: this.inputProdFamily
            };

            await postNewProductInProductLis(JSON.stringify(newProduct));
          }
        },

        async updateExistingMonth(monthProducts) {
            const { produtos } = monthProducts;
            const productIndex = produtos.findIndex(item => item.name === this.productName);

            if (productIndex !== -1) {
                await this.updateExistingProduct(monthProducts, productIndex);
            } else {
                await this.addNewProductToMonth(monthProducts);
            }
        },

        async updateExistingProduct(monthProducts, productIndex) {
          const existProduct = monthProducts.produtos[productIndex];
          const submitedValue =  parseFloat(this.value.replace(',', '.'));

          const productUpdate = {
            name: existProduct.name,
            quantity: existProduct.quantity + this.inputQtd,
            value: this.isUnity? existProduct.value + (this.inputQtd * submitedValue) :  existProduct.value + submitedValue
          };

          monthProducts.produtos.splice(productIndex, 1, productUpdate);
          this.allProducts = this.allProducts.map(item => (item.id === this.monthInput ? monthProducts : item));

          await updateProductsWithId(this.yearsInput, this.monthInput, JSON.stringify({ produtos: monthProducts.produtos }));
        },

        async addNewProductToMonth(monthProducts) {
          const submitedValue =  parseFloat(this.value.replace(',', '.'));

          const newProduct = {
              name: this.productName,
              quantity: this.inputQtd,
              value: this.isUnity? this.inputQtd * submitedValue : submitedValue
          };

          monthProducts.produtos.push(newProduct);
          this.allProducts = [...this.allProducts.filter(item => item.id !== this.monthInput), monthProducts];

          await deleteMarketMonth(this.yearsInput, this.monthInput);
          await postNewMonthProduct(this.yearsInput, JSON.stringify(monthProducts));
        },

        async createNewMonth() {
          const submitedValue =  parseFloat(this.value.replace(',', '.'));

          const newMonth = {
            id: this.monthInput,
            produtos: [
              {
                  name: this.productName,
                  quantity: this.inputQtd,
                  value: this.isUnity? this.inputQtd * submitedValue : submitedValue
              }
            ]
          };

          this.allProducts.push(newMonth);

          await postNewMonthProduct(this.yearsInput, JSON.stringify(newMonth));
        },

        resetInputs() {
          this.productName = '';
          this.inputQtd = '';
          this.value = '';
          this.inputMeasure = '';
          this.inputProdFamily = '';
          this.disabledeasure = true;
          this.disabledProdFamily = true;
          this.disabled = true;
          this.isUnity = false;
        },
        async getAllProducts() {
          const allMarketYearProducts = await getAllMarketProductsByYear(this.yearsInput);
          const allProductsList = await getAllProductsList();

          this.allProducts = allMarketYearProducts;
          this.existentProdutsList = allProductsList;
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
        margin-bottom: 8px;
      }

      #handleProductCheckbox {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      #isUnity {
        margin-right: 5px;
      }

    </style>
    