// hr206/index.tsx
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
  work_history_id: number;
  staff_id?: number;
  manpower_framework_id?: number;
  academic_position_id?: number;
  support_position_id?: number;
  management_position_id?: number;
  appointment_number?: string;
  appointment_date?: string; // DateTime @db.Date becomes string
  document_file?: string;
  work_status?: string;
  contract_number?: string;
  contract_start_date?: string; // DateTime @db.Date becomes string
  contract_end_date?: string; // DateTime @db.Date becomes string
  appointment_date_in?: string; // DateTime @db.Date becomes string
  start_work_date?: string; // DateTime @db.Date becomes string
  transfer_date?: string; // DateTime @db.Date becomes string
  retirement_date?: string; // DateTime @db.Date becomes string
  create_at?: string; // DateTime @db.Date becomes string
  update_at?: string; // DateTime @db.Date becomes string
  officer_id?: number; // Int in Prisma becomes number
  [key: string]: any;
}

// Helper to format date to YYYY-MM-DD or return empty string for '1900-01-01'
const formatDate = (dateString: string | undefined): string => {
    if (!dateString || dateString === '1900-01-01') {
        return '';
    }
    return dateString;
};

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง (จาก INSERT statements)
const initialAllRows: Data[] = [
  {
    work_history_id: 1,
    staff_id: 1001,
    manpower_framework_id: 1001,
    academic_position_id: 201,
    support_position_id: 301,
    management_position_id: 401,
    appointment_number: 'กพ123/2565',
    appointment_date: '2022-05-15',
    document_file: '/docs/appointments/101_2022.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข001',
    contract_start_date: '2022-05-16',
    contract_end_date: '2025-05-15',
    appointment_date_in: '2022-05-16',
    start_work_date: '2022-06-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: formatDate('1900-01-01'),
    create_at: '2022-05-16',
    update_at: '2023-01-15',
    officer_id: 1001
  },
  {
    work_history_id: 2,
    staff_id: 1002,
    manpower_framework_id: 1002,
    academic_position_id: 201,
    support_position_id: 301,
    management_position_id: 401,
    appointment_number: 'กพ124/2564',
    appointment_date: '2021-03-20',
    document_file: '/docs/appointments/102_2021.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข002',
    contract_start_date: '2021-03-21',
    contract_end_date: '2024-03-20',
    appointment_date_in: '2021-03-21',
    start_work_date: '2021-04-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: formatDate('1900-01-01'),
    create_at: '2021-03-21',
    update_at: '2023-02-10',
    officer_id: 1002
  },
  {
    work_history_id: 3,
    staff_id: 1003,
    manpower_framework_id: 1003,
    academic_position_id: 201,
    support_position_id: 301,
    management_position_id: 401,
    appointment_number: 'กพ125/2563',
    appointment_date: '2020-11-10',
    document_file: '/docs/appointments/103_2020.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข000',
    contract_start_date: '2020-11-11',
    contract_end_date: '2023-11-10',
    appointment_date_in: '2020-11-11',
    start_work_date: '2020-12-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: formatDate('1900-01-01'),
    create_at: '2020-11-11',
    update_at: '2023-03-05',
    officer_id: 1003
  },
  {
    work_history_id: 4,
    staff_id: 1004,
    manpower_framework_id: 1004,
    academic_position_id: 202,
    support_position_id: 301,
    management_position_id: 402,
    appointment_number: 'กพ126/2562',
    appointment_date: '2019-08-05',
    document_file: '/docs/appointments/104_2019.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข003',
    contract_start_date: '2019-08-06',
    contract_end_date: '2022-08-05',
    appointment_date_in: '2019-08-06',
    start_work_date: '2019-09-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: formatDate('1900-01-01'),
    create_at: '2019-08-06',
    update_at: '2023-01-20',
    officer_id: 1004
  },
  {
    work_history_id: 5,
    staff_id: 1005,
    manpower_framework_id: 1005,
    academic_position_id: 0,
    support_position_id: 302,
    management_position_id: 0,
    appointment_number: 'กพ127/2561',
    appointment_date: '2018-10-15',
    document_file: '/docs/appointments/105_2018.pdf',
    work_status: 'หมดสัญญาจ้าง',
    contract_number: 'สข004',
    contract_start_date: '2018-10-16',
    contract_end_date: '2021-10-15',
    appointment_date_in: '2018-10-16',
    start_work_date: '2018-11-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: '2021-10-15',
    create_at: '2018-10-16',
    update_at: '2021-10-16',
    officer_id: 1005
  },
  {
    work_history_id: 6,
    staff_id: 1006,
    manpower_framework_id: 1006,
    academic_position_id: 203,
    support_position_id: 302,
    management_position_id: 403,
    appointment_number: 'กพ128/2555',
    appointment_date: '2012-07-01',
    document_file: '/docs/appointments/106_2012.pdf',
    work_status: 'เกษียณ',
    contract_number: 'สข000',
    contract_start_date: '2012-07-02',
    contract_end_date: '2022-09-30',
    appointment_date_in: '2012-07-02',
    start_work_date: '2012-08-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: '2022-09-30',
    create_at: '2012-07-02',
    update_at: '2022-10-01',
    officer_id: 1006
  },
  {
    work_history_id: 7,
    staff_id: 1007,
    manpower_framework_id: 1007,
    academic_position_id: 203,
    support_position_id: 301,
    management_position_id: 402,
    appointment_number: 'กพ129/2560',
    appointment_date: '2017-04-10',
    document_file: '/docs/appointments/107_2017.pdf',
    work_status: 'ลาออก',
    contract_number: 'สข005',
    contract_start_date: '2017-04-11',
    contract_end_date: '2020-04-10',
    appointment_date_in: '2017-04-11',
    start_work_date: '2017-05-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: '2019-12-31',
    create_at: '2017-04-11',
    update_at: '2020-01-05',
    officer_id: 1007
  },
  {
    work_history_id: 8,
    staff_id: 1008,
    manpower_framework_id: 1008,
    academic_position_id: 203,
    support_position_id: 303,
    management_position_id: 403,
    appointment_number: 'กพ130/2563',
    appointment_date: '2020-09-25',
    document_file: '/docs/appointments/108_2020.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข000',
    contract_start_date: '2020-09-26',
    contract_end_date: '2023-09-25',
    appointment_date_in: '2020-09-26',
    start_work_date: '2020-10-01',
    transfer_date: '2020-09-26',
    retirement_date: formatDate('1900-01-01'),
    create_at: '2020-09-26',
    update_at: '2023-02-15',
    officer_id: 1008
  },
  {
    work_history_id: 9,
    staff_id: 1009,
    manpower_framework_id: 1009,
    academic_position_id: 204,
    support_position_id: 0,
    management_position_id: 0,
    appointment_number: 'กพ131/2564',
    appointment_date: '2021-06-15',
    document_file: '/docs/appointments/109_2021.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข006',
    contract_start_date: '2021-06-16',
    contract_end_date: '2022-06-15',
    appointment_date_in: '2021-06-16',
    start_work_date: '2021-07-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: formatDate('1900-01-01'),
    create_at: '2021-06-16',
    update_at: '2023-01-10',
    officer_id: 1009
  },
  {
    work_history_id: 10,
    staff_id: 1010,
    manpower_framework_id: 1010,
    academic_position_id: 202,
    support_position_id: 304,
    management_position_id: 401,
    appointment_number: 'กพ132/2565',
    appointment_date: '2022-02-28',
    document_file: '/docs/appointments/110_2022.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข007',
    contract_start_date: '2022-03-01',
    contract_end_date: '2023-02-28',
    appointment_date_in: '2022-03-01',
    start_work_date: '2022-03-15',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: formatDate('1900-01-01'),
    create_at: '2022-03-01',
    update_at: '2023-03-01',
    officer_id: 1010
  }
];


