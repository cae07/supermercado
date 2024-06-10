const handleSumOfAllExpenses = (monthExpenses) => {
  let totalSum = 0;
  if (monthExpenses?.gastos) {
    const { gastos } = monthExpenses;

    for(let itens of Object.values(gastos)){
      if (itens) {
        for (let item of Object.values(itens)) {
          totalSum += item;
        }

      }
    }
  }

  return totalSum.toFixed(2);
};

const handleSupermarketExpenses = (allExpenses, allProducts, month) => {
  const monthProducts = allProducts.find(list => list.id === month);
  const monthExpenses = allExpenses.find(list => list.id === month);
  
  if (monthExpenses && monthProducts) {
    const total = parseFloat(monthProducts.produtos?.reduce((prev, curr) => prev + curr.value, 0).toFixed(2)) || 0;
    if (!monthExpenses.gastos.alimentacao) {
      monthExpenses.gastos = {
            ...monthExpenses.gastos,
            alimentacao: {
              supermercado: total
            }
        };
    } else {
      monthExpenses.gastos.alimentacao.supermercado = total;

    }
  }

  return monthExpenses;
}

export default {
  handleSumOfAllExpenses,
  handleSupermarketExpenses
}