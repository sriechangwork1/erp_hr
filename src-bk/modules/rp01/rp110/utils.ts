// rp110/utils.ts
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  FacultyData,
  PositionStaffing,
  StaffTypeStaffing,
  FacultyStaffingDetail,
  OverallPositionSummary,
} from './types';

// --- ข้อมูลคณะ/หน่วยงานเริ่มต้น (ใช้จาก rp103 ได้เลย) ---
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

// --- ตำแหน่งสายวิชาการและสายสนับสนุน (ใช้จาก rp103 ได้เลย) ---
export const academicPositions: string[] = [
  'ศาสตราจารย์',
  'รองศาสตราจารย์',
  'ผู้ช่วยศาสตราจารย์',
  'อาจารย์',
];

export const supportPositions: string[] = [
  'นักวิชาการศึกษา',
  'เจ้าหน้าที่ห้องปฏิบัติการ',
  'เลขานุการคณะ',
  'นักทรัพยากรบุคคล',
  'เจ้าหน้าที่ธุรการ',
  'ผู้อำนวยการกอง',
  'นักวิเคราะห์นโยบายและแผน',
  'บุคลากรวิทยาศาสตร์',
  'พนักงานขับรถ',
  'ยาม',
];

// Helper function to generate random numbers for approved and actual
const getRandomStaffing = (
  minApproved: number,
  maxApproved: number
): { approved: number; actual: number; vacant: number } => {
  const approved = Math.floor(Math.random() * (maxApproved - minApproved + 1)) + minApproved;
  const actual = Math.floor(Math.random() * (approved + 1)); // actual <= approved
  const vacant = approved - actual;
  return { approved, actual, vacant };
};

// --- ฟังก์ชันจำลองข้อมูลอัตรากำลังบุคลากรสำหรับแต่ละหน่วยงาน ---
export const generateStaffingDetailData = (
  facultyData: FacultyData[]
): FacultyStaffingDetail[] => {
  return facultyData.map((faculty) => {
    const isFaculty = faculty.FACULTYTYPEID === 1; // 1: คณะ, 2: สำนักงาน

    const academicStaffing: PositionStaffing[] = academicPositions.map((posName) => {
      let approved, actual, vacant;
      if (isFaculty) {
        // คณะ: มีอาจารย์เยอะ
        if (posName === 'ศาสตราจารย์') {
          ({ approved, actual, vacant } = getRandomStaffing(0, 3));
        } else if (posName === 'รองศาสตราจารย์') {
          ({ approved, actual, vacant } = getRandomStaffing(2, 8));
        } else if (posName === 'ผู้ช่วยศาสตราจารย์') {
          ({ approved, actual, vacant } = getRandomStaffing(5, 15));
        } else {
          // อาจารย์
          ({ approved, actual, vacant } = getRandomStaffing(10, 30));
        }
      } else {
        // สำนักงาน: ไม่มีตำแหน่งวิชาการ
        approved = 0;
        actual = 0;
        vacant = 0;
      }
      const utilizationRate = approved > 0 ? (actual / approved) * 100 : 0;
      return { positionName: posName, approved, actual, vacant, utilizationRate };
    });

    const supportStaffing: PositionStaffing[] = supportPositions.map((posName) => {
      let approved, actual, vacant;
      if (!isFaculty) {
        // สำนักงาน: มีสายสนับสนุนเยอะ
        if (posName === 'ผู้อำนวยการกอง') {
          ({ approved, actual, vacant } = getRandomStaffing(1, 2));
        } else if (posName === 'นักวิเคราะห์นโยบายและแผน' || posName === 'นักทรัพยากรบุคคล') {
          ({ approved, actual, vacant } = getRandomStaffing(2, 7));
        } else if (posName === 'เจ้าหน้าที่ธุรการ') {
          ({ approved, actual, vacant } = getRandomStaffing(5, 15));
        } else {
          ({ approved, actual, vacant } = getRandomStaffing(1, 5));
        }
      } else {
        // คณะ: มีสายสนับสนุนตามความจำเป็น
        if (posName === 'เลขานุการคณะ') {
          ({ approved, actual, vacant } = getRandomStaffing(1, 1)); // ปกติมี 1 คน
        } else if (posName === 'นักวิชาการศึกษา') {
          ({ approved, actual, vacant } = getRandomStaffing(2, 5));
        } else if (posName === 'เจ้าหน้าที่ห้องปฏิบัติการ' && faculty.FACULTYID === '01') {
          // คณะวิทยาศาสตร์มีเจ้าหน้าที่ห้องปฏิบัติการเยอะหน่อย
          ({ approved, actual, vacant } = getRandomStaffing(5, 10));
        } else {
          ({ approved, actual, vacant } = getRandomStaffing(1, 3));
        }
      }
      const utilizationRate = approved > 0 ? (actual / approved) * 100 : 0;
      return { positionName: posName, approved, actual, vacant, utilizationRate };
    });

    // Calculate totals for academic staffing in this faculty
    const academicApprovedTotal = academicStaffing.reduce((sum, p) => sum + p.approved, 0);
    const academicActualTotal = academicStaffing.reduce((sum, p) => sum + p.actual, 0);
    const academicVacantTotal = academicApprovedTotal - academicActualTotal;
    const academicUtilizationRate =
      academicApprovedTotal > 0 ? (academicActualTotal / academicApprovedTotal) * 100 : 0;

    // Calculate totals for support staffing in this faculty
    const supportApprovedTotal = supportStaffing.reduce((sum, p) => sum + p.approved, 0);
    const supportActualTotal = supportStaffing.reduce((sum, p) => sum + p.actual, 0);
    const supportVacantTotal = supportApprovedTotal - supportActualTotal;
    const supportUtilizationRate =
      supportApprovedTotal > 0 ? (supportActualTotal / supportApprovedTotal) * 100 : 0;

    // Calculate overall faculty totals
    const facultyApprovedTotal = academicApprovedTotal + supportApprovedTotal;
    const facultyActualTotal = academicActualTotal + supportActualTotal;
    const facultyVacantTotal = facultyApprovedTotal - facultyActualTotal;
    const facultyUtilizationRate =
      facultyApprovedTotal > 0 ? (facultyActualTotal / facultyApprovedTotal) * 100 : 0;

    return {
      ...faculty,
      academicStaffing,
      supportStaffing,
      facultyApprovedTotal,
      facultyActualTotal,
      facultyVacantTotal,
      facultyUtilizationRate,
    };
  });
};

