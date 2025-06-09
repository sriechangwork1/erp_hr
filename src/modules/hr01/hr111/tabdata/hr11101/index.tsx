//hr11101/index.tsx
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
import Table from './Table'; // ใช้ Table ของ hr112

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง SubDistrict ---
export interface Data {
  id: string; // sub_district_id (เป็น string)
  sub_district_name: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง SubDistrict
const initialAllRows: Data[] = [
  { id: '090000', sub_district_name: 'ต่างประเทศ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100101', sub_district_name: 'พระบรมมหาราชวัง', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100102', sub_district_name: 'วังบูรพาภิรมย์', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100103', sub_district_name: 'วัดราชบพิธ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100104', sub_district_name: 'สำราญราษฎร์', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100105', sub_district_name: 'ศาลเจ้าพ่อเสือ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100106', sub_district_name: 'เสาชิงช้า', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100107', sub_district_name: 'บวรนิเวศ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100108', sub_district_name: 'ตลาดยอด', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100109', sub_district_name: 'ชนะสงคราม', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100110', sub_district_name: 'บ้านพานถม', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100111', sub_district_name: 'บางขุนพรหม', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100112', sub_district_name: 'วัดสามพระยา', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100201', sub_district_name: 'ดุสิต', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100202', sub_district_name: 'วชิรพยาบาล', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100203', sub_district_name: 'สวนจิตรลดา', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100204', sub_district_name: 'สี่แยกมหานาค', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100205', sub_district_name: 'บางซื่อ*', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100206', sub_district_name: 'ถนนนครไชยศรี', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { id: '100299', sub_district_name: 'สามเสนใน*', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
];

const Hr01Page = () => { // สามารถเปลี่ยนชื่อเป็น SubDistrictPage หรือ Hr112Page เพื่อความชัดเจน
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = useState<Data | null>(null);
  const [tableData, setTableData] = useState<Data[]>(initialAllRows);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labelText = useMemo(() => {
    // สมมติว่าคุณมี id สำหรับ SubDistrict ในไฟล์ IntlMessages ของคุณ
    const label = intl.formatMessage({ id: 'sidebar.hr01.11' }); // สมมติว่าใช้ id นี้
    const words = label.split("HR111 "); 
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
      id: '', // sub_district_id จะถูกกำหนดเมื่อบันทึก
      sub_district_name: '',
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
      newErrors.id = 'กรุณากรอกรหัสตำบล';
    }
    if (!currentData?.sub_district_name) {
      newErrors.sub_district_name = 'กรุณากรอกชื่อตำบล';
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
        Swal.fire('ข้อผิดพลาด!', 'รหัสตำบลนี้มีอยู่แล้ว', 'error');
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
      title={<IntlMessages id="sidebar.hr01.1101" />}
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
            value={currentData?.sub_district_name || ''}
            name="sub_district_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.sub_district_name}
            helperText={errors.sub_district_name}
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