//hr109/table/tableitem.tsx
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlinePersonalInjury } from "react-icons/md";

// นำเข้า Data interface จากไฟล์หลัก
import { Data } from '../index'; // ตรวจสอบเส้นทางให้ถูกต้อง

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

type Props = {
  data: Data; // ใช้ Data interface ที่นำเข้า
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isLoading: boolean; // เพิ่ม prop สำหรับบอกสถานะการโหลด
};

const TableItem = ({ data, onView, onEdit, onDelete, isLoading }: Props) => {
  // ไม่จำเป็นต้องมี useState และ useEffect สำหรับ isLoading ใน TableItem แล้ว
  // เพราะสถานะ isLoading จะถูกส่งมาจากคอมโพเนนต์แม่ (Table) โดยตรง

  return (
    <TableRow hover key={data.id} className="item-hover">
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.admin_position_name}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.position_abbreviation}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.position_term}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : (
          <>
            {data.create_at} <MdCalendarMonth />
          </>
        )}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : (
          <>
            {data.officer_id} <MdOutlinePersonalInjury />
          </>
        )}
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton variant="circular" width={30} height={30} /> : <AppMenu onView={onView} onEdit={onEdit} onDelete={onDelete} />}
      </TableCellWrapper>
    </TableRow>
  );
};

export default TableItem;
