// rp107/table/index.tsx
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
} from '@mui/material';
import AppCard from '@crema/components/AppCard';
import { PositionByFacultySummaryRow, Column } from '../types';

interface TableProps {
  summaryData: PositionByFacultySummaryRow[]; // ข้อมูลสรุป
  handleExportAllToPdf: () => void;
  handleExportAllToExcel: () => void;
}

// --- คอลัมน์สำหรับตารางสรุปอัตรากำลังตามตำแหน่งตามหน่วยงาน ---
const summaryTableColumns: readonly Column<PositionByFacultySummaryRow>[] = [
  { id: 'facultyName', label: 'หน่วยงาน / ตำแหน่ง', minWidth: 250 },
  { id: 'positionName', label: '', minWidth: 150 }, // This column will be dynamic content
  { id: 'totalStaff', label: 'รวม (คน)', minWidth: 80, align: 'right' },
  { id: 'maleCount', label: 'ชาย', minWidth: 50, align: 'right' },
  { id: 'femaleCount', label: 'หญิง', minWidth: 50, align: 'right' },
];


const Table: React.FC<TableProps> = ({
  summaryData,
  handleExportAllToPdf,
  handleExportAllToExcel,
}) => {
  return (
    <Box>
      {/* Summary Section by Position and Faculty */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          1. สรุปอัตรากำลังตามตำแหน่งตามหน่วยงาน
        </Typography>
        <AppCard>
          <TableContainer component={Paper}>
            <MuiTable size="small" aria-label="staff position by faculty summary table">
              <TableHead>
                <TableRow>
                  {summaryTableColumns.map((column, index) => (
                    <TableCell
                      key={column.id as string || `col-${index}`}
                      align={column.align as any}
                      style={{ minWidth: column.minWidth }}
                      colSpan={column.id === 'facultyName' ? 2 : 1} // Faculty Name spans 2 columns
                    >
                      {column.id === 'positionName' ? '' : column.label} {/* Don't show label for dynamic positionName column header */}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {summaryData.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={summaryTableColumns.length + 1} align="center" width={"100%"}>
                            ไม่พบข้อมูลบุคลากรตามเงื่อนไขการค้นหา
                        </TableCell>
                    </TableRow>
                ) : (
                    summaryData.map((row, index) => (
                    <TableRow
                      key={row.groupKey}
                      sx={{
                        fontWeight: row.type === 'faculty' || row.type === 'grand_total' ? 'bold' : 'normal',
                        backgroundColor: row.type === 'faculty' || row.type === 'grand_total' ? '#f5f5f5' : 'inherit',
                      }}
                    >
                      {row.type === 'faculty' || row.type === 'grand_total' ? (
                        <>
                          <TableCell
                            colSpan={2}
                            sx={{ fontWeight: 'inherit', borderBottom: row.type === 'grand_total' ? 'double' : '1px solid #e0e0e0' }}
                          >
                            {row.facultyName}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell></TableCell> {/* Empty cell for alignment under faculty header */}
                          <TableCell>{row.positionName}</TableCell>
                        </>
                      )}
                      <TableCell align="right" sx={{ fontWeight: 'inherit', borderBottom: row.type === 'grand_total' ? 'double' : '1px solid #e0e0e0' }}>
                          {row.totalStaff}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'inherit', borderBottom: row.type === 'grand_total' ? 'double' : '1px solid #e0e0e0' }}>
                          {row.maleCount}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'inherit', borderBottom: row.type === 'grand_total' ? 'double' : '1px solid #e0e0e0' }}>
                          {row.femaleCount}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </MuiTable>
          </TableContainer>
        </AppCard>
      </Box>

      {/* Export Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button variant="outlined" onClick={handleExportAllToPdf} sx={{ mr: 1 }}>
            ส่งออก (PDF)
          </Button>
          <Button variant="outlined" onClick={handleExportAllToExcel}>
            ส่งออก (Excel)
          </Button>
      </Box>
    </Box>
  );
};

export default Table;