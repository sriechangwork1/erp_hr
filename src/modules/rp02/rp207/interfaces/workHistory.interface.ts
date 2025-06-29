// src/interfaces/workHistory.interface.ts
export interface IWorkHistory {
    appointment_number: string;
    start_work_date: string; // YYYY-MM-DD
    end_work_date: string; // YYYY-MM-DD
    position: string;
    organization: string;
}