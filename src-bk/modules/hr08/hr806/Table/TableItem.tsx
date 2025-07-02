//hr806/table/tableitem
 import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import AppStatus from '@crema/components/AppStatus'; 
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa6"; // Icon สำหรับชื่อหลักสูตร
import { LuListTree } from "react-icons/lu"; // Icon สำหรับประเภทการฝึกอบรม
import { MdOutlineWork } from "react-icons/md"; // Icon สำหรับวิธีการพัฒนา
import { GiNotebook } from "react-icons/gi"; // Icon สำหรับสมรรถนะ
import { LiaUniversitySolid } from "react-icons/lia"; // Icon สำหรับสถาบัน
import { BsFileEarmarkText } from "react-icons/bs"; // Icon สำหรับเลขที่คำสั่ง
import { BiCalendarCheck } from "react-icons/bi"; // Icon สำหรับวันที่ออกคำสั่ง

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

interface TrainingData { // เปลี่ยนชื่อ Interface เป็น TrainingData
  training_id: number;
  staff_id: number;
  training_name: string;
  training_type: string;
  development_method: string;
  competency: string;
  start_date: string;
  end_date: string;
  institution: string;
  order_number: string;
  order_date: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

type Props = {
  data: TrainingData; // เปลี่ยนเป็น TrainingData
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
    <TableRow hover key={data.training_id} className="item-hover"> {/* เปลี่ยน key เป็น data.training_id */}
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.training_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={80} /> : data.staff_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.training_name} <FaBookOpen />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.training_type} <LuListTree />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.development_method} <MdOutlineWork />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : data.competency} <GiNotebook />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : data.start_date} <MdCalendarMonth />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : data.end_date} <MdCalendarMonth />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.institution} <LiaUniversitySolid />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.order_number} <BsFileEarmarkText />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.order_date} <BiCalendarCheck />
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