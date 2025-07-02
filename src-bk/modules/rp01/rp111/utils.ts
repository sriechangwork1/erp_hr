// rp111/utils.ts
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  FacultyData,
  StaffMember,
  EducationHistory,
  StaffMemberWithFaculty,
} from './types';

// ข้อมูลคณะ/หน่วยงานเริ่มต้น (ใช้จาก rp103 ได้เลย)
export const initialFacultyData: FacultyData[] = [
  {
    FACULTYID: '01',
    FACULTYNAME: 'คณะวิทยาศาสตร์',
    FACULTYNAMEENG: 'Faculty of Science',
    FACULTYTYPEID: 1, // 1: คณะ
    BUILDING: 'ตึกวิทยา',
    SUBDISTRICT: 'ขามเรียง',
    DISTRICT: 'กันทรวิชัย',
    PROVINCE: 'มหาสารคาม',
    POSTCODE: 44150,
    PHONE: '043-754321',
    FAX: null,
    PHONEIN: null,
    EMAIL: null,
    FACSTATUS: null,
    REMARK: null,
    STAFFID: null,
    CREATEDATE: null,
    BUDGETTYPEID: null,
    GROUPID: null,
    REF_FAC: null,
  },
  {
    FACULTYID: '02',
    FACULTYNAME: 'คณะวิศวกรรมศาสตร์',
    FACULTYNAMEENG: 'Faculty of Engineering',
    FACULTYTYPEID: 1,
    BUILDING: 'ตึกวิศวะ',
    SUBDISTRICT: 'ขามเรียง',
    DISTRICT: 'กันทรวิชัย',
    PROVINCE: 'มหาสารคาม',
    POSTCODE: 44150,
    PHONE: '043-754322',
    FAX: null,
    PHONEIN: null,
    EMAIL: null,
    FACSTATUS: null,
    REMARK: null,
    STAFFID: null,
    CREATEDATE: null,
    BUDGETTYPEID: null,
    GROUPID: null,
    REF_FAC: null,
  },
  {
    FACULTYID: '03',
    FACULTYNAME: 'สำนักงานอธิการบดี',
    FACULTYNAMEENG: 'Office of the President',
    FACULTYTYPEID: 2, // 2: สำนักงาน
    BUILDING: 'ตึกสำนักงาน',
    SUBDISTRICT: 'ขามเรียง',
    DISTRICT: 'กันทรวิชัย',
    PROVINCE: 'มหาสารคาม',
    POSTCODE: 44150,
    PHONE: '043-754300',
    FAX: null,
    PHONEIN: null,
    EMAIL: null,
    FACSTATUS: null,
    REMARK: null,
    STAFFID: null,
    CREATEDATE: null,
    BUDGETTYPEID: null,
    GROUPID: null,
    REF_FAC: null,
  },
  {
    FACULTYID: '04',
    FACULTYNAME: 'สำนักทะเบียนและประมวลผล',
    FACULTYNAMEENG: 'Registrar Office',
    FACULTYTYPEID: 2,
    BUILDING: 'ตึกบริการ',
    SUBDISTRICT: 'ขามเรียง',
    DISTRICT: 'กันทรวิชัย',
    PROVINCE: 'มหาสารคาม',
    POSTCODE: 44150,
    PHONE: '043-754301',
    FAX: null,
    PHONEIN: null,
    EMAIL: null,
    FACSTATUS: null,
    REMARK: null,
    STAFFID: null,
    CREATEDATE: null,
    BUDGETTYPEID: null,
    GROUPID: null,
    REF_FAC: null,
  },
  {
    FACULTYID: '05',
    FACULTYNAME: 'คณะมนุษยศาสตร์และสังคมศาสตร์',
    FACULTYNAMEENG: 'Faculty of Humanities and Social Sciences',
    FACULTYTYPEID: 1,
    BUILDING: 'ตึกมนุษย์ฯ',
    SUBDISTRICT: 'ขามเรียง',
    DISTRICT: 'กันทรวิชัย',
    PROVINCE: 'มหาสารคาม',
    POSTCODE: 44150,
    PHONE: '043-754323',
    FAX: null,
    PHONEIN: null,
    EMAIL: null,
    FACSTATUS: null,
    REMARK: null,
    STAFFID: null,
    CREATEDATE: null,
    BUDGETTYPEID: null,
    GROUPID: null,
    REF_FAC: null,
  },
];

