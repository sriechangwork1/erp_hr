// src/interfaces/workPermit.interface.ts
export interface IWorkPermit {
    permit_number: string;
    issue_date: string; // YYYY-MM-DD
    expiry_date: string; // YYYY-MM-DD
    country_of_issue?: string;
    permit_type?: string;
    create_at?: string;
    update_at?: string;
    officer_id?: number;
}