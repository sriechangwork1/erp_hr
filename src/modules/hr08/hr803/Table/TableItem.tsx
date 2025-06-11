//hr803/table/tableitem
import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import AppStatus from '@crema/components/AppStatus'; 
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { LiaGraduationCapSolid } from "react-icons/lia"; // Icon สำหรับระดับการศึกษา
import { LuFileClock } from "react-icons/lu"; // Icon สำหรับปีการศึกษา
import { MdOutlineNumbers } from "react-icons/md"; // Icon สำหรับภาคเรียน
import { BsGraphUp } from "react-icons/bs"; // Icon สำหรับ GPA

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

interface LeaveStudyResultsData { // เปลี่ยนชื่อ Interface เป็น LeaveStudyResultsData
  result_id: number;
  staff_id: number;
  education_level: string;
  report_date: string;
  academic_year: string;
  semester: string;
  gpa: number;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

type Props = {
  data: LeaveStudyResultsData; // เปลี่ยนเป็น LeaveStudyResultsData
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
    <TableRow hover key={data.result_id} className="item-hover"> {/* เปลี่ยน key เป็น data.result_id */}
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.result_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={80} /> : data.staff_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.education_level} <LiaGraduationCapSolid />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : data.report_date} <MdCalendarMonth />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : data.academic_year} <LuFileClock />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={80} /> : data.semester} <MdOutlineNumbers />
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton width={80} /> : data.gpa.toFixed(2)} <BsGraphUp />
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