// --- จำลองข้อมูลบุคลากรจาก JSON ---
// เนื่องจากไม่มีไฟล์ _Staff__202506201029.json ให้เข้าถึงโดยตรง
// ผมจะจำลองโครงสร้างและข้อมูลบางส่วนคล้ายกับที่พบในไฟล์นั้น
// และเพิ่ม EducationHistory เข้าไปในแต่ละ StaffMember
const mockStaffData: any[] = [ // Using 'any' as a placeholder for raw JSON structure
  {
    "staff_id": 5000004,
    "citizen_id": "1100400741048",
    "first_name_th": "ทรงชัย",
    "last_name_th": "มุกดาม่วง",
    "academic_title": "ศาสตราจารย์", // Added for clarity
    "academic_standing_id": 1, // 1: ศาสตราจารย์
    "position_work": "อาจารย์",
    "faculty_id": "01", // คณะวิทยาศาสตร์
    "phone_number": "081-234-5678",
    "email1": "songchai.m@example.com",
    "STAFFTYPE_ID": 1, // สมมติ 1 คือ สายวิชาการ
    "work_line_id": null,
  },
  {
    "staff_id": 5000005,
    "citizen_id": "1100400741049",
    "first_name_th": "สมหญิง",
    "last_name_th": "สุขใจ",
    "academic_title": "ผู้ช่วยศาสตราจารย์",
    "academic_standing_id": 3, // 3: ผศ.
    "position_work": "อาจารย์",
    "faculty_id": "01", // คณะวิทยาศาสตร์
    "phone_number": "081-234-5679",
    "email1": "somying.s@example.com",
    "STAFFTYPE_ID": 1,
    "work_line_id": null,
  },
  {
    "staff_id": 5000006,
    "citizen_id": "1100400741050",
    "first_name_th": "มานะ",
    "last_name_th": "คงทน",
    "academic_title": null,
    "academic_standing_id": null,
    "position_work": "นักวิชาการศึกษา",
    "faculty_id": "01", // คณะวิทยาศาสตร์
    "phone_number": "081-234-5680",
    "email1": "mana.k@example.com",
    "STAFFTYPE_ID": 2, // สมมติ 2 คือ สายสนับสนุน
    "work_line_id": 101, // สมมติ 101 คือ สายวิชาการศึกษา
  },
  {
    "staff_id": 5000007,
    "citizen_id": "1100400741051",
    "first_name_th": "เมตตา",
    "last_name_th": "ดีพร้อม",
    "academic_title": "รองศาสตราจารย์",
    "academic_standing_id": 2, // 2: รศ.
    "position_work": "อาจารย์",
    "faculty_id": "02", // คณะวิศวกรรมศาสตร์
    "phone_number": "081-234-5681",
    "email1": "metta.d@example.com",
    "STAFFTYPE_ID": 1,
    "work_line_id": null,
  },
  {
    "staff_id": 5000008,
    "citizen_id": "1100400741052",
    "first_name_th": "ชัยชนะ",
    "last_name_th": "ก้าวหน้า",
    "academic_title": null,
    "academic_standing_id": null,
    "position_work": "เจ้าหน้าที่ธุรการ",
    "faculty_id": "03", // สำนักงานอธิการบดี
    "phone_number": "081-234-5682",
    "email1": "chaichana.k@example.com",
    "STAFFTYPE_ID": 2,
    "work_line_id": 102, // สมมติ 102 คือ สายธุรการ
  },
  {
    "staff_id": 5000009,
    "citizen_id": "1100400741053",
    "first_name_th": "ปรีชา",
    "last_name_th": "พัฒนา",
    "academic_title": null,
    "academic_standing_id": null,
    "position_work": "นักวิเคราะห์นโยบายและแผน",
    "faculty_id": "03", // สำนักงานอธิการบดี
    "phone_number": "081-234-5683",
    "email1": "preecha.p@example.com",
    "STAFFTYPE_ID": 2,
    "work_line_id": 103, // สมมติ 103 คือ สายวิเคราะห์
  },
  {
    "staff_id": 5000010,
    "citizen_id": "1100400741054",
    "first_name_th": "กานดา",
    "last_name_th": "ใฝ่รู้",
    "academic_title": "อาจารย์",
    "academic_standing_id": 4, // 4: อาจารย์
    "position_work": "อาจารย์",
    "faculty_id": "05", // คณะมนุษยศาสตร์และสังคมศาสตร์
    "phone_number": "081-234-5684",
    "email1": "kanda.f@example.com",
    "STAFFTYPE_ID": 1,
    "work_line_id": null,
  },
  // Add more mock data as needed
];

