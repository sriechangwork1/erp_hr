// hr210/index.tsx
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

interface SupportExpertiseData {
  expertise_id: number;
  staff_id?: number;
  expertise_name?: string;
  isced_code?: string;
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

// ข้อมูลจำลองเริ่มต้นสำหรับตาราง SupportExpertise
const initialAllRows: SupportExpertiseData[] = [
  { expertise_id: 1, staff_id: 201, expertise_name: 'การจัดการระบบเครือข่ายคอมพิวเตอร์', isced_code: '0613', create_at: '2023-01-10', update_at: '2023-06-15', officer_id: 501 },
  { expertise_id: 2, staff_id: 202, expertise_name: 'การบัญชีและการเงินองค์กร', isced_code: '0414', create_at: '2023-02-15', update_at: '2023-05-20', officer_id: 502 },
  { expertise_id: 3, staff_id: 203, expertise_name: 'การบริหารงานบุคคลและพัฒนาบุคลากร', isced_code: '0415', create_at: '2022-11-05', update_at: '2023-04-10', officer_id: 503 },
  { expertise_id: 4, staff_id: 204, expertise_name: 'การบริหารงานทั่วไปและเลขานุการ', isced_code: '0416', create_at: '2023-03-20', update_at: '2023-06-25', officer_id: 501 },
  { expertise_id: 5, staff_id: 205, expertise_name: 'กฎหมายแรงงานและกฎหมายองค์กร', isced_code: '0421', create_at: '2022-09-12', update_at: '2023-05-18', officer_id: 502 },
  { expertise_id: 6, staff_id: 206, expertise_name: 'การบริหารงานสารบรรณและเอกสาร', isced_code: '0417', create_at: '2023-04-05', update_at: '2023-06-30', officer_id: 503 },
  { expertise_id: 7, staff_id: 207, expertise_name: 'การประชาสัมพันธ์และสื่อสารองค์กร', isced_code: '0322', create_at: '2023-01-25', update_at: '2023-06-10', officer_id: 501 },
  { expertise_id: 8, staff_id: 208, expertise_name: 'การบริหารจัดการพัสดุและครุภัณฑ์', isced_code: '0418', create_at: '2022-12-10', update_at: '2023-05-15', officer_id: 502 },
  { expertise_id: 9, staff_id: 209, expertise_name: 'การจัดการอาคารและสถานที่', isced_code: '0732', create_at: '2023-02-28', update_at: '2023-06-20', officer_id: 503 },
  { expertise_id: 10, staff_id: 210, expertise_name: 'การสนับสนุนงานบริการวิชาการ', isced_code: '0914', create_at: '2023-03-15', update_at: '2023-06-28', officer_id: 501 }
];

const Hr210 = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<SupportExpertiseData | null>(null);
  const [tableData, setTableData] = React.useState<SupportExpertiseData[]>(initialAllRows);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const intl = useIntl();

  const labeltext = () => {
    // ปรับปรุง ID ให้เป็น 'sidebar.hr02.10' และข้อความ
    const label = intl.formatMessage({ id: 'sidebar.hr02.10', defaultMessage: 'HR210 ข้อมูลความเชี่ยวชาญในสายงานสนับสนุน' });
    const words = label.split("HR210 ");
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
      expertise_id: 0, // ID will be assigned on save
      staff_id: undefined,
      expertise_name: '',
      isced_code: '',
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
    if (!currentData?.expertise_name) {
      newErrors.expertise_name = 'กรุณากรอกชื่อความเชี่ยวชาญ';
    }
    // isced_code ไม่จำเป็นต้องมีข้อมูลเสมอไป
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
      const newId = tableData.length > 0 ? Math.max(...tableData.map(d => d.expertise_id)) + 1 : 1;
      const newData: SupportExpertiseData = {
        ...currentData!,
        expertise_id: newId,
        create_at: new Date().toISOString().split('T')[0],
        update_at: new Date().toISOString().split('T')[0],
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.expertise_id === currentData!.expertise_id ? {
            ...currentData!,
            update_at: new Date().toISOString().split('T')[0]
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: SupportExpertiseData) => {
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

  const handleEditData = (data: SupportExpertiseData) => {
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
      setTableData(prevData => prevData.filter(data => data.expertise_id !== id));
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
      title={<IntlMessages id="sidebar.hr02.10" defaultMessage="HR210 ข้อมูลความเชี่ยวชาญในสายงานสนับสนุน" />}   
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
            label="รหัสความเชี่ยวชาญ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.expertise_id || ''}
            name="expertise_id"
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
            label="ชื่อความเชี่ยวชาญในสายงาน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.expertise_name || ''}
            name="expertise_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.expertise_name}
            helperText={errors.expertise_name}
          />  
          <TextField
            fullWidth
            label="รหัสสาขางานที่เชี่ยวชาญ (ISCED)"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.isced_code || ''}
            name="isced_code"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
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

export default Hr210;