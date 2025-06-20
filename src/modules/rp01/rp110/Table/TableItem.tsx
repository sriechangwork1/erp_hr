// src/pages/hr908/table/tableitem.tsx
// src/pages/hr915/table/tableitem.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { PositionSummary } from '../index'; // Import interface จากไฟล์หลัก

// =========================================================
// 1. กำหนด Interface สำหรับ Props
// =========================================================
interface PositionTableProps {
  summary: PositionSummary | null;
  type: 'academic' | 'support';
  orderedPositions: string[]; // รับลำดับการแสดงผลจาก parent
  messages: any; // รับ messages จาก useIntl ของ parent
}

// =========================================================
// 2. Client Component ย่อยสำหรับแสดงตาราง
//    ไม่จำเป็นต้องมี 'use client'; เพราะถูกเรียกใน Client Component อยู่แล้ว
// =========================================================
const PositionTable: React.FC<PositionTableProps> = ({ summary, type, orderedPositions, messages }) => {
  if (!summary || Object.keys(summary).length === 0) {
    return <Typography sx={{ p: 2 }}>{messages['common.noData'] as string}</Typography>;
  }

  // กรองและเรียงลำดับตำแหน่งตามที่กำหนด
  const sortedPositions = orderedPositions.filter(pos => summary[pos] !== undefined);
  // เพิ่มตำแหน่งอื่นๆ ที่อาจจะโผล่มาแต่ไม่อยู่ใน orderedPositions (และมีค่า)
  const otherPositions = Object.keys(summary).filter(pos => !orderedPositions.includes(pos)).sort();
  const finalSortedPositions = [...sortedPositions, ...otherPositions];

  let grandTotal = 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label={`${type} position list table`}>
        <TableHead>
          <TableRow>
            <TableCell>{messages['report.positionName'] as string}</TableCell>
            <TableCell align="center">{messages['common.totalStaff'] as string}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {finalSortedPositions.map((positionName) => {
            const count = summary[positionName];
            grandTotal += count;
            return (
              <TableRow key={positionName}>
                <TableCell component="th" scope="row">
                  {positionName}
                </TableCell>
                <TableCell align="center">{count}</TableCell>
              </TableRow>
            );
          })}
          {/* Total Row */}
          <TableRow sx={{ '& > *': { fontWeight: 'bold !important' } }}>
              <TableCell>{messages['common.grandTotal'] as string}</TableCell>
              <TableCell align="center">{grandTotal}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PositionTable;