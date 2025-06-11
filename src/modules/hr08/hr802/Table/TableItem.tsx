//hr802/table/tableitem
import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import AppStatus from '@crema/components/AppStatus'; 
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa"; // Icon สำหรับจำนวนเงิน
import { FaFileInvoiceDollar } from "react-icons/fa6"; // Icon สำหรับเอกสาร
import { IoCashOutline } from "react-icons/io5"; // Icon สำหรับประเภทการเบิก

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

interface LeaveEducationWithdrawData { // เปลี่ยนชื่อ Interface เป็น LeaveEducationWithdrawData
  withdraw_id: number;
  staff_id: number;
  withdraw_type: string;
  document_number: string;
  withdraw_date: string;
  amount: number;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

type Props = {
  data: LeaveEducationWithdrawData; // เปลี่ยนเป็น LeaveEducationWithdrawData
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
    <TableRow hover key={data.withdraw_id} className="item-hover"> {/* เปลี่ยน key เป็น data.withdraw_id */}
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.withdraw_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={80} /> : data.staff_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.withdraw_type} <IoCashOutline />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.document_number} <FaFileInvoiceDollar />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : data.withdraw_date} <MdCalendarMonth />
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton width={100} /> : data.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} <FaMoneyBillWave />
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