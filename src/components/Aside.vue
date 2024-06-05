<template>
    <nav>
      <router-link @click="handleClick('initialPage')" class="router-btn" :class="{ 'clicked': initialPage }" to="/">Página Inicial</router-link>
      <router-link @click="handleClick('insertProducts')" class="router-btn" :class="{ 'clicked': insertProducts }" to="/inserir_produtos">Lançar Produtos</router-link>
      <router-link @click="handleClick('marketList')" class="router-btn" :class="{ 'clicked': marketList }" to="/lista">Lista Mercado</router-link>
      <router-link @click="handleClick('launchExpenses')" class="router-btn" :class="{ 'clicked': launchExpenses }" to="/inserir_gastos">Lançar Gastos</router-link>
      <router-link @click="handleClick('expenses')" class="router-btn" :class="{ 'clicked': expenses }" to="/gastos">Gastos</router-link>
      <router-link @click="handleClick('earnings')" class="router-btn" :class="{ 'clicked': earnings }" to="/ganhos">Ganhos</router-link>
      <router-link @click="handleClick('charts')" class="router-btn" :class="{ 'clicked': charts }" to="/graficos">Gráficos</router-link>
    </nav>
</template>

<script>
export default {
    name: 'Aside',
    data() {
        return {
            initialPage: false,
            insertProducts: false,
            marketList: false,
            launchExpenses: false,
            expenses: false,
            earnings: false,
            charts: false
        }
    },
    methods: {
        handleClick(button) {
            this.initialPage = false;
            this.insertProducts = false;
            this.marketList = false;
            this.launchExpenses = false;
            this.expenses = false;
            this.earnings = false;
            this.charts = false;
            this[button] = true;
        }
    },
    mounted() {
        setTimeout(() => {
            const url = this.$route.fullPath;
            console.log('url =', url);
            switch (url) {
                case '/':
                    this.initialPage = true;
                    break;
                case '/inserir_produtos':
                    this.insertProducts = true;
                    break;
                case '/inserir_gastos':
                    this.launchExpenses = true;
                    break;
                case '/lista':
                    this.marketList = true;
                    break;
                case '/gastos':
                    this.expenses = true;
                    break;
                case '/ganhos':
                    this.earnings = true;
                    break;
                case '/graficos':
                    this.charts = true;
                    break;
                default:
                    break;
            }
        }, 70);
    }
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
    color: #fff;
    font-weight: 800;
    background-color: #cfcfcf;
}

.router-btn:hover {
    background-color: #f8f9fa;
    color: #007bff;
    font-weight: 700;
}

.clicked {
    background-color: #f8f9fa;
    color: #007bff;
    font-weight: 700;
}
</style>