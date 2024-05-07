<template>
  <div id="main-container">
    <ListButtons @averagePeriod="handleAveragePeriod" />
    <AverageGrid :productsList="productsList" />
  </div>
</template>


<script>
import AverageGrid from '@/components/AverageGrid.vue';
import ListButtons from '@/components/ListButtons.vue';
import months from '../arrays.helpers/month';
import helpers from '../Helpers/fetchHelpers';

const { getAllProductsList, getAllProductsByDate } = helpers;

export default {
  name: 'Lista',
  components: {
    AverageGrid,
    ListButtons
  },
  data() {
    return {
      productsList: []
    }
  },
  methods: {
    async handleAveragePeriod(period) {
      await this.getProductsByFilter(period);
    },
    async getAllProductsList() {
      const productsList = await getAllProductsList();
      this.productsList = productsList;
    },
    async getProductsByFilter(period) {
      switch (period) {
        case 'year':
          await this.handleYearPeriod();
          break;
        case 'summer':
          await this.handleSummerPeriod();
          break;
        case 'winter':
          await this.handleWinterPeriod();
          break;
      
        default:
          break;
      }
    },
    async handleYearPeriod() {
      const today = new Date(Date.now());
      const datesToFetch = this.getDatesToFetch(months, today.getMonth(), today.getFullYear());

      const promises = datesToFetch.map(period => getAllProductsByDate(period));
      const productsByPeriod = await Promise.all(promises);

      const finalList = this.productsList.map(product => {
        const quantities = productsByPeriod.map(period => {
          const foundProduct = period.find(item => item.name === product.name);
          return foundProduct ? foundProduct.quantity : 0;
        });

        const values = productsByPeriod.map(period => {
          const foundProduct = period.find(item => item.name === product.name);
          return foundProduct ? foundProduct.value : 0;
        });

        const quantity = quantities.reduce((acc, val) => acc + val, 0);
        const value = values.reduce((acc, val) => acc + val, 0);

        return {
          ...product,
          quantity,
          value
        };
      });

      this.productsList = finalList.sort((a, b) => {
          if (a.productType < b.productType) {
            return -1;
          }
          if (a.productType > b.productType) {
            return 1;
          }
          return 0;
        });;
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

        selectedItems.push(`${array[index].toLowerCase()}-${countYear}`);
      }

      return selectedItems;
    },
    async handleSummerPeriod() {
      const periods = ['dezembro-2024', 'janeiro-2024', 'fevereiro-2024', 'março-2024'];

      const promises = periods.map(period => getAllProductsByDate(period));
      const productsByPeriod = await Promise.all(promises);

      const finalList = this.productsList.map(product => {
        const quantities = productsByPeriod.map(period => {
          const foundProduct = period.find(item => item.name === product.name);
          return foundProduct ? foundProduct.quantity : 0;
        });

        const values = productsByPeriod.map(period => {
          const foundProduct = period.find(item => item.name === product.name);
          return foundProduct ? foundProduct.value : 0;
        });

        const quantity = quantities.reduce((acc, val) => acc + val, 0);
        const value = values.reduce((acc, val) => acc + val, 0);

        return {
          ...product,
          quantity,
          value
        };
      });

      this.productsList = finalList.sort((a, b) => {
          if (a.productType < b.productType) {
            return -1;
          }
          if (a.productType > b.productType) {
            return 1;
          }
          return 0;
        });;
    },
    async handleWinterPeriod() {
      const periods = ['maio-2024', 'junho-2024', 'julho-2024', 'agosto-2024'];

      const promises = periods.map(period => getAllProductsByDate(period));
      const productsByPeriod = await Promise.all(promises);

      const finalList = this.productsList.map(product => {
        const quantities = productsByPeriod.map(period => {
          const foundProduct = period.find(item => item.name === product.name);
          return foundProduct ? foundProduct.quantity : 0;
        });

        const values = productsByPeriod.map(period => {
          const foundProduct = period.find(item => item.name === product.name);
          return foundProduct ? foundProduct.value : 0;
        });

        const quantity = quantities.reduce((acc, val) => acc + val, 0);
        const value = values.reduce((acc, val) => acc + val, 0);

        return {
          ...product,
          quantity,
          value
        };
      });

      this.productsList = this.productsList = finalList.sort((a, b) => {
          if (a.productType < b.productType) {
            return -1;
          }
          if (a.productType > b.productType) {
            return 1;
          }
          return 0;
        });;
    },
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