<template>
  <div class="border border-grayTheme rounded-md p-8 bg-gray-100 w-full max-w-screen-xl">
    <Form
      ref="purchaseForm"
      class="w-full flex gap-4 justify-between flex-col md:flex-row"
      @submit="addItemToSummary"
      v-slot="{ values, errors, isSubmitting }"
    >
      <ElementsFieldSelect
        label="Selecione a moeda" 
        name="currency" 
        id="currency" 
        v-model="currency" 
        rules="required"
        :options="currencies"
        :disabled="isSubmitting" 
        :has-error="!!errors.currency"
        class="md:w-1/2" 
      />
      
      <ElementsFieldInput
        label="Valor desejado" 
        name="amount" 
        id="amount" 
        v-model="currencyValue" 
        :disabled="!currency" 
        type="text"
        :has-error="!!errors.amount"      
        @input="formatCurrency"
      />

      <ElementsFieldInput
        label="Total" 
        name="total" 
        id="total" 
        v-model="totalValue" 
        :disabled="true"
        :has-error="!!errors.totalValue"
        rules="required|valueMin:50"     
      />
      
      <ElementsFieldButton
        :disabled="isSubmitting"
        type="submit"
      >
        Adicionar moeda
      </ElementsFieldButton>
    </Form>
  </div>
  
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import { getCurrencies } from '~/services/currency.service';
import { useExchangeRate } from '@/composables/useExchangeRate';
import { useCurrencyCalculation } from '@/composables/useCurrencyCalculation';
import { useCurrencyFormat } from '@/composables/useCurrencyFormat';

const purchaseForm = ref()
const currencies = ref<{ value: string; label: string }[]>([]); 
const currency = ref<string>(''); 
const { exchangeRate, fetchExchangeRate } = useExchangeRate();
const { currencyValue, formatCurrency, updateCurrencyCode } = useCurrencyFormat();
const { totalValue, calculateTotal } = useCurrencyCalculation();
const transactionStore = useTransactionStore();

onMounted(async () => {
  const data = await getCurrencies();
  currencies.value = Object.entries(data).map(([value, currencyData]: [string, any]) => ({
    value,
    label: currencyData.split('/')[0] 
  }));
});

watch(currency, async (newCurrency) => {
  if (newCurrency) {
    const currencyCodeValue = newCurrency.split('-')[0]; 
    updateCurrencyCode(currencyCodeValue); 
    formatCurrency()
    await fetchExchangeRate(currencyCodeValue); 
    updateTotal(); 
  }
});

watch(currencyValue, (newValue) => {
  updateTotal(); 
});

const updateTotal = () => {
  const numericAmount = parseFloat(currencyValue.value.replace(/\D/g, '')) / 100 || 0; 

  if (exchangeRate.value !== null && numericAmount) {
    calculateTotal(numericAmount, exchangeRate.value); 
  }
};

const addItemToSummary = () => {
  transactionStore.addItem({
    currency: currency.value,
    exchangeRate: Number(exchangeRate.value),
    amount: Number(currencyValue.value.replace(/\D/g, '')) / 100, 
    total: Number(totalValue.value.replace(/\D/g, '')) / 100
  });
  document.getElementsByClassName('vs__selected')[0].remove()
  purchaseForm.value?.resetForm()
};

</script>

<style scoped>
</style>

<style>

</style>