// --- ฟังก์ชันสำหรับคำนวณข้อมูลสรุปรวมแต่ละตำแหน่งทั่วทั้งมหาวิทยาลัย ---
export const calculateOverallPositionSummary = (
  data: FacultyStaffingDetail[]
): OverallPositionSummary[] => {
  const positionMap = new Map<string, { approved: number; actual: number }>();

  // Aggregate academic positions
  academicPositions.forEach((posName) => positionMap.set(`academic-${posName}`, { approved: 0, actual: 0 }));
  data.forEach((faculty) => {
    faculty.academicStaffing.forEach((pos) => {
      const key = `academic-${pos.positionName}`;
      const current = positionMap.get(key) || { approved: 0, actual: 0 };
      positionMap.set(key, {
        approved: current.approved + pos.approved,
        actual: current.actual + pos.actual,
      });
    });
  });

  // Aggregate support positions
  supportPositions.forEach((posName) => positionMap.set(`support-${posName}`, { approved: 0, actual: 0 }));
  data.forEach((faculty) => {
    faculty.supportStaffing.forEach((pos) => {
      const key = `support-${pos.positionName}`;
      const current = positionMap.get(key) || { approved: 0, actual: 0 };
      positionMap.set(key, {
        approved: current.approved + pos.approved,
        actual: current.actual + pos.actual,
      });
    });
  });

  const summary: OverallPositionSummary[] = [];

  // Convert map to summary array for academic
  academicPositions.forEach((posName) => {
    const key = `academic-${posName}`;
    const totals = positionMap.get(key)!;
    const vacant = totals.approved - totals.actual;
    const utilizationRate = totals.approved > 0 ? (totals.actual / totals.approved) * 100 : 0;
    summary.push({
      positionName: posName,
      staffType: 'สายวิชาการ',
      approved: totals.approved,
      actual: totals.actual,
      vacant,
      utilizationRate,
    });
  });

  // Convert map to summary array for support
  supportPositions.forEach((posName) => {
    const key = `support-${posName}`;
    const totals = positionMap.get(key)!;
    const vacant = totals.approved - totals.actual;
    const utilizationRate = totals.approved > 0 ? (totals.actual / totals.approved) * 100 : 0;
    summary.push({
      positionName: posName,
      staffType: 'สายสนับสนุนวิชาการ',
      approved: totals.approved,
      actual: totals.actual,
      vacant,
      utilizationRate,
    });
  });

  return summary;
};

