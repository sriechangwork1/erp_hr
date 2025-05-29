//hr207/index.tsx
'use client';
import React from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import Table from './Table'; // จะใช้ Table Component ที่สร้างใหม่
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';


interface FamilyData {
  family_id: number;
  staff_id?: number;
  relationship?: string;
  full_name?: string;
  date_of_birth?: string; // DateTime @db.Date becomes string
  occupation?: string;
  fam_tel?: string;
  fam_address?: string;
  create_at?: string; // DateTime @db.Date becomes string
  update_at?: string; // DateTime @db.Date becomes string
  officer_id?: number;
  [key: string]: any;
}

// Helper to format date to YYYY-MM-DD or return empty string for '1900-01-01'
const formatDate = (dateString: string | undefined): string => {
    if (!dateString || dateString === '1900-01-01') {
        return '';
    }
    // Ensure dateString is in 'YYYY-MM-DD' format if it's not already
    try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    } catch (e) {
        return '';
    }
};

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง Family
const initialAllRows: FamilyData[] = [
  {
    family_id: 1, staff_id: 101, relationship: 'บิดา', full_name: 'สมชาย ดีมาก', date_of_birth: '1950-06-15', occupation: 'รับราชการเกษียณ', fam_tel: '0811111111', fam_address: '123/4 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', create_at: '2020-01-10', update_at: '2023-05-20', officer_id: 1001
  },
  {
    family_id: 2, staff_id: 101, relationship: 'มารดา', full_name: 'สมหญิง ดีมาก', date_of_birth: '1955-08-20', occupation: 'แม่บ้าน', fam_tel: '0822222222', fam_address: '123/4 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', create_at: '2020-01-10', update_at: '2023-05-20', officer_id: 1001
  },
  {
    family_id: 3, staff_id: 101, relationship: 'คู่สมรส', full_name: 'สุนิสา ดีมาก', date_of_birth: '1980-03-25', occupation: 'ครู', fam_tel: '0833333333', fam_address: '123/4 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', create_at: '2020-01-10', update_at: '2023-05-20', officer_id: 1001
  },
  {
    family_id: 4, staff_id: 101, relationship: 'บุตร', full_name: 'เด็กชายดีมาก ดีมาก', date_of_birth: '2010-11-05', occupation: 'นักเรียน', fam_tel: '0800000000', fam_address: '123/4 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', create_at: '2020-01-10', update_at: '2023-05-20', officer_id: 1001
  },
  {
    family_id: 5, staff_id: 102, relationship: 'บิดา', full_name: 'ประเสริฐ ศรีสุข', date_of_birth: '1948-12-10', occupation: 'ธุรกิจส่วนตัว', fam_tel: '0844444444', fam_address: '456/7 ถนนราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330', create_at: '2019-05-15', update_at: '2023-04-18', officer_id: 1002
  },
  {
    family_id: 6, staff_id: 102, relationship: 'คู่สมรส', full_name: 'เพชรา ศรีสุข', date_of_birth: '1982-07-30', occupation: 'แพทย์', fam_tel: '0855555555', fam_address: '456/7 ถนนราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330', create_at: '2019-05-15', update_at: '2023-04-18', officer_id: 1002
  },
  {
    family_id: 7, staff_id: 103, relationship: 'ผู้ติดต่อกรณีฉุกเฉิน', full_name: 'นพดล รักเพื่อน', date_of_birth: '1975-09-12', occupation: 'วิศวกร', fam_tel: '0866666666', fam_address: '789/8 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500', create_at: '2021-02-20', update_at: '2023-06-10', officer_id: 1003
  },
  {
    family_id: 8, staff_id: 104, relationship: 'มารดา', full_name: 'วรรณา จิตดี', date_of_birth: '1952-04-18', occupation: 'แม่บ้าน', fam_tel: '0877777777', fam_address: '321/9 ถนนพระราม 4 แขวงสุริยวงศ์ เขตบางรัก กรุงเทพฯ 10500', create_at: '2018-11-05', update_at: '2023-03-15', officer_id: 1004
  },
  {
    family_id: 9, staff_id: 105, relationship: 'คู่สมรส', full_name: 'วิไลลักษณ์ ใจกล้า', date_of_birth: '1985-01-22', occupation: 'นักบัญชี', fam_tel: '0888888888', fam_address: '555/10 ถนนเพชรบุรี แขวงถนนเพชรบุรี เขตราชเทวี กรุงเทพฯ 10400', create_at: '2020-07-30', update_at: '2023-05-05', officer_id: 1005
  },
  {
    family_id: 10, staff_id: 106, relationship: 'บุตร', full_name: 'เด็กหญิงน้ำทิพย์ เก่งมาก', date_of_birth: '2015-08-08', occupation: 'นักเรียน', fam_tel: '0899999999', fam_address: '999/11 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400', create_at: '2022-03-12', update_at: '2023-04-20', officer_id: 1006
  }
];

