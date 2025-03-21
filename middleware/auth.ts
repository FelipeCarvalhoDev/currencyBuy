
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware(async (to, from) => {

  const userStore = useUserStore(); 
  const authStore = useAuthStore(); 
  const modalStore = useModalStore(); 

  const requiresAuth = to.meta.auth === true;
  const requiresAdmin = to.meta.admin === true;

  if (process.client) {
    if (requiresAuth && !authStore.isLoggedIn) {
      modalStore.showModal({
        type: 'warning',
        title: 'Atenção',
        message: 'Você precisa estar logado para acessar essa página.',
        btnText: 'Entrar'
      })
      return navigateTo('/auth');
    }

    if (requiresAdmin && userStore.role !== 'admin') {
      modalStore.showModal({
        type: 'warning',
        title: 'Warning',
        message: 'Você precisa ser um ADMIN para acessar essa página.'
      })
      return navigateTo(from); 
    }
  }
});
