//hr202/index.tsx
'use client';
import React, { useReducer, useEffect } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import Swal from 'sweetalert2';
import { Autocomplete, TextField, Grid, Button, Box, MenuItem, Tabs, Tab, Typography } from '@mui/material'; // นำเข้า Tabs, Tab, Typography เพิ่มเติม [cite: 269]
import EducationReference from './tabdata/EducationReference';
import SalaryInfo from './tabdata/SalaryInfo';
import NameChangeHistory from './tabdata/NameChangeHistory';
import WorkHistory from './tabdata/WorkHistory';
import FamilyPassportInfo from './tabdata/FamilyPassportInfo';
import WorkPermitSupportSkills from './tabdata/WorkPermitSupportSkills';
import AcademicSkills from './tabdata/AcademicSkills';
import SupportExpertise from './tabdata/SupportExpertise';
import AcademicExpertise from './tabdata/AcademicExpertise';
import DocumentInfo from './tabdata/DocumentInfo';



// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง (จาก Staff model) ---
export interface StaffData {
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

// กำหนดประเภทข้อมูลสำหรับ Autocomplete option
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

// --- Options สำหรับ Dropdown (ย้ายมาไว้ในไฟล์เดียวกัน) ---
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

// --- SearchStaff Component (ย้ายมาเป็น Sub-Component) ---
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
    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', mb: 3 }}>
      <IntlMessages id="common.searchStaff" defaultMessage="ค้นหาบุคลากร" />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Autocomplete
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
                size="small"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* สามารถเพิ่มปุ่มค้นหาหรือส่วนอื่น ๆ ที่เกี่ยวข้องกับการค้นหาได้ที่นี่ */}
        </Grid>
      </Grid>
    </Box>
  );
};

