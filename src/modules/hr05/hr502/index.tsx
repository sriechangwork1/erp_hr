//hr502/index.tsx
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลการเลื่อนขั้น ---
interface PromotionData {
  promotion_id: number;
  staff_id: number;
  evaluation_round_id: number;
  promotion_date: string;
  amount_increased: number;
  result_increased: number;
  percentage_increased: number;
  new_salary: number;
  status_view: string;
  create_at: string; 
  update_at: string; 
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองสำหรับตาราง erp_hr."Promotion"
const initialPromotionRows: PromotionData[] = [
  {
    promotion_id: 1,
    staff_id: 701,
    evaluation_round_id: 1, // อ้างอิงจากรอบการประเมิน 1/2567
    promotion_date: '2024-04-01',
    amount_increased: 1500.00,
    result_increased: 95.50,
    percentage_increased: 3.50,
    new_salary: 31500.00,
    status_view: 'show',
    create_at: '2024-03-25',
    update_at: '2024-04-01',
    officer_id: 680001,
  },
  {
    promotion_id: 2,
    staff_id: 702,
    evaluation_round_id: 2, // อ้างอิงจากรอบการประเมิน 2/2567
    promotion_date: '2024-10-01',
    amount_increased: 2000.00,
    result_increased: 98.00,
    percentage_increased: 4.00,
    new_salary: 42000.00,
    status_view: 'show',
    create_at: '2024-09-25',
    update_at: '2024-10-01',
    officer_id: 680001,
  },
  {
    promotion_id: 3,
    staff_id: 703,
    evaluation_round_id: 1, // อ้างอิงจากรอบการประเมิน 1/2567
    promotion_date: '2024-04-01',
    amount_increased: 1000.00,
    result_increased: 88.00,
    percentage_increased: 2.50,
    new_salary: 26000.00,
    status_view: 'show',
    create_at: '2024-03-25',
    update_at: '2024-04-01',
    officer_id: 680001,
  },
  {
    promotion_id: 4,
    staff_id: 704,
    evaluation_round_id: 2, // อ้างอิงจากรอบการประเมิน 2/2567
    promotion_date: '2024-10-01',
    amount_increased: 0.00, // ไม่มีเงินเดือนเพิ่ม
    result_increased: 60.00, // ผลประเมินไม่ผ่านเกณฑ์
    percentage_increased: 0.00,
    new_salary: 35000.00, // เงินเดือนเท่าเดิม
    status_view: 'show',
    create_at: '2024-09-25',
    update_at: '2024-10-01',
    officer_id: 680001,
  },
  {
    promotion_id: 5,
    staff_id: 705,
    evaluation_round_id: 1, // อ้างอิงจากรอบการประเมิน 1/2568
    promotion_date: '2025-04-01',
    amount_increased: 1800.00,
    result_increased: 92.00,
    percentage_increased: 3.80,
    new_salary: 38800.00,
    status_view: 'show',
    create_at: '2025-03-25',
    update_at: '2025-04-01',
    officer_id: 680001,
  },
  {
    promotion_id: 6,
    staff_id: 701, // บุคลากรคนเดิม ได้เลื่อนอีกรอบ
    evaluation_round_id: 2, // อ้างอิงจากรอบการประเมิน 2/2567
    promotion_date: '2024-10-01',
    amount_increased: 1600.00,
    result_increased: 96.00,
    percentage_increased: 3.60,
    new_salary: 33100.00, // 31500 + 1600
    status_view: 'show',
    create_at: '2024-09-25',
    update_at: '2024-10-01',
    officer_id: 680001,
  },
];


const Hr502Page = () => { 
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<PromotionData | null>(null); 
  const [tableData, setTableData] = React.useState<PromotionData[]>(initialPromotionRows); 
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr05.02' }); 
    const words = label.split("HR502 ");  
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
    setCurrentData({ 
      promotion_id: 0, 
      staff_id: 0,
      evaluation_round_id: 0,
      promotion_date: '',
      amount_increased: 0,
      result_increased: 0,
      percentage_increased: 0,
      new_salary: 0,
      status_view: 'show',
      create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      officer_id: 0, 
    });
    setAddTaskOpen(true);
    setErrors({}); 
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
    setCurrentData(null); 
    setErrors({}); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = ['amount_increased', 'result_increased', 'percentage_increased', 'new_salary', 'staff_id', 'evaluation_round_id', 'officer_id'].includes(name)
      ? parseFloat(value) || 0 
      : value;

    setCurrentData(prevData => ({
      ...prevData!,
      [name]: parsedValue
    }));
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateData = () => {
    const newErrors: { [key: string]: string } = {};
    if (!currentData?.staff_id) newErrors.staff_id = 'กรุณากรอกรหัสบุคลากร';
    if (!currentData?.evaluation_round_id) newErrors.evaluation_round_id = 'กรุณากรอกรหัสรอบการประเมิน';
    if (!currentData?.promotion_date) newErrors.promotion_date = 'กรุณากรอกวันที่เลื่อนขั้น';
    if (currentData?.amount_increased === undefined || currentData?.amount_increased === null) newErrors.amount_increased = 'กรุณากรอกจำนวนเงินที่เพิ่ม';
    if (currentData?.result_increased === undefined || currentData?.result_increased === null) newErrors.result_increased = 'กรุณากรอกผลประเมินที่เพิ่ม';
    if (currentData?.percentage_increased === undefined || currentData?.percentage_increased === null) newErrors.percentage_increased = 'กรุณากรอกร้อยละที่เพิ่ม';
    if (currentData?.new_salary === undefined || currentData?.new_salary === null) newErrors.new_salary = 'กรุณากรอกเงินเดือนใหม่';
    if (!currentData?.status_view) newErrors.status_view = 'กรุณากรอกสถานะการแสดงผล';
    
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.promotion_id)) + 1 : 1;
      const newData: PromotionData = {
        ...currentData!,
        promotion_id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.promotion_id === currentData!.promotion_id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: PromotionData) => { 
    setDialogMode('view');
    setCurrentData(data);
    setErrors({}); 
    setAddTaskOpen(true);
  };

