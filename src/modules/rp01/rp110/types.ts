// rp110/types.ts
export interface FacultyData {
  FACULTYID: string;
  FACULTYNAME: string;
  FACULTYNAMEENG: string | null;
  FACULTYTYPEID: number; // 1: คณะ, 2: สำนักงาน
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
  utilizationRate: number; // อัตราส่วนการบรรจุ (actual / approved * 100)
}

// --- Data สำหรับประเภทบุคลากร (สายวิชาการ/สายสนับสนุน) ในระดับหน่วยงาน ---
export interface StaffTypeStaffing {
  staffType: 'สายวิชาการ' | 'สายสนับสนุนวิชาการ';
  positions: PositionStaffing[];
  approvedTotal: number;
  actualTotal: number;
  vacantTotal: number;
  utilizationRate: number;
}

// --- Data สำหรับแต่ละหน่วยงาน (รวมข้อมูล Faculty และ Staffing) ---
export interface FacultyStaffingDetail extends FacultyData {
  academicStaffing: PositionStaffing[]; // รายละเอียดตำแหน่งสายวิชาการในหน่วยงานนี้
  supportStaffing: PositionStaffing[];  // รายละเอียดตำแหน่งสายสนับสนุนในหน่วยงานนี้
  facultyApprovedTotal: number;
  facultyActualTotal: number;
  facultyVacantTotal: number;
  facultyUtilizationRate: number;
}

// --- Data สำหรับสรุปแต่ละตำแหน่งทั่วทั้งมหาวิทยาลัย (สำหรับตารางสรุปด้านบน) ---
export interface OverallPositionSummary {
  positionName: string;
  staffType: 'สายวิชาการ' | 'สายสนับสนุนวิชาการ';
  approved: number;
  actual: number;
  vacant: number;
  utilizationRate: number;
}

// --- สำหรับกำหนดคอลัมน์ของตาราง ---
export interface Column {
  id: string;//id: 'positionName' | 'approved' | 'actual' | 'vacant' | 'utilizationRate';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}