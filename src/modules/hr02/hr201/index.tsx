// hr202/index.tsx
'use client';
import React from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import Table from './Table'; // จะใช้ Table Component ที่สร้างใหม่
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem'; // สำหรับ Select/Dropdown
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง (จาก Staff model) ---
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
  date_of_birth?: string; // เปลี่ยนเป็น string สำหรับ input type="date"
  birth_province?: string;
  current_address?: string;
  house_registration_address?: string;
  domicile_address?: string;
  country?: string;
  marital_status?: string;
  military_status?: string;
  enlistment_date?: string; // เปลี่ยนเป็น string สำหรับ input type="date"
  ordained_temple?: string;
  ordained_date?: string; // เปลี่ยนเป็น string สำหรับ input type="date"
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
  create_at?: string; // เปลี่ยนเป็น string สำหรับ input type="date"
  update_at?: string; // เปลี่ยนเป็น string สำหรับ input type="date"
  officer_id?: number;
  [key: string]: any;
}

// Helper to format date to YYYY-MM-DD or return empty string for '1900-01-01'
const formatDate = (dateString: string | undefined): string => {
    if (!dateString || dateString === '1900-01-01T00:00:00.000Z' || dateString === '1900-01-01' || dateString.startsWith('0000-00-00')) {
        return '';
    }
    try {
        const date = new Date(dateString);
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return '';
        }
        return date.toISOString().split('T')[0];
    } catch (e) {
        console.error("Error formatting date:", dateString, e);
        return '';
    }
};

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง Staff
const initialAllStaffs: StaffData[] = [
  {
    staff_id: 1001, citizen_id: '1100501234567', foreigner_id: '101', prefixname_id: 1, academic_title: 'รองศาสตราจารย์',
    first_name_th: 'สมชาย', last_name_th: 'วงศ์สวัสดิ์', middle_name_th: 'เกียรติ', first_name_en: 'Somchai', last_name_en: 'Wongsawat', middle_name_en: 'Kiat',
    gender: 'ชาย', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1975-08-15', birth_province: 'กรุงเทพมหานคร',
    current_address: '123 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900',
    house_registration_address: '456 หมู่ 2 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120',
    domicile_address: '456 หมู่ 2 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120', country: 'ไทย',
    marital_status: 'สมรส', military_status: 'ผ่านการเกณฑ์ทหาร', enlistment_date: '1995-04-01', ordained_temple:'', ordained_date: '2025-05-05',
    blood_type: 'A', weight: 72.5, height: 175.5, phone_number: '022987654', mobile_number1: '0812345678', mobile_number2: '0898765432',
    email1: 'somchai.w@university.ac.th', email2: 'somchai.w@gmail.com', line_id: 'somchai_w',
    budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/1.jpg', hobbies: 'อ่านหนังสือ, เล่นกอล์ฟ',
    language_skills: 'ไทย, อังกฤษ', computer_skills: 'Microsoft Office, Python, Data Analysis',
    create_at: '2010-05-15', update_at: '2023-06-20', officer_id: 1001
  },
  {
    staff_id: 1002, citizen_id: '3100507654321', foreigner_id: '101', prefixname_id: 2, academic_title: 'test',
    first_name_th: 'สมหญิง', last_name_th: 'ศรีสุข', middle_name_th: '', first_name_en: 'Somying', last_name_en: 'Srisuk', middle_name_en: '',
    gender: 'หญิง', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1985-11-22', birth_province: 'เชียงใหม่',
    current_address: '456 หมู่ 5 ตำบลสุเทพ อำเภอเมือง จังหวัดเชียงใหม่ 50200',
    house_registration_address: '789 ถนนเจริญเมือง ตำบลศรีภูมิ อำเภอเมือง จังหวัดเชียงใหม่ 50200',
    domicile_address: '789 ถนนเจริญเมือง ตำบลศรีภูมิ อำเภอเมือง จังหวัดเชียงใหม่ 50200', country: 'ไทย',
    marital_status: 'โสด', military_status: 'ไม่ต้องเกณฑ์ทหาร', enlistment_date: '2025-05-28', ordained_temple:'', ordained_date: '2025-05-05',
    blood_type: 'B', weight: 55.0, height: 162.0, phone_number: '053123456', mobile_number1: '0891234567', mobile_number2: '-',
    email1: 'somying.s@university.ac.th', email2: '-', line_id: 'somying_s',
    budget_type: 'เงินงบประมาณรายได้', profile_picture: '/profiles/2.jpg', hobbies: 'ทำอาหาร, ปลูกต้นไม้',
    language_skills: 'ไทย, อังกฤษ, จีน', computer_skills: 'Microsoft Office, Database Management',
    create_at: '2015-03-10', update_at: '2023-06-18', officer_id: 1001
  },
  {
    staff_id: 1003, citizen_id: '1460255525547', foreigner_id: 'PASSPORT123456', prefixname_id: 1, academic_title: 'ศาสตราจารย์',
    first_name_th: 'นายเทสดี', last_name_th: 'มีรวย', middle_name_th: '', first_name_en: 'David', last_name_en: 'Wilson', middle_name_en: 'James',
    gender: 'ชาย', ethnicity: 'Caucasian', nationality: 'American', religion: 'Christian', date_of_birth: '1968-03-30', birth_province: 'New York',
    current_address: '789 Faculty Village, University Campus',
    house_registration_address: '123 Main Street, New York, USA', domicile_address: '123 Main Street, New York, USA', country: 'USA',
    marital_status: 'สมรส', military_status: 'ไม่ต้องเกณฑ์ทหาร', enlistment_date: '2025-05-28', ordained_temple:'', ordained_date: '2025-05-05',
    blood_type: 'O', weight: 80.0, height: 182.0, phone_number: '', mobile_number1: '0823456789', mobile_number2: '-',
    email1: 'david.w@university.ac.th', email2: 'david.wilson@gmail.com', line_id: 'david_w',
    budget_type: 'เงินงบประมาณรายได้', profile_picture: '/profiles/3.jpg', hobbies: 'Photography, Traveling',
    language_skills: 'English, French', computer_skills: 'Machine Learning, AI Research',
    create_at: '2012-07-20', update_at: '2023-06-15', officer_id: 1001
  },
  {
    staff_id: 1004, citizen_id: '5100509876543', foreigner_id: '101', prefixname_id: 3, academic_title: 'test',
    first_name_th: 'นงลักษณ์', last_name_th: 'แก้วมณี', middle_name_th: 'รัตน์', first_name_en: 'Nonglak', last_name_en: 'Kaewmanee', middle_name_en: 'Rat',
    gender: 'หญิง', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1990-05-18', birth_province: 'นนทบุรี',
    current_address: '321 หมู่ 4 ตำบลบางกระสอ อำเภอเมือง จังหวัดนนทบุรี 11000',
    house_registration_address: '111 หมู่ 1 ตำบลบางพลัด อำเภอบางพลัด จังหวัดกรุงเทพมหานคร 10700',
    domicile_address: '111 หมู่ 1 ตำบลบางพลัด อำเภอบางพลัด จังหวัดกรุงเทพมหานคร 10700', country: 'ไทย',
    marital_status: 'หย่าร้าง', military_status: 'ไม่ต้องเกณฑ์ทหาร', enlistment_date: '2025-05-28', ordained_temple:'', ordained_date: '2025-05-05',
    blood_type: 'AB', weight: 58.0, height: 165.0, phone_number: '025554321', mobile_number1: '0856789123', mobile_number2: '0867891234',
    email1: 'nonglak.k@university.ac.th', email2: 'nonglak.k@gmail.com', line_id: 'nonglak_k',
    budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/4.jpg', hobbies: 'ดูหนัง, ฟังเพลง',
    language_skills: 'ไทย, อังกฤษ', computer_skills: 'HR Software, Microsoft Office',
    create_at: '2018-09-05', update_at: '2023-06-22', officer_id: 1001
  },
  {
    staff_id: 1005, citizen_id: '2100504567890', foreigner_id: '101', prefixname_id: 1, academic_title: 'test',
    first_name_th: 'สุเทพ', last_name_th: 'อินทร์พรหม', middle_name_th: '', first_name_en: 'Suthep', last_name_en: 'Inprom', middle_name_en: '',
    gender: 'ชาย', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา',
    current_address: '555 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '222 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '222 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000', country: 'ไทย',
    marital_status: 'สมรส', military_status: 'ได้รับการยกเว้น', enlistment_date: '2025-05-28', ordained_temple: 'วัดสระแก้ว', ordained_date: '2001-07-15',
    blood_type: 'B', weight: 68.0, height: 170.0, phone_number: '044333444', mobile_number1: '0878912345', mobile_number2: '-',
    email1: 'suthep.i@university.ac.th', email2: '-', line_id: 'suthep_i',
    budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/5.jpg', hobbies: 'เลี้ยงปลา, ทำสวน',
    language_skills: 'ไทย, อังกฤษ', computer_skills: 'Medical Software, Laboratory Equipment',
    create_at: '2016-11-30', update_at: '2023-06-25', officer_id: 1001
  },
  {
    staff_id: 1006, citizen_id: '1458555525584', foreigner_id: '101', prefixname_id: 1, academic_title: 'test',
    first_name_th: 'สุดใจ', last_name_th: 'อิ่มเอม', middle_name_th: '', first_name_en: 'Suthep', last_name_en: 'Inprom', middle_name_en: '',
    gender: 'ชาย', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา',
    current_address: '666 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '222 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '666 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000', country: 'ไทย',
    marital_status: 'สมรส', military_status: 'ได้รับการยกเว้น', enlistment_date: '2025-05-28', ordained_temple: 'วัดสระแก้ว', ordained_date: '2001-07-15',
    blood_type: 'B', weight: 68.0, height: 170.0, phone_number: '044333444', mobile_number1: '0878912345', mobile_number2: '-',
    email1: 'suthep.i@university.ac.th', email2: '-', line_id: 'suthep_i',
    budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/5.jpg', hobbies: 'เลี้ยงปลา, ทำสวน',
    language_skills: 'ไทย, อังกฤษ', computer_skills: 'Medical Software, Laboratory Equipment',
    create_at: '2016-11-30', update_at: '2023-06-25', officer_id: 1001
  },
  {
    staff_id: 1007, citizen_id: '3658588858885', foreigner_id: '101', prefixname_id: 1, academic_title: 'test',
    first_name_th: 'สุดสาคร', last_name_th: 'ใจดี', middle_name_th: '', first_name_en: 'Suthep', last_name_en: 'Inprom', middle_name_en: '',
    gender: 'ชาย', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา',
    current_address: '777 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '222 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '777 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000', country: 'ไทย',
    marital_status: 'สมรส', military_status: 'ได้รับการยกเว้น', enlistment_date: '2025-05-28', ordained_temple: 'วัดสระแก้ว', ordained_date: '2001-07-15',
    blood_type: 'B', weight: 68.0, height: 170.0, phone_number: '044333444', mobile_number1: '0878912345', mobile_number2: '-',
    email1: 'suthep.i@university.ac.th', email2: '-', line_id: 'suthep_i',
    budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/5.jpg', hobbies: 'เลี้ยงปลา, ทำสวน',
    language_skills: 'ไทย, อังกฤษ', computer_skills: 'Medical Software, Laboratory Equipment',
    create_at: '2016-11-30', update_at: '2023-06-25', officer_id: 1001
  },
  {
    staff_id: 1008, citizen_id: '1458544478852', foreigner_id: '101', prefixname_id: 1, academic_title: 'test',
    first_name_th: 'สีดา', last_name_th: 'สีใจ', middle_name_th: '', first_name_en: 'Suthep', last_name_en: 'Inprom', middle_name_en: '',
    gender: 'หญิง', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา',
    current_address: '888 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '888 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '888 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000', country: 'ไทย',
    marital_status: 'สมรส', military_status: 'ได้รับการยกเว้น', enlistment_date: '2025-05-28', ordained_temple: 'วัดสระแก้ว', ordained_date: '2001-07-15',
    blood_type: 'B', weight: 68.0, height: 170.0, phone_number: '044333444', mobile_number1: '0878912345', mobile_number2: '-',
    email1: 'suthep.i@university.ac.th', email2: '-', line_id: 'suthep_i',
    budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/5.jpg', hobbies: 'เลี้ยงปลา, ทำสวน',
    language_skills: 'ไทย, อังกฤษ', computer_skills: 'Medical Software, Laboratory Equipment',
    create_at: '2016-11-30', update_at: '2023-06-25', officer_id: 1001
  },
  {
    staff_id: 1009, citizen_id: '1458555525584', foreigner_id: '101', prefixname_id: 1, academic_title: 'test',
    first_name_th: 'กฤกนก', last_name_th: 'กกกนิส', middle_name_th: '', first_name_en: 'Suthep', last_name_en: 'Inprom', middle_name_en: '',
    gender: 'ชาย', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา',
    current_address: '999 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '999 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '999 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000', country: 'ไทย',
    marital_status: 'สมรส', military_status: 'ได้รับการยกเว้น', enlistment_date: '2025-05-28', ordained_temple: 'วัดสระแก้ว', ordained_date: '2001-07-15',
    blood_type: 'B', weight: 68.0, height: 170.0, phone_number: '044333444', mobile_number1: '0878912345', mobile_number2: '-',
    email1: 'suthep.i@university.ac.th', email2: '-', line_id: 'suthep_i',
    budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/5.jpg', hobbies: 'เลี้ยงปลา, ทำสวน',
    language_skills: 'ไทย, อังกฤษ', computer_skills: 'Medical Software, Laboratory Equipment',
    create_at: '2016-11-30', update_at: '2023-06-25', officer_id: 1001
  },
  {
    staff_id: 1010, citizen_id: '2369854441254', foreigner_id: '101', prefixname_id: 1, academic_title: 'test',
    first_name_th: 'สุกสา', last_name_th: 'สุพล', middle_name_th: '', first_name_en: 'Suthep', last_name_en: 'Inprom', middle_name_en: '',
    gender: 'ชาย', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา',
    current_address: '11 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '11 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '11 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000', country: 'ไทย',
    marital_status: 'สมรส', military_status: 'ได้รับการยกเว้น', enlistment_date: '2025-05-28', ordained_temple: 'วัดสระแก้ว', ordained_date: '2001-07-15',
    blood_type: 'B', weight: 68.0, height: 170.0, phone_number: '044333444', mobile_number1: '0878912345', mobile_number2: '-',
    email1: 'suthep.i@university.ac.th', email2: '-', line_id: 'suthep_i',
    budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/5.jpg', hobbies: 'เลี้ยงปลา, ทำสวน',
    language_skills: 'ไทย, อังกฤษ', computer_skills: 'Medical Software, Laboratory Equipment',
    create_at: '2016-11-30', update_at: '2023-06-25', officer_id: 1001
  },
  {
    staff_id: 1011, citizen_id: '2552522225441', foreigner_id: '101', prefixname_id: 1, academic_title: 'test',
    first_name_th: 'สมใจ', last_name_th: 'ใสจม', middle_name_th: '', first_name_en: 'Suthep', last_name_en: 'Inprom', middle_name_en: '',
    gender: 'หญิง', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา',
    current_address: '333 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '333 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '333 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000', country: 'ไทย',
    marital_status: 'สมรส', military_status: 'ได้รับการยกเว้น', enlistment_date: '2025-05-28', ordained_temple: 'วัดสระแก้ว', ordained_date: '2001-07-15',
    blood_type: 'B', weight: 68.0, height: 170.0, phone_number: '044333444', mobile_number1: '0878912345', mobile_number2: '-',
    email1: 'suthep.i@university.ac.th', email2: '-', line_id: 'suthep_i',
    budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/5.jpg', hobbies: 'เลี้ยงปลา, ทำสวน',
    language_skills: 'ไทย, อังกฤษ', computer_skills: 'Medical Software, Laboratory Equipment',
    create_at: '2016-11-30', update_at: '2023-06-25', officer_id: 1001
  },
  {
    staff_id: 1012, citizen_id: '2568569998852', foreigner_id: '101', prefixname_id: 1, academic_title: 'test',
    first_name_th: 'หฤทัย', last_name_th: 'ใจตรง', middle_name_th: '', first_name_en: 'Suthep', last_name_en: 'Inprom', middle_name_en: '',
    gender: 'หญิง', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา',
    current_address: '44 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '44 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '44 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000', country: 'ไทย',
    marital_status: 'สมรส', military_status: 'ได้รับการยกเว้น', enlistment_date: '2025-05-28', ordained_temple: 'วัดสระแก้ว', ordained_date: '2001-07-15',
    blood_type: 'B', weight: 68.0, height: 170.0, phone_number: '044333444', mobile_number1: '0878912345', mobile_number2: '-',
    email1: 'suthep.i@university.ac.th', email2: '-', line_id: 'suthep_i',
    budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/5.jpg', hobbies: 'เลี้ยงปลา, ทำสวน',
    language_skills: 'ไทย, อังกฤษ', computer_skills: 'Medical Software, Laboratory Equipment',
    create_at: '2016-11-30', update_at: '2023-06-25', officer_id: 1001
  }
];

