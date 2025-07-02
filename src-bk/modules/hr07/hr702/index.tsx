 //hr702/index.tsx
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลการขอตำแหน่งสายสนับสนุน ---
interface RequestSupportPositionData {
  request_support_id: number;
  staff_id: number;
  support_position_id: number; // สมมติว่ามีตาราง support_position_id แยกต่างหาก
  work_name: string;
  work_file: string;
  work_type: string;
  appointment_method: string;
  council_meeting: string;
  position_details: string;
  request_acad_at: string; // ชื่อคอลัมน์ในฐานข้อมูลคือ request_acad_at แต่เป็นของสายสนับสนุน
  request_level: string;
  request_major: string;
  request_submajor?: string; // อาจเป็นค่าว่างได้
  isced_code?: string; // อาจเป็นค่าว่างได้
  consideration_result: string;
  meeting_place: string;
  meeting_at: string;
  appointment_order?: string; // อาจเป็นค่าว่างได้
  signature_date?: string; // อาจเป็นค่าว่างได้
  effective_date?: string; // อาจเป็นค่าว่างได้
  position_salary?: number; // อาจเป็นค่าว่างได้
  appointment_file?: string; // อาจเป็นค่าว่างได้
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองสำหรับตาราง erp_hr."RequestSupportPosition"
const initialRequestSupportPositionRows: RequestSupportPositionData[] = [
  {
    request_support_id: 1,
    staff_id: 501,
    support_position_id: 101, // จากเจ้าหน้าที่บริหารงานทั่วไป เป็น นักวิเคราะห์นโยบายและแผนชำนาญการ
    work_name: 'ผลงานเด่น: โครงการปรับปรุงระบบจัดเก็บเอกสารดิจิทัล',
    work_file: 'project_digital_doc_system.pdf',
    work_type: 'ผลงานเด่น/ดีเด่น',
    appointment_method: 'วิธีการปกติ',
    council_meeting: 'การประชุมคณะกรรมการบริหารงานบุคคล ครั้งที่ 1/2567',
    position_details: 'จากเจ้าหน้าที่บริหารงานทั่วไป เป็นนักวิเคราะห์นโยบายและแผนชำนาญการ',
    request_acad_at: '2024-01-15',
    request_level: 'ชำนาญการ',
    request_major: 'บริหารงานทั่วไป',
    isced_code: '041', // Business and administration
    consideration_result: 'ผ่าน',
    meeting_place: 'คณะกรรมการบริหารงานบุคคล',
    meeting_at: '2024-02-20',
    appointment_order: 'คำสั่ง ม.อ. (บศ) 001/2567',
    signature_date: '2024-03-01',
    effective_date: '2024-03-15',
    position_salary: 35000.00,
    appointment_file: 'appointment_support_001_2567.pdf',
    create_at: '2024-01-16',
    update_at: '2024-03-01',
    officer_id: 1,
  },
  {
    request_support_id: 2,
    staff_id: 502,
    support_position_id: 102, // จากนักวิชาการคอมพิวเตอร์ชำนาญการ เป็น นักวิชาการคอมพิวเตอร์ชำนาญการพิเศษ
    work_name: 'งานวิจัยและพัฒนาระบบฐานข้อมูลบุคลากร',
    work_file: 'research_hr_database.pdf',
    work_type: 'งานวิจัย/พัฒนา',
    appointment_method: 'วิธีการปกติ',
    council_meeting: 'การประชุมคณะกรรมการบริหารงานบุคคล ครั้งที่ 2/2567',
    position_details: 'จากนักวิชาการคอมพิวเตอร์ชำนาญการ เป็นนักวิชาการคอมพิวเตอร์ชำนาญการพิเศษ',
    request_acad_at: '2024-03-10',
    request_level: 'ชำนาญการพิเศษ',
    request_major: 'คอมพิวเตอร์',
    request_submajor: 'ระบบฐานข้อมูล',
    isced_code: '061', // Information and Communication Technologies
    consideration_result: 'ผ่าน',
    meeting_place: 'คณะกรรมการบริหารงานบุคคล',
    meeting_at: '2024-04-15',
    appointment_order: 'คำสั่ง ม.อ. (บศ) 002/2567',
    signature_date: '2024-04-25',
    effective_date: '2024-05-10',
    position_salary: 45000.00,
    appointment_file: 'appointment_support_002_2567.pdf',
    create_at: '2024-03-11',
    update_at: '2024-04-25',
    officer_id: 2,
  },
  {
    request_support_id: 3,
    staff_id: 503,
    support_position_id: 101, // จากเจ้าหน้าที่บริหารงานทั่วไป เป็น นักวิเคราะห์นโยบายและแผนชำนาญการ
    work_name: 'ผลงานเด่น: การจัดทำแผนยุทธศาสตร์องค์กรประจำปี',
    work_file: 'strategic_plan_report.pdf',
    work_type: 'ผลงานเด่น/ดีเด่น',
    appointment_method: 'วิธีการปกติ',
    council_meeting: 'การประชุมคณะกรรมการบริหารงานบุคคล ครั้งที่ 3/2567',
    position_details: 'จากเจ้าหน้าที่บริหารงานทั่วไป เป็นนักวิเคราะห์นโยบายและแผนชำนาญการ',
    request_acad_at: '2024-05-01',
    request_level: 'ชำนาญการ',
    request_major: 'นโยบายและแผน',
    isced_code: '041',
    consideration_result: 'อยู่ระหว่างพิจารณา',
    meeting_place: 'คณะกรรมการบริหารงานบุคคล',
    meeting_at: '2024-06-10',
    appointment_order: undefined,
    signature_date: undefined,
    effective_date: undefined,
    position_salary: undefined,
    appointment_file: undefined,
    create_at: '2024-05-02',
    update_at: '2024-06-10',
    officer_id: 3,
  },
  {
    request_support_id: 4,
    staff_id: 504,
    support_position_id: 103, // จากนักวิชาการพัสดุชำนาญการ เป็น นักวิชาการพัสดุชำนาญการพิเศษ
    work_name: 'งานพัฒนา: คู่มือการจัดซื้อจัดจ้างภาครัฐแบบอิเล็กทรอนิกส์',
    work_file: 'e_procurement_manual.pdf',
    work_type: 'งานพัฒนา',
    appointment_method: 'วิธีการปกติ',
    council_meeting: 'การประชุม ก.พ.อ. ครั้งที่ 1/2568',
    position_details: 'จากนักวิชาการพัสดุชำนาญการ เป็นนักวิชาการพัสดุชำนาญการพิเศษ',
    request_acad_at: '2025-01-20',
    request_level: 'ชำนาญการพิเศษ',
    request_major: 'พัสดุ',
    isced_code: '041',
    consideration_result: 'อยู่ระหว่างพิจารณา',
    meeting_place: 'กพอ.',
    meeting_at: '2025-02-20',
    appointment_order: undefined,
    signature_date: undefined,
    effective_date: undefined,
    position_salary: undefined,
    appointment_file: undefined,
    create_at: '2025-01-21',
    update_at: '2025-02-20',
    officer_id: 4,
  },
  {
    request_support_id: 5,
    staff_id: 501,
    support_position_id: 102, // จากนักวิเคราะห์นโยบายและแผนชำนาญการ เป็น นักวิเคราะห์นโยบายและแผนชำนาญการพิเศษ
    work_name: 'ผลงานเด่น: การพัฒนาระบบประเมินผลการปฏิบัติงานบุคลากร',
    work_file: 'performance_evaluation_system.pdf',
    work_type: 'ผลงานเด่น/ดีเด่น',
    appointment_method: 'วิธีการปกติ',
    council_meeting: 'การประชุมคณะกรรมการบริหารงานบุคคล ครั้งที่ 4/2567',
    position_details: 'จากนักวิเคราะห์นโยบายและแผนชำนาญการ เป็นนักวิเคราะห์นโยบายและแผนชำนาญการพิเศษ',
    request_acad_at: '2024-07-01',
    request_level: 'ชำนาญการพิเศษ',
    request_major: 'บริหารงานบุคคล',
    isced_code: '041',
    consideration_result: 'ผ่าน',
    meeting_place: 'คณะกรรมการบริหารงานบุคคล',
    meeting_at: '2024-08-10',
    appointment_order: 'คำสั่ง ม.อ. (บศ) 003/2567',
    signature_date: '2024-08-20',
    effective_date: '2024-09-01',
    position_salary: 40000.00,
    appointment_file: 'appointment_support_003_2567.pdf',
    create_at: '2024-07-02',
    update_at: '2024-08-20',
    officer_id: 1,
  },
  {
    request_support_id: 6,
    staff_id: 505,
    support_position_id: 101, // จากเจ้าหน้าที่การเงินและบัญชี เป็น นักวิชาการเงินและบัญชีชำนาญการ
    work_name: 'งานบริการ: การจัดทำรายงานงบประมาณประจำปี',
    work_file: 'annual_budget_report.xlsx',
    work_type: 'งานบริการ',
    appointment_method: 'วิธีการปกติ',
    council_meeting: 'การประชุมคณะกรรมการบริหารงานบุคคล ครั้งที่ 5/2567',
    position_details: 'จากเจ้าหน้าที่การเงินและบัญชี เป็นนักวิชาการเงินและบัญชีชำนาญการ',
    request_acad_at: '2024-09-10',
    request_level: 'ชำนาญการ',
    request_major: 'การเงินและบัญชี',
    isced_code: '041',
    consideration_result: 'ไม่ผ่าน', // เพื่อแสดงผลลัพธ์ที่หลากหลาย
    meeting_place: 'คณะกรรมการบริหารงานบุคคล',
    meeting_at: '2024-10-15',
    appointment_order: undefined,
    signature_date: undefined,
    effective_date: undefined,
    position_salary: undefined,
    appointment_file: undefined,
    create_at: '2024-09-11',
    update_at: '2024-10-15',
    officer_id: 5,
  },
];


const Hr07Page = () => { // เปลี่ยนชื่อ Component เป็น Hr07Page
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<RequestSupportPositionData | null>(null); // ใช้ RequestSupportPositionData
  const [tableData, setTableData] = React.useState<RequestSupportPositionData[]>(initialRequestSupportPositionRows); // ใช้ initialRequestSupportPositionRows
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr07.02' }); 
    const words = label.split("HR702 "); 
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
      request_support_id: 0, // id จะถูกกำหนดเมื่อบันทึก
      staff_id: 0,
      support_position_id: 0,
      work_name: '',
      work_file: '',
      work_type: '',
      appointment_method: '',
      council_meeting: '',
      position_details: '',
      request_acad_at: '',
      request_level: '',
      request_major: '',
      isced_code: '', 
      consideration_result: '',
      meeting_place: '',
      meeting_at: '',
      create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      officer_id: 0, 
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
    if (!currentData?.work_name) newErrors.work_name = 'กรุณากรอกชื่องาน';
    if (!currentData?.work_type) newErrors.work_type = 'กรุณากรอกประเภทงาน';
    if (!currentData?.request_level) newErrors.request_level = 'กรุณากรอกระดับที่ขอ';
    if (!currentData?.request_major) newErrors.request_major = 'กรุณากรอกสาขาที่ขอ';
    if (!currentData?.consideration_result) newErrors.consideration_result = 'กรุณากรอกผลการพิจารณา';
    if (!currentData?.meeting_place) newErrors.meeting_place = 'กรุณากรอกสถานที่ประชุม';
    if (!currentData?.meeting_at) newErrors.meeting_at = 'กรุณากรอกวันที่ประชุม';
    
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.request_support_id)) + 1 : 1;
      const newData: RequestSupportPositionData = {
        ...currentData!,
        request_support_id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
      setTableData(prevData =>
        prevData.map(data =>
          data.request_support_id === currentData!.request_support_id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: RequestSupportPositionData) => { // ใช้ RequestSupportPositionData
    setDialogMode('view');
    setCurrentData(data);
    setErrors({}); 
    setAddTaskOpen(true);
  };

  const handleEditData = (data: RequestSupportPositionData) => { // ใช้ RequestSupportPositionData
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
      setTableData(prevData => prevData.filter(data => data.request_support_id !== id));
      Swal.fire(
        'ลบแล้ว!',
        'ข้อมูลของคุณถูกลบเรียบร้อยแล้ว',
        'success'
      );
    }
  };

  return (
    <AppCard
      contentStyle={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 8 }}
      title={<IntlMessages id="sidebar.hr07.02" />}  
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
            value={currentData?.request_support_id || ''}
            name="request_support_id"
            onChange={handleInputChange}
            disabled={dialogMode !== 'add'} 
          />
          <TextField
            fullWidth
            label={"รหัสบุคลากร"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.staff_id || ''}
            name="staff_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"รหัสตำแหน่งสายสนับสนุน"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.support_position_id || ''}
            name="support_position_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ชื่องาน"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.work_name || ''}
            name="work_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.work_name}
            helperText={errors.work_name}
          />
          <TextField
            fullWidth
            label={"ไฟล์งาน"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.work_file || ''}
            name="work_file"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ประเภทงาน"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.work_type || ''}
            name="work_type"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.work_type}
            helperText={errors.work_type}
          />
          <TextField
            fullWidth
            label={"วิธีการแต่งตั้ง"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.appointment_method || ''}
            name="appointment_method"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"การประชุมสภา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.council_meeting || ''}
            name="council_meeting"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"รายละเอียดตำแหน่ง"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.position_details || ''}
            name="position_details"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"วันที่ยื่นขอ"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.request_acad_at || ''}
            name="request_acad_at"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ระดับที่ขอ"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.request_level || ''}
            name="request_level"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.request_level}
            helperText={errors.request_level}
          />
          <TextField
            fullWidth
            label={"สาขาที่ขอ"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.request_major || ''}
            name="request_major"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.request_major}
            helperText={errors.request_major}
          />
          <TextField
            fullWidth
            label={"สาขาย่อยที่ขอ"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.request_submajor || ''}
            name="request_submajor"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"รหัส ISCED"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.isced_code || ''}
            name="isced_code"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ผลการพิจารณา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.consideration_result || ''}
            name="consideration_result"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.consideration_result}
            helperText={errors.consideration_result}
          />
          <TextField
            fullWidth
            label={"สถานที่ประชุม"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.meeting_place || ''}
            name="meeting_place"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.meeting_place}
            helperText={errors.meeting_place}
          />
          <TextField
            fullWidth
            label={"วันที่ประชุม"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.meeting_at || ''}
            name="meeting_at"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.meeting_at}
            helperText={errors.meeting_at}
          />
          <TextField
            fullWidth
            label={"เลขที่คำสั่งแต่งตั้ง"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.appointment_order || ''}
            name="appointment_order"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"วันที่ลงนาม"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.signature_date || ''}
            name="signature_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"วันที่เริ่มมีผล"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.effective_date || ''}
            name="effective_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"เงินเดือนตำแหน่ง"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.position_salary || ''}
            name="position_salary"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ไฟล์คำสั่งแต่งตั้ง"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.appointment_file || ''}
            name="appointment_file"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ผู้บันทึกข้อมูล (รหัสเจ้าหน้าที่)"}
            variant="outlined"
            margin="normal"
            size="small"
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

export default Hr07Page;
