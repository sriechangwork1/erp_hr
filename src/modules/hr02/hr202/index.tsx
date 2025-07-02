//hr202/index.tsx
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
import { MdAccountCircle } from 'react-icons/md'; // Import the default icon
import Avatar from '@mui/material/Avatar';

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
  date_of_birth?: string; // Format 'YYYY-MM-DD'
  birth_province?: string;
  current_address?: string;
  house_registration_address?: string;
  domicile_address?: string;
  country?: string;
  marital_status?: string;
  military_status?: string;
  enlistment_date?: string; // Format 'YYYY-MM-DD'
  ordained_temple?: string;
  ordained_date?: string; // Format 'YYYY-MM-DD'
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
  create_at?: string; // Format 'YYYY-MM-DD'
  update_at?: string; // Format 'YYYY-MM-DD'
  officer_id?: number;
  faculty_id?: number;
  department_id?: number;
  program_id?: number;
  staff_status?: number;
  staff_type_id?: number;
  position_type_id?: number;
  job_title_id?: number;
  work_line_id?: number;
  position_level_id?: number;
  academic_position_id?: number;
  support_position_id?: number;
  admin_position_id?: number;
  [key: string]: any; // สำหรับการเข้าถึง key แบบ dynamic
}

// Helper to format date toYYYY-MM-DD or return empty string for '1900-01-01'
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
    staff_id: 1001,
    citizen_id: '1100501234567',
    foreigner_id: '',
    prefixname_id: 1,
    academic_title: 'รองศาสตราจารย์',
    first_name_th: 'สมชาย',
    last_name_th: 'วงศ์สวัสดิ์',
    middle_name_th: 'เกียรติ',
    first_name_en: 'Somchai',
    last_name_en: 'Wongsawat',
    middle_name_en: 'Kiat',
    gender: 'ชาย',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    religion: 'พุทธ',
    date_of_birth: '1975-08-15',
    birth_province: 'กรุงเทพมหานคร',
    current_address: '123 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900',
    house_registration_address: '456 หมู่ 2 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120',
    domicile_address: '456 หมู่ 2 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120',
    country: 'ไทย',
    marital_status: 'สมรส',
    military_status: 'ผ่านการเกณฑ์ทหาร',
    enlistment_date: '1995-04-01',
    ordained_temple: '',
    ordained_date:'0000-00-00',
    blood_type: 'A',
    weight: 72.5,
    height: 175.5,
    phone_number: '022987654',
    mobile_number1: '0812345678',
    mobile_number2: '0898765432',
    email1: 'somchai.w@university.ac.th',
    email2: 'somchai.w@gmail.com',
    line_id: 'somchai_w',
    budget_type: 'งบประมาณแผ่นดิน',
    profile_picture: '/profiles/1.jpg',
    hobbies: 'อ่านหนังสือ, เล่นกอล์ฟ',
    language_skills: 'ไทย, อังกฤษ',
    computer_skills: 'Microsoft Office, Python, Data Analysis',
    create_at: '2010-05-15',
    update_at: '2023-06-20',
    officer_id: 1001,
    faculty_id: 1,
    department_id: 101,
    program_id: 1001,
    staff_status: 1,
    staff_type_id: 1,
    position_type_id: 1,
    job_title_id: 10,
    work_line_id: 100,
    position_level_id: 5,
    academic_position_id: 2,
    support_position_id: 1,
    admin_position_id: 1,
  },
  {
    staff_id: 1002,
    citizen_id: '3100507654321',
    foreigner_id: '',
    prefixname_id: 2,
    academic_title: 'อาจารย์',
    first_name_th: 'สมหญิง',
    last_name_th: 'ศรีสุข',
    middle_name_th: '',
    first_name_en: 'Somying',
    last_name_en: 'Srisuk',
    middle_name_en: '',
    gender: 'หญิง',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    religion: 'พุทธ',
    date_of_birth: '1985-11-22',
    birth_province: 'เชียงใหม่',
    current_address: '456 หมู่ 5 ตำบลสุเทพ อำเภอเมือง จังหวัดเชียงใหม่ 50200',
    house_registration_address: '789 ถนนเจริญเมือง ตำบลศรีภูมิ อำเภอเมือง จังหวัดเชียงใหม่ 50200',
    domicile_address: '789 ถนนเจริญเมือง ตำบลศรีภูมิ อำเภอเมือง จังหวัดเชียงใหม่ 50200',
    country: 'ไทย',
    marital_status: 'โสด',
    military_status: 'ไม่ต้องเกณฑ์ทหาร',
    enlistment_date: '0000-00-00',
    ordained_temple: '',
    ordained_date:'0000-00-00',
    blood_type: 'B',
    weight: 55.0,
    height: 162.0,
    phone_number: '053123456',
    mobile_number1: '0891234567',
    mobile_number2: '',
    email1: 'somying.s@university.ac.th',
    email2: '',
    line_id: 'somying_s',
    budget_type: 'เงินงบประมาณรายได้',
    profile_picture: '/profiles/2.jpg',
    hobbies: 'ทำอาหาร, ปลูกต้นไม้',
    language_skills: 'ไทย, อังกฤษ, จีน',
    computer_skills: 'Microsoft Office, Database Management',
    create_at: '2015-03-10',
    update_at: '2023-06-18',
    officer_id: 1001,
    faculty_id: 2,
    department_id: 201,
    program_id: 2005,
    staff_status: 1,
    staff_type_id: 1,
    position_type_id: 1,
    job_title_id: 11,
    work_line_id: 101,
    position_level_id: 3,
    academic_position_id: 1,
    support_position_id: 1,
    admin_position_id: 1,
  },
  {
    staff_id: 1003,
    citizen_id: '1450225555214',
    foreigner_id: 'PASSPORT123456',
    prefixname_id: 1,
    academic_title: 'ศาสตราจารย์',
    first_name_th: 'นายเทสดี',
    last_name_th: 'มีรวย',
    middle_name_th:'',
    first_name_en: 'David',
    last_name_en: 'Wilson',
    middle_name_en: 'James',
    gender: 'ชาย',
    ethnicity: 'Caucasian',
    nationality: 'American',
    religion: 'Christian',
    date_of_birth: '1968-03-30',
    birth_province: 'New York',
    current_address: '789 Faculty Village, University Campus',
    house_registration_address: '123 Main Street, New York, USA',
    domicile_address: '123 Main Street, New York, USA',
    country: 'USA',
    marital_status: 'สมรส',
    military_status: 'ไม่ต้องเกณฑ์ทหาร',
    enlistment_date: '0000-00-00',
    ordained_temple: '',
    ordained_date:'0000-00-00',
    blood_type: 'O',
    weight: 80.0,
    height: 182.0,
    phone_number: '',
    mobile_number1: '0823456789',
    mobile_number2: '',
    email1: 'david.w@university.ac.th',
    email2: 'david.wilson@gmail.com',
    line_id: 'david_w',
    budget_type: 'เงินงบประมาณรายได้',
    profile_picture: '/profiles/3.jpg',
    hobbies: 'Photography, Traveling',
    language_skills: 'English, French',
    computer_skills: 'Machine Learning, AI Research',
    create_at: '2012-07-20',
    update_at: '2023-06-15',
    officer_id: 1001,
    faculty_id: 3,
    department_id: 301,
    program_id: 3001,
    staff_status: 1,
    staff_type_id: 1,
    position_type_id: 1,
    job_title_id: 12,
    work_line_id: 102,
    position_level_id: 7,
    academic_position_id: 3,
    support_position_id: 1,
    admin_position_id: 1,
  },
  {
    staff_id: 1004,
    citizen_id: '5100509876543',
    foreigner_id: '',
    prefixname_id: 3,
    academic_title: 'นักบริหารงานทั่วไป',
    first_name_th: 'นงลักษณ์',
    last_name_th: 'แก้วมณี',
    middle_name_th: 'รัตน์',
    first_name_en: 'Nonglak',
    last_name_en: 'Kaewmanee',
    middle_name_en: 'Rat',
    gender: 'หญิง',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    religion: 'พุทธ',
    date_of_birth: '1990-05-18',
    birth_province: 'นนทบุรี',
    current_address: '321 หมู่ 4 ตำบลบางกระสอ อำเภอเมือง จังหวัดนนทบุรี 11000',
    house_registration_address: '111 หมู่ 1 ตำบลบางพลัด อำเภอบางพลัด จังหวัดกรุงเทพมหานคร 10700',
    domicile_address: '111 หมู่ 1 ตำบลบางพลัด อำเภอบางพลัด จังหวัดกรุงเทพมหานคร 10700',
    country: 'ไทย',
    marital_status: 'หย่าร้าง',
    military_status: 'ไม่ต้องเกณฑ์ทหาร',
    enlistment_date: '0000-00-00',
    ordained_temple: '',
    ordained_date:'0000-00-00',
    blood_type: 'AB',
    weight: 58.0,
    height: 165.0,
    phone_number: '025554321',
    mobile_number1: '0856789123',
    mobile_number2: '0867891234',
    email1: 'nonglak.k@university.ac.th',
    email2: 'nonglak.k@gmail.com',
    line_id: 'nonglak_k',
    budget_type: 'งบประมาณแผ่นดิน',
    profile_picture: '/profiles/4.jpg',
    hobbies: 'ดูหนัง, ฟังเพลง',
    language_skills: 'ไทย, อังกฤษ',
    computer_skills: 'HR Software, Microsoft Office',
    create_at: '2018-09-05',
    update_at: '2023-06-22',
    officer_id: 1001,
    faculty_id: 1,
    department_id: 1,
    program_id: 1,
    staff_status: 1,
    staff_type_id: 2,
    position_type_id: 2,
    job_title_id: 1,
    work_line_id: 200,
    position_level_id: 3,
    academic_position_id: 1,
    support_position_id: 1,
    admin_position_id: 1,
  },
  {
    staff_id: 1005,
    citizen_id: '2100504567890',
    foreigner_id: '',
    prefixname_id: 1,
    academic_title: 'ผู้ช่วยศาสตราจารย์',
    first_name_th: 'สุเทพ',
    last_name_th: 'อินทร์พรหม',
    middle_name_th:'',
    first_name_en: 'Suthep',
    last_name_en: 'Inprom',
    middle_name_en: '',
    gender: 'ชาย',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    religion: 'พุทธ',
    date_of_birth: '1982-12-10',
    birth_province: 'นครราชสีมา',
    current_address: '555 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '222 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '222 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    country: 'ไทย',
    marital_status: 'สมรส',
    military_status: 'ได้รับการยกเว้น',
    enlistment_date: '0000-00-00',
    ordained_temple: 'วัดสระแก้ว',
    ordained_date: '2001-07-15',
    blood_type: 'B',
    weight: 68.0,
    height: 170.0,
    phone_number: '044333444',
    mobile_number1: '0878912345',
    mobile_number2: '',
    email1: 'suthep.i@university.ac.th',
    email2: '',
    line_id: 'suthep_i',
    budget_type: 'งบประมาณแผ่นดิน',
    profile_picture: '/profiles/5.jpg',
    hobbies: 'เลี้ยงปลา, ทำสวน',
    language_skills: 'ไทย, อังกฤษ',
    computer_skills: 'Medical Software, Laboratory Equipment',
    create_at: '2016-11-30',
    update_at: '2023-06-25',
    officer_id: 1001,
    faculty_id: 4,
    department_id: 401,
    program_id: 4001,
    staff_status: 1,
    staff_type_id: 1,
    position_type_id: 1,
    job_title_id: 13,
    work_line_id: 103,
    position_level_id: 4,
    academic_position_id: 4,
    support_position_id: 1,
    admin_position_id: 1,
  },
  {
    staff_id: 1006,
    citizen_id: '1458555525584',
    foreigner_id: '',
    prefixname_id: 2,
    academic_title: 'นักวิจัย',
    first_name_th: 'สุดใจ',
    last_name_th: 'อิ่มเอม',
    middle_name_th:'',
    first_name_en: 'Sutjai',
    last_name_en: 'Imaem',
    middle_name_en: '',
    gender: 'หญิง',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    religion: 'พุทธ',
    date_of_birth: '1988-02-28',
    birth_province: 'กรุงเทพมหานคร',
    current_address: '666 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '222 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '666 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    country: 'ไทย',
    marital_status: 'สมรส',
    military_status: 'ไม่ต้องเกณฑ์ทหาร',
    enlistment_date: '0000-00-00',
    ordained_temple: '',
    ordained_date:'0000-00-00',
    blood_type: 'O',
    weight: 60.0,
    height: 168.0,
    phone_number: '021112222',
    mobile_number1: '0881112222',
    mobile_number2: '',
    email1: 'sutjai.i@university.ac.th',
    email2: '',
    line_id: 'sutjai_i',
    budget_type: 'เงินงบประมาณรายได้',
    profile_picture: '/profiles/6.jpg',
    hobbies: 'ท่องเที่ยว, ถ่ายภาพ',
    language_skills: 'ไทย, อังกฤษ, ญี่ปุ่น',
    computer_skills: 'Statistical Software, Data Visualization',
    create_at: '2017-01-20',
    update_at: '2024-01-10',
    officer_id: 1002,
    faculty_id: 5,
    department_id: 501,
    program_id: 1,
    staff_status: 1,
    staff_type_id: 3,
    position_type_id: 3,
    job_title_id: 1,
    work_line_id: 300,
    position_level_id: 2,
    academic_position_id: 1,
    support_position_id: 1,
    admin_position_id: 1,
  },
  {
    staff_id: 1007,
    citizen_id: '3658588858885',
    foreigner_id: '',
    prefixname_id: 1,
    academic_title: 'นักวิชาการ',
    first_name_th: 'สุดสาคร',
    last_name_th: 'ใจดี',
    middle_name_th:'',
    first_name_en: 'Sudsakorn',
    last_name_en: 'Jaidee',
    middle_name_en: '',
    gender: 'ชาย',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    religion: 'พุทธ',
    date_of_birth: '1979-06-01',
    birth_province: 'ชลบุรี',
    current_address: '777 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '222 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '777 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    country: 'ไทย',
    marital_status: 'โสด',
    military_status: 'ผ่านการเกณฑ์ทหาร',
    enlistment_date: '2000-05-01',
    ordained_temple: '',
    ordained_date:'0000-00-00',
    blood_type: 'A',
    weight: 75.0,
    height: 178.0,
    phone_number: '038555666',
    mobile_number1: '0912345678',
    mobile_number2: '',
    email1: 'sudsakorn.j@university.ac.th',
    email2: '',
    line_id: 'sudsakorn_j',
    budget_type: 'งบประมาณแผ่นดิน',
    profile_picture: '/profiles/7.jpg',
    hobbies: 'วิ่ง, อ่านข่าว',
    language_skills: 'ไทย, อังกฤษ',
    computer_skills: 'Project Management Software, Spreadsheets',
    create_at: '2013-08-10',
    update_at: '2023-05-30',
    officer_id: 1001,
    faculty_id: 1,
    department_id: 102,
    program_id: 1,
    staff_status: 1,
    staff_type_id: 2,
    position_type_id: 2,
    job_title_id: 1,
    work_line_id: 201,
    position_level_id: 3,
    academic_position_id: 1,
    support_position_id: 2,
    admin_position_id: 1,
  },
  {
    staff_id: 1008,
    citizen_id: '1458544478852',
    foreigner_id: '',
    prefixname_id: 2,
    academic_title: 'นักทรัพยากรบุคคล',
    first_name_th: 'สีดา',
    last_name_th: 'สีใจ',
    middle_name_th:'',
    first_name_en: 'Sida',
    last_name_en: 'Saijai',
    middle_name_en: '',
    gender: 'หญิง',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    religion: 'พุทธ',
    date_of_birth: '1992-04-20',
    birth_province: 'ระยอง',
    current_address: '888 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '888 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '888 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    country: 'ไทย',
    marital_status: 'สมรส',
    military_status: 'ไม่ต้องเกณฑ์ทหาร',
    enlistment_date: '0000-00-00',
    ordained_temple: '',
    ordained_date:'0000-00-00',
    blood_type: 'B',
    weight: 53.0,
    height: 160.0,
    phone_number: '038777888',
    mobile_number1: '0987654321',
    mobile_number2: '',
    email1: 'sida.s@university.ac.th',
    email2: '',
    line_id: 'sida_s',
    budget_type: 'เงินงบประมาณรายได้',
    profile_picture: '/profiles/8.jpg',
    hobbies: 'ดูซีรีส์, ออกกำลังกาย',
    language_skills: 'ไทย, อังกฤษ',
    computer_skills: 'HRIS, Payroll Software',
    create_at: '2019-10-15',
    update_at: '2024-02-01',
    officer_id: 1002,
    faculty_id: 1,
    department_id: 1,
    program_id: 1,
    staff_status: 1,
    staff_type_id: 2,
    position_type_id: 2,
    job_title_id: 1,
    work_line_id: 202,
    position_level_id: 2,
    academic_position_id: 1,
    support_position_id: 3,
    admin_position_id: 1,
  },
  {
    staff_id: 1009,
    citizen_id: '1458555525584',
    foreigner_id: '',
    prefixname_id: 1,
    academic_title: 'นักวิชาการคอมพิวเตอร์',
    first_name_th: 'กฤกนก',
    last_name_th: 'กกกนิส',
    middle_name_th:'',
    first_name_en: 'Kritkanok',
    last_name_en: 'Kokkanis',
    middle_name_en: '',
    gender: 'ชาย',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    religion: 'พุทธ',
    date_of_birth: '1985-09-05',
    birth_province: 'ขอนแก่น',
    current_address: '999 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '999 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '999 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    country: 'ไทย',
    marital_status: 'สมรส',
    military_status: 'ได้รับการยกเว้น',
    enlistment_date: '0000-00-00',
    ordained_temple: '',
    ordained_date:'0000-00-00',
    blood_type: 'A',
    weight: 70.0,
    height: 172.0,
    phone_number: '043111222',
    mobile_number1: '0923456789',
    mobile_number2: '',
    email1: 'kritkanok.k@university.ac.th',
    email2: '',
    line_id: 'kritkanok_k',
    budget_type: 'งบประมาณแผ่นดิน',
    profile_picture: '/profiles/9.jpg',
    hobbies: 'เล่นเกม, ซ่อมคอม',
    language_skills: 'ไทย, อังกฤษ',
    computer_skills: 'Network Administration, Cybersecurity',
    create_at: '2014-06-12',
    update_at: '2023-11-20',
    officer_id: 1001,
    faculty_id: 6,
    department_id: 1,
    program_id: 1,
    staff_status: 1,
    staff_type_id: 2,
    position_type_id: 2,
    job_title_id: 1,
    work_line_id: 203,
    position_level_id: 4,
    academic_position_id: 1,
    support_position_id: 4,
    admin_position_id: 1,
  },
  {
    staff_id: 1010,
    citizen_id: '2369854441254',
    foreigner_id: '',
    prefixname_id: 2,
    academic_title: 'นักบัญชี',
    first_name_th: 'สุกสา',
    last_name_th: 'สุพล',
    middle_name_th:'',
    first_name_en: 'Suksa',
    last_name_en: 'Supol',
    middle_name_en: '',
    gender: 'หญิง',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    religion: 'พุทธ',
    date_of_birth: '1991-03-17',
    birth_province: 'อุบลราชธานี',
    current_address: '11 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '11 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '11 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    country: 'ไทย',
    marital_status: 'สมรส',
    military_status: 'ไม่ต้องเกณฑ์ทหาร',
    enlistment_date: '0000-00-00',
    ordained_temple: '',
    ordained_date:'0000-00-00',
    blood_type: 'O',
    weight: 52.0,
    height: 163.0,
    phone_number: '045333444',
    mobile_number1: '0934567890',
    mobile_number2: '',
    email1: 'suksa.s@university.ac.th',
    email2: '',
    line_id: 'suksa_s',
    budget_type: 'เงินงบประมาณรายได้',
    profile_picture: '/profiles/10.jpg',
    hobbies: 'ทำขนม, อ่านนิยาย',
    language_skills: 'ไทย, อังกฤษ',
    computer_skills: 'Accounting Software, Excel',
    create_at: '2017-09-01',
    update_at: '2024-03-05',
    officer_id: 1002,
    faculty_id: 1,
    department_id: 1,
    program_id: 1,
    staff_status: 1,
    staff_type_id: 2,
    position_type_id: 2,
    job_title_id: 1,
    work_line_id: 204,
    position_level_id: 3,
    academic_position_id: 1,
    support_position_id: 5,
    admin_position_id: 1,
  },
  {
    staff_id: 1011,
    citizen_id: '2552522225441',
    foreigner_id: '',
    prefixname_id: 2,
    academic_title: 'นักวิทยาศาสตร์',
    first_name_th: 'สมใจ',
    last_name_th: 'ใสจม',
    middle_name_th:'',
    first_name_en: 'Somjai',
    last_name_en: 'Saijom',
    middle_name_en: '',
    gender: 'หญิง',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    religion: 'พุทธ',
    date_of_birth: '1989-07-25',
    birth_province: 'สงขลา',
    current_address: '333 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '333 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '333 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    country: 'ไทย',
    marital_status: 'โสด',
    military_status: 'ไม่ต้องเกณฑ์ทหาร',
    enlistment_date: '0000-00-00',
    ordained_temple: '',
    ordained_date:'0000-00-00',
    blood_type: 'A',
    weight: 57.0,
    height: 167.0,
    phone_number: '074123456',
    mobile_number1: '0612345678',
    mobile_number2: '',
    email1: 'somjai.s@university.ac.th',
    email2: '',
    line_id: 'somjai_s',
    budget_type: 'งบประมาณแผ่นดิน',
    profile_picture: '/profiles/11.jpg',
    hobbies: 'เดินป่า, ดูนก',
    language_skills: 'ไทย, อังกฤษ',
    computer_skills: 'Scientific Software, Data Analysis Tools',
    create_at: '2015-02-20',
    update_at: '2023-12-10',
    officer_id: 1001,
    faculty_id: 4,
    department_id: 402,
    program_id: 1,
    staff_status: 1,
    staff_type_id: 2,
    position_type_id: 2,
    job_title_id: 1,
    work_line_id: 205,
    position_level_id: 3,
    academic_position_id: 1,
    support_position_id: 6,
    admin_position_id: 1,
  },
  {
    staff_id: 1012,
    citizen_id: '2568569998852',
    foreigner_id: '',
    prefixname_id: 2,
    academic_title: 'นักประชาสัมพันธ์',
    first_name_th: 'หฤทัย',
    last_name_th: 'ใจตรง',
    middle_name_th:'',
    first_name_en: 'Haruthai',
    last_name_en: 'Jaitrong',
    middle_name_en: '',
    gender: 'หญิง',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    religion: 'พุทธ',
    date_of_birth: '1993-10-08',
    birth_province: 'ภูเก็ต',
    current_address: '44 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    house_registration_address: '44 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    domicile_address: '44 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    country: 'ไทย',
    marital_status: 'สมรส',
    military_status: 'ไม่ต้องเกณฑ์ทหาร',
    enlistment_date: '0000-00-00',
    ordained_temple: '',
    ordained_date:'0000-00-00',
    blood_type: 'AB',
    weight: 59.0,
    height: 164.0,
    phone_number: '076987654',
    mobile_number1: '0623456789',
    mobile_number2: '',
    email1: 'haruthai.j@university.ac.th',
    email2: '',
    line_id: 'haruthai_j',
    budget_type: 'เงินงบประมาณรายได้',
    profile_picture: '/profiles/12.jpg',
    hobbies: 'เขียนบล็อก, โซเชียลมีเดีย',
    language_skills: 'ไทย, อังกฤษ, เยอรมัน',
    computer_skills: 'Content Management Systems, Graphic Design Software',
    create_at: '2020-04-01',
    update_at: '2024-05-15',
    officer_id: 1002,
    faculty_id: 7,
    department_id: 1,
    program_id: 1,
    staff_status: 1,
    staff_type_id: 2,
    position_type_id: 2,
    job_title_id: 1,
    work_line_id: 206,
    position_level_id: 2,
    academic_position_id: 1,
    support_position_id: 7,
    admin_position_id: 1,
  },

];

