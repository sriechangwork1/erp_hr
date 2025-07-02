//hr202/index.tsx
'use client';
import React, { useReducer, useEffect } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import Swal from 'sweetalert2';
import { Autocomplete, TextField, Grid, Button, Box, MenuItem, Tabs, Tab, Typography } from '@mui/material';

// นำเข้า StaffDetailForm ที่แยกออกมา
import StaffDetailForm, { StaffData } from './tabdata/StaffDetailForm';
import EducationReference from './tabdata/EducationReference';
import SalaryInfo from './tabdata/SalaryInfo';
import NameChangeHistory from './tabdata/NameChangeHistory';
import WorkHistory from './tabdata/WorkHistory';
import Family from './tabdata/Family';
import PassportInfo from './tabdata/PassportInfo';
import WorkPermit from './tabdata/WorkPermit';
import AcademicSkills from './tabdata/AcademicSkills';
import SupportExpertise from './tabdata/SupportExpertise';
import AcademicExpertise from './tabdata/AcademicExpertise';
import DocumentInfo from './tabdata/DocumentInfo';

// --- กำหนดประเภทข้อมูลสำหรับ Autocomplete option (คงไว้ที่นี่ถ้า StaffDetailForm ไม่ได้ใช้) ---
export interface StaffAutoCompleteOption {
  staff_id: number;
  prefixname_id: string;
  first_name_th: string;
  last_name_th: string;
}

// Helper to format date to YYYY-MM-DD or return empty string for '1900-01-01'
const formatDate = (dateString: string | undefined): string => {
  if (!dateString || dateString === '1900-01-01T00:00:00.000Z' || dateString === '1900-01-01' || dateString.startsWith('0000-00-00')) {
    return '';
  }
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return date.toISOString().split('T')[0];
  } catch (e) {
    console.error("Error formatting date:", dateString, e);
    return '';
  }
};

// Initial state สำหรับ useReducer
const initialFormData: StaffData = { staff_id: 0 };

// Reducer function สำหรับจัดการ state ของฟอร์ม
type FormAction =
  | { type: 'RESET_FORM' }
  | { type: 'SET_FORM_DATA'; payload: StaffData }
  | { type: 'UPDATE_FIELD'; payload: { name: string; value: any } };

