'use client';
import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import IntlMessagesMain from '@crema/helpers/IntlMessages';
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Paper,
  TextField,
} from '@mui/material';
import Swal from 'sweetalert2';

// สำหรับ Export Excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// สำหรับ Export PDF
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// หากต้องการใช้ Font ภาษาไทยใน PDF ต้องติดตั้งและตั้งค่า Font เพิ่มเติม
// ตัวอย่าง: npm install jspdf-autotable-font-loader
// import 'jspdf-autotable-font-loader/font/THSarabunNew';

// Components ที่สร้างขึ้นมา
import StaffTable from './components/StaffTable';
import StaffFormDialog from './components/StaffFormDialog';
import { StaffData, allStaffData } from './types/StaffData';

// --- จำลองคอมโพเนนต์พื้นฐานที่อาจมาจากไลบรารีอื่น (เช่น @crema) ---
const AppCard: React.FC<{ children: React.ReactNode; title?: string; sx?: any }> = ({ children, title, sx }) => {
  return (
    <Paper sx={{ p: 4, ...sx }}>
      {title && (
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
};

const AppsContent: React.FC<{ children: React.ReactNode; sx?: any }> = ({ children, sx }) => {
  return (
    <Container maxWidth="xl" sx={{ my: 4, ...sx }}>
      {children}
    </Container>
  );
};

// Mock CustomIntlMessages และ useIntl เพื่อให้โค้ดทำงานได้ในตัวอย่าง
// หากคุณมีระบบ IntlMessages/Localization จริงๆ ให้ใช้ของจริงแทน
const CustomIntlMessages: React.FC<{ id: string; defaultMessage: string }> = ({ defaultMessage }) => <>{defaultMessage}</>;

const useIntl = () => ({
  messages: {
    common_search: 'ค้นหา',
    common_filter: 'ตัวกรอง',
    common_no_data: 'ไม่มีข้อมูลที่ตรงกับเงื่อนไข',
    table_rows_per_page: 'จำนวนแถวต่อหน้า:',
    year_all: 'ทั้งหมด',
    semester_all: 'ทั้งหมด',
    generate_report_button: 'สร้างรายงาน',
    export_excel_button: 'ส่งออกข้อมูลเป็น Excel',
    export_pdf_button: 'ส่งออกข้อมูลเป็น PDF',
    staff_management_title: 'ข้อมูลพื้นฐานบุคลากร (UOC Staff)',
    add_new_staff: 'เพิ่มบุคลากรใหม่',
    import_data: 'ประมวลผลข้อมูล', // เปลี่ยนกลับเป็น "ประมวลผลข้อมูล"
    verify_staff: 'ตรวจสอบข้อมูลบุคลากร',
    academic_year: 'ปีการศึกษา',
    semester: 'ภาคเรียน',
    status: 'สถานะ',
    all_status: 'ทั้งหมด',
    verified: 'ยืนยันแล้ว',
    pending: 'รอดำเนินการ',
    rejected: 'ถูกปฏิเสธ',
    edit: 'แก้ไข',
    delete: 'ลบ',
    verify: 'ตรวจสอบ',
    confirm_delete: 'ยืนยันการลบ',
    confirm_delete_message: 'คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?',
    delete_success: 'ลบข้อมูลสำเร็จ',
    delete_error: 'เกิดข้อผิดพลาดในการลบข้อมูล',
    save_changes: 'บันทึกการเปลี่ยนแปลง',
    cancel: 'ยกเลิก',
    verify_success: 'ตรวจสอบข้อมูลสำเร็จ',
    verify_error: 'เกิดข้อผิดพลาดในการตรวจสอบข้อมูล',
    citizen_id: 'เลขบัตรประชาชน',
    full_name: 'ชื่อ-นามสกุล',
    appointed_date: 'วันที่บรรจุ',
    retired_date: 'วันที่เกษียณ',
    actions: 'การดำเนินการ',
    // ข้อความสำหรับ validation (จาก StaffFormDialog)
    validation_required: 'ฟิลด์นี้จำเป็นต้องกรอก',
    validation_citizen_id_format: 'เลขบัตรประชาชนไม่ถูกต้อง (13 หลัก)',
    validation_email_format: 'รูปแบบอีเมลไม่ถูกต้อง',
    validation_date_order: 'วันที่เกษียณต้องไม่ก่อนวันที่บรรจุ',
    dialog_data_invalid_title: 'ข้อมูลไม่ถูกต้อง',
    dialog_data_invalid_text: 'โปรดตรวจสอบข้อมูลที่กรอกให้ครบถ้วนและถูกต้อง',
    dialog_add_new_staff: 'เพิ่มบุคลากรใหม่',
    dialog_edit_staff: 'แก้ไขข้อมูลบุคลากร',
    full_name_first: 'ชื่อ',
    full_name_middle: 'ชื่อกลาง (ถ้ามี)',
    full_name_last: 'นามสกุล',
    gender: 'เพศ',
    gender_male: 'ชาย',
    gender_female: 'หญิง',
    email: 'อีเมล',
    phone_number: 'เบอร์โทรศัพท์',
    staff_type: 'ประเภทบุคลากร',
    staff_type_lecturer: 'อาจารย์',
    staff_type_support: 'สายสนับสนุน',
  },
});


const UocStaffManagement: React.FC = () => {
  const { messages } = useIntl();
  const [allStaffs, setAllStaffs] = useState<StaffData[]>(allStaffData);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'verified' | 'pending' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [isLoading, setIsLoading] = useState<boolean>(false); // ลบออก

  // States for StaffFormDialog
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [currentStaffToEdit, setCurrentStaffToEdit] = useState<StaffData | null>(null);

  // Generate unique academic years and semesters from data
  const academicYears = Array.from(new Set(allStaffs.map((staff) => staff.academic_year))).sort();
  const semesters = Array.from(new Set(allStaffs.map((staff) => staff.semester))).sort();

  const filteredData = allStaffs.filter((staff) => {
    const matchesYear = selectedYear ? staff.academic_year === selectedYear : true;
    const matchesSemester = selectedSemester ? staff.semester === selectedSemester : true;
    const matchesStatus = selectedStatus === 'all' ? true : staff.verification_status === selectedStatus;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matchesSearch = searchTerm
      ? staff.citizen_id.toLowerCase().includes(lowerCaseSearchTerm) ||
        staff.stf_fname.toLowerCase().includes(lowerCaseSearchTerm) ||
        (staff.stf_mname && staff.stf_mname.toLowerCase().includes(lowerCaseSearchTerm)) ||
        staff.stf_lname.toLowerCase().includes(lowerCaseSearchTerm) ||
        staff.stf_email.toLowerCase().includes(lowerCaseSearchTerm) ||
        staff.stf_phone.toLowerCase().includes(lowerCaseSearchTerm)
      : true;

    return matchesYear && matchesSemester && matchesStatus && matchesSearch;
  });

  const handleGenerateReport = useCallback(() => {
    Swal.fire('สร้างรายงาน', `กำลังสร้างรายงานสำหรับปีการศึกษา: ${selectedYear || 'ทั้งหมด'}, ภาคเรียน: ${selectedSemester || 'ทั้งหมด'} และสถานะ: ${selectedStatus}`, 'info');
  }, [selectedYear, selectedSemester, selectedStatus]);

  const handleExportExcel = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'StaffData');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, 'uoc_staff_data.xlsx');
    Swal.fire('ส่งออก Excel', 'ส่งออกข้อมูลเป็น Excel สำเร็จแล้ว', 'success');
  }, [filteredData]);

  const handleExportPdf = useCallback(() => {
    const doc = new jsPDF();
    // doc.addFont('THSarabunNew', 'THSarabunNew', 'normal');
    // doc.setFont('THSarabunNew');

    (doc as any).autoTable({
      head: [[
        messages.citizen_id,
        messages.full_name,
        messages.academic_year,
        messages.semester,
        messages.appointed_date,
        messages.retired_date,
        messages.status,
      ]],
      body: filteredData.map((row) => [
        row.citizen_id,
        `${row.stf_fname} ${row.stf_mname ? row.stf_mname + ' ' : ''}${row.stf_lname}`,
        row.academic_year,
        row.semester,
        row.appointed_date,
        row.retired_date,
        messages[row.verification_status],
      ]),
      startY: 20,
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 40 },
      }
    });

    doc.save('uoc_staff_data.pdf');
    Swal.fire('ส่งออก PDF', 'ส่งออกข้อมูลเป็น PDF สำเร็จแล้ว', 'success');
  }, [filteredData, messages]);

  const handleAddNewStaff = () => {
    setCurrentStaffToEdit(null);
    setIsFormDialogOpen(true);
  };

  const handleEditStaff = (staff: StaffData) => {
    setCurrentStaffToEdit(staff);
    setIsFormDialogOpen(true);
  };

  const handleSaveStaff = (values: StaffData) => {
    setAllStaffs((prevStaffs) => {
      if (values.ds2001_id === 0) {
        const newId = Math.max(...prevStaffs.map(s => s.ds2001_id), 0) + 1;
        return [...prevStaffs, { ...values, ds2001_id: newId }];
      } else {
        return prevStaffs.map((staff) =>
          staff.ds2001_id === values.ds2001_id ? values : staff
        );
      }
    });
    Swal.fire('บันทึกสำเร็จ', 'บันทึกข้อมูลบุคลากรเรียบร้อยแล้ว', 'success');
    setIsFormDialogOpen(false);
  };

  const handleDeleteStaff = (id: number) => {
    Swal.fire({
      title: messages.confirm_delete,
      text: messages.confirm_delete_message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: messages.delete,
      cancelButtonText: messages.cancel,
    }).then((result) => {
      if (result.isConfirmed) {
        setAllStaffs((prevStaffs) => prevStaffs.filter((staff) => staff.ds2001_id !== id));
        Swal.fire(messages.delete_success, '', 'success');
      }
    });
  };

  const handleVerifyStaff = (id: number) => {
    setAllStaffs((prevStaffs) =>
      prevStaffs.map((staff) =>
        staff.ds2001_id === id ? { ...staff, verification_status: 'verified' } : staff
      )
    );
    Swal.fire(messages.verify_success, '', 'success');
  };

  // ลบฟังก์ชัน handleProcessData ออกไป

  return (
    <AppsContent>
      <AppCard title={<IntlMessagesMain id="sidebar.rp02.03"/>}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
            alignItems: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          {/* Add New/Import Buttons */}
          <Button variant="contained" onClick={handleAddNewStaff}>
            <CustomIntlMessages id="add_new_staff" defaultMessage="เพิ่มบุคลากรใหม่" />
          </Button>
          <Button variant="outlined"> {/* ลบ onClick handler */}
            <CustomIntlMessages id="import_data" defaultMessage="ประมวลผลข้อมูล" /> {/* เปลี่ยนข้อความกลับ */}
          </Button>

          {/* Search Field */}
          <TextField
            label={<CustomIntlMessages id="common_search" defaultMessage="ค้นหา" />}
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 200 }}
          />

          {/* Filters */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="academic-year-select-label"><CustomIntlMessages id="academic_year" defaultMessage="ปีการศึกษา" /></InputLabel>
            <Select
              labelId="academic-year-select-label"
              id="academic-year-select"
              value={selectedYear}
              label={<CustomIntlMessages id="academic_year" defaultMessage="ปีการศึกษา" />}
              onChange={(e) => setSelectedYear(e.target.value as string)}
            >
              <MenuItem value="">
                <em><CustomIntlMessages id="year_all" defaultMessage="ทั้งหมด" /></em>
              </MenuItem>
              {academicYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="semester-select-label"><CustomIntlMessages id="semester" defaultMessage="ภาคเรียน" /></InputLabel>
            <Select
              labelId="semester-select-label"
              id="semester-select"
              value={selectedSemester}
              label={<CustomIntlMessages id="semester" defaultMessage="ภาคเรียน" />}
              onChange={(e) => setSelectedSemester(e.target.value as string)}
            >
              <MenuItem value="">
                <em><CustomIntlMessages id="semester_all" defaultMessage="ทั้งหมด" /></em>
              </MenuItem>
              {semesters.map((sem) => (
                <MenuItem key={sem} value={sem}>
                  {sem}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="status-select-label"><CustomIntlMessages id="status" defaultMessage="สถานะ" /></InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={selectedStatus}
              label={<CustomIntlMessages id="status" defaultMessage="สถานะ" />}
              onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'verified' | 'pending' | 'rejected')}
            >
              <MenuItem value="all">
                <em><CustomIntlMessages id="all_status" defaultMessage="ทั้งหมด" /></em>
              </MenuItem>
              <MenuItem value="verified"><CustomIntlMessages id="verified" defaultMessage="ยืนยันแล้ว" /></MenuItem>
              <MenuItem value="pending"><CustomIntlMessages id="pending" defaultMessage="รอดำเนินการ" /></MenuItem>
              <MenuItem value="rejected"><CustomIntlMessages id="rejected" defaultMessage="ถูกปฏิเสธ" /></MenuItem>
            </Select>
          </FormControl>

          {/* Report/Export Buttons */}
          <Button variant="contained" onClick={handleGenerateReport}>
            <CustomIntlMessages id="generate_report_button" defaultMessage="สร้างรายงาน" />
          </Button>
          <Button variant="outlined" onClick={handleExportExcel}>
            <CustomIntlMessages id="export_excel_button" defaultMessage="ส่งออกข้อมูลเป็น Excel" />
          </Button>
          <Button variant="outlined" onClick={handleExportPdf}>
            <CustomIntlMessages id="export_pdf_button" defaultMessage="ส่งออกข้อมูลเป็น PDF" />
          </Button>
        </Box>
        <StaffTable
          data={filteredData}
          onEdit={handleEditStaff}
          onDelete={handleDeleteStaff}
          onVerify={handleVerifyStaff}
          // ลบ isLoading={isLoading} ออกไป
        />
      </AppCard>

     
      <StaffFormDialog
        open={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        onSave={handleSaveStaff}
        initialData={currentStaffToEdit}
        academicYears={academicYears}
      />
    </AppsContent>
  );
};
 

export default UocStaffManagement;