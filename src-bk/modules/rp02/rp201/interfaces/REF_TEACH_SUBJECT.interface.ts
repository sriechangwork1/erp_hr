// src/interfaces/REF_TEACH_SUBJECT.interface.ts
export interface RefTeachSubjectData {
  TEACH_SUBJECT_ID: string;
  DESCRIPTION: string;
  ย้อนกลับ: string | null; // Nullable if some values are empty
}