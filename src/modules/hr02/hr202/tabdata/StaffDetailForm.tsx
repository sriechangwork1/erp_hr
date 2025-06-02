// StaffDetailForm.tsx
import React from 'react';
import {
  TextField,
  Grid,
  Button,
  Box,
  MenuItem,
  Typography,
} from '@mui/material';
import IntlMessages from '@crema/helpers/IntlMessages'; // อย่าลืมนำเข้า IntlMessages

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

// --- Options สำหรับ Dropdown (ย้ายมาไว้ในไฟล์เดียวกันหรือนำเข้าจากที่อื่น) ---
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

// --- StaffDetailForm Component ---
interface StaffDetailFormProps {
  formData: StaffData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => void;
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

export default StaffDetailForm;