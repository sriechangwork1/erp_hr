// rp112/types.ts

// Original Faculty Data Interface (ถ้าจำเป็นต้องใช้ใน rp112 แต่ไม่ควร dependency ข้ามโฟลเดอร์)
// หาก rp112/index.tsx ยังคงใช้ FacultyData จาก rp103/types.ts ให้ลบส่วนนี้ออก
// หรือหากต้องการให้ rp112 มี types เป็นของตัวเองทั้งหมด ก็สามารถกำหนด FacultyData ที่นี่ได้
// สำหรับตอนนี้ ผมจะใส่ไว้ให้ก่อน แต่แนะนำให้พิจารณาว่าจำเป็นต้องมีที่นี่หรือไม่
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
  staffTypeStaffing: StaffTypeStaffing[];
  facultyApprovedTotal: number;
  facultyActualTotal: number;
  facultyVacantTotal: number;
}

// **Interface for Raw Staff Data with Salary Fields (ใช้ใน rp112 โดยตรง)**
export interface RawStaffData {
  staff_id: number;
  citizen_id: string;
  first_name_th: string;
  last_name_th: string;
  academic_title: string | null;
  academic_standing_id: number | null;
  position_work: string;
  faculty_id: string;
  phone_number: string | null;
  email1: string | null;
  STAFFTYPE_ID: number;
  work_line_id: string | null;
  base_salary: number;
  position_allowance: number;
  other_allowance: number;
  total_salary: number;
}

// **Interface for Staff Data specifically for Salary Certificate**
export interface CertificateStaffData {
  staff_id: number;
  citizen_id: string;
  title: string; // คำนำหน้า เช่น ศาสตราจารย์, นาย, นาง
  firstName: string;
  lastName: string;
  position: string;
  facultyName: string;
  baseSalary: number;
  positionAllowance: number;
  otherAllowance: number;
  totalSalary: number;
}