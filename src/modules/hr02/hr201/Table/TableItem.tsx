// hr202/table/tableitem/index.tsx
import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import AppMenu from '@crema/components/AppMenu';
import { 
  MdPerson, MdBadge, MdCreditCard, MdOutlinePermIdentity, MdSchool, 
  MdDescription, MdOutlineCalendarToday, MdPinDrop, MdHome, MdOutlineLocationOn,
  MdFlag, MdFavoriteBorder, MdMilitaryTech, MdTempleBuddhist, MdBloodtype,
  MdFitnessCenter, MdPhone, MdSmartphone, MdMail, MdChat, MdAttachMoney, 
  MdImage, MdSportsBaseball, MdLanguage, MdComputer 
} from "react-icons/md"; 

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

// กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง (จาก Staff model)
interface StaffData {
  staff_id: number;
  citizen_id?: string;
  foreigner_id?: string;
  prefixname_id?: number;
  academic_title?: string;
  first_name_th?: string;
  last_name_th?: string;
  middle_name_th?: string;
  first_name_en?: string;
  last_name_en?: string;
  middle_name_en?: string;
  gender?: string;
  ethnicity?: string;
  nationality?: string;
  religion?: string;
  date_of_birth?: string; 
  birth_province?: string;
  current_address?: string;
  house_registration_address?: string;
  domicile_address?: string;
  country?: string;
  marital_status?: string;
  military_status?: string;
  enlistment_date?: string; 
  ordained_temple?: string;
  ordained_date?: string; 
  blood_type?: string;
  weight?: number;
  height?: number;
  phone_number?: string;
  mobile_number1?: string;
  mobile_number2?: string;
  email1?: string;
  email2?: string;
  line_id?: string;
  budget_type?: string;
  profile_picture?: string;
  hobbies?: string;
  language_skills?: string;
  computer_skills?: string;
  create_at?: string; 
  update_at?: string; 
  officer_id?: number;
  [key: string]: any;
}

interface Column {
  id: keyof StaffData | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  sortable?: boolean;
}

type Props = {
  data: StaffData;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  columns: readonly Column[]; 
};

const TableItem = ({ data, onView, onEdit, onDelete, columns }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  const getIconForColumn = (columnId: keyof StaffData) => {
    switch (columnId) {
      case 'staff_id': return <MdPerson style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'citizen_id': return <MdCreditCard style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'foreigner_id': return <MdOutlinePermIdentity style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'prefixname_id': return <MdBadge style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'academic_title': return <MdSchool style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'first_name_th':
      case 'last_name_th':
      case 'middle_name_th':
      case 'first_name_en':
      case 'last_name_en':
      case 'middle_name_en': return <MdPerson style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'gender': return <MdPerson style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'ethnicity': return <MdDescription style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'nationality': return <MdFlag style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'religion': return <MdFavoriteBorder style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'date_of_birth': return <MdOutlineCalendarToday style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'birth_province': return <MdPinDrop style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'current_address': return <MdHome style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'house_registration_address': return <MdHome style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'domicile_address': return <MdOutlineLocationOn style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'country': return <MdFlag style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'marital_status': return <MdFavoriteBorder style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'military_status': return <MdMilitaryTech style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'enlistment_date': return <MdOutlineCalendarToday style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'ordained_temple': return <MdTempleBuddhist style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'ordained_date': return <MdOutlineCalendarToday style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'blood_type': return <MdBloodtype style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'weight':
      case 'height': return <MdFitnessCenter style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'phone_number': return <MdPhone style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'mobile_number1':
      case 'mobile_number2': return <MdSmartphone style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'email1':
      case 'email2': return <MdMail style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'line_id': return <MdChat style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'budget_type': return <MdAttachMoney style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'profile_picture': return <MdImage style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'hobbies': return <MdSportsBaseball style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'language_skills': return <MdLanguage style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'computer_skills': return <MdComputer style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'create_at':
      case 'update_at': return <MdOutlineCalendarToday style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      case 'officer_id': return <MdPerson style={{ verticalAlign: 'middle', marginLeft: 4 }} />;
      default:
        return null;
    }
  };

  return (
    <TableRow hover key={data.staff_id} className="item-hover">
      {columns.map((column) => {
        if (column.id === 'actions') return null;

        const value = data[column.id as keyof StaffData];
        let displayValue: React.ReactNode;

        if (isLoading) {
          displayValue = <Skeleton width={column.minWidth ? column.minWidth * 0.8 : 80} />;
        } else {
          // ใช้ format function ที่กำหนดใน Column หรือแสดงค่าปกติ
          displayValue = column.format ? column.format(value) : (value === null ? '-' : value);
        }

        return (
          <TableCellWrapper key={column.id as string} align={column.align || 'left'}>
            {displayValue}
            {!isLoading && getIconForColumn(column.id as keyof StaffData)}
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