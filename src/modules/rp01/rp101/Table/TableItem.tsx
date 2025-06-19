// rp101/table/tableitem.tsx
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import AppMenu from '@crema/components/AppMenu'; // ตรวจสอบ Path ให้ถูกต้อง
import { useIntl } from 'react-intl';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Skeleton from '@mui/material/Skeleton'; // ใช้สำหรับ loading state

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง ---
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

// อาจมี Component ชื่อ TableCellWrapper ถ้าคุณสร้างไว้ (จากโค้ดเก่า)
const TableCellWrapper = (props: any) => <TableCell {...props} />; // Mock component ถ้าไม่มีจริง

type Hr904TableItemProps = {
  data: FacultyData;
  onView: (data: FacultyData) => void;
  isLoading?: boolean; // จากโค้ดเก่า
};

const Hr904TableItem = ({ data, onView, isLoading }: Hr904TableItemProps) => {
  const { messages } = useIntl();

  if (isLoading) {
    return (
      <TableRow>
        <TableCellWrapper align="left"> <Skeleton width={80} /> </TableCellWrapper>
        <TableCellWrapper align="left"> <Skeleton width={150} /> </TableCellWrapper>
        <TableCellWrapper align="left"> <Skeleton width={120} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={100} /> </TableCellWrapper>
        <TableCellWrapper align="left"> <Skeleton width={80} /> </TableCellWrapper>
        <TableCellWrapper align="left"> <Skeleton width={100} /> </TableCellWrapper>
        <TableCellWrapper align="left"> <Skeleton width={120} /> </TableCellWrapper>
        <TableCellWrapper align="left"> <Skeleton width={80} /> </TableCellWrapper>
      </TableRow>
    );
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={data.FACULTYID}>
      <TableCellWrapper>{data.FACULTYID}</TableCellWrapper>
      <TableCellWrapper>{data.FACULTYNAME}</TableCellWrapper>
      <TableCellWrapper>{data.FACULTYNAMEENG || '-'}</TableCellWrapper> {/* แสดง '-' ถ้าเป็น null */}
      <TableCellWrapper align="center">{data.FACULTYTYPEID}</TableCellWrapper>
      <TableCellWrapper>{data.BUILDING || '-'}</TableCellWrapper>
      <TableCellWrapper>{data.PHONE || '-'}</TableCellWrapper>
      <TableCellWrapper>{data.EMAIL || '-'}</TableCellWrapper>
    </TableRow>
  );
};

export default Hr904TableItem;