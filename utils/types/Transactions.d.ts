export interface Transaction {
  id: string; 
  createdAt: string;
  currency: string;
  exchangeRate: number;
  amount: number;
  totalWithFee: number;
}