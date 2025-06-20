// src/pages/hr915/index.tsx
import React from 'react';
// Import Client Component ที่ถูกแยกออกมา
import HR915PositionListsComponent from './Table';

// =========================================================
// 1. กำหนด Interface สำหรับโครงสร้างข้อมูล (เหมือนเดิม)
// =========================================================
interface Staff {
  staff_id: number;
  faculty_id: string;
  academic_position_id: string | null;
  support_position_id: string | null;
  position_work: string | null;
  STAFFTYPE_ID: string | null;
  academic_title: string | null;
}

export interface PositionSummary {
    [positionName: string]: number; // key: ชื่อตำแหน่ง, value: จำนวนบุคลากร
}

// =========================================================
// 2. ตาราง Master สำหรับแมปชื่อตำแหน่ง (เหมือน hr913)
//    ย้ายมาไว้ที่นี่เพราะ getServerSideProps ต้องใช้
// =========================================================
const ACADEMIC_POSITIONS_MAPPING: { [key: string]: string[] } = {
  'ศาสตราจารย์': ['ศาสตราจารย์', 'ศ.'],
  'รองศาสตราจารย์': ['รองศาสตราจารย์', 'รศ.'],
  'ผู้ช่วยศาสตราจารย์': ['ผู้ช่วยศาสตราจารย์', 'ผศ.'],
  'อาจารย์': ['อาจารย์', 'อ.'],
  'อาจารย์พิเศษ/พนักงานสอน': ['อาจารย์พิเศษ', 'พนักงานสอน', 'อาจารย์พิเศษ/พนักงานสอน'],
  'ข้าราชการสายวิชาการ': ['ข้าราชการพลเรือนในสถาบันอุดมศึกษา', 'ข้าราชการ'],
  'พนักงานมหาวิทยาลัยสายวิชาการ': ['พนักงานมหาวิทยาลัย (สายวิชาการ)', 'พนักงานมหาวิทยาลัย', 'พนักงาน'],
  'Other Academic': [], // Catch-all for academic positions not explicitly mapped
};

const SUPPORT_POSITIONS_MAPPING: { [key: string]: string[] } = {
  'นักวิชาการ': ['นักวิชาการ', 'นักวิจัย', 'นักวิทยาศาสตร์', 'นักจัดการ'],
  'เจ้าหน้าที่บริหารงานทั่วไป': ['เจ้าหน้าที่บริหารงานทั่วไป', 'เจ้าหน้าที่บริหาร'],
  'บุคลากร': ['บุคลากร', 'พนักงาน', 'เจ้าหน้าที่'],
  'ข้าราชการสายสนับสนุน': ['ข้าราชการ (สายสนับสนุน)', 'ข้าราชการ'],
  'พนักงานมหาวิทยาลัยสายสนับสนุน': ['พนักงานมหาวิทยาลัย (สายสนับสนุน)', 'พนักงานมหาวิทยาลัย', 'พนักงาน'],
  'ลูกจ้างประจำ': ['ลูกจ้างประจำ'],
  'ลูกจ้างชั่วคราว': ['ลูกจ้างชั่วคราว'],
  'พนักงานราชการ': ['พนักงานราชการ'],
  'เจ้าหน้าที่ห้องปฏิบัติการ': ['เจ้าหน้าที่ห้องปฏิบัติการ'],
  'Other Support': [], // Catch-all for support positions not explicitly mapped
};


