// rp108/types.ts

// Re-using StaffDataRaw for consistency from previous reports
export interface StaffDataRaw {
  staff_id: number;
  citizen_id: string;
  prefixname_id: number;
  academic_title: string | null;
  first_name_th: string;
  last_name_th: string;
  middle_name_th: string | null;
  first_name_en: string | null;
  last_name_en: string | null;
  middle_name_en: string | null;
  gender: string; // "1" for Male, "2" for Female
  date_of_birth: string; // YYYY-MM-DD
  faculty_id: number;
  faculty_name_th: string;
  STAFFTYPE_ID: number;
  BUDGET_ID: number;
  position_academic_name_th: string | null;
  position_admin_name_th: string | null;
  POSITION_WORK: string | null;
  date_of_appointment?: string;
  phone_number?: string;
  email1?: string;
  is_active?: boolean;
}

// --- Specific Types for G.P.7 Sections (Simulated History) ---

export interface HistoricalPosition {
  positionName: string;
  facultyName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD, or null if current
  salary: number; // For simplicity, a flat salary for that period
  level: string; // e.g., "ชำนาญการ", "ระดับ 3"
}

export interface EducationRecord {
  degree: string; // e.g., "ปริญญาตรี", "ปริญญาโท"
  major: string;
  institution: string;
  yearGraduated: string; // YYYY
}

export interface TrainingRecord {
  courseName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  institution: string;
  hours: number;
}

export interface AwardRecord {
  awardName: string; // e.g., "เหรียญจักรพรรดิมาลา", "ตริตาภรณ์ช้างเผือก"
  awardDate: string; // YYYY-MM-DD
  gazetteRef: string; // e.g., "เล่ม 130 ตอน 20 ข หน้า 56"
}

// Enriched Staff Data for G.P.7 Report
export interface Gp7StaffData extends StaffDataRaw {
  // Fields from StaffDataRaw are directly included
  // Add derived/processed fields
  fullNameTh: string;
  fullNameEn: string | null;
  genderTh: 'ชาย' | 'หญิง' | 'ไม่ระบุ';
  currentPositionDisplay: string; // Combines academic_title, position_name
  currentStaffTypeDisplay: string; // From StaffTypeMapping

  // Simulated Historical Data
  historicalPositions: HistoricalPosition[];
  educationHistory: EducationRecord[];
  trainingHistory: TrainingRecord[];
  awardHistory: AwardRecord[];
  // salaryHistory?: SalaryRecord[]; // Could add this if needed for more detail
}

// Static Faculty Data Type (reused)
export interface Faculty {
  FACULTYID: string;
  FACULTYNAME: string;
}

// Mapping for STAFFTYPE_ID (for Position Type identification)
export const StaffTypeMapping: { [key: number]: string } = {
  1: 'ข้าราชการ',
  2: 'ลูกจ้างประจำ',
  3: 'พนักงานมหาวิทยาลัย',
  4: 'พนักงานราชการ',
  5: 'ลูกจ้างชั่วคราว',
};

// For Staff Selector component
export interface StaffOption {
  staff_id: number;
  fullNameTh: string;
  facultyName: string;
  currentPositionName: string;
}