//hr903/table/tableitem
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import AppMenu from '@crema/components/AppMenu'; // ตรวจสอบ Path ให้ถูกต้อง
import { useIntl } from 'react-intl';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Skeleton from '@mui/material/Skeleton'; // ใช้สำหรับ loading state

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลเครื่องราชอิสริยาภรณ์ ---
// ควรดึงมาจากไฟล์กลาง หรือนิยามซ้ำ
interface AwardData {
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

// อาจมี Component ชื่อ TableCellWrapper ถ้าคุณสร้างไว้ (จากโค้ดเก่า)
const TableCellWrapper = (props: any) => <TableCell {...props} />; // Mock component ถ้าไม่มีจริง

type Hr903TableItemProps = {
  data: AwardData;
  onView: (data: AwardData) => void;
  isLoading?: boolean; // จากโค้ดเก่า
};

const Hr903TableItem = ({ data, onView, isLoading }: Hr903TableItemProps) => {
  const { messages } = useIntl();

  if (isLoading) {
    return (
      <TableRow>
        {/* ใส่ Skeleton สำหรับแต่ละ Cell ที่คุณต้องการ (ต้องตรงกับจำนวนคอลัมน์) */}
        <TableCellWrapper align="left"> <Skeleton width={50} /> </TableCellWrapper>
        <TableCellWrapper align="left"> <Skeleton width={80} /> </TableCellWrapper> {/* สำหรับ staff_id */}
        <TableCellWrapper align="left"> <Skeleton width={150} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={100} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={100} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={100} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={70} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={70} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={70} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={80} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={100} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={100} /> </TableCellWrapper>
        <TableCellWrapper align="center"> <Skeleton width={80} /> </TableCellWrapper>
        <TableCellWrapper align="right"> <Skeleton variant="circular" width={36} height={36} /> </TableCellWrapper>
      </TableRow>
    );
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={data.award_id}>
      <TableCellWrapper>{data.award_id}</TableCellWrapper>
      <TableCellWrapper>{data.staff_id}</TableCellWrapper> {/* แสดง staff_id */}
      <TableCellWrapper>{data.award_name}</TableCellWrapper>
      <TableCellWrapper align="center">{data.award_date}</TableCellWrapper>
      <TableCellWrapper align="center">{data.award_type}</TableCellWrapper>
      <TableCellWrapper align="center">{data.announcement_date}</TableCellWrapper>
      <TableCellWrapper align="center">{data.gazette_volume}</TableCellWrapper>
      <TableCellWrapper align="center">{data.gazette_number}</TableCellWrapper>
      <TableCellWrapper align="center">{data.gazette_section}</TableCellWrapper>
      <TableCellWrapper align="center">{data.award_status}</TableCellWrapper>
     {/* <TableCellWrapper align="center">{data.create_at}</TableCellWrapper>
      <TableCellWrapper align="center">{data.update_at}</TableCellWrapper>
      <TableCellWrapper align="center">{data.officer_id}</TableCellWrapper>

      <TableCellWrapper align="right">
        <AppMenu
          menuItems={[
            {
              icon: <VisibilityOutlinedIcon />,
              id: 1,
              title: messages['common.view'] as string,
              action: () => onView(data), // ปุ่ม View เท่านั้น
            },
            // ลบรายการสำหรับ Edit และ Delete ออกไป
          ]}
        />
      </TableCellWrapper> */}
    </TableRow>
  );
};

export default Hr903TableItem;