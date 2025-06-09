//hr11102/index.tsx
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
import Table from './Table'; // ใช้ Table ของ hr113

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง District ---
export interface Data {
  id: string; // district_id (เป็น string)
  district_name: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง District
const initialAllRows: Data[] = [
  { district_id: '0900', district_name: 'ต่างประเทศ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1001', district_name: 'เขตพระนคร', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1002', district_name: 'เขตดุสิต', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1003', district_name: 'เขตหนองจอก', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1004', district_name: 'เขตบางรัก', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1005', district_name: 'เขตบางเขน', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1006', district_name: 'เขตบางกะปิ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1007', district_name: 'เขตปทุมวัน', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1008', district_name: 'เขตป้อมปราบศัตรูพ่าย', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1009', district_name: 'เขตพระโขนง', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1010', district_name: 'เขตมีนบุรี', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1011', district_name: 'เขตลาดกระบัง', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1012', district_name: 'เขตยานนาวา', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1013', district_name: 'เขตสัมพันธวงศ์', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1014', district_name: 'เขตพญาไท', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1015', district_name: 'เขตธนบุรี', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1016', district_name: 'เขตบางกอกใหญ่', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1017', district_name: 'เขตห้วยขวาง', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1018', district_name: 'เขตคลองสาน', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1019', district_name: 'เขตตลิ่งชัน', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1020', district_name: 'เขตบางกอกน้อย', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1021', district_name: 'เขตบางขุนเทียน', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1022', district_name: 'เขตภาษีเจริญ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1023', district_name: 'เขตหนองแขม', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1024', district_name: 'เขตราษฎร์บูรณะ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1025', district_name: 'เขตบางพลัด', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1026', district_name: 'เขตดินแดง', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1027', district_name: 'เขตบึงกุ่ม', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1028', district_name: 'เขตสาทร', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1029', district_name: 'เขตบางซื่อ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1030', district_name: 'เขตจตุจักร', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1031', district_name: 'เขตบางคอแหลม', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1032', district_name: 'เขตประเวศ', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1033', district_name: 'เขตคลองเตย', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1034', district_name: 'เขตสวนหลวง', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1035', district_name: 'เขตจอมทอง', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1036', district_name: 'เขตดอนเมือง', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1037', district_name: 'เขตราชเทวี', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1038', district_name: 'เขตลาดพร้าว', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
  { district_id: '1039', district_name: 'เขตวัฒนา', create_at: '2025-06-06', update_at: '2025-06-06', officer_id: 680001 },
].map(item => ({ // เปลี่ยนชื่อ district_id เป็น id
  id: item.district_id,
  district_name: item.district_name,
  create_at: item.create_at,
  update_at: item.update_at,
  officer_id: item.officer_id,
}));


const Hr01Page = () => { // สามารถเปลี่ยนชื่อเป็น DistrictPage หรือ Hr113Page เพื่อความชัดเจน
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = useState<Data | null>(null);
  const [tableData, setTableData] = useState<Data[]>(initialAllRows);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labelText = useMemo(() => {
    // สมมติว่าคุณมี id สำหรับ District ในไฟล์ IntlMessages ของคุณ
    const label = intl.formatMessage({ id: 'sidebar.hr01.1102' }); // สมมติว่าใช้ id นี้
    const words = label.split("HR11102 "); 
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
      id: '', // district_id จะถูกกำหนดเมื่อบันทึก
      district_name: '',
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
      newErrors.id = 'กรุณากรอกรหัสอำเภอ';
    }
    if (!currentData?.district_name) {
      newErrors.district_name = 'กรุณากรอกชื่ออำเภอ';
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
        Swal.fire('ข้อผิดพลาด!', 'รหัสอำเภอมีอยู่แล้ว', 'error');
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
      title={<IntlMessages id="sidebar.hr01.1102" />}
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
            disabled={dialogMode === 'view' || dialogMode === 'edit'} // รหัสแก้ไขไม่ได้ (ยกเว้นเพิ่ม)
            error={!!errors.id}
            helperText={errors.id}
          />
          <TextField
            fullWidth
            label={"ชื่อ" + labelText}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.district_name || ''}
            name="district_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.district_name}
            helperText={errors.district_name}
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