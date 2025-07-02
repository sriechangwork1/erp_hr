 //hr501/index.tsx
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลรอบการประเมิน ---
interface EvaluationRoundData {
  evaluation_round_id: number;
  year: string;
  round_name: string;
  round_description: string;
  start_date: string;
  end_date: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองสำหรับตาราง erp_hr."Evaluation_Round"
const initialEvaluationRoundRows: EvaluationRoundData[] = [
  {
    evaluation_round_id: 1,
    year: '2567',
    round_name: 'รอบการประเมินเงินเดือน ครั้งที่ 1/2567',
    round_description: 'ประเมินผลการปฏิบัติงานรอบ 6 เดือนแรก (ต.ค. 66 - มี.ค. 67) เพื่อพิจารณาเลื่อนเงินเดือน',
    start_date: '2024-04-01',
    end_date: '2024-04-30',
    create_at: '2024-03-20',
    update_at: '2024-04-01',
    officer_id: 1,
  },
  {
    evaluation_round_id: 2,
    year: '2567',
    round_name: 'รอบการประเมินเงินเดือน ครั้งที่ 2/2567',
    round_description: 'ประเมินผลการปฏิบัติงานรอบ 6 เดือนหลัง (เม.ย. 67 - ก.ย. 67) เพื่อพิจารณาเลื่อนเงินเดือน',
    start_date: '2024-10-01',
    end_date: '2024-10-31',
    create_at: '2024-09-20',
    update_at: '2024-10-01',
    officer_id: 2,
  },
  {
    evaluation_round_id: 3,
    year: '2568',
    round_name: 'รอบการประเมินเงินเดือน ครั้งที่ 1/2568',
    round_description: 'ประเมินผลการปฏิบัติงานรอบ 6 เดือนแรก (ต.ค. 67 - มี.ค. 68) เพื่อพิจารณาเลื่อนเงินเดือน',
    start_date: '2025-04-01',
    end_date: '2025-04-30',
    create_at: '2025-03-20',
    update_at: '2025-04-01',
    officer_id: 1,
  },
  {
    evaluation_round_id: 4,
    year: '2568',
    round_name: 'รอบการประเมินเงินเดือน ครั้งที่ 2/2568',
    round_description: 'ประเมินผลการปฏิบัติงานรอบ 6 เดือนหลัง (เม.ย. 68 - ก.ย. 68) เพื่อพิจารณาเลื่อนเงินเดือน',
    start_date: '2025-10-01',
    end_date: '2025-10-31',
    create_at: '2025-09-20',
    update_at: '2025-10-01',
    officer_id: 2,
  },
  {
    evaluation_round_id: 5,
    year: '2566',
    round_name: 'รอบการประเมินเงินเดือน ครั้งที่ 1/2566 (ย้อนหลัง)',
    round_description: 'ประเมินผลการปฏิบัติงานรอบ 6 เดือนแรก (ต.ค. 65 - มี.ค. 66) เพื่อพิจารณาเลื่อนเงินเดือน',
    start_date: '2023-04-01',
    end_date: '2023-04-30',
    create_at: '2023-03-20',
    update_at: '2023-04-01',
    officer_id: 3,
  },
];


const Hr05Page = () => { // เปลี่ยนชื่อ Component เป็น Hr05Page
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<EvaluationRoundData | null>(null); // ใช้ EvaluationRoundData
  const [tableData, setTableData] = React.useState<EvaluationRoundData[]>(initialEvaluationRoundRows); // ใช้ initialEvaluationRoundRows
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr05.01' }); 
    const words = label.split("HR501 "); 
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
      evaluation_round_id: 0, // id จะถูกกำหนดเมื่อบันทึก
      year: '',
      round_name: '',
      round_description: '',
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
    if (!currentData?.year) newErrors.year = 'กรุณากรอกปี';
    if (!currentData?.round_name) newErrors.round_name = 'กรุณากรอกชื่อรอบการประเมิน';
    if (!currentData?.start_date) newErrors.start_date = 'กรุณากรอกวันที่เริ่มต้น';
    if (!currentData?.end_date) newErrors.end_date = 'กรุณากรอกวันที่สิ้นสุด';
    
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.evaluation_round_id)) + 1 : 1;
      const newData: EvaluationRoundData = {
        ...currentData!,
        evaluation_round_id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
      setTableData(prevData =>
        prevData.map(data =>
          data.evaluation_round_id === currentData!.evaluation_round_id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: EvaluationRoundData) => { // ใช้ EvaluationRoundData
    setDialogMode('view');
    setCurrentData(data);
    setErrors({}); 
    setAddTaskOpen(true);
  };

  const handleEditData = (data: EvaluationRoundData) => { // ใช้ EvaluationRoundData
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
      setTableData(prevData => prevData.filter(data => data.evaluation_round_id !== id));
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
    title={<IntlMessages id="sidebar.hr05.01" />}
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
            value={currentData?.evaluation_round_id || ''}
            name="evaluation_round_id"
            onChange={handleInputChange}
            disabled={dialogMode !== 'add'} 
          />
          <TextField
            fullWidth
            label={"ปี"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.year || ''}
            name="year"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.year}
            helperText={errors.year}
          />
          <TextField
            fullWidth
            label={"ชื่อรอบการประเมิน"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.round_name || ''}
            name="round_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.round_name}
            helperText={errors.round_name}
          />
          <TextField
            fullWidth
            label={"คำอธิบายรอบการประเมิน"}
            variant="outlined"
            margin="normal"
            size="small"
            multiline
            rows={2}
            value={currentData?.round_description || ''}
            name="round_description"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
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
            label={"รหัสผู้บันทึก"}
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