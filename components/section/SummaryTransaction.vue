<template>
  <div class="border border-grayTheme rounded-md p-8 bg-gray-100 w-full max-w-screen-xl">
    <h2 v-if="!transactionItems.length" class="text-center text-lg">Adicione alguma moeda para exibir o resumo</h2>
    <div v-else class="overflow-x-auto">
      <table class="w-full border border-grayTheme bg-white rounded-md overflow-hidden flex flex-col min-w-[600px]">
        <thead class="bg-primary text-white border-b-grayTheme border-b">
          <tr class="flex">
            <th class="w-1/4 border-r border-r-grayTheme">Moeda</th>
            <th class="w-1/4 border-r border-r-grayTheme">Taxa de Câmbio</th>
            <th class="w-1/4 border-r border-r-grayTheme">Quantidade</th>
            <th class="w-1/4 border-r border-r-grayTheme">Total</th>
            <th class="w-1/12"></th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(item, index) in transactionItems" :key="index" class="flex items-stretch">
            <td class="w-1/4 border-r border-r-grayTheme">{{ item.currency }}</td>
            <td class="w-1/4 border-r border-r-grayTheme">{{ item.exchangeRate }}</td>
            <td class="w-1/4 border-r border-r-grayTheme">{{ item.amount.toLocaleString('pt-BR', { style: 'currency', currency: item.currency.split('-')[0] }) }}</td>
            <td class="w-1/4 border-r border-r-grayTheme">{{ item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
            <td class="w-1/12">
              <button @click="removeItem(index)" class="text-red-500 mt-1">
                <Icon name="material-symbols:delete-outline" size="26"/>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ElementsFieldButton
      v-if="transactionItems.length"
      @click="finalizeTransaction"
      class="ms-auto mt-4"
    >
      Comprar
    </ElementsFieldButton>
  </div>
</template>

<script setup lang="ts">
import { saveTransaction } from '~/services/currency.service';

const transactionStore = useTransactionStore();
const transactionItems = computed(() => transactionStore.items);

const removeItem = (index: number) => {
  transactionStore.items.splice(index, 1); 
};

const finalizeTransaction = async () => {
    const itemsToSave = transactionItems.value.map(item => ({
      currency: item.currency,
      exchangeRate: item.exchangeRate,
      amount: item.amount,
      total: item.total,
    }));

    await saveTransaction(itemsToSave);
    
    transactionStore.clearItems();
};

</script>

<style scoped>
table tbody tr:nth-child(even) {
  background-color: var(--color-offWhite);
}
td {
  padding: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>