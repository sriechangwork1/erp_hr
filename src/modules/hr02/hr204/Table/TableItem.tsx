// hr204/table/tableitem/index.tsx
import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import { MdOutlineAttachMoney, MdCalendarToday, MdPersonOutline } from "react-icons/md"; // Icons for salary, date, and person
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Icon for salary account

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

// กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง (จาก Salary model)
interface SalaryData {
  salary_id: number;
  staff_id?: number;
  salary_amount?: number;
  salary_account?: string;
  salary_detail?: string;
  position_id_academic?: number;
  academic_allowance?: number;
  position_id_management?: number;
  management_allowance?: number;
  effective_date?: string;
  end_date?: string;
  create_at?: string;
  update_at?: string;
  officer_id?: number;
  [key: string]: any;
}

type Props = {
  data: SalaryData;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

  const staffDetail = [
  {staff_id:1001,prefixname_id:'นาย',first_name_th:'สมชาย',last_name_th:'วงศ์สวัสดิ์'},
  {staff_id:1002,prefixname_id:'นางสาว',first_name_th:'สมหญิง',last_name_th:'ศรีสุข'},
  {staff_id:1003,prefixname_id:'นาย',first_name_th:'นายเทสดี',last_name_th:'มีรวย'},
  {staff_id:1004,prefixname_id:'นางสาว',first_name_th:'นงลักษณ์',last_name_th:'แก้วมณี'},
  {staff_id:1005,prefixname_id:'นาย',first_name_th:'สุเทพ',last_name_th:'อินทร์พรหม'},
  {staff_id:1006,prefixname_id:'นาย',first_name_th:'สุดใจ',last_name_th:'อิ่มเอม'},
  {staff_id:1007,prefixname_id:'นาย',first_name_th:'สุดสาคร',last_name_th:'ใจดี'},
  {staff_id:1008,prefixname_id:'นางสาว',first_name_th:'สีดา',last_name_th:'สีใจ'},
  {staff_id:1009,prefixname_id:'นาย',first_name_th:'กฤกนก',last_name_th:'กกกนิส'},
  {staff_id:1010,prefixname_id:'นาย',first_name_th:'สุกสา',last_name_th:'สุพล'},
  {staff_id:1011,prefixname_id:'นางสาว',first_name_th:'สมใจ',last_name_th:'ใสจม'},
  {staff_id:1012,prefixname_id:'นางสาว',first_name_th:'หฤทัย',last_name_th:'ใจตรง'}
];

const TableItem = ({ data, onView, onEdit, onDelete }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);



  return (
    <TableRow hover key={data.salary_id} className="item-hover">
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.salary_id}
      </TableCellWrapper>
  <TableCellWrapper align="left">
      {isLoading ? (
        <Skeleton width={150} />
      ) : (
        (() => {
          const staff = staffDetail.find(s => s.staff_id === data.staff_id);
          return staff 
            ? `${staff.prefixname_id} ${staff.first_name_th} ${staff.last_name_th}`
            : `ไม่พบข้อมูลพนักงาน (ID: ${data.staff_id})`;
        })()
      )}
    </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.salary_amount?.toFixed(2)} <MdOutlineAttachMoney />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.salary_account} <AccountBalanceWalletIcon fontSize="small" />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.salary_detail}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={180} /> : data.academic_allowance?.toFixed(2) || '-'}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={180} /> : data.management_allowance?.toFixed(2) || '-'}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.effective_date} <MdCalendarToday />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.end_date || '-'} <MdCalendarToday />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.officer_id} <MdPersonOutline />
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton variant="circular" width={30} height={30} /> : <AppMenu onView={onView} onEdit={onEdit} onDelete={onDelete} />}
      </TableCellWrapper>
    </TableRow>
  );
};

export default TableItem;