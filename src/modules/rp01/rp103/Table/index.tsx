// hr906/table/index.tsx
import React from 'react';
import { Box, Typography, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AppCard from '@crema/components/AppCard';
import { FacultyStaffingDetail, SummaryRow } from '../types';
import TableItem from './TableItem'; // Import tableitem
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface TableProps {
  filteredData: FacultyStaffingDetail[];
  summaryData: SummaryRow[];
  handleExportAllToPdf: () => void;
  handleExportAllToExcel: () => void;
}

const Table: React.FC<TableProps> = ({ filteredData, summaryData, handleExportAllToPdf, handleExportAllToExcel }) => {
  const totalRow = summaryData.find(row => row.staffType === 'รวมทั้งหมด');

  const summaryTableColumns = [
    { id: 'staffType', label: 'ประเภทบุคลากร' },
    { id: 'approved', label: 'อัตรากำลังที่ได้รับอนุมัติ (คน)', align: 'right' },
    { id: 'actual', label: 'อัตรากำลังที่มีอยู่จริง (คน)', align: 'right' },
    { id: 'vacant', label: 'อัตรากำลังว่าง (คน)', align: 'right' },
    { id: 'fillRate', label: 'สัดส่วนการบรรจุ (%)', align: 'right' },
  ];

  return (
    <Box>
      {/* Summary Section - Previously in SummaryCards.tsx */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          1. สรุปภาพรวมอัตรากำลัง
        </Typography>
        <AppCard sx={{ mb: 2 }}>
          {/* Summary Cards */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', mb: 2 }}>
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', backgroundColor: '#e3f2fd', minWidth: 150, m: 1 }}>
              <Typography variant="body2" color="text.secondary">อนุมัติทั้งหมด</Typography>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>{totalRow?.approved || 0} คน</Typography>
            </Paper>
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', backgroundColor: '#e8f5e9', minWidth: 150, m: 1 }}>
              <Typography variant="body2" color="text.secondary">มีอยู่จริงทั้งหมด</Typography>
              <Typography variant="h5" color="success.main" sx={{ fontWeight: 'bold' }}>{totalRow?.actual || 0} คน</Typography>
            </Paper>
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', backgroundColor: '#ffe0b2', minWidth: 150, m: 1 }}>
              <Typography variant="body2" color="text.secondary">ว่างทั้งหมด</Typography>
              <Typography variant="h5" color="warning.main" sx={{ fontWeight: 'bold' }}>{totalRow?.vacant || 0} คน</Typography>
            </Paper>
            <Paper elevation={0} sx={{ p: 2, textAlign: 'center', backgroundColor: '#f3e5f5', minWidth: 150, m: 1 }}>
              <Typography variant="body2" color="text.secondary">สัดส่วนการบรรจุ</Typography>
              <Typography variant="h5" color="secondary" sx={{ fontWeight: 'bold' }}>{totalRow?.fillRate?.toFixed(2) || 0}%</Typography>
            </Paper>
          </Box>
        </AppCard>

        {/* Overview Table */}
        <AppCard>
          <TableContainer component={Paper}>
            <MuiTable sx={{ minWidth: 650 }} aria-label="staffing overview table">
              <TableHead>
                <TableRow>
                  {summaryTableColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align as any} // Cast as any for align property
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {summaryData.map((row) => (
                  <TableRow key={row.staffType}>
                    <TableCell component="th" scope="row">
                      <Typography fontWeight={row.staffType === 'รวมทั้งหมด' ? 'bold' : 'normal'}>
                        {row.staffType}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{row.approved}</TableCell>
                    <TableCell align="right">{row.actual}</TableCell>
                    <TableCell align="right">{row.vacant}</TableCell>
                    <TableCell align="right">{row.fillRate.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
        </AppCard>
      </Box>

      {/* Faculty Details Section */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            2. อัตรากำลังแยกตามคณะ/สำนัก
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

        {filteredData.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ ml: 2 }}>
            ไม่พบข้อมูลอัตรากำลังที่ตรงกับเงื่อนไขการค้นหา
          </Typography>
        ) : (
          filteredData.map((faculty, index) => (
            <TableItem key={faculty.FACULTYID} faculty={faculty} itemIndex={index + 2} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default Table;