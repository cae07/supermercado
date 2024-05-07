const url = 'http://localhost:3000';

const getAllProductsByDate = async (date) => {
  try {
    return await fetch(`${url}/${date}`).then(data => data.json());
    
  } catch (error) {
    return [];
  }
}

const getAllProductsList = async () => {
  try {
    return await fetch(`${url}/produtos`).then(data => data.json());
    
  } catch (error) {
    return [];
  }
}

const addNewProductList = async (newProduct) => {
  try {
    return await fetch(`${url}/produtos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: newProduct
    }).then(res => res.json());
    
  } catch (error) {
    return [];
  }
}

const updateProductHelper = async (date, id, data) => {
  try {
    return await fetch(`${url}/${date}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: data
    });
    
  } catch (error) {
    return [];
  }
}

const addNewProductHelper = async (year, newProduct) => {
  try {
    return await fetch(`${url}/${year}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: newProduct
    }).then(res => res.json());
    
  } catch (error) {
    return [];
  }
}


export default {
    getAllProductsList,
    addNewProductList,
    getAllProductsByDate,
    updateProductHelper,
    addNewProductHelper
};
