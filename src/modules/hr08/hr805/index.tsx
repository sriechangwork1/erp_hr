 //hr805/index.tsx
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลการฝึกอบรมการลาศึกษา ---
interface LeaveStudyTrainingData {
  training_id: number;
  staff_id: number;
  course_name: string;
  organizer: string;
  location: string;
  event_date: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองสำหรับตาราง erp_hr."LeaveStudyTraining"
const initialLeaveStudyTrainingRows: LeaveStudyTrainingData[] = [
  {
    training_id: 1,
    staff_id: 201, // เชื่อมโยงกับ staff_id จาก LeaveEducation
    course_name: 'หลักสูตรการบริหารจัดการโครงการด้วย Agile',
    organizer: 'สถาบันพัฒนาบุคลากรภาครัฐ',
    location: 'โรงแรม Grand Hyatt Erawan, กรุงเทพฯ',
    event_date: '2024-03-10',
    create_at: '2024-03-01',
    update_at: '2024-03-10',
    officer_id: 680001,
  },
  {
    training_id: 2,
    staff_id: 202,
    course_name: 'การอบรมเชิงปฏิบัติการด้าน Data Science สำหรับนักวิจัย',
    organizer: 'คณะวิทยาศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย',
    location: 'ศูนย์คอมพิวเตอร์ จุฬาลงกรณ์มหาวิทยาลัย',
    event_date: '2024-05-15',
    create_at: '2024-05-01',
    update_at: '2024-05-15',
    officer_id: 680001,
  },
  {
    training_id: 3,
    staff_id: 203,
    course_name: 'สัมมนาการพัฒนาทักษะการสื่อสารเพื่อประสิทธิภาพการทำงาน',
    organizer: 'กรมประชาสัมพันธ์',
    location: 'หอประชุมกรมประชาสัมพันธ์',
    event_date: '2025-01-20',
    create_at: '2025-01-10',
    update_at: '2025-01-20',
    officer_id: 680001,
  },
  {
    training_id: 4,
    staff_id: 204,
    course_name: 'Workshop: Advanced Python for Data Analysis',
    organizer: 'Tech Solutions Co., Ltd.',
    location: 'ออนไลน์ (Zoom Meeting)',
    event_date: '2024-11-01',
    create_at: '2024-10-20',
    update_at: '2024-11-01',
    officer_id: 680001,
  },
  {
    training_id: 5,
    staff_id: 201,
    course_name: 'การดูงานระบบบริหารงานบุคคลภาครัฐอิเล็กทรอนิกส์',
    organizer: 'สำนักงาน ก.พ.',
    location: 'สำนักงาน ก.พ. (นนทบุรี)',
    event_date: '2025-02-28',
    create_at: '2025-02-15',
    update_at: '2025-02-28',
    officer_id: 680001,
  },
  {
    training_id: 6,
    staff_id: 205,
    course_name: 'หลักสูตรนักบริหารระดับกลาง',
    organizer: 'สถาบันพระปกเกล้า',
    location: 'สถาบันพระปกเกล้า (แจ้งวัฒนะ)',
    event_date: '2024-07-05',
    create_at: '2024-06-25',
    update_at: '2024-07-05',
    officer_id: 680001,
  },
];


const Hr08Page = () => { // เปลี่ยนชื่อ Component เป็น Hr08Page
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<LeaveStudyTrainingData | null>(null); // ใช้ LeaveStudyTrainingData
  const [tableData, setTableData] = React.useState<LeaveStudyTrainingData[]>(initialLeaveStudyTrainingRows); // ใช้ initialLeaveStudyTrainingRows
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr08.05' }); 
    const words = label.split("HR805 ");
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
      training_id: 0, // id จะถูกกำหนดเมื่อบันทึก
      staff_id: 0,
      course_name: '',
      organizer: '',
      location: '',
      event_date: '',
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
    if (!currentData?.course_name) newErrors.course_name = 'กรุณากรอกชื่อหลักสูตร';
    if (!currentData?.organizer) newErrors.organizer = 'กรุณากรอกผู้จัด';
    if (!currentData?.location) newErrors.location = 'กรุณากรอกสถานที่';
    if (!currentData?.event_date) newErrors.event_date = 'กรุณากรอกวันที่จัดกิจกรรม';
    
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.training_id)) + 1 : 1;
      const newData: LeaveStudyTrainingData = {
        ...currentData!,
        training_id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
      setTableData(prevData =>
        prevData.map(data =>
          data.training_id === currentData!.training_id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: LeaveStudyTrainingData) => { // ใช้ LeaveStudyTrainingData
    setDialogMode('view');
    setCurrentData(data);
    setErrors({}); 
    setAddTaskOpen(true);
  };

  const handleEditData = (data: LeaveStudyTrainingData) => { // ใช้ LeaveStudyTrainingData
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
      setTableData(prevData => prevData.filter(data => data.training_id !== id));
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
      title={<IntlMessages id="sidebar.hr08.05" />} 
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
            value={currentData?.training_id || ''}
            name="training_id"
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
            label={"ชื่อหลักสูตร"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.course_name || ''}
            name="course_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.course_name}
            helperText={errors.course_name}
          />
          <TextField
            fullWidth
            label={"ผู้จัด"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.organizer || ''}
            name="organizer"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.organizer}
            helperText={errors.organizer}
          />
          <TextField
            fullWidth
            label={"สถานที่"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.location || ''}
            name="location"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.location}
            helperText={errors.location}
          />
          <TextField
            fullWidth
            label={"วันที่จัดกิจกรรม"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.event_date || ''}
            name="event_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.event_date}
            helperText={errors.event_date}
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