// Helper function to simulate education history
const generateEducationHistory = (): EducationHistory[] => {
  const histories: EducationHistory[] = [];
  const eduLevels = ['ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก'];
  const degrees = ['วท.บ.', 'ศศ.บ.', 'บธ.บ.', 'วศ.ม.', 'ศศ.ม.', 'บธ.ม.', 'ปร.ด.', 'ด.ร.'];
  const majors = [
    'วิทยาการคอมพิวเตอร์', 'วิศวกรรมไฟฟ้า', 'ภาษาไทย', 'บริหารธุรกิจ', 'เคมี', 'ฟิสิกส์',
    'วิทยาศาสตร์สิ่งแวดล้อม', 'รัฐประศาสนศาสตร์', 'นิติศาสตร์', 'บัญชี'
  ];
  const universities = [
    'มหาวิทยาลัยมหาสารคาม', 'จุฬาลงกรณ์มหาวิทยาลัย', 'มหาวิทยาลัยเกษตรศาสตร์',
    'มหาวิทยาลัยเชียงใหม่', 'มหาวิทยาลัยขอนแก่น', 'มหาวิทยาลัยธรรมศาสตร์',
    'สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง'
  ];

  // Randomly decide number of degrees (1 to 3)
  const numDegrees = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3 degrees

  for (let i = 0; i < numDegrees; i++) {
    const levelIndex = i % eduLevels.length; // Ensure level increases
    const degree = degrees[Math.floor(Math.random() * degrees.length)];
    const major = majors[Math.floor(Math.random() * majors.length)];
    const university = universities[Math.floor(Math.random() * universities.length)];
    const gradYear = 1990 + Math.floor(Math.random() * 30) + (i * 3); // Simulate increasing years

    histories.push({
      educationLevel: eduLevels[levelIndex],
      degree,
      major,
      university,
      gradYear,
    });
  }

  // Sort education history by gradYear ascending
  histories.sort((a, b) => a.gradYear - b.gradYear);

  return histories;
};

// --- ฟังก์ชันประมวลผลข้อมูลบุคลากรจาก JSON และเพิ่มข้อมูลที่จำเป็น ---
export const processStaffData = (
  rawStaffData: any[], // Assuming it's the raw array from your JSON
  facultyData: FacultyData[]
): StaffMemberWithFaculty[] => {
  const facultyMap = new Map<string, string>();
  facultyData.forEach(f => facultyMap.set(f.FACULTYID, f.FACULTYNAME));

  return rawStaffData.map((staff: any) => {
    let staffType: 'สายวิชาการ' | 'สายสนับสนุนวิชาการ' | 'ไม่ระบุ' = 'ไม่ระบุ';

    // Logic to determine staffType based on available fields
    if (staff.STAFFTYPE_ID === 1) { // Assuming 1 is academic
      staffType = 'สายวิชาการ';
    } else if (staff.STAFFTYPE_ID === 2) { // Assuming 2 is support
      staffType = 'สายสนับสนุนวิชาการ';
    } else if (staff.academic_standing_id !== null) { // If academic_standing_id exists, likely academic
      staffType = 'สายวิชาการ';
    } else if (staff.position_work && (staff.position_work.includes('อาจารย์') || staff.position_work.includes('ศาสตราจารย์'))) {
      staffType = 'สายวิชาการ';
    } else if (staff.work_line_id !== null || staff.position_work !== null) { // If other work-related fields, assume support
      staffType = 'สายสนับสนุนวิชาการ';
    }

    const facultyName = facultyMap.get(staff.faculty_id) || 'ไม่พบหน่วยงาน';

    return {
      ...staff,
      staffType,
      facultyName,
      educationHistory: generateEducationHistory(), // จำลองประวัติการศึกษา
    } as StaffMemberWithFaculty;
  });
};

