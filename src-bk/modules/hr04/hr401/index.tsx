//hr401/index.tsx
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง ---
interface ContractData {
  contract_id: number;
  staff_id: number;
  contract_type: string;
  start_date: string;
  end_date: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองสำหรับตาราง erp_hr."Contract"
const initialContractRows: ContractData[] = [
  {
    contract_id: 1,
    staff_id: 901,
    contract_type: 'พนักงานสัญญาจ้าง 1 ปี',
    start_date: '2024-01-01',
    end_date: '2024-12-31',
    create_at: '2023-12-20',
    update_at: '2024-01-01',
    officer_id: 1,
  },
  {
    contract_id: 2,
    staff_id: 902,
    contract_type: 'ลูกจ้างชั่วคราว 6 เดือน',
    start_date: '2024-03-01',
    end_date: '2024-08-31',
    create_at: '2024-02-15',
    update_at: '2024-03-01',
    officer_id: 2,
  },
  {
    contract_id: 3,
    staff_id: 903,
    contract_type: 'พนักงานมหาวิทยาลัย (ระยะเวลา 3 ปี)',
    start_date: '2023-07-01',
    end_date: '2026-06-30',
    create_at: '2023-06-20',
    update_at: '2023-07-01',
    officer_id: 3,
  },
  {
    contract_id: 4,
    staff_id: 901, // บุคลากรคนเดิมแต่เป็นสัญญาใหม่
    contract_type: 'พนักงานสัญญาจ้าง 1 ปี (ต่อสัญญา)',
    start_date: '2025-01-01',
    end_date: '2025-12-31',
    create_at: '2024-12-10',
    update_at: '2025-01-01',
    officer_id: 1,
  },
  {
    contract_id: 5,
    staff_id: 904,
    contract_type: 'ลูกจ้างรายวัน (ไม่กำหนดระยะเวลา)',
    start_date: '2024-05-15',
    end_date: '2025-05-14', // สัญญาต่อเนื่อง 1 ปี เพื่อเป็นตัวอย่าง
    create_at: '2024-05-10',
    update_at: '2024-05-15',
    officer_id: 4,
  },
];


const ContractPage = () => { // เปลี่ยนชื่อ Component
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<ContractData | null>(null); // ใช้ ContractData
  const [tableData, setTableData] = React.useState<ContractData[]>(initialContractRows); // ใช้ initialContractRows
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labeltext = () => {
    // ใช้ id: 'common.contract' หรือ id ที่คุณมีใน IntlMessages
    const label = intl.formatMessage({ id: 'common.contract', defaultMessage: 'สัญญาจ้าง' }); 
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
      contract_id: 0, // id จะถูกกำหนดเมื่อบันทึก
      staff_id: 0,
      contract_type: '',
      start_date: '',
      end_date: '',
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
    // ตรวจสอบว่าเป็นฟิลด์ตัวเลขหรือไม่ และแปลงค่าให้เป็นตัวเลข
    const parsedValue = ['staff_id', 'officer_id'].includes(name)
      ? parseFloat(value) || 0
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
    if (!currentData?.staff_id) newErrors.staff_id = 'กรุณากรอกรหัสบุคลากร';
    if (!currentData?.contract_type) newErrors.contract_type = 'กรุณากรอกประเภทสัญญา';
    if (!currentData?.start_date) newErrors.start_date = 'กรุณากรอกวันที่เริ่มต้นสัญญา';
    if (!currentData?.end_date) newErrors.end_date = 'กรุณากรอกวันที่สิ้นสุดสัญญา';
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.contract_id)) + 1 : 1;
      const newData: ContractData = {
        ...currentData!,
        contract_id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
      setTableData(prevData =>
        prevData.map(data =>
          data.contract_id === currentData!.contract_id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: ContractData) => { 
    setDialogMode('view');
    setCurrentData(data);
    setErrors({}); 
    setAddTaskOpen(true);
  };

  const handleEditData = (data: ContractData) => { 
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
      setTableData(prevData => prevData.filter(data => data.contract_id !== id));
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
      title={<IntlMessages id="sidebar.hr04.01" />}
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
            value={currentData?.contract_id || ''}
            name="contract_id"
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
            error={!!errors.staff_id}
            helperText={errors.staff_id}
          />
          <TextField
            fullWidth
            label={"ประเภทสัญญา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.contract_type || ''}
            name="contract_type"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.contract_type}
            helperText={errors.contract_type}
          />
          <TextField
            fullWidth
            label={"วันที่เริ่มต้นสัญญา"}
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
            label={"วันที่สิ้นสุดสัญญา"}
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
            label={"รหัสผู้บันทึก"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number" 
            value={currentData?.officer_id || ''}
            name="officer_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'} 
            error={!!errors.officer_id}
            helperText={errors.officer_id}
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
export default ContractPage;