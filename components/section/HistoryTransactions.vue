<template>
  <div class="border border-grayTheme rounded-md p-8 bg-gray-100 w-full max-w-screen-xl">
    <h2 v-if="!transactions.length" class="text-center text-lg">Não há transações para exibir</h2>
    
    <div v-else class="overflow-auto md:overflow-y-auto md:max-h-[600px]">
      <table class="w-full border border-grayTheme bg-white rounded-md overflow-hidden flex flex-col min-w-[800px]">
        <thead class="bg-primary text-white border-b-grayTheme border-b">
          <tr class="flex">
            <th class="w-1/6 border-r border-r-grayTheme">Data</th>
            <th class="w-1/4 border-r border-r-grayTheme">Moeda</th>
            <th class="w-1/4 border-r border-r-grayTheme">Taxa de Câmbio</th>
            <th class="w-1/4 border-r border-r-grayTheme">Quantidade</th>
            <th class="w-1/4 border-r border-r-grayTheme">Total</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(item, index) in transactions" :key="index" class="flex items-stretch">
            <td class="w-1/6 border-r border-r-grayTheme text-sm" v-html="formatDate(item.createdAt)"></td>
            <td class="w-1/4 border-r border-r-grayTheme">{{ item.currency }}</td>
            <td class="w-1/4 border-r border-r-grayTheme">{{ item.exchangeRate }}</td>
            <td class="w-1/4 border-r border-r-grayTheme">{{ item.amount.toLocaleString('pt-BR', { style: 'currency', currency: item.currency.split('-')[0] }) }}</td>
            <td class="w-1/4">{{ item.totalWithFee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTransactions } from '~/services/currency.service';
import type { Transaction } from '~/utils/types/Transactions';

const transactions = ref<Transaction[]>([]);

onMounted(async () => {
  transactions.value = await getTransactions()
})

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString("pt-BR", {dateStyle: 'short', timeStyle: 'short'}).replace(',', '<br/>às')
}

</script>

<style scoped>
table tbody tr:nth-child(even) {
  background-color: var(--color-offWhite);
}
td {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>