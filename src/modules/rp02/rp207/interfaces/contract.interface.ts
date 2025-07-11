// src/interfaces/contract.interface.ts
export interface IContract {
    contract_type: string;
    start_date: string; // YYYY-MM-DD
    end_date: string; // YYYY-MM-DD
    contract_url: string;
}