const Hr206 = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<Data | null>(null);
  const [tableData, setTableData] = React.useState<Data[]>(initialAllRows);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  const labeltext = () => {
    const label = intl.formatMessage({ id: 'sidebar.hr02.06' }); // Assuming a new ID for HR206
    const words = label.split("HR206 ");
    return words.length > 1 ? words[1] : label; // Handle case if "HR206 " isn't found
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
      work_history_id: 0, // ID will be assigned on save
      staff_id: undefined,
      manpower_framework_id: undefined,
      academic_position_id: undefined,
      support_position_id: undefined,
      management_position_id: undefined,
      appointment_number: '',
      appointment_date: '',
      document_file: '',
      work_status: '',
      contract_number: '',
      contract_start_date: '',
      contract_end_date: '',
      appointment_date_in: '',
      start_work_date: '',
      transfer_date: '',
      retirement_date: '',
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
      if (['staff_id', 'manpower_framework_id', 'academic_position_id', 'support_position_id', 'management_position_id', 'officer_id'].includes(name)) {
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
   
   if (!currentData?.manpower_framework_id) {
      newErrors.manpower_framework_id = 'กรุณากรอกรหัสกรอบอัตรากำลัง';
   }
   
   if (!currentData?.academic_position_id) {
      newErrors.academic_position_id = 'กรุณากรอกรหัสตำแหน่งทางวิชาการ';
   }
   if (!currentData?.support_position_id) {
      newErrors.support_position_id = 'กรุณากรอกรหัสตำแหน่งทางสายสนับสนุน';
   }
   if (!currentData?.management_position_id) {
      newErrors.management_position_id = 'กรุณากรอกรหัสตำแหน่งบริหาร';
   }
    if (!currentData?.appointment_number) { 
      newErrors.appointment_number = 'กรุณากรอกเลขที่คำสั่งแต่งตั้ง/บรรจุ';
    } 
    if (!currentData?.appointment_date) {
      newErrors.appointment_date = 'กรุณากรอกวันที่ออกคำสั่ง';
    } 
    
    if (!currentData?.document_file) {   
      newErrors.document_file = 'กรุณาอัพโหลดไฟล์เอกสารคำสั่ง';         
    }
    if (!currentData?.work_status) {
      newErrors.work_status = 'กรุณากรอกสถานภาพปฏิบัติงาน';
    }   
    if (!currentData?.contract_number) {
      newErrors.contract_number = 'กรุณากรอกเลขที่สัญญา';
    }  
    if (!currentData?.contract_start_date) {
      newErrors.contract_start_date = 'กรุณากรอกวันที่ทำสัญญา';
    }
    if (!currentData?.contract_end_date) {
      newErrors.contract_end_date = 'กรุณากรอกวันที่สิ้นสุดสัญญา';
    } 
    if (!currentData?.appointment_date_in) {
      newErrors.appointment_date_in = 'กรุณากรอกวันที่บรรจุ';
    } 
    if (!currentData?.start_work_date) {
      newErrors.start_work_date = 'กรุณากรอกวันที่เริ่มงาน';
    } 
    if (!currentData?.transfer_date) {
      newErrors.transfer_date = 'กรุณากรอกวันที่โอนย้ายมา';
    }
    if (!currentData?.retirement_date) {
      newErrors.retirement_date = 'กรุณากรอกวันที่เกษียณอายุ-ลาออก';
    }
    if (!currentData?.appointment_number) {
      newErrors.appointment_number = 'กรุณากรอกเลขที่คำสั่งแต่งตั้ง/บรรจุ';
    }
    if (!currentData?.appointment_date) {
      newErrors.appointment_date = 'กรุณากรอกวันที่ออกคำสั่ง';
    }
    if (!currentData?.work_status) {
      newErrors.work_status = 'กรุณากรอกสถานภาพปฏิบัติงาน';
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.work_history_id)) + 1 : 1;
      const newData: Data = {
        ...currentData!,
        work_history_id: newId,
        create_at: new Date().toISOString().split('T')[0],
        update_at: new Date().toISOString().split('T')[0],
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.work_history_id === currentData!.work_history_id ? {
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
      setTableData(prevData => prevData.filter(data => data.work_history_id !== id));
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
      title={<IntlMessages id="sidebar.hr02.06" />}   
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
            label="รหัสประวัติการทำงาน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.work_history_id || ''}
            name="work_history_id"
            onChange={handleInputChange}
            disabled={true} 
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
            label="รหัสกรอบอัตรากำลัง"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.manpower_framework_id || ''}
            name="manpower_framework_id"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.manpower_framework_id}
            helperText={errors.manpower_framework_id}
          />
          <TextField
            fullWidth
            label="รหัสตำแหน่งทางวิชาการ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.academic_position_id || ''}
            name="academic_position_id"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.academic_position_id}
            helperText={errors.academic_position_id}
          />
          <TextField
            fullWidth
            label="รหัสตำแหน่งทางสายสนับสนุน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.support_position_id || ''}
            name="support_position_id"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.support_position_id}
            helperText={errors.support_position_id}
          />
          <TextField
            fullWidth
            label="รหัสตำแหน่งบริหาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.management_position_id || ''}
            name="management_position_id"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.management_position_id}
            helperText={errors.management_position_id}
          />
          <TextField
            fullWidth
            label="เลขที่คำสั่งแต่งตั้ง/บรรจุ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.appointment_number || ''}
            name="appointment_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.appointment_number}
            helperText={errors.appointment_number}
          />
          <TextField
            fullWidth
            label="วันที่ออกคำสั่ง"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.appointment_date || ''}
            name="appointment_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.appointment_date}
            helperText={errors.appointment_date}
            InputLabelProps={{ shrink: true }}
          />  
          <TextField
            fullWidth
            label="แนบไฟล์เอกสารคำสั่ง"
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
            label="สถานภาพปฏิบัติงาน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.work_status || ''}
            name="work_status"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.work_status}
            helperText={errors.work_status}
          />
          <TextField
            fullWidth
            label="เลขที่สัญญา"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.contract_number || ''}
            name="contract_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.contract_number}
            helperText={errors.contract_number}
          />
          <TextField
            fullWidth
            label="วันที่ทำสัญญา"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.contract_start_date || ''}
            name="contract_start_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{ shrink: true }}
            error={!!errors.contract_start_date}
            helperText={errors.contract_start_date}
          />
          <TextField
            fullWidth
            label="วันที่สิ้นสุดสัญญา"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.contract_end_date || ''}
            name="contract_end_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{ shrink: true }}
            error={!!errors.contract_end_date}
            helperText={errors.contract_end_date}
          />
          <TextField
            fullWidth
            label="วันที่บรรจุ"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.appointment_date_in || ''}
            name="appointment_date_in"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{ shrink: true }}
            error={!!errors.appointment_date_in}
            helperText={errors.appointment_date_in}
          />
          <TextField
            fullWidth
            label="วันที่เริ่มงาน"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.start_work_date || ''}
            name="start_work_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{ shrink: true }}
            error={!!errors.start_work_date}
            helperText={errors.start_work_date}
          />
          <TextField
            fullWidth
            label="วันที่โอนย้ายมา"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.transfer_date || ''}
            name="transfer_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{ shrink: true }}
            error={!!errors.transfer_date}
            helperText={errors.transfer_date}
          />
          <TextField
            fullWidth
            label="วันที่เกษียณอายุ-ลาออก"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.retirement_date || ''}
            name="retirement_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{ shrink: true }}
            error={!!errors.retirement_date}
            helperText={errors.retirement_date}
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

export default Hr206;