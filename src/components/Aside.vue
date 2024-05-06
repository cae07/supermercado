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
    background-color: #cfcfcf;
}

.router-btn:hover {
    background-color: #f8f9fa;
    color: #007bff;
    font-weight: 700;
}
</style>