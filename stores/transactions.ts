export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    items: [] as Array<{
      currency: string,
      exchangeRate: number,
      amount: number,
      total: number
    }>
  }),
  actions: {
    addItem(item: { currency: string, exchangeRate: number, amount: number, total: number }) {
      this.items.push(item);
    },
    clearItems() {
      this.items = [];
    }
  }
});
