<template>
  <button
    type="button"
    :aria-label="name"
    class="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
  >
    <Icon :name="icon" :aria-label="props.name" />
  </button>
</template>

<script setup lang="ts">
interface AuthSocialButtonProps {
  icon: string,
  name: string
}
const props = defineProps<AuthSocialButtonProps>();
</script>

<style scoped></style>