const formReducer = (state: StaffData, action: FormAction): StaffData => {
  switch (action.type) {
    case 'RESET_FORM':
      return initialFormData;
    case 'SET_FORM_DATA':
      return { ...action.payload };
    case 'UPDATE_FIELD':
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};

// --- SearchStaff Component (ยังคงอยู่ที่นี่หรือแยกออกไปก็ได้) ---
interface SearchStaffProps {
  staffDetail: StaffAutoCompleteOption[];
  selectedStaffOption: StaffAutoCompleteOption | null;
  onStaffSelect: (event: React.SyntheticEvent, value: StaffAutoCompleteOption | null) => void;
}

const SearchStaff: React.FC<SearchStaffProps> = ({
  staffDetail,
  selectedStaffOption,
  onStaffSelect,
}) => {
  return (
    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', mb: 12 }}>
      <IntlMessages id="common.searchStaff" defaultMessage="ค้นหาบุคลากร" />
      <Grid  xs={6} sm={6} spacing={1} alignItems="center">{/*container*/}
       <Grid item xs={12}>
          <Autocomplete
            fullWidth
            options={staffDetail}
            getOptionLabel={(option) => `${option.prefixname_id || ''} ${option.first_name_th} ${option.last_name_th}`}
            onChange={onStaffSelect}
            value={selectedStaffOption}
            isOptionEqualToValue={(option, value) => option.staff_id === value.staff_id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="ค้นหาบุคลากร (ชื่อ-นามสกุล)"
                variant="outlined"
                margin="normal"
                size="medium"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>  
          {/* สามารถเพิ่มปุ่มค้นหาหรือส่วนอื่น ๆ ที่เกี่ยวข้องกับการค้นหาได้ที่นี่ */}
        </Grid>
      </Grid>
    </Box>
  );
};


// --- TabPanel Component ---
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// --- Hr202 Component (Main Component) ---
const Hr202 = () => {
  const intl = useIntl();
  const [selectedStaffOption, setSelectedStaffOption] = React.useState<StaffAutoCompleteOption | null>(null);
  const [formData, dispatch] = useReducer(formReducer, initialFormData);
  const [currentTab, setCurrentTab] = React.useState(0); // State สำหรับควบคุม Tab

  // Data for Autocomplete
  const staffDetail: StaffAutoCompleteOption[] = [
    {staff_id:1001,prefixname_id:'นาย',first_name_th:'สมชาย',last_name_th:'วงศ์สวัสดิ์'},
    {staff_id:1002,prefixname_id:'นางสาว',first_name_th:'สมหญิง',last_name_th:'ศรีสุข'},
    {staff_id:1003,prefixname_id:'นาย',first_name_th:'นายเทสดี',last_name_th:'มีรวย'},
    {staff_id:1004,prefixname_id:'นางสาว',first_name_th:'นงลักษณ์',last_name_th:'แก้วมณี'},
    {staff_id:1005,prefixname_id:'นาย',first_name_th:'สุเทพ',last_name_th:'อินทร์พรหม'},
    {staff_id:1006,prefixname_id:'นาย',first_name_th:'สุดใจ',last_name_th:'อิ่มเอม'},
    {staff_id:1007,prefixname_id:'นาย',first_name_th:'สุดสาคร',last_name_th:'ใจดี'},
    {staff_id:1008,prefixname_id:'นางสาว',first_name_th:'สีดา',last_name_th:'สีใจ'},
    {staff_id:1009,prefixname_id:'นาย',first_name_th:'กฤกนก',last_name_th:'กกกนิส'},
    {staff_id:1010,prefixname_id:'นาย',first_name_th:'สุกสา',last_name_th:'สุพล'},
    {staff_id:1011,prefixname_id:'นางสาว',first_name_th:'สมใจ',last_name_th:'ใสจม'},
    {staff_id:1012,prefixname_id:'นางสาว',first_name_th:'หฤทัย',last_name_th:'ใจตรง'}
  ];

  // ข้อมูลจำลองเริ่มต้นสำหรับตาราง Staff (เทียบเท่า initialAllStaffs ของคุณ)
  const allStaffsData: StaffData[] = [
    // {
    //   staff_id: 1001, citizen_id: '1100501234567', foreigner_id: '101', prefixname_id: 1, academic_title: 'รองศาสตราจารย์',
    //   first_name_th: 'สมชาย', last_name_th: 'วงศ์สวัสดิ์', middle_name_th: 'เกียรติ', first_name_en: 'Somchai', last_name_en: 'Wongsawat', middle_name_en: 'Kiat',
    //   gender: 'ชาย', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1975-08-15', birth_province: 'กรุงเทพมหานคร',
    //   current_address: '123 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900',
    //   house_registration_address: '456 หมู่ 2 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120',
    //   domicile_address: '456 หมู่ 2 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120', country: 'ไทย',
    //   marital_status: 'สมรส', military_status: 'ผ่านการเกณฑ์ทหาร', enlistment_date: '1995-04-01', ordained_temple:'', ordained_date: '2025-05-05',
    //   blood_type: 'A', weight: 72.5, height: 175.5, phone_number: '022987654', mobile_number1: '0812345678', mobile_number2: '0898765432',
    //   email1: 'somchai.w@university.ac.th', email2: 'somchai.w@gmail.com', line_id: 'somchai_w',
    //   budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/1.jpg', hobbies: 'อ่านหนังสือ, เล่นกอล์ฟ',
    //   language_skills: 'ไทย, อังกฤษ', computer_skills: 'Microsoft Office, Python, Data Analysis',
    //   create_at: '2010-05-15', update_at: '2023-06-20', officer_id: 1001
    // },
    // {
    //   staff_id: 1002, citizen_id: '3100507654321', foreigner_id: '101', prefixname_id: 2, academic_title: 'test',
    //   first_name_th: 'สมหญิง', last_name_th: 'ศรีสุข', middle_name_th: '', first_name_en: 'Somying', last_name_en: 'Srisuk', middle_name_en: '',
    //   gender: 'หญิง', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1985-11-22', birth_province: 'เชียงใหม่',
    //   current_address: '456 หมู่ 5 ตำบลสุเทพ อำเภอเมือง จังหวัดเชียงใหม่ 50200',
    //   house_registration_address: '789 ถนนเจริญเมือง ตำบลศรีภูมิ อำเภอเมือง จังหวัดเชียงใหม่ 50200',
    //   domicile_address: '789 ถนนเจริญเมือง ตำบลศรีภูมิ อำเภอเมือง จังหวัดเชียงใหม่ 50200', country: 'ไทย',
    //   marital_status: 'โสด', military_status: 'ไม่ต้องเกณฑ์ทหาร', enlistment_date: '2025-05-28', ordained_temple:'', ordained_date: '2025-05-05',
    //   blood_type: 'B', weight: 55.0, height: 162.0, phone_number: '053123456', mobile_number1: '0891234567', mobile_number2: '-',
    //   email1: 'somying.s@university.ac.th', email2: '-', line_id: 'somying_s',
    //   budget_type: 'เงินงบประมาณรายได้', profile_picture: '/profiles/2.jpg', hobbies: 'ทำอาหาร, ปลูกต้นไม้',
    //   language_skills: 'ไทย, อังกฤษ, จีน', computer_skills: 'Microsoft Office, Database Management',
    //   create_at: '2015-03-10', update_at: '2023-06-18', officer_id: 1001
    // },
    // {
    //   staff_id: 1003, citizen_id: '1460255525547', foreigner_id: 'PASSPORT123456', prefixname_id: 1, academic_title: 'ศาสตราจารย์',
    //   first_name_th: 'นายเทสดี', last_name_th: 'มีรวย', middle_name_th: '', first_name_en: 'David', last_name_en: 'Wilson', middle_name_en: 'James',
    //   gender: 'ชาย', ethnicity: 'Caucasian', nationality: 'American', religion: 'Christian', date_of_birth: '1968-03-30', birth_province: 'New York',
    //   current_address: '789 Faculty Village, University Campus',
    //   house_registration_address: '123 Main Street, New York, USA',
    //   domicile_address: '123 Main Street, New York, USA', country: 'USA',
    //   marital_status: 'สมรส', military_status: 'ไม่ต้องเกณฑ์ทหาร', enlistment_date: '2025-05-28', ordained_temple:'', ordained_date: '2025-05-05',
    //   blood_type: 'O', weight: 80.0, height: 182.0, phone_number: '', mobile_number1: '0823456789', mobile_number2: '-',
    //   email1: 'david.w@university.ac.th', email2: 'david.wilson@gmail.com', line_id: 'david_w',
    //   budget_type: 'เงินงบประมาณรายได้', profile_picture: '/profiles/3.jpg', hobbies: 'Photography, Traveling',
    //   language_skills: 'English, French', computer_skills: 'Machine Learning, AI Research',
    //   create_at: '2012-07-20', update_at: '2023-06-15', officer_id: 1001
    // },
    // {
    //   staff_id: 1004, citizen_id: '5100509876543', foreigner_id: '101', prefixname_id: 3, academic_title: 'test',
    //   first_name_th: 'นงลักษณ์', last_name_th: 'แก้วมณี', middle_name_th: 'รัตน์', first_name_en: 'Nonglak', last_name_en: 'Kaewmanee', middle_name_en: 'Rat',
    //   gender: 'หญิง', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1990-05-18', birth_province: 'นนทบุรี',
    //   current_address: '321 หมู่ 4 ตำบลบางกระสอ อำเภอเมือง จังหวัดนนทบุรี 11000',
    //   house_registration_address: '111 หมู่ 1 ตำบลบางพลัด อำเภอบางพลัด จังหวัดกรุงเทพมหานคร 10700',
    //   domicile_address: '111 หมู่ 1 ตำบลบางพลัด อำเภอบางพลัด จังหวัดกรุงเทพมหานคร 10700', country: 'ไทย',
    //   marital_status: 'หย่าร้าง', military_status: 'ไม่ต้องเกณฑ์ทหาร', enlistment_date: '2025-05-28', ordained_temple:'', ordained_date: '2025-05-05',
    //   blood_type: 'AB', weight: 58.0, height: 165.0, phone_number: '025554321', mobile_number1: '0856789123', mobile_number2: '0867891234',
    //   email1: 'nonglak.k@university.ac.th', email2: 'nonglak.k@gmail.com', line_id: 'nonglak_k',
    //   budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/4.jpg', hobbies: 'ดูหนัง, ฟังเพลง',
    //   language_skills: 'ไทย, อังกฤษ', computer_skills: 'HR Software, Microsoft Office',
    //   create_at: '2018-09-05', update_at: '2023-06-22', officer_id: 1001
    // },
    // {
    //   staff_id: 1005, citizen_id: '2100504567890', foreigner_id: '101', prefixname_id: 1, academic_title: 'test',
    //   first_name_th: 'สุเทพ', last_name_th: 'อินทร์พรหม', middle_name_th: '', first_name_en: 'Suthep', last_name_en: 'Inprom', middle_name_en: '',
    //   gender: 'ชาย', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา',
    //   current_address: '555 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    //   house_registration_address: '222 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    //   domicile_address: '222 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000', country: 'ไทย',
    //   marital_status: 'สมรส', military_status: 'ได้รับการยกเว้น', enlistment_date: '2025-05-28', ordained_temple: 'วัดสระแก้ว', ordained_date: '2001-07-15',
    //   blood_type: 'B', weight: 68.0, height: 170.0, phone_number: '044333444', mobile_number1: '0878912345', mobile_number2: '-',
    //   email1: 'suthep.i@university.ac.th', email2: '-', line_id: 'suthep_i',
    //   budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/5.jpg', hobbies: 'เลี้ยงปลา, ทำสวน',
    //   language_skills: 'ไทย, อังกฤษ', computer_skills: 'Medical Software, Laboratory Equipment',
    //   create_at: '2016-11-30', update_at: '2023-06-25', officer_id: 1001
    // },
    // {
    //   staff_id: 1006, citizen_id: '1458555525584', foreigner_id: '101', prefixname_id: 1, academic_title: 'test',
    //   first_name_th: 'สุดใจ', last_name_th: 'อิ่มเอม', middle_name_th: '', first_name_en: 'Suthep', last_name_en: 'Inprom', middle_name_en: '',
    //   gender: 'ชาย', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา',
    //   current_address: '666 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    //   house_registration_address: '222 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    //   domicile_address: '666 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000', country: 'ไทย',
    //   marital_status: 'สมรส', military_status: 'ได้รับการยกเว้น', enlistment_date: '2025-05-28', ordained_temple: 'วัดสระแก้ว', ordained_date: '2001-07-15',
    //   blood_type: 'B', weight: 68.0, height: 170.0, phone_number: '044333444', mobile_number1: '0878912345', mobile_number2: '-',
    //   email1: 'suthep.i@university.ac.th', email2: '-', line_id: 'suthep_i',
    //   budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/5.jpg', hobbies: 'เลี้ยงปลา, ทำสวน',
    //   language_skills: 'ไทย, อังกฤษ', computer_skills: 'Medical Software, Laboratory Equipment',
    //   create_at: '2016-11-30', update_at: '2023-06-25', officer_id: 1001
    // },
    // {
    //   staff_id: 1007, citizen_id: '3658588858885', foreigner_id: '101', prefixname_id: 1, academic_title: 'test',
    //   first_name_th: 'สุดสาคร', last_name_th: 'ใจดี', middle_name_th: '', first_name_en: 'Suthep', last_name_en: 'Inprom', middle_name_en: '',
    //   gender: 'ชาย', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ',
    //   date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา', current_address: '777 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    //   house_registration_address: '222 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    //   domicile_address: '777 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000', country: 'ไทย',
    //   marital_status: 'สมรส', military_status: 'ได้รับการยกเว้น', enlistment_date: '2025-05-28', ordained_temple: 'วัดสระแก้ว', ordained_date: '2001-07-15',
    //   blood_type: 'B', weight: 68.0, height: 170.0, phone_number: '044333444', mobile_number1: '0878912345', mobile_number2: '-',
    //   email1: 'suthep.i@university.ac.th', email2: '-', line_id: 'suthep_i',
    //   budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/5.jpg', hobbies: 'เลี้ยงปลา, ทำสวน',
    //   language_skills: 'ไทย, อังกฤษ', computer_skills: 'Medical Software, Laboratory Equipment',
    //   create_at: '2016-11-30', update_at: '2023-06-25', officer_id: 1001
    // },
    // {
    //   staff_id: 1008, citizen_id: '1458544478852', foreigner_id: '101', prefixname_id: 1, academic_title: 'test',
    //   first_name_th: 'สีดา', last_name_th: 'สีใจ', middle_name_th: '', first_name_en: 'Suthep', last_name_en: 'Inprom',
    //   middle_name_en: '', gender: 'หญิง', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา',
    //   current_address: '888 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    //   house_registration_address: '888 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000',
    //   domicile_address: '888 หมู่ 3 ตำบลโพธิ์กลาง อำเภอเมือง จังหวัดนครราชสีมา 30000', country: 'ไทย',
    //   marital_status: 'สมรส', military_status: 'ได้รับการยกเว้น', enlistment_date: '2025-05-28', ordained_temple: 'วัดสระแก้ว', ordained_date: '2001-07-15',
    //   blood_type: 'B', weight: 68.0, height: 170.0, phone_number: '044333444', mobile_number1: '0878912345', mobile_number2: '-',
    //   email1: 'suthep.i@university.ac.th', email2: '-', line_id: 'suthep_i',
    //   budget_type: 'งบประมาณแผ่นดิน', profile_picture: '/profiles/5.jpg', hobbies: 'เลี้ยงปลา, ทำสวน',
    //   language_skills: 'ไทย, อังกฤษ', computer_skills: 'Medical Software, Laboratory Equipment',
    //   create_at: '2016-11-30', update_at: '2023-06-25', officer_id: 1001
    // },
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

  useEffect(() => {
    if (selectedStaffOption) {
      const staff = allStaffsData.find(s => s.staff_id === selectedStaffOption.staff_id);
      if (staff) {
        dispatch({ type: 'SET_FORM_DATA', payload: staff });
      }
    } else {
      dispatch({ type: 'RESET_FORM' });
    }
  }, [selectedStaffOption]); // เพิ่ม allStaffsData ใน dependency array

  const handleStaffSelect = (event: React.SyntheticEvent, value: StaffAutoCompleteOption | null) => {
    setSelectedStaffOption(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      dispatch({ type: 'UPDATE_FIELD', payload: { name, value } });
    }
  };

  const handleSave = () => {
    // ในสถานการณ์จริง คุณจะส่ง formData ไปยัง Backend API
    console.log("Saving data:", formData);
    Swal.fire({
      icon: 'success',
      title: 'บันทึกข้อมูลสำเร็จ!',
      text: `ข้อมูลบุคลากร ${formData.first_name_th} ${formData.last_name_th} ได้รับการบันทึกแล้ว`,
      confirmButtonText: 'ตกลง'
    });
  };

  // Handler for canceling the form
  const handleCancel = () => {
    Swal.fire({
      icon: 'warning',
      title: 'ยกเลิกการแก้ไข?',
      text: 'ข้อมูลที่คุณแก้ไขจะไม่ถูกบันทึก',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ยกเลิก',
      cancelButtonText: 'ไม่',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'RESET_FORM' });
        setSelectedStaffOption(null); // Clear selected staff in Autocomplete
        Swal.fire('ยกเลิกแล้ว!', 'ข้อมูลถูกรีเซ็ตแล้ว', 'info');
      }
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <AppCard
      contentStyle={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 8 }}
      title={<IntlMessages id="sidebar.hr02.02" defaultMessage="HR202 ข้อมูลบุคลากร" />}
    >
      <SearchStaff
        staffDetail={staffDetail}
        selectedStaffOption={selectedStaffOption}
        onStaffSelect={handleStaffSelect}
      />

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleTabChange} aria-label="ข้อมูลบุคลากร" variant="scrollable" scrollButtons="auto">
            <Tab label="ข้อมูลทั่วไป" {...a11yProps(0)} />
            <Tab label="ข้อมูลอ้างอิงการศึกษา" {...a11yProps(1)} />
            <Tab label="ข้อมูลเงินเดือน" {...a11yProps(2)} />
            <Tab label="ข้อมูลประวัติการเปลี่ยนชื่อ-สกุล" {...a11yProps(3)} />
            <Tab label="ข้อมูลประวัติการทำงาน" {...a11yProps(4)} />
            <Tab label="ข้อมูลครอบครัว" {...a11yProps(5)} />
            <Tab label="ข้อมูลหนังสือเดินทาง" {...a11yProps(6)} />
            <Tab label="ใบอนุญาตทำงาน" {...a11yProps(7)} />
            <Tab label="ความเชี่ยวชาญในสายงานสนับสนุน" {...a11yProps(8)} />
            <Tab label="ความเชี่ยวชาญในสายงานวิชาการ" {...a11yProps(9)} />
            <Tab label="ข้อมูลเอกสาร" {...a11yProps(10)} />
          </Tabs>
        </Box>
        <TabPanel value={currentTab} index={0}>
          <StaffDetailForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        </TabPanel>
      <TabPanel value={currentTab} index={1}>
           <EducationReference selectedStaffIdProp={selectedStaffOption?.staff_id || null} />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <SalaryInfo  selectedStaffIdProp={selectedStaffOption?.staff_id || null} />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <NameChangeHistory selectedStaffIdProp={selectedStaffOption?.staff_id || null} />
        </TabPanel>
        <TabPanel value={currentTab} index={4}>
          <WorkHistory selectedStaffIdProp={selectedStaffOption?.staff_id || null} />
        </TabPanel>
        <TabPanel value={currentTab} index={5}>
          <Family selectedStaffIdProp={selectedStaffOption?.staff_id || null}/>
        </TabPanel>
        <TabPanel value={currentTab} index={6}>
          <PassportInfo selectedStaffIdProp={selectedStaffOption?.staff_id || null}/>
        </TabPanel>
        <TabPanel value={currentTab} index={7}>
          <WorkPermit selectedStaffIdProp={selectedStaffOption?.staff_id || null}/>
        </TabPanel>
        <TabPanel value={currentTab} index={8}>
          <SupportExpertise selectedStaffIdProp={selectedStaffOption?.staff_id || null}/>
        </TabPanel>
        <TabPanel value={currentTab} index={9}>
          <AcademicExpertise selectedStaffIdProp={selectedStaffOption?.staff_id || null} />
        </TabPanel>
        <TabPanel value={currentTab} index={10}>
          <DocumentInfo selectedStaffIdProp={selectedStaffOption?.staff_id || null}/>
        </TabPanel>
      </Box>
    </AppCard>
  );
};

export default Hr202;