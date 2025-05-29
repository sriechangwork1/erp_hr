 //hr101/index.tsx
'use client';
import React from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppSelect from '@crema/components/AppSelect';
import Table from './Table'; // ตรวจสอบให้แน่ใจว่า import ถูกต้อง
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2'; // Import SweetAlert2

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง ---
interface Data {
  id: number;
  prefixname_name_th: string;
  prefixname_name_en: string;
  prefixname_abb_th: string;
  prefixname_abb_en: string;
  create_at?: string;
  update_at?: string;
  officer_id?: string;
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง
const initialAllRows: Data[] = [
  {
    id: 1,
    prefixname_name_th: 'เด็กชาย',
    prefixname_name_en: 'Master',
    prefixname_abb_th: 'ด.ช.',
    prefixname_abb_en: 'Mr.',
    create_at: '1 มกราคม 2567', // ใช้ค่าคงที่แทนการสร้างใหม่ทุกครั้งเพื่อความสอดคล้อง
    update_at: '1 มกราคม 2567',
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 2,
    prefixname_name_th: 'นาย',
    prefixname_name_en: 'Mr.',
    prefixname_abb_th: 'นาย',
    prefixname_abb_en: 'Mr.',
    create_at: '1 มกราคม 2567',
    update_at: '1 มกราคม 2567',
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 3,
    prefixname_name_th: 'เด็กหญิง',
    prefixname_name_en: 'Miss',
    prefixname_abb_th: 'ด.ญ.',
    prefixname_abb_en: 'Miss',
    create_at: '1 มกราคม 2567',
    update_at: '1 มกราคม 2567',
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 4,
    prefixname_name_th: 'นางสาว',
    prefixname_name_en: 'Miss',
    prefixname_abb_th: 'น.ส.',
    prefixname_abb_en: 'Miss',
    create_at: '1 มกราคม 2567',
    update_at: '1 มกราคม 2567',
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 5,
    prefixname_name_th: 'นาง',
    prefixname_name_en: 'Mrs.',
    prefixname_abb_th: 'นาง',
    prefixname_abb_en: 'Mrs.',
    create_at: '1 มกราคม 2567',
    update_at: '1 มกราคม 2567',
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 6,
    prefixname_name_th: 'พระ',
    prefixname_name_en: 'Phra',
    prefixname_abb_th: 'พระ',
    prefixname_abb_en: 'Phra',
    create_at: '1 มกราคม 2567',
    update_at: '1 มกราคม 2567',
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 7,
    prefixname_name_th: 'เดชา',
    prefixname_name_en: 'Decha',
    prefixname_abb_th: 'เดชา',
    prefixname_abb_en: 'Dcha',
    create_at: '1 มกราคม 2567',
    update_at: '1 มกราคม 2567',
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 8,
    prefixname_name_th: 'ท่านผู้หญิง',
    prefixname_name_en: 'Her Excellency',
    prefixname_abb_th: 'ทph.',
    prefixname_abb_en: 'H.E.',
    create_at: '1 มกราคม 2567',
    update_at: '1 มกราคม 2567',
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 9,
    prefixname_name_th: 'ท่านผู้ชาย',
    prefixname_name_en: 'His Excellency',
    prefixname_abb_th: 'ทช.',
    prefixname_abb_en: 'H.E.',
    create_at: '1 มกราคม 2567',
    update_at: '1 มกราคม 2567',
    officer_id: 'นายเจ้าหน้า บุคคล'
  },
  {
    id: 10,
    prefixname_name_th: 'พลเอก',
    prefixname_name_en: 'General',
    prefixname_abb_th: 'พล.อ.',
    prefixname_abb_en: 'Gen.',
    create_at: '1 มกราคม 2567',
    update_at: '1 มกราคม 2567',
    officer_id: 'นายเจ้าหน้า บุคคล'
  }
];


const Hr01Page = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<Data | null>(null);
  const [tableData, setTableData] = React.useState<Data[]>(initialAllRows); // ใช้ initialAllRows เป็นค่าเริ่มต้น
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr01.01' });
    const words = label.split("HR101 ");
    return words[1];
  };

  const dialogTitle = React.useMemo(() => {
    if (dialogMode === 'add') return "เพิ่ม" + labeltext();
    if (dialogMode === 'edit') return "แก้ไข" + labeltext();
    if (dialogMode === 'view') return "รายละเอียด" + labeltext();
    return "";
  }, [dialogMode, labeltext]); // เพิ่ม labeltext ใน dependency array

  const onOpenAddTask = () => {
    setDialogMode('add');
    setCurrentData({ // กำหนดค่าเริ่มต้นสำหรับข้อมูลใหม่
      id: 0, // id จะถูกกำหนดเมื่อบันทึก
      prefixname_name_th: '',
      prefixname_name_en: '',
      prefixname_abb_th: '',
      prefixname_abb_en: '',
      create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      officer_id: 'นายเจ้าหน้า บุคคล' // ค่าเริ่มต้นผู้บันทึก
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
    if (!currentData?.prefixname_name_th) {
      newErrors.prefixname_name_th = 'กรุณากรอกข้อมูลคำนำหน้าชื่อ (TH)';
    }
    if (!currentData?.prefixname_name_en) {
      newErrors.prefixname_name_en = 'กรุณากรอกข้อมูลคำนำหน้าชื่อ (EN)';
    }
    if (!currentData?.prefixname_abb_th) {
      newErrors.prefixname_abb_th = 'กรุณากรอกข้อมูลชื่อย่อภาษาไทย';
    }
    if (!currentData?.prefixname_abb_en) {
      newErrors.prefixname_abb_en = 'กรุณากรอกข้อมูลชื่อย่อภาษาอังกฤษ';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveData = () => {
     if (!validateData()) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'คำเตือน!',
    //     text: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',
    //     confirmButtonText: 'ตกลง'
    //   });
       return;
    }

    if (dialogMode === 'add') {
      // เพิ่มข้อมูลใหม่
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.id)) + 1 : 1;
      const newData: Data = {
        ...currentData!,
        id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
      setTableData(prevData =>
        prevData.map(data =>
          data.id === currentData!.id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
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
      title={<IntlMessages id="sidebar.hr01.01" />}
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
        data={tableData} // ส่งข้อมูลปัจจุบัน (state) ไปให้ Table
        setTableData={setTableData} // ส่ง setter ไปให้ Table (แม้ว่า Table จะไม่ควรแก้ไขข้อมูลโดยตรง)
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
            value={currentData?.id || ''}
            name="id"
            onChange={handleInputChange}
            disabled={dialogMode !== 'add'} // รหัสแก้ไขไม่ได้
          />
          <TextField
            fullWidth
            label={labeltext() + " (TH)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.prefixname_name_th || ''}
            name="prefixname_name_th"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.prefixname_name_th} // แสดง error state
            helperText={errors.prefixname_name_th} // แสดงข้อความ error
          />
          <TextField
            fullWidth
            label={labeltext() + " (EN)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.prefixname_name_en || ''}
            name="prefixname_name_en"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.prefixname_name_en}
            helperText={errors.prefixname_name_en}
          />
          <TextField
            fullWidth
            label={"ชื่อย่อ" + labeltext() + "ภาษาไทย"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.prefixname_abb_th || ''}
            name="prefixname_abb_th"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.prefixname_abb_th}
            helperText={errors.prefixname_abb_th}
          />
          <TextField
            fullWidth
            label={"ชื่อย่อ" + labeltext() + "ภาษาอังกฤษ"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.prefixname_abb_en || ''}
            name="prefixname_abb_en"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.prefixname_abb_en}
            helperText={errors.prefixname_abb_en}
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