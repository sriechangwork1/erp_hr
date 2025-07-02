// src/interfaces/workPermit.interface.ts
export interface IWorkPermit {
    permit_number: string;
    issue_date: string; // YYYY-MM-DD
    expiry_date: string; // YYYY-MM-DD
}