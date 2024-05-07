<template>
    <div id="list-btns">
        <button id="btn-year" type="button" class="btn btn-secondary btn-lg" @click="handleAverage('year')">Média até 12 meses</button>
        <button id="btn-summer" type="button" class="btn btn-secondary btn-lg" @click="handleAverage('summer')">Média Verão</button>
        <button id="btn-winter" type="button" class="btn btn-secondary btn-lg" @click="handleAverage('winter')">Média Inverno</button>
    </div>
</template>

<script>
export default {
    name: 'ListButtons',
    methods: {
      handleAverage(period) {
        this.$emit('averagePeriod', period);
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
    transition: background-color 0.3s ease;
    padding: 10px 20px;
    border: none;
}

#btn-year:hover {
  background-color: #28a745; /* Verde */
  color: #fff;
  box-shadow: 0 0 10px rgba(40, 167, 69, 0.7);
  
}

#btn-summer:hover {
  background-color: #FFA500; /* Laranja */
  color: #fff;
  box-shadow: 0 0 10px rgba(255, 69, 0, 0.7);
}

#btn-winter:hover {
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.7);
}
</style>