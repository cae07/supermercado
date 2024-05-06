const url = 'http://localhost:3000';

const getAllProductsHelper = async (date) =>
  await fetch(`${url}/${date}`).then(data => data.json());

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


export default {
    getAllProductsHelper,
    updateProductHelper,
    addNewProductHelper
};
