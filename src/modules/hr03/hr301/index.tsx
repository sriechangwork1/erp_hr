//hr301/index.tsx
'use client';
import React from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppSelect from '@crema/components/AppSelect'; 
import Table from './Table'; 
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem'; 

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง ---
interface ManpowerFrameworkData {
  manpower_framework_id: number;
  staff_id?: number; // อาจเป็นค่าว่างได้หากตำแหน่งว่าง
  staff_type_id: number; // เช่น 1: ข้าราชการ, 2: บุคลากรมหาวิทยาลัย, 3: ลูกจ้าง
  position_type_id: number; // เช่น 1: วิชาการ, 2: สนับสนุน, 3: บริหาร
  position_number: string;
  position_name: string;
  salary_account: string;
  salary: number; // เงินเดือนตามกรอบ
  received_salary?: number; // เงินเดือนที่ได้รับจริง (อาจเป็นค่าว่างหากตำแหน่งว่าง)
  employee_level?: string; // ชื่อบุคลากรครองตำแหน่งระดับ (อาจเป็นค่าว่างหากตำแหน่งว่าง)
  base_salary: number; // เงินเดือนขั้นต้นของตำแหน่งนั้นๆ
  payment_type: string; // เช่น เงินงบประมาณ, เงินรายได้
  staff_status: string; // เช่น ว่าง, มีผู้ครอง, ยกเลิก
  create_at: string;
  update_at: string;
  officer_id: number;
  job_title_id?: number; // รหัสชื่อตำแหน่งสายงาน
  work_line_id?: number; // รหัสรายชื่อสายงาน
  position_level_id?: number; // รหัสระดับตำแหน่ง
  faculty_id?: number;
  department_id?: number;
  program_id?: number;
  academic_position_id?: number; // รหัสตำแหน่งทางสายวิชาการ
  support_position_id?: number; // รหัสตำแหน่งทางสายสนับสนุน
  admin_position_id?: number; // รหัสตำแหน่งบริหาร
  [key: string]: any;
}

