// hr212/index.tsx
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
import Chip from '@mui/material/Chip'; // สำหรับแสดง document_path เป็นลิงก์

interface DocumentData {
  document_id: number;
  staff_id?: number;
  document_name?: string;
  document_type?: string;
  document_path?: string;
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

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง Document
const initialAllRows: DocumentData[] = [
  { document_id: 1, staff_id: 1001, document_name: 'สัญญาจ้างงานปี 2565', document_type: 'สัญญาจ้าง', document_path: '/documents/contracts/401_contract_2565.pdf', create_at: '2022-05-15', update_at: '2023-06-10', officer_id: 701 },
  { document_id: 2, staff_id: 1002, document_name: 'ใบประกาศนียบัตรปริญญาโท', document_type: 'หลักฐานการศึกษา', document_path: '/documents/certificates/402_master_degree.pdf', create_at: '2023-01-20', update_at: '2023-05-15', officer_id: 702 },
  { document_id: 3, staff_id: 1003, document_name: 'ผลการตรวจสุขภาพประจำปี 2566', document_type: 'เอกสารสุขภาพ', document_path: '/documents/health/403_health_check_2566.pdf', create_at: '2023-03-10', update_at: '2023-06-20', officer_id: 703 },
  { document_id: 4, staff_id: 1004, document_name: 'สำเนาทะเบียนบ้าน', document_type: 'เอกสารส่วนตัว', document_path: '/documents/personal/404_house_registration.pdf', create_at: '2022-11-05', update_at: '2023-04-18', officer_id: 701 },
  { document_id: 5, staff_id: 1005, document_name: 'ใบอนุญาตประกอบวิชาชีพวิศวกรรม', document_type: 'ใบอนุญาต', document_path: '/documents/licenses/405_engineering_license.pdf', create_at: '2023-02-28', update_at: '2023-06-25', officer_id: 702 },
  { document_id: 6, staff_id: 1006, document_name: 'สลิปเงินเดือน มิถุนายน 2566', document_type: 'เอกสารการเงิน', document_path: '/documents/finance/406_payroll_256606.pdf', create_at: '2023-06-05', update_at: '2023-06-30', officer_id: 703 },
  { document_id: 7, staff_id: 1007, document_name: 'ประวัติย่อ (CV) อัปเดต 2566', document_type: 'ประวัติส่วนตัว', document_path: '/documents/resumes/407_cv_2566.pdf', create_at: '2023-01-15', update_at: '2023-05-20', officer_id: 701 },
  { document_id: 8, staff_id: 1008, document_name: 'ใบรับรองการทำงานปี 2565', document_type: 'ใบรับรอง', document_path: '/documents/certificates/408_employment_cert_2565.pdf', create_at: '2022-12-20', update_at: '2023-06-15', officer_id: 702 },
  { document_id: 9, staff_id: 1009, document_name: 'สำเนาบัตรประชาชน', document_type: 'เอกสารประจำตัว', document_path: '/documents/identification/409_id_card.pdf', create_at: '2023-04-01', update_at: '2023-06-28', officer_id: 703 },
  { document_id: 10, staff_id: 1010, document_name: 'ผลประเมินงานประจำปี 2565', document_type: 'เอกสารประเมิน', document_path: '/documents/evaluations/410_performance_2565.pdf', create_at: '2022-10-10', update_at: '2023-05-30', officer_id: 701 }
];

const Hr212 = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<DocumentData | null>(null);
  const [tableData, setTableData] = React.useState<DocumentData[]>(initialAllRows);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  const labeltext = () => {
    // ปรับปรุง ID ให้เป็น 'sidebar.hr02.12' และข้อความ
    const label = intl.formatMessage({ id: 'sidebar.hr02.12', defaultMessage: 'HR212 ข้อมูลเอกสาร' });
    const words = label.split("HR212 ");
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
      document_id: 0, // ID will be assigned on save
      staff_id: undefined,
      document_name: '',
      document_type: '',
      document_path: '',
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
      if (name === 'staff_id' || name === 'officer_id') {
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
    if (!currentData?.document_name) {
      newErrors.document_name = 'กรุณากรอกชื่อเอกสาร';
    }
    if (!currentData?.document_type) {
      newErrors.document_type = 'กรุณากรอกประเภทเอกสาร';
    }
    if (!currentData?.document_path) {
      newErrors.document_path = 'กรุณากรอกที่อยู่ไฟล์เอกสาร';
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.document_id)) + 1 : 1;
      const newData: DocumentData = {
        ...currentData!,
        document_id: newId,
        create_at: new Date().toISOString().split('T')[0],
        update_at: new Date().toISOString().split('T')[0],
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.document_id === currentData!.document_id ? {
            ...currentData!,
            update_at: new Date().toISOString().split('T')[0]
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: DocumentData) => {
    setDialogMode('view');
    // Ensure date fields are formatted correctly for TextField type="date"
    setCurrentData({ 
      ...data, 
      create_at: formatDate(data.create_at),
      update_at: formatDate(data.update_at)
    });
    setErrors({});
    setAddTaskOpen(true);
  };

  const handleEditData = (data: DocumentData) => {
    setDialogMode('edit');
    // Ensure date fields are formatted correctly for TextField type="date"
    setCurrentData({ 
      ...data, 
      create_at: formatDate(data.create_at),
      update_at: formatDate(data.update_at)
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
      setTableData(prevData => prevData.filter(data => data.document_id !== id));
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
      title={<IntlMessages id="sidebar.hr02.12" defaultMessage="HR212 ข้อมูลเอกสาร" />}   
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
        maxWidth="lg"
        open={isAddTaskOpen}
        onClose={onCloseAddTask}
        title={dialogTitle}
      >
        <Box>
          <TextField
            label="รหัสเอกสาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.document_id || ''}
            name="document_id"
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
            label="ชื่อเอกสาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.document_name || ''}
            name="document_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.document_name}
            helperText={errors.document_name}
          />  
          <TextField
            fullWidth
            label="ประเภทเอกสาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.document_type || ''}
            name="document_type"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.document_type}
            helperText={errors.document_type}
          />
          <TextField
            fullWidth
            label="ที่อยู่ไฟล์เอกสาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.document_path || ''}
            name="document_path"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.document_path}
            helperText={errors.document_path}
          />
          <TextField
            fullWidth
            label="วันที่สร้างข้อมูล"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.create_at || ''}
            name="create_at"
            onChange={handleInputChange}
            disabled={true} // วันที่สร้างข้อมูลควรกำหนดอัตโนมัติ
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="วันที่ปรับปรุงข้อมูล"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.update_at || ''}
            name="update_at"
            onChange={handleInputChange}
            disabled={true} // วันที่ปรับปรุงข้อมูลควรกำหนดอัตโนมัติ
            InputLabelProps={{ shrink: true }}
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

export default Hr212;