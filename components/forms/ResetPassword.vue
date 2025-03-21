<template>
  <div class="border border-grayTheme rounded-md p-8 bg-gray-100 w-full md:w-1/2 lg:w-1/3">
    <Form 
      @submit.prevent="onSubmit" 
      class="w-full flex flex-col gap-4"
      v-slot="{ errors }"
    >

      <ElementsFieldInput
        label="Nova senha" 
        name="password" 
        id="password" 
        v-model="newPassword"
        :has-error="!!errors.password" 
        type="password"
        rules="required|password"
      />

      <ElementsFieldButton
        :disabled="isLoading"
        fullWidth
        type="submit"
      >
        Criar nova senha
      </ElementsFieldButton>
    </Form>

  </div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import { resetPassword } from '~/services/auth.service';


const isLoading = ref(false);

const route = useRoute();
const token = route.query.token;

const newPassword = ref('');

const onSubmit = async() => {
  const body = {
    newPassword: newPassword.value,
    token: token
  }
  await resetPassword(body)
}

</script>

<style scoped>

</style>