// src/interfaces/nameChangeHistory.interface.ts
export interface INameChangeHistory {
    change_date: string; // YYYY-MM-DD
    old_first_name_th: string;
    old_last_name_th: string;
    old_first_name_en?: string;
    old_last_name_en?: string
    reason: string;
    create_at?: string;
    update_at?: string;
    officer_id?: number;
}