  const handleEditData = (data: PromotionData) => { 
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
      setTableData(prevData => prevData.filter(data => data.promotion_id !== id));
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
      title={<IntlMessages id="sidebar.hr05.02" />}  
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
            value={currentData?.promotion_id || ''}
            name="promotion_id"
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
            label={"รหัสรอบการประเมิน"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number" 
            value={currentData?.evaluation_round_id || ''}
            name="evaluation_round_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.evaluation_round_id}
            helperText={errors.evaluation_round_id}
          />
          <TextField
            fullWidth
            label={"วันที่เลื่อนขั้น"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.promotion_date || ''}
            name="promotion_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.promotion_date}
            helperText={errors.promotion_date}
          />
          <TextField
            fullWidth
            label={"จำนวนเงินที่เพิ่ม"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.amount_increased || 0}
            name="amount_increased"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.amount_increased}
            helperText={errors.amount_increased}
          />
          <TextField
            fullWidth
            label={"ผลประเมินที่เพิ่ม (คะแนน)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.result_increased || 0}
            name="result_increased"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.result_increased}
            helperText={errors.result_increased}
          />
          <TextField
            fullWidth
            label={"ร้อยละที่เพิ่ม"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.percentage_increased || 0}
            name="percentage_increased"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.percentage_increased}
            helperText={errors.percentage_increased}
          />
          <TextField
            fullWidth
            label={"เงินเดือนใหม่"}
            variant="outlined"
            margin="normal"
            size="small"
            type="number"
            value={currentData?.new_salary || 0}
            name="new_salary"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.new_salary}
            helperText={errors.new_salary}
          />
          <TextField
            fullWidth
            label={"สถานะการแสดงผล (show/hide)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.status_view || ''}
            name="status_view"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.status_view}
            helperText={errors.status_view}
          />

          <TextField
            fullWidth
            label={"สร้างเมื่อ"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.create_at || ''}
            name="create_at"
            disabled // ไม่ให้แก้ไข
            InputLabelProps={{ shrink: true }} // ทำให้ label ไม่ทับค่า
          />
          <TextField
            fullWidth
            label={"อัปเดตเมื่อ"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.update_at || ''}
            name="update_at"
            disabled // ไม่ให้แก้ไข
            InputLabelProps={{ shrink: true }} // ทำให้ label ไม่ทับค่า
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
export default Hr502Page;
