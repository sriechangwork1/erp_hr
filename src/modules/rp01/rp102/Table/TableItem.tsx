// rp102/table/tableitem.tsx
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import AppMenu from '@crema/components/AppMenu'; // ตรวจสอบ Path ให้ถูกต้อง
import { useIntl } from 'react-intl';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Skeleton from '@mui/material/Skeleton';

// --- กำหนดประเภทข้อมูลสำหรับ FacultyData (จาก sys_faculty_202506192125.json) ---
interface FacultyData {
  FACULTYID: string;
  FACULTYNAME: string;
  FACULTYNAMEENG: string | null;
  FACULTYTYPEID: number;
  BUILDING: string | null;
  SUBDISTRICT: string | null;
  DISTRICT: string | null;
  PROVINCE: string | null;
  POSTCODE: number;
  PHONE: string | null;
  FAX: string | null;
  PHONEIN: string | null;
  EMAIL: string | null;
  FACSTATUS: string | null;
  REMARK: string | null;
  STAFFID: string | null;
  CREATEDATE: string | null;
  BUDGETTYPEID: string | null;
  GROUPID: string | null;
  REF_FAC: string | null;
}

// --- กำหนดประเภทข้อมูลสำหรับ StaffingData (จำลองขึ้นมา) ---
interface StaffingData {
  FACULTYID: string;
  staff_type_officer: number; // ข้าราชการ
  staff_type_university_employee: number; // พนักงานมหาวิทยาลัย
  staff_type_permanent_employee: number; // ลูกจ้างประจำ
  total_staff: number; // รวมทั้งหมด
}

// --- กำหนดประเภทข้อมูลสำหรับข้อมูลรวมที่จะแสดงในตาราง ---
interface CombinedStaffingData extends FacultyData, StaffingData {}

const TableCellWrapper = (props: any) => <TableCell {...props} />;

type Hr905TableItemProps = {
  data: CombinedStaffingData;
  onView: (data: CombinedStaffingData) => void;
  isLoading?: boolean;
};

const Hr905TableItem = ({ data, onView, isLoading }: Hr905TableItemProps) => {
  const { messages } = useIntl();

  if (isLoading) {
    return (
      <TableRow>
        <TableCellWrapper align="left"> <Skeleton width={80} /> </TableCellWrapper>
        <TableCellWrapper align="left"> <Skeleton width={200} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={50} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={50} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={50} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={70} /> </TableCellWrapper>
      </TableRow>
    );
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={data.FACULTYID}>
      <TableCellWrapper>{data.FACULTYID}</TableCellWrapper>
      <TableCellWrapper>{data.FACULTYNAME}</TableCellWrapper>
      <TableCellWrapper align="center">{data.staff_type_officer}</TableCellWrapper>
      <TableCellWrapper align="center">{data.staff_type_university_employee}</TableCellWrapper>
      <TableCellWrapper align="center">{data.staff_type_permanent_employee}</TableCellWrapper>
      <TableCellWrapper align="center">{data.total_staff}</TableCellWrapper>
    </TableRow>
  );
};

export default Hr905TableItem;