// ข้อมูลจำลองสำหรับตาราง erp_hr."ManpowerFramework"
const initialManpowerFrameworkRows: ManpowerFrameworkData[] = [
  {
    manpower_framework_id: 1,
    staff_id: 801,
    staff_type_id: 1, // ข้าราชการ
    position_type_id: 1, // วิชาการ
    position_number: 'กค001',
    position_name: 'อาจารย์',
    salary_account: 'งบประมาณแผ่นดิน',
    salary: 30000.00,
    received_salary: 32500.00,
    employee_level: 'อาจารย์',
    base_salary: 21000.00,
    payment_type: 'เงินเดือน',
    staff_status: 'มีผู้ครอง',
    create_at: '2023-01-01',
    update_at: '2024-05-10',
    officer_id: 680001,
    job_title_id: 1, // อาจารย์
    work_line_id: 10, // สายวิชาการ
    position_level_id: 1, // ปฏิบัติการ
    faculty_id: 101, // คณะวิทยาการจัดการ
    department_id: 1011, // ภาควิชาบริหารธุรกิจ
    program_id: 101101, // หลักสูตรบริหารธุรกิจบัณฑิต
    academic_position_id: 1, // อาจารย์
    support_position_id: undefined,
    admin_position_id: undefined,
  },
  {
    manpower_framework_id: 2,
    staff_id: 802,
    staff_type_id: 2, // บุคลากรมหาวิทยาลัย
    position_type_id: 2, // สนับสนุน
    position_number: 'บส005',
    position_name: 'นักวิเคราะห์นโยบายและแผน',
    salary_account: 'เงินรายได้มหาวิทยาลัย',
    salary: 25000.00,
    received_salary: 27000.00,
    employee_level: 'ชำนาญการ',
    base_salary: 20000.00,
    payment_type: 'ค่าจ้าง',
    staff_status: 'มีผู้ครอง',
    create_at: '2023-03-15',
    update_at: '2024-06-01',
    officer_id: 680001,
    job_title_id: 2, // นักวิเคราะห์นโยบายและแผน
    work_line_id: 20, // สายสนับสนุน
    position_level_id: 2, // ชำนาญการ
    faculty_id: 102, // คณะนิติศาสตร์
    department_id: undefined,
    program_id: undefined,
    academic_position_id: undefined,
    support_position_id: 5, // นักวิเคราะห์นโยบายและแผน
    admin_position_id: undefined,
  },
  {
    manpower_framework_id: 3,
    staff_id: undefined, // ตำแหน่งว่าง
    staff_type_id: 1,
    position_type_id: 1,
    position_number: 'กค002',
    position_name: 'ผู้ช่วยศาสตราจารย์',
    salary_account: 'งบประมาณแผ่นดิน',
    salary: 35000.00,
    received_salary: undefined,
    employee_level: undefined,
    base_salary: 25000.00,
    payment_type: 'เงินเดือน',
    staff_status: 'ว่าง',
    create_at: '2023-04-20',
    update_at: '2024-01-05',
    officer_id: 680001,
    job_title_id: 3, // ผู้ช่วยศาสตราจารย์
    work_line_id: 10,
    position_level_id: 3, // ชำนาญการพิเศษ (สำหรับอาจารย์)
    faculty_id: 101,
    department_id: 1012, // ภาควิชาการตลาด
    program_id: 101201, // หลักสูตรการตลาดบัณฑิต
    academic_position_id: 2, // ผู้ช่วยศาสตราจารย์
    support_position_id: undefined,
    admin_position_id: undefined,
  },
  {
    manpower_framework_id: 4,
    staff_id: 803,
    staff_type_id: 3, // ลูกจ้างชั่วคราว
    position_type_id: 2,
    position_number: 'ลจ010',
    position_name: 'เจ้าหน้าที่ธุรการ',
    salary_account: 'เงินรายได้มหาวิทยาลัย',
    salary: 15000.00,
    received_salary: 15000.00,
    employee_level: 'ปฏิบัติงาน',
    base_salary: 13000.00,
    payment_type: 'ค่าจ้างรายเดือน',
    staff_status: 'มีผู้ครอง',
    create_at: '2024-01-01',
    update_at: '2024-01-01',
    officer_id: 680001,
    job_title_id: 4, // เจ้าหน้าที่ธุรการ
    work_line_id: 20,
    position_level_id: 1, // ปฏิบัติงาน
    faculty_id: 103, // คณะบริหารธุรกิจ
    department_id: undefined,
    program_id: undefined,
    academic_position_id: undefined,
    support_position_id: 1, // เจ้าหน้าที่บริหารงานทั่วไป
    admin_position_id: undefined,
  },
  {
    manpower_framework_id: 5,
    staff_id: 804,
    staff_type_id: 1,
    position_type_id: 3, // บริหาร
    position_number: 'บร001',
    position_name: 'คณบดี',
    salary_account: 'งบประมาณแผ่นดิน',
    salary: 60000.00,
    received_salary: 60000.00,
    employee_level: 'คณบดี',
    base_salary: 50000.00,
    payment_type: 'เงินเดือน',
    staff_status: 'มีผู้ครอง',
    create_at: '2023-09-01',
    update_at: '2024-02-15',
    officer_id: 680001,
    job_title_id: 5, // คณบดี
    work_line_id: 30, // สายบริหาร
    position_level_id: 4, // ระดับสูง
    faculty_id: 104, // คณะเทคโนโลยีสารสนเทศ
    department_id: undefined,
    program_id: undefined,
    academic_position_id: undefined,
    support_position_id: undefined,
    admin_position_id: 20, // คณบดี
  },
  {
    manpower_framework_id: 6,
    staff_id: undefined,
    staff_type_id: 2,
    position_type_id: 2,
    position_number: 'บส006',
    position_name: 'นักวิชาการคอมพิวเตอร์',
    salary_account: 'เงินรายได้มหาวิทยาลัย',
    salary: 22000.00,
    received_salary: undefined,
    employee_level: undefined,
    base_salary: 18000.00,
    payment_type: 'ค่าจ้าง',
    staff_status: 'ว่าง',
    create_at: '2024-03-01',
    update_at: '2024-03-01',
    officer_id: 680001,
    job_title_id: 6, // นักวิชาการคอมพิวเตอร์
    work_line_id: 20,
    position_level_id: 2,
    faculty_id: 104,
    department_id: undefined,
    program_id: undefined,
    academic_position_id: undefined,
    support_position_id: 6, // นักวิชาการคอมพิวเตอร์
    admin_position_id: undefined,
  },
];


