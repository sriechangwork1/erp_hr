// rp104/table/index.tsx
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
  TablePagination // Import TablePagination
} from '@mui/material';
import AppCard from '@crema/components/AppCard';
import { RetiredStaffDetail, RetirementSummaryRow, Column } from '../types';
import TableItem from './TableItem';

interface TableProps {
  filteredRetiredStaff: RetiredStaffDetail[]; // This will be the already paginated data
  totalFilteredCount: number; // New prop: total count of filtered items before pagination
  retirementSummary: RetirementSummaryRow[];
  handleExportAllToPdf: () => void;
  handleExportAllToExcel: () => void;
  // Pagination props
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const retiredStaffColumns: readonly Column[] = [
  { id: 'ลำดับ', label: 'ลำดับ', minWidth: 50, align: 'center' },
  { id: 'retirementYear', label: 'ปีที่เกษียณ', minWidth: 80, align: 'center' },
  { id: 'staffId', label: 'รหัสบุคลากร', minWidth: 100 },
  { id: 'fullNameTh', label: 'ชื่อ-นามสกุล', minWidth: 200 },
  { id: 'gender', label: 'เพศ', minWidth: 70, align: 'center' },
  { id: 'positionName', label: 'ตำแหน่ง', minWidth: 150 },
  { id: 'staffTypeName', label: 'ประเภทบุคลากร', minWidth: 120 },
  { id: 'budgetName', label: 'ประเภทเงิน', minWidth: 100 },
  { id: 'facultyName', label: 'หน่วยงาน', minWidth: 250 },
];

const summaryTableColumns: readonly Column[] = [
  { id: 'category', label: 'ประเภท', minWidth: 150 },
  { id: 'totalRetired', label: 'จำนวน (คน)', minWidth: 80, align: 'right' },
];

const Table: React.FC<TableProps> = ({
  filteredRetiredStaff,
  totalFilteredCount, // New prop
  retirementSummary,
  handleExportAllToPdf,
  handleExportAllToExcel,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <Box>
      {/* Summary Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          1. สรุปจำนวนบุคลากรที่เกษียณอายุ
        </Typography>
        <AppCard>
          <TableContainer component={Paper}>
            <MuiTable size="small" aria-label="retirement summary table">
              <TableHead>
                <TableRow>
                  {summaryTableColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align as any}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {retirementSummary.map((row) => (
                  <TableRow key={row.category}>
                    <TableCell component="th" scope="row">
                      <Typography fontWeight={row.category === 'รวมทั้งหมด' ? 'bold' : 'normal'}>
                        {row.category}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{row.totalRetired}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
        </AppCard>
      </Box>

      {/* Detailed Retired Staff List */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            2. รายชื่อบุคลากรที่เกษียณอายุ
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

        {/* Adjusted condition to check totalFilteredCount for empty state */}
        {totalFilteredCount === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ ml: 2 }}>
            ไม่พบข้อมูลบุคลากรที่เกษียณอายุตามเงื่อนไขการค้นหา
          </Typography>
        ) : (
          <>
            <TableContainer component={Paper} elevation={1}>
              <MuiTable stickyHeader aria-label="retired staff table">
                <TableHead>
                  <TableRow>
                    {retiredStaffColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align as any}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRetiredStaff.map((staff, index) => (
                    <TableItem
                      key={staff.id}
                      data={staff}
                      index={page * rowsPerPage + index} // Corrected index for pagination
                    />
                  ))}
                </TableBody>
              </MuiTable>
            </TableContainer>
            {/* TablePagination Component */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25, 50]} // Options for rows per page
              component="div"
              count={totalFilteredCount} // Total count of filtered items
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