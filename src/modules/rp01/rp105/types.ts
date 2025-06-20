// rp105/types.ts

export interface StaffDataRaw {
  staff_id: number;
  citizen_id: string;
  prefixname_id: number; // e.g., 1=นาย, 2=นาง, 3=นางสาว
  academic_title: string | null; // ศ., รศ., ผศ.
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
  STAFFTYPE_ID: number; // e.g., 1=ข้าราชการ, 2=พนักงานมหาวิทยาลัย
  BUDGET_ID: number; // e.g., 1=งบประมาณ, 2=รายได้
  position_academic_name_th: string | null;
  position_admin_name_th: string | null;
  POSITION_WORK: string | null;
  // เพิ่ม field ที่อาจจำเป็นสำหรับรายงานนี้ เช่น:
  date_of_appointment?: string; // วันที่บรรจุ/เริ่มงาน (สมมติว่ามีในข้อมูลจริง)
  phone_number?: string;
  email1?: string;
  is_active?: boolean; // สถานะ Active/Inactive (สมมติว่ามี)
}

// Data structure for display in the detailed staff table
export interface StaffDetailByFaculty {
  id: number; // Unique ID for key prop
  staffId: number;
  fullNameTh: string;
  gender: 'ชาย' | 'หญิง' | 'ไม่ระบุ';
  positionName: string;
  staffTypeName: string;
  budgetName: string;
  facultyName: string;
  dateOfAppointment?: string; // Optional, if you add this field
  phoneNumber?: string; // Optional
  email?: string; // Optional
}

// Data structure for summary by faculty table
export interface FacultySummaryRow {
  facultyName: string;
  totalStaff: number;
  academicStaffCount: number;
  supportStaffCount: number;
  maleCount: number;
  femaleCount: number;
  // อื่นๆ ที่ต้องการสรุป เช่น จำนวนตามประเภทบุคลากรย่อย
}

// Generic Column definition for tables
// T will be either StaffDetailByFaculty or FacultySummaryRow
export interface Column<T> {
  id: keyof T | 'ลำดับ'; // 'ลำดับ' for index column
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}