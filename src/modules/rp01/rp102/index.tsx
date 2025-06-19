 //hr902/index.tsx
  'use client';
import React, { useState, useCallback } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppSelect from '@crema/components/AppSelect';
import Hr902Table from './Table'; // ตรวจสอบว่าชื่อไฟล์และ path ถูกต้อง
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';

// สำหรับ Export PDF
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// *** สำคัญมากสำหรับภาษาไทย ***
// ตรวจสอบให้แน่ใจว่าคุณได้ติดตั้งและตั้งค่า Font ภาษาไทยสำหรับ jspdf-autotable แล้ว
// เช่น ถ้าใช้ jspdf-autotable-font-loader:
// import 'jspdf-autotable-font-loader/font/THSarabunNew'; // ต้องมีไฟล์ font ใน node_modules หรือตั้งค่าการโหลดเอง
// หรือถ้าฝังเอง ต้อง import ตัวแปรที่เก็บ Base64 ของ Font

// สำหรับ Export Excel
import * as XLSX from 'xlsx';

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
  [key: string]: any; // เพื่อให้สามารถเข้าถึง key แบบ dynamic ได้สำหรับ jspdf-autotable
}

const initialAwardData: AwardData[] = [
  {
    award_id: 1,
    staff_id: 101,
    award_name: 'เหรียญทองดิเรกคุณาภรณ์',
    award_date: '2023-01-15',
    award_type: 'เหรียญ',
    announcement_details: 'ประกาศในราชกิจจานุเบกษา เล่ม 140 ตอน 21 ก',
    announcement_date: '2023-02-01',
    gazette_volume: '140',
    gazette_number: '21',
    gazette_section: 'ก',
    return_date: '',
    create_at: '2023-01-01',
    update_at: '2023-01-01',
    officer_id: 1,
    award_status: 'รับแล้ว',
  },
  {
    award_id: 2,
    staff_id: 102,
    award_name: 'เครื่องราชอิสริยาภรณ์อันเป็นที่เชิดชูยิ่งช้างเผือก ชั้น 5',
    award_date: '2022-05-20',
    award_type: 'ตริตาภรณ์ช้างเผือก',
    announcement_details: 'ประกาศในราชกิจจานุเบกษา เล่ม 139 ตอน 10 ข',
    announcement_date: '2022-06-01',
    gazette_volume: '139',
    gazette_number: '10',
    gazette_section: 'ข',
    return_date: '2024-01-01',
    create_at: '2022-04-01',
    update_at: '2022-04-01',
    officer_id: 2,
    award_status: 'รับแล้ว',
  },
  {
    award_id: 3,
    staff_id: 103,
    award_name: 'เหรียญจักรพรรดิมาลา',
    award_date: '2023-10-01',
    award_type: 'เหรียญ',
    announcement_details: 'ประกาศในราชกิจจานุเบกษา เล่ม 140 ตอน 35 ค',
    announcement_date: '2023-11-01',
    gazette_volume: '140',
    gazette_number: '35',
    gazette_section: 'ค',
    return_date: '',
    create_at: '2023-09-01',
    update_at: '2023-09-01',
    officer_id: 1,
    award_status: 'รอรับ',
  },
  {
    award_id: 4,
    staff_id: 104,
    award_name: 'เหรียญราชการชายแดน',
    award_date: '2023-07-01',
    award_type: 'เหรียญ',
    announcement_details: 'ประกาศในราชกิจจานุเบกษา เล่ม 140 ตอน 28 ง',
    announcement_date: '2023-08-01',
    gazette_volume: '140',
    gazette_number: '28',
    gazette_section: 'ง',
    return_date: '2024-03-01',
    create_at: '2023-06-01',
    update_at: '2023-06-01',
    officer_id: 3,
    award_status: 'ส่งคืนแล้ว',
  },
  {
    award_id: 5,
    staff_id: 105,
    award_name: 'เหรียญทองดิเรกคุณาภรณ์',
    award_date: '2024-01-01',
    award_type: 'เหรียญ',
    announcement_details: 'ประกาศในราชกิจจานุเบกษา เล่ม 141 ตอน 1 ก',
    announcement_date: '2024-02-01',
    gazette_volume: '141',
    gazette_number: '1',
    gazette_section: 'ก',
    return_date: '',
    create_at: '2023-12-01',
    update_at: '2023-12-01',
    officer_id: 1,
    award_status: 'รับแล้ว',
  },
];

