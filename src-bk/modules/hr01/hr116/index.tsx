//hr116/index.tsx
'use client';
import React, { useState, useMemo } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import Table from './Table'; // ใช้ Table ของ hr117

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง Religion ---
export interface Data {
  id: number; // religion_id (เป็น number)
  religion_name: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง Religion
const initialAllRows: Data[] = [
  { religion_id: 0, religion_name: 'ไม่นับถือศาสนาใด', create_at: '2025-06-05', update_at: '2025-06-05', officer_id: 6800001 },
  { religion_id: 1, religion_name: 'ศาสนาพุทธ', create_at: '2025-06-05', update_at: '2025-06-05', officer_id: 6800001 },
  { religion_id: 2, religion_name: 'ศาสนาอิสลาม', create_at: '2025-06-05', update_at: '2025-06-05', officer_id: 6800001 },
  { religion_id: 3, religion_name: 'ศาสนาฮินดู', create_at: '2025-06-05', update_at: '2025-06-05', officer_id: 6800001 },
  { religion_id: 4, religion_name: 'ศาสนายิว', create_at: '2025-06-05', update_at: '2025-06-05', officer_id: 6800001 },
  { religion_id: 5, religion_name: 'ศาสนาซิกซ์', create_at: '2025-06-05', update_at: '2025-06-05', officer_id: 6800001 },
  { religion_id: 6, religion_name: 'ศาสนาคริสต์', create_at: '2025-06-05', update_at: '2025-06-05', officer_id: 6800001 },
  { religion_id: 7, religion_name: 'ศาสนาเชน', create_at: '2025-06-05', update_at: '2025-06-05', officer_id: 6800001 },
  { religion_id: 8, religion_name: 'ศาสนาโซโรอัสเตอร์', create_at: '2025-06-05', update_at: '2025-06-05', officer_id: 6800001 },
  { religion_id: 9, religion_name: 'ศาสนาบาไฮ', create_at: '2025-06-05', update_at: '2025-06-05', officer_id: 6800001 },
  { religion_id: 10, religion_name: 'ศาสนาอื่นๆ', create_at: '2025-06-05', update_at: '2025-06-05', officer_id: 6800001 },
  { religion_id: 11, religion_name: 'ไม่ทราบ', create_at: '2025-06-05', update_at: '2025-06-05', officer_id: 6800001 },
].map(item => ({
  id: item.religion_id, // เปลี่ยนชื่อ religion_id เป็น id
  religion_name: item.religion_name,
  create_at: item.create_at,
  update_at: item.update_at,
  officer_id: item.officer_id,
}));


const Hr01Page = () => {  
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = useState<Data | null>(null);
  const [tableData, setTableData] = useState<Data[]>(initialAllRows);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labelText = useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr01.16' }); // สมมติว่าใช้ id นี้
    const words = label.split("HR113 "); // ตัวอย่างการตัด HR116 ออก
    return words.length > 1 ? words[1] : label;
  }, [intl]);

  const dialogTitle = useMemo(() => {
    if (dialogMode === 'add') return "เพิ่ม" + labelText;
    if (dialogMode === 'edit') return "แก้ไข" + labelText;
    if (dialogMode === 'view') return "รายละเอียด" + labelText;
    return "";
  }, [dialogMode, labelText]);

  // ฟังก์ชันสำหรับสร้างวันที่ปัจจุบันในรูปแบบที่กำหนด
  const getFormattedDate = () => {
    return new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' });
  };

  const onOpenAddTask = () => {
    setDialogMode('add');
    setCurrentData({
      id: 0, // ค่าเริ่มต้นสำหรับ religion_id
      religion_name: '',
      create_at: getFormattedDate(),
      update_at: getFormattedDate(),
      officer_id: 6800001 // ค่าเริ่มต้นผู้บันทึก
    });
    setAddTaskOpen(true);
    setErrors({}); // เคลียร์ข้อผิดพลาดเมื่อเปิด Dialog
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
    setCurrentData(null);
    setErrors({}); // เคลียร์ข้อผิดพลาดเมื่อปิด Dialog
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentData(prevData => ({
      ...prevData!,
      [name]: name === 'id' || name === 'officer_id' ? parseInt(value, 10) || 0 : value
    }));
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
    if (!currentData?.id && currentData?.id !== 0) { // ตรวจสอบ id ด้วย (เนื่องจาก 0 เป็นค่าเริ่มต้น)
      newErrors.id = 'กรุณากรอกรหัสศาสนา';
    }
    if (!currentData?.religion_name) {
      newErrors.religion_name = 'กรุณากรอกชื่อศาสนา';
    }
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
      // ตรวจสอบว่ารหัสซ้ำหรือไม่
      if (tableData.some(d => d.id === currentData!.id)) {
        Swal.fire('ข้อผิดพลาด!', 'รหัสศาสนานี้มีอยู่แล้ว', 'error');
        return;
      }
      const newData: Data = {
        ...currentData!,
        create_at: getFormattedDate(),
        update_at: getFormattedDate(),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.id === currentData!.id ? {
            ...currentData!,
            update_at: getFormattedDate()
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: Data) => {
    setDialogMode('view');
    setCurrentData(data);
    setErrors({});
    setAddTaskOpen(true);
  };

  const handleEditData = (data: Data) => {
    setDialogMode('edit');
    setCurrentData(data);
    setErrors({});
    setAddTaskOpen(true);
  };

  const handleDeleteData = async (id: number) => { // id เป็น number
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
      setTableData(prevData => prevData.filter(data => data.id !== id));
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
      title={<IntlMessages id="sidebar.hr01.16" />}
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
          เพิ่ม{labelText}
        </Button>
      }
    >
      <Table
        data={tableData}
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
            label={"รหัส" + labelText}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.id || ''}
            name="id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view' || dialogMode === 'edit'} // รหัสเพิ่มได้อย่างเดียว แก้ไขไม่ได้
            error={!!errors.id}
            helperText={errors.id}
            type="number" // กำหนด type เป็น number
          />
          <TextField
            fullWidth
            label={"ชื่อ" + labelText}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.religion_name || ''}
            name="religion_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.religion_name}
            helperText={errors.religion_name}
          />
          <TextField
            fullWidth
            label={"ผู้บันทึกข้อมูล"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.officer_id || ''}
            name="officer_id"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            type="number" // กำหนด type เป็น number
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

export default Hr01Page;