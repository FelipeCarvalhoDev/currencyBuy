import { defineEventHandler, send } from 'h3';

export default defineEventHandler(async (event) => {  
  event.res.setHeader('Access-Control-Allow-Origin', '*');
  event.res.setHeader('Access-Control-Allow-Methods', 'GET');
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/available')  
    const data = await response.json();

    const filteredCurrencies = Object.keys(data).filter((key) => {
      return key.includes('-BRL') || key.includes('-BRLT');
    });

    const result = filteredCurrencies.reduce((acc:any, key) => {
      acc[key] = data[key];
      return acc;
    }, {});
    
    return result
  } catch (error) {
    return { error: 'Erro ao buscar moedas.' }
  }
})