<template>
  <div class="bg-white">
    <div class="py-12 container flex items-center justify-center flex-col gap-8">
      <h1 class="text-4xl font-bold">Extrato de Transações</h1>
      <SectionHistoryTransactions/>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth',
  auth: true,
  layout: 'default'
});
</script>
