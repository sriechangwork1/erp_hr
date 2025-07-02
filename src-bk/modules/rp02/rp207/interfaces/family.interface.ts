// src/interfaces/family.interface.ts
export interface IFamily {
    family_id?: number; // Optional as it might not be in all nested family objects
    relationship: string;
    full_name: string;
    date_of_birth?: string; // Optional
    occupation?: string; // Optional
    fam_tel?: string; // Optional
    fam_address?: string; // Optional
    create_at?: string; // Optional
    update_at?: string; // Optional
    officer_id?: number; // Optional
}