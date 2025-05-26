import { Category } from './Category';

export type Period = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

export interface Budget {
  uid: string;
  user: string;
  category: Category;
  amount: number;
  period: Period;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}