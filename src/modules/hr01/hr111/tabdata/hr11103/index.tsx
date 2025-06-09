//hr11103/index.tsx
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
import Table from './Table'; // ใช้ Table ของ hr114

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง Province ---
export interface Data {
  id: string; // province_id (เป็น string)
  province_name: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง Province
const initialAllRows: Data[] = [
  { province_id: '09', province_name: 'ต่างประเทศ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '10', province_name: 'กรุงเทพมหานคร', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '11', province_name: 'สมุทรปราการ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '12', province_name: 'นนทบุรี', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '13', province_name: 'ปทุมธานี', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '14', province_name: 'พระนครศรีอยุธยา', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '15', province_name: 'อ่างทอง', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '16', province_name: 'ลพบุรี', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '17', province_name: 'สิงห์บุรี', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '18', province_name: 'ชัยนาท', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '19', province_name: 'สระบุรี', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '20', province_name: 'ชลบุรี', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '21', province_name: 'ระยอง', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '22', province_name: 'จันทบุรี', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '23', province_name: 'ตราด', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '24', province_name: 'ฉะเชิงเทรา', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '25', province_name: 'ปราจีนบุรี', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '26', province_name: 'นครนายก', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '27', province_name: 'สระแก้ว', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '30', province_name: 'นครราชสีมา', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '31', province_name: 'บุรีรัมย์', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '32', province_name: 'สุรินทร์', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { province_id: '33', province_name: 'ศรีสะเกษ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
].map(item => ({ // เปลี่ยนชื่อ province_id เป็น id
  id: item.province_id,
  province_name: item.province_name,
  create_at: item.create_at,
  update_at: item.update_at,
  officer_id: item.officer_id,
}));


const Hr01Page = () => { // สามารถเปลี่ยนชื่อเป็น ProvincePage หรือ Hr114Page เพื่อความชัดเจน
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = useState<Data | null>(null);
  const [tableData, setTableData] = useState<Data[]>(initialAllRows);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labelText = useMemo(() => {
    // สมมติว่าคุณมี id สำหรับ Province ในไฟล์ IntlMessages ของคุณ
    const label = intl.formatMessage({ id: 'sidebar.hr01.1103' }); // สมมติว่าใช้ id นี้
    const words = label.split("HR11103 "); // ตัวอย่างการตัด HR113 ออก
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
      id: '', // province_id จะถูกกำหนดเมื่อบันทึก
      province_name: '',
      create_at: getFormattedDate(),
      update_at: getFormattedDate(),
      officer_id: 680001 // ค่าเริ่มต้นผู้บันทึก
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
      [name]: name === 'officer_id' ? parseInt(value, 10) || 0 : value
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
    if (!currentData?.id) {
      newErrors.id = 'กรุณากรอกรหัสจังหวัด';
    }
    if (!currentData?.province_name) {
      newErrors.province_name = 'กรุณากรอกชื่อจังหวัด';
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
        Swal.fire('ข้อผิดพลาด!', 'รหัสจังหวัดนี้มีอยู่แล้ว', 'error');
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

  const handleDeleteData = async (id: string) => { // id เป็น string
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
      title={<IntlMessages id="sidebar.hr01.1103" />}
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
          />
          <TextField
            fullWidth
            label={"ชื่อ" + labelText}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.province_name || ''}
            name="province_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.province_name}
            helperText={errors.province_name}
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