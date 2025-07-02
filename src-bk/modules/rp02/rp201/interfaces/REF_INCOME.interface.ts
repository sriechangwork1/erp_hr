// src/interfaces/REF_INCOME.interface.ts
export interface RefIncomeData {
  INCOME_ID: string;
  DESCRIPTION: string;
  ย้อนกลับ: string | null; // Nullable if some values are empty
}