// hr209/index.tsx
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

interface WorkPermitData {
  work_permit_id: number;
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

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง WorkPermit
const initialAllRows: WorkPermitData[] = [
  {
    work_permit_id: 1, staff_id: 1001, issue_date: '2023-01-01', expiry_date: '2024-12-31', document_file: '/documents/work_permits/wp_001.pdf', create_at: '2023-01-05', update_at: '2023-06-10', officer_id: 1001
  },
  {
    work_permit_id: 2, staff_id: 1002, issue_date: '2022-03-15', expiry_date: '2024-03-14', document_file: '/documents/work_permits/wp_002.pdf', create_at: '2022-03-20', update_at: '2023-05-20', officer_id: 1002
  },
  {
    work_permit_id: 3, staff_id: 1003, issue_date: '2023-07-01', expiry_date: '2025-06-30', document_file: '/documents/work_permits/wp_003.pdf', create_at: '2023-07-05', update_at: '2024-01-15', officer_id: 1003
  },
  {
    work_permit_id: 4, staff_id: 1004, issue_date: '2021-09-10', expiry_date: '2024-09-09', document_file: '/documents/work_permits/wp_004.pdf', create_at: '2021-09-15', update_at: '2023-02-28', officer_id: 1004
  },
  {
    work_permit_id: 5, staff_id: 1005, issue_date: '2022-11-20', expiry_date: '2025-11-19', document_file: '/documents/work_permits/wp_005.pdf', create_at: '2022-11-25', update_at: '2023-04-10', officer_id: 1005
  },
  {
    work_permit_id: 6, staff_id: 1006, issue_date: '2023-02-01', expiry_date: '2025-01-31', document_file: '/documents/work_permits/wp_006.pdf', create_at: '2023-02-05', update_at: '2023-07-01', officer_id: 1006
  },
  {
    work_permit_id: 7, staff_id: 1007, issue_date: '2022-06-01', expiry_date: '2024-05-31', document_file: '/documents/work_permits/wp_007.pdf', create_at: '2022-06-05', update_at: '2023-03-01', officer_id: 1007
  },
  {
    work_permit_id: 8, staff_id: 1008, issue_date: '2021-12-01', expiry_date: '2024-11-30', document_file: '/documents/work_permits/wp_008.pdf', create_at: '2021-12-05', update_at: '2023-05-15', officer_id: 1008
  },
  {
    work_permit_id: 9, staff_id: 1009, issue_date: '2023-04-01', expiry_date: '2025-03-31', document_file: '/documents/work_permits/wp_009.pdf', create_at: '2023-04-05', update_at: '2023-08-20', officer_id: 1009
  },
  {
    work_permit_id: 10, staff_id: 1010, issue_date: '2022-08-01', expiry_date: '2025-07-31', document_file: '/documents/work_permits/wp_010.pdf', create_at: '2022-08-05', update_at: '2023-06-01', officer_id: 1010
  }
];

const Hr209 = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<WorkPermitData | null>(null);
  const [tableData, setTableData] = React.useState<WorkPermitData[]>(initialAllRows);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  const labeltext = () => {
    // ปรับปรุง ID ให้เป็น 'sidebar.hr02.09' และข้อความ
    const label = intl.formatMessage({ id: 'sidebar.hr02.09', defaultMessage: 'HR209 ข้อมูลใบอนุญาตทำงาน' });
    const words = label.split("HR209 ");
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
      work_permit_id: 0, // ID will be assigned on save
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
      newErrors.issue_date = 'กรุณากรอกวันที่อนุญาตทำงาน';
    }
    if (!currentData?.expiry_date) {
      newErrors.expiry_date = 'กรุณากรอกวันสิ้นสุดการอนุญาตทำงาน';
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.work_permit_id)) + 1 : 1;
      const newData: WorkPermitData = {
        ...currentData!,
        work_permit_id: newId,
        create_at: new Date().toISOString().split('T')[0],
        update_at: new Date().toISOString().split('T')[0],
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.work_permit_id === currentData!.work_permit_id ? {
            ...currentData!,
            update_at: new Date().toISOString().split('T')[0]
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: WorkPermitData) => {
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

  const handleEditData = (data: WorkPermitData) => {
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
      setTableData(prevData => prevData.filter(data => data.work_permit_id !== id));
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
      title={<IntlMessages id="sidebar.hr02.09" defaultMessage="HR209 ข้อมูลใบอนุญาตทำงาน" />}   
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
            label="รหัสใบอนุญาต"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.work_permit_id || ''}
            name="work_permit_id"
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
            label="วันที่อนุญาตทำงาน"
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
            label="วันสิ้นสุดการอนุญาตทำงาน"
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
            label="ไฟล์สำเนาใบอนุญาตทำงาน"
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

export default Hr209;