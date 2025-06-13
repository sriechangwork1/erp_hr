//hr401/table/tableitem
import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import AppStatus from '@crema/components/AppStatus'; 
import { FaUser } from "react-icons/fa"; 
import { MdAssignment } from "react-icons/md"; // ไอคอนสำหรับสัญญา
import { TbCalendarTime } from "react-icons/tb"; // ไอคอนสำหรับวันที่


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
interface ContractData {
  contract_id: number;
  staff_id: number;
  contract_type: string;
  start_date: string;
  end_date: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

type Props = {
  data: ContractData; 
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
    <TableRow hover key={data.contract_id} className="item-hover"> 
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.contract_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={80} /> : data.staff_id} <FaUser />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.contract_type} <MdAssignment />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.start_date} <TbCalendarTime />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.end_date} <TbCalendarTime />
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