const Hr902Page = () => {
  const { messages } = useIntl();
  const [tableData, setTableData] = useState<AwardData[]>(initialAwardData);
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'view' | 'edit'>('add');
  const [formData, setFormData] = useState<Partial<AwardData>>({}); // ใช้ Partial เพื่อรองรับ add (ยังไม่มี ID) และ edit

  // สรุปข้อมูลสำหรับ Dashboard
  const summaryData = React.useMemo(() => {
    const totalAwards = tableData.length;
    const received = tableData.filter(item => item.award_status === 'รับแล้ว').length;
    const pending = tableData.filter(item => item.award_status === 'รอรับ').length;
    const returned = tableData.filter(item => item.award_status === 'ส่งคืนแล้ว').length;

    return {
      totalAwards,
      received,
      pending,
      returned,
    };
  }, [tableData]);

  // Handle Add New Award
  const handleAddClick = () => {
    setDialogMode('add');
    setFormData({}); // Clear form data for new entry
    setOpen(true);
  };

  // Handle View Award
  const handleView = useCallback((data: AwardData) => {
    setDialogMode('view');
    setFormData(data);
    setOpen(true);
  }, []);

  // Handle Edit Award
  const handleEdit = useCallback((data: AwardData) => {
    setDialogMode('edit');
    setFormData(data);
    setOpen(true);
  }, []);

  // Handle Delete Award
  const handleDelete = useCallback((id: number) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณต้องการลบข้อมูลเครื่องราชอิสริยาภรณ์นี้ใช่หรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        setTableData(prevData => prevData.filter(item => item.award_id !== id));
        Swal.fire(
          'ลบแล้ว!',
          'ข้อมูลของคุณถูกลบเรียบร้อยแล้ว',
          'success'
        );
      }
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
    setFormData({}); // Clear form data on close
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (dialogMode === 'add') {
      const newId = Math.max(...tableData.map(item => item.award_id), 0) + 1;
      const newAward: AwardData = {
        ...formData,
        award_id: newId,
        create_at: new Date().toISOString().split('T')[0],
        update_at: new Date().toISOString().split('T')[0],
        officer_id: 999, // สมมติรหัสผู้บันทึก
        award_status: formData.award_status || 'รอรับ', // กำหนดค่าเริ่มต้นหากไม่ได้ระบุ
      } as AwardData;
      setTableData(prev => [...prev, newAward]);
      Swal.fire('เพิ่มข้อมูลสำเร็จ!', '', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prev => prev.map(item =>
        item.award_id === formData.award_id ? { ...item, ...formData, update_at: new Date().toISOString().split('T')[0] } : item
      ));
      Swal.fire('แก้ไขข้อมูลสำเร็จ!', '', 'success');
    }
    handleClose();
  };

  // Handle Copy Table Data
  const handleCopyTable = () => {
    let tableString = '';
    // Headers
    const headers = [
      'รหัส', 'ชื่อเครื่องราชอิสริยาภรณ์', 'วันที่ได้รับ', 'ประเภท', 'วันที่ประกาศ',
      'เล่มที่', 'ตอนที่', 'หน้า', 'สถานะ', 'สร้างเมื่อ', 'แก้ไขล่าสุด', 'รหัสผู้บันทึก', 'วันที่ส่งคืน'
    ];
    tableString += headers.join('\t') + '\n';

    // Data Rows
    tableData.forEach(row => {
      const rowValues = [
        row.award_id,
        row.award_name,
        row.award_date,
        row.award_type,
        row.announcement_date,
        row.gazette_volume,
        row.gazette_number,
        row.gazette_section,
        row.award_status,
        row.create_at,
        row.update_at,
        row.officer_id,
        row.return_date || '-', // จัดการค่าว่าง
      ];
      tableString += rowValues.join('\t') + '\n';
    });

    navigator.clipboard.writeText(tableString)
      .then(() => {
        Swal.fire('คัดลอกสำเร็จ!', 'ข้อมูลตารางถูกคัดลอกไปยังคลิปบอร์ดแล้ว', 'success');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        Swal.fire('คัดลอกไม่สำเร็จ!', 'ไม่สามารถคัดลอกข้อมูลตารางได้', 'error');
      });
  };

  // Handle Export to PDF
  const handleExportPdf = () => {
    const doc = new jsPDF();
    
    // *** สำคัญสำหรับภาษาไทย: ตั้งค่า Font ***
    // หากคุณใช้ jspdf-autotable-font-loader และได้ติดตั้ง Font THSarabunNew แล้ว
    // ให้ import 'jspdf-autotable-font-loader/font/THSarabunNew'; ที่ด้านบนสุดของไฟล์
    // แล้วเรียกใช้ doc.setFont('THSarabunNew'); ตรงนี้
    // doc.setFont('THSarabunNew'); // ยกเลิกคอมเมนต์บรรทัดนี้ถ้าคุณตั้งค่า Font เรียบร้อยแล้ว
    // doc.setR2L(false); // โดยทั่วไปไม่จำเป็นสำหรับภาษาไทย แต่ถ้ามีปัญหาลองใช้

    // กำหนดคอลัมน์สำหรับ PDF
    const columns = [
      { header: 'รหัส', dataKey: 'award_id' },
      { header: 'ชื่อเครื่องราชอิสริยาภรณ์', dataKey: 'award_name' },
      { header: 'วันที่ได้รับ', dataKey: 'award_date' },
      { header: 'ประเภท', dataKey: 'award_type' },
      { header: 'วันที่ประกาศ', dataKey: 'announcement_date' },
      { header: 'เล่มที่', dataKey: 'gazette_volume' },
      { header: 'ตอนที่', dataKey: 'gazette_number' },
      { header: 'หน้า', dataKey: 'gazette_section' },
      { header: 'สถานะ', dataKey: 'award_status' },
      { header: 'สร้างเมื่อ', dataKey: 'create_at' },
      { header: 'แก้ไขล่าสุด', dataKey: 'update_at' },
      { header: 'รหัสผู้บันทึก', dataKey: 'officer_id' },
      { header: 'วันที่ส่งคืน', dataKey: 'return_date' },
    ];

    // เตรียมข้อมูลแถวสำหรับ PDF
    const rows = tableData.map(row => ({
      award_id: row.award_id,
      award_name: row.award_name,
      award_date: row.award_date,
      award_type: row.award_type,
      announcement_date: row.announcement_date,
      gazette_volume: row.gazette_volume,
      gazette_number: row.gazette_number,
      gazette_section: row.gazette_section,
      award_status: row.award_status,
      create_at: row.create_at,
      update_at: row.update_at,
      officer_id: row.officer_id,
      return_date: row.return_date || '-', // จัดการค่าว่าง
    }));

    // ตั้งค่า AutoTable
    (doc as any).autoTable({
      head: [columns.map(col => col.header)],
      body: rows.map(row => columns.map(col => row[col.dataKey as keyof AwardData])), // แก้ไข Type Error ตรงนี้
      startY: 20,
      styles: {
        font: 'THSarabunNew', // ชี้ไปที่ชื่อ Font ที่คุณเพิ่มเข้าไปและตั้งค่าด้านบน
        fontSize: 8,
      },
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
      },
      columnStyles: {
        // สามารถกำหนดสไตล์สำหรับแต่ละคอลัมน์ได้ที่นี่
        // ตัวอย่าง: 'award_id': { cellWidth: 15 },
      },
      didDrawPage: (data: any) => { // เพิ่ม Header/Footer ถ้าต้องการ
        doc.text("ข้อมูลเครื่องราชอิสริยาภรณ์", data.settings.margin.left, 10);
      }
    });

    doc.save('ข้อมูลเครื่องราชอิสริยาภรณ์.pdf');
  };

  // Handle Export to Excel
  const handleExportExcel = () => {
    // เตรียมข้อมูลสำหรับ Excel
    const dataForExcel = tableData.map(row => ({
      'รหัส': row.award_id,
      'ชื่อเครื่องราชอิสริยาภรณ์': row.award_name,
      'วันที่ได้รับ': row.award_date,
      'ประเภท': row.award_type,
      'วันที่ประกาศ': row.announcement_date,
      'เล่มที่': row.gazette_volume,
      'ตอนที่': row.gazette_number,
      'หน้า': row.gazette_section,
      'สถานะ': row.award_status,
      'สร้างเมื่อ': row.create_at,
      'แก้ไขล่าสุด': row.update_at,
      'รหัสผู้บันทึก': row.officer_id,
      'วันที่ส่งคืน': row.return_date || '-', // จัดการค่าว่าง
    }));

    const ws = XLSX.utils.json_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "เครื่องราชอิสริยาภรณ์");
    XLSX.writeFile(wb, "ข้อมูลเครื่องราชอิสริยาภรณ์.xlsx");
  };

  const getDialogTitle = () => {
    if (dialogMode === 'add') return 'เพิ่มข้อมูลเครื่องราชอิสริยาภรณ์';
    if (dialogMode === 'view') return 'ดูรายละเอียดเครื่องราชอิสริยาภรณ์';
    if (dialogMode === 'edit') return 'แก้ไขข้อมูลเครื่องราชอิสริยาภรณ์';
    return '';
  };

  return (
    <AppsContent
      title={
        <IntlMessages id="sidebar.hr09.902" /> // อ้างอิง id ที่ถูกต้องสำหรับชื่อหน้า
      }
      sx={{
        mt: 2,
        height: 1,
      }}
    >
      <AppInfoView /> {/* แสดงข้อความแจ้งเตือน / โหลดข้อมูล */}

      {/* Dashboard/Summary Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <AppCard sx={{ minWidth: 200, flexGrow: 1 }}>
          <Box sx={{ fontSize: 16, color: 'text.secondary', mb: 1 }}>
            รวมเครื่องราชฯ ทั้งหมด
          </Box>
          <Box sx={{ fontSize: 24, fontWeight: 'bold' }}>
            {summaryData.totalAwards} รายการ
          </Box>
        </AppCard>
        <AppCard sx={{ minWidth: 200, flexGrow: 1 }}>
          <Box sx={{ fontSize: 16, color: 'text.secondary', mb: 1 }}>
            สถานะ: รับแล้ว
          </Box>
          <Box sx={{ fontSize: 24, fontWeight: 'bold', color: 'green' }}>
            {summaryData.received} รายการ
          </Box>
        </AppCard>
        <AppCard sx={{ minWidth: 200, flexGrow: 1 }}>
          <Box sx={{ fontSize: 16, color: 'text.secondary', mb: 1 }}>
            สถานะ: รอรับ
          </Box>
          <Box sx={{ fontSize: 24, fontWeight: 'bold', color: 'orange' }}>
            {summaryData.pending} รายการ
          </Box>
        </AppCard>
        <AppCard sx={{ minWidth: 200, flexGrow: 1 }}>
          <Box sx={{ fontSize: 16, color: 'text.secondary', mb: 1 }}>
            สถานะ: ส่งคืนแล้ว
          </Box>
          <Box sx={{ fontSize: 24, fontWeight: 'bold', color: 'red' }}>
            {summaryData.returned} รายการ
          </Box>
        </AppCard>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
       {/* 
       <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddClick}>
          เพิ่มข้อมูล
        </Button>
       */}
        <Button variant="outlined" onClick={handleCopyTable}>
          คัดลอกตาราง
        </Button>
        <Button variant="outlined" onClick={handleExportPdf}>
          ส่งออก PDF
        </Button>
        <Button variant="outlined" onClick={handleExportExcel}>
          ส่งออก Excel
        </Button>
      </Box>

      {/* Table Component */}
      <Hr902Table
        data={tableData}
        setTableData={setTableData}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Dialog for Add/View/Edit */}
      <AppDialog
        open={open}
        onClose={handleClose}
        title={getDialogTitle()}
        maxWidth="md"
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 3,
            p: 4
          }}
        >
          {dialogMode === 'view' ? (
            // View Mode Display
            <>
              <TextField label="รหัสเครื่องราชอิสริยาภรณ์" value={formData.award_id || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="รหัสเจ้าหน้าที่" value={formData.staff_id || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="ชื่อเครื่องราชอิสริยาภรณ์" value={formData.award_name || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="วันที่ได้รับ" value={formData.award_date || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="ประเภท" value={formData.award_type || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="รายละเอียดประกาศ" value={formData.announcement_details || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="วันที่ประกาศ" value={formData.announcement_date || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="เล่มที่" value={formData.gazette_volume || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="ตอนที่" value={formData.gazette_number || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="หน้า" value={formData.gazette_section || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="สถานะ" value={formData.award_status || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="สร้างเมื่อ" value={formData.create_at || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="แก้ไขล่าสุด" value={formData.update_at || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="รหัสผู้บันทึก" value={formData.officer_id || ''} InputProps={{ readOnly: true }} fullWidth />
              <TextField label="วันที่ส่งคืน" value={formData.return_date || '-'} InputProps={{ readOnly: true }} fullWidth />
            </>
          ) : (
            // Add/Edit Mode Form
            <>
          <TextField
            fullWidth
            label="รหัสประจำตัวบุคลากร"
            variant="outlined"
            margin="normal"
            size="small"
            value={formData.staff_id || ''}
            name="staff_id"
            type="number"
            onChange={handleFormChange}
          />
              <TextField
                name="award_name"
                label="ชื่อเครื่องราชอิสริยาภรณ์"
                value={formData.award_name || ''}
                onChange={handleFormChange}
                fullWidth
                required
              />
              <TextField
                name="award_date"
                label="วันที่ได้รับ"
                type="date"
                value={formData.award_date || ''}
                onChange={handleFormChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                name="award_type"
                label="ประเภท"
                value={formData.award_type || ''}
                onChange={handleFormChange}
                fullWidth
                required
              />
              <TextField
                name="announcement_details"
                label="รายละเอียดประกาศ"
                value={formData.announcement_details || ''}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                name="announcement_date"
                label="วันที่ประกาศ"
                type="date"
                value={formData.announcement_date || ''}
                onChange={handleFormChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                name="gazette_volume"
                label="เล่มที่"
                value={formData.gazette_volume || ''}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                name="gazette_number"
                label="ตอนที่"
                value={formData.gazette_number || ''}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                name="gazette_section"
                label="หน้า"
                value={formData.gazette_section || ''}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                select
                name="award_status"
                label="สถานะ"
                value={formData.award_status || 'รอรับ'}
                onChange={handleFormChange}
                fullWidth
                required
              >
                <MenuItem value="รับแล้ว">รับแล้ว</MenuItem>
                <MenuItem value="รอรับ">รอรับ</MenuItem>
                <MenuItem value="ส่งคืนแล้ว">ส่งคืนแล้ว</MenuItem>
              </TextField>
              {dialogMode === 'edit' && (
                <TextField
                  name="return_date"
                  label="วันที่ส่งคืน"
                  type="date"
                  value={formData.return_date || ''}
                  onChange={handleFormChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            </>
          )}
        </Box>
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            {dialogMode === 'view' ? 'ปิด' : 'ยกเลิก'}
          </Button>
          {dialogMode !== 'view' && (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {dialogMode === 'add' ? 'เพิ่ม' : 'บันทึก'}
            </Button>
          )}
        </Box>
      </AppDialog>
    </AppsContent>
  );
};

export default Hr902Page;
