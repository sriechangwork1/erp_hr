// hr208/index.tsx
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

interface PassportData {
  passport_id: number;
  staff_id?: number;
  issue_date?: string; // DateTime @db.Date becomes string
  expiry_date?: string; // DateTime @db.Date becomes string
  document_file?: string;
  create_at?: string;
  update_at?: string;
  officer_id?: number;
  [key: string]: any;
}

// Helper to format date to YYYY-MM-DD or return empty string for '1900-01-01'
const formatDate = (dateString: string | undefined): string => {
    if (!dateString || dateString === '1900-01-01') {
        return '';
    }
    try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    } catch (e) {
        return '';
    }
};

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง Passport
const initialAllRows: PassportData[] = [
  {
    passport_id: 1, staff_id: 101, issue_date: '2022-01-15', expiry_date: '2027-01-14', document_file: '/documents/passports/101_passport.pdf', create_at: '2022-01-20', update_at: '2023-05-10', officer_id: 1001
  },
  {
    passport_id: 2, staff_id: 102, issue_date: '2021-11-10', expiry_date: '2026-11-09', document_file: '/documents/passports/102_passport.pdf', create_at: '2021-11-15', update_at: '2023-04-05', officer_id: 1002
  },
  {
    passport_id: 3, staff_id: 103, issue_date: '2023-03-01', expiry_date: '2028-02-28', document_file: '/documents/passports/103_passport.pdf', create_at: '2023-03-05', update_at: '2023-06-15', officer_id: 1003
  },
  {
    passport_id: 4, staff_id: 104, issue_date: '2020-08-20', expiry_date: '2025-08-19', document_file: '/documents/passports/104_passport.pdf', create_at: '2020-08-25', update_at: '2023-01-30', officer_id: 1004
  },
  {
    passport_id: 5, staff_id: 105, issue_date: '2021-05-12', expiry_date: '2026-05-11', document_file: '/documents/passports/105_passport.pdf', create_at: '2021-05-18', update_at: '2023-03-22', officer_id: 1005
  },
  {
    passport_id: 6, staff_id: 106, issue_date: '2022-09-05', expiry_date: '2027-09-04', document_file: '/documents/passports/106_passport.pdf', create_at: '2022-09-10', update_at: '2023-04-18', officer_id: 1006
  },
  {
    passport_id: 7, staff_id: 107, issue_date: '2023-01-30', expiry_date: '2028-01-29', document_file: '/documents/passports/107_passport.pdf', create_at: '2023-02-05', update_at: '2023-06-20', officer_id: 1007
  },
  {
    passport_id: 8, staff_id: 108, issue_date: '2020-12-15', expiry_date: '2025-12-14', document_file: '/documents/passports/108_passport.pdf', create_at: '2020-12-20', update_at: '2023-02-15', officer_id: 1008
  },
  {
    passport_id: 9, staff_id: 109, issue_date: '2021-07-22', expiry_date: '2026-07-21', document_file: '/documents/passports/109_passport.pdf', create_at: '2021-07-28', update_at: '2023-05-30', officer_id: 1009
  },
  {
    passport_id: 10, staff_id: 110, issue_date: '2022-04-10', expiry_date: '2027-04-09', document_file: '/documents/passports/110_passport.pdf', create_at: '2022-04-15', update_at: '2023-06-10', officer_id: 1010
  }
];

const Hr208 = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<PassportData | null>(null);
  const [tableData, setTableData] = React.useState<PassportData[]>(initialAllRows);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  const labeltext = () => {
    // ปรับปรุง ID ให้เป็น 'sidebar.hr02.08' และข้อความ
    const label = intl.formatMessage({ id: 'sidebar.hr02.08', defaultMessage: 'HR208 ข้อมูลหนังสือเดินทาง' });
    const words = label.split("HR208 ");
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
      passport_id: 0, // ID will be assigned on save
      staff_id: undefined,
      issue_date: '',
      expiry_date: '',
      document_file: '',
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
    if (!currentData?.issue_date) {
      newErrors.issue_date = 'กรุณากรอกวันที่ออกหนังสือเดินทาง';
    }
    if (!currentData?.expiry_date) {
      newErrors.expiry_date = 'กรุณากรอกวันหมดอายุ';
    }
    // document_file ไม่จำเป็นต้องมีข้อมูลเสมอไป
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.passport_id)) + 1 : 1;
      const newData: PassportData = {
        ...currentData!,
        passport_id: newId,
        create_at: new Date().toISOString().split('T')[0],
        update_at: new Date().toISOString().split('T')[0],
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.passport_id === currentData!.passport_id ? {
            ...currentData!,
            update_at: new Date().toISOString().split('T')[0]
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: PassportData) => {
    setDialogMode('view');
    // Ensure date fields are formatted correctly for TextField type="date"
    setCurrentData({ 
      ...data, 
      issue_date: formatDate(data.issue_date),
      expiry_date: formatDate(data.expiry_date)
    });
    setErrors({});
    setAddTaskOpen(true);
  };

  const handleEditData = (data: PassportData) => {
    setDialogMode('edit');
    // Ensure date fields are formatted correctly for TextField type="date"
    setCurrentData({ 
      ...data, 
      issue_date: formatDate(data.issue_date),
      expiry_date: formatDate(data.expiry_date)
    });
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
      setTableData(prevData => prevData.filter(data => data.passport_id !== id));
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
      title={<IntlMessages id="sidebar.hr02.08" defaultMessage="HR208 ข้อมูลหนังสือเดินทาง" />}   
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
            label="รหัสหนังสือเดินทาง"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.passport_id || ''}
            name="passport_id"
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
            label="วันที่ออกหนังสือเดินทาง"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.issue_date || ''}
            name="issue_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{ shrink: true }}
            error={!!errors.issue_date}
            helperText={errors.issue_date}
          />  
          <TextField
            fullWidth
            label="วันหมดอายุของหนังสือเดินทาง"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.expiry_date || ''}
            name="expiry_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{ shrink: true }}
            error={!!errors.expiry_date}
            helperText={errors.expiry_date}
          />
          <TextField
            fullWidth
            label="ไฟล์เอกสารสำเนาหนังสือเดินทาง"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.document_file || ''}
            name="document_file"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
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

export default Hr208;