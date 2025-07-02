// src/pages/hr912/utils/pdfExporter.ts

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { GroupedAdminPositionRow } from '../types';

// Optional: If you have THSarabunNew font loaded, uncomment this
// import 'jspdf-autotable-font-loader/font/THSarabunNew';

export const exportAdminPositionsToPdf = (data: GroupedAdminPositionRow[]) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const margin = 14;
  let currentY = margin;

  // Set default font for Thai characters (if loaded)
  // doc.setFont('THSarabunNew');

  doc.setFontSize(14);
  doc.text('รายงานรายชื่อตำแหน่งบริหาร', margin, currentY);
  currentY += 7;
  doc.setFontSize(12);
  doc.text(`ข้อมูล ณ วันที่ ${new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, currentY);
  currentY += 10;

  const tableColumnStyles = {
    0: { cellWidth: 10 }, // No.
    1: { cellWidth: 40 }, // ชื่อ-สกุล
    2: { cellWidth: 35 }, // ตำแหน่งบริหาร
    3: { cellWidth: 35 }, // ตำแหน่งวิชาการ
    4: { cellWidth: 30 }, // ประเภทบุคลากร
    5: { cellWidth: 15 }, // เพศ
    6: { cellWidth: 25 }, // วันที่บรรจุ
  };

  const pdfHeaders = [
    'ลำดับ', 'ชื่อ-สกุล', 'ตำแหน่งบริหาร', 'ตำแหน่งวิชาการ', 'ประเภทบุคลากร', 'เพศ', 'วันที่บรรจุ'
  ];

  const pdfBody: any[] = [];
  let detailCounter = 0; // Counter for staff details within each group

  data.forEach((row) => {
    if (row.type === 'faculty_header') {
      pdfBody.push([
        { content: `หน่วยงาน: ${row.facultyName}`, colSpan: pdfHeaders.length, styles: { fontStyle: 'bold', fillColor: [240, 240, 240], textColor: [0,0,0] } },
      ]);
      detailCounter = 0; // Reset counter for new faculty
    } else if (row.type === 'admin_position_header') {
      pdfBody.push([
        { content: `  >> ตำแหน่ง: ${row.adminPositionName}`, colSpan: pdfHeaders.length, styles: { fontStyle: 'bold', fillColor: [230, 230, 230], textColor: [0,0,0] } },
      ]);
      detailCounter = 0; // Reset counter for new admin position
    } else if (row.type === 'staff_detail' && row.staffDetail) {
      detailCounter++;
      pdfBody.push([
        detailCounter,
        row.staffDetail.fullNameTh,
        row.staffDetail.adminPositionName,
        row.staffDetail.academicPositionName || '-',
        row.staffDetail.staffTypeDisplay,
        row.staffDetail.gender,
        row.staffDetail.dateOfAppointment,
      ]);
    } else if (row.type === 'admin_position_total') {
      pdfBody.push([
        { content: `รวมตำแหน่ง ${row.adminPositionName}: ${row.totalCount} คน (ชาย: ${row.maleCount}, หญิง: ${row.femaleCount})`, colSpan: pdfHeaders.length, styles: { fontStyle: 'bold', halign: 'right', fillColor: [245, 245, 245], textColor: [0,0,0] } },
      ]);
    } else if (row.type === 'faculty_total') {
      pdfBody.push([
        { content: `รวมหน่วยงาน ${row.facultyName}: ${row.totalCount} คน (ชาย: ${row.maleCount}, หญิง: ${row.femaleCount})`, colSpan: pdfHeaders.length, styles: { fontStyle: 'bold', halign: 'right', fillColor: [230, 230, 230], textColor: [0,0,0] } },
      ]);
    } else if (row.type === 'grand_total') {
      pdfBody.push([
        { content: `รวมทั้งหมด: ${row.totalCount} คน (ชาย: ${row.maleCount}, หญิง: ${row.femaleCount})`, colSpan: pdfHeaders.length, styles: { fontStyle: 'bold', halign: 'right', fillColor: [210, 210, 210], textColor: [0,0,0], lineWidth: 0.5 } },
      ]);
    }
  });

  (doc as any).autoTable({
    head: [pdfHeaders],
    body: pdfBody,
    startY: currentY,
    margin: { left: margin, right: margin },
    styles: { font: 'THSarabunNew', fontSize: 8, cellPadding: 1, overflow: 'linebreak' }, // Add font style if installed
    headStyles: { fillColor: [200, 200, 200], textColor: [0,0,0], fontStyle: 'bold' },
    columnStyles: tableColumnStyles,
    didDrawPage: (data: any) => {
      doc.setFontSize(8);
      doc.text(`หน้า ${data.pageNumber}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    }
  });

  doc.save('รายงานรายชื่อตำแหน่งบริหาร.pdf');
  Swal.fire('สำเร็จ!', 'ส่งออก PDF เรียบร้อยแล้ว', 'success');
};