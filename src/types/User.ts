import { CorporationMember } from "./Member";

interface access {
    level?: string;
    permissions?: string[];
    pages?: string[]
}
export interface User {
    uid: string;
    username: string;
    email: string;
    is_superuser: boolean;
    is_staff: boolean;
    first_name?: string | null;
    last_name?: string | null;
    is_active?: boolean;
    phone_number?: string | null;
    access_level?: access | null;
    invited_by?: string | null;
    cpf?: string | null;
    rg?: string | null;
    other_doc?: string | null;
    corporation_member: CorporationMember;

}
