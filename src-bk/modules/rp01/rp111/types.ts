// rp111/types.ts

// --- Interfaces เดิมจาก rp103/rp110 (อาจจะมีการปรับใช้) ---
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

// --- Interface สำหรับข้อมูลประวัติการศึกษา (จะถูกจำลองเพิ่มเติม) ---
export interface EducationHistory {
  educationLevel: string; // เช่น ปริญญาตรี, ปริญญาโท, ปริญญาเอก
  degree: string;         // เช่น วท.บ., วศ.ม., ปร.ด.
  major: string;          // เช่น วิทยาการคอมพิวเตอร์, วิศวกรรมไฟฟ้า
  university: string;     // เช่น มหาวิทยาลัยมหาสารคาม, จุฬาลงกรณ์มหาวิทยาลัย
  gradYear: number;       // ปีที่จบการศึกษา
}

// --- Interface สำหรับโครงสร้างข้อมูลบุคลากรจาก JSON (simplified & enhanced) ---
export interface StaffMember {
  staff_id: number;
  citizen_id: string;
  first_name_th: string;
  last_name_th: string;
  staff_type_id: number | null; // ใน JSON เป็น null, จะต้องจำลองค่า หรือใช้ academic_position_id/work_line_id ในการระบุสาย
  work_line_id: number | null;
  academic_position_id: number | null;
  support_position_id: number | null;
  academic_standing_id: number | null; // 1: ศาสตราจารย์, 2: รศ., 3: ผศ., 4: อ.
  academic_title: string | null; // "ศาสตราจารย์", "รองศาสตราจารย์", "ผู้ช่วยศาสตราจารย์"
  position_work: string | null; // "นักวิชาการศึกษา", "เจ้าหน้าที่บริหารงานทั่วไป"
  faculty_id: string; // ตรงกับ FACULTYID ใน FacultyData
  phone_number: string;
  email1: string;
  // เพิ่ม field สำหรับการจำแนกสายงานในโค้ด
  staffType: 'สายวิชาการ' | 'สายสนับสนุนวิชาการ' | 'ไม่ระบุ';
  // เพิ่ม field สำหรับประวัติการศึกษา
  educationHistory: EducationHistory[];
}

// --- Interface สำหรับการแสดงผลในรายงาน (รวมข้อมูล Staff และ Faculty) ---
export interface StaffMemberWithFaculty extends StaffMember {
  facultyName: string; // เพิ่มชื่อหน่วยงานเพื่อความสะดวก
}

// --- สำหรับกำหนดคอลัมน์ของตาราง ---
export interface Column {
  id: keyof StaffMemberWithFaculty | keyof EducationHistory | 'staffFullName' | 'staffTypeDisplay' | 'degrees';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: any) => string | React.ReactNode; // สามารถคืนค่าเป็น ReactNode ได้
}