//hr203/index.tsx
'use client';
import React from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppSelect from '@crema/components/AppSelect';
import Table from './Table';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';


interface Data {
  education_id: number;
  staff_id?: number;
  isced_code?: string;
  academic_degree_name?: string;
  academic_degree_abb?: string;
  degree?: string;
  major?: string;
  institution?: string;
  country?: string;
  graduation_date?: string; // เปลี่ยนเป็น string เพื่อให้ง่ายต่อการแสดงผลจาก Date
  gpa?: number; // Decimal ใน Prisma จะเป็น number ใน JS/TS
  create_at?: string; // เปลี่ยนเป็น string
  update_at?: string; // เปลี่ยนเป็น string
  officer_id?: string; // เปลี่ยนเป็น string
  academic_degree_status?: string;
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง (จาก INSERT statements)
const initialAllRows: Data[] = [
  {
    education_id: 1,
    staff_id: 1001,
    isced_code: '0203',
    academic_degree_name: 'วิทยาศาสตรบัณฑิต',
    academic_degree_abb: 'วท.บ.',
    degree: 'ปริญญาตรี',
    major: 'วิทยาการคอมพิวเตอร์',
    institution: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี',
    country: 'ไทย',
    graduation_date: '2015-05-15',
    gpa: 3.25,
    create_at: '2025-05-25', // ใช้ CURRENT_DATE เป็นวันที่ปัจจุบัน
    update_at: '2025-05-25',
    officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Current'
  },
  {
    education_id: 2,
    staff_id: 1002,
    isced_code: '0413',
    academic_degree_name: 'บริหารธุรกิจมหาบัณฑิต',
    academic_degree_abb: 'บธ.ม.',
    degree: 'ปริญญาโท',
    major: 'การตลาดดิจิทัล',
    institution: 'มหาวิทยาลัยธรรมศาสตร์',
    country: 'ไทย',
    graduation_date: '2018-03-20',
    gpa: 3.75,
    create_at: '2025-05-25',
    update_at: '2025-05-25',
    officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Current'
  },
  {
    education_id: 3,
    staff_id: 1003,
    isced_code: '1011',
    academic_degree_name: 'ปรัชญาดุษฎีบัณฑิต',
    academic_degree_abb: 'ปร.ด.',
    degree: 'ปริญญาเอก',
    major: 'วิศวกรรมไฟฟ้า',
    institution: 'Stanford University',
    country: 'สหรัฐอเมริกา',
    graduation_date: '2020-08-10',
    gpa: 3.90,
    create_at: '2025-05-25',
    update_at: '2025-05-25',
    officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Current'
  },
  {
    education_id: 4,
    staff_id: 1004,
    isced_code: '0314',
    academic_degree_name: 'ศิลปศาสตรบัณฑิต',
    academic_degree_abb: 'ศศ.บ.',
    degree: 'ปริญญาตรี',
    major: 'ภาษาอังกฤษ',
    institution: 'มหาวิทยาลัยเชียงใหม่',
    country: 'ไทย',
    graduation_date: '2010-04-05',
    gpa: 3.10,
    create_at: '2025-05-25',
    update_at: '2025-05-25',
    officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Past'
  },
  {
    education_id: 5,
    staff_id: 1005,
    isced_code: '0710',
    academic_degree_name: 'วิศวกรรมศาสตรมหาบัณฑิต',
    academic_degree_abb: 'วศ.ม.',
    degree: 'ปริญญาโท',
    major: 'วิศวกรรมโยธา',
    institution: 'Imperial College London',
    country: 'สหราชอาณาจักร',
    graduation_date: '2017-11-15',
    gpa: 3.80,
    create_at: '2025-05-25',
    update_at: '2025-05-25',
    officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Current'
  },
  {
    education_id: 6,
    staff_id: 1006,
    isced_code: '0222',
    academic_degree_name: 'วิทยาศาสตรมหาบัณฑิต',
    academic_degree_abb: 'วท.ม.',
    degree: 'ปริญญาโท',
    major: 'เทคโนโลยีสารสนเทศ',
    institution: 'จุฬาลงกรณ์มหาวิทยาลัย',
    country: 'ไทย',
    graduation_date: '2019-10-25',
    gpa: 3.65,
    create_at: '2025-05-25',
    update_at: '2025-05-25',
    officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Current'
  },
  {
    education_id: 7,
    staff_id: 1007,
    isced_code: '0514',
    academic_degree_name: 'นิติศาสตรบัณฑิต',
    academic_degree_abb: 'น.บ.',
    degree: 'ปริญญาตรี',
    major: 'นิติศาสตร์',
    institution: 'มหาวิทยาลัยรามคำแหง',
    country: 'ไทย',
    graduation_date: '2012-07-30',
    gpa: 2.85,
    create_at: '2025-05-25',
    update_at: '2025-05-25',
    officer_id: 'นายเจ้าหน้าที่ บุคคล',
    academic_degree_status: 'Past'
  }
];


const Hr203 = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<Data | null>(null);
  const [tableData, setTableData] = React.useState<Data[]>(initialAllRows);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr02.03' });
    const words = label.split("HR203 ");
    return words[1];
  };

  const dialogTitle = React.useMemo(() => {
    if (dialogMode === 'add') return "เพิ่มข้อมูล" + labeltext();
    if (dialogMode === 'edit') return "แก้ไขข้อมูล" + labeltext();
    if (dialogMode === 'view') return "รายละเอียด" + labeltext();
    return "";
  }, [dialogMode, labeltext]);

  const onOpenAddTask = () => {
    setDialogMode('add');
    setCurrentData({
      education_id: 0, // ID จะถูกกำหนดเมื่อบันทึก
      staff_id: undefined,
      isced_code: '',
      academic_degree_name: '',
      academic_degree_abb: '',
      degree: '',
      major: '',
      institution: '',
      country: '',
      graduation_date: '',
      gpa: undefined,
      create_at: new Date().toISOString().split('T')[0], // วันที่ปัจจุบันในรูปแบบ YYYY-MM-DD
      update_at: new Date().toISOString().split('T')[0],
      officer_id: 'นายเจ้าหน้าที่ บุคคล', // ค่าเริ่มต้นผู้บันทึก
      academic_degree_status: 'Current'
    });
    setAddTaskOpen(true);
    setErrors({});
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
    setCurrentData(null);
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentData(prevData => ({
      ...prevData!,
      [name]: name === 'staff_id' || name === 'officer_id' || name === 'gpa' ? (value ? Number(value) : undefined) : value
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
    if (currentData?.staff_id === undefined || currentData?.staff_id === null || currentData?.staff_id < 0) {
      newErrors.staff_id = 'กรุณากรอกรหัสบุคลากร';
    }
    if (!currentData?.isced_code) {
      newErrors.isced_code = 'กรุณากรอกรหัส ISCED';
    }
    if (!currentData?.academic_degree_name) {
      newErrors.academic_degree_name = 'กรุณากรอกชื่อปริญญา';
    }
    if (!currentData?.academic_degree_abb) {
      newErrors.academic_degree_abb = 'กรุณากรอกวุฒิการศึกษา (ชื่อย่อ)';
    }
    if (!currentData?.degree) {
      newErrors.degree = 'กรุณากรอกระดับการศึกษา';
    }
    if (!currentData?.major) {
      newErrors.major = 'กรุณากรอกวิชาเอก/สาขา';
    }
    if (!currentData?.institution) {
      newErrors.institution = 'กรุณากรอกสถานศึกษา';
    }
    if (!currentData?.graduation_date) {
      newErrors.graduation_date = 'กรุณากรอกวันที่สำเร็จการศึกษา';
    }
    if (!currentData?.country) {
      newErrors.country = 'กรุณากรอกประเทศ';
    }
    if (!currentData?.gpa) {
      newErrors.gpa = 'กรุณากรอกผลการเรียนเฉลี่ย (GPA)';
    }
    if (!currentData?.academic_degree_status) {
      newErrors.academic_degree_status = 'กรุณาเลือกสถานะวุฒิการศึกษา';
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveData = () => {
     if (!validateData()) {
      //
      return;
    }

    if (dialogMode === 'add') {
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.education_id)) + 1 : 1;
      const newData: Data = {
        ...currentData!,
        education_id: newId,
        create_at: new Date().toISOString().split('T')[0],
        update_at: new Date().toISOString().split('T')[0],
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.education_id === currentData!.education_id ? {
            ...currentData!,
            update_at: new Date().toISOString().split('T')[0]
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
      setTableData(prevData => prevData.filter(data => data.education_id !== id));
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
      title={<IntlMessages id="sidebar.hr02.03" />}  
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
            label="รหัส"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.education_id || ''}
            name="education_id"
            onChange={handleInputChange}
            disabled={dialogMode !== 'add'}
          />
          <TextField
            fullWidth
            label="รหัสบุคลากร"
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
            label="รหัส ISCED"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.isced_code || ''}
            name="isced_code"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.isced_code}
            helperText={errors.isced_code}
          />
          <TextField
            fullWidth
            label="ชื่อปริญญา"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.academic_degree_name || ''}
            name="academic_degree_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.academic_degree_name}
            helperText={errors.academic_degree_name}
          />
          <TextField
            fullWidth
            label="วุฒิการศึกษา (ชื่อย่อ)"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.academic_degree_abb || ''}
            name="academic_degree_abb"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.academic_degree_abb}
            helperText={errors.academic_degree_abb}
          />
          <TextField
            fullWidth
            label="ระดับการศึกษา"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.degree || ''}
            name="degree"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.degree}
            helperText={errors.degree}
          />
          <TextField
            fullWidth
            label="วิชาเอก/สาขา"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.major || ''}
            name="major"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.major}
            helperText={errors.major}
          />
          <TextField
            fullWidth
            label="สถานศึกษา"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.institution || ''}
            name="institution"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.institution}
            helperText={errors.institution}
          />
          <TextField
            fullWidth
            label="ประเทศ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.country || ''}
            name="country"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.country}
            helperText={errors.country}
          />
          <TextField
            fullWidth
            label="วันที่สำเร็จการศึกษา"
            variant="outlined"
            margin="normal"
            size="small"
            type="date" // ใช้ type="date" สำหรับวันที่
            value={currentData?.graduation_date || ''}
            name="graduation_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.graduation_date}
            helperText={errors.graduation_date}
            InputLabelProps={{
              shrink: true, // ทำให้ label ลอยขึ้นเมื่อมีค่า
            }}
          />
          <TextField
            fullWidth
            label="ผลการเรียนเฉลี่ย (GPA)"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.gpa || ''}
            name="gpa"
            type="number"
            inputProps={{ step: "0.01" }} // กำหนด step สำหรับทศนิยม
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.gpa}
            helperText={errors.gpa}
          />
          <TextField
            fullWidth
            label="สถานะวุฒิการศึกษา"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.academic_degree_status || ''}
            name="academic_degree_status"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.academic_degree_status}
            helperText={errors.academic_degree_status}
          />
          <TextField
            fullWidth
            label="ผู้บันทึกข้อมูล"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.officer_id || ''}
            name="officer_id"
            type="number"
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

export default Hr203;
 