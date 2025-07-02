 //hr804/index.tsx
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลการขยายระยะเวลาการลาศึกษา ---
interface LeaveStudyExpandData {
  expand_id: number;
  staff_id: number;
  duration: string;
  start_date: string;
  end_date: string;
  order_number: string;
  order_date: string;
  salary_during_extension: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองสำหรับตาราง erp_hr."LeaveStudyExpand"
const initialLeaveStudyExpandRows: LeaveStudyExpandData[] = [
  {
    expand_id: 1,
    staff_id: 201, // เชื่อมโยงกับ staff_id จาก LeaveEducation
    duration: '6 เดือน',
    start_date: '2025-08-01',
    end_date: '2026-01-31',
    order_number: 'คำสั่งขยายที่ 001/2568',
    order_date: '2025-07-25',
    salary_during_extension: 'จ่ายเต็มจำนวน',
    create_at: '2025-07-26',
    update_at: '2025-07-26',
    officer_id: 680001,
  },
  {
    expand_id: 2,
    staff_id: 202, // เชื่อมโยงกับ staff_id จาก LeaveEducation
    duration: '1 ปี',
    start_date: '2025-09-01',
    end_date: '2026-08-31',
    order_number: 'คำสั่งขยายที่ 002/2568',
    order_date: '2025-08-20',
    salary_during_extension: 'จ่ายครึ่งหนึ่ง',
    create_at: '2025-08-21',
    update_at: '2025-08-21',
    officer_id: 680001,
  },
  {
    expand_id: 3,
    staff_id: 203, // เชื่อมโยงกับ staff_id จาก LeaveEducation
    duration: '3 เดือน',
    start_date: '2025-01-01',
    end_date: '2025-03-31',
    order_number: 'คำสั่งขยายที่ 003/2568',
    order_date: '2024-12-25',
    salary_during_extension: 'ไม่ได้รับเงินเดือน',
    create_at: '2024-12-26',
    update_at: '2024-12-26',
    officer_id: 680001,
  },
  {
    expand_id: 4,
    staff_id: 204,
    duration: '4 เดือน',
    start_date: '2024-03-01',
    end_date: '2024-06-30',
    order_number: 'คำสั่งขยายที่ 004/2567',
    order_date: '2024-02-20',
    salary_during_extension: 'จ่ายเต็มจำนวน',
    create_at: '2024-02-21',
    update_at: '2024-02-21',
    officer_id: 680001,
  },
  {
    expand_id: 5,
    staff_id: 205,
    duration: '9 เดือน',
    start_date: '2023-01-01',
    end_date: '2023-09-30',
    order_number: 'คำสั่งขยายที่ 005/2566',
    order_date: '2022-12-15',
    salary_during_extension: 'จ่ายครึ่งหนึ่ง',
    create_at: '2022-12-16',
    update_at: '2022-12-16',
    officer_id: 680001,
  },
  {
    expand_id: 6,
    staff_id: 201, // บุคลากรคนเดิมขอขยายอีกครั้ง
    duration: '2 เดือน',
    start_date: '2026-02-01',
    end_date: '2026-03-31',
    order_number: 'คำสั่งขยายที่ 006/2569',
    order_date: '2026-01-20',
    salary_during_extension: 'จ่ายเต็มจำนวน',
    create_at: '2026-01-21',
    update_at: '2026-01-21',
    officer_id: 680001,
  },
];


const Hr05Page = () => { // เปลี่ยนชื่อ Component เป็น Hr05Page
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<LeaveStudyExpandData | null>(null); // ใช้ LeaveStudyExpandData
  const [tableData, setTableData] = React.useState<LeaveStudyExpandData[]>(initialLeaveStudyExpandRows); // ใช้ initialLeaveStudyExpandRows
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr08.04' }); 
    const words = label.split("HR804 "); // เปลี่ยน HR104 เป็น HR105
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
      expand_id: 0, // id จะถูกกำหนดเมื่อบันทึก
      staff_id: 0,
      duration: '',
      start_date: '',
      end_date: '',
      order_number: '',
      order_date: '',
      salary_during_extension: '',
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
    if (!currentData?.duration) newErrors.duration = 'กรุณากรอกระยะเวลา';
    if (!currentData?.start_date) newErrors.start_date = 'กรุณากรอกวันที่เริ่มต้น';
    if (!currentData?.end_date) newErrors.end_date = 'กรุณากรอกวันที่สิ้นสุด';
    if (!currentData?.order_number) newErrors.order_number = 'กรุณากรอกเลขที่คำสั่ง';
    if (!currentData?.order_date) newErrors.order_date = 'กรุณากรอกวันที่คำสั่ง';
    if (!currentData?.salary_during_extension) newErrors.salary_during_extension = 'กรุณากรอกเงินเดือนระหว่างขยาย';
    
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.expand_id)) + 1 : 1;
      const newData: LeaveStudyExpandData = {
        ...currentData!,
        expand_id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
      setTableData(prevData =>
        prevData.map(data =>
          data.expand_id === currentData!.expand_id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: LeaveStudyExpandData) => { // ใช้ LeaveStudyExpandData
    setDialogMode('view');
    setCurrentData(data);
    setErrors({}); 
    setAddTaskOpen(true);
  };

  const handleEditData = (data: LeaveStudyExpandData) => { // ใช้ LeaveStudyExpandData
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
      setTableData(prevData => prevData.filter(data => data.expand_id !== id));
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
      title={<IntlMessages id="sidebar.hr08.04" />}
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
            value={currentData?.expand_id || ''}
            name="expand_id"
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
            label={"ระยะเวลา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.duration || ''}
            name="duration"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.duration}
            helperText={errors.duration}
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
            label={"เลขที่คำสั่ง"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.order_number || ''}
            name="order_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.order_number}
            helperText={errors.order_number}
          />
          <TextField
            fullWidth
            label={"วันที่คำสั่ง"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.order_date || ''}
            name="order_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.order_date}
            helperText={errors.order_date}
          />
          <TextField
            fullWidth
            label={"เงินเดือนระหว่างขยาย"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.salary_during_extension || ''}
            name="salary_during_extension"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.salary_during_extension}
            helperText={errors.salary_during_extension}
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

export default Hr05Page;  