const Hr03Page = () => { // เปลี่ยนชื่อ Component
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<ManpowerFrameworkData | null>(null); // ใช้ ManpowerFrameworkData
  const [tableData, setTableData] = React.useState<ManpowerFrameworkData[]>(initialManpowerFrameworkRows); // ใช้ initialManpowerFrameworkRows
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  // **หมายเหตุ: เนื่องจากไม่มี id สำหรับ Manpower Framework ใน IntlMessages จึงใช้ค่าเริ่มต้น**
  const labeltext = () => {
    // สมมติว่ามี id ใหม่ เช่น 'sidebar.hr05.03' หรือคุณสามารถกำหนดเอง
    // ถ้าไม่มี id ที่แน่นอนใน IntlMessages ก็ใช้ข้อความตรงๆ ได้
    const label = intl.formatMessage({ id: 'common.manpowerFramework', defaultMessage: 'กรอบอัตรากำลัง' }); 
    return label;
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
      manpower_framework_id: 0, // id จะถูกกำหนดเมื่อบันทึก
      staff_id: undefined,
      staff_type_id: 0,
      position_type_id: 0,
      position_number: '',
      position_name: '',
      salary_account: '',
      salary: 0,
      received_salary: undefined,
      employee_level: '',
      base_salary: 0,
      payment_type: '',
      staff_status: '',
      create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      officer_id: 0,
      job_title_id: undefined,
      work_line_id: undefined,
      position_level_id: undefined,
      faculty_id: undefined,
      department_id: undefined,
      program_id: undefined,
      academic_position_id: undefined,
      support_position_id: undefined,
      admin_position_id: undefined,
    });
    setAddTaskOpen(true);
    setErrors({}); // เคลียร์ข้อผิดพลาดเมื่อเปิด Dialog
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
    setCurrentData(null); // เคลียร์ข้อมูลเมื่อปิด Dialog
    setErrors({}); // เคลียร์ข้อผิดพลาดเมื่อปิด Dialog
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // ตรวจสอบว่าเป็นฟิลด์ตัวเลขหรือไม่ และแปลงค่าให้เป็นตัวเลข
    const parsedValue = [
      'staff_id', 'staff_type_id', 'position_type_id', 'salary', 
      'received_salary', 'base_salary', 'officer_id', 'job_title_id', 
      'work_line_id', 'position_level_id', 'faculty_id', 'department_id',
      'program_id', 'academic_position_id', 'support_position_id', 'admin_position_id'
    ].includes(name)
      ? (value === '' ? undefined : parseFloat(value)) // ถ้าเป็นค่าว่างให้เป็น undefined, ไม่เช่นนั้นแปลงเป็น float
      : value;

    setCurrentData(prevData => ({
      ...prevData!,
      [name]: parsedValue
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

  // ฟังก์ชันสำหรับตรวจสอบข้อมูล (ปรับปรุงตามโครงสร้างใหม่)
  const validateData = () => {
    const newErrors: { [key: string]: string } = {};
    if (!currentData?.staff_type_id) newErrors.staff_type_id = 'กรุณากรอกประเภทบุคลากร';
    if (!currentData?.position_type_id) newErrors.position_type_id = 'กรุณากรอกประเภทตำแหน่ง';
    if (!currentData?.position_number) newErrors.position_number = 'กรุณากรอกเลขที่ตำแหน่ง';
    if (!currentData?.position_name) newErrors.position_name = 'กรุณากรอกชื่อตำแหน่ง';
    if (!currentData?.salary_account) newErrors.salary_account = 'กรุณากรอกแหล่งเงินเดือน';
    if (currentData?.salary === undefined || currentData?.salary === null) newErrors.salary = 'กรุณากรอกเงินเดือนตามกรอบ';
    if (currentData?.base_salary === undefined || currentData?.base_salary === null) newErrors.base_salary = 'กรุณากรอกเงินเดือนขั้นต้น';
    if (!currentData?.payment_type) newErrors.payment_type = 'กรุณากรอกประเภทการจ่าย';
    if (!currentData?.staff_status) newErrors.staff_status = 'กรุณากรอกสถานะบุคลากร';
    if (!currentData?.officer_id) newErrors.officer_id = 'กรุณากรอกรหัสผู้บันทึก';
    
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.manpower_framework_id)) + 1 : 1;
      const newData: ManpowerFrameworkData = {
        ...currentData!,
        manpower_framework_id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
      setTableData(prevData =>
        prevData.map(data =>
          data.manpower_framework_id === currentData!.manpower_framework_id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: ManpowerFrameworkData) => { 
    setDialogMode('view');
    setCurrentData(data);
    setErrors({}); 
    setAddTaskOpen(true);
  };

  const handleEditData = (data: ManpowerFrameworkData) => { 
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
      setTableData(prevData => prevData.filter(data => data.manpower_framework_id !== id));
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
      title={<IntlMessages id="sidebar.hr03.01" />}
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
      <Table
        data={tableData} 
        setTableData={setTableData} 
        onView={handleViewData}
        onEdit={handleEditData}
        onDelete={handleDeleteData}
      />
      <AppDialog
        dividers
        maxWidth="md"
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
            value={currentData?.manpower_framework_id || ''}
            name="manpower_framework_id"
            onChange={handleInputChange}
            disabled={dialogMode !== 'add'} 
          />
          <TextField
            fullWidth
            label={"รหัสบุคลากร"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number" 
            value={currentData?.staff_id || ''}
            name="staff_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ประเภทบุคลากร (รหัส)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number" 
            value={currentData?.staff_type_id || ''}
            name="staff_type_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.staff_type_id}
            helperText={errors.staff_type_id}
          />
          <TextField
            fullWidth
            label={"ประเภทตำแหน่ง (รหัส)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number" 
            value={currentData?.position_type_id || ''}
            name="position_type_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.position_type_id}
            helperText={errors.position_type_id}
          />
          <TextField
            fullWidth
            label={"เลขที่ตำแหน่ง"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.position_number || ''}
            name="position_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.position_number}
            helperText={errors.position_number}
          />
          <TextField
            fullWidth
            label={"ชื่อตำแหน่ง"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.position_name || ''}
            name="position_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.position_name}
            helperText={errors.position_name}
          />
          <TextField
            fullWidth
            label={"แหล่งเงินเดือน"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.salary_account || ''}
            name="salary_account"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.salary_account}
            helperText={errors.salary_account}
          />
          <TextField
            fullWidth
            label={"เงินเดือนตามกรอบ"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.salary || 0}
            name="salary"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.salary}
            helperText={errors.salary}
          />
          <TextField
            fullWidth
            label={"เงินเดือนที่ได้รับจริง (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.received_salary || ''}
            name="received_salary"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ชื่อบุคลากรครองตำแหน่งระดับ (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.employee_level || ''}
            name="employee_level"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"เงินเดือนขั้นต้นของตำแหน่ง"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.base_salary || 0}
            name="base_salary"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.base_salary}
            helperText={errors.base_salary}
          />
          <TextField
            fullWidth
            label={"ประเภทการจ่าย"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.payment_type || ''}
            name="payment_type"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.payment_type}
            helperText={errors.payment_type}
          />
          <TextField
            fullWidth
            label={"สถานะบุคลากร"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.staff_status || ''}
            name="staff_status"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.staff_status}
            helperText={errors.staff_status}
          />
          <TextField
            fullWidth
            label={"รหัสชื่อตำแหน่งสายงาน (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.job_title_id || ''}
            name="job_title_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"รหัสรายชื่อสายงาน (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.work_line_id || ''}
            name="work_line_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"รหัสระดับตำแหน่ง (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.position_level_id || ''}
            name="position_level_id"
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
 




          <TextField
            fullWidth
            label={"รหัสคณะ (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.faculty_id || ''}
            name="faculty_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"รหัสภาควิชา (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.department_id || ''}
            name="department_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"รหัสหลักสูตร (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.program_id || ''}
            name="program_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"รหัสตำแหน่งทางสายวิชาการ (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.academic_position_id || ''}
            name="academic_position_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"รหัสตำแหน่งทางสายสนับสนุน (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.support_position_id || ''}
            name="support_position_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"รหัสตำแหน่งบริหาร (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.admin_position_id || ''}
            name="admin_position_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />

          <TextField
            fullWidth
            label={"สร้างเมื่อ"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.create_at || ''}
            name="create_at"
            disabled 
            InputLabelProps={{ shrink: true }} 
          />
          <TextField
            fullWidth
            label={"อัปเดตเมื่อ"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.update_at || ''}
            name="update_at"
            disabled 
            InputLabelProps={{ shrink: true }} 
          />

          <TextField
            fullWidth
            label={"รหัสผู้บันทึก"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number" 
            value={currentData?.officer_id || ''}
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
    </AppCard>
  );
};
export default Hr03Page;