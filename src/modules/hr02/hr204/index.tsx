// hr204/index.tsx
'use client';
import React from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppSelect from '@crema/components/AppSelect'; // Keep if you decide to use for dropdowns
import Table from './Table';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';


interface Data {
  salary_id: number;
  staff_id?: number;
  salary_amount?: number; // Decimal in Prisma becomes number
  salary_account?: string;
  salary_detail?: string;
  position_id_academic?: number;
  academic_allowance?: number; // Decimal in Prisma becomes number
  position_id_management?: number;
  management_allowance?: number; // Decimal in Prisma becomes number
  effective_date?: string; // DateTime @db.Date becomes string
  end_date?: string; // DateTime @db.Date becomes string
  create_at?: string; // DateTime @db.Date becomes string
  update_at?: string; // DateTime @db.Date becomes string
  officer_id?: number; // Int in Prisma becomes number
  [key: string]: any;
}

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง (จาก INSERT statements)
const initialAllRows: Data[] = [
  {
    salary_id: 1,
    staff_id: 1001,
    salary_amount: 45000.00,
    salary_account: 'บัญชี ก.',
    salary_detail: 'ขั้น 4 ระดับ 3',
    position_id_academic: 201,
    academic_allowance: 8000.00,
    position_id_management: 301,
    management_allowance: 401.00, // Corrected from 401 to 401.00 for consistency
    effective_date: '2023-01-01',
    end_date: '2023-12-31',
    create_at: '2023-12-31',
    update_at: '2023-12-31',
    officer_id: 1001
  },
  {
    salary_id: 2,
    staff_id: 1002,
    salary_amount: 65000.00,
    salary_account: 'บัญชี ข.',
    salary_detail: 'ขั้น 6 ระดับ 4',
    position_id_academic: 202,
    academic_allowance: 12000.00,
    position_id_management: 302,
    management_allowance: 402.00,
    effective_date: '2023-03-15',
    end_date: '2023-12-31',
    create_at: '2023-12-31',
    update_at: '2023-12-31',
    officer_id: 1002
  },
  {
    salary_id: 3,
    staff_id: 1003,
    salary_amount: 75000.00,
    salary_account: 'บัญชี ค.',
    salary_detail: 'ขั้น 7 ระดับ 5',
    position_id_academic: 204,
    academic_allowance: 15000.00,
    position_id_management: 301,
    management_allowance: 403.00,
    effective_date: '2023-12-31',
    end_date: '2023-12-31',
    create_at: '2023-12-31',
    update_at: '2023-12-31',
    officer_id: 1003
  },
  {
    salary_id: 4,
    staff_id: 1004,
    salary_amount: 58000.00,
    salary_account: 'บัญชี ง.',
    salary_detail: 'ขั้น 5 ระดับ 4',
    position_id_academic: 203,
    academic_allowance: 10000.00,
    position_id_management: 302,
    management_allowance: 404.00,
    effective_date: '2023-04-10',
    end_date: '2023-12-31',
    create_at: '2023-12-31',
    update_at: '2023-12-31',
    officer_id: 1004
  },
  {
    salary_id: 5,
    staff_id: 1005,
    salary_amount: 32000.00,
    salary_account: 'บัญชี จ.',
    salary_detail: 'ขั้น 3 ระดับ 2',
    position_id_academic: 203, // Assuming 203 is a valid academic position ID
    academic_allowance: 5000.00,
    position_id_management: 302, // Assuming 302 is a valid management position ID
    management_allowance: 401.00,
    effective_date: '2023-05-20',
    end_date: '2023-12-31',
    create_at: '2023-12-31',
    update_at: '2023-12-31',
    officer_id: 1005
  },
  {
    salary_id: 6,
    staff_id: 1006,
    salary_amount: 85000.00,
    salary_account: 'บัญชี ฉ.',
    salary_detail: 'ขั้น 8 ระดับ 6',
    position_id_academic: 204,
    academic_allowance: 15000.00,
    position_id_management: 303,
    management_allowance: 402.00,
    effective_date: '2023-01-15',
    end_date: '2023-12-31',
    create_at: '2023-12-31',
    update_at: '2023-12-31',
    officer_id: 1006
  },
  {
    salary_id: 7,
    staff_id: 1007,
    salary_amount: 90000.00,
    salary_account: 'บัญชี ช.',
    salary_detail: 'ขั้น 9 ระดับ 7',
    position_id_academic: 204,
    academic_allowance: 3500.00,
    position_id_management: 303,
    management_allowance: 403.00,
    effective_date: '2023-06-01',
    end_date: '2023-12-31',
    create_at: '2023-12-31',
    update_at: '2023-12-31',
    officer_id: 1007
  },
  {
    salary_id: 8,
    staff_id: 1008,
    salary_amount: 38000.00,
    salary_account: 'บัญชี ซ.',
    salary_detail: 'ขั้น 4 ระดับ 2',
    position_id_academic: 205,
    academic_allowance: 5000.00,
    position_id_management: 305,
    management_allowance: 401.00,
    effective_date: '2023-07-15',
    end_date: '2023-12-31',
    create_at: '2023-12-31',
    update_at: '2023-12-31',
    officer_id: 1008
  },
  {
    salary_id: 9,
    staff_id: 1009,
    salary_amount: 70000.00,
    salary_account: 'บัญชี ญ.',
    salary_detail: 'ขั้น 7 ระดับ 5',
    position_id_academic: 204,
    academic_allowance: 5000.00,
    position_id_management: 304,
    management_allowance: 401.00,
    effective_date: '2023-03-01',
    end_date: '2023-12-31',
    create_at: '2023-12-31',
    update_at: '2023-12-31',
    officer_id: 1009
  },
  {
    salary_id: 10,
    staff_id: 1010,
    salary_amount: 50000.00,
    salary_account: 'บัญชี ฎ.',
    salary_detail: 'ขั้น 5 ระดับ 3',
    position_id_academic: 206,
    academic_allowance: 6000.00,
    position_id_management: 305,
    management_allowance: 402.00,
    effective_date: '2023-04-05',
    end_date: '2023-12-31',
    create_at: '2023-12-31',
    update_at: '2023-12-31',
    officer_id: 1010
  }
];


