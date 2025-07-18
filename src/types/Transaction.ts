import { Category } from './Category';

export type TransactionType = 'INCOME' | 'EXPENSE';

export type PaymentMethod =
  | 'CASH'
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'BANK_TRANSFER'
  | 'PIX'
  | 'OTHER';

export interface Transaction {
  uid: string;
  user: string;
  category: Category | null;
  amount: number | string;       
  description: string | null;
  date: string;         
  type: TransactionType;
  payment_method: PaymentMethod;
  is_recurring: boolean;
  recurring_details: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}