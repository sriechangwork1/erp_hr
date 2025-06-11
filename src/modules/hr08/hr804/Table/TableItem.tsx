//hr804/table/tableitem
import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import AppStatus from '@crema/components/AppStatus'; 
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { GrPowerCycle } from "react-icons/gr"; // Icon สำหรับ duration (การขยายระยะเวลา)
import { IoDocumentTextOutline } from "react-icons/io5"; // Icon สำหรับเลขที่คำสั่ง

const TableCellWrapper = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  whiteSpace: 'nowrap',
  '&:first-of-type': {
    paddingLeft: 20,
  },
  '&:last-of-type': {
    paddingRight: 20,
  },
}));

interface LeaveStudyExpandData { // เปลี่ยนชื่อ Interface เป็น LeaveStudyExpandData
  expand_id: number;
  staff_id: number;
  duration: string;
  start_date: string;
  end_date: string;
  order_number: string;
  order_date: string;
  salary_during_extension: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

type Props = {
  data: LeaveStudyExpandData; // เปลี่ยนเป็น LeaveStudyExpandData
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const TableItem = ({ data, onView, onEdit, onDelete }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200); 
    return () => clearTimeout(timer); 
  }, []);

  return (
    <TableRow hover key={data.expand_id} className="item-hover"> {/* เปลี่ยน key เป็น data.expand_id */}
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.expand_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={80} /> : data.staff_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : data.duration} <GrPowerCycle />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : data.start_date} <MdCalendarMonth />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : data.end_date} <MdCalendarMonth />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.order_number} <IoDocumentTextOutline />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : data.order_date} <MdCalendarMonth />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.salary_during_extension}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.create_at}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.update_at}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.officer_id} <MdOutlinePersonalInjury />
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton variant="circular" width={30} height={30} /> : <AppMenu onView={onView} onEdit={onEdit} onDelete={onDelete} />}
      </TableCellWrapper>
    </TableRow>
  );
};

export default TableItem;