// src/pages/hr912/utils/excelExporter.ts

import * as XLSX from 'xlsx';
import { GroupedAdminPositionRow } from '../types';
import Swal from 'sweetalert2';

export const exportAdminPositionsToExcel = (data: GroupedAdminPositionRow[]) => {
  const worksheetData: any[] = [];

  // Add a report title row
  worksheetData.push(['รายงานรายชื่อตำแหน่งบริหาร']);
  worksheetData.push([`ข้อมูล ณ วันที่ ${new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}`]);
  worksheetData.push([]); // Empty row for spacing

  // Add table headers
  worksheetData.push([
    'หน่วยงาน',
    'ตำแหน่งบริหาร',
    'ลำดับ',
    'ชื่อ-สกุล',
    'ตำแหน่งวิชาการ',
    'ประเภทบุคลากร',
    'เพศ',
    'วันที่บรรจุ'
  ]);

  let detailCounter = 0; // Counter for staff details within each group

  data.forEach((row) => {
    if (row.type === 'faculty_header') {
      worksheetData.push([`หน่วยงาน: ${row.facultyName}`]);
      detailCounter = 0; // Reset counter for new faculty
    } else if (row.type === 'admin_position_header') {
      worksheetData.push(['', `>> ตำแหน่ง: ${row.adminPositionName}`]);
      detailCounter = 0; // Reset counter for new admin position
    } else if (row.type === 'staff_detail' && row.staffDetail) {
      detailCounter++;
      worksheetData.push([
        '', // Faculty column (empty for detail)
        '', // Admin Position column (empty for detail)
        detailCounter,
        row.staffDetail.fullNameTh,
        row.staffDetail.academicPositionName || '-',
        row.staffDetail.staffTypeDisplay,
        row.staffDetail.gender,
        row.staffDetail.dateOfAppointment,
      ]);
    } else if (row.type === 'admin_position_total') {
      worksheetData.push([
        '', '', '', '', '', '',
        `รวมตำแหน่ง ${row.adminPositionName}:`,
        `${row.totalCount} คน (ชาย: ${row.maleCount}, หญิง: ${row.femaleCount})`
      ]);
    } else if (row.type === 'faculty_total') {
      worksheetData.push([
        '', '', '', '', '', '',
        `รวมหน่วยงาน ${row.facultyName}:`,
        `${row.totalCount} คน (ชาย: ${row.maleCount}, หญิง: ${row.femaleCount})`
      ]);
    } else if (row.type === 'grand_total') {
      worksheetData.push([
        '', '', '', '', '', '',
        `รวมทั้งหมด:`,
        `${row.totalCount} คน (ชาย: ${row.maleCount}, หญิง: ${row.femaleCount})`
      ]);
    }
  });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Set column widths (optional, approximate)
  const wscols = [
    {wch: 30}, // หน่วยงาน
    {wch: 30}, // ตำแหน่งบริหาร
    {wch: 10}, // ลำดับ
    {wch: 25}, // ชื่อ-สกุล
    {wch: 25}, // ตำแหน่งวิชาการ
    {wch: 20}, // ประเภทบุคลากร
    {wch: 10}, // เพศ
    {wch: 15}  // วันที่บรรจุ
  ];
  worksheet['!cols'] = wscols;

  XLSX.utils.book_append_sheet(workbook, worksheet, 'รายชื่อตำแหน่งบริหาร');
  XLSX.writeFile(workbook, 'รายงานรายชื่อตำแหน่งบริหาร.xlsx');
  Swal.fire('สำเร็จ!', 'ส่งออก Excel เรียบร้อยแล้ว', 'success');
};