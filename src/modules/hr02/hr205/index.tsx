// hr205/index.tsx
'use client';
import React from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import Table from './Table';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';


interface Data {
  name_change_id: number;
  staff_id?: number;
  previous_name?: string;
  change_date?: string; // DateTime @db.Date becomes string
  create_at?: string; // DateTime @db.Date becomes string
  update_at?: string; // DateTime @db.Date becomes string
  officer_id?: number; // Int in Prisma becomes number
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง (จาก INSERT statements)
const initialAllRows: Data[] = [
  {
    name_change_id: 1,
    staff_id: 1001,
    previous_name: 'สมหญิง ใจดี',
    change_date: '2020-05-15',
    create_at: '2025-05-26', // CURRENT_DATE
    update_at: '2025-05-26', // CURRENT_DATE
    officer_id: 1001
  },
  {
    name_change_id: 2,
    staff_id: 1002,
    previous_name: 'ประเสริฐ สุขศรี',
    change_date: '2019-11-20',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1002
  },
  {
    name_change_id: 3,
    staff_id: 1003,
    previous_name: 'ทวีป มังกรทอง',
    change_date: '2021-02-28',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1003
  },
  {
    name_change_id: 4,
    staff_id: 1004,
    previous_name: 'อรุณี ชัยวัฒน์',
    change_date: '2018-08-10',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1004
  },
  {
    name_change_id: 5,
    staff_id: 1005,
    previous_name: 'สมศักดิ์ แก้วประเสริฐ',
    change_date: '2022-01-05',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1005
  },
  {
    name_change_id: 6,
    staff_id: 1006,
    previous_name: 'บุญเลิศ เกียรติก้อง',
    change_date: '2020-07-22',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1006
  },
  {
    name_change_id: 7,
    staff_id: 1007,
    previous_name: 'สมหมาย วัฒนานนท์',
    change_date: '2021-09-30',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1007
  },
  {
    name_change_id: 8,
    staff_id: 1008,
    previous_name: 'เพชรา รุ่งเรือง',
    change_date: '2019-04-18',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1008
  },
  {
    name_change_id: 9,
    staff_id: 1009,
    previous_name: 'เกียรติศักดิ์ มหาชัย',
    change_date: '2022-03-12',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1009
  },
  {
    name_change_id: 10,
    staff_id: 1010,
    previous_name: 'สุธีร์ สุขใจ',
    change_date: '2021-12-01',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1010
  },
  {
    name_change_id: 11,
    staff_id: 1011,
    previous_name: 'วรรณา ศรีสมร',
    change_date: '2020-10-25',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1011
  },
  {
    name_change_id: 12,
    staff_id: 1012,
    previous_name: 'ศิริลักษณ์ จันทราวดี',
    change_date: '2022-06-15',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1012
  }
];


const Hr205 = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<Data | null>(null);
  const [tableData, setTableData] = React.useState<Data[]>(initialAllRows);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr02.05' }); // Assuming a new ID for HR205
    const words = label.split("HR205 ");
    return words.length > 1 ? words[1] : label; // Handle case if "HR205 " isn't found
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
      name_change_id: 0, // ID will be assigned on save
      staff_id: undefined,
      previous_name: '',
      change_date: '',
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
    if (currentData?.staff_id === undefined || currentData?.staff_id === null || currentData?.staff_id < 0) {
      newErrors.staff_id = 'กรุณากรอกรหัสบุคลากร';
    }
    if (!currentData?.previous_name) {
      newErrors.previous_name = 'กรุณากรอกชื่อ-สกุล (เดิม)';
    }
    if (!currentData?.change_date) {
      newErrors.change_date = 'กรุณากรอกวันที่เปลี่ยน';
    }
    if (currentData?.officer_id === undefined || currentData?.officer_id === null || currentData?.officer_id < 0) {
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.name_change_id)) + 1 : 1;
      const newData: Data = {
        ...currentData!,
        name_change_id: newId,
        create_at: new Date().toISOString().split('T')[0],
        update_at: new Date().toISOString().split('T')[0],
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.name_change_id === currentData!.name_change_id ? {
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
      setTableData(prevData => prevData.filter(data => data.name_change_id !== id));
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
      title={<IntlMessages id="sidebar.hr02.05" />}   
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
            label="รหัสประวัติ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.name_change_id || ''}
            name="name_change_id"
            onChange={handleInputChange}
            disabled={true} // ID is auto-generated or system-assigned
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
            label="ชื่อ-สกุล (เดิม)"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.previous_name || ''}
            name="previous_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.previous_name}
            helperText={errors.previous_name}
          />
          <TextField
            fullWidth
            label="วันที่เปลี่ยน"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.change_date || ''}
            name="change_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.change_date}
            helperText={errors.change_date}
            InputLabelProps={{
              shrink: true,
            }}
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

export default Hr205;