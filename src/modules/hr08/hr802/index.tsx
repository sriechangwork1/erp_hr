 //hr802/index.tsx
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลการเบิกเงินการลาศึกษา ---
interface LeaveEducationWithdrawData {
  withdraw_id: number;
  staff_id: number;
  withdraw_type: string;
  document_number: string;
  withdraw_date: string;
  amount: number;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองสำหรับตาราง erp_hr."LeaveEducationWithdraw"
const initialLeaveEducationWithdrawRows: LeaveEducationWithdrawData[] = [
  {
    withdraw_id: 1,
    staff_id: 201,
    withdraw_type: 'ค่าลงทะเบียน',
    document_number: 'เบิกทุน/66/001',
    withdraw_date: '2023-08-05',
    amount: 25000.00,
    create_at: '2023-08-01',
    update_at: '2023-08-05',
    officer_id: 680001,
  },
  {
    withdraw_id: 2,
    staff_id: 202,
    withdraw_type: 'ค่าใช้จ่ายรายเดือน',
    document_number: 'เบิกทุน/65/005',
    withdraw_date: '2022-09-10',
    amount: 15000.00,
    create_at: '2022-09-01',
    update_at: '2022-09-10',
    officer_id: 680001,
  },
  {
    withdraw_id: 3,
    staff_id: 201,
    withdraw_type: 'ค่าตำราเรียน',
    document_number: 'เบิกทุน/66/002',
    withdraw_date: '2023-09-15',
    amount: 5000.50,
    create_at: '2023-09-10',
    update_at: '2023-09-15',
    officer_id: 680001,
  },
  {
    withdraw_id: 4,
    staff_id: 203,
    withdraw_type: 'ค่าธรรมเนียมการศึกษา',
    document_number: 'เบิกทุน/67/010',
    withdraw_date: '2024-01-20',
    amount: 12000.00,
    create_at: '2024-01-15',
    update_at: '2024-01-20',
    officer_id: 680001,
  },
  {
    withdraw_id: 5,
    staff_id: 202,
    withdraw_type: 'ค่าเดินทาง',
    document_number: 'เบิกทุน/65/006',
    withdraw_date: '2022-10-25',
    amount: 8000.75,
    create_at: '2022-10-20',
    update_at: '2022-10-25',
    officer_id: 680001,
  },
];


const Hr08Page = () => { // เปลี่ยนชื่อ Component เป็น Hr04Page
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<LeaveEducationWithdrawData | null>(null); // ใช้ LeaveEducationWithdrawData
  const [tableData, setTableData] = React.useState<LeaveEducationWithdrawData[]>(initialLeaveEducationWithdrawRows); // ใช้ initialLeaveEducationWithdrawRows
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labeltext = () => {
    // เปลี่ยนจาก id: 'sidebar.hr03.01' เป็น 'sidebar.hr08.02'
    const label = intl.formatMessage({ id: 'sidebar.hr08.02' }); 
    const words = label.split("HR104 "); // เปลี่ยน HR103 เป็น HR104
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
      withdraw_id: 0, // id จะถูกกำหนดเมื่อบันทึก
      staff_id: 0,
      withdraw_type: '',
      document_number: '',
      withdraw_date: '',
      amount: 0,
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
      [name]: name === 'amount' ? parseFloat(value) : value, // แปลง amount เป็นตัวเลข
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
    if (!currentData?.withdraw_type) newErrors.withdraw_type = 'กรุณากรอกประเภทการเบิก';
    if (!currentData?.document_number) newErrors.document_number = 'กรุณากรอกเลขที่เอกสาร';
    if (!currentData?.withdraw_date) newErrors.withdraw_date = 'กรุณากรอกวันที่เบิก';
    if (!currentData?.amount || currentData?.amount <= 0) newErrors.amount = 'กรุณากรอกจำนวนเงินที่ถูกต้อง';
    
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.withdraw_id)) + 1 : 1;
      const newData: LeaveEducationWithdrawData = {
        ...currentData!,
        withdraw_id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
      setTableData(prevData =>
        prevData.map(data =>
          data.withdraw_id === currentData!.withdraw_id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: LeaveEducationWithdrawData) => { // ใช้ LeaveEducationWithdrawData
    setDialogMode('view');
    setCurrentData(data);
    setErrors({}); 
    setAddTaskOpen(true);
  };

  const handleEditData = (data: LeaveEducationWithdrawData) => { // ใช้ LeaveEducationWithdrawData
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
      setTableData(prevData => prevData.filter(data => data.withdraw_id !== id));
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
      title={<IntlMessages id="sidebar.hr08.02" />} 
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
            value={currentData?.withdraw_id || ''}
            name="withdraw_id"
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
            label={"ประเภทการเบิก"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.withdraw_type || ''}
            name="withdraw_type"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.withdraw_type}
            helperText={errors.withdraw_type}
          />
          <TextField
            fullWidth
            label={"เลขที่เอกสาร"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.document_number || ''}
            name="document_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.document_number}
            helperText={errors.document_number}
          />
          <TextField
            fullWidth
            label={"วันที่เบิก"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.withdraw_date || ''}
            name="withdraw_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.withdraw_date}
            helperText={errors.withdraw_date}
          />
          <TextField
            fullWidth
            label={"จำนวนเงิน"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.amount || ''}
            name="amount"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.amount}
            helperText={errors.amount}
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