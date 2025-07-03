// rp107/types.ts

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

// Simplified staff detail for internal processing in this report
export interface StaffDetailForPositionReport {
  id: number;
  staffId: number;
  fullNameTh: string;
  gender: 'ชาย' | 'หญิง' | 'ไม่ระบุ';
  positionName: string; // Combined academic_title, position_academic_name_th, position_admin_name_th, POSITION_WORK
  positionType: 'สายวิชาการ' | 'สายสนับสนุน' | 'ไม่ระบุ';
  facultyName: string;
  // Add other fields if needed for detailed export
}

// Data structure for summary by faculty and position
export interface PositionByFacultySummaryRow {
  groupKey: string; // Unique key for rows (e.g., "FacultyName__PositionName" or just "FacultyName")
  type: 'faculty' | 'position' | 'grand_total'; // To distinguish row types for styling/logic
  facultyName: string;
  positionName: string; // Or 'รวม' for faculty total row
  totalStaff: number;
  maleCount: number;
  femaleCount: number;
  // Other aggregated data if needed
}

// Generic Column definition for tables (reused)
export interface Column<T> {
  id: keyof T | string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

// Mapping for STAFFTYPE_ID (for Position Type identification)
export const StaffTypeMapping: { [key: number]: string } = {
  1: 'ข้าราชการ',
  2: 'ลูกจ้างประจำ',
  3: 'พนักงานมหาวิทยาลัย',
  4: 'พนักงานราชการ',
  5: 'ลูกจ้างชั่วคราว',
};