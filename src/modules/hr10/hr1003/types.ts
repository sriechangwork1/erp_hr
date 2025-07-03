// hr1003/types.ts
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
  STAFFTYPE_ID: number; // e.g., 1=ข้าราชการ, 2=ลูกจ้างประจำ, 3=พนักงานมหาวิทยาลัย, 4=พนักงานราชการ, 5=ลูกจ้างชั่วคราว
  JOB_CATEGORY_ID: number; // เพิ่มเข้ามาสำหรับสายงาน
  BUDGET_ID: number;
  position_academic_name_th: string | null;
  position_admin_name_th: string | null;
  POSITION_WORK: string | null;
  date_of_appointment?: string; // Simulated date of appointment
  phone_number?: string;
  email1?: string;
  is_active?: boolean; // Active/Inactive status
}

// Data structure for display in the detailed staff table
export interface StaffDetailByType {
  id: number; // Unique ID for key prop
  staffId: number;
  fullNameTh: string;
  gender: 'ชาย' | 'หญิง' | 'ไม่ระบุ';
  positionName: string;
  staffTypeName: string;
  jobCategoryName: string; // เพิ่มเข้ามาสำหรับสายงาน
  facultyName: string;
  dateOfAppointment?: string;
  phoneNumber?: string;
  email?: string;
}

// Data structure for summary by staff type
export interface StaffTypeSummaryRow {
  staffTypeName: string;
  totalStaff: number;
  maleCount: number;
  femaleCount: number;
  // Other aggregated data if needed
}

// Data structure for summary by job category (สายงาน)
export interface StaffJobCategorySummaryRow {
  jobCategoryName: string;
  totalStaff: number;
  maleCount: number;
  femaleCount: number;
}

// Generic Column definition for tables
export interface Column<T> {
  id: keyof T | string; // 'ลำดับ' for index column
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

// Mapping for STAFFTYPE_ID
export const StaffTypeMapping: { [key: number]: string } = {
  1: 'ข้าราชการ',
  2: 'ลูกจ้างประจำ',
  3: 'พนักงานมหาวิทยาลัย',
  4: 'พนักงานราชการ',
  5: 'ลูกจ้างชั่วคราว',
};

// Mapping for JOB_CATEGORY_ID (เพิ่มเข้ามา)
export const JobCategoryMapping: { [key: number]: string } = {
  1: 'สอนและวิจัย',
  2: 'ผู้บริหาร',
  3: 'บริหารงานทั่วไป',
  4: 'บริการวิชาการ',
  5: 'วิจัยและพัฒนา',
  6: 'สนับสนุนวิชาการ',
};