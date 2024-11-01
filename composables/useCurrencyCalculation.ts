export const useCurrencyCalculation = () => {
  const totalValue = ref<string>('R$ 0,00'); 

  const calculateTotal = (amount: number, exchangeRate: number) => {
    const total = amount * exchangeRate * 1.02; 
    totalValue.value = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return { totalValue, calculateTotal };
};