const Hr202 = () => {
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
      faculty_id: undefined,
      department_id: undefined,
      program_id: undefined,
      staff_status: undefined,
      staff_type_id: undefined,
      position_type_id: undefined,
      job_title_id: undefined,
      work_line_id: undefined,
      position_level_id: undefined,
      academic_position_id: undefined,
      support_position_id: undefined,
      admin_position_id: undefined,
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

    // Required fields
    if (!currentData?.first_name_th) {
      newErrors.first_name_th = 'กรุณากรอกชื่อ (ภาษาไทย)';
    }
    if (!currentData?.last_name_th) {
      newErrors.last_name_th = 'กรุณากรอกนามสกุล (ภาษาไทย)';
    }
    if (!currentData?.gender) {
        newErrors.gender = 'กรุณาเลือกเพศ';
    }
    if (!currentData?.prefixname_id) {
        newErrors.prefixname_id = 'กรุณาเลือกคำนำหน้าชื่อ';
    }
    if (!currentData?.date_of_birth) {
        newErrors.date_of_birth = 'กรุณาเลือกวันเกิด';
    }
    if (!currentData?.citizen_id && !currentData?.foreigner_id) {
        newErrors.citizen_id = 'กรุณากรอกเลขประจำตัวประชาชน หรือ เลขประจำตัวคนต่างด้าว';
        newErrors.foreigner_id = 'กรุณากรอกเลขประจำตัวประชาชน หรือ เลขประจำตัวคนต่างด้าว'; // เพิ่มเพื่อให้แสดง error ที่ทั้งสองช่อง
    }
    if (currentData?.officer_id === undefined || currentData?.officer_id === null || currentData?.officer_id <= 0) {
        newErrors.officer_id = 'กรุณากรอกรหัสผู้จัดการข้อมูล';
    }

    // New validations for other fields
    if (!currentData?.academic_title) {
      newErrors.academic_title = 'กรุณากรอกตำแหน่งทางวิชาการ';
    }
    if (!currentData?.first_name_en) {
      newErrors.first_name_en = 'กรุณากรอกชื่อ (ภาษาอังกฤษ)';
    }
    if (!currentData?.last_name_en) {
      newErrors.last_name_en = 'กรุณากรอกนามสกุล (ภาษาอังกฤษ)';
    }
    if (!currentData?.middle_name_th) {
      newErrors.middle_name_th = 'กรุณากรอกชื่อกลาง (ภาษาไทย)';
    }


    if (!currentData?.ethnicity) {
      newErrors.ethnicity = 'กรุณากรอกเชื้อชาติ';
    }
    if (!currentData?.nationality) {
      newErrors.nationality = 'กรุณากรอกสัญชาติ';
    }
    if (!currentData?.religion) {
      newErrors.religion = 'กรุณากรอกศาสนา';
    }
    if (!currentData?.birth_province) {
      newErrors.birth_province = 'กรุณากรอกจังหวัดที่เกิด';
    }
    if (!currentData?.current_address) {
      newErrors.current_address = 'กรุณากรอกที่อยู่ปัจจุบัน';
    }
    if (!currentData?.house_registration_address) {
      newErrors.house_registration_address = 'กรุณากรอกที่อยู่ตามทะเบียนบ้าน';
    }
    if (!currentData?.domicile_address) {
      newErrors.domicile_address = 'กรุณากรอกที่อยู่ภูมิลำเนา';
    }
    if (!currentData?.country) {
      newErrors.country = 'กรุณากรอกประเทศ';
    }
    if (!currentData?.marital_status) {
      newErrors.marital_status = 'กรุณาเลือกสถานภาพการสมรส';
    }
    if (!currentData?.military_status) {
      newErrors.military_status = 'กรุณาเลือกสถานภาพทางการทหาร';
    }
    if (!currentData?.blood_type) {
      newErrors.blood_type = 'กรุณาเลือกหมู่โลหิต';
    }
    
    // Validate weight and height as numbers and greater than 0
    if (currentData?.weight === undefined || currentData?.weight === null || currentData?.weight <= 0) {
      newErrors.weight = 'กรุณากรอกน้ำหนักที่ถูกต้อง';
    }
    if (currentData?.height === undefined || currentData?.height === null || currentData?.height <= 0) {
      newErrors.height = 'กรุณากรอกส่วนสูงที่ถูกต้อง';
    }

    if (!currentData?.mobile_number1) {
      newErrors.mobile_number1 = 'กรุณากรอกเบอร์มือถือ 1';
    }

    // Basic email validation
    if (!currentData?.email1 || !/\S+@\S+\.\S+/.test(currentData.email1)) {
      newErrors.email1 = 'กรุณากรอกอีเมล 1 ที่ถูกต้อง';
    }

    if (!currentData?.budget_type) {
      newErrors.budget_type = 'กรุณาเลือกประเภทงบประมาณ';
    }
    if (!currentData?.faculty_id) {
      newErrors.faculty_id = 'กรุณาเลือกคณะหน่วยงาน';
    }
    if (!currentData?.department_id) {
      newErrors.department_id = 'กรุณาเลือกภาควิชา/สาขาวิชา';
    }
    if (!currentData?.program_id) {
      newErrors.program_id = 'กรุณาเลือกหลักสูตร';
    }
    if (!currentData?.staff_status) {
      newErrors.staff_status = 'กรุณาเลือกสถานะบุคลากร';
    }
    if (!currentData?.staff_type_id) {
      newErrors.staff_type_id = 'กรุณาเลือกประเภทบุคลากร';
    }
    if (!currentData?.position_type_id) {
      newErrors.position_type_id = 'กรุณาเลือกตำแหน่งประเภท';
    }
    if (!currentData?.job_title_id) {
      newErrors.job_title_id = 'กรุณาเลือกตำแหน่งสายงาน';
    }
    if (!currentData?.work_line_id) {
      newErrors.work_line_id = 'กรุณาเลือกสายงาน';
    }
    if (!currentData?.position_level_id) {
      newErrors.position_level_id = 'กรุณาเลือกระดับตำแหน่ง';
    }
    if (!currentData?.academic_position_id) {
      newErrors.academic_position_id = 'กรุณาเลือกตำแหน่งทางสายวิชาการ';
    }
    if (!currentData?.support_position_id) {
      newErrors.support_position_id = 'กรุณาเลือกตำแหน่งทางสายสนับสนุน';
    }
    if (!currentData?.admin_position_id) {
      newErrors.admin_position_id = 'กรุณาเลือกตำแหน่งบริหาร';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveData = () => {
    if (!validateData()) {
      return;
    }

    if (dialogMode === 'add') {
      const newId = tableData.length > 0 ?
        Math.max(...tableData.map(d => d.staff_id)) + 1 : 1;
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

  const faculty_id_Options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ];
  const department_id_Options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ];
  const program_id_Options = [
    { value: '0', label: 'ไม่มีหลักสูตร' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ];
  const staff_status_Options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ];
  const staff_type_id_Options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ];
  const position_type_id_Options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' }, 
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ];
  const job_title_id_Options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ];
  const work_line_id_Options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ]; 
  const position_level_id_Options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ];
  const academic_position_id_Options = [
    { value: '0', label: 'ไม่มี'},
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ];
  const support_position_id_Options = [
    { value: '0', label: 'ไม่มี'},
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
  ];
  const admin_position_id_Options = [
    { value: '0', label: 'ไม่มี'},
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
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
            <IconButton
              edge="start"
              color="inherit"
              onClick={onCloseAddTask}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h3" component="div">
              {dialogTitle}ข้อมูลประวัติบุคลากร <strong style={{ color: 'darkorange' }}></strong>
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 3 }}>
        <Grid container spacing={2}></Grid>
        <Avatar
              src={currentData?.profile_picture || ''}
              sx={{
                width: 80,// เพิ่มขนาดเป็น 80px
                height: 80,// เพิ่มขนาดเป็น 80px
                marginRight: '16px',
                border: '2px solid #f0f0f0',
                borderRadius: '50%',
              }}
            >
              {!currentData?.profile_picture && <MdAccountCircle style={{fontSize: '4rem',color: '#757575' }} />}
            </Avatar>
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
                error={!!errors.prefixname_id}
                helperText={errors.prefixname_id}
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
                label="ตำแหน่งทางวิชาการ"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.academic_title || ''}
                name="academic_title"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.academic_title}
                helperText={errors.academic_title}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ชื่อ (ภาษาไทย)"
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
                label="นามสกุล (ภาษาไทย)"
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
                label="ชื่อกลาง (ภาษาไทย)"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.middle_name_th || ''}
                name="middle_name_th"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.middle_name_th}
                helperText={errors.middle_name_th}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ชื่อ (ภาษาอังกฤษ)"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.first_name_en || ''}
                name="first_name_en"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.first_name_en}
                helperText={errors.first_name_en}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="นามสกุล (ภาษาอังกฤษ)"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.last_name_en || ''}
                name="last_name_en"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.last_name_en}
                helperText={errors.last_name_en}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ชื่อกลาง (ภาษาอังกฤษ)"
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
                error={!!errors.ethnicity}
                helperText={errors.ethnicity}
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
                error={!!errors.nationality}
                helperText={errors.nationality}
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
                error={!!errors.religion}
                helperText={errors.religion}
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
                error={!!errors.birth_province}
                helperText={errors.birth_province}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ที่อยู่ปัจจุบัน"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.current_address || ''}
                name="current_address"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.current_address}
                helperText={errors.current_address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ที่อยู่ตามทะเบียนบ้าน"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.house_registration_address || ''}
                name="house_registration_address"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.house_registration_address}
                helperText={errors.house_registration_address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ที่อยู่ภูมิลำเนา"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.domicile_address || ''}
                name="domicile_address"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.domicile_address}
                helperText={errors.domicile_address}
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
                error={!!errors.country}
                helperText={errors.country}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="สถานภาพการสมรส"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.marital_status || ''}
                name="marital_status"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.marital_status}
                helperText={errors.marital_status}
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
                error={!!errors.military_status}
                helperText={errors.military_status}
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
                label="วันที่เกณฑ์ทหาร"
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
                label="หมู่โลหิต"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.blood_type || ''}
                name="blood_type"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.blood_type}
                helperText={errors.blood_type}
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
                error={!!errors.weight}
                helperText={errors.weight}
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
                error={!!errors.height}
                helperText={errors.height}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="เบอร์โทรศัพท์"
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
                label="เบอร์มือถือ 1"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.mobile_number1 || ''}
                name="mobile_number1"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.mobile_number1}
                helperText={errors.mobile_number1}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="เบอร์มือถือ 2"
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
                value={currentData?.email1 || ''}
                name="email1"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.email1}
                helperText={errors.email1}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="อีเมล 2"
                variant="outlined"
                margin="normal"
                size="small"
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
                error={!!errors.budget_type}
                helperText={errors.budget_type}
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="งานอดิเรก"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.hobbies || ''}
                name="hobbies"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ทักษะทางภาษา"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.language_skills || ''}
                name="language_skills"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ทักษะคอมพิวเตอร์"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.computer_skills || ''}
                name="computer_skills"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
              />
            </Grid>

              <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="คณะหน่วยงาน"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.faculty_id || ''}
                name="faculty_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.faculty_id}
                helperText={errors.faculty_id}
              >
                {faculty_id_Options.map((option) => (
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
                label="ภาควิชา/สาขาวิชา"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.department_id || ''}
                name="department_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.department_id}
                helperText={errors.department_id}
              >
                {department_id_Options.map((option) => (
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
                label="หลักสูตร"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.program_id || ''}
                name="program_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.program_id}
                helperText={errors.program_id}
              >
                {program_id_Options.map((option) => (
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
                label="สถานะบุคลากร"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.staff_status || ''} 
                name="staff_status"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.staff_status}
                helperText={errors.staff_status}
              >
                {staff_status_Options.map((option) => (
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
                label="ประเภทบุคลากร"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.staff_type_id || ''}  
                name="staff_type_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.staff_type_id}
                helperText={errors.staff_type_id}
              >
                {staff_type_id_Options.map((option) => (
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
                label="ตำแหน่งประเภท"
                 variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.position_type_id || ''}  
                name="position_type_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.position_type_id}
                helperText={errors.position_type_id}
              >
                {position_type_id_Options.map((option) => (
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
                label="ตำแหน่งสายงาน"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.job_title_id || ''}  
                name="job_title_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.job_title_id}
                helperText={errors.job_title_id}
              >
                {job_title_id_Options.map((option) => (
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
                label="รายชื่อสายงาน"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.work_line_id || ''}  
                name="work_line_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.work_line_id}
                helperText={errors.work_line_id}
              >
                {work_line_id_Options.map((option) => (
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
                label="ระดับตำแหน่ง"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.position_level_id || ''}  
                name="position_level_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.position_level_id}
                helperText={errors.position_level_id}
              >
                {position_level_id_Options.map((option) => (
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
                label="ตำแหน่งทางสายวิชาการ"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.academic_position_id || ''}  
                name="academic_position_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.academic_position_id}
                helperText={errors.academic_position_id}
              >
                {academic_position_id_Options.map((option) => (
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
                label="ตำแหน่งทางสายสนับสนุน"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.support_position_id || ''}  
                name="support_position_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.support_position_id}
                helperText={errors.support_position_id}
              >
                {support_position_id_Options.map((option) => (
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
                label="ตำแหน่งบริหาร"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.admin_position_id || ''}  
                name="admin_position_id"
                onChange={handleInputChange}
                disabled={dialogMode === 'view'}
                error={!!errors.admin_position_id}
                helperText={errors.admin_position_id}
              >
                {admin_position_id_Options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="สร้างเมื่อ"
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
                label="อัปเดตเมื่อ"
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

export default Hr202;
 


