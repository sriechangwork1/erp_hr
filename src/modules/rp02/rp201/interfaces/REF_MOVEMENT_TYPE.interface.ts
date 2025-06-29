// src/interfaces/REF_MOVEMENT_TYPE.interface.ts
export interface RefMovementTypeData {
  MOVEMENT_TYPE_ID: string;
  DESCRIPTION: string;
  ย้อนกลับ: string | null; // Nullable if some values are empty
}