// --- StaffDetailForm Component (ย้ายมาเป็น Sub-Component) ---
interface StaffDetailFormProps {
  formData: StaffData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

const StaffDetailForm: React.FC<StaffDetailFormProps> = ({
  formData,
  handleInputChange,
  handleSave,
  handleCancel,
}) => {
  return (
    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', mt: 3 }}>
      <IntlMessages id="common.staffDetails" defaultMessage="ข้อมูลทั่วไป" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="รหัสบุคลากร"
            variant="outlined"
            margin="normal"
            size="small"
            name="staff_id"
            disabled={true}
            fullWidth
            value={formData.staff_id || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="เลขประจำตัวประชาชน"
            variant="outlined"
            margin="normal"
            size="small"
            name="citizen_id"
            value={formData.citizen_id || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="เลขประจำตัวคนต่างด้าว"
            variant="outlined"
            margin="normal"
            size="small"
            name="foreigner_id"
            value={formData.foreigner_id || ''}
            onChange={handleInputChange}
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
            name="prefixname_id"
            value={formData.prefixname_id || ''}
            onChange={handleInputChange}
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
            name="academic_title"
            value={formData.academic_title || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ชื่อ (ไทย)"
            variant="outlined"
            margin="normal"
            size="small"
            name="first_name_th"
            value={formData.first_name_th || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ชื่อกลาง (ไทย)"
            variant="outlined"
            margin="normal"
            size="small"
            name="middle_name_th"
            value={formData.middle_name_th || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="นามสกุล (ไทย)"
            variant="outlined"
            margin="normal"
            size="small"
            name="last_name_th"
            value={formData.last_name_th || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ชื่อ (อังกฤษ)"
            variant="outlined"
            margin="normal"
            size="small"
            name="first_name_en"
            value={formData.first_name_en || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ชื่อกลาง (อังกฤษ)"
            variant="outlined"
            margin="normal"
            size="small"
            name="middle_name_en"
            value={formData.middle_name_en || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="นามสกุล (อังกฤษ)"
            variant="outlined"
            margin="normal"
            size="small"
            name="last_name_en"
            value={formData.last_name_en || ''}
            onChange={handleInputChange}
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
            name="gender"
            value={formData.gender || ''}
            onChange={handleInputChange}
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
            name="ethnicity"
            value={formData.ethnicity || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="สัญชาติ"
              variant="outlined"
              margin="normal"
              size="small"
              name="nationality"
              value={formData.nationality || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ศาสนา"
              variant="outlined"
              margin="normal"
              size="small"
              name="religion"
              value={formData.religion || ''}
              onChange={handleInputChange}
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
              name="date_of_birth"
              value={formData.date_of_birth || ''}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="จังหวัดที่เกิด"
              variant="outlined"
              margin="normal"
              size="small"
              name="birth_province"
              value={formData.birth_province || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ที่อยู่ปัจจุบัน"
              variant="outlined"
              margin="normal"
              size="small"
              name="current_address"
              value={formData.current_address || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ที่อยู่ตามทะเบียนบ้าน"
              variant="outlined"
              margin="normal"
              size="small"
              name="house_registration_address"
              value={formData.house_registration_address || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ที่อยู่ภูมิลำเนา"
              variant="outlined"
              margin="normal"
              size="small"
              name="domicile_address"
              value={formData.domicile_address || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ประเทศ"
              variant="outlined"
              margin="normal"
              size="small"
              name="country"
              value={formData.country || ''}
              onChange={handleInputChange}
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
              name="marital_status"
              value={formData.marital_status || ''}
              onChange={handleInputChange}
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
              name="military_status"
              value={formData.military_status || ''}
              onChange={handleInputChange}
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
              name="enlistment_date"
              value={formData.enlistment_date || ''}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="อุปสมบท ณ วัด"
              variant="outlined"
              margin="normal"
              size="small"
              name="ordained_temple"
              value={formData.ordained_temple || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="วันที่อุปสมบท"
              variant="outlined"
              margin="normal"
              size="small"
              type="date"
              name="ordained_date"
              value={formData.ordained_date || ''}
              onChange={handleInputChange}
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
              name="blood_type"
              value={formData.blood_type || ''}
              onChange={handleInputChange}
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
              label="น้ำหนัก"
              variant="outlined"
              margin="normal"
              size="small"
              name="weight"
              type="number"
              value={formData.weight || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ส่วนสูง"
              variant="outlined"
              margin="normal"
              size="small"
              name="height"
              type="number"
              value={formData.height || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="เบอร์โทรศัพท์บ้าน"
              variant="outlined"
              margin="normal"
              size="small"
              name="phone_number"
              value={formData.phone_number || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="เบอร์โทรศัพท์มือถือ 1"
              variant="outlined"
              margin="normal"
              size="small"
              name="mobile_number1"
              value={formData.mobile_number1 || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="เบอร์โทรศัพท์มือถือ 2"
              variant="outlined"
              margin="normal"
              size="small"
              name="mobile_number2"
              value={formData.mobile_number2 || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="อีเมล 1"
              variant="outlined"
              margin="normal"
              size="small"
              name="email1"
              type="email"
              value={formData.email1 || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="อีเมล 2"
              variant="outlined"
              margin="normal"
              size="small"
              name="email2"
              type="email"
              value={formData.email2 || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Line ID"
              variant="outlined"
              margin="normal"
              size="small"
              name="line_id"
              value={formData.line_id || ''}
              onChange={handleInputChange}
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
              name="budget_type"
              value={formData.budget_type || ''}
              onChange={handleInputChange}
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
              label="ลิงก์รูปโปรไฟล์"
              variant="outlined"
              margin="normal"
              size="small"
              name="profile_picture"
              value={formData.profile_picture || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="งานอดิเรก"
              variant="outlined"
              margin="normal"
              size="small"
              name="hobbies"
              value={formData.hobbies || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ทักษะภาษา"
              variant="outlined"
              margin="normal"
              size="small"
              name="language_skills"
              value={formData.language_skills || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ทักษะคอมพิวเตอร์"
              variant="outlined"
              margin="normal"
              size="small"
              name="computer_skills"
              value={formData.computer_skills || ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="วันที่สร้างข้อมูล"
              variant="outlined"
              margin="normal"
              size="small"
              type="date"
              name="create_at"
              disabled={true}
              value={formData.create_at || ''}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="วันที่ปรับปรุงข้อมูล"
              variant="outlined"
              margin="normal"
              size="small"
              type="date"
              name="update_at"
              disabled={true}
              value={formData.update_at || ''}
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
              name="officer_id"
              type="number"
              value={formData.officer_id || ''}
              onChange={handleInputChange}
            />
          </Grid>
      </Grid>
      <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ px: 4 }}
        >
          บันทึก
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
          sx={{ px: 4 }}
        >
          ยกเลิก
        </Button>
      </Box>
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
      house_registration_address: '123 Main Street, New York, USA',
      domicile_address: '123 Main Street, New York, USA', country: 'USA',
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
      gender: 'ชาย', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ',
      date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา', current_address: '777 หมู่ 9 ตำบลในเมือง อำเภอเมือง จังหวัดนครราชสีมา 30000',
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
      first_name_th: 'สีดา', last_name_th: 'สีใจ', middle_name_th: '', first_name_en: 'Suthep', last_name_en: 'Inprom',
      middle_name_en: '', gender: 'หญิง', ethnicity: 'ไทย', nationality: 'ไทย', religion: 'พุทธ', date_of_birth: '1982-12-10', birth_province: 'นครราชสีมา',
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
            <Tab label="ข้อมูลครอบครัวหนังสือเดินทาง" {...a11yProps(5)} />
            <Tab label="ใบอนุญาตทำงานความเชี่ยวชาญในสายงานสนับสนุน" {...a11yProps(6)} />
            <Tab label="ความเชี่ยวชาญในสายงานวิชาการ" {...a11yProps(7)} />
            <Tab label="ข้อมูลเอกสาร" {...a11yProps(8)} />
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
          <EducationReference />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <SalaryInfo />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <NameChangeHistory />
        </TabPanel>
        <TabPanel value={currentTab} index={4}>
          <WorkHistory />
        </TabPanel>
        <TabPanel value={currentTab} index={5}>
          <FamilyPassportInfo />
        </TabPanel>
        <TabPanel value={currentTab} index={6}>
          <WorkPermitSupportSkills />
        </TabPanel>
        <TabPanel value={currentTab} index={7}>
          <AcademicSkills />
        </TabPanel>
        <TabPanel value={currentTab} index={8}>
          <DocumentInfo />
        </TabPanel>
  
      </Box>
    </AppCard>
  );
};

export default Hr202;