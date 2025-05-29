// hr211/table/tableitem/index.tsx
import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import { MdOutlineSchool, MdPersonOutline, MdCalendarToday, MdCode, MdSubject, MdEmojiEvents } from "react-icons/md"; // Icons for school, person, calendar, code, subject, events

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

// กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง (จาก AcademicExpertise model)
interface AcademicExpertiseData {
  expertise_id: number;
  staff_id?: number;
  expertise_name?: string;
  isced_code?: string;
  subject_code?: string;
  teaching_level?: string;
  create_at?: string;
  update_at?: string;
  officer_id?: number;
  [key: string]: any;
}

// ต้อง import Column interface มาจาก hr211/table/index.tsx
// หรือกำหนดซ้ำ (แต่ไม่แนะนำ)
interface Column {
  id: keyof AcademicExpertiseData | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  sortable?: boolean;
}

type Props = {
  data: AcademicExpertiseData;
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

  const getIconForColumn = (columnId: keyof AcademicExpertiseData) => {
    switch (columnId) {
      case 'expertise_id':
      case 'expertise_name':
        return <MdOutlineSchool style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'staff_id':
      case 'officer_id':
        return <MdPersonOutline style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'isced_code':
        return <MdCode style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'subject_code':
        return <MdSubject style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'teaching_level':
        return <MdEmojiEvents style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'create_at':
      case 'update_at':
        return <MdCalendarToday style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      default:
        return null;
    }
  };

  return (
    <TableRow hover key={data.expertise_id} className="item-hover">
      {columns.map((column) => {
        // กรอง column 'actions' ออก เพราะเราจะ render AppMenu แยกต่างหาก
        if (column.id === 'actions') return null;

        const value = data[column.id as keyof AcademicExpertiseData];
        let displayValue: React.ReactNode;

        if (isLoading) {
          displayValue = <Skeleton width={column.minWidth ? column.minWidth * 0.8 : 80} />;
        } else {
          // ใช้ format function ที่กำหนดใน Column หรือแสดงค่าปกติ
          displayValue = column.format ? column.format(value) : value;
        }

        return (
          <TableCellWrapper key={column.id as string} align={column.align || 'left'}>
            {displayValue}
            {!isLoading && getIconForColumn(column.id as keyof AcademicExpertiseData)}
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