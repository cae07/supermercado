<template>
  <div id="main-container">
    <Aside id="aside-container"/>
    <router-view/>
  </div>
</template>

<script>
import Aside from './components/Aside.vue'

export default {
  components: {
    Aside
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: 'Arial Narrow', Arial, sans-serif;
}

#main-container {
  display: flex;
}

#aside-container {
  border: 2px solid #000;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 15vw;
}
</style>
