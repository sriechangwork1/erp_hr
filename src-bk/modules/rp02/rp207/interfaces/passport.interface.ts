// src/interfaces/passport.interface.ts
export interface IPassport {
    passport_number: string;
    issue_date: string; // YYYY-MM-DD
    expiry_date: string; // YYYY-MM-DD
    issue_place: string;
}