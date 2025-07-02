// src/interfaces/REF_SUB_RESEARCH_AREA.interface.ts
export interface RefSubResearchAreaData {
  SUB_RESEARCH_AREA_ID: string;
  SUB_RESEARCH_AREA_NAME_TH: string;
  SUB_RESEARCH_AREA_NAME_EN: string;
  RESEARCH_AREA_ID: string; // Foreign key
  COMMENT: string | null;
}