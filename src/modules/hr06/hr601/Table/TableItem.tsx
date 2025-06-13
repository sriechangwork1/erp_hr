//hr601/table/tableitem
import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import AppStatus from '@crema/components/AppStatus'; 
import { MdOutlineWork } from "react-icons/md"; // สำหรับตำแหน่ง
import { FaUserTie } from "react-icons/fa"; // สำหรับชื่อผู้ดำรงตำแหน่ง
import { FaFileSignature } from "react-icons/fa"; // สำหรับเลขที่คำสั่ง (ใช้ตัวนี้)

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

interface ManagementPositionData { 
  position_id: number;
  staff_id: number;
  admin_position_id: number; 
  position_holder_name: string;
  acting_position_name?: string; 
  position_allowance: number;
  position_status: string;
  start_date: string;
  end_date?: string; 
  appointment_order_number: string;
  appointment_order_date: string;
  appointment_order_file: string;
  dismissal_order_number?: string; 
  dismissal_order_date?: string; 
  dismissal_order_file?: string; 
  create_at: string;
  update_at: string;
  officer_id: number;
  faculty_id?: number; 
  department_id?: number; 
  program_id?: number; 
  [key: string]: any;
}

type Props = {
  data: ManagementPositionData; 
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
    <TableRow hover key={data.position_id} className="item-hover">
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.position_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={80} /> : data.staff_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={200} /> : data.position_holder_name} <FaUserTie />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : (data.acting_position_name || '-')} <MdOutlineWork />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : <AppStatus status={data.position_status} />}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.start_date}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : (data.end_date || '-')}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.appointment_order_number} <FaFileSignature />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : (data.dismissal_order_number || '-')} <FaFileSignature />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.create_at}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.update_at}
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