// =========================================================
// 3. getServerSideProps: โค้ดส่วนนี้จะรันบน SERVER
//    และใช้ข้อมูลจำลองจาก hr913
// =========================================================
export async function getServerSideProps() {
  let academicPositionsSummary: PositionSummary | null = null;
  let supportPositionsSummary: PositionSummary | null = null;
  let error: string | null = null;

  try {
    console.log('--- getServerSideProps: เริ่มต้นประมวลผลรายงานรายชื่อตำแหน่ง (hr915) ---');

    // *** ข้อมูลจำลอง (MOCK DATA) ใช้ชุดเดียวกับ hr913 ***
    const mockStaffData = {
      Staff: [
        { "staff_id": 101, "faculty_id": "1", "academic_position_id": "0", "support_position_id": "0", "position_work": "ศาสตราจารย์", "STAFFTYPE_ID": "10", "academic_title": "ศ." },
        { "staff_id": 102, "faculty_id": "1", "academic_position_id": "0", "support_position_id": "0", "position_work": "ผู้ช่วยศาสตราจารย์", "STAFFTYPE_ID": "10", "academic_title": "ผศ." },
        { "staff_id": 103, "faculty_id": "1", "academic_position_id": "0", "support_position_id": "0", "position_work": "นักวิชาการคอมพิวเตอร์", "STAFFTYPE_ID": "20", "academic_title": null },
        { "staff_id": 104, "faculty_id": "2", "academic_position_id": "0", "support_position_id": "0", "position_work": "อาจารย์", "STAFFTYPE_ID": "10", "academic_title": "อ." },
        { "staff_id": 105, "faculty_id": "2", "academic_position_id": "0", "support_position_id": "0", "position_work": "เจ้าหน้าที่บริหารงานทั่วไป", "STAFFTYPE_ID": "20", "academic_title": null },
        { "staff_id": 106, "faculty_id": "3", "academic_position_id": "0", "support_position_id": "0", "position_work": "ลูกจ้างประจำ", "STAFFTYPE_ID": "30", "academic_title": null },
        { "staff_id": 107, "faculty_id": "1", "academic_position_id": "0", "support_position_id": "0", "position_work": "นักวิชาการศึกษา", "STAFFTYPE_ID": "20", "academic_title": null },
        { "staff_id": 108, "faculty_id": "2", "academic_position_id": "0", "support_position_id": "0", "position_work": "นักวิจัย", "STAFFTYPE_ID": "20", "academic_title": null },
        { "staff_id": 109, "faculty_id": "1", "academic_position_id": "0", "support_position_id": "0", "position_work": "ผู้ช่วยศาสตราจารย์", "STAFFTYPE_ID": "10", "academic_title": "ผศ." },
        { "staff_id": 110, "faculty_id": "1", "academic_position_id": "0", "support_position_id": "0", "position_work": "เจ้าหน้าที่บริหาร", "STAFFTYPE_ID": "20", "academic_title": null },
        { "staff_id": 111, "faculty_id": "Unknown", "academic_position_id": "0", "support_position_id": "0", "position_work": "อาจารย์", "STAFFTYPE_ID": "10", "academic_title": "อ." },
        { "staff_id": 112, "faculty_id": "4", "academic_position_id": "0", "support_position_id": "0", "position_work": "ศาสตราจารย์", "STAFFTYPE_ID": "10", "academic_title": "ศ." },
        { "staff_id": 113, "faculty_id": "4", "academic_position_id": "0", "support_position_id": "0", "position_work": "พนักงานมหาวิทยาลัย (สายสนับสนุน)", "STAFFTYPE_ID": "20", "academic_title": null },
        { "staff_id": 114, "faculty_id": "5", "academic_position_id": "0", "support_position_id": "0", "position_work": "อาจารย์", "STAFFTYPE_ID": "10", "academic_title": "อ." },
        { "staff_id": 115, "faculty_id": "5", "academic_position_id": "0", "support_position_id": "0", "position_work": "ลูกจ้างชั่วคราว", "STAFFTYPE_ID": "30", "academic_title": null }
      ]
    };

    academicPositionsSummary = {};
    supportPositionsSummary = {};
    console.log('สถานะเริ่มต้น: academicPositionsSummary =', academicPositionsSummary, ', supportPositionsSummary =', supportPositionsSummary);

    // ประมวลผลข้อมูล Staff เพื่อสร้างรายงานตำแหน่ง
    if (mockStaffData && Array.isArray(mockStaffData.Staff)) {
      console.log(`กำลังประมวลผลข้อมูลบุคลากร ${mockStaffData.Staff.length} รายการ.`);
      mockStaffData.Staff.forEach((staff: Staff) => {
        const positionWork = staff.position_work || '';
        const staffTypeId = staff.STAFFTYPE_ID;

        let isAcademic = false;
        let isSupport = false;

        // Logic การจำแนกประเภทบุคลากร (เหมือน hr913)
        // ตรวจสอบ STAFFTYPE_ID ก่อน
        if (staffTypeId === '10') {
            isAcademic = true;
        } else if (staffTypeId === '20' || staffTypeId === '30') {
            isSupport = true;
        }

        // ตรวจสอบ academic_position_id / support_position_id (ถ้ามี)
        if (staff.academic_position_id && staff.academic_position_id !== '0') {
            isAcademic = true;
            isSupport = false; // ถ้าเป็น Academic ชัดเจน ไม่ถือว่าเป็น Support
        }
        if (staff.support_position_id && staff.support_position_id !== '0') {
            isSupport = true;
            isAcademic = false; // ถ้าเป็น Support ชัดเจน ไม่ถือว่าเป็น Academic
        }
        // ตรวจสอบ academic_title (ถ้ามี)
        if (staff.academic_title && staff.academic_title !== '') {
            isAcademic = true;
            isSupport = false; // ถ้ามี academic_title น่าจะเป็น Academic
        }

        // หากยังไม่ถูกจำแนกชัดเจน ให้ใช้ position_work และ mapping
        if (!isAcademic && !isSupport) {
            const lowerCasePosition = positionWork.toLowerCase();
            let assumedType: 'academic' | 'support' | 'none' = 'none';

            const foundInAcademicMapping = Object.values(ACADEMIC_POSITIONS_MAPPING).some(positions =>
                positions.some(p => lowerCasePosition.includes(p.toLowerCase()))
            );
            const foundInSupportMapping = Object.values(SUPPORT_POSITIONS_MAPPING).some(positions =>
                positions.some(p => lowerCasePosition.includes(p.toLowerCase()))
            );

            if (foundInAcademicMapping && !foundInSupportMapping) {
                assumedType = 'academic';
            } else if (!foundInAcademicMapping && foundInSupportMapping) {
                assumedType = 'support';
            } else if (foundInAcademicMapping && foundInSupportMapping) {
                // ถ้าตรงทั้งคู่ ให้ใช้ STAFFTYPE_ID เป็นตัวตัดสินสุดท้าย หรือ Academic เป็น default
                if (staffTypeId === '20' || staffTypeId === '30') {
                    assumedType = 'support';
                } else {
                    assumedType = 'academic'; // default to academic if still ambiguous
                }
            } else { // ไม่ตรงกับ mapping ใดๆ เลย
                if (staffTypeId === '10') {
                    assumedType = 'academic';
                } else if (staffTypeId === '20' || staffTypeId === '30') {
                    assumedType = 'support';
                } else if (staff.academic_title) { // ถ้ามี academic_title แต่ STAFFTYPE_ID ไม่ชัด
                    assumedType = 'academic';
                } else if (positionWork) { // ถ้ามี position_work แต่ไม่มี academic_title, STAFFTYPE_ID ไม่ชัด, ไม่ตรง mapping
                    assumedType = 'support'; // สมมติว่าเป็น Support หากเป็นตำแหน่งงานทั่วไป
                }
            }

            if (assumedType === 'academic') {
                isAcademic = true;
            } else if (assumedType === 'support') {
                isSupport = true;
            }
        }


        // ถ้าเป็นสายวิชาการ
        if (isAcademic) {
          let matchedPosition: string = 'Other Academic';
          const lowerCasePositionWork = positionWork.toLowerCase();
          
          // ใช้ academic_title ก่อน (เพราะมักจะแม่นยำกว่า position_work สำหรับสายวิชาการ)
          if (staff.academic_title === 'ศ.') matchedPosition = 'ศาสตราจารย์';
          else if (staff.academic_title === 'รศ.') matchedPosition = 'รองศาสตราจารย์';
          else if (staff.academic_title === 'ผศ.') matchedPosition = 'ผู้ช่วยศาสตราจารย์';
          else if (staff.academic_title === 'อ.') matchedPosition = 'อาจารย์';
          else { // ถ้าไม่มี academic_title หรือไม่ตรงกับที่รู้จัก ให้ดูจาก position_work
            for (const key in ACADEMIC_POSITIONS_MAPPING) {
              if (ACADEMIC_POSITIONS_MAPPING[key].some(p => lowerCasePositionWork.includes(p.toLowerCase()))) {
                matchedPosition = key;
                break;
              }
            }
          }
          academicPositionsSummary![matchedPosition] = (academicPositionsSummary![matchedPosition] || 0) + 1;
        }

        // ถ้าเป็นสายสนับสนุน
        if (isSupport) {
          let matchedPosition: string = 'Other Support';
          const lowerCasePositionWork = positionWork.toLowerCase();
          for (const key in SUPPORT_POSITIONS_MAPPING) {
            if (SUPPORT_POSITIONS_MAPPING[key].some(p => lowerCasePositionWork.includes(p.toLowerCase()))) {
              matchedPosition = key;
              break;
            }
          }
          supportPositionsSummary![matchedPosition] = (supportPositionsSummary![matchedPosition] || 0) + 1;
        }
      });
      console.log('ประมวลผลข้อมูลบุคลากรจำลองสำเร็จ. รายงานสรุปตำแหน่ง:');
      console.log('Final academicPositionsSummary:', JSON.stringify(academicPositionsSummary, null, 2));
      console.log('Final supportPositionsSummary:', JSON.stringify(supportPositionsSummary, null, 2));

    } else {
      console.warn('คำเตือน: mockStaffData.Staff ไม่ใช่ Array หรือไม่มีอยู่. จะไม่มีข้อมูลรายงานตำแหน่ง.');
      academicPositionsSummary = {};
      supportPositionsSummary = {};
    }

  } catch (err: any) {
    console.error("--- Error ใน getServerSideProps (hr915) ---");
    console.error("รายละเอียดข้อผิดพลาด:", err);
    error = `เกิดข้อผิดพลาดภายใน Sever: ${err.message || String(err)}. โปรดตรวจสอบ Server Terminal.`;
    academicPositionsSummary = null;
    supportPositionsSummary = null;
  } finally {
    console.log('--- getServerSideProps (hr915): สิ้นสุดการประมวลผล ---');
    console.log('ข้อมูลที่ส่งไปที่ Client - academicPositionsSummary:', academicPositionsSummary ? 'มีข้อมูล' : 'ไม่มีข้อมูล');
    console.log('ข้อมูลที่ส่งไปที่ Client - supportPositionsSummary:', supportPositionsSummary ? 'มีข้อมูล' : 'ไม่มีข้อมูล');
    console.log('ข้อความ Error ที่ส่งไปที่ Client:', error);
  }

  // ส่งข้อมูลที่ได้ (หรือ null ถ้าเกิด Error) และข้อความ Error กลับไปให้ Client Component
  return {
    props: {
      academicPositionsSummary,
      supportPositionsSummary,
      error,
    },
  };
}

// =========================================================
// 4. Component หลักของหน้า (รันบน Server และส่ง props ไป Client Component)
// =========================================================
interface HR915PageProps {
    academicPositionsSummary: PositionSummary | null;
    supportPositionsSummary: PositionSummary | null;
    error: string | null;
}

const HR915Page: React.FC<HR915PageProps> = (props) => {
    // Render Client Component และส่ง props ต่อไป
    return <HR915PositionListsComponent {...props} />;
};

export default HR915Page;