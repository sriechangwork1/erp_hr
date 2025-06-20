// rp109/types.ts

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
  position_admin_name_th: string | null; // This is key for this report
  POSITION_WORK: string | null; // Generic work position
  date_of_appointment?: string;
  phone_number?: string;
  email1?: string;
  is_active?: boolean;
}

// Type for staff data displayed in the table rows
export interface AdministrativeStaffDisplay {
  id: number; // Use staff_id as id
  staffId: number;
  fullNameTh: string;
  gender: 'ชาย' | 'หญิง' | 'ไม่ระบุ';
  facultyName: string;
  adminPositionName: string; // The administrative position
  academicPositionName: string | null; // Academic position if applicable
  staffTypeDisplay: string; // ข้าราชการ, พนักงานมหาวิทยาลัย etc.
  dateOfAppointment: string;
  isActive: boolean;
}

// Type for grouped data in the table (for header/footer rows)
export interface GroupedAdminPositionRow {
  groupKey: string; // Unique key for react list
  type: 'faculty_header' | 'admin_position_header' | 'staff_detail' | 'admin_position_total' | 'faculty_total' | 'grand_total';
  facultyName: string; // For faculty header/total/grand total
  adminPositionName?: string; // For administrative position header/total
  totalCount?: number; // For totals
  maleCount?: number;
  femaleCount?: number;
  staffDetail?: AdministrativeStaffDisplay; // For staff detail rows
}

// Mapping for STAFFTYPE_ID
export const StaffTypeMapping: { [key: number]: string } = {
  1: 'ข้าราชการ',
  2: 'ลูกจ้างประจำ',
  3: 'พนักงานมหาวิทยาลัย',
  4: 'พนักงานราชการ',
  5: 'ลูกจ้างชั่วคราว',
};

// Static Faculty Data Type (reused)
export interface Faculty {
  FACULTYID: string;
  FACULTYNAME: string;
}