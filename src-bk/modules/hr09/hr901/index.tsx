 //hr901/index.tsx
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
import MenuItem from '@mui/material/MenuItem'; // สำหรับ Select/Dropdown

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลเครื่องราชอิสริยาภรณ์ ---
interface AwardData {
  award_id: number;
  staff_id: number;
  award_name: string;
  award_date: string;
  award_type: string;
  announcement_details: string;
  announcement_date: string;
  gazette_volume: string;
  gazette_number: string;
  gazette_section: string;
  return_date?: string; // อาจเป็นค่าว่างได้
  create_at: string;
  update_at: string;
  officer_id: number;
  award_status: string;
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง erp_hr."Award"
const initialAwardRows: AwardData[] = [
 {
    award_id: 1,
    staff_id: 101,
    award_name: 'เครื่องราชอิสริยาภรณ์อันเป็นที่เชิดชูยิ่งช้างเผือก ชั้นที่ 1 ประถมาภรณ์ช้างเผือก (ป.ช.)',
    award_date: '2023-12-05',
    award_type: 'ประเภทข้าราชการ บัญชี 15 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ข้าราชการ ยกเว้นที่ปรากฏในบัญชีอื่น',
    announcement_details: 'ประกาศสำนักนายกรัฐมนตรี เรื่อง พระราชทานเครื่องราชอิสริยาภรณ์อันเป็นที่เชิดชูยิ่งช้างเผือกและมหาวชิรมงกุฎ ประจำปี ๒๕๖๖',
    announcement_date: '2024-01-20',
    gazette_volume: '141',
    gazette_number: '3 ข',
    gazette_section: 'หน้า 1',
    return_date: undefined, // ยังไม่ส่งคืน
    create_at: '2024-01-25',
    update_at: '2024-01-25',
    officer_id: 680001,
    award_status: 'ได้รับแล้ว',
  },
  {
    award_id: 2,
    staff_id: 102,
    award_name: 'เครื่องราชอิสริยาภรณ์อันมีเกียรติยศยิ่งมงกุฎไทย ชั้นที่ 5 เบญจมาภรณ์มงกุฎไทย (บ.ม.)',
    award_date: '2022-12-05',
    award_type: 'ประเภทพนักงานมหาวิทยาลัย บัญชี 29 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ผู้ดำรงตำแหน่งในสถาบันอุดมศึกษาของรัฐ ที่ไม่เป็นข้าราชการ',
    announcement_details: 'ประกาศสำนักนายกรัฐมนตรี เรื่อง พระราชทานเครื่องราชอิสริยาภรณ์อันเป็นที่เชิดชูยิ่งช้างเผือกและมหาวชิรมงกุฎ ประจำปี ๒๕๖๕',
    announcement_date: '2023-01-15',
    gazette_volume: '140',
    gazette_number: '2 ข',
    gazette_section: 'หน้า 5',
    return_date: undefined,
    create_at: '2023-01-20',
    update_at: '2023-01-20',
    officer_id: 680001,
    award_status: 'ได้รับแล้ว',
  },
  {
    award_id: 3,
    staff_id: 103,
    award_name: 'เหรียญจักรพรรดิมาลา (ร.จ.พ.)',
    award_date: '2023-05-10',
    award_type: 'ประเภทลูกจ้างประจำ บัญชี 25 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ลูกจ้างประจำของส่วนราชการ',
    announcement_details: 'ประกาศสำนักนายกรัฐมนตรี เรื่อง พระราชทานเหรียญจักรพรรดิมาลา',
    announcement_date: '2023-07-01',
    gazette_volume: '140',
    gazette_number: 'พิเศษ 100 ง',
    gazette_section: 'หน้า 2',
    return_date: undefined,
    create_at: '2023-07-05',
    update_at: '2023-07-05',
    officer_id: 680001,
    award_status: 'ได้รับแล้ว',
  },
  {
    award_id: 4,
    staff_id: 104,
    award_name: 'เครื่องราชอิสริยาภรณ์อันเป็นที่เชิดชูยิ่งช้างเผือก ชั้นที่ 5 เบญจมาภรณ์ช้างเผือก (บ.ช.)',
    award_date: '2024-12-05',
    award_type: 'ประเภทพนักงานราชการ บัญชี 26 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่พนักงานราชการ',
    announcement_details: 'อยู่ระหว่างดำเนินการ',
    announcement_date: '2025-01-01',
    gazette_volume: '142',
    gazette_number: '1 ข',
    gazette_section: 'หน้า 10',
    return_date: undefined,
    create_at: '2024-12-10',
    update_at: '2024-12-10',
    officer_id: 680001,
    award_status: 'อยู่ในระหว่างยื่นขอ',
  },
  {
    award_id: 5,
    staff_id: 105,
    award_name: 'เครื่องราชอิสริยาภรณ์อันมีเกียรติยศยิ่งมงกุฎไทย ชั้นที่ 4 จตุรถาภรณ์มงกุฎไทย (จ.ม.)',
    award_date: '2024-12-05',
    award_type: 'ประเภทพนักงานราชการ บัญชี 26 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่พนักงานราชการ',
    announcement_details: 'รอประกาศราชกิจจานุเบกษา',
    announcement_date: '2025-02-15',
    gazette_volume: '142',
    gazette_number: '2 ข',
    gazette_section: 'หน้า 3',
    return_date: undefined,
    create_at: '2024-12-12',
    update_at: '2024-12-12',
    officer_id: 680001,
    award_status: 'รอประกาศราชกิจจานุเบกษา',
  },
  {
    award_id: 6,
    staff_id: 101,
    award_name: 'เหรียญรัตนาภรณ์ รัชกาลที่ ๙ ชั้นที่ ๔ (ร.ร.๙ ๔)',
    award_date: '2020-12-05',
    award_type: 'ประเภทพนักงานราชการ บัญชี 26 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่พนักงานราชการ',
    announcement_details: 'ประกาศสำนักนายกรัฐมนตรี เรื่อง พระราชทานเหรียญรัตนาภรณ์',
    announcement_date: '2021-01-10',
    gazette_volume: '138',
    gazette_number: '1 ข',
    gazette_section: 'หน้า 8',
    return_date: '2023-03-01', // ตัวอย่างการส่งคืน
    create_at: '2021-01-15',
    update_at: '2023-03-01',
    officer_id: 680001,
    award_status: 'ได้รับแล้ว',
  },
];


const Hr09Page = () => { // เปลี่ยนชื่อ Component เป็น Hr02Page
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<AwardData | null>(null); // ใช้ AwardData
  const [tableData, setTableData] = React.useState<AwardData[]>(initialAwardRows); // ใช้ initialAwardRows
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  // ฟังก์ชันสำหรับดึงข้อความ label จาก intl
  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr09.01' }); 
    const words = label.split("HR901 ");
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
      award_id: 0, // id จะถูกกำหนดเมื่อบันทึก
      staff_id: 0,
      award_name: '',
      award_date: '',
      award_type: '',
      announcement_details: '',
      announcement_date: '',
      gazette_volume: '',
      gazette_number: '',
      gazette_section: '',
      return_date: undefined,
      create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      officer_id: 0, 
      award_status: 'อยู่ในระหว่างยื่นขอ' // ค่าเริ่มต้นสถานะ
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
    if (!currentData?.award_name) {
      newErrors.award_name = 'กรุณากรอกข้อมูลชื่อเครื่องราชอิสริยาภรณ์';
    }
    if (!currentData?.award_date) {
      newErrors.award_date = 'กรุณากรอกข้อมูลวันที่ได้รับเครื่องราชอิสริยาภรณ์';
    }
    if (!currentData?.award_type) {
      newErrors.award_type = 'กรุณากรอกข้อมูลประเภทเครื่องราชอิสริยาภรณ์';
    }
    if (!currentData?.announcement_details) {
      newErrors.announcement_details = 'กรุณากรอกข้อมูลรายละเอียดประกาศ';
    }
    if (!currentData?.announcement_date) {
      newErrors.announcement_date = 'กรุณากรอกข้อมูลวันที่ประกาศ';
    }
    if (!currentData?.gazette_volume) {
      newErrors.gazette_volume = 'กรุณากรอกข้อมูลเล่มที่ราชกิจจานุเบกษา';
    }
    if (!currentData?.gazette_number) {
      newErrors.gazette_number = 'กรุณากรอกข้อมูลตอนที่ราชกิจจานุเบกษา';
    }
    if (!currentData?.gazette_section) {
      newErrors.gazette_section = 'กรุณากรอกข้อมูลหน้าประกาศราชกิจจานุเบกษา';
    }
    if (!currentData?.award_status) {
      newErrors.award_status = 'กรุณากรอกข้อมูลสถานะเครื่องราชอิสริยาภรณ์';
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.award_id)) + 1 : 1;
      const newData: AwardData = {
        ...currentData!,
        award_id: newId,
        create_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      // แก้ไขข้อมูล
      setTableData(prevData =>
        prevData.map(data =>
          data.award_id === currentData!.award_id ? {
            ...currentData!,
            update_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: AwardData) => { // ใช้ AwardData
    setDialogMode('view');
    setCurrentData(data);
    setErrors({}); 
    setAddTaskOpen(true);
  };

  const handleEditData = (data: AwardData) => { // ใช้ AwardData
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
      setTableData(prevData => prevData.filter(data => data.award_id !== id));
      Swal.fire(
        'ลบแล้ว!',
        'ข้อมูลของคุณถูกลบเรียบร้อยแล้ว',
        'success'
      );
    }
  };

    const award_typeOptions = [
    { value: 'ประเภทข้าราชการ บัญชี 15 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ข้าราชการ ยกเว้นที่ปรากฏในบัญชีอื่น', label: 'ประเภทข้าราชการ บัญชี 15 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ข้าราชการ ยกเว้นที่ปรากฏในบัญชีอื่น' },
    { value: 'ประเภทพนักงานมหาวิทยาลัย บัญชี 29 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ผู้ดำรงตำแหน่งในสถาบันอุดมศึกษาของรัฐ ที่ไม่เป็นข้าราชการ', label: 'ประเภทพนักงานมหาวิทยาลัย บัญชี 29 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ผู้ดำรงตำแหน่งในสถาบันอุดมศึกษาของรัฐ ที่ไม่เป็นข้าราชการ' },
    { value: 'ประเภทลูกจ้างประจำ บัญชี 25 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ลูกจ้างประจำของส่วนราชการ', label: 'ประเภทลูกจ้างประจำ บัญชี 25 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ลูกจ้างประจำของส่วนราชการ' },
    { value: 'ประเภทพนักงานราชการ บัญชี 26 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่พนักงานราชการ', label: 'ประเภทพนักงานราชการ บัญชี 26 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่พนักงานราชการ' },

  ];

  return (
    <AppCard
      contentStyle={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 8 }}
      title={<IntlMessages id="sidebar.hr09.01" />} 
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
            value={currentData?.award_id || ''}
            name="award_id"
            onChange={handleInputChange}
            disabled={dialogMode !== 'add'} 
          />
          <TextField
            fullWidth
            label="รหัสประจำตัวบุคลากร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.staff_id || ''}
            name="staff_id"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.staff_id}
            helperText={errors.staff_id}
          />
          <TextField
            fullWidth
            label={"ชื่อเครื่องราชอิสริยาภรณ์"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.award_name || ''}
            name="award_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.award_name}
            helperText={errors.award_name}
          />
          <TextField
            fullWidth
            label={"วันที่ได้รับเครื่องราชอิสริยาภรณ์"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date" // ใช้ type date
            InputLabelProps={{ shrink: true }} // ทำให้ label ไม่ทับค่า
            value={currentData?.award_date || ''}
            name="award_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.award_date}
            helperText={errors.award_date}
          />
                  <TextField
                          select
                          fullWidth
                          label="ประเภทเครื่องราชอิสริยาภรณ์'"
                          variant="outlined"
                          margin="normal"
                          size="small"
                          value={currentData?.award_type === undefined ? '' : currentData?.award_type}
                          name="prefixname_id"
                          onChange={handleInputChange}
                          disabled={dialogMode === 'view'}
                          error={!!errors.award_type}
                          helperText={errors.award_type}
                        >
                          {award_typeOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
          <TextField
            fullWidth
            label={"รายละเอียดประกาศ"}
            variant="outlined"
            margin="normal"
            size="small"
            multiline // เพิ่ม multiline สำหรับข้อความยาวๆ
            rows={2}
            value={currentData?.announcement_details || ''}
            name="announcement_details"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.announcement_details}
            helperText={errors.announcement_details}
          />
          <TextField
            fullWidth
            label={"วันที่ประกาศ"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.announcement_date || ''}
            name="announcement_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.announcement_date}
            helperText={errors.announcement_date}
          />
          <TextField
            fullWidth
            label={"เล่มที่ราชกิจจานุเบกษา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.gazette_volume || ''}
            name="gazette_volume"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.gazette_volume}
            helperText={errors.gazette_volume}
          />
          <TextField
            fullWidth
            label={"ตอนที่ราชกิจจานุเบกษา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.gazette_number || ''}
            name="gazette_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.gazette_number}
            helperText={errors.gazette_number}
          />
          <TextField
            fullWidth
            label={"หน้าประกาศราชกิจจานุเบกษา"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.gazette_section || ''}
            name="gazette_section"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.gazette_section}
            helperText={errors.gazette_section}
          />
          <TextField
            fullWidth
            label={"วันที่ส่งคืน (ถ้ามี)"}
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentData?.return_date || ''}
            name="return_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"สถานะเครื่องราชอิสริยาภรณ์"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.award_status || ''}
            name="award_status"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.award_status}
            helperText={errors.award_status}
          />
          <TextField
            fullWidth
            label={"ผู้บันทึกข้อมูล (รหัสเจ้าหน้าที่)"}
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

export default Hr09Page; 