 //hr105/index.tsx
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
import Table from './Table';

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง (คงโครงสร้างเดิมของ hr105) ---
export interface Data {
  id: number;
  work_line_name: string;
  create_at: string;
  update_at: string;
  officer_id: string;
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง (ย้ายมาจาก hr105/table/index.tsx)
const initialAllRows: Data[] = [
  {
    id: 1,
    work_line_name: 'สอนและวิจัย',
    create_at: '24 พฤษภาคม 2567',
    update_at: '24 พฤษภาคม 2567',
    officer_id: 'นายเจ้าหน้าที่ บุคคล'
  },
  {
    id: 2,
    work_line_name: 'ผู้บริหาร',
    create_at: '24 พฤษภาคม 2567',
    update_at: '24 พฤษภาคม 2567',
    officer_id: 'นายเจ้าหน้าที่ บุคคล'
  },
  {
    id: 3,
    work_line_name: 'บริหารงานทั่วไป',
    create_at: '24 พฤษภาคม 2567',
    update_at: '24 พฤษภาคม 2567',
    officer_id: 'นายเจ้าหน้าที่ บุคคล'
  },
  {
    id: 4,
    work_line_name: 'บริการวิชาการ',
    create_at: '24 พฤษภาคม 2567',
    update_at: '24 พฤษภาคม 2567',
    officer_id: 'นายเจ้าหน้าที่ บุคคล'
  },
  {
    id: 5,
    work_line_name: 'วิจัยและพัฒนา',
    create_at: '24 พฤษภาคม 2567',
    update_at: '24 พฤษภาคม 2567',
    officer_id: 'นายเจ้าหน้าที่ บุคคล'
  },
  {
    id: 6,
    work_line_name: 'สนับสนุนวิชาการ',
    create_at: '24 พฤษภาคม 2567',
    update_at: '24 พฤษภาคม 2567',
    officer_id: 'นายเจ้าหน้าที่ บุคคล'
  }
];

const Hr01Page = () => {
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = useState<Data | null>(null);
  const [tableData, setTableData] = useState<Data[]>(initialAllRows);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl และจัดการกรณีที่ไม่พบ 'HR105 '
  const labelText = useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr01.05' });
    const words = label.split("HR105 ");
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
      work_line_name: '',
      create_at: getFormattedDate(),
      update_at: getFormattedDate(),
      officer_id: 'นายเจ้าหน้าที่ บุคคล' // ค่าเริ่มต้นผู้บันทึก
    });
    setAddTaskOpen(true);
    setErrors({}); // เคลียร์ข้อผิดพลาดเมื่อเปิด Dialog
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
    setCurrentData(null); // เคลียร์ข้อมูลเมื่อปิด Dialog
    setErrors({}); // เคลียร์ข้อผิดพลาดเมื่อปิด Dialog
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!currentData?.work_line_name) {
      newErrors.work_line_name = 'กรุณากรอกข้อมูลสายงาน';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveData = () => {
    if (!validateData()) {
      // Swal.fire({
      //   icon: 'warning',
      //   title: 'คำเตือน!',
      //   text: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',
      //   confirmButtonText: 'ตกลง'
      // });
      return;
    }

    if (dialogMode === 'add') {
      // เพิ่มข้อมูลใหม่
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.id)) + 1 : 1;
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
    setErrors({}); // เคลียร์ข้อผิดพลาดเมื่อเปิด Dialog
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
      title={<IntlMessages id="sidebar.hr01.05" />}
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
            label={"รายชื่อสายงาน"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.work_line_name || ''}
            name="work_line_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.work_line_name}
            helperText={errors.work_line_name}
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

export default Hr01Page;