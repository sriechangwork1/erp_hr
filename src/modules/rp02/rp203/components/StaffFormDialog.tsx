import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,  
} from '@mui/material';
import Swal from 'sweetalert2';
import { StaffData } from '../types/StaffData'; // ตรวจสอบเส้นทาง import ให้ถูกต้อง

// Mock CustomIntlMessages และ useIntl เพื่อให้โค้ดทำงานได้สมบูรณ์ในตัวอย่างนี้
// หากคุณมีไฟล์ IntlMessages จริงๆ ให้ใช้ของจริงแทน
const CustomIntlMessages: React.FC<{ id: string; defaultMessage: string }> = ({ defaultMessage }) => <>{defaultMessage}</>;

const useIntl = () => ({
  messages: {
    dialog_add_new_staff: 'เพิ่มบุคลากรใหม่',
    dialog_edit_staff: 'แก้ไขข้อมูลบุคลากร',
    citizen_id: 'เลขบัตรประชาชน',
    academic_year: 'ปีการศึกษา',
    semester: 'ภาคเรียน',
    univ_id: 'รหัส มทร.',
    prefix_name_id: 'คำนำหน้า',
    stf_fname: 'ชื่อจริง (ไทย)',
    stf_mname: 'ชื่อกลาง (ไทย)',
    stf_lname: 'นามสกุล (ไทย)',
    stf_fname_en: 'ชื่อจริง (อังกฤษ)',
    stf_mname_en: 'ชื่อกลาง (อังกฤษ)',
    stf_lname_en: 'นามสกุล (อังกฤษ)',
    gender_id: 'เพศ',
    gender_male: 'ชาย',
    gender_female: 'หญิง',
    birthday: 'วันเกิด',
    homeadd: 'บ้านเลขที่',
    moo: 'หมู่',
    street: 'ถนน/ซอย',
    sub_district_id: 'ตำบล/แขวง',
    telephone: 'เบอร์โทรศัพท์',
    email: 'อีเมล',
    zipcode: 'รหัสไปรษณีย์',
    nationality_id: 'สัญชาติ',
    stafftype_id: 'ประเภทบุคลากร',
    time_contact_id: 'ประเภทการติดต่อ',
    budget_id: 'ประเภทงบประมาณ',
    substafftype_id: 'ประเภทบุคลากรย่อย',
    admin_position_id: 'ตำแหน่งบริหาร',
    academicstanding_id: 'วิทยฐานะ',
    positionlevel_id: 'ระดับตำแหน่ง',
    position_id: 'ตำแหน่ง',
    position_type_id: 'ประเภทตำแหน่ง',
    class_id: 'รหัสประเภทบุคลากร',
    class_code: 'รหัสกลุ่มบุคลากร',
    faculty_id: 'คณะ',
    department_id: 'สาขา',
    division_id: 'กอง',
    section_id: 'แผนก',
    work_status_id: 'สถานะการทำงาน',
    tax_status_id: 'สถานะภาษี',
    salary: 'เงินเดือน',
    pos_no: 'เลขที่ตำแหน่ง',
    appointed_date: 'วันที่บรรจุ',
    retired_date: 'วันที่เกษียณ',
    status_id: 'สถานะ (ในระบบ)',
    save_changes: 'บันทึกการเปลี่ยนแปลง',
    cancel: 'ยกเลิก',
    validation_required: 'ฟิลด์นี้จำเป็นต้องกรอก',
    validation_citizen_id_format: 'เลขบัตรประชาชนไม่ถูกต้อง (13 หลัก)',
    validation_email_format: 'รูปแบบอีเมลไม่ถูกต้อง',
    validation_date_order: 'วันที่เกษียณต้องไม่ก่อนวันที่บรรจุ',
    dialog_data_invalid_title: 'ข้อมูลไม่ถูกต้อง',
    dialog_data_invalid_text: 'โปรดตรวจสอบข้อมูลที่กรอกให้ครบถ้วนและถูกต้อง',
    // เพิ่มข้อความสำหรับ dropdown options ที่อาจต้องการแปล
    staff_type_lecturer: 'อาจารย์',
    staff_type_support: 'สายสนับสนุน',
  },
});