const Hr204 = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<Data | null>(null);
  const [tableData, setTableData] = React.useState<Data[]>(initialAllRows);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr02.04' }); // Assuming a new ID for HR204
    const words = label.split("HR204 ");
    return words.length > 1 ? words[1] : label; // Handle case if "HR204 " isn't found
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
      salary_id: 0, // ID will be assigned on save
      staff_id: undefined,
      salary_amount: undefined,
      salary_account: '',
      salary_detail: '',
      position_id_academic: undefined,
      academic_allowance: undefined,
      position_id_management: undefined,
      management_allowance: undefined,
      effective_date: '',
      end_date: '',
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
      if (['staff_id', 'salary_amount', 'position_id_academic', 'academic_allowance', 'position_id_management', 'management_allowance', 'officer_id'].includes(name)) {
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
    if (currentData?.salary_amount === undefined || currentData?.salary_amount === null || currentData?.salary_amount < 0) {
      newErrors.salary_amount = 'กรุณากรอกจำนวนเงินเดือน';
    }
    if (!currentData?.salary_account) {
      newErrors.salary_account = 'กรุณากรอกบัญชีอัตราเงินเดือน';
    }
    if (!currentData?.salary_detail) {
      newErrors.salary_detail = 'กรุณากรอกรายละเอียดขั้นเงินเดือน';
    }
    if (currentData?.position_id_academic === undefined || currentData?.position_id_academic === null || currentData?.position_id_academic < 0) {
      newErrors.position_id_academic = 'กรุณากรอกรหัสตำแหน่งวิชาการ';
    }
    if (currentData?.position_id_management === undefined || currentData?.position_id_management === null || currentData?.position_id_management < 0) {
      newErrors.position_id_management = 'กรุณากรอกรหัสตำแหน่งบริหาร';
    }
    if (currentData?.academic_allowance === undefined || currentData?.academic_allowance === null || currentData?.academic_allowance < 0) {
        newErrors.academic_allowance = 'เงินประจำตำแหน่งวิชาการต้องไม่ติดลบ';
    }
    if (currentData?.management_allowance === undefined || currentData?.management_allowance === null || currentData?.management_allowance < 0) {
        newErrors.management_allowance = 'เงินประจำตำแหน่งบริหารต้องไม่ติดลบ';
    }
    if (!currentData?.effective_date) {
      newErrors.effective_date = 'กรุณากรอกวันที่เริ่มมีผล';
    }
    // end_date can be null/undefined, so no strict validation
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.salary_id)) + 1 : 1;
      const newData: Data = {
        ...currentData!,
        salary_id: newId,
        create_at: new Date().toISOString().split('T')[0],
        update_at: new Date().toISOString().split('T')[0],
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.salary_id === currentData!.salary_id ? {
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
      setTableData(prevData => prevData.filter(data => data.salary_id !== id));
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
      title={<IntlMessages id="sidebar.hr02.04" />}   
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
            label="รหัสเงินเดือน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.salary_id || ''}
            name="salary_id"
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
            label="จำนวนเงินเดือน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.salary_amount || ''}
            name="salary_amount"
            type="number"
            inputProps={{ step: "0.01" }}
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.salary_amount}
            helperText={errors.salary_amount}
          />
          <TextField
            fullWidth
            label="บัญชีอัตราเงินเดือน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.salary_account || ''}
            name="salary_account"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.salary_account}
            helperText={errors.salary_account}
          />
          <TextField
            fullWidth
            label="รายละเอียดขั้นเงินเดือน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.salary_detail || ''}
            name="salary_detail"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.salary_detail}
            helperText={errors.salary_detail}
          />
          <TextField
            fullWidth
            label="รหัสตำแหน่งวิชาการ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.position_id_academic || ''}
            name="position_id_academic"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.position_id_academic}
            helperText={errors.position_id_academic}
          />
          <TextField
            fullWidth
            label="เงินประจำตำแหน่งวิชาการ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.academic_allowance || ''}
            name="academic_allowance"
            type="number"
            inputProps={{ step: "0.01" }}
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.academic_allowance}
            helperText={errors.academic_allowance}
          />
          <TextField
            fullWidth
            label="รหัสตำแหน่งบริหาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.position_id_management || ''}
            name="position_id_management"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.position_id_management}
            helperText={errors.position_id_management}
          />
          <TextField
            fullWidth
            label="เงินประจำตำแหน่งบริหาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.management_allowance || ''}
            name="management_allowance"
            type="number"
            inputProps={{ step: "0.01" }}
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.management_allowance}
            helperText={errors.management_allowance}
          />
          <TextField
            fullWidth
            label="วันที่เริ่มมีผล"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.effective_date || ''}
            name="effective_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.effective_date}
            helperText={errors.effective_date}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="วันที่สิ้นสุด"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.end_date || ''}
            name="end_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
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

export default Hr204;
