//hr502/table/tableitem
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลการเลื่อนขั้น ---
interface PromotionData { 
  promotion_id: number;
  staff_id: number;
  evaluation_round_id: number;
  promotion_date: string;
  amount_increased: number;
  result_increased: number;
  percentage_increased: number;
  new_salary: number;
  status_view: string;
  create_at: string; // เพิ่มเข้ามา
  update_at: string; // เพิ่มเข้ามา
  officer_id: number;
  [key: string]: any;
}

type Props = {
  data: PromotionData; 
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
    <TableRow hover key={data.promotion_id} className="item-hover"> 
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.promotion_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={80} /> : data.staff_id} <FaUser />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : data.evaluation_round_id}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.promotion_date} <TbCalendarStats />
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton width={100} /> : data.amount_increased?.toFixed(2)} <TbStairsUp />
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton width={100} /> : data.result_increased?.toFixed(2)}
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton width={100} /> : data.percentage_increased?.toFixed(2)}
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton width={120} /> : data.new_salary?.toFixed(2)}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : <AppStatus status={data.status_view} />}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={150} /> : data.create_at} {/* เพิ่ม create_at */}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={150} /> : data.update_at} {/* เพิ่ม update_at */}
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