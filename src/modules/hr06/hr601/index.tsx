//hr601/index.tsx
'use client';
import React from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppSelect from '@crema/components/AppSelect'; // ยังไม่ได้ใช้งานแต่คงไว้
import Table from './Table';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem'; // สำหรับ Select/Dropdown
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import icon for CSV import

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลตำแหน่งบริหาร ---
interface ManagementPositionData {
  position_id: number;
  staff_id: number;
  admin_position_id: number;
  // สมมติว่ามีตาราง admin_position_id แยกต่างหาก
  position_holder_name: string;
  acting_position_name?: string; // อาจเป็นค่าว่างได้
  position_allowance: number;
  position_status: string;
  start_date: string;
  end_date?: string; // อาจเป็นค่าว่างได้ หากยังอยู่ในตำแหน่ง
  appointment_order_number: string;
  appointment_order_date: string;
  appointment_order_file: string;
  dismissal_order_number?: string; // อาจเป็นค่าว่างได้ หากยังอยู่ในตำแหน่ง
  dismissal_order_date?: string; // อาจเป็นค่าว่างได้ หากยังอยู่ในตำแหน่ง
  dismissal_order_file?: string; // อาจเป็นค่าว่างได้ หากยังอยู่ในตำแหน่ง
  create_at: string;
  update_at: string;
  officer_id: number;
  faculty_id?: number; // อาจเป็นค่าว่างได้
  department_id?: number; // อาจเป็นค่าว่างได้
  program_id?: number; // อาจเป็นค่าว่างได้
  [key: string]: any;
}

