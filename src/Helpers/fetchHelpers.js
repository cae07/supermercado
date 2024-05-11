const url = 'http://localhost:3000';

const getAllProductsByDate = async (date) =>
  await fetch(`${url}/${date}`)
  .then(response => {
    if (!response.ok) {
        return [];
    }
    return response.json()
  })
  .catch(error => console.error('Erro:', error));


const getAllProductsList = async () =>
  await fetch(`${url}/produtos`)
  .then(response => {
    if (!response.ok) {
        return [];
    }
    return response.json()
  })
  .catch(error => console.error('Erro:', error));


const getExpensesByYear = async (year) =>
  await fetch(`${url}/gastos-${year}`)
    .then(response => {
      if (!response.ok) {
          return [];
      }
      return response.json()
    })
    .catch(error => console.error('Erro:', error));


const updateExpenseWithId = async (year, id, expense) =>
  fetch(`${url}/gastos-${year}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json'},
    body: expense
  }).then(response => {
    if (!response.ok) {
        return [];
    }
  })
  .catch(error => console.error('Erro:', error));


const updateNewMonthExpense = async (year, expense) =>
  fetch(`${url}/gastos-${year}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: expense
  }).then(response => {
    if (!response.ok) {
        return [];
    }
  })
  .catch(error => console.error('Erro:', error));

  const getAllMarketProductsByYear = async (year) =>
    await fetch(`${url}/mercado-${year}`)
    .then(response => {
      if (!response.ok) {
          return [];
      }
      return response.json()
    })
    .catch(error => console.error('Erro:', error));

  const postNewMonthProduct = async (year, newProduct) =>
    fetch(`${url}/mercado-${year}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: newProduct
    }).then(response => {
      if (!response.ok) {
          return [];
      }
    })
    .catch(error => console.error('Erro:', error));

  const updateProductsWithId = async (year, id, products) =>
    fetch(`${url}/mercado-${year}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: products
    }).then(response => {
      if (!response.ok) {
          return [];
      }
    })
    .catch(error => console.error('Erro:', error));


  const deleteMarketMonth = (year, month) =>
    fetch(`${url}/mercado-${year}/${month}`, {
      method: 'DELETE'
    }).then(response => {
      if (!response.ok) {
          return [];
      }
    })
    .catch(error => console.error('Erro:', error));


export default {
    getAllProductsList,
    getAllProductsByDate,
    getExpensesByYear,
    updateExpenseWithId,
    updateNewMonthExpense,
    getAllMarketProductsByYear,
    postNewMonthProduct,
    updateProductsWithId,
    deleteMarketMonth
};
