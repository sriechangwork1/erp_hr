 //hr806/index.tsx
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลการฝึกอบรม ---
interface TrainingData {
  training_id: number;
  staff_id: number;
  training_name: string;
  training_type: string;
  development_method: string;
  competency: string;
  start_date: string;
  end_date: string;
  institution: string;
  order_number: string;
  order_date: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองสำหรับตาราง erp_hr."Training"
const initialTrainingRows: TrainingData[] = [
  {
    training_id: 1,
    staff_id: 301,
    training_name: 'การพัฒนาทักษะการเป็นผู้นำยุคใหม่',
    training_type: 'การฝึกอบรมภายใน',
    development_method: 'อบรมเชิงปฏิบัติการ, กรณีศึกษา',
    competency: 'ความเป็นผู้นำ, การตัดสินใจ',
    start_date: '2024-06-10',
    end_date: '2024-06-14',
    institution: 'สำนักงาน ก.พ.',
    order_number: 'คำสั่งฝึกอบรม/2567/001',
    order_date: '2024-06-01',
    create_at: '2024-06-01',
    update_at: '2024-06-10',
    officer_id: 680001,
  },
  {
    training_id: 2,
    staff_id: 302,
    training_name: 'อบรมหลักสูตรการวิเคราะห์ข้อมูลด้วย Python',
    training_type: 'การฝึกอบรมภายนอก',
    development_method: 'บรรยาย, ปฏิบัติการ, โปรเจกต์กลุ่ม',
    competency: 'การวิเคราะห์ข้อมูล, การเขียนโปรแกรม',
    start_date: '2024-07-01',
    end_date: '2024-07-12',
    institution: 'ศูนย์อบรมเทคโนโลยีสารสนเทศ',
    order_number: 'คำสั่งฝึกอบรม/2567/002',
    order_date: '2024-06-20',
    create_at: '2024-06-20',
    update_at: '2024-07-01',
    officer_id: 680001,
  },
  {
    training_id: 3,
    staff_id: 301,
    training_name: 'การบริหารจัดการความเสี่ยงองค์กร',
    training_type: 'การฝึกอบรมภายใน',
    development_method: 'เสวนา, ระดมสมอง',
    competency: 'การบริหารความเสี่ยง, การวางแผนเชิงกลยุทธ์',
    start_date: '2025-01-15',
    end_date: '2025-01-17',
    institution: 'กรมการเงินและบัญชี',
    order_number: 'คำสั่งฝึกอบรม/2568/001',
    order_date: '2025-01-05',
    create_at: '2025-01-05',
    update_at: '2025-01-15',
    officer_id: 680001,
  },
  {
    training_id: 4,
    staff_id: 303,
    training_name: 'สัมมนาวิชาการด้านนวัตกรรมดิจิทัล',
    training_type: 'การประชุม/สัมมนา',
    development_method: 'การนำเสนอผลงาน, การแลกเปลี่ยนความรู้',
    competency: 'นวัตกรรม, การคิดเชิงสร้างสรรค์',
    start_date: '2024-09-01',
    end_date: '2024-09-02',
    institution: 'สมาคมเทคโนโลยีสารสนเทศ',
    order_number: 'คำสั่งฝึกอบรม/2567/003',
    order_date: '2024-08-20',
    create_at: '2024-08-20',
    update_at: '2024-09-01',
    officer_id: 680001,
  },
  {
    training_id: 5,
    staff_id: 304,
    training_name: 'หลักสูตรการบริการที่เป็นเลิศ (Service Excellence)',
    training_type: 'การฝึกอบรมภายนอก',
    development_method: 'บทบาทสมมติ, ฝึกปฏิบัติ',
    competency: 'การบริการ, การสื่อสาร',
    start_date: '2024-10-05',
    end_date: '2024-10-06',
    institution: 'บริษัท เทรนนิ่งไทย จำกัด',
    order_number: 'คำสั่งฝึกอบรม/2567/004',
    order_date: '2024-09-25',
    create_at: '2024-09-25',
    update_at: '2024-10-05',
    officer_id: 680001,
  },
  {
    training_id: 6,
    staff_id: 305,
    training_name: 'การพัฒนาเว็บไซต์ด้วย React Framework',
    training_type: 'การฝึกอบรมภายนอก',
    development_method: 'โค้ดดิ้งแบบเข้มข้น, การแก้ปัญหา',
    competency: 'การพัฒนาเว็บ, JavaScript',
    start_date: '2025-03-01',
    end_date: '2025-03-07',
    institution: 'Code Academy',
    order_number: 'คำสั่งฝึกอบรม/2568/002',
    order_date: '2025-02-15',
    create_at: '2025-02-15',
    update_at: '2025-03-01',
    officer_id: 680001,
  },
];


const Hr08Page = () => { // เปลี่ยนชื่อ Component เป็น Hr08Page
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<TrainingData | null>(null); // ใช้ TrainingData
  const [tableData, setTableData] = React.useState<TrainingData[]>(initialTrainingRows); // ใช้ initialTrainingRows
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr08.06' }); 
    const words = label.split("HR806 "); 
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
      training_name: '',
      training_type: '',
      development_method: '',
      competency: '',
      start_date: '',
      end_date: '',
      institution: '',
      order_number: '',
      order_date: '',
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
    if (!currentData?.training_name) newErrors.training_name = 'กรุณากรอกชื่อหลักสูตร';
    if (!currentData?.training_type) newErrors.training_type = 'กรุณาเลือกประเภทการฝึกอบรม';
    if (!currentData?.development_method) newErrors.development_method = 'กรุณากรอกวิธีการพัฒนา';
    if (!currentData?.competency) newErrors.competency = 'กรุณากรอกสมรรถนะที่พัฒนา';
    if (!currentData?.start_date) newErrors.start_date = 'กรุณากรอกวันที่เริ่มต้น';
    if (!currentData?.end_date) newErrors.end_date = 'กรุณากรอกวันที่สิ้นสุด';
    if (!currentData?.institution) newErrors.institution = 'กรุณากรอกสถาบัน';
    
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
      const newData: TrainingData = {
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

  const handleViewData = (data: TrainingData) => { // ใช้ TrainingData
    setDialogMode('view');
    setCurrentData(data);
    setErrors({}); 
    setAddTaskOpen(true);
  };

  const handleEditData = (data: TrainingData) => { // ใช้ TrainingData
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
      title={<IntlMessages id="sidebar.hr08.06" />}  
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
            label={"ชื่อหลักสูตรการฝึกอบรม"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.training_name || ''}
            name="training_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.training_name}
            helperText={errors.training_name}
          />
          <TextField
            fullWidth
            label={"ประเภทการฝึกอบรม"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.training_type || ''}
            name="training_type"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.training_type}
            helperText={errors.training_type}
          />
          <TextField
            fullWidth
            label={"วิธีการพัฒนา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.development_method || ''}
            name="development_method"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.development_method}
            helperText={errors.development_method}
          />
          <TextField
            fullWidth
            label={"สมรรถนะที่พัฒนา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.competency || ''}
            name="competency"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.competency}
            helperText={errors.competency}
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
            label={"เลขที่คำสั่ง"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.order_number || ''}
            name="order_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"วันที่ออกคำสั่ง"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.order_date || ''}
            name="order_date"
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