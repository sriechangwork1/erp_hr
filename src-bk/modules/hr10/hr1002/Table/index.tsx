// hr1002/Table/index.tsx
import React from 'react';
import {
  Box,
  Typography,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination
} from '@mui/material';
import AppCard from '@crema/components/AppCard';
import { StaffDetailByFaculty, Column } from '../types'; // Removed FacultySummaryRow
import TableItem from './TableItem';

interface TableProps {
  filteredStaff: StaffDetailByFaculty[]; // ข้อมูลบุคลากรที่ถูกกรองและแบ่งหน้าแล้ว
  totalFilteredCount: number; // จำนวนรายการทั้งหมดหลังจากกรอง
  // Removed facultySummary prop
  handleExportAllToPdf: () => void;
  handleExportAllToExcel: () => void;
  // Props สำหรับ Pagination
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// --- คอลัมน์สำหรับตารางรายชื่อบุคลากร ---
// ระบุประเภท StaffDetailByFaculty สำหรับ Column
const staffColumns: readonly Column<StaffDetailByFaculty | { 'ลำดับ': number }>[] = [
  { id: 'ลำดับ', label: 'ลำดับ', minWidth: 50, align: 'center' },
  { id: 'fullNameTh', label: 'ชื่อ-นามสกุล', minWidth: 200 },
  { id: 'gender', label: 'เพศ', minWidth: 70, align: 'center' },
  { id: 'positionName', label: 'ตำแหน่ง', minWidth: 150 },
  { id: 'facultyName', label: 'สังกัด', minWidth: 250 }, // เปลี่ยน label จาก 'หน่วยงาน' เป็น 'สังกัด'
  { id: 'staffTypeName', label: 'ประเภทบุคลากร', minWidth: 120 },
  { id: 'budgetName', label: 'ประเภทเงิน', minWidth: 100 },
  { id: 'salaryAmount', label: 'อัตราเงินเดือน', minWidth: 100, align: 'right' }, // เพิ่มอัตราเงินเดือน
  { id: 'dateOfAppointment', label: 'วันบรรจุ', minWidth: 100, align: 'center' }, // เพิ่มวันบรรจุ
  { id: 'employmentStatus', label: 'สถานภาพการทำงาน', minWidth: 120 }, // เพิ่มสถานภาพการทำงาน
  { id: 'educationLevel', label: 'ระดับการศึกษา', minWidth: 120 }, // เพิ่มระดับการศึกษา
  // { id: 'phoneNumber', label: 'เบอร์โทร', minWidth: 100 }, // เพิ่มถ้ามี
  // { id: 'email', label: 'อีเมล', minWidth: 150 }, // เพิ่มถ้ามี
];
// Removed summaryTableColumns as it's no longer used

const Table: React.FC<TableProps> = ({
  filteredStaff,
  totalFilteredCount,
  // Removed facultySummary prop
  handleExportAllToPdf,
  handleExportAllToExcel,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <Box>
      {/* Removed Summary Section by Faculty */}
      {/* <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          1. สรุปจำนวนบุคลากรแยกตามหน่วยงาน
        </Typography>
        <AppCard>
          <TableContainer component={Paper}>
            <MuiTable size="small" aria-label="staff summary by faculty table">
              <TableHead>
                <TableRow>
                  {summaryTableColumns.map((column) => (
                    <TableCell
                      key={column.id as string}
                      align={column.align as any}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {facultySummary.map((row) => (
                  <TableRow key={row.facultyName}>
                    <TableCell component="th" scope="row">
                      <Typography fontWeight={row.facultyName === 'รวมทั้งหมด' ? 'bold' : 'normal'}>
                        {row.facultyName}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{row.totalStaff}</TableCell>
                    <TableCell align="right">{row.academicStaffCount}</TableCell>
                    <TableCell align="right">{row.supportStaffCount}</TableCell>
                    <TableCell align="right">{row.maleCount}</TableCell>
                    <TableCell align="right">{row.femaleCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
        </AppCard>
      </Box> */}

      {/* Detailed Staff List Section */}
      <Box sx={{ mt: 4 }}> {/* Adjusted mt (margin-top) as summary is removed */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            รายชื่อบุคลากร
          </Typography>
          <Box>
            <Button variant="outlined" onClick={handleExportAllToPdf} sx={{ mr: 1 }}>
              ส่งออกทั้งหมด (PDF)
            </Button>
            <Button variant="outlined" onClick={handleExportAllToExcel}>
              ส่งออกทั้งหมด (Excel)
            </Button>
          </Box>
        </Box>

        {totalFilteredCount === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ ml: 2 }}>
            ไม่พบข้อมูลบุคลากรตามเงื่อนไขการค้นหา
          </Typography>
        ) : (
          <>
            <TableContainer component={Paper} elevation={1}>
              <MuiTable stickyHeader aria-label="staff list table">
                <TableHead>
                  <TableRow>
                    {staffColumns.map((column) => (
                      <TableCell
                        key={column.id as string} // Cast to string for key prop
                        align={column.align as any}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStaff.map((staff, index) => (
                    <TableItem
                      key={staff.id}
                      data={staff}
                      index={page * rowsPerPage + index}
                    />
                  ))}
                </TableBody>
              </MuiTable>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25, 50]}
              component="div"
              count={totalFilteredCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
              labelRowsPerPage="แสดงผลต่อหน้า:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} จาก ${count !== -1 ? count : `มากกว่า ${to}`}`
              }
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Table;