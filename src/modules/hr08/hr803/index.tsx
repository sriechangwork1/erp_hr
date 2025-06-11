 //hr803/index.tsx
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลผลการศึกษาการลาศึกษา ---
interface LeaveStudyResultsData {
  result_id: number;
  staff_id: number;
  education_level: string;
  report_date: string;
  academic_year: string;
  semester: string;
  gpa: number;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองสำหรับตาราง erp_hr."LeaveStudyResults"
const initialLeaveStudyResultsRows: LeaveStudyResultsData[] = [
  {
    result_id: 1,
    staff_id: 201, // เชื่อมโยงกับ staff_id จาก LeaveEducation
    education_level: 'ปริญญาโท',
    report_date: '2024-01-15',
    academic_year: '2566',
    semester: '1',
    gpa: 3.85,
    create_at: '2024-01-10',
    update_at: '2024-01-15',
    officer_id: 680001,
  },
  {
    result_id: 2,
    staff_id: 202, // เชื่อมโยงกับ staff_id จาก LeaveEducation
    education_level: 'ปริญญาเอก',
    report_date: '2023-12-20',
    academic_year: '2566',
    semester: '1',
    gpa: 3.92,
    create_at: '2023-12-15',
    update_at: '2023-12-20',
    officer_id: 680001,
  },
  {
    result_id: 3,
    staff_id: 201,
    education_level: 'ปริญญาโท',
    report_date: '2024-06-10',
    academic_year: '2566',
    semester: '2',
    gpa: 3.70,
    create_at: '2024-06-05',
    update_at: '2024-06-10',
    officer_id: 680001,
  },
  {
    result_id: 4,
    staff_id: 203,
    education_level: 'ปวส.',
    report_date: '2024-05-25',
    academic_year: '2566',
    semester: '2',
    gpa: 3.55,
    create_at: '2024-05-20',
    update_at: '2024-05-25',
    officer_id: 680001,
  },
  {
    result_id: 5,
    staff_id: 202,
    education_level: 'ปริญญาเอก',
    report_date: '2024-06-01',
    academic_year: '2566',
    semester: '2',
    gpa: 3.95,
    create_at: '2024-05-28',
    update_at: '2024-06-01',
    officer_id: 680001,
  },
  {
    result_id: 6,
    staff_id: 204,
    education_level: 'ปริญญาเอก',
    report_date: '2023-01-30',
    academic_year: '2565',
    semester: '2',
    gpa: 3.80,
    create_at: '2023-01-25',
    update_at: '2023-01-30',
    officer_id: 680001,
  },
];


const Hr08Page = () => { // เปลี่ยนชื่อ Component เป็น Hr08Page
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<LeaveStudyResultsData | null>(null); // ใช้ LeaveStudyResultsData
  const [tableData, setTableData] = React.useState<LeaveStudyResultsData[]>(initialLeaveStudyResultsRows); // ใช้ initialLeaveStudyResultsRows
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr08.03' }); 
    const words = label.split("HR803 ");
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
      result_id: 0, // id จะถูกกำหนดเมื่อบันทึก
      staff_id: 0,
      education_level: '',
      report_date: '',
      academic_year: '',
      semester: '',
      gpa: 0,
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
      [name]: name === 'gpa' ? parseFloat(value) : value, // แปลง gpa เป็นตัวเลข
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
    if (!currentData?.education_level) newErrors.education_level = 'กรุณากรอกระดับการศึกษา';
    if (!currentData?.report_date) newErrors.report_date = 'กรุณากรอกวันที่รายงานผล';
    if (!currentData?.academic_year) newErrors.academic_year = 'กรุณากรอกปีการศึกษา';
    if (!currentData?.semester) newErrors.semester = 'กรุณากรอกภาคเรียน';
    if (!currentData?.gpa || currentData?.gpa < 0 || currentData?.gpa > 4) newErrors.gpa = 'กรุณากรอก GPA ที่ถูกต้อง (0-4)';
    
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.result_id)) + 1 : 1;
      const newData: LeaveStudyResultsData = {
        ...currentData!,
        result_id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
      setTableData(prevData =>
        prevData.map(data =>
          data.result_id === currentData!.result_id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: LeaveStudyResultsData) => { // ใช้ LeaveStudyResultsData
    setDialogMode('view');
    setCurrentData(data);
    setErrors({}); 
    setAddTaskOpen(true);
  };

  const handleEditData = (data: LeaveStudyResultsData) => { // ใช้ LeaveStudyResultsData
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
      setTableData(prevData => prevData.filter(data => data.result_id !== id));
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
      title={<IntlMessages id="sidebar.hr08.03" />}
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
            value={currentData?.result_id || ''}
            name="result_id"
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
            label={"ระดับการศึกษา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.education_level || ''}
            name="education_level"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.education_level}
            helperText={errors.education_level}
          />
          <TextField
            fullWidth
            label={"วันที่รายงานผล"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.report_date || ''}
            name="report_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.report_date}
            helperText={errors.report_date}
          />
          <TextField
            fullWidth
            label={"ปีการศึกษา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.academic_year || ''}
            name="academic_year"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.academic_year}
            helperText={errors.academic_year}
          />
          <TextField
            fullWidth
            label={"ภาคเรียน"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.semester || ''}
            name="semester"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.semester}
            helperText={errors.semester}
          />
          <TextField
            fullWidth
            label={"GPA"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            inputProps={{ step: "0.01", min: "0", max: "4" }} // กำหนดช่วง GPA
            value={currentData?.gpa || ''}
            name="gpa"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.gpa}
            helperText={errors.gpa}
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