<template>
    <nav>
      <router-link class="router-btn" to="/">Lançar Produtos</router-link>
      <router-link class="router-btn" to="/lista">Lista</router-link>
      <router-link class="router-btn" to="/gastos">Gastos</router-link>
    </nav>
</template>

<script>
export default {
    name: 'Aside'
}
</script>

<style scoped>
.router-btn {
    border-bottom: 2px solid #000;
    height: 8vh;
    text-align: center;
    align-content: center;
    font-size: 1.2em;
    text-decoration: none;
    color: #000;
    background-color: #00CED1;
}

.router-btn:hover {
    background-color: #00FFFF;
    color: #FF00FF;
}
</style>