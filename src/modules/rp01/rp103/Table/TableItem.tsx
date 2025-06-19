// hr906/table/tableitem.tsx
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { FacultyStaffingDetail, Column } from '../types';
import AppCard from '@crema/components/AppCard';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import 'jspdf-autotable-font-loader/font/THSarabunNew'; // อย่าลืมติดตั้งและตั้งค่า Font

interface TableItemProps {
  faculty: FacultyStaffingDetail;
  itemIndex: number; // สำหรับเลขลำดับ (2.1, 2.2)
}

const columns: readonly Column[] = [
  { id: 'positionName', label: 'ตำแหน่ง', minWidth: 150 },
  { id: 'approved', label: 'อัตรากำลังที่ได้รับอนุมัติ', minWidth: 100, align: 'right' },
  { id: 'actual', label: 'อัตรากำลังที่มีอยู่จริง', minWidth: 100, align: 'right' },
  { id: 'vacant', label: 'อัตรากำลังว่าง', minWidth: 100, align: 'right' },
];

const TableItem: React.FC<TableItemProps> = ({ faculty, itemIndex }) => {

  const handleExportSheet = (type: 'excel' | 'pdf', facultyData: FacultyStaffingDetail) => {
    const dataForExport: any[] = [];

    // Add faculty name as a header
    dataForExport.push(['', facultyData.FACULTYNAME, '', '']); // Empty cells for alignment

    // Add staff type headers and positions
    facultyData.staffingDetails.forEach(staffTypeDetail => {
      dataForExport.push([]); // Empty row for spacing
      dataForExport.push([staffTypeDetail.staffType]); // Staff type (e.g., "สายวิชาการ")
      dataForExport.push(columns.map(col => col.label)); // Column headers

      staffTypeDetail.positions.forEach(pos => {
        dataForExport.push([
          `- ${pos.positionName}`,
          pos.approved,
          pos.actual,
          pos.vacant,
        ]);
      });
      dataForExport.push([
        `รวม${staffTypeDetail.staffType}`,
        staffTypeDetail.approvedTotal,
        staffTypeDetail.actualTotal,
        staffTypeDetail.vacantTotal,
      ]);
    });

    // Add overall faculty total
    dataForExport.push([]); // Empty row
    dataForExport.push([
      `รวม${facultyData.FACULTYNAME}`,
      facultyData.facultyApprovedTotal,
      facultyData.facultyActualTotal,
      facultyData.facultyVacantTotal,
    ]);

    if (type === 'excel') {
      const ws = XLSX.utils.aoa_to_sheet(dataForExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, facultyData.FACULTYNAME.substring(0, 30)); // Sheet name max 31 chars
      XLSX.writeFile(wb, `${facultyData.FACULTYNAME}_อัตรากำลัง.xlsx`);
    } else if (type === 'pdf') {
      const doc = new jsPDF();
      // doc.setFont('THSarabunNew'); // Enable if font is set up
      // doc.setR2L(false);

      let startY = 10;
      doc.text(`อัตรากำลัง: ${facultyData.FACULTYNAME}`, 14, startY);
      startY += 10;

      facultyData.staffingDetails.forEach(staffTypeDetail => {
        startY += 5;
        doc.text(staffTypeDetail.staffType, 14, startY);
        startY += 5;

        const tableColumn = columns.map(col => col.label);
        const tableRows = staffTypeDetail.positions.map(pos => [
          `- ${pos.positionName}`,
          pos.approved,
          pos.actual,
          pos.vacant,
        ]);

        (doc as any).autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: startY,
          margin: { left: 14 },
          styles: { font: 'THSarabunNew', fontSize: 8 },
          headStyles: { fillColor: [200, 200, 200] },
          didDrawPage: (data: any) => {
            startY = data.cursor.y + 5; // Update startY for next section
          },
        });

        // Add staff type total row manually after autoTable
        startY = (doc as any).autoTable.previous.finalY + 2;
        doc.setFontSize(8);
        doc.text(`รวม${staffTypeDetail.staffType}: ${staffTypeDetail.approvedTotal} (อนุมัติ) | ${staffTypeDetail.actualTotal} (มีอยู่จริง) | ${staffTypeDetail.vacantTotal} (ว่าง)`, 14, startY);
      });

      // Add overall faculty total
      startY += 5;
      doc.setFontSize(10);
      // doc.setFont('THSarabunNew', 'bold'); // Enable if font is set up
      doc.text(`รวม${facultyData.FACULTYNAME}: ${facultyData.facultyApprovedTotal} (อนุมัติ) | ${facultyData.facultyActualTotal} (มีอยู่จริง) | ${facultyData.facultyVacantTotal} (ว่าง)`, 14, startY);

      doc.save(`${facultyData.FACULTYNAME}_อัตรากำลัง.pdf`);
    }
  };

  const handleCopyTable = () => {
    let tableString = '';

    // Add faculty name
    tableString += `${faculty.FACULTYNAME}\n\n`;

    faculty.staffingDetails.forEach(staffTypeDetail => {
      tableString += `${staffTypeDetail.staffType}\n`;
      tableString += columns.map(col => col.label).join('\t') + '\n';

      staffTypeDetail.positions.forEach(pos => {
        tableString += [
          `- ${pos.positionName}`,
          pos.approved,
          pos.actual,
          pos.vacant,
        ].join('\t') + '\n';
      });

      tableString += `รวม${staffTypeDetail.staffType}\t${staffTypeDetail.approvedTotal}\t${staffTypeDetail.actualTotal}\t${staffTypeDetail.vacantTotal}\n\n`;
    });

    tableString += `รวม${faculty.FACULTYNAME}\t${faculty.facultyApprovedTotal}\t${faculty.facultyActualTotal}\t${faculty.facultyVacantTotal}\n`;

    navigator.clipboard.writeText(tableString)
      .then(() => {
        Swal.fire('คัดลอกสำเร็จ!', `ข้อมูลตาราง ${faculty.FACULTYNAME} ถูกคัดลอกไปยังคลิปบอร์ดแล้ว`, 'success');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        Swal.fire('คัดลอกไม่สำเร็จ!', 'ไม่สามารถคัดลอกข้อมูลตารางได้', 'error');
      });
  };

  return (
    <AppCard sx={{ mb: 4 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          {itemIndex}.{faculty.FACULTYID} {faculty.FACULTYNAME}
        </Typography>
        <Box>
          <Button onClick={() => handleCopyTable()} variant="outlined" size="small" sx={{ mr: 1 }}>
            คัดลอก
          </Button>
          <Button onClick={() => handleExportSheet('excel', faculty)} variant="outlined" size="small" sx={{ mr: 1 }}>
            Excel
          </Button>
          <Button onClick={() => handleExportSheet('pdf', faculty)} variant="outlined" size="small">
            PDF
          </Button>
        </Box>
      </Box>

      {faculty.staffingDetails.map((staffTypeDetail, staffTypeIndex) => (
        <Box key={staffTypeIndex} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ ml: 2, mb: 1 }}>
            {staffTypeDetail.staffType}
          </Typography>
          <TableContainer component={Paper} elevation={1}>
            <Table size="small" aria-label={`${faculty.FACULTYNAME} ${staffTypeDetail.staffType} staffing table`}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {staffTypeDetail.positions.map((position, posIndex) => (
                  <TableRow key={posIndex}>
                    <TableCell sx={{ pl: 4 }}>- {position.positionName}</TableCell>
                    <TableCell align="right">{position.approved}</TableCell>
                    <TableCell align="right">{position.actual}</TableCell>
                    <TableCell align="right">{position.vacant}</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>รวม{staffTypeDetail.staffType}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>{staffTypeDetail.approvedTotal}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>{staffTypeDetail.actualTotal}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>{staffTypeDetail.vacantTotal}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}

      <Box sx={{ mt: 2, p: 2, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Typography variant="h6" fontWeight="bold">รวม{faculty.FACULTYNAME}</Typography>
        <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 80, textAlign: 'right' }}>{faculty.facultyApprovedTotal}</Typography>
        <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 80, textAlign: 'right' }}>{faculty.facultyActualTotal}</Typography>
        <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 80, textAlign: 'right' }}>{faculty.facultyVacantTotal}</Typography>
      </Box>
    </AppCard>
  );
};

export default TableItem;