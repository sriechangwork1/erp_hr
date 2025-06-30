// hr1003/TableItem.tsx
import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { StaffDetailByType } from '../types';

interface TableItemProps {
  data: StaffDetailByType;
  index: number;
}

const TableItem: React.FC<TableItemProps> = ({ data, index }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell>{data.staffTypeName}</TableCell>
      <TableCell>{data.jobCategoryName}</TableCell> {/* เพิ่มเข้ามา */}
      <TableCell>{data.fullNameTh}</TableCell>
      <TableCell>{data.positionName}</TableCell>
      <TableCell>{data.facultyName}</TableCell>
      <TableCell align="center">{data.gender}</TableCell>
      {data.dateOfAppointment && (
        <TableCell align="center">{data.dateOfAppointment}</TableCell>
      )}
      {/* {data.phoneNumber && <TableCell>{data.phoneNumber}</TableCell>} */}
      {/* {data.email && <TableCell>{data.email}</TableCell>} */}
    </TableRow>
  );
};

export default TableItem;