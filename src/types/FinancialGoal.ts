export interface FinancialGoal {
    uid: string;
    name: string;
    description: string | null;
    target_amount: number;
    current_amount: number;
    target_date: string; // ISO date
    achieved: boolean;
    achieved_date: string | null;
    created_at: string;
    updated_at: string;
  }