//hr207/table/tableitem.tsx
import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import { MdCalendarToday, MdPersonOutline, MdFamilyRestroom, MdPhone, MdHome } from "react-icons/md"; // Icons for family, phone, home

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

// กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง (จาก Family model)
interface FamilyData {
  family_id: number;
  staff_id?: number;
  relationship?: string;
  full_name?: string;
  date_of_birth?: string;
  occupation?: string;
  fam_tel?: string;
  fam_address?: string;
  create_at?: string;
  update_at?: string;
  officer_id?: number;
  [key: string]: any;
}

// ต้อง import Column interface มาจาก hr207/table/index.tsx
// หรือกำหนดซ้ำ (แต่ไม่แนะนำ)
interface Column {
  id: keyof FamilyData | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  sortable?: boolean;
}

type Props = {
  data: FamilyData;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  columns: readonly Column[]; // เพิ่ม columns prop
};

const TableItem = ({ data, onView, onEdit, onDelete, columns }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TableRow hover key={data.family_id} className="item-hover">
      {columns.map((column) => {
        // กรอง column 'actions' ออก เพราะเราจะ render AppMenu แยกต่างหาก
        if (column.id === 'actions') return null;

        const value = data[column.id as keyof FamilyData];
        let displayValue: React.ReactNode;

        if (isLoading) {
          displayValue = <Skeleton width={column.minWidth ? column.minWidth * 0.8 : 80} />;
        } else {
          // ใช้ format function ที่กำหนดใน Column หรือแสดงค่าปกติ
          displayValue = column.format ? column.format(value) : value;

          // เพิ่ม Icon ตาม column.id (ปรับตามความเหมาะสม)
          if (column.id === 'staff_id') displayValue = <>{displayValue} <MdPersonOutline /></>;
          if (column.id === 'relationship') displayValue = <>{displayValue} <MdFamilyRestroom /></>;
          if (column.id === 'date_of_birth') displayValue = <>{displayValue} <MdCalendarToday /></>;
          if (column.id === 'fam_tel') displayValue = <>{displayValue} <MdPhone /></>;
          if (column.id === 'fam_address') displayValue = <>{displayValue} <MdHome /></>;
          if (column.id === 'officer_id') displayValue = <>{displayValue} <MdPersonOutline /></>;
        }

        return (
          <TableCellWrapper key={column.id as string} align={column.align || 'left'}>
            {displayValue}
          </TableCellWrapper>
        );
      })}

      <TableCellWrapper align="right">
        {isLoading ? <Skeleton variant="circular" width={30} height={30} /> : <AppMenu onView={onView} onEdit={onEdit} onDelete={onDelete} />}
      </TableCellWrapper>
    </TableRow>
  );
};

export default TableItem;