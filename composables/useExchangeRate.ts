import { ref } from 'vue';

export const useExchangeRate = () => {
  const exchangeRate = ref<number | null>(null);

  const fetchExchangeRate = async (currency: string) => {
    try {
      const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${currency}-BRL`); 
      const data = await response.json();
      const obj:any = Object.values(data)
      
      exchangeRate.value = obj[0].bid;
    } catch (error) {
      console.error("Erro ao buscar taxa de câmbio:", error);
      exchangeRate.value = null;
    }
  };

  return { exchangeRate, fetchExchangeRate };
};