// ข้อมูลจำลองสำหรับตาราง erp_hr."ManagementPosition"
const initialManagementPositionRows: ManagementPositionData[] = [
  {
    position_id: 1,
    staff_id: 601,
    admin_position_id: 10, // อธิการบดี
    position_holder_name: 'นายกิตติศักดิ์ เจริญดี',
    position_allowance: 100000.00,
    position_status: 'ปัจจุบัน',
    start_date: '2023-10-01',
    appointment_order_number: 'คำสั่ง มอ. 001/2566',
    appointment_order_date: '2023-09-20',
    appointment_order_file: 'appointment_vc_001_2566.pdf',
    create_at: '2023-09-25',
    update_at: '2023-10-01',
    officer_id: 1,
    faculty_id: undefined,
    department_id: undefined,
    program_id: undefined,
  },
  {
    position_id: 2,
    staff_id: 602,
    admin_position_id: 20, // คณบดี
    position_holder_name: 'นางสาวรัชนีวัลย์ วงศ์สุวรรณ',
    position_allowance: 50000.00,
    position_status: 'ปัจจุบัน',
    start_date: '2024-01-01',
    appointment_order_number: 'คำสั่ง มอ. 010/2567',
    appointment_order_date: '2023-12-20',
    appointment_order_file: 'appointment_dean_010_2567.pdf',
    create_at: '2023-12-25',
    update_at: '2024-01-01',
    officer_id: 2,
    faculty_id: 1, // คณะวิทยาศาสตร์
    department_id: undefined,
    program_id: undefined,
  },
  {
    position_id: 3,
    staff_id: 603,
    admin_position_id: 30, // หัวหน้าภาควิชา
    position_holder_name: 'นายสมชาย ใจดี',
    acting_position_name: 'รักษาการหัวหน้าภาควิชาคอมพิวเตอร์',
    position_allowance: 25000.00,
    position_status: 'ปัจจุบัน',
    start_date: '2024-05-15',
    appointment_order_number: 'คำสั่ง มอ. 050/2567',
    appointment_order_date: '2024-05-01',
    appointment_order_file: 'appointment_hod_050_2567.pdf',
    create_at: '2024-05-05',
    update_at: '2024-05-15',
    officer_id: 3,
    faculty_id: 1, // คณะวิทยาศาสตร์
    department_id: 101, // ภาควิชาคอมพิวเตอร์
    program_id: undefined,
  },
  {
    position_id: 4,
    staff_id: 604,
    admin_position_id: 20, // คณบดี (เคยดำรงตำแหน่งและพ้นแล้ว)
    position_holder_name: 'รองศาสตราจารย์ ดร.มณีรัตน์ แสงทอง',
    position_allowance: 50000.00,
    position_status: 'พ้นตำแหน่ง',
    start_date: '2020-06-01',
    end_date: '2023-12-31',
    appointment_order_number: 'คำสั่ง มอ. 020/2563',
    appointment_order_date: '2020-05-20',
    appointment_order_file: 'appointment_dean_020_2563.pdf',
    dismissal_order_number: 'คำสั่ง มอ. 005/2567',
    dismissal_order_date: '2024-01-05',
    dismissal_order_file: 'dismissal_dean_005_2567.pdf',
    create_at: '2020-05-25',
    update_at: '2024-01-05',
    officer_id: 4,
    faculty_id: 2, // คณะวิศวกรรมศาสตร์
    department_id: undefined,
    program_id: undefined,
  },
  {
    position_id: 5,
    staff_id: 605,
    admin_position_id: 40, // ผู้อำนวยการสำนัก/สถาบัน
    position_holder_name: 'นายชาญชัย มั่นคง',
    position_allowance: 40000.00,
    position_status: 'ปัจจุบัน',
    start_date: '2024-03-01',
    appointment_order_number: 'คำสั่ง มอ. 030/2567',
    appointment_order_date: '2024-02-20',
    appointment_order_file: 'appointment_director_030_2567.pdf',
    create_at: '2024-02-25',
    update_at: '2024-03-01',
    officer_id: 5,
    faculty_id: undefined,
    department_id: undefined,
    program_id: undefined,
  },
  {
    position_id: 6,
    staff_id: 601, // อธิการบดีคนเดิม แต่มีข้อมูลตำแหน่งที่เคยรักษาการ
    admin_position_id: 11, // รองอธิการบดี
    position_holder_name: 'นายกิตติศักดิ์ เจริญดี',
    acting_position_name: 'รองอธิการบดีฝ่ายบริหาร',
    position_allowance: 0.00, // สมมติว่ารักษาการไม่มีเงินประจำตำแหน่ง
    position_status: 'พ้นตำแหน่ง',
    start_date: '2022-01-01',
    end_date: '2023-09-30',
    appointment_order_number: 'คำสั่ง มอ. 005/2565',
    appointment_order_date: '2021-12-20',
    appointment_order_file: 'appointment_vp_005_2565.pdf',
    dismissal_order_number: 'คำสั่ง มอ. 001/2566', // ใช้คำสั่งเดียวกันกับการแต่งตั้งอธิการบดี
    dismissal_order_date: '2023-09-20',
    dismissal_order_file: 'appointment_vc_001_2566.pdf',
    create_at: '2021-12-25',
    update_at: '2023-09-20',
    officer_id: 1,
    faculty_id: undefined,
    department_id: undefined,
    program_id: undefined,
  },
];
const Hr06Page = () => { // เปลี่ยนชื่อ Component เป็น Hr06Page
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<ManagementPositionData | null>(null);
  // ใช้ ManagementPositionData
  const [tableData, setTableData] = React.useState<ManagementPositionData[]>(initialManagementPositionRows); // ใช้ initialManagementPositionRows
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  // สถานะใหม่สำหรับควบคุม CSV Import Dialog
  const [isImportCsvOpen, setImportCsvOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr06.01' });
    const words = label.split("HR601 "); // เปลี่ยน HR112 เป็น HR113
    return words[1];
  };
  const dialogTitle = React.useMemo(() => {
    if (dialogMode === 'add') return "เพิ่ม" + labeltext();
    if (dialogMode === 'edit') return "แก้ไข" + labeltext();
    if (dialogMode === 'view') return "รายละเอียด" + labeltext();
    return "";
  }, [dialogMode, labeltext]);
  const onOpenAddTask = () => {
    setDialogMode('add');
    setCurrentData({ // กำหนดค่าเริ่มต้นสำหรับข้อมูลใหม่
      position_id: 0, // id จะถูกกำหนดเมื่อบันทึก
      staff_id: 0,
      admin_position_id: 0,
      position_holder_name: '',
      position_allowance: 0,
      position_status: 'ปัจจุบัน',
      start_date: '',
      appointment_order_number: '',
      appointment_order_date: '',
      appointment_order_file: '',
      create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      officer_id: 0,
    });
    setAddTaskOpen(true);
    setErrors({}); // เคลียร์ข้อผิดพลาดเมื่อเปิด Dialog
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
    setCurrentData(null);
    // เคลียร์ข้อมูลเมื่อปิด Dialog
    setErrors({}); // เคลียร์ข้อผิดพลาดเมื่อปิด Dialog
  };

  // ฟังก์ชันสำหรับเปิด Dialog นำเข้า CSV
  const onOpenImportCsv = () => {
    setImportCsvOpen(true);
    setSelectedFile(null); // รีเซ็ตไฟล์ที่เลือกไว้
  };

  // ฟังก์ชันสำหรับปิด Dialog นำเข้า CSV
  const onCloseImportCsv = () => {
    setImportCsvOpen(false);
    setSelectedFile(null);
  };

  // ฟังก์ชันสำหรับจัดการการเลือกไฟล์
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  // ฟังก์ชันสำหรับจำลองการนำเข้าข้อมูล CSV
  const handleImportCsvData = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: 'warning',
        title: 'คำเตือน!',
        text: 'กรุณาเลือกไฟล์ CSV ที่ต้องการนำเข้า',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    // แสดงสถานะกำลังประมวลผล
    Swal.fire({
      title: 'กำลังนำเข้าข้อมูล...',
      text: 'กรุณารอสักครู่',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // จำลองการประมวลผล (เช่น การอ่านไฟล์และเพิ่มข้อมูลลงในตาราง)
    // ในสถานการณ์จริง คุณจะต้องอ่านไฟล์ CSV และแปลงเป็น ManagementPositionData[]
    // ตัวอย่างนี้จะแค่จำลองว่าข้อมูลถูกเพิ่มเข้ามา
    await new Promise(resolve => setTimeout(resolve, 2000)); // จำลองการทำงาน 2 วินาที

    // ตัวอย่าง: เพิ่มข้อมูลจำลอง 1 แถวเพื่อแสดงผลว่ามีการนำเข้า
    const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.position_id)) + 1 : 1;
    const importedData: ManagementPositionData = {
      position_id: newId,
      staff_id: 999, // ข้อมูลจำลองจากการนำเข้า
      admin_position_id: 50,
      position_holder_name: 'นายนำเข้า ข้อมูล',
      position_allowance: 15000.00,
      position_status: 'ปัจจุบัน',
      start_date: '2025-01-01',
      appointment_order_number: 'คำสั่ง มอ. 999/2568',
      appointment_order_date: '2024-12-20',
      appointment_order_file: 'imported_file_999.pdf',
      create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      officer_id: 999999,
      faculty_id: undefined,
      department_id: undefined,
      program_id: undefined,
    };
    setTableData(prevData => [...prevData, importedData]);

    Swal.fire('สำเร็จ!', 'นำเข้าข้อมูล CSV เรียบร้อยแล้ว', 'success');
    onCloseImportCsv(); // ปิด Dialog หลังจากนำเข้าสำเร็จ
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentData(prevData => ({
      ...prevData!,
      [name]: value
    }));
    // ลบข้อผิดพลาดสำหรับช่องที่ผู้ใช้กำลังพิมพ์
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // ฟังก์ชันสำหรับตรวจสอบข้อมูล
  const validateData = () => {
    const newErrors: { [key: string]: string } = {};
    if (!currentData?.staff_id) newErrors.staff_id = 'กรุณากรอกรหัสบุคลากร';
    if (!currentData?.admin_position_id) newErrors.admin_position_id = 'กรุณากรอกรหัสตำแหน่งบริหาร';
    if (!currentData?.position_holder_name) newErrors.position_holder_name = 'กรุณากรอกชื่อผู้ดำรงตำแหน่ง';
    if (!currentData?.position_allowance) newErrors.position_allowance = 'กรุณากรอกเงินประจำตำแหน่ง';
    if (!currentData?.position_status) newErrors.position_status = 'กรุณากรอกสถานะตำแหน่ง';
    if (!currentData?.start_date) newErrors.start_date = 'กรุณากรอกวันที่เริ่มต้น';
    if (!currentData?.appointment_order_number) newErrors.appointment_order_number = 'กรุณากรอกเลขที่คำสั่งแต่งตั้ง';
    if (!currentData?.appointment_order_date) newErrors.appointment_order_date = 'กรุณากรอกวันที่คำสั่งแต่งตั้ง';
    if (!currentData?.appointment_order_file) newErrors.appointment_order_file = 'กรุณากรอกไฟล์คำสั่งแต่งตั้ง';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSaveData = () => {
     if (!validateData()) {
       Swal.fire({
         icon: 'warning',
         title: 'คำเตือน!',
         text: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',
         confirmButtonText: 'ตกลง'
       });
    return;
    }

    if (dialogMode === 'add') {
      // เพิ่มข้อมูลใหม่
      const newId = tableData.length > 0 ?
 Math.max(...tableData.map(d => d.position_id)) + 1 : 1;
      const newData: ManagementPositionData = {
        ...currentData!,
        position_id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
      setTableData(prevData =>
        prevData.map(data =>
          data.position_id === currentData!.position_id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data

        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: ManagementPositionData) => { // ใช้ ManagementPositionData
    setDialogMode('view');
    setCurrentData(data);
    setErrors({});
    setAddTaskOpen(true);
  };

  const handleEditData = (data: ManagementPositionData) => { // ใช้ ManagementPositionData
    setDialogMode('edit');
    setCurrentData(data);
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
      setTableData(prevData => prevData.filter(data => data.position_id !== id));
      Swal.fire(
        'ลบแล้ว!',
        'ข้อมูลของคุณถูกลบเรียบร้อยแล้ว',
        'success'
      );
    }
  };

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
  return (
    <AppCard
      contentStyle={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 8 }}
      title={<IntlMessages id="sidebar.hr06.01" />}
      action={
        <Box sx={{ display: 'flex', gap: 2 }}> {/* ใช้ Box เพื่อจัดเรียงปุ่ม */}
          <Button
            variant="contained" // เปลี่ยนเป็น contained เพื่อให้เห็นความแตกต่าง
            color="success" // ใช้สีเขียวเพื่อสื่อถึงการนำเข้า
            sx={{
              padding: '3px 10px',
              borderRadius: 30,
              '& .MuiSvgIcon-root': {
                fontSize: 20,
              },
            }}
            onClick={onOpenImportCsv}
            startIcon={<CloudUploadIcon />}
          >
            นำเข้าข้อมูล CSV
          </Button>
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
        </Box>
      }
    >
      <Table
        data={tableData}
        setTableData={setTableData}
        onView={handleViewData}
        onEdit={handleEditData}
        onDelete={handleDeleteData}
      />
      <AppDialog
        dividers
        maxWidth="lg"
        open={isAddTaskOpen}
        onClose={onCloseAddTask}
        title={dialogTitle}
      >
        <Box>
          <TextField
            label={"รหัส" + labeltext()}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.position_id ||
 ''}
            name="position_id"
            onChange={handleInputChange}
            disabled={dialogMode !== 'add'}
          />
          <TextField
            fullWidth
            label={"รหัสบุคลากร"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.staff_id ||
 ''}
            name="staff_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.staff_id}
            helperText={errors.staff_id}
          />
          <TextField
            fullWidth
            label={"รหัสตำแหน่งบริหาร"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.admin_position_id ||
 ''}
            name="admin_position_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.admin_position_id}
            helperText={errors.admin_position_id}
          />
          <TextField
            fullWidth
            label={"ชื่อผู้ดำรงตำแหน่ง"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.position_holder_name ||
 ''}
            name="position_holder_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.position_holder_name}
            helperText={errors.position_holder_name}
          />
          <TextField
            fullWidth
            label={"ตำแหน่งรักษาการ (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.acting_position_name ||
 ''}
            name="acting_position_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"เงินประจำตำแหน่ง"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.position_allowance ||
 0}
            name="position_allowance"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.position_allowance}
            helperText={errors.position_allowance}
          />
          <TextField
            fullWidth
            label={"สถานะตำแหน่ง"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.position_status ||
 ''}
            name="position_status"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.position_status}
            helperText={errors.position_status}
          />
          <TextField
            fullWidth
            label={"วันที่เริ่มต้น"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.start_date ||
 ''}
            name="start_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.start_date}
            helperText={errors.start_date}
          />
          <TextField
            fullWidth
            label={"วันที่สิ้นสุด (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.end_date ||
 ''}
            name="end_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"เลขที่คำสั่งแต่งตั้ง"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.appointment_order_number ||
 ''}
            name="appointment_order_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.appointment_order_number}
            helperText={errors.appointment_order_number}
          />
          <TextField
            fullWidth
            label={"วันที่คำสั่งแต่งตั้ง"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.appointment_order_date ||
 ''}
            name="appointment_order_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.appointment_order_date}
            helperText={errors.appointment_order_date}
          />
          <TextField
            fullWidth
            label={"ไฟล์คำสั่งแต่งตั้ง"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.appointment_order_file ||
 ''}
            name="appointment_order_file"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.appointment_order_file}
            helperText={errors.appointment_order_file}
          />
          <TextField
            fullWidth
            label={"เลขที่คำสั่งพ้นตำแหน่ง (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.dismissal_order_number ||
 ''}
            name="dismissal_order_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"วันที่คำสั่งพ้นตำแหน่ง (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.dismissal_order_date ||
 ''}
            name="dismissal_order_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ไฟล์คำสั่งพ้นตำแหน่ง (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.dismissal_order_file ||
 ''}
            name="dismissal_order_file"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />

              <TextField
                select
                fullWidth
                label="คณะหน่วยงาน"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.faculty_id ||
 ''}
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

              <TextField
                select
                fullWidth
                label="ภาควิชา/สาขาวิชา"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.department_id ||
 ''}
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

              <TextField
                select
                fullWidth
                label="หลักสูตร"
                variant="outlined"
                margin="normal"
                size="small"
                value={currentData?.program_id ||
 ''}
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

          <TextField
            fullWidth
            label={"สร้างเมื่อ"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.create_at || ''}
            name="create_at"
            onChange={handleInputChange}
            disabled // เพิ่ม disabled เพื่อไม่ให้แก้ไข
            />
          <TextField
            fullWidth
            label={"อัปเดตเมื่อ"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.update_at ||
 ''}
            name="update_at"
            onChange={handleInputChange}
            disabled // เพิ่ม disabled เพื่อไม่ให้แก้ไข
            />
              <TextField
              fullWidth
              label={"รหัสผู้บันทึก"}
              variant="outlined"
              margin="normal"
              size="small"
              value={currentData?.officer_id ||
 ''}
              name="officer_id"
              onChange={handleInputChange}
              disabled={dialogMode === 'view'}
              />


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
      </AppDialog>

      {/* Dialog สำหรับนำเข้า CSV */}
      <AppDialog
        dividers
        maxWidth="sm"
        open={isImportCsvOpen}
        onClose={onCloseImportCsv}
        title="นำเข้าข้อมูลจากไฟล์ CSV"
      >
        <Box sx={{ p: 2 }}>
          <Button
            variant="outlined"
            component="label"
            sx={{ mb: 2 }}
            startIcon={<CloudUploadIcon />}
          >
            เลือกไฟล์ CSV
            <input
              type="file"
              hidden
              accept=".csv"
              onChange={handleFileChange}
            />
          </Button>
          {selectedFile && (
            <Box sx={{ mb: 2, color: 'text.secondary' }}>
              ไฟล์ที่เลือก: {selectedFile.name}
            </Box>
          )}
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={onCloseImportCsv} color="secondary">
              ยกเลิก
            </Button>
            <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleImportCsvData}>
              นำเข้าข้อมูล
            </Button>
          </Box>
        </Box>
      </AppDialog>

    </AppCard>
  );
};

export default Hr06Page;