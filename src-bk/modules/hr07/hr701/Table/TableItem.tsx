//hr701/table/tableitem
import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import AppStatus from '@crema/components/AppStatus'; 
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md"; // สำหรับ work_name
import { FaFileAlt } from "react-icons/fa"; // สำหรับ work_file
import { BsFillAwardFill,BsFileEarmarkText } from "react-icons/bs"; // สำหรับ academic_position_id
import { GiNotebook, } from "react-icons/gi"; // สำหรับ work_type
import { FaRegHandshake } from "react-icons/fa"; // สำหรับ appointment_method
import { GrCatalogOption } from "react-icons/gr"; // สำหรับ position_details
import { MdOutlineDateRange } from "react-icons/md"; // สำหรับ request_acad_at
import { FaGraduationCap } from "react-icons/fa"; // สำหรับ request_level
import { FaChalkboardTeacher } from "react-icons/fa"; // สำหรับ request_major
import { FaSitemap } from "react-icons/fa"; // สำหรับ request_submajor
import { GrValidate } from "react-icons/gr"; // สำหรับ consideration_result
import { MdLocationOn } from "react-icons/md"; // สำหรับ meeting_place
import { MdAttachMoney } from "react-icons/md"; // สำหรับ position_salary
import { BiSolidFilePdf } from "react-icons/bi"; // สำหรับ appointment_file

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

interface RequestAcademicPositionData { // เปลี่ยนชื่อ Interface เป็น RequestAcademicPositionData
  request_acad_id: number;
  staff_id: number;
  academic_position_id: number; 
  work_name: string;
  work_file: string;
  work_type: string;
  appointment_method: string;
  council_meeting: string;
  position_details: string;
  request_acad_at: string;
  request_level: string;
  request_major: string;
  request_submajor?: string; 
  isced_code?: string; 
  consideration_result: string;
  meeting_place: string;
  meeting_at: string;
  appointment_order?: string; 
  signature_date?: string; 
  effective_date?: string; 
  position_salary?: number; 
  appointment_file?: string; 
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

type Props = {
  data: RequestAcademicPositionData; // เปลี่ยนเป็น RequestAcademicPositionData
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
    <TableRow hover key={data.request_acad_id} className="item-hover"> {/* เปลี่ยน key เป็น data.request_acad_id */}
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.request_acad_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={80} /> : data.staff_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.academic_position_id} <BsFillAwardFill />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.work_name} <MdWorkOutline />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : data.work_type} <GiNotebook />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={100} /> : data.request_level} <FaGraduationCap />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.request_major} <FaChalkboardTeacher />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={120} /> : data.consideration_result} <GrValidate />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.meeting_at} <MdCalendarMonth />
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