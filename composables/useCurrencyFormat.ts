export const useCurrencyFormat = () => {
  const currencyValue = ref<string>(''); 
  const currencyCode = ref<string>('BRL'); 

  const formatCurrency = () => {
    let value = currencyValue.value.replace(/\D/g, ''); 
    const numericValue = Number(value);

    if (isNaN(numericValue)) {
      currencyValue.value = '0';
      return;
    }
    
    currencyValue.value = (numericValue / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: currencyCode.value 
    });
  };

  const updateCurrencyCode = (newCurrencyCode: string) => {
    currencyCode.value = newCurrencyCode;
  };

  return { currencyValue, formatCurrency, updateCurrencyCode };
};
