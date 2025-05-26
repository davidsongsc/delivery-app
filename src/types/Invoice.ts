export type InvoiceStatus =
  | 'PENDING'
  | 'PAID'
  | 'OVERDUE'
  | 'CANCELLED';

export interface Invoice {
  uid: string;
  transaction: string;
  number: string;
  issuer: string;
  issue_date: string;
  due_date: string;
  payment_date: string | null;
  status: InvoiceStatus;
  file: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}