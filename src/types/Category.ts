import { User } from './User';

export type CategoryType = 'INCOME' | 'EXPENSE';

export interface Category {
  uid: string;
  name: string;
  description: string | null;
  type: CategoryType;
  created_by: User;
  created_at: string; // ISO date string
}