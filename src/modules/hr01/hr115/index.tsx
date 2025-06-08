//hr115/index.tsx
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
import Table from './Table'; // ใช้ Table ของ hr116

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง Nation ---
export interface Data {
  id: string; // nation_id (เป็น string)
  nation_name_th: string;
  nation_name_en: string;
  nation_abb_name: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง Nation
const initialAllRows: Data[] = [
  { nation_id: 'CL', nation_name_th: 'ชิลี', nation_name_en: 'Chilean', nation_abb_name: 'CL', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'AF', nation_name_th: 'อัฟกัน', nation_name_en: 'Afghan', nation_abb_name: 'AF', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'AL', nation_name_th: 'แอลเบเนีย', nation_name_en: 'Albanian', nation_abb_name: 'AL', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'DZ', nation_name_th: 'แอลจีเรีย', nation_name_en: 'Algerian', nation_abb_name: 'DZ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'AD', nation_name_th: 'อันดอร์รา', nation_name_en: 'Andorran', nation_abb_name: 'AD', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'AO', nation_name_th: 'แองโกลา', nation_name_en: 'Angolan', nation_abb_name: 'AO', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'AG', nation_name_th: 'แอนติกาและบาร์บูดา', 'nation_name_en': 'Antiguan and Barbudan', nation_abb_name: 'AG', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'AR', nation_name_th: 'อาร์เจนตินา', nation_name_en: 'Argentine', nation_abb_name: 'AR', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'AM', nation_name_th: 'อาร์เมเนีย', nation_name_en: 'Armenian', nation_abb_name: 'AM', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'AU', nation_name_th: 'ออสเตรเลีย', nation_name_en: 'Australian', nation_abb_name: 'AU', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'AT', nation_name_th: 'ออสเตรีย', nation_name_en: 'Austrian', nation_abb_name: 'AT', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'AZ', nation_name_th: 'อาเซอร์ไบจาน', nation_name_en: 'Azerbaijani', nation_abb_name: 'AZ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BS', nation_name_th: 'บาฮามาส', nation_name_en: 'Bahamian', nation_abb_name: 'BS', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BH', nation_name_th: 'บาห์เรน', nation_name_en: 'Bahraini', nation_abb_name: 'BH', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BD', nation_name_th: 'บังกลาเทศ', nation_name_en: 'Bangladeshi', nation_abb_name: 'BD', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BB', nation_name_th: 'บาร์เบโดส', nation_name_en: 'Barbadian', nation_abb_name: 'BB', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BY', nation_name_th: 'เบลารุส', nation_name_en: 'Belarusian', nation_abb_name: 'BY', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BE', nation_name_th: 'เบลเยียม', nation_name_en: 'Belgian', nation_abb_name: 'BE', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BZ', nation_name_th: 'เบลีซ', nation_name_en: 'Belizean', nation_abb_name: 'BZ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BJ', nation_name_th: 'เบนิน', nation_name_en: 'Beninese', nation_abb_name: 'BJ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BT', nation_name_th: 'ภูฏาน', nation_name_en: 'Bhutanese', nation_abb_name: 'BT', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BO', nation_name_th: 'โบลิเวีย', nation_name_en: 'Bolivian', nation_abb_name: 'BO', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BA', nation_name_th: 'บอสเนียและเฮอร์เซโกวีนา', 'nation_name_en': 'Bosnian and Herzegovinian', nation_abb_name: 'BA', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BW', nation_name_th: 'บอตสวานา', nation_name_en: 'Botswanan', nation_abb_name: 'BW', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BR', nation_name_th: 'บราซิล', nation_name_en: 'Brazilian', nation_abb_name: 'BR', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BN', nation_name_th: 'บรูไน', nation_name_en: 'Bruneian', nation_abb_name: 'BN', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BG', nation_name_th: 'บัลแกเรีย', nation_name_en: 'Bulgarian', nation_abb_name: 'BG', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BF', nation_name_th: 'บูร์กินาฟาโซ', nation_name_en: 'Burkinabe', nation_abb_name: 'BF', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'BI', nation_name_th: 'บุรุนดี', nation_name_en: 'Burundian', nation_abb_name: 'BI', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'CV', nation_name_th: 'กาบูเวร์ดี', nation_name_en: 'Cape Verdean', nation_abb_name: 'CV', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'KH', nation_name_th: 'กัมพูชา', nation_name_en: 'Cambodian', nation_abb_name: 'KH', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'CM', nation_name_th: 'แคเมอรูน', nation_name_en: 'Cameroonian', nation_abb_name: 'CM', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'CA', nation_name_th: 'แคนาดา', nation_name_en: 'Canadian', nation_abb_name: 'CA', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'CF', nation_name_th: 'สาธารณรัฐแอฟริกากลาง', 'nation_name_en': 'Central African', nation_abb_name: 'CF', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'TD', nation_name_th: 'ชาด', nation_name_en: 'Chadian', nation_abb_name: 'TD', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'CN', nation_name_th: 'จีน', nation_name_en: 'Chinese', nation_abb_name: 'CN', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'CO', nation_name_th: 'โคลอมเบีย', nation_name_en: 'Colombian', nation_abb_name: 'CO', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'KM', nation_name_th: 'คอโมโรส', nation_name_en: 'Comoran', nation_abb_name: 'KM', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'CD', nation_name_th: 'คองโก (ประชาธิปไตย)', 'nation_name_en': 'Congolese (Democratic)', nation_abb_name: 'CD', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'CG', nation_name_th: 'คองโก (สาธารณรัฐ)', 'nation_name_en': 'Congolese (Republic)', nation_abb_name: 'CG', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'CR', nation_name_th: 'คอสตาริกา', nation_name_en: 'Costa Rican', nation_abb_name: 'CR', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'CI', nation_name_th: 'โกตดิวัวร์', nation_name_en: 'Ivorian', nation_abb_name: 'CI', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'HR', nation_name_th: 'โครเอเชีย', nation_name_en: 'Croatian', nation_abb_name: 'HR', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'CU', nation_name_th: 'คิวบา', nation_name_en: 'Cuban', nation_abb_name: 'CU', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'CY', nation_name_th: 'ไซปรัส', nation_name_en: 'Cypriot', nation_abb_name: 'CY', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'CZ', nation_name_th: 'เช็ก', nation_name_en: 'Czech', nation_abb_name: 'CZ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'DK', nation_name_th: 'เดนมาร์ก', nation_name_en: 'Danish', nation_abb_name: 'DK', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'DJ', nation_name_th: 'จิบูตี', nation_name_en: 'Djiboutian', nation_abb_name: 'DJ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'DM', nation_name_th: 'โดมินิกา', nation_name_en: 'Dominican', nation_abb_name: 'DM', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { nation_id: 'DO', nation_name_th: 'โดมินิกัน', 'nation_name_en': 'Dominican (Republic)', nation_abb_name: 'DO', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
].map(item => ({ // เปลี่ยนชื่อ nation_id เป็น id
  id: item.nation_id,
  nation_name_th: item.nation_name_th,
  nation_name_en: item.nation_name_en,
  nation_abb_name: item.nation_abb_name,
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
    const label = intl.formatMessage({ id: 'sidebar.hr01.15' }); // สมมติว่าใช้ id นี้
    const words = label.split("HR115 "); // ตัวอย่างการตัด HR115 ออก
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
      id: '', // nation_id จะถูกกำหนดเมื่อบันทึก
      nation_name_th: '',
      nation_name_en: '',
      nation_abb_name: '',
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
      newErrors.id = 'กรุณากรอกรหัสเชื้อชาติ';
    }
    if (!currentData?.nation_name_th) {
      newErrors.nation_name_th = 'กรุณากรอกชื่อเชื้อชาติ (TH)';
    }
    if (!currentData?.nation_name_en) {
      newErrors.nation_name_en = 'กรุณากรอกชื่อเชื้อชาติ (EN)';
    }
    if (!currentData?.nation_abb_name) {
      newErrors.nation_abb_name = 'กรุณากรอกชื่อเชื้อชาติ (ตัวย่อ)';
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
        Swal.fire('ข้อผิดพลาด!', 'รหัสเชื้อชาตินี้มีอยู่แล้ว', 'error');
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
      title={<IntlMessages id="sidebar.hr01.15" />}
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
            label={"ชื่อ" + labelText + " (TH)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.nation_name_th || ''}
            name="nation_name_th"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.nation_name_th}
            helperText={errors.nation_name_th}
          />
          <TextField
            fullWidth
            label={"ชื่อ" + labelText + " (EN)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.nation_name_en || ''}
            name="nation_name_en"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.nation_name_en}
            helperText={errors.nation_name_en}
          />
          <TextField
            fullWidth
            label={"ชื่อ" + labelText + " (ตัวย่อ)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.nation_abb_name || ''}
            name="nation_abb_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.nation_abb_name}
            helperText={errors.nation_abb_name}
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

export default Hr01Page;