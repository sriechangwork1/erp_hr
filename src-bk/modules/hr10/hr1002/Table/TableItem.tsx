// hr1002/Table/TableItem.tsx
import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { StaffDetailByFaculty } from '../types';

interface TableItemProps {
  data: StaffDetailByFaculty;
  index: number;
}

const TableItem: React.FC<TableItemProps> = ({ data, index }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell>{data.fullNameTh}</TableCell>
      <TableCell align="center">{data.gender}</TableCell>
      <TableCell>{data.positionName}</TableCell>
      <TableCell>{data.facultyName}</TableCell> {/* แสดงสังกัด (หน่วยงาน) */}
      <TableCell>{data.staffTypeName}</TableCell>
      <TableCell>{data.budgetName}</TableCell>
      <TableCell align="right">{data.salaryAmount?.toLocaleString('th-TH')}</TableCell> {/* แสดงอัตราเงินเดือน พร้อม format */}
      <TableCell align="center">{data.dateOfAppointment}</TableCell> {/* แสดงวันบรรจุ */}
      <TableCell>{data.employmentStatus}</TableCell> {/* แสดงสถานภาพการทำงาน */}
      <TableCell>{data.educationLevel}</TableCell> {/* แสดงระดับการศึกษา */}
      {/* เพิ่มคอลัมน์อื่นๆ ถ้ามี เช่น เบอร์โทร อีเมล */}
      {/* {data.phoneNumber && <TableCell>{data.phoneNumber}</TableCell>} */}
      {/* {data.email && <TableCell>{data.email}</TableCell>} */}
    </TableRow>
  );
};

export default TableItem;