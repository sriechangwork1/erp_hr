 //hr704/index.tsx
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลความเชี่ยวชาญสายสนับสนุน ---
interface SupportExpertiseData {
  expertise_id: number;
  staff_id: number;
  expertise_name: string;
  isced_code: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองสำหรับตาราง erp_hr."SupportExpertise"
const initialSupportExpertiseRows: SupportExpertiseData[] = [
  {
    expertise_id: 1,
    staff_id: 501, // อ้างอิงจาก staff_id ในตารางอื่น
    expertise_name: 'การบริหารงานบุคคล',
    isced_code: '041', // Business and administration
    create_at: '2023-05-01',
    update_at: '2024-01-10',
    officer_id: 1,
  },
  {
    expertise_id: 2,
    staff_id: 502,
    expertise_name: 'การจัดการฐานข้อมูล',
    isced_code: '061', // Information and Communication Technologies
    create_at: '2023-06-15',
    update_at: '2024-02-20',
    officer_id: 2,
  },
  {
    expertise_id: 3,
    staff_id: 503,
    expertise_name: 'การวิเคราะห์และวางแผนนโยบาย',
    isced_code: '041', // Business and administration
    create_at: '2023-07-20',
    update_at: '2024-03-05',
    officer_id: 3,
  },
  {
    expertise_id: 4,
    staff_id: 504,
    expertise_name: 'การจัดซื้อจัดจ้างภาครัฐ',
    isced_code: '041', // Business and administration
    create_at: '2023-08-10',
    update_at: '2024-04-15',
    officer_id: 4,
  },
  {
    expertise_id: 5,
    staff_id: 505,
    expertise_name: 'การเงินและบัญชีภาครัฐ',
    isced_code: '041', // Business and administration
    create_at: '2023-09-01',
    update_at: '2024-05-25',
    officer_id: 5,
  },
  {
    expertise_id: 6,
    staff_id: 501, // บุคลากรคนเดิมแต่มีหลายความเชี่ยวชาญ
    expertise_name: 'การพัฒนาระบบสารสนเทศสำหรับองค์กร',
    isced_code: '061', // Information and Communication Technologies
    create_at: '2024-01-01',
    update_at: '2024-06-01',
    officer_id: 1,
  },
];


const Hr12Page = () => { // เปลี่ยนชื่อ Component เป็น Hr12Page
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<SupportExpertiseData | null>(null); // ใช้ SupportExpertiseData
  const [tableData, setTableData] = React.useState<SupportExpertiseData[]>(initialSupportExpertiseRows); // ใช้ initialSupportExpertiseRows
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr07.04' }); 
    const words = label.split("HR704 "); 
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
      expertise_id: 0, // id จะถูกกำหนดเมื่อบันทึก
      staff_id: 0,
      expertise_name: '',
      isced_code: '',
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
    if (!currentData?.expertise_name) newErrors.expertise_name = 'กรุณากรอกชื่อความเชี่ยวชาญ';
    if (!currentData?.isced_code) newErrors.isced_code = 'กรุณากรอกรหัส ISCED';
    
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.expertise_id)) + 1 : 1;
      const newData: SupportExpertiseData = {
        ...currentData!,
        expertise_id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
      setTableData(prevData =>
        prevData.map(data =>
          data.expertise_id === currentData!.expertise_id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: SupportExpertiseData) => { // ใช้ SupportExpertiseData
    setDialogMode('view');
    setCurrentData(data);
    setErrors({}); 
    setAddTaskOpen(true);
  };

  const handleEditData = (data: SupportExpertiseData) => { // ใช้ SupportExpertiseData
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
      setTableData(prevData => prevData.filter(data => data.expertise_id !== id));
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
      title={<IntlMessages id="sidebar.hr07.04" />}
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
            value={currentData?.expertise_id || ''}
            name="expertise_id"
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
            label={"ชื่อความเชี่ยวชาญ"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.expertise_name || ''}
            name="expertise_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.expertise_name}
            helperText={errors.expertise_name}
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
            error={!!errors.isced_code}
            helperText={errors.isced_code}
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

export default Hr12Page; {/* เปลี่ยนชื่อ export */}