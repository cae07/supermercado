<template>
    <nav id="list-btns">
        <button id="btn-year" type="button" :class="{ 'btn-success': clickedYear }" class="btn btn-secondary btn-lg" @click="handleAverage('year')">Média até 12 meses</button>
        <button id="btn-summer" type="button" :class="{ 'btn-warning': clickedSummer }" class="btn btn-secondary btn-lg" @click="handleAverage('summer')">Média Verão</button>
        <button id="btn-winter" type="button" :class="{ 'btn-info': clickedWinter }" class="btn btn-secondary btn-lg" @click="handleAverage('winter')">Média Inverno</button>
    </nav>
</template>

<script>
export default {
    name: 'ListButtons',
    data() {
      return {
        clickedYear: false,
        clickedSummer: false,
        clickedWinter: false,
      }
    },
    methods: {
      handleAverage(period) {
        this.handleButtonsColor(period);
        this.$emit('averagePeriod', period);
      },
      handleButtonsColor(period) {
        switch (period) {
          case 'year':
            this.clickedYear = true;
            this.clickedSummer = false;
            this.clickedWinter = false;
            break;
          case 'summer':
            this.clickedYear = false;
            this.clickedSummer = true;
            this.clickedWinter = false;
            break;
          case 'winter':
            this.clickedYear = false;
            this.clickedSummer = false;
            this.clickedWinter = true;
            break;
        
          default:
            break;
        }
      }
    }
}
</script>

<style scoped>
#list-btns {
    width: 80vw;
    margin: 25px 0 0 30px;
    display: flex;
    justify-content: space-around;
}

.btn {
    width: 300px;
    box-shadow: 4px 4px 8px #808080;
    padding: 10px 20px;
    border: none;
    transition: background-color 0.5s ease;
}

#btn-year:hover {
  background-color: #28a745; /* Verde */
  color: #fff;
  box-shadow: 0 4px 6px rgba(40, 167, 69, 0.7);
}

#btn-summer:hover {
  background-color: #FFA500; /* Laranja */
  color: #fff;
  box-shadow: 0 4px 6px rgba(255, 69, 0, 0.7);
}

#btn-winter:hover {
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 123, 255, 0.7);
}
</style>