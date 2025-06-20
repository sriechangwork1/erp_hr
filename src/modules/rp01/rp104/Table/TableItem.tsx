// rp104/table/tableitem.tsx
import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { RetiredStaffDetail } from '../types';

interface TableItemProps {
  data: RetiredStaffDetail;
  index: number;
}

const TableItem: React.FC<TableItemProps> = ({ data, index }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{index + 1}</TableCell> {/* ลำดับ */}
      <TableCell align="center">{data.retirementYear}</TableCell>
      <TableCell>{data.staffId}</TableCell>
      <TableCell>{data.fullNameTh}</TableCell>
      <TableCell align="center">{data.gender}</TableCell>
      <TableCell>{data.positionName}</TableCell>
      <TableCell>{data.staffTypeName}</TableCell>
      <TableCell>{data.budgetName}</TableCell>
      <TableCell>{data.facultyName}</TableCell>
    </TableRow>
  );
};

export default TableItem;