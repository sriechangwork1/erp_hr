//hr301/table/tableitem
import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import AppStatus from '@crema/components/AppStatus'; 
import { FaUser } from "react-icons/fa"; 
import { TbStairsUp } from "react-icons/tb"; 
import { TbCalendarStats } from "react-icons/tb"; 
import { MdOutlineNumbers } from "react-icons/md"; // ไอคอนใหม่
import { GiPayMoney } from "react-icons/gi"; // ไอคอนใหม่
import { TbCoin } from "react-icons/tb"; // ไอคอนใหม่
import { BsBuildingsFill } from "react-icons/bs"; // ไอคอนใหม่
import { FaUserGraduate } from "react-icons/fa"; // ไอคอนใหม่


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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง ---
interface ManpowerFrameworkData {
  manpower_framework_id: number;
  staff_id?: number; 
  staff_type_id: number; 
  position_type_id: number; 
  position_number: string;
  position_name: string;
  salary_account: string;
  salary: number; 
  received_salary?: number; 
  employee_level?: string; 
  base_salary: number; 
  payment_type: string; 
  staff_status: string; 
  create_at: string;
  update_at: string;
  officer_id: number;
  job_title_id?: number; 
  work_line_id?: number; 
  position_level_id?: number; 
  faculty_id?: number;
  department_id?: number;
  program_id?: number;
  academic_position_id?: number; 
  support_position_id?: number; 
  admin_position_id?: number; 
  [key: string]: any;
}

type Props = {
  data: ManpowerFrameworkData; 
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
    <TableRow hover key={data.manpower_framework_id} className="item-hover"> 
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={100} /> : data.manpower_framework_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={80} /> : (data.staff_id || '-')} <FaUser />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.staff_type_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.position_type_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : data.position_number} <MdOutlineNumbers />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.position_name}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.salary_account}
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton width={100} /> : data.salary?.toFixed(2)} <GiPayMoney />
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton width={100} /> : (data.received_salary !== undefined ? data.received_salary?.toFixed(2) : '-')}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : (data.employee_level || '-')}
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton width={120} /> : data.base_salary?.toFixed(2)} <TbCoin />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : data.payment_type}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={80} /> : <AppStatus status={data.staff_status} />}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : (data.job_title_id || '-')}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : (data.work_line_id || '-')}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : (data.position_level_id || '-')}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={80} /> : (data.faculty_id || '-')} <BsBuildingsFill />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : (data.department_id || '-')}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : (data.program_id || '-')} <FaUserGraduate />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : (data.academic_position_id || '-')}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : (data.support_position_id || '-')}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : (data.admin_position_id || '-')}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={150} /> : data.create_at} 
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={150} /> : data.update_at} 
      </TableCellWrapper>
            <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={80} /> : data.officer_id}
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton variant="circular" width={30} height={30} /> : <AppMenu onView={onView} onEdit={onEdit} onDelete={onDelete} />}
      </TableCellWrapper>
    </TableRow>
  );
};

export default TableItem;