const Hr201 = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<StaffData | null>(null);
  const [tableData, setTableData] = React.useState<StaffData[]>(initialAllStaffs);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();
  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr02.02', defaultMessage: 'HR202 ข้อมูลบุคลากร' });
    const words = label.split("HR202 ");
    return words.length > 1 ? words[1] : label;
  };

  const dialogTitle = React.useMemo(() => {
    if (dialogMode === 'add') return "เพิ่ม" + labeltext();
    if (dialogMode === 'edit') return "แก้ไข" + labeltext();
    if (dialogMode === 'view') return "รายละเอียด" + labeltext();
    return "";
  }, [dialogMode, labeltext]);

  const onOpenAddTask = () => {
    setDialogMode('add');
    setCurrentData({
      staff_id: 0, // ID will be assigned on save
      // ตั้งค่าเริ่มต้นสำหรับฟิลด์อื่นๆ ตามต้องการ
      citizen_id: '',
      foreigner_id: '',
      prefixname_id: undefined,
      academic_title: '',
      first_name_th: '',
      last_name_th: '',
      gender: '',
      ethnicity: '',
      nationality: '',
      religion: '',
      date_of_birth: '',
      birth_province: '',
      current_address: '',
      house_registration_address: '',
      domicile_address: '',
      country: '',
      marital_status: '',
      military_status: '',
      enlistment_date: '',
      ordained_temple: '',
      ordained_date: '',
      blood_type: '',
      weight: undefined,
      height: undefined,
      phone_number: '',
      mobile_number1: '',
      email1: '',
      line_id: '',
      budget_type: '',
      profile_picture: '',
      hobbies: '',
      language_skills: '',
      computer_skills: '',
      create_at: new Date().toISOString().split('T')[0],
      update_at: new Date().toISOString().split('T')[0],
      officer_id: undefined,
    });
    setAddTaskOpen(true);
    setErrors({});
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
    setCurrentData(null);
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentData(prevData => {
      const newData = { ...prevData! };
      if (['staff_id', 'prefixname_id', 'officer_id'].includes(name) || ['weight', 'height'].includes(name)) {
        newData[name] = value ? Number(value) : undefined;
      } else if (value === '') { // จัดการกรณีที่ value เป็น empty string ให้เป็น null สำหรับ optional fields
        newData[name] = null;
      }
      else {
        newData[name] = value;
      }
      return newData;
    });
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateData = () => {
    const newErrors: { [key: string]: string } = {};
    if (!currentData?.first_name_th) {
      newErrors.first_name_th = 'กรุณากรอกชื่อ (ภาษาไทย)';
    }
    if (!currentData?.last_name_th) {
      newErrors.last_name_th = 'กรุณากรอกนามสกุล (ภาษาไทย)';
    }
    if (!currentData?.gender) {
        newErrors.gender = 'กรุณาเลือกเพศ';
    }
    if (!currentData?.date_of_birth) {
        newErrors.date_of_birth = 'กรุณาเลือกวันเกิด';
    }
    if (!currentData?.citizen_id && !currentData?.foreigner_id) {
        newErrors.citizen_id = 'กรุณากรอกเลขประจำตัวประชาชน หรือ เลขประจำตัวคนต่างด้าว';
        newErrors.foreigner_id = 'กรุณากรอกเลขประจำตัวประชาชน หรือ เลขประจำตัวคนต่างด้าว';
    }
    if (currentData?.officer_id === undefined || currentData?.officer_id === null || currentData?.officer_id <= 0) {
        newErrors.officer_id = 'กรุณากรอกรหัสผู้จัดการข้อมูล';
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveData = () => {
     if (!validateData()) {
      return;
    }

    if (dialogMode === 'add') {
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.staff_id)) + 1 : 1;
      const newData: StaffData = {
        ...currentData!,
        staff_id: newId,
        create_at: new Date().toISOString().split('T')[0],
        update_at: new Date().toISOString().split('T')[0],
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลบุคลากรเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.staff_id === currentData!.staff_id ? {
            ...currentData!,
            update_at: new Date().toISOString().split('T')[0]
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลบุคลากรเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: StaffData) => {
    setDialogMode('view');
    setCurrentData({ 
      ...data, 
      date_of_birth: formatDate(data.date_of_birth),
      enlistment_date: formatDate(data.enlistment_date),
      ordained_date: formatDate(data.ordained_date),
      create_at: formatDate(data.create_at),
      update_at: formatDate(data.update_at)
    });
    setErrors({});
    setAddTaskOpen(true);
  };

  const handleEditData = (data: StaffData) => {
    setDialogMode('edit');
    setCurrentData({ 
      ...data, 
      date_of_birth: formatDate(data.date_of_birth),
      enlistment_date: formatDate(data.enlistment_date),
      ordained_date: formatDate(data.ordained_date),
      create_at: formatDate(data.create_at),
      update_at: formatDate(data.update_at)
    });
    setErrors({});
    setAddTaskOpen(true);
  };

  const handleDeleteData = async (id: number) => {
    const result = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณต้องการลบข้อมูลนี้ใช่ไหม?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    });
    if (result.isConfirmed) {
      setTableData(prevData => prevData.filter(data => data.staff_id !== id));
      Swal.fire(
        'ลบแล้ว!',
        'ข้อมูลของคุณถูกลบเรียบร้อยแล้ว',
        'success'
      );
    }
  };

  const prefixnameOptions = [
    { value: 1, label: 'นาย' },
    { value: 2, label: 'นาง' },
    { value: 3, label: 'นางสาว' },
  ];

  const genderOptions = [
    { value: 'ชาย', label: 'ชาย' },
    { value: 'หญิง', label: 'หญิง' },
    { value: 'อื่นๆ', label: 'อื่นๆ' },
  ];

  const maritalStatusOptions = [
    { value: 'โสด', label: 'โสด' },
    { value: 'สมรส', label: 'สมรส' },
    { value: 'หย่าร้าง', label: 'หย่าร้าง' },
    { value: 'หม้าย', label: 'หม้าย' },
    { value: 'แยกกันอยู่', label: 'แยกกันอยู่' },
  ];

  const militaryStatusOptions = [
    { value: 'ผ่านการเกณฑ์ทหาร', label: 'ผ่านการเกณฑ์ทหาร' },
    { value: 'ไม่ต้องเกณฑ์ทหาร', label: 'ไม่ต้องเกณฑ์ทหาร' },
    { value: 'ได้รับการยกเว้น', label: 'ได้รับการยกเว้น' },
    { value: 'ยังไม่เกณฑ์ทหาร', label: 'ยังไม่เกณฑ์ทหาร' },
  ];

  const bloodTypeOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'AB', label: 'AB' },
    { value: 'O', label: 'O' },
  ];

  const budgetTypeOptions = [
    { value: 'งบประมาณแผ่นดิน', label: 'งบประมาณแผ่นดิน' },
    { value: 'เงินงบประมาณรายได้', label: 'เงินงบประมาณรายได้' },
  ];

  return (
    <AppCard
      contentStyle={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 8 }}
      title={<IntlMessages id="sidebar.hr02.02" defaultMessage="HR202 ข้อมูลบุคลากร" />}
      action={
        <Button
          variant="outlined"
          color="primary"
          sx={{
            padding: '3px 10px',
            borderRadius: 30,
            '& .MuiSvgIcon-root': {
              fontSize: 20,
            },
          }}
          startIcon={<AddIcon />}
          onClick={onOpenAddTask}
        >
          เพิ่ม{labeltext()}
        </Button>
      }
    >
      <Table data={tableData} onView={handleViewData} onEdit={handleEditData} onDelete={handleDeleteData} />
      <Dialog
        maxWidth="md"
        open={isAddTaskOpen}
        onClose={onCloseAddTask}
        title={dialogTitle}
        fullScreen // **คง prop นี้ไว้เผื่อว่า AppDialog รองรับ**
        PaperProps={{ // **เพิ่ม PaperProps เพื่อบังคับสไตล์ให้เต็มจอ**
          sx: {
            width: '100%',
            height: '100%',
            margin: 0, // ลบ margin เริ่มต้นออก
            maxWidth: '100%', // บังคับให้ maxWidth เป็น 100%
            maxHeight: '100%', // บังคับให้ maxHeight เป็น 100%
          }
        }}
      >
          <AppBar sx={{ position: 'relative', backgroundColor: '#1976d2' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={onCloseAddTask} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h3" component="div">
                            {dialogTitle}ข้อมูลประวัติบุคลากร <strong style={{ color: 'darkorange' }}></strong>   
                        </Typography>
                    </Toolbar>
                </AppBar> 
                
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="รหัสบุคลากร"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.staff_id || ''}
                name="staff_id"
                disabled={true}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="เลขประจำตัวประชาชน"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.citizen_id || ''}
                name="citizen_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.citizen_id}
                helperText={errors.citizen_id}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="เลขประจำตัวคนต่างด้าว"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.foreigner_id || ''}
                name="foreigner_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.foreigner_id}
                helperText={errors.foreigner_id}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="คำนำหน้านาม"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.prefixname_id === undefined ? '' : currentData?.prefixname_id}
                name="prefixname_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              >
                {prefixnameOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="คำนำหน้านามตำแหน่งวิชาการ"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.academic_title || ''}
                name="academic_title"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ชื่อ (ไทย)"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.first_name_th || ''}
                name="first_name_th"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.first_name_th}
                helperText={errors.first_name_th}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ชื่อกลาง (ไทย)"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.middle_name_th || ''}
                name="middle_name_th"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="นามสกุล (ไทย)"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.last_name_th || ''}
                name="last_name_th"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.last_name_th}
                helperText={errors.last_name_th}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ชื่อ (อังกฤษ)"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.first_name_en || ''}
                name="first_name_en"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ชื่อกลาง (อังกฤษ)"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.middle_name_en || ''}
                name="middle_name_en"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="นามสกุล (อังกฤษ)"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.last_name_en || ''}
                name="last_name_en"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="เพศ"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.gender || ''}
                name="gender"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.gender}
                helperText={errors.gender}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="เชื้อชาติ"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.ethnicity || ''}
                name="ethnicity"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="สัญชาติ"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.nationality || ''}
                name="nationality"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ศาสนา"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.religion || ''}
                name="religion"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="วันเกิด"
                variant="outlined"
                margin="normal"
                size="small"
                type="date"
                value={currentData?.date_of_birth || ''}
                name="date_of_birth"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                InputLabelProps={{ shrink: true }}
                error={!!errors.date_of_birth}
                helperText={errors.date_of_birth}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="จังหวัดที่เกิด"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.birth_province || ''}
                name="birth_province"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ที่อยู่ปัจจุบัน"
                variant="outlined"
                margin="normal"
                size="small"
                multiline
                rows={2}
                value={currentData?.current_address || ''}
                name="current_address"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ที่อยู่ตามทะเบียนบ้าน"
                variant="outlined"
                margin="normal"
                size="small"
                multiline
                rows={2}
                value={currentData?.house_registration_address || ''}
                name="house_registration_address"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ที่อยู่ตามภูมิลำเนา"
                variant="outlined"
                margin="normal"
                size="small"
                multiline
                rows={2}
                value={currentData?.domicile_address || ''}
                name="domicile_address"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ประเทศ"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.country || ''}
                name="country"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="สถานภาพสมรส"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.marital_status || ''}
                name="marital_status"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              >
                {maritalStatusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="สถานภาพทางการทหาร"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.military_status || ''}
                name="military_status"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              >
                {militaryStatusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="วันที่เข้ารับการเกณฑ์ทหาร"
                variant="outlined"
                margin="normal"
                size="small"
                type="date"
                value={currentData?.enlistment_date || ''}
                name="enlistment_date"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="วัดที่บรรพชา/อุปสมบท"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.ordained_temple || ''}
                name="ordained_temple"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="วันที่บรรพชา/อุปสมบท"
                variant="outlined"
                margin="normal"
                size="small"
                type="date"
                value={currentData?.ordained_date || ''}
                name="ordained_date"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="กรุ๊ปเลือด"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.blood_type || ''}
                name="blood_type"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              >
                {bloodTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="น้ำหนัก (กิโลกรัม)"
                variant="outlined"
                margin="normal"
                size="small"
                type="number"
                value={currentData?.weight || ''}
                name="weight"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ส่วนสูง (เซนติเมตร)"
                variant="outlined"
                margin="normal"
                size="small"
                type="number"
                value={currentData?.height || ''}
                name="height"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="เบอร์โทรศัพท์บ้าน"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.phone_number || ''}
                name="phone_number"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="เบอร์โทรศัพท์มือถือ 1"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.mobile_number1 || ''}
                name="mobile_number1"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="เบอร์โทรศัพท์มือถือ 2"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.mobile_number2 || ''}
                name="mobile_number2"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="อีเมล 1"
                variant="outlined"
                margin="normal"
                size="small"
                type="email"
                value={currentData?.email1 || ''}
                name="email1"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="อีเมล 2"
                variant="outlined"
                margin="normal"
                size="small"
                type="email"
                value={currentData?.email2 || ''}
                name="email2"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Line ID"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.line_id || ''}
                name="line_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="ประเภทงบประมาณ"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.budget_type || ''}
                name="budget_type"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              >
                {budgetTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="รูปโปรไฟล์"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.profile_picture || ''}
                name="profile_picture"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="งานอดิเรก"
                variant="outlined"
                margin="normal"
                size="small"
                multiline
                rows={2}
                value={currentData?.hobbies || ''}
                name="hobbies"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ทักษะภาษา"
                variant="outlined"
                margin="normal"
                size="small"
                multiline
                rows={2}
                value={currentData?.language_skills || ''}
                name="language_skills"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ทักษะคอมพิวเตอร์"
                variant="outlined"
                margin="normal"
                size="small"
                multiline
                rows={2}
                value={currentData?.computer_skills || ''}
                name="computer_skills"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="วันที่สร้าง"
                variant="outlined"
                margin="normal"
                size="small"
                type="date"
                value={currentData?.create_at || ''}
                name="create_at"
                onChange={handleInputChange}
                disabled={true}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="วันที่อัปเดต"
                variant="outlined"
                margin="normal"
                size="small"
                type="date"
                value={currentData?.update_at || ''}
                name="update_at"
                onChange={handleInputChange}
                disabled={true} 
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ผู้จัดการข้อมูล"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.officer_id || ''}
                name="officer_id"
                type="number"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.officer_id}
                helperText={errors.officer_id}
              />
            </Grid>
          </Grid>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={onCloseAddTask} color="secondary">
              {dialogMode === 'view' ? 'ปิด' : 'ยกเลิก'}
            </Button>
            {dialogMode !== 'view' && (
              <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSaveData}>
                บันทึก
              </Button>
            )}
          </Box>
        </Box>
      </Dialog>
    </AppCard>
  );
};

export default Hr201;