// --- Export to PDF (ปรับให้เหมาะกับรายงานนี้) ---
export const handleExportToPdf = (
  filteredStaffData: StaffMemberWithFaculty[],
  facultyTypeFilter: string,
  staffTypeFilter: string,
  facultyNameFilter: string
) => {
  const doc = new jsPDF('p', 'mm', 'a4') as any;
  const margin = 10;
  let yOffset = margin;

  const headerText = `รายงานประวัติการศึกษาบุคลากร (RP111) ${new Date().toLocaleDateString('th-TH')}`;
  doc.setFont('THSarabunNew', 'bold');
  doc.setFontSize(16);
  doc.text(headerText, 105, yOffset, { align: 'center' });
  yOffset += 10;

  // Filter info
  doc.setFontSize(10);
  doc.text(`ตัวกรอง:`, margin, yOffset);
  doc.text(`  ชื่อหน่วยงาน: ${facultyNameFilter || 'ทั้งหมด'}`, margin, yOffset + 5);
  doc.text(`  สายงาน: ${staffTypeFilter === 'academic' ? 'สายวิชาการ' : staffTypeFilter === 'support' ? 'สายสนับสนุน' : 'ทั้งหมด'}`, margin, yOffset + 10);
  yOffset += 20;

  doc.setFontSize(14);
  doc.text('รายละเอียดประวัติการศึกษาบุคลากร', margin, yOffset);
  yOffset += 5;

  const columns = [
    { header: 'ลำดับ', dataKey: 'index' },
    { header: 'ชื่อ-นามสกุล', dataKey: 'staffFullName' },
    { header: 'สายงาน', dataKey: 'staffType' },
    { header: 'หน่วยงาน', dataKey: 'facultyName' },
    { header: 'ประวัติการศึกษา', dataKey: 'education' },
  ];

  const rows = filteredStaffData.map((staff, index) => ({
    index: index + 1,
    staffFullName: `${staff.first_name_th} ${staff.last_name_th}`,
    staffType: staff.staffType,
    facultyName: staff.facultyName,
    education: staff.educationHistory
      .map(
        (edu) =>
          `${edu.educationLevel}: ${edu.degree} (${edu.major}) ${edu.university} (${edu.gradYear})`
      )
      .join('\n'), // Join multiple degrees with newline
  }));

  (doc as any).autoTable({
    head: [columns.map(col => col.header)],
    body: rows.map(row => columns.map(col => row[col.dataKey as keyof typeof row])),
    startY: yOffset,
    margin: { left: margin, right: margin },
    styles: { font: 'THSarabunNew', fontSize: 9, cellPadding: 1, overflow: 'linebreak' },
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontStyle: 'bold' },
    columnStyles: {
      education: { cellWidth: 80 }, // ให้คอลัมน์ประวัติการศึกษามีความกว้างเผื่อข้อมูลเยอะ
    },
    didDrawPage: function (data: any) {
      let str = 'หน้า ' + (doc as any).internal.getNumberOfPages();
      doc.setFontSize(9);
      doc.text(str, doc.internal.pageSize.getWidth() - margin, doc.internal.pageSize.getHeight() - margin, { align: 'right' });
    },
  });

  doc.save('รายงานประวัติการศึกษา_RP111.pdf');
};


// --- Export to Excel (ปรับให้เหมาะกับรายงานนี้) ---
export const handleExportToExcel = (
  filteredStaffData: StaffMemberWithFaculty[],
  facultyTypeFilter: string,
  staffTypeFilter: string,
  facultyNameFilter: string
) => {
  const wb = XLSX.utils.book_new();

  let excelData: any[][] = [];
  const header = [
    'ลำดับ',
    'ชื่อ-นามสกุล',
    'สายงาน',
    'หน่วยงาน',
    'ระดับการศึกษา',
    'วุฒิที่ได้รับ',
    'สาขาวิชา',
    'สถาบัน',
    'ปีที่จบ',
  ];
  excelData.push(header);

  filteredStaffData.forEach((staff, staffIndex) => {
    staff.educationHistory.forEach((edu, eduIndex) => {
      excelData.push([
        eduIndex === 0 ? staffIndex + 1 : '', // แสดงลำดับและชื่อแค่ครั้งแรกสำหรับแต่ละบุคลากร
        eduIndex === 0 ? `${staff.first_name_th} ${staff.last_name_th}` : '',
        eduIndex === 0 ? staff.staffType : '',
        eduIndex === 0 ? staff.facultyName : '',
        edu.educationLevel,
        edu.degree,
        edu.major,
        edu.university,
        edu.gradYear,
      ]);
    });
  });

  const ws = XLSX.utils.aoa_to_sheet(excelData);
  XLSX.utils.book_append_sheet(wb, ws, 'ประวัติการศึกษาบุคลากร');

  XLSX.writeFile(wb, 'รายงานประวัติการศึกษา_RP111.xlsx');
};