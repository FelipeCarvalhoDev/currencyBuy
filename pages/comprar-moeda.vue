<template>
  <div class="bg-white">
    <div class="py-12 container flex items-center justify-center flex-col gap-8">
      <h1 class="text-4xl font-bold">Cotação</h1>
      <FormsPurchase/>
      <h1 class="text-4xl font-bold">Resumo da compra</h1>
      <SectionSummaryTransaction/>
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
