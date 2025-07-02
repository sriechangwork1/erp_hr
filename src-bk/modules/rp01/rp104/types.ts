// rp104/types.ts

export interface StaffDataRaw {
  staff_id: number;
  citizen_id: string;
  prefixname_id: number; // Unused for now, but good to keep
  academic_title: string; // Unused for now
  first_name_th: string;
  last_name_th: string;
  middle_name_th: string; // Unused for now
  first_name_en: string; // Unused for now
  last_name_en: string; // Unused for now
  middle_name_en: string; // Unused for now
  gender: string; // "1" (ชาย) or "2" (หญิง)
  date_of_birth: string; // "YYYY-MM-DD"
  faculty_id: number;
  faculty_name_th: string;
  STAFFTYPE_ID: number; // For mapping to staffTypeName
  BUDGET_ID: number; // For mapping to budgetName
  position_academic_name_th: string | null;
  position_admin_name_th: string | null;
  POSITION_WORK: string | null; // General position
  // Add other fields if needed from the full JSON
}

// Interface for processed retired staff data
export interface RetiredStaffDetail {
  id: number; // Unique ID for table row keys (can be staffId)
  staffId: number;
  retirementYear: number;
  fullNameTh: string;
  gender: 'ชาย' | 'หญิง' | 'ไม่ระบุ';
  positionName: string;
  staffTypeName: string;
  budgetName: string;
  facultyName: string;
  facultyId: number; // To enable filtering by faculty_id
  dateOfBirth: string; // Original DoB for reference
}

// Interface for summary table rows
export interface RetirementSummaryRow {
  category: 'รวมทั้งหมด' | 'สายวิชาการ' | 'สายสนับสนุนวิชาการ' | 'ข้าราชการ' | 'พนักงานมหาวิทยาลัย' | 'พนักงานราชการ' | 'ลูกจ้างประจำ' | 'อื่นๆ';
  totalRetired: number;
}

// Interface for column definitions in tables
export interface Column {
  id: string; // key of data
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}