
const stores = () => {
  const loadingStore = useLoadingStore();
  const modalStore = useModalStore();
  return { loadingStore, modalStore };
};

export const getCurrencies = async () => {
    return useFetchData<any>(
    "/api/currency/currencies",
      {
        method: "GET",
      },
    )
    .then(response => {
      return response
    })
    .catch(error => {      
      throw error
    })
    .finally(() => {
    });
};

export const saveTransaction = async (items: any[]) => {
  const { loadingStore, modalStore } = stores();
  loadingStore.showLoading();
    await useFetchData<any>(
    "/api/currency/purchase",
      {
        method: "POST",
        body: { items },
        requiresAuth: true,
      },
    )
    .then(response => {
      modalStore.showModal({
        title: response.title,
        message: response.message,
        redirect: {
          link: '/extrato',
          btnText: 'Ir para Extrato'
        }
      })
      return response.data
    })
    .catch(error => {      
      throw error
    })
    .finally(() => {
      loadingStore.closeLoading();
    });
};

export const getTransactions = async () => {
  const { loadingStore } = stores();
  loadingStore.showLoading();
  return useFetchData<any>(
  "/api/currency/transactions",
    {
      method: "GET",
      requiresAuth: true,
    },
  )
  .then(response => {
    return response
  })
  .catch(error => {      
    throw error
  })
  .finally(() => {
    loadingStore.closeLoading();
  });
};