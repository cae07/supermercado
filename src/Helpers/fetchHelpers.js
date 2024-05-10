const url = 'http://localhost:3000';

const getAllProductsByDate = async (date) =>
  await fetch(`${url}/${date}`).then(data => data.json());

const getAllProductsList = async () =>
  await fetch(`${url}/produtos`).then(data => data.json());

const getExpensesByYear = async (year) =>
  await fetch(`${url}/gastos-${year}`)
    .then(data => data.json());

const updateExpenseWithId = async (year, id, expense) =>
  fetch(`${url}/gastos-${year}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json'},
    body: expense
  });

const updateNewMonthExpense = async (year, expense) =>
  fetch(`${url}/gastos-${year}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: expense
  });

  const getAllMarketProductsByYear = async (year) =>
    await fetch(`${url}/mercado-${year}`).then(data => data.json());

  const postNewMonthProduct = async (year, newProduct) =>
    fetch(`${url}/mercado-${year}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: newProduct
    });

  const updateProductsWithId = async (year, id, products) =>
    fetch(`${url}/mercado-${year}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: products
    });

  const deleteMarketMonth = (year, month) =>
    fetch(`${url}/mercado-${year}/${month}`, {
      method: 'DELETE'
    })

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