interface StaffFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (staff: StaffData) => void;
  initialData: StaffData | null;
  academicYears: string[]; // ส่ง academicYears เข้ามาเพื่อใช้ใน dropdown
}

const StaffFormDialog: React.FC<StaffFormDialogProps> = ({ open, onClose, onSave, initialData, academicYears }) => {
  const { messages } = useIntl();
  const [formData, setFormData] = useState<StaffData>({
    ds2001_id: 0,
    academic_year: '',
    semester: '',
    univ_id: '',
    citizen_id: '',
    prefix_name_id: '',
    stf_fname: '',
    stf_mname: '',
    stf_lname: '',
    stf_fname_en: '',
    stf_mname_en: '',
    stf_lname_en: '',
    gender_id: '',
    birthday: '',
    homeadd: '',
    moo: '',
    street: '',
    sub_district_id: '',
    telephone: '',
    email: '',
    zipcode: '',
    nationality_id: '',
    stafftype_id: '',
    time_contact_id: '',
    budget_id: '',
    substafftype_id: '',
    admin_position_id: '',
    academicstanding_id: '',
    positionlevel_id: '',
    position_id: '',
    position_type_id: '',
    class_id: '',
    class_code: '',
    faculty_id: '',
    department_id: '',
    division_id: '',
    section_id: '',
    work_status_id: '',
    tax_status_id: '',
    salary: '',
    pos_no: '',
    appointed_date: '',
    retired_date: '',
    status_id: '',
    verification_status: 'pending', // Default status for new staff
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Reset form data and errors when dialog opens or initialData changes
  useEffect(() => {
    if (open) { // Only reset when dialog opens
      if (initialData) {
        setFormData(initialData);
      } else {
        // Reset to default values for new entry
        setFormData({
          ds2001_id: 0,
          academic_year: '',
          semester: '',
          univ_id: '',
          citizen_id: '',
          prefix_name_id: '',
          stf_fname: '',
          stf_mname: '',
          stf_lname: '',
          stf_fname_en: '',
          stf_mname_en: '',
          stf_lname_en: '',
          gender_id: '',
          birthday: '',
          homeadd: '',
          moo: '',
          street: '',
          sub_district_id: '',
          telephone: '',
          email: '',
          zipcode: '',
          nationality_id: '',
          stafftype_id: '',
          time_contact_id: '',
          budget_id: '',
          substafftype_id: '',
          admin_position_id: '',
          academicstanding_id: '',
          positionlevel_id: '',
          position_id: '',
          position_type_id: '',
          class_id: '',
          class_code: '',
          faculty_id: '',
          department_id: '',
          division_id: '',
          section_id: '',
          work_status_id: '',
          tax_status_id: '',
          salary: '',
          pos_no: '',
          appointed_date: '',
          retired_date: '',
          status_id: '',
          verification_status: 'pending',
        });
      }
      setErrors({}); // Clear errors
    }
  }, [initialData, open]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name as keyof StaffData]: value,
    }));
    // Clear error for the field being changed
    if (errors[name as keyof StaffData]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof StaffData];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Basic required field validation for a few key fields
    if (!formData.citizen_id) newErrors.citizen_id = messages.validation_required;
    else if (!/^\d{13}$/.test(formData.citizen_id)) newErrors.citizen_id = messages.validation_citizen_id_format;

    if (!formData.stf_fname) newErrors.stf_fname = messages.validation_required;
    if (!formData.stf_lname) newErrors.stf_lname = messages.validation_required;
    if (!formData.gender_id) newErrors.gender_id = messages.validation_required;
    if (!formData.academic_year) newErrors.academic_year = messages.validation_required;
    if (!formData.appointed_date) newErrors.appointed_date = messages.validation_required;
    if (!formData.stafftype_id) newErrors.stafftype_id = messages.validation_required;
    if (!formData.email && formData.email !== '') newErrors.email = messages.validation_required; // Email can be empty or validated if present
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = messages.validation_email_format;
    }

    if (formData.appointed_date && formData.retired_date) {
      if (new Date(formData.retired_date) < new Date(formData.appointed_date)) {
        newErrors.retired_date = messages.validation_date_order;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    } else {
      Swal.fire({
        title: messages.dialog_data_invalid_title,
        text: messages.dialog_data_invalid_text,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
      <DialogTitle id="form-dialog-title">
        {initialData ? <CustomIntlMessages id="dialog_edit_staff" defaultMessage="แก้ไขข้อมูลบุคลากร" /> : <CustomIntlMessages id="dialog_add_new_staff" defaultMessage="เพิ่มบุคลากรใหม่" />}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} component="div">
            <TextField
              margin="dense"
              name="citizen_id"
              label={<CustomIntlMessages id="citizen_id" defaultMessage="เลขบัตรประชาชน" />}
              type="text"
              fullWidth
              value={formData.citizen_id}
              onChange={handleChange}
              error={!!errors.citizen_id}
              helperText={errors.citizen_id}
              inputProps={{ maxLength: 13 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} component="div">
            <FormControl fullWidth margin="dense" error={!!errors.prefix_name_id}>
              <InputLabel><CustomIntlMessages id="prefix_name_id" defaultMessage="คำนำหน้า" /></InputLabel>
              <Select
                name="prefix_name_id"
                value={formData.prefix_name_id}
                label={<CustomIntlMessages id="prefix_name_id" defaultMessage="คำนำหน้า" />}
                //onChange={handleChange}
              >
                <MenuItem value="1">นาย</MenuItem>
                <MenuItem value="2">นาง</MenuItem>
                <MenuItem value="3">นางสาว</MenuItem>
                <MenuItem value="4">ผศ.ดร.</MenuItem>
                {/* เพิ่มคำนำหน้าอื่นๆ ตามที่ต้องการ */}
              </Select>
              {errors.prefix_name_id && <FormHelperText>{errors.prefix_name_id}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} component="div">
            <TextField
              margin="dense"
              name="stf_fname"
              label={<CustomIntlMessages id="stf_fname" defaultMessage="ชื่อจริง (ไทย)" />}
              type="text"
              fullWidth
              value={formData.stf_fname}
              onChange={handleChange}
              error={!!errors.stf_fname}
              helperText={errors.stf_fname}
            />
          </Grid>
          <Grid item xs={12} sm={4} component="div"> 
            <TextField
              margin="dense"
              name="stf_mname"
              label={<CustomIntlMessages id="stf_mname" defaultMessage="ชื่อกลาง (ไทย)" />}
              type="text"
              fullWidth
              value={formData.stf_mname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} component="div"> 
            <TextField
              margin="dense"
              name="stf_lname"
              label={<CustomIntlMessages id="stf_lname" defaultMessage="นามสกุล (ไทย)" />}
              type="text"
              fullWidth
              value={formData.stf_lname}
              onChange={handleChange}
              error={!!errors.stf_lname}
              helperText={errors.stf_lname}
            />
          </Grid>
          <Grid item xs={12} sm={4} component="div"> 
            <TextField
              margin="dense"
              name="stf_fname_en"
              label={<CustomIntlMessages id="stf_fname_en" defaultMessage="ชื่อจริง (อังกฤษ)" />}
              type="text"
              fullWidth
              value={formData.stf_fname_en}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} component="div"> 
            <TextField
              margin="dense"
              name="stf_mname_en"
              label={<CustomIntlMessages id="stf_mname_en" defaultMessage="ชื่อกลาง (อังกฤษ)" />}
              type="text"
              fullWidth
              value={formData.stf_mname_en}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} component="div"> 
            <TextField
              margin="dense"
              name="stf_lname_en"
              label={<CustomIntlMessages id="stf_lname_en" defaultMessage="นามสกุล (อังกฤษ)" />}
              type="text"
              fullWidth
              value={formData.stf_lname_en}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4} component="div"> 
            <FormControl fullWidth margin="dense" error={!!errors.gender_id}>
              <InputLabel><CustomIntlMessages id="gender_id" defaultMessage="เพศ" /></InputLabel>
              <Select
                name="gender_id"
                value={formData.gender_id}
                label={<CustomIntlMessages id="gender_id" defaultMessage="เพศ" />}
                //onChange={handleChange}
              >
                <MenuItem value="1"><CustomIntlMessages id="gender_male" defaultMessage="ชาย" /></MenuItem>
                <MenuItem value="2"><CustomIntlMessages id="gender_female" defaultMessage="หญิง" /></MenuItem>
              </Select>
              {errors.gender_id && <FormHelperText>{errors.gender_id}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} component="div"> 
            <TextField
              margin="dense"
              name="birthday"
              label={<CustomIntlMessages id="birthday" defaultMessage="วันเกิด" />}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.birthday}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4} component="div"> 
            <TextField
              margin="dense"
              name="telephone"
              label={<CustomIntlMessages id="telephone" defaultMessage="เบอร์โทรศัพท์" />}
              type="text"
              fullWidth
              value={formData.telephone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="email"
              label={<CustomIntlMessages id="email" defaultMessage="อีเมล" />}
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense" error={!!errors.academic_year}>
              <InputLabel><CustomIntlMessages id="academic_year" defaultMessage="ปีการศึกษา" /></InputLabel>
              <Select
                name="academic_year"
                value={formData.academic_year}
                label={<CustomIntlMessages id="academic_year" defaultMessage="ปีการศึกษา" />}
                //onChange={handleChange}
              >
                {/* ใช้ academicYears ที่ส่งมาจาก prop */}
                {academicYears.map((year) => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
                 <MenuItem value="2567">2567</MenuItem>
                 <MenuItem value="2568">2568</MenuItem>
                 <MenuItem value="2569">2569</MenuItem>
                 <MenuItem value="2570">2570</MenuItem>
              </Select>
              {errors.academic_year && <FormHelperText>{errors.academic_year}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense" error={!!errors.semester}>
              <InputLabel><CustomIntlMessages id="semester" defaultMessage="ภาคเรียน" /></InputLabel>
              <Select
                name="semester"
                value={formData.semester}
                label={<CustomIntlMessages id="semester" defaultMessage="ภาคเรียน" />}
                //onChange={handleChange}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </Select>
              {errors.semester && <FormHelperText>{errors.semester}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="appointed_date"
              label={<CustomIntlMessages id="appointed_date" defaultMessage="วันที่บรรจุ" />}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.appointed_date}
              onChange={handleChange}
              error={!!errors.appointed_date}
              helperText={errors.appointed_date}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="retired_date"
              label={<CustomIntlMessages id="retired_date" defaultMessage="วันที่เกษียณ" />}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.retired_date}
              onChange={handleChange}
              error={!!errors.retired_date}
              helperText={errors.retired_date}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense" error={!!errors.stafftype_id}>
              <InputLabel><CustomIntlMessages id="stafftype_id" defaultMessage="ประเภทบุคลากร" /></InputLabel>
              <Select
                name="stafftype_id"
                value={formData.stafftype_id}
                label={<CustomIntlMessages id="stafftype_id" defaultMessage="ประเภทบุคลากร" />}
                //onChange={handleChange}
              >
                <MenuItem value="1"><CustomIntlMessages id="staff_type_lecturer" defaultMessage="อาจารย์" /></MenuItem>
                <MenuItem value="2"><CustomIntlMessages id="staff_type_support" defaultMessage="สายสนับสนุน" /></MenuItem>
                <MenuItem value="5">พนักงานจ้างเหมา</MenuItem>
                {/* เพิ่มประเภทบุคลากรอื่นๆ ตาม stafftype_id ที่มี */}
              </Select>
              {errors.stafftype_id && <FormHelperText>{errors.stafftype_id}</FormHelperText>}
            </FormControl>
          </Grid>
          {/* เพิ่มฟิลด์อื่นๆ ตาม StaffData interface ของคุณ */}
          {/* ตัวอย่าง: */}
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="homeadd"
              label={<CustomIntlMessages id="homeadd" defaultMessage="บ้านเลขที่" />}
              type="text"
              fullWidth
              value={formData.homeadd}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="moo"
              label={<CustomIntlMessages id="moo" defaultMessage="หมู่" />}
              type="text"
              fullWidth
              value={formData.moo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="street"
              label={<CustomIntlMessages id="street" defaultMessage="ถนน/ซอย" />}
              type="text"
              fullWidth
              value={formData.street}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="sub_district_id"
              label={<CustomIntlMessages id="sub_district_id" defaultMessage="ตำบล/แขวง" />}
              type="text"
              fullWidth
              value={formData.sub_district_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="zipcode"
              label={<CustomIntlMessages id="zipcode" defaultMessage="รหัสไปรษณีย์" />}
              type="text"
              fullWidth
              value={formData.zipcode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="nationality_id"
              label={<CustomIntlMessages id="nationality_id" defaultMessage="สัญชาติ" />}
              type="text"
              fullWidth
              value={formData.nationality_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="univ_id"
              label={<CustomIntlMessages id="univ_id" defaultMessage="รหัส มทร." />}
              type="text"
              fullWidth
              value={formData.univ_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel><CustomIntlMessages id="time_contact_id" defaultMessage="ประเภทการติดต่อ" /></InputLabel>
              <Select
                name="time_contact_id"
                value={formData.time_contact_id}
                label={<CustomIntlMessages id="time_contact_id" defaultMessage="ประเภทการติดต่อ" />}
                //onChange={handleChange}
              >
                <MenuItem value="1">เต็มเวลา</MenuItem>
                <MenuItem value="2">ไม่เต็มเวลา</MenuItem>
                <MenuItem value="4">พนักงานราชการ</MenuItem>
                {/* เพิ่ม options ตามข้อมูลจริง */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel><CustomIntlMessages id="budget_id" defaultMessage="ประเภทงบประมาณ" /></InputLabel>
              <Select
                name="budget_id"
                value={formData.budget_id}
                label={<CustomIntlMessages id="budget_id" defaultMessage="ประเภทงบประมาณ" />}
                //onChange={handleChange}
              >
                <MenuItem value="1">งบประมาณแผ่นดิน</MenuItem>
                <MenuItem value="2">งบประมาณรายได้</MenuItem>
                {/* เพิ่ม options ตามข้อมูลจริง */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel><CustomIntlMessages id="substafftype_id" defaultMessage="ประเภทบุคลากรย่อย" /></InputLabel>
              <Select
                name="substafftype_id"
                value={formData.substafftype_id}
                label={<CustomIntlMessages id="substafftype_id" defaultMessage="ประเภทบุคลากรย่อย" />}
                //onChange={handleChange}
              >
                <MenuItem value="1">ข้าราชการ</MenuItem>
                <MenuItem value="2">พนักงานมหาวิทยาลัย</MenuItem>
                {/* เพิ่ม options ตามข้อมูลจริง */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="admin_position_id"
              label={<CustomIntlMessages id="admin_position_id" defaultMessage="ตำแหน่งบริหาร" />}
              type="text"
              fullWidth
              value={formData.admin_position_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="academicstanding_id"
              label={<CustomIntlMessages id="academicstanding_id" defaultMessage="วิทยฐานะ" />}
              type="text"
              fullWidth
              value={formData.academicstanding_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="positionlevel_id"
              label={<CustomIntlMessages id="positionlevel_id" defaultMessage="ระดับตำแหน่ง" />}
              type="text"
              fullWidth
              value={formData.positionlevel_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="position_id"
              label={<CustomIntlMessages id="position_id" defaultMessage="ตำแหน่ง" />}
              type="text"
              fullWidth
              value={formData.position_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel><CustomIntlMessages id="position_type_id" defaultMessage="ประเภทตำแหน่ง" /></InputLabel>
              <Select
                name="position_type_id"
                value={formData.position_type_id}
                label={<CustomIntlMessages id="position_type_id" defaultMessage="ประเภทตำแหน่ง" />}
                //onChange={handleChange}
              >
                <MenuItem value="1">วิชาการ</MenuItem>
                <MenuItem value="2">บริหาร</MenuItem>
                <MenuItem value="3">จ้างเหมา</MenuItem>
                {/* เพิ่ม options ตามข้อมูลจริง */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="class_id"
              label={<CustomIntlMessages id="class_id" defaultMessage="รหัสประเภทบุคลากร" />}
              type="text"
              fullWidth
              value={formData.class_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="class_code"
              label={<CustomIntlMessages id="class_code" defaultMessage="รหัสกลุ่มบุคลากร" />}
              type="text"
              fullWidth
              value={formData.class_code}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="faculty_id"
              label={<CustomIntlMessages id="faculty_id" defaultMessage="คณะ" />}
              type="text"
              fullWidth
              value={formData.faculty_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="department_id"
              label={<CustomIntlMessages id="department_id" defaultMessage="สาขา" />}
              type="text"
              fullWidth
              value={formData.department_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="division_id"
              label={<CustomIntlMessages id="division_id" defaultMessage="กอง" />}
              type="text"
              fullWidth
              value={formData.division_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="section_id"
              label={<CustomIntlMessages id="section_id" defaultMessage="แผนก" />}
              type="text"
              fullWidth
              value={formData.section_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel><CustomIntlMessages id="work_status_id" defaultMessage="สถานะการทำงาน" /></InputLabel>
              <Select
                name="work_status_id"
                value={formData.work_status_id}
                label={<CustomIntlMessages id="work_status_id" defaultMessage="สถานะการทำงาน" />}
                //onChange={handleChange}
              >
                <MenuItem value="1">ปกติ</MenuItem>
                <MenuItem value="2">ลาออก</MenuItem>
                <MenuItem value="3">เกษียณ</MenuItem>
                {/* เพิ่ม options ตามข้อมูลจริง */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel><CustomIntlMessages id="tax_status_id" defaultMessage="สถานะภาษี" /></InputLabel>
              <Select
                name="tax_status_id"
                value={formData.tax_status_id}
                label={<CustomIntlMessages id="tax_status_id" defaultMessage="สถานะภาษี" />}
                //onChange={handleChange}
              >
                <MenuItem value="1">มีภาษี</MenuItem>
                <MenuItem value="2">ไม่มีภาษี</MenuItem>
                {/* เพิ่ม options ตามข้อมูลจริง */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="salary"
              label={<CustomIntlMessages id="salary" defaultMessage="เงินเดือน" />}
              type="number"
              fullWidth
              value={formData.salary}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              name="pos_no"
              label={<CustomIntlMessages id="pos_no" defaultMessage="เลขที่ตำแหน่ง" />}
              type="text"
              fullWidth
              value={formData.pos_no}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel><CustomIntlMessages id="status_id" defaultMessage="สถานะ (ในระบบ)" /></InputLabel>
              <Select
                name="status_id"
                value={formData.status_id}
                label={<CustomIntlMessages id="status_id" defaultMessage="สถานะ (ในระบบ)" />}
                //onChange={handleChange}
              >
                <MenuItem value="1">ใช้งาน</MenuItem>
                <MenuItem value="0">ไม่ใช้งาน</MenuItem>
                {/* เพิ่ม options ตามข้อมูลจริง */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          <CustomIntlMessages id="cancel" defaultMessage="ยกเลิก" />
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          <CustomIntlMessages id="save_changes" defaultMessage="บันทึกการเปลี่ยนแปลง" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StaffFormDialog;