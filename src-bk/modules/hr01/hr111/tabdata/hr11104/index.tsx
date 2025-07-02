//hr11104/index.tsx
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
import Table from './Table'; // ใช้ Table ของ hr115

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง Country ---
export interface Data {
  id: string; // country_id (เป็น string)
  country_name_th: string;
  country_name_en: string;
  country_abb_name: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง Country
const initialAllRows: Data[] = [
  { country_id: 'AO', country_name_th: 'แองโกลา', country_name_en: 'Angola', country_abb_name: 'AO', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'AF', country_name_th: 'อัฟกานิสถาน', country_name_en: 'Afghanistan', country_abb_name: 'AF', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'AL', country_name_th: 'แอลเบเนีย', country_name_en: 'Albania', country_abb_name: 'AL', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'DZ', country_name_th: 'แอลจีเรีย', country_name_en: 'Algeria', country_abb_name: 'DZ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'AD', country_name_th: 'อันดอร์รา', country_name_en: 'Andorra', country_abb_name: 'AD', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'AG', country_name_th: 'แอนติกาและบาร์บูดา', country_name_en: 'Antigua and Barbuda', country_abb_name: 'AG', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'AR', country_name_th: 'อาร์เจนตินา', country_name_en: 'Argentina', country_abb_name: 'AR', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'AM', country_name_th: 'อาร์เมเนีย', country_name_en: 'Armenia', country_abb_name: 'AM', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'AU', country_name_th: 'ออสเตรเลีย', country_name_en: 'Australia', country_abb_name: 'AU', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'AT', country_name_th: 'ออสเตรีย', country_name_en: 'Austria', country_abb_name: 'AT', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'AZ', country_name_th: 'อาเซอร์ไบจาน', country_name_en: 'Azerbaijan', country_abb_name: 'AZ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BS', country_name_th: 'บาฮามาส', country_name_en: 'Bahamas (the)', country_abb_name: 'BS', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BH', country_name_th: 'บาห์เรน', country_name_en: 'Bahrain', country_abb_name: 'BH', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BD', country_name_th: 'บังกลาเทศ', country_name_en: 'Bangladesh', country_abb_name: 'BD', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BB', country_name_th: 'บาร์เบโดส', country_name_en: 'Barbados', country_abb_name: 'BB', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BY', country_name_th: 'เบลารุส', country_name_en: 'Belarus', country_abb_name: 'BY', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BE', country_name_th: 'เบลเยียม', country_name_en: 'Belgium', country_abb_name: 'BE', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BZ', country_name_th: 'เบลีซ', country_name_en: 'Belize', country_abb_name: 'BZ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BJ', country_name_th: 'เบนิน', country_name_en: 'Benin', country_abb_name: 'BJ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BT', country_name_th: 'ภูฏาน', country_name_en: 'Bhutan', country_abb_name: 'BT', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BO', country_name_th: 'โบลิเวีย', country_name_en: 'Bolivia (Plurinational State of)', country_abb_name: 'BO', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BA', country_name_th: 'บอสเนียและเฮอร์เซโกวีนา', country_name_en: 'Bosnia and Herzegovina', country_abb_name: 'BA', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BW', country_name_th: 'บอตสวานา', country_name_en: 'Botswana', country_abb_name: 'BW', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BR', country_name_th: 'บราซิล', country_name_en: 'Brazil', country_abb_name: 'BR', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BN', country_name_th: 'บรูไนดารุสซาลาม', country_name_en: 'Brunei Darussalam', country_abb_name: 'BN', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BG', country_name_th: 'บัลแกเรีย', country_name_en: 'Bulgaria', country_abb_name: 'BG', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BF', country_name_th: 'บูร์กินาฟาโซ', country_name_en: 'Burkina Faso', country_abb_name: 'BF', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'BI', country_name_th: 'บุรุนดี', country_name_en: 'Burundi', country_abb_name: 'BI', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'CV', country_name_th: 'กาบูเวร์ดี', country_name_en: 'Cabo Verde', country_abb_name: 'CV', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'KH', country_name_th: 'กัมพูชา', country_name_en: 'Cambodia', country_abb_name: 'KH', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'CM', country_name_th: 'แคเมอรูน', country_name_en: 'Cameroon', country_abb_name: 'CM', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'CA', country_name_th: 'แคนาดา', country_name_en: 'Canada', country_abb_name: 'CA', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'CF', country_name_th: 'สาธารณรัฐแอฟริกากลาง', country_name_en: 'Central African Republic (the)', country_abb_name: 'CF', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'TD', country_name_th: 'ชาด', country_name_en: 'Chad', country_abb_name: 'TD', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'CL', country_name_th: 'ชิลี', country_name_en: 'Chile', country_abb_name: 'CL', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'CN', country_name_th: 'จีน', country_name_en: 'China', country_abb_name: 'CN', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'CO', country_name_th: 'โคลอมเบีย', country_name_en: 'Colombia', country_abb_name: 'CO', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'KM', country_name_th: 'คอโมโรส', country_name_en: 'Comoros (the)', country_abb_name: 'KM', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'CD', country_name_th: 'คองโก (สาธารณรัฐประชาธิปไตย)', country_name_en: 'Congo (the Democratic Republic of the)', country_abb_name: 'CD', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
  { country_id: 'CG', country_name_th: 'คองโก (สาธารณรัฐ)', country_name_en: 'Congo (the)', country_abb_name: 'CG', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 6800001 },
].map(item => ({ // เปลี่ยนชื่อ country_id เป็น id
  id: item.country_id,
  country_name_th: item.country_name_th,
  country_name_en: item.country_name_en,
  country_abb_name: item.country_abb_name,
  create_at: item.create_at,
  update_at: item.update_at,
  officer_id: item.officer_id,
}));


const Hr01Page = () => { // เปลี่ยนชื่อเป็น CountryPage หรือ Hr115Page เพื่อความชัดเจน
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = useState<Data | null>(null);
  const [tableData, setTableData] = useState<Data[]>(initialAllRows);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labelText = useMemo(() => {
    // สมมติว่าคุณมี id สำหรับ Country ในไฟล์ IntlMessages ของคุณ
    const label = intl.formatMessage({ id: 'sidebar.hr01.1104' }); // สมมติว่าใช้ id นี้
    const words = label.split("HR11104 "); // ตัวอย่างการตัด HR114 ออก
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
      id: '', // country_id จะถูกกำหนดเมื่อบันทึก
      country_name_th: '',
      country_name_en: '',
      country_abb_name: '',
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
      newErrors.id = 'กรุณากรอกรหัสประเทศ';
    }
    if (!currentData?.country_name_th) {
      newErrors.country_name_th = 'กรุณากรอกชื่อประเทศ (TH)';
    }
    if (!currentData?.country_name_en) {
      newErrors.country_name_en = 'กรุณากรอกชื่อประเทศ (EN)';
    }
    if (!currentData?.country_abb_name) {
      newErrors.country_abb_name = 'กรุณากรอกชื่อประเทศ (ตัวย่อ)';
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
        Swal.fire('ข้อผิดพลาด!', 'รหัสประเทศนี้มีอยู่แล้ว', 'error');
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
      title={<IntlMessages id="sidebar.hr01.1104" />}
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
            value={currentData?.country_name_th || ''}
            name="country_name_th"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.country_name_th}
            helperText={errors.country_name_th}
          />
          <TextField
            fullWidth
            label={"ชื่อ" + labelText + " (EN)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.country_name_en || ''}
            name="country_name_en"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.country_name_en}
            helperText={errors.country_name_en}
          />
          <TextField
            fullWidth
            label={"ชื่อ" + labelText + " (ตัวย่อ)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.country_abb_name || ''}
            name="country_abb_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.country_abb_name}
            helperText={errors.country_abb_name}
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