// --- Export to PDF (ปรับให้เหมาะกับรายงานนี้) ---
export const handleExportToPdf = (
  summaryData: OverallPositionSummary[],
  filteredDetailData: FacultyStaffingDetail[],
  facultyTypeFilter: string, // 'all', 'faculty', 'office'
  staffTypeFilter: string,   // 'all', 'academic', 'support'
  facultyNameFilter: string
) => {
  //const doc = new jsPDF('p', 'mm', 'a4');
  const doc = new jsPDF('p', 'mm', 'a4') as any; 
  const margin = 10;
  let yOffset = margin;

  const headerText = `รายงานอัตรากำลังบุคลากร (RP110) ${new Date().toLocaleDateString('th-TH')}`;
  doc.setFont('THSarabunNew', 'bold'); // Assuming THSarabunNew font is added
  doc.setFontSize(16);
  doc.text(headerText, 105, yOffset, { align: 'center' });
  yOffset += 10;

  // Filter info
  doc.setFontSize(10);
  doc.text(`ตัวกรอง:`, margin, yOffset);
  doc.text(`  ชื่อหน่วยงาน: ${facultyNameFilter || 'ทั้งหมด'}`, margin, yOffset + 5);
  doc.text(`  ประเภทหน่วยงาน: ${facultyTypeFilter === 'faculty' ? 'คณะ' : facultyTypeFilter === 'office' ? 'สำนักงาน' : 'ทั้งหมด'}`, margin, yOffset + 10);
  doc.text(`  สายงาน: ${staffTypeFilter === 'academic' ? 'สายวิชาการ' : staffTypeFilter === 'support' ? 'สายสนับสนุน' : 'ทั้งหมด'}`, margin, yOffset + 15);
  yOffset += 25;


  // --- Overall Summary Table ---
  doc.setFontSize(14);
  doc.text('สรุปอัตรากำลังบุคลากรแยกตามตำแหน่ง (ทั้งมหาวิทยาลัย)', margin, yOffset);
  yOffset += 5;

  const summaryColumns = [
    { header: 'ตำแหน่ง', dataKey: 'positionName' },
    { header: 'ประเภทสายงาน', dataKey: 'staffType' },
    { header: 'อนุมัติ', dataKey: 'approved' },
    { header: 'มีอยู่จริง', dataKey: 'actual' },
    { header: 'ว่าง', dataKey: 'vacant' },
    { header: 'อัตราบรรจุ (%)', dataKey: 'utilizationRate' },
  ];

  const summaryRows = summaryData.map((row) => ({
    positionName: row.positionName,
    staffType: row.staffType,
    approved: row.approved,
    actual: row.actual,
    vacant: row.vacant,
    utilizationRate: row.utilizationRate.toFixed(2),
  }));

  (doc as any).autoTable({
    head: [summaryColumns.map(col => col.header)],
    body: summaryRows.map(row => summaryColumns.map(col => row[col.dataKey as keyof typeof row])),
    startY: yOffset,
    margin: { left: margin, right: margin },
    styles: { font: 'THSarabunNew', fontSize: 9, cellPadding: 1, overflow: 'linebreak' },
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontStyle: 'bold' },
    columnStyles: {
      approved: { halign: 'right' },
      actual: { halign: 'right' },
      vacant: { halign: 'right' },
      utilizationRate: { halign: 'right' },
    },
    didDrawPage: function (data: any) {
      // Footer
      let str = 'หน้า ' + (doc as any).internal.getNumberOfPages();
      doc.setFontSize(9);
      doc.text(str, doc.internal.pageSize.getWidth() - margin, doc.internal.pageSize.getHeight() - margin, { align: 'right' });
    },
  });
  yOffset = (doc as any).autoTable.previous.finalY + 10;


  // --- Detail Tables by Faculty ---
  if (filteredDetailData.length > 0) {
    doc.addPage();
    yOffset = margin;
    doc.setFontSize(14);
    doc.text('รายละเอียดอัตรากำลังบุคลากรแยกตามหน่วยงาน', margin, yOffset);
    yOffset += 5;

    filteredDetailData.forEach((faculty, index) => {
      if (yOffset > doc.internal.pageSize.getHeight() - 40) { // Check if new page needed
        doc.addPage();
        yOffset = margin;
      }

      doc.setFontSize(12);
      doc.text(`หน่วยงาน: ${faculty.FACULTYNAME}`, margin, yOffset);
      yOffset += 7;

      const detailColumns = [
        { header: 'ตำแหน่ง', dataKey: 'positionName' },
        { header: 'อนุมัติ', dataKey: 'approved' },
        { header: 'มีอยู่จริง', dataKey: 'actual' },
        { header: 'ว่าง', dataKey: 'vacant' },
        { header: 'อัตราบรรจุ (%)', dataKey: 'utilizationRate' },
      ];

      // Academic Staffing for this faculty
      if (staffTypeFilter === 'all' || staffTypeFilter === 'academic') {
        const academicRows = faculty.academicStaffing.map((pos) => ({
          positionName: pos.positionName,
          approved: pos.approved,
          actual: pos.actual,
          vacant: pos.vacant,
          utilizationRate: pos.utilizationRate.toFixed(2),
        }));
        if (academicRows.length > 0) {
          doc.setFontSize(11);
          doc.text('สายวิชาการ', margin + 5, yOffset);
          yOffset += 3;
          (doc as any).autoTable({
            head: [detailColumns.map(col => col.header)],
            body: academicRows.map(row => detailColumns.map(col => row[col.dataKey as keyof typeof row])),
            startY: yOffset,
            margin: { left: margin + 5, right: margin },
            styles: { font: 'THSarabunNew', fontSize: 8, cellPadding: 1, overflow: 'linebreak' },
            headStyles: { fillColor: [230, 230, 230], textColor: [0, 0, 0] },
            columnStyles: {
              approved: { halign: 'right' },
              actual: { halign: 'right' },
              vacant: { halign: 'right' },
              utilizationRate: { halign: 'right' },
            },
          });
          yOffset = (doc as any).autoTable.previous.finalY + 3;
        }
      }


      // Support Staffing for this faculty
      if (staffTypeFilter === 'all' || staffTypeFilter === 'support') {
        const supportRows = faculty.supportStaffing.map((pos) => ({
          positionName: pos.positionName,
          approved: pos.approved,
          actual: pos.actual,
          vacant: pos.vacant,
          utilizationRate: pos.utilizationRate.toFixed(2),
        }));
        if (supportRows.length > 0) {
          doc.setFontSize(11);
          doc.text('สายสนับสนุนวิชาการ', margin + 5, yOffset);
          yOffset += 3;
          (doc as any).autoTable({
            head: [detailColumns.map(col => col.header)],
            body: supportRows.map(row => detailColumns.map(col => row[col.dataKey as keyof typeof row])),
            startY: yOffset,
            margin: { left: margin + 5, right: margin },
            styles: { font: 'THSarabunNew', fontSize: 8, cellPadding: 1, overflow: 'linebreak' },
            headStyles: { fillColor: [230, 230, 230], textColor: [0, 0, 0] },
            columnStyles: {
              approved: { halign: 'right' },
              actual: { halign: 'right' },
              vacant: { halign: 'right' },
              utilizationRate: { halign: 'right' },
            },
          });
          yOffset = (doc as any).autoTable.previous.finalY + 5;
        }
      }

      // Faculty Totals
      const totalRow = {
        positionName: 'รวม',
        approved: faculty.facultyApprovedTotal,
        actual: faculty.facultyActualTotal,
        vacant: faculty.facultyVacantTotal,
        utilizationRate: faculty.facultyUtilizationRate.toFixed(2),
      };

      if (yOffset > doc.internal.pageSize.getHeight() - 20) { // Check if new page needed
        doc.addPage();
        yOffset = margin;
      }
      doc.setFontSize(10);
      doc.text(`รวม ${faculty.FACULTYNAME}: อนุมัติ ${totalRow.approved} | มีอยู่จริง ${totalRow.actual} | ว่าง ${totalRow.vacant} | บรรจุ ${totalRow.utilizationRate}%`, margin + 5, yOffset);
      yOffset += 10;
    });
  }

  doc.save('รายงานอัตรากำลังบุคลากร_RP110.pdf');
};


// --- Export to Excel (ปรับให้เหมาะกับรายงานนี้) ---
export const handleExportToExcel = (
  summaryData: OverallPositionSummary[],
  filteredDetailData: FacultyStaffingDetail[],
  facultyTypeFilter: string,
  staffTypeFilter: string,
  facultyNameFilter: string
) => {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Overall Summary by Position
  const summaryHeader = [
    'ตำแหน่ง',
    'ประเภทสายงาน',
    'อัตรากำลังที่ได้รับอนุมัติ',
    'อัตรากำลังที่มีอยู่จริง',
    'อัตรากำลังว่าง',
    'อัตราส่วนการบรรจุ (%)',
  ];
  const summaryRows = summaryData.map((d) => [
    d.positionName,
    d.staffType,
    d.approved,
    d.actual,
    d.vacant,
    d.utilizationRate.toFixed(2),
  ]);
  const summaryWs = XLSX.utils.aoa_to_sheet([summaryHeader, ...summaryRows]);
  XLSX.utils.book_append_sheet(wb, summaryWs, 'สรุปภาพรวมตามตำแหน่ง');

  // Sheet 2: Detail by Faculty
  if (filteredDetailData.length > 0) {
    let detailData: any[][] = [];
    const detailHeader = [
      'หน่วยงาน',
      'ประเภทสายงาน',
      'ตำแหน่ง',
      'อนุมัติ',
      'มีอยู่จริง',
      'ว่าง',
      'อัตราบรรจุ (%)',
    ];
    detailData.push(detailHeader);

    filteredDetailData.forEach((faculty) => {
      // Academic Staffing
      if (staffTypeFilter === 'all' || staffTypeFilter === 'academic') {
        faculty.academicStaffing.forEach((pos) => {
          detailData.push([
            faculty.FACULTYNAME,
            'สายวิชาการ',
            pos.positionName,
            pos.approved,
            pos.actual,
            pos.vacant,
            pos.utilizationRate.toFixed(2),
          ]);
        });
        // Add academic total for faculty
        if (faculty.academicStaffing.length > 0) {
          detailData.push([
            `${faculty.FACULTYNAME} รวมสายวิชาการ`,
            '', // No staff type for total
            '', // No position name for total
            faculty.academicStaffing.reduce((sum, p) => sum + p.approved, 0),
            faculty.academicStaffing.reduce((sum, p) => sum + p.actual, 0),
            faculty.academicStaffing.reduce((sum, p) => sum + p.vacant, 0),
            (faculty.academicStaffing.reduce((sum, p) => sum + p.approved, 0) > 0
              ? (faculty.academicStaffing.reduce((sum, p) => sum + p.actual, 0) /
                  faculty.academicStaffing.reduce((sum, p) => sum + p.approved, 0)) * 100
              : 0
            ).toFixed(2),
          ]);
        }
      }

      // Support Staffing
      if (staffTypeFilter === 'all' || staffTypeFilter === 'support') {
        faculty.supportStaffing.forEach((pos) => {
          detailData.push([
            faculty.FACULTYNAME,
            'สายสนับสนุนวิชาการ',
            pos.positionName,
            pos.approved,
            pos.actual,
            pos.vacant,
            pos.utilizationRate.toFixed(2),
          ]);
        });
        // Add support total for faculty
        if (faculty.supportStaffing.length > 0) {
          detailData.push([
            `${faculty.FACULTYNAME} รวมสายสนับสนุน`,
            '',
            '',
            faculty.supportStaffing.reduce((sum, p) => sum + p.approved, 0),
            faculty.supportStaffing.reduce((sum, p) => sum + p.actual, 0),
            faculty.supportStaffing.reduce((sum, p) => sum + p.vacant, 0),
            (faculty.supportStaffing.reduce((sum, p) => sum + p.approved, 0) > 0
              ? (faculty.supportStaffing.reduce((sum, p) => sum + p.actual, 0) /
                  faculty.supportStaffing.reduce((sum, p) => sum + p.approved, 0)) * 100
              : 0
            ).toFixed(2),
          ]);
        }
      }

      // Add a separator for better readability in Excel
      detailData.push(['', '', '', '', '', '', '']); // Empty row
    });

    const detailWs = XLSX.utils.aoa_to_sheet(detailData);
    XLSX.utils.book_append_sheet(wb, detailWs, 'รายละเอียดแยกหน่วยงาน');
  }


  XLSX.writeFile(wb, 'รายงานอัตรากำลังบุคลากร_RP110.xlsx');
};