// src/interfaces/REF_LEVEL.interface.ts
export interface RefLevelData {
  LEV_ID: string;
  LEV_NAME_TH: string;
  LEV_NAME_ENG: string;
  ย้อนกลับ: string | null; // Nullable if some values are empty
}