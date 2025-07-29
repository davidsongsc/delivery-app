export interface IAddress {
  user_id?: string;
  student_id?: string;
  supplier_id?: string;
  affiliate_consultant_id?: string;
  is_default: boolean;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;

  content_type_model?: string;
  object_id?: string;
  
  id: string;
  created_at: string;
  updated_at: string;
}

export type IAddressCreate = Omit<IAddress, "id" | "created_at" | "updated_at">;
