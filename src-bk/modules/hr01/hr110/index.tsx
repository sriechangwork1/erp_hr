//hr110/index.tsx
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
import Swal from 'sweetalert2'; // Import SweetAlert2
import Table from './Table'; // ใช้ Table ของ hr111

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง Gender ---
export interface Data {
  id: number; // gender_id
  gender_name: string;
  create_at: string;
  update_at: string;
  officer_id: number; // เปลี่ยนเป็น number ตาม officer_id ในตาราง
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง Gender
const initialAllRows: Data[] = [
  {
    id: 1,
    gender_name: 'ชาย',
    create_at: '2025-06-06',
    update_at: '2025-06-06',
    officer_id: 6800001
  },
  {
    id: 2,
    gender_name: 'หญิง',
    create_at: '2025-06-06',
    update_at: '2025-06-06',
    officer_id: 6800001
  }
];

const Hr01Page = () => { // สามารถเปลี่ยนชื่อเป็น GenderPage หรือ Hr111Page เพื่อความชัดเจน
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = useState<Data | null>(null);
  const [tableData, setTableData] = useState<Data[]>(initialAllRows);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labelText = useMemo(() => {
    // สมมติว่าคุณมี id สำหรับ Gender ในไฟล์ IntlMessages ของคุณ
    // หากไม่มี คุณอาจจะต้องเพิ่มมัน หรือใช้ข้อความตรงๆ เช่น "เพศ"
    const label = intl.formatMessage({ id: 'sidebar.hr01.10' }); // สมมติว่าใช้ id นี้
    // คุณสามารถปรับแต่ง labelText ตามความเหมาะสม หากต้องการตัดคำนำหน้าออก
    const words = label.split("HR110 "); // ตัวอย่างการตัด HR111 ออก
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
      id: 0, // id จะถูกกำหนดเมื่อบันทึก
      gender_name: '',
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
      [name]: name === 'officer_id' ? parseInt(value, 10) || 0 : value // แปลง officer_id เป็น number
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
    if (!currentData?.gender_name) {
      newErrors.gender_name = 'กรุณากรอกชื่อเพศ';
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
      // เพิ่มข้อมูลใหม่
      const newId = tableData.length > 0 ?
        Math.max(...tableData.map(d => d.id)) + 1 : 1;
      const newData: Data = {
        ...currentData!,
        id: newId,
        create_at: getFormattedDate(),
        update_at: getFormattedDate(),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
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
    setErrors({}); // เคลียร์ข้อผิดพลาดเมื่อเปิด Dialog
    setAddTaskOpen(true);
  };

  const handleEditData = (data: Data) => {
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
      title={<IntlMessages id="sidebar.hr01.10" />} 
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
        data={tableData} // ส่งข้อมูลปัจจุบัน (state) ไปให้ Table
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
            value={currentData?.id === 0 && dialogMode === 'add' ? '' : currentData?.id || ''}
            name="id"
            onChange={handleInputChange}
            disabled={dialogMode !== 'add'} // รหัสแก้ไขไม่ได้
          />
          <TextField
            fullWidth
            label={"ชื่อ" + labelText}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.gender_name || ''}
            name="gender_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.gender_name}
            helperText={errors.gender_name}
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
            disabled={dialogMode === 'view'} // ผู้บันทึกแก้ไขไม่ได้ในการ view
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

export default Hr01Page; // สามารถเปลี่ยนชื่อ export ได้