const Hr207 = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<FamilyData | null>(null);
  const [tableData, setTableData] = React.useState<FamilyData[]>(initialAllRows);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  const labeltext = () => {
    // ปรับปรุง ID ให้เป็น 'sidebar.hr02.07' และข้อความ
    const label = intl.formatMessage({ id: 'sidebar.hr02.07', defaultMessage: 'HR207 ข้อมูลครอบครัว' });
    const words = label.split("HR207 ");
    return words.length > 1 ? words[1] : label;
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
      family_id: 0, // ID will be assigned on save
      staff_id: undefined,
      relationship: '',
      full_name: '',
      date_of_birth: '',
      occupation: '',
      fam_tel: '',
      fam_address: '',
      create_at: new Date().toISOString().split('T')[0],
      update_at: new Date().toISOString().split('T')[0],
      officer_id: undefined,
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
    setCurrentData(prevData => {
      const newData = { ...prevData! };
      if (['staff_id', 'officer_id'].includes(name)) {
        newData[name] = value ? Number(value) : undefined;
      } else {
        newData[name] = value;
      }
      return newData;
    });

    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateData = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (currentData?.staff_id === undefined || currentData?.staff_id === null || currentData?.staff_id <= 0) {
      newErrors.staff_id = 'กรุณากรอกรหัสบุคลากร';
    }
    if (!currentData?.relationship) {
      newErrors.relationship = 'กรุณากรอกความสัมพันธ์';
    }
    if (!currentData?.full_name) {
      newErrors.full_name = 'กรุณากรอกชื่อ-นามสกุล';
    }
    if (!currentData?.date_of_birth) {
      newErrors.date_of_birth = 'กรุณากรอกวันเกิด';
    }
    if (!currentData?.occupation) {
      newErrors.occupation = 'กรุณากรอกอาชีพ';
    }
    if (!currentData?.fam_tel) {
      newErrors.fam_tel = 'กรุณากรอกเบอร์โทร';
    }
    if (!currentData?.fam_address) {
      newErrors.fam_address = 'กรุณากรอกที่อยู่';
    }
    if (currentData?.officer_id === undefined || currentData?.officer_id === null || currentData?.officer_id <= 0) {
        newErrors.officer_id = 'กรุณากรอกรหัสผู้จัดการข้อมูล';
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveData = () => {
     if (!validateData()) {
      return;
    }

    if (dialogMode === 'add') {
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.family_id)) + 1 : 1;
      const newData: FamilyData = {
        ...currentData!,
        family_id: newId,
        create_at: new Date().toISOString().split('T')[0],
        update_at: new Date().toISOString().split('T')[0],
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.family_id === currentData!.family_id ? {
            ...currentData!,
            update_at: new Date().toISOString().split('T')[0]
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: FamilyData) => {
    setDialogMode('view');
    // Ensure date_of_birth is formatted correctly for TextField type="date"
    setCurrentData({ ...data, date_of_birth: formatDate(data.date_of_birth) });
    setErrors({});
    setAddTaskOpen(true);
  };

  const handleEditData = (data: FamilyData) => {
    setDialogMode('edit');
    // Ensure date_of_birth is formatted correctly for TextField type="date"
    setCurrentData({ ...data, date_of_birth: formatDate(data.date_of_birth) });
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
      setTableData(prevData => prevData.filter(data => data.family_id !== id));
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
      title={<IntlMessages id="sidebar.hr02.07" defaultMessage="HR207 ข้อมูลครอบครัว" />}   
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
            label="รหัสครอบครัว"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.family_id || ''}
            name="family_id"
            onChange={handleInputChange}
            disabled={true} 
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
            label="ความสัมพันธ์"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.relationship || ''}
            name="relationship"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.relationship}
            helperText={errors.relationship}
          />
          <TextField
            fullWidth
            label="ชื่อ-นามสกุล"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.full_name || ''}
            name="full_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.full_name}
            helperText={errors.full_name}
          />
          <TextField
            fullWidth
            label="วันเกิด"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.date_of_birth || ''}
            name="date_of_birth"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{ shrink: true }}
            error={!!errors.date_of_birth}
            helperText={errors.date_of_birth}
          />  
          <TextField
            fullWidth
            label="อาชีพ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.occupation || ''}
            name="occupation"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.occupation}
            helperText={errors.occupation}
          />
          <TextField
            fullWidth
            label="เบอร์โทร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.fam_tel || ''}
            name="fam_tel"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.fam_tel}
            helperText={errors.fam_tel}
          />
          <TextField
            fullWidth
            label="ที่อยู่"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.fam_address || ''}
            name="fam_address"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.fam_address}
            helperText={errors.fam_address}
          />
          <TextField
            fullWidth
            label="ผู้จัดการข้อมูล"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.officer_id || ''}
            name="officer_id"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.officer_id}
            helperText={errors.officer_id}
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

export default Hr207;