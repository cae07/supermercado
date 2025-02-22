<template>
    <div>
      <button @click="exportToExcel">Baixar Excel</button>
    </div>
  </template>
  
  <script>
  import * as XLSX from "xlsx";
  
  export default {
    name: "ExportToExcel",
    props: {
        marketList: Array
    },
    methods: {
      exportToExcel() {        
        // Converte os dados para um formato compreensível pelo XLSX
        const worksheet = XLSX.utils.json_to_sheet(this.marketList);
        // Cria um workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Produtos");
        // Gera e baixa o arquivo Excel
        XLSX.writeFile(workbook, "produtos.xlsx");
      },
    },
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 1.5em;
    margin-bottom: 1em;
  }
  
  button {
    padding: 0.5em 1em;
    font-size: 1em;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  