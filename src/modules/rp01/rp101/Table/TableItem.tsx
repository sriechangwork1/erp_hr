//hr901/table/tableitem
import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import AppStatus from '@crema/components/AppStatus'; 
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md"; // เพิ่ม icon สำหรับวันที่ประกาศ
import { GiAchievement } from "react-icons/gi"; // icon สำหรับชื่อเครื่องราชอิสริยาภรณ์
import { MdOutlineLocalOffer } from "react-icons/md"; // icon สำหรับประเภทเครื่องราชอิสริยาภรณ์
import { FaBookOpen } from "react-icons/fa"; // icon สำหรับเล่มที่/ตอนที่/หน้า


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

interface AwardData { // เปลี่ยนชื่อ Interface เป็น AwardData
  award_id: number;
  staff_id: number;
  award_name: string;
  award_date: string;
  award_type: string;
  announcement_details: string;
  announcement_date: string;
  gazette_volume: string;
  gazette_number: string;
  gazette_section: string;
  return_date?: string; 
  create_at: string;
  update_at: string;
  officer_id: number;
  award_status: string;
  [key: string]: any;
}

type Props = {
  data: AwardData; // เปลี่ยนเป็น AwardData
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
    <TableRow hover key={data.award_id} className="item-hover"> {/* เปลี่ยน key เป็น data.award_id */}
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.award_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.staff_id} <GiAchievement />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.award_name} <GiAchievement />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : data.award_date} <MdCalendarMonth />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : data.award_type} <MdOutlineLocalOffer />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.announcement_date} <MdOutlineDateRange />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : `${data.gazette_volume}`} <FaBookOpen />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : `${data.gazette_number}`} <FaBookOpen />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : `${data.gazette_section}`} <FaBookOpen />
      </TableCellWrapper>

      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.award_status}
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