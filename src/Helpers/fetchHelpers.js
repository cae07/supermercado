const url = 'http://localhost:3000';

const getAllProductsByDate = async (date) =>
  await fetch(`${url}/${date}`).then(data => data.json());

const getAllProductsList = async () =>
  await fetch(`${url}/produtos`).then(data => data.json());



const addNewProductList = async (newProduct) =>
  await fetch(`${url}/produtos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: newProduct
    }).then(res => res.json());

const updateProductHelper = async (date, id, data) =>
    await fetch(`${url}/${date}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: data
    });

const addNewProductHelper = async (year, newProduct) =>
  await fetch(`${url}/${year}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: newProduct
  }).then(res => res.json());

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

export default {
    getAllProductsList,
    addNewProductList,
    getAllProductsByDate,
    updateProductHelper,
    addNewProductHelper,
    getExpensesByYear,
    updateExpenseWithId,
    updateNewMonthExpense
};
