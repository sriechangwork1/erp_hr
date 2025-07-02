// rp103/types.ts
export interface FacultyData {
  FACULTYID: string;
  FACULTYNAME: string;
  FACULTYNAMEENG: string | null;
  FACULTYTYPEID: number;
  BUILDING: string | null;
  SUBDISTRICT: string | null;
  DISTRICT: string | null;
  PROVINCE: string | null;
  POSTCODE: number;
  PHONE: string | null;
  FAX: string | null;
  PHONEIN: string | null;
  EMAIL: string | null;
  FACSTATUS: string | null;
  REMARK: string | null;
  STAFFID: string | null;
  CREATEDATE: string | null;
  BUDGETTYPEID: string | null;
  GROUPID: string | null;
  REF_FAC: string | null;
}

// --- Data สำหรับแต่ละตำแหน่งย่อย ---
export interface PositionStaffing {
  positionName: string;
  approved: number; // อัตรากำลังที่ได้รับอนุมัติ
  actual: number;    // อัตรากำลังที่มีอยู่จริง
  vacant: number;    // อัตรากำลังว่าง (approved - actual)
}

// --- Data สำหรับประเภทบุคลากร (สายวิชาการ/สายสนับสนุน) ---
export interface StaffTypeStaffing {
  staffType: 'สายวิชาการ' | 'สายสนับสนุนวิชาการ';
  positions: PositionStaffing[];
  approvedTotal: number;
  actualTotal: number;
  vacantTotal: number;
}

// --- Data สำหรับแต่ละหน่วยงาน (รวมข้อมูล Faculty และ Staffing) ---
export interface FacultyStaffingDetail extends FacultyData {
  staffingDetails: StaffTypeStaffing[];
  facultyApprovedTotal: number;
  facultyActualTotal: number;
  facultyVacantTotal: number;
}

// --- Data สำหรับ Summary Overview ---
export interface SummaryRow {
  staffType: 'สายวิชาการ' | 'สายสนับสนุนวิชาการ' | 'รวมทั้งหมด';
  approved: number;
  actual: number;
  vacant: number;
  fillRate: number; // สัดส่วนการบรรจุ (%)
}

// --- สำหรับ props ของ Table Columns ---
export interface Column {
  id: string; // key of data
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}