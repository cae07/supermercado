<template>
  <div id="main-container">
    <ListButtons @averagePeriod="handleAveragePeriod" />
    <InputsMonthYear v-if="enableMonth" @monthAndYear="getMonthAndYear" />
    <AverageGrid :productsList="productsList" :message="findedMonthsMsg" :isMensal="isMensal" />
  </div>
</template>

<script>
import InputsMonthYear from '@/components/InputsMonthYear.vue';
import AverageGrid from '@/components/AverageGrid.vue';
import ListButtons from '@/components/ListButtons.vue';
import months from '../arrays.helpers/month';
import helpers from '../Helpers/fetchHelpers';
import handleHelper from '../Helpers/handles.helper'

const {
  getAllProductsList,
  getAllMarketProductsByYear
} = helpers;
const { handleUnityValue } = handleHelper;
const today = new Date(Date.now());

export default {
  name: 'Lista',
  components: {
    AverageGrid,
    ListButtons,
    InputsMonthYear
  },
  data() {
    return {
      productsList: [],
      findedMonthsMsg: '',
      enableMonth: false,
      isMensal: false
    }
  },
  methods: {
    async handleAveragePeriod(period) {
      switch (period) {
        case 'year':
          this.isMensal = false;
          await this.handleYearPeriod();
          break;
        case 'summer':
          this.isMensal = false;
          await this.handleSummerPeriod();
          break;
        case 'winter':
          this.isMensal = false;
          await this.handleWinterPeriod();
          break;
        case 'month':
          this.isMensal = true;
          this.enableMonth = true;
          this.findedMonthsMsg = 'Aguardando escolha da data';
          break;
      
        default:
          break;
      }
    },
    async getAllProductsList() {
      const productsList = await getAllProductsList();
      this.productsList = this.sortItems(productsList);
    },
    async getMonthAndYear({ year, month}) {
      this.yearsInput = year;
      this.monthInput = month;
      await this.handleMonthPeriod();
    },
    async handleMonthPeriod() {
      if(this.yearsInput && this.monthInput){
        const productsByPeriod = await this.getSelectedList([this.monthInput], this.yearsInput);
        const finalList = this.getFinalList(productsByPeriod);

        this.productsList = this.sortItems(finalList);
      }
    },
    async handleYearPeriod() {
      this.enableMonth = false;
      const datesToFetch = this.getDatesToFetch(months, today.getMonth(), today.getFullYear());
      const actualYear = today.getFullYear();
      const lastYear = actualYear - 1;

      const actualYearProducts = this.getMonthsIds(datesToFetch, actualYear);
      const pastYearProducts = this.getMonthsIds(datesToFetch, lastYear);

      const productsByPeriod = await this.getSelectedList(actualYearProducts, actualYear);
        
      if (pastYearProducts) {
        const getPastYearProducts = await this.getSelectedList(pastYearProducts, lastYear);
        productsByPeriod.push(...getPastYearProducts);
      }

      const finalList = this.getFinalList(productsByPeriod);

      this.productsList = this.sortItems(finalList);
    },
    getMonthsIds(datesToFetch, year) {
      return datesToFetch
        .filter(date => date.includes(year))
        .map(item => item.split('-')[0]);
    },
    async handleSummerPeriod() {
      this.enableMonth = false;
      const periods = ['Dezembro', 'Janeiro', 'Fevereiro', 'Março'];
      const actualYear = today.getFullYear();

      const productsByPeriod = await this.getSelectedList(periods, actualYear);

      const finalList = this.getFinalList(productsByPeriod);

      this.productsList = this.sortItems(finalList);
    },
    async handleWinterPeriod() {
      this.enableMonth = false;
      const periods = ['Maio', 'Junho', 'Julho', 'Agosto'];
      const actualYear = today.getFullYear();

      const productsByPeriod = await this.getSelectedList(periods, actualYear);
      const finalList = this.getFinalList(productsByPeriod);
      
      this.productsList = this.sortItems(finalList);
    },
    async getSelectedList(periods, year) {
      const getMarketList = await getAllMarketProductsByYear(year);

      return getMarketList.map(allMonths => {
        const getPeriodList = periods.some(period => period === allMonths.id);

        if (getPeriodList) return allMonths.produtos;
        return;
      });
    },
    getFinalList(productsByPeriod) {
      const divisor = this.getDivisor(productsByPeriod);
      this.handleFindedMonthsMessage(divisor);

      return this.productsList.map(product => {
        const productInfo = productsByPeriod?.map(period => {
          const foundProduct = period?.find(item => item.name === product.name);
          
          return foundProduct ? {quantity: foundProduct.quantity, value: foundProduct.value } : {quantity: 0, value: 0 } ;
        });        

        let quantity = 0;
        let value = 0;

        for (const item of productInfo) {
          quantity += item.quantity;
          value += item.value;
        }

        return {
          ...product,
          quantity: divisor > 0? (quantity / divisor).toFixed(2) : quantity,
          value: handleUnityValue(product.measure, quantity, value)
        };
      });
    },
    handleFindedMonthsMessage(total) {
      
      switch (total) {
        case 0:
          this.findedMonthsMsg = 'Não foi encontrado nenhum mês lançado para o filtro escolhido';
          break;
        case 1:
          this.findedMonthsMsg = 'Foi encontrado 1 mês lançado para o filtro escolhido';
          break;
        default:
          this.findedMonthsMsg = `Foram encontrados ${total} meses lançados para o filtro escolhido`;
          break;
      }
    },
    getDatesToFetch(array, startIndex, year) {
      const selectedItems = [];
      let countYear = year;

      for (let i = 0; i < 11; i++) {
        let index = (startIndex - i) % array.length;

        if (index < 0) {
          index += array.length;
        }
        if (array[index] === "Dezembro") {
          countYear -= 1
        }

        selectedItems.push(`${array[index]}-${countYear}`);
      }

      return selectedItems;
    },
    sortItems(finalList) {
      return finalList.sort((a, b) => {
          if (a.productType < b.productType) {
            return -1;
          }
          if (a.productType > b.productType) {
            return 1;
          }
          return 0;
        });;
    },
    getDivisor(productsByPeriod) {
      let divisor = 0;
      productsByPeriod.forEach(period => {
        if (period?.length) {
          divisor += 1;
        }
      });

      return divisor;
    }
  },
  mounted() {
    this.getAllProductsList();
  }
}
</script>

<style scoped>
#main-container {
  display: flex;
  flex-direction: column;
}
</style>