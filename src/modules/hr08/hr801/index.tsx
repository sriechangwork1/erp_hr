 //hr801/index.tsx
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลการลาศึกษา ---
interface LeaveEducationData {
  leave_education_id: number;
  staff_id: number;
  education_type: string;
  time_usage: string;
  study_duration: number;
  start_date: string;
  end_date: string;
  salary_during_leave: string;
  contract_number: string;
  contract_date: string;
  leave_order_number: string;
  leave_order_date: string;
  leave_order_file: string;
  study_level: string;
  study_plan: string;
  institution: string;
  scholarship_type: string;
  study_status: string;
  graduation_date?: string; // อาจเป็นค่าว่างได้
  return_to_work_date?: string; // อาจเป็นค่าว่างได้
  return_order_number?: string; // อาจเป็นค่าว่างได้
  return_order_date?: string; // อาจเป็นค่าว่างได้
  scholarship_repayment?: string; // อาจเป็นค่าว่างได้
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองสำหรับตาราง erp_hr."LeaveEducation"
const initialLeaveEducationRows: LeaveEducationData[] = [
  {
    leave_education_id: 1,
    staff_id: 201,
    education_type: 'ภายในประเทศ',
    time_usage: 'เต็มเวลา',
    study_duration: 2,
    start_date: '2023-08-01',
    end_date: '2025-07-31',
    salary_during_leave: 'จ่ายเต็มจำนวน',
    contract_number: 'สัญญาลาศึกษา/66/001',
    contract_date: '2023-07-20',
    leave_order_number: 'คำสั่งที่ 123/2566',
    leave_order_date: '2023-07-25',
    leave_order_file: 'leave_order_123_2566.pdf',
    study_level: 'ปริญญาโท สาขาบริหารธุรกิจ',
    study_plan: 'ศึกษาในหลักสูตร MBA ภาคพิเศษ เรียนวันเสาร์-อาทิตย์',
    institution: 'มหาวิทยาลัยธรรมศาสตร์',
    scholarship_type: 'ทุนส่วนตัว',
    study_status: 'กำลังศึกษา',
    create_at: '2023-07-26',
    update_at: '2024-06-11',
    officer_id: 1,
  },
  {
    leave_education_id: 2,
    staff_id: 202,
    education_type: 'ต่างประเทศ',
    time_usage: 'เต็มเวลา',
    study_duration: 3,
    start_date: '2022-09-01',
    end_date: '2025-08-31',
    salary_during_leave: 'จ่ายครึ่งหนึ่ง',
    contract_number: 'สัญญาลาศึกษา/65/005',
    contract_date: '2022-08-10',
    leave_order_number: 'คำสั่งที่ 088/2565',
    leave_order_date: '2022-08-15',
    leave_order_file: 'leave_order_088_2565.pdf',
    study_level: 'ปริญญาเอก สาขาวิทยาการคอมพิวเตอร์',
    study_plan: 'ทำการวิจัยและเขียนวิทยานิพนธ์',
    institution: 'University of Cambridge',
    scholarship_type: 'ทุนรัฐบาล',
    study_status: 'กำลังศึกษา',
    create_at: '2022-08-16',
    update_at: '2024-06-11',
    officer_id: 2,
  },
  {
    leave_education_id: 3,
    staff_id: 203,
    education_type: 'ภายในประเทศ',
    time_usage: 'บางส่วน',
    study_duration: 1,
    start_date: '2024-01-15',
    end_date: '2024-12-31',
    salary_during_leave: 'จ่ายเต็มจำนวน',
    contract_number: 'สัญญาลาศึกษา/67/010',
    contract_date: '2024-01-05',
    leave_order_number: 'คำสั่งที่ 001/2567',
    leave_order_date: '2024-01-10',
    leave_order_file: 'leave_order_001_2567.pdf',
    study_level: 'ประกาศนียบัตรวิชาชีพชั้นสูง สาขาการบัญชี',
    study_plan: 'เรียนภาคค่ำ',
    institution: 'วิทยาลัยเทคนิคมีนบุรี',
    scholarship_type: 'ทุนส่วนตัว',
    study_status: 'กำลังศึกษา',
    create_at: '2024-01-11',
    update_at: '2024-06-11',
    officer_id: 3,
  },
  {
    leave_education_id: 4,
    staff_id: 204,
    education_type: 'ต่างประเทศ',
    time_usage: 'เต็มเวลา',
    study_duration: 4,
    start_date: '2019-09-01',
    end_date: '2023-08-31',
    salary_during_leave: 'ไม่ได้รับเงินเดือน',
    contract_number: 'สัญญาลาศึกษา/62/020',
    contract_date: '2019-08-20',
    leave_order_number: 'คำสั่งที่ 050/2562',
    leave_order_date: '2019-08-25',
    leave_order_file: 'leave_order_050_2562.pdf',
    study_level: 'ปริญญาเอก สาขาเศรษฐศาสตร์',
    study_plan: 'ศึกษาและทำวิทยานิพนธ์',
    institution: 'London School of Economics',
    scholarship_type: 'ทุนส่วนตัว',
    study_status: 'ศึกษาจบหลักสูตร',
    graduation_date: '2023-08-31',
    return_to_work_date: '2023-09-15',
    return_order_number: 'คำสั่งคืนงานที่ 005/2566',
    return_order_date: '2023-09-10',
    scholarship_repayment: 'ไม่มี',
    create_at: '2019-08-26',
    update_at: '2023-09-10',
    officer_id: 4,
  },
  {
    leave_education_id: 5,
    staff_id: 205,
    education_type: 'ภายในประเทศ',
    time_usage: 'เต็มเวลา',
    study_duration: 2,
    start_date: '2021-06-01',
    end_date: '2023-05-31',
    salary_during_leave: 'จ่ายเต็มจำนวน',
    contract_number: 'สัญญาลาศึกษา/64/015',
    contract_date: '2021-05-20',
    leave_order_number: 'คำสั่งที่ 030/2564',
    leave_order_date: '2021-05-25',
    leave_order_file: 'leave_order_030_2564.pdf',
    study_level: 'ปริญญาโท สาขาวิศวกรรมซอฟต์แวร์',
    study_plan: 'เรียนและทำโปรเจกต์จบ',
    institution: 'จุฬาลงกรณ์มหาวิทยาลัย',
    scholarship_type: 'ทุนหน่วยงาน',
    study_status: 'ไม่จบการศึกษา',
    graduation_date: undefined,
    return_to_work_date: '2023-06-15',
    return_order_number: 'คำสั่งคืนงานที่ 008/2566',
    return_order_date: '2023-06-10',
    scholarship_repayment: 'มี (ระยะเวลา 2 ปี)',
    create_at: '2021-05-26',
    update_at: '2023-06-10',
    officer_id: 5,
  },
];


const Hr08Page = () => { // เปลี่ยนชื่อ Component เป็น Hr08Page
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<LeaveEducationData | null>(null); // ใช้ LeaveEducationData
  const [tableData, setTableData] = React.useState<LeaveEducationData[]>(initialLeaveEducationRows); // ใช้ initialLeaveEducationRows
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr08.01' }); 
    const words = label.split("HR801 ");
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
      leave_education_id: 0, // id จะถูกกำหนดเมื่อบันทึก
      staff_id: 0,
      education_type: '',
      time_usage: '',
      study_duration: 0,
      start_date: '',
      end_date: '',
      salary_during_leave: '',
      contract_number: '',
      contract_date: '',
      leave_order_number: '',
      leave_order_date: '',
      leave_order_file: '',
      study_level: '',
      study_plan: '',
      institution: '',
      scholarship_type: '',
      study_status: '',
      graduation_date: undefined,
      return_to_work_date: undefined,
      return_order_number: undefined,
      return_order_date: undefined,
      scholarship_repayment: undefined,
      create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      officer_id: 680001, 
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
    if (!currentData?.education_type) newErrors.education_type = 'กรุณากรอกประเภทการศึกษา';
    if (!currentData?.time_usage) newErrors.time_usage = 'กรุณากรอกการใช้เวลา';
    if (!currentData?.study_duration) newErrors.study_duration = 'กรุณากรอกระยะเวลาศึกษา';
    if (!currentData?.start_date) newErrors.start_date = 'กรุณากรอกวันที่เริ่มต้น';
    if (!currentData?.end_date) newErrors.end_date = 'กรุณากรอกวันที่สิ้นสุด';
    if (!currentData?.salary_during_leave) newErrors.salary_during_leave = 'กรุณากรอกเงินเดือนระหว่างลา';
    if (!currentData?.contract_number) newErrors.contract_number = 'กรุณากรอกเลขที่สัญญา';
    if (!currentData?.contract_date) newErrors.contract_date = 'กรุณากรอกวันที่ทำสัญญา';
    if (!currentData?.leave_order_number) newErrors.leave_order_number = 'กรุณากรอกเลขที่คำสั่งลา';
    if (!currentData?.leave_order_date) newErrors.leave_order_date = 'กรุณากรอกวันที่คำสั่งลา';
    if (!currentData?.leave_order_file) newErrors.leave_order_file = 'กรุณากรอกชื่อไฟล์คำสั่งลา';
    if (!currentData?.study_level) newErrors.study_level = 'กรุณากรอกระดับการศึกษา';
    if (!currentData?.study_plan) newErrors.study_plan = 'กรุณากรอกแผนการศึกษา';
    if (!currentData?.institution) newErrors.institution = 'กรุณากรอกสถาบัน';
    if (!currentData?.scholarship_type) newErrors.scholarship_type = 'กรุณากรอกประเภททุน';
    if (!currentData?.study_status) newErrors.study_status = 'กรุณากรอกสถานะการศึกษา';
    // graduation_date, return_to_work_date, return_order_number, return_order_date, scholarship_repayment สามารถเป็นค่าว่างได้

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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.leave_education_id)) + 1 : 1;
      const newData: LeaveEducationData = {
        ...currentData!,
        leave_education_id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
      setTableData(prevData =>
        prevData.map(data =>
          data.leave_education_id === currentData!.leave_education_id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: LeaveEducationData) => { // ใช้ LeaveEducationData
    setDialogMode('view');
    setCurrentData(data);
    setErrors({}); 
    setAddTaskOpen(true);
  };

  const handleEditData = (data: LeaveEducationData) => { // ใช้ LeaveEducationData
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
      setTableData(prevData => prevData.filter(data => data.leave_education_id !== id));
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
      title={<IntlMessages id="sidebar.hr08.01" />}
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
            value={currentData?.leave_education_id || ''}
            name="leave_education_id"
            onChange={handleInputChange}
            disabled={dialogMode !== 'add'} 
          />
          <TextField
            fullWidth
            label={"รหัสพนักงาน"}
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
            label={"ประเภทการศึกษา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.education_type || ''}
            name="education_type"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.education_type}
            helperText={errors.education_type}
          />
          <TextField
            fullWidth
            label={"การใช้เวลา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.time_usage || ''}
            name="time_usage"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.time_usage}
            helperText={errors.time_usage}
          />
          <TextField
            fullWidth
            label={"ระยะเวลาศึกษา (ปี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.study_duration || ''}
            name="study_duration"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.study_duration}
            helperText={errors.study_duration}
          />
          <TextField
            fullWidth
            label={"วันที่เริ่มต้น"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.start_date || ''}
            name="start_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.start_date}
            helperText={errors.start_date}
          />
          <TextField
            fullWidth
            label={"วันที่สิ้นสุด"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.end_date || ''}
            name="end_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.end_date}
            helperText={errors.end_date}
          />
          <TextField
            fullWidth
            label={"เงินเดือนระหว่างลา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.salary_during_leave || ''}
            name="salary_during_leave"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.salary_during_leave}
            helperText={errors.salary_during_leave}
          />
          <TextField
            fullWidth
            label={"เลขที่สัญญา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.contract_number || ''}
            name="contract_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.contract_number}
            helperText={errors.contract_number}
          />
          <TextField
            fullWidth
            label={"วันที่ทำสัญญา"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.contract_date || ''}
            name="contract_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.contract_date}
            helperText={errors.contract_date}
          />
          <TextField
            fullWidth
            label={"เลขที่คำสั่งลา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.leave_order_number || ''}
            name="leave_order_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.leave_order_number}
            helperText={errors.leave_order_number}
          />
          <TextField
            fullWidth
            label={"วันที่คำสั่งลา"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.leave_order_date || ''}
            name="leave_order_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.leave_order_date}
            helperText={errors.leave_order_date}
          />
          <TextField
            fullWidth
            label={"ไฟล์คำสั่งลา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.leave_order_file || ''}
            name="leave_order_file"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.leave_order_file}
            helperText={errors.leave_order_file}
          />
          <TextField
            fullWidth
            label={"ระดับการศึกษา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.study_level || ''}
            name="study_level"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.study_level}
            helperText={errors.study_level}
          />
          <TextField
            fullWidth
            label={"แผนการศึกษา"}
            variant="outlined"
            margin="normal"
            size="small"
            multiline
            rows={2}
            value={currentData?.study_plan || ''}
            name="study_plan"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.study_plan}
            helperText={errors.study_plan}
          />
          <TextField
            fullWidth
            label={"สถาบัน"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.institution || ''}
            name="institution"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.institution}
            helperText={errors.institution}
          />
          <TextField
            fullWidth
            label={"ประเภททุน"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.scholarship_type || ''}
            name="scholarship_type"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.scholarship_type}
            helperText={errors.scholarship_type}
          />
          <TextField
            fullWidth
            label={"สถานะการศึกษา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.study_status || ''}
            name="study_status"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.study_status}
            helperText={errors.study_status}
          />
          <TextField
            fullWidth
            label={"วันที่จบการศึกษา (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.graduation_date || ''}
            name="graduation_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"วันที่กลับมาทำงาน (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.return_to_work_date || ''}
            name="return_to_work_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"เลขที่คำสั่งกลับมาทำงาน (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.return_order_number || ''}
            name="return_order_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"วันที่คำสั่งกลับมาทำงาน (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.return_order_date || ''}
            name="return_order_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"การชดใช้ทุน (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.scholarship_repayment || ''}
            name="scholarship_repayment"
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

export default Hr08Page;  