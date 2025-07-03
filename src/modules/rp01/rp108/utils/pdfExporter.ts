// src/pages/hr911/utils/pdfExporter.ts

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Gp7StaffData } from '../types';

// Optional: If you have THSarabunNew font loaded, uncomment this
// import 'jspdf-autotable-font-loader/font/THSarabunNew';

export const exportGp7ToPdf = (staffData: Gp7StaffData) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const margin = 14;
  let currentY = margin;

  // Set default font for Thai characters (if loaded)
  // doc.setFont('THSarabunNew');

  const addHeader = (pageNumber: number) => {
    doc.setFontSize(10);
    doc.text(`หน้า ${pageNumber}`, doc.internal.pageSize.width - margin, 10, { align: 'right' });
    doc.setFontSize(14);
    doc.text('รายงานประวัติส่วนบุคคล (ก.พ.7)', margin, 10);
    doc.setFontSize(10);
    doc.text(`ของ ${staffData.fullNameTh} (รหัส ${staffData.staff_id})`, margin, 15);
    doc.line(margin, 17, doc.internal.pageSize.width - margin, 17); // Horizontal line
    currentY = 20; // Reset Y position after header
  };

  addHeader(1); // Add header for the first page

  const checkPageBreak = (heightNeeded: number) => {
    if (currentY + heightNeeded > doc.internal.pageSize.height - margin) {
      doc.addPage();
      addHeader(doc.getNumberOfPages());
    }
  };

  const addSectionTitle = (title: string) => {
    checkPageBreak(10);
    doc.setFontSize(12);
    doc.text(title, margin, currentY);
    doc.line(margin, currentY + 1, doc.internal.pageSize.width - margin, currentY + 1); // Section underline
    currentY += 5;
  };

  // 1. ประวัติส่วนบุคคล
  addSectionTitle('1. ประวัติส่วนบุคคล');
  checkPageBreak(50);
  doc.setFontSize(10);
  doc.text(`ชื่อ-สกุล (ไทย): ${staffData.fullNameTh}`, margin, currentY);
  doc.text(`ชื่อ-สกุล (อังกฤษ): ${staffData.fullNameEn || '-'}`, margin + 80, currentY);
  currentY += 5;
  doc.text(`เลขบัตรประชาชน: ${staffData.citizen_id}`, margin, currentY);
  doc.text(`วัน/เดือน/ปีเกิด: ${staffData.date_of_birth}`, margin + 80, currentY);
  currentY += 5;
  doc.text(`เพศ: ${staffData.genderTh}`, margin, currentY);
  doc.text(`อีเมล: ${staffData.email1 || '-'}`, margin + 80, currentY);
  currentY += 5;
  doc.text(`เบอร์โทรศัพท์: ${staffData.phone_number || '-'}`, margin, currentY);
  doc.text(`ประเภทบุคลากร: ${staffData.currentStaffTypeDisplay}`, margin + 80, currentY);
  currentY += 5;
  doc.text(`หน่วยงานปัจจุบัน: ${staffData.faculty_name_th}`, margin, currentY);
  currentY += 5;
  doc.text(`ตำแหน่งปัจจุบัน: ${staffData.currentPositionDisplay}`, margin, currentY);
  currentY += 5;
  doc.text(`วันที่ได้รับการบรรจุ/แต่งตั้ง: ${staffData.date_of_appointment || '-'}`, margin, currentY);
  currentY += 10;

  // 2. ประวัติการดำรงตำแหน่งและเงินเดือน
  addSectionTitle('2. ประวัติการดำรงตำแหน่งและเงินเดือน');
  if (staffData.historicalPositions && staffData.historicalPositions.length > 0) {
    const tableData = staffData.historicalPositions.map((pos, index) => [
      index + 1,
      pos.positionName,
      pos.level,
      pos.facultyName,
      pos.startDate,
      pos.endDate,
      pos.salary.toLocaleString(),
    ]);
    (doc as any).autoTable({
      head: [['ลำดับ', 'ตำแหน่ง', 'ระดับ/ประเภท', 'หน่วยงาน', 'วันที่เริ่ม', 'วันที่สิ้นสุด', 'เงินเดือน (บาท)']],
      body: tableData,
      startY: currentY,
      margin: { left: margin, right: margin },
      styles: { font: 'THSarabunNew', fontSize: 8, cellPadding: 1 },
      headStyles: { fillColor: [220, 220, 220], textColor: [0,0,0], fontStyle: 'bold' },
      columnStyles: { 6: { halign: 'right' } }, // Align salary to right
      didDrawPage: (data: any) => {
        currentY = data.cursor.y + 5; // Update Y position after table
        addHeader(data.pageNumber); // Add header to new pages
      },
      didParseCell: (data: any) => {
        if (data.column.dataKey === 6) { // If it's the salary column
          data.cell.styles.halign = 'right';
        }
      }
    });
  } else {
    checkPageBreak(10);
    doc.setFontSize(10);
    doc.text('ไม่มีข้อมูลประวัติการดำรงตำแหน่ง', margin, currentY);
    currentY += 10;
  }


  // 3. ประวัติการศึกษา
  addSectionTitle('3. ประวัติการศึกษา');
  if (staffData.educationHistory && staffData.educationHistory.length > 0) {
    const tableData = staffData.educationHistory.map((edu, index) => [
      index + 1,
      edu.degree,
      edu.major,
      edu.institution,
      edu.yearGraduated,
    ]);
    (doc as any).autoTable({
      head: [['ลำดับ', 'วุฒิการศึกษา', 'สาขาวิชา', 'สถาบัน', 'ปีที่สำเร็จ']],
      body: tableData,
      startY: currentY,
      margin: { left: margin, right: margin },
      styles: { font: 'THSarabunNew', fontSize: 8, cellPadding: 1 },
      headStyles: { fillColor: [220, 220, 220], textColor: [0,0,0], fontStyle: 'bold' },
      didDrawPage: (data: any) => {
        currentY = data.cursor.y + 5;
        addHeader(data.pageNumber);
      }
    });
  } else {
    checkPageBreak(10);
    doc.setFontSize(10);
    doc.text('ไม่มีข้อมูลประวัติการศึกษา', margin, currentY);
    currentY += 10;
  }


  // 4. ประวัติการฝึกอบรม/ดูงาน
  addSectionTitle('4. ประวัติการฝึกอบรม/ดูงาน');
  if (staffData.trainingHistory && staffData.trainingHistory.length > 0) {
    const tableData = staffData.trainingHistory.map((train, index) => [
      index + 1,
      train.courseName,
      train.startDate,
      train.endDate,
      train.institution,
      train.hours,
    ]);
    (doc as any).autoTable({
      head: [['ลำดับ', 'หลักสูตร', 'จากวันที่', 'ถึงวันที่', 'สถาบัน/หน่วยงาน', 'จำนวนชั่วโมง']],
      body: tableData,
      startY: currentY,
      margin: { left: margin, right: margin },
      styles: { font: 'THSarabunNew', fontSize: 8, cellPadding: 1 },
      headStyles: { fillColor: [220, 220, 220], textColor: [0,0,0], fontStyle: 'bold' },
      columnStyles: { 5: { halign: 'right' } }, // Align hours to right
      didDrawPage: (data: any) => {
        currentY = data.cursor.y + 5;
        addHeader(data.pageNumber);
      }
    });
  } else {
    checkPageBreak(10);
    doc.setFontSize(10);
    doc.text('ไม่มีข้อมูลประวัติการฝึกอบรม/ดูงาน', margin, currentY);
    currentY += 10;
  }

  // 5. ประวัติการได้รับเครื่องราชอิสริยาภรณ์
  addSectionTitle('5. ประวัติการได้รับเครื่องราชอิสริยาภรณ์');
  if (staffData.awardHistory && staffData.awardHistory.length > 0) {
    const tableData = staffData.awardHistory.map((award, index) => [
      index + 1,
      award.awardName,
      award.awardDate,
      award.gazetteRef,
    ]);
    (doc as any).autoTable({
      head: [['ลำดับ', 'ชื่อเครื่องราชฯ', 'วันที่ได้รับ', 'อ้างอิงราชกิจจานุเบกษา']],
      body: tableData,
      startY: currentY,
      margin: { left: margin, right: margin },
      styles: { font: 'THSarabunNew', fontSize: 8, cellPadding: 1 },
      headStyles: { fillColor: [220, 220, 220], textColor: [0,0,0], fontStyle: 'bold' },
      didDrawPage: (data: any) => {
        currentY = data.cursor.y + 5;
        addHeader(data.pageNumber);
      }
    });
  } else {
    checkPageBreak(10);
    doc.setFontSize(10);
    doc.text('ไม่มีข้อมูลประวัติการได้รับเครื่องราชอิสริยาภรณ์', margin, currentY);
    currentY += 10;
  }

  doc.save(`กพ.7-${staffData.fullNameTh}-${staffData.staff_id}.pdf`);
};