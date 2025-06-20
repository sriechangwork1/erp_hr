// src/pages/hr908/table/tableitem.tsx
import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { StaffDetailByFaculty } from '../types'; // Import from hr908's types

interface TableItemProps {
  data: StaffDetailByFaculty;
  index: number;
}

const TableItem: React.FC<TableItemProps> = ({ data, index }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell>{data.facultyName}</TableCell>
      <TableCell>{data.staffId}</TableCell>
      <TableCell>{data.fullNameTh}</TableCell>
      <TableCell align="center">{data.gender}</TableCell>
      <TableCell>{data.positionName}</TableCell>
      <TableCell>{data.staffTypeName}</TableCell>
      <TableCell>{data.budgetName}</TableCell>
      {/* เพิ่มคอลัมน์อื่นๆ ถ้ามี เช่น วันที่บรรจุ เบอร์โทร อีเมล */}
      {/* {data.dateOfAppointment && <TableCell>{data.dateOfAppointment}</TableCell>} */}
      {/* {data.phoneNumber && <TableCell>{data.phoneNumber}</TableCell>} */}
      {/* {data.email && <TableCell>{data.email}</TableCell>} */}
    </TableRow>
  );
};

export default TableItem;