 //hr902/index.tsx
'use client';
import React, { useState, useCallback, useMemo } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import Hr903Table from './Table'; // ตรวจสอบว่าชื่อไฟล์และ path ถูกต้อง
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';

// สำหรับ Export PDF
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// *** สำคัญมากสำหรับภาษาไทย: ตั้งค่า Font ***
// หากคุณใช้ jspdf-autotable-font-loader และได้ติดตั้ง Font THSarabunNew แล้ว
// import 'jspdf-autotable-font-loader/font/THSarabunNew'; // อย่าลืมติดตั้งและตั้งค่า Font

// สำหรับ Export Excel
import * as XLSX from 'xlsx';

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลเครื่องราชอิสริยาภรณ์ ---
// ควรจะดึงมาจากไฟล์กลาง หรือนิยามซ้ำหากยังไม่มีไฟล์กลาง
interface AwardData {
  award_id: number;
  staff_id: number; // เพิ่มเข้ามาสำหรับแสดงในรายละเอียด
  award_name: string;
  award_date: string;
  award_type: string;
  announcement_details: string;
  announcement_date: string;
  gazette_volume: string;
  gazette_number: string;
  gazette_section: string;
  return_date?: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  award_status: string;
  [key: string]: any;
}

// ข้อมูลเริ่มต้นที่ให้มาใหม่
const initialAwardRows: AwardData[] = [
  {
    award_id: 1,
    staff_id: 101,
    award_name: 'เครื่องราชอิสริยาภรณ์อันเป็นที่เชิดชูยิ่งช้างเผือก ชั้นที่ 1 ประถมาภรณ์ช้างเผือก (ป.ช.)',
    award_date: '2023-12-05',
    award_type: 'ประเภทข้าราชการ บัญชี 15 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ข้าราชการ ยกเว้นที่ปรากฏในบัญชีอื่น',
    announcement_details: 'ประกาศสำนักนายกรัฐมนตรี เรื่อง พระราชทานเครื่องราชอิสริยาภรณ์อันเป็นที่เชิดชูยิ่งช้างเผือกและมหาวชิรมงกุฎ ประจำปี ๒๕๖๖',
    announcement_date: '2024-01-20',
    gazette_volume: '141',
    gazette_number: '3 ข',
    gazette_section: 'หน้า 1',
    return_date: undefined, // ยังไม่ส่งคืน
    create_at: '2024-01-25',
    update_at: '2024-01-25',
    officer_id: 680001,
    award_status: 'ได้รับแล้ว',
  },
  {
    award_id: 2,
    staff_id: 102,
    award_name: 'เครื่องราชอิสริยาภรณ์อันมีเกียรติยศยิ่งมงกุฎไทย ชั้นที่ 5 เบญจมาภรณ์มงกุฎไทย (บ.ม.)',
    award_date: '2022-12-05',
    award_type: 'ประเภทพนักงานมหาวิทยาลัย บัญชี 29 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ผู้ดำรงตำแหน่งในสถาบันอุดมศึกษาของรัฐ ที่ไม่เป็นข้าราชการ',
    announcement_details: 'ประกาศสำนักนายกรัฐมนตรี เรื่อง พระราชทานเครื่องราชอิสริยาภรณ์อันเป็นที่เชิดชูยิ่งช้างเผือกและมหาวชิรมงกุฎ ประจำปี ๒๕๖๕',
    announcement_date: '2023-01-15',
    gazette_volume: '140',
    gazette_number: '2 ข',
    gazette_section: 'หน้า 5',
    return_date: undefined,
    create_at: '2023-01-20',
    update_at: '2023-01-20',
    officer_id: 680001,
    award_status: 'ได้รับแล้ว',
  },
  {
    award_id: 3,
    staff_id: 103,
    award_name: 'เหรียญจักรพรรดิมาลา (ร.จ.พ.)',
    award_date: '2023-05-10',
    award_type: 'ประเภทลูกจ้างประจำ บัญชี 25 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ลูกจ้างประจำของส่วนราชการ',
    announcement_details: 'ประกาศสำนักนายกรัฐมนตรี เรื่อง พระราชทานเหรียญจักรพรรดิมาลา',
    announcement_date: '2023-07-01',
    gazette_volume: '140',
    gazette_number: 'พิเศษ 100 ง',
    gazette_section: 'หน้า 2',
    return_date: undefined,
    create_at: '2023-07-05',
    update_at: '2023-07-05',
    officer_id: 2,
    award_status: 'ได้รับแล้ว',
  },
  {
    award_id: 4,
    staff_id: 104,
    award_name: 'เครื่องราชอิสริยาภรณ์อันเป็นที่เชิดชูยิ่งช้างเผือก ชั้นที่ 5 เบญจมาภรณ์ช้างเผือก (บ.ช.)',
    award_date: '2024-12-05',
    award_type: 'ประเภทพนักงานราชการ บัญชี 26 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่พนักงานราชการ',
    announcement_details: 'อยู่ระหว่างดำเนินการ',
    announcement_date: '2025-01-01',
    gazette_volume: '142',
    gazette_number: '1 ข',
    gazette_section: 'หน้า 10',
    return_date: undefined,
    create_at: '2024-12-10',
    update_at: '2024-12-10',
    officer_id: 3,
    award_status: 'อยู่ในระหว่างยื่นขอ',
  },
  {
    award_id: 5,
    staff_id: 105,
    award_name: 'เครื่องราชอิสริยาภรณ์อันมีเกียรติยศยิ่งมงกุฎไทย ชั้นที่ 4 จตุรถาภรณ์มงกุฎไทย (จ.ม.)',
    award_date: '2024-12-05',
    award_type: 'ประเภทพนักงานราชการ บัญชี 26 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่พนักงานราชการ',
    announcement_details: 'รอประกาศราชกิจจานุเบกษา',
    announcement_date: '2025-02-15',
    gazette_volume: '142',
    gazette_number: '2 ข',
    gazette_section: 'หน้า 3',
    return_date: undefined,
    create_at: '2024-12-12',
    update_at: '2024-12-12',
    officer_id: 4,
    award_status: 'รอประกาศราชกิจจานุเบกษา',
  },
  {
    award_id: 6,
    staff_id: 101,
    award_name: 'เหรียญรัตนาภรณ์ รัชกาลที่ ๙ ชั้นที่ ๔ (ร.ร.๙ ๔)',
    award_date: '2020-12-05',
    award_type: 'ประเภทพนักงานราชการ บัญชี 26 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่พนักงานราชการ',
    announcement_details: 'ประกาศสำนักนายกรัฐมนตรี เรื่อง พระราชทานเหรียญรัตนาภรณ์',
    announcement_date: '2021-01-10',
    gazette_volume: '138',
    gazette_number: '1 ข',
    gazette_section: 'หน้า 8',
    return_date: '2023-03-01', // ตัวอย่างการส่งคืน
    create_at: '2021-01-15',
    update_at: '2023-03-01',
    officer_id: 680001,
    award_status: 'ได้รับแล้ว',
  },
];

// ประเภทของ award_type ที่คุณระบุ
const predefinedAwardTypes = [
  'ประเภทข้าราชการ บัญชี 15 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ข้าราชการ ยกเว้นที่ปรากฏในบัญชีอื่น',
  'ประเภทพนักงานมหาวิทยาลัย บัญชี 29 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ผู้ดำรงตำแหน่งในสถาบันอุดมศึกษาของรัฐ ที่ไม่เป็นข้าราชการ',
  'ประเภทลูกจ้างประจำ บัญชี 25 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่ลูกจ้างประจำของส่วนราชการ',
  'ประเภทพนักงานราชการ บัญชี 26 การขอพระราชทานเครื่องราชอิสริยาภรณ์ให้แก่พนักงานราชการ' // เพิ่มจากข้อมูลที่ให้มาใหม่
];


const Hr903Page = () => {
  const { messages } = useIntl();
  const [awardData] = useState<AwardData[]>(initialAwardRows); // ไม่จำเป็นต้องใช้ setAwardData ถ้าข้อมูลไม่เปลี่ยน
  const [filterAwardType, setFilterAwardType] = useState<string>('');
  const [filterAwardName, setFilterAwardName] = useState<string>('');

  // สรุปข้อมูลสำหรับ Dashboard
  const summaryData = useMemo(() => {
    const totalAwards = awardData.length;
    const received = awardData.filter(item => item.award_status === 'ได้รับแล้ว').length;
    const pending = awardData.filter(item => item.award_status === 'อยู่ในระหว่างยื่นขอ' || item.award_status === 'รอประกาศราชกิจจานุเบกษา').length;
    const returned = awardData.filter(item => item.return_date !== undefined && item.return_date !== null && item.return_date !== '').length;

    return {
      totalAwards,
      received,
      pending,
      returned,
    };
  }, [awardData]);

  // ดึงรายการชื่อเครื่องราชฯ ที่ไม่ซ้ำกัน
  const uniqueAwardNames = useMemo(() => {
    const names = new Set<string>();
    awardData.forEach(item => names.add(item.award_name));
    return Array.from(names);
  }, [awardData]);

  // ฟังก์ชันสำหรับการดูรายละเอียด (ส่งไปให้ Hr903TableItem)
  const handleView = useCallback((data: AwardData) => {
    Swal.fire({
      title: 'รายละเอียดเครื่องราชอิสริยาภรณ์',
      html: `
        <p><strong>รหัสเครื่องราชฯ:</strong> ${data.award_id}</p>
        <p><strong>รหัสพนักงาน:</strong> ${data.staff_id}</p>
        <p><strong>ชื่อเครื่องราชฯ:</strong> ${data.award_name}</p>
        <p><strong>วันที่ได้รับ:</strong> ${data.award_date}</p>
        <p><strong>ประเภท:</strong> ${data.award_type}</p>
        <p><strong>สถานะ:</strong> ${data.award_status}</p>
        <p><strong>รายละเอียดประกาศ:</strong> ${data.announcement_details}</p>
        <p><strong>วันที่ประกาศ:</strong> ${data.announcement_date}</p>
        <p><strong>เล่มที่:</strong> ${data.gazette_volume}</p>
        <p><strong>ตอนที่:</strong> ${data.gazette_number}</p>
        <p><strong>หน้า:</strong> ${data.gazette_section}</p>
        <p><strong>วันที่ส่งคืน:</strong> ${data.return_date || '-'}</p>
        <p><strong>สร้างเมื่อ:</strong> ${data.create_at}</p>
        <p><strong>แก้ไขล่าสุด:</strong> ${data.update_at}</p>
        <p><strong>รหัสผู้บันทึก:</strong> ${data.officer_id}</p>
      `,
      icon: 'info',
      confirmButtonText: 'ปิด'
    });
  }, []);

  // กรองข้อมูลตามเงื่อนไข (award_type, award_name)
  const filteredData = useMemo(() => {
    let currentData = awardData;

    if (filterAwardType) {
      currentData = currentData.filter(item => item.award_type === filterAwardType);
    }

    if (filterAwardName) {
      currentData = currentData.filter(item => item.award_name === filterAwardName);
    }
    return currentData;
  }, [awardData, filterAwardType, filterAwardName]);

  // Handle Copy Table Data
  const handleCopyTable = () => {
    let tableString = '';
    // Headers
    const headers = [
      'รหัส', 'รหัสพนักงาน', 'ชื่อเครื่องราชอิสริยาภรณ์', 'วันที่ได้รับ', 'ประเภท', 'วันที่ประกาศ',
      'เล่มที่', 'ตอนที่', 'หน้า', 'สถานะ', 'สร้างเมื่อ', 'แก้ไขล่าสุด', 'รหัสผู้บันทึก', 'วันที่ส่งคืน'
    ];
    tableString += headers.join('\t') + '\n';

    // Data Rows
    filteredData.forEach(row => { // ใช้ filteredData
      const rowValues = [
        row.award_id,
        row.staff_id,
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
        row.return_date || '-',
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
    // doc.setFont('THSarabunNew'); // ยกเลิกคอมเมนต์บรรทัดนี้ถ้าคุณตั้งค่า Font เรียบร้อยแล้ว
    // doc.setR2L(false);

    const columns = [
      { header: 'รหัส', dataKey: 'award_id' },
      { header: 'รหัสพนักงาน', dataKey: 'staff_id' },
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

    const rows = filteredData.map(row => ({ // ใช้ filteredData
      award_id: row.award_id,
      staff_id: row.staff_id,
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
      return_date: row.return_date || '-',
    }));

    (doc as any).autoTable({
      head: [columns.map(col => col.header)],
      body: rows.map(row => columns.map(col => row[col.dataKey as keyof AwardData])),
      startY: 20,
      styles: {
        font: 'THSarabunNew', // ชี้ไปที่ชื่อ Font ที่คุณเพิ่มเข้าไป
        fontSize: 8,
      },
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
      },
      didDrawPage: (data: any) => {
        doc.text("รายงานข้อมูลเครื่องราชอิสริยาภรณ์", data.settings.margin.left, 10);
      }
    });

    doc.save('รายงานเครื่องราชอิสริยาภรณ์.pdf');
  };

  // Handle Export to Excel
  const handleExportExcel = () => {
    const dataForExcel = filteredData.map(row => ({ // ใช้ filteredData
      'รหัส': row.award_id,
      'รหัสพนักงาน': row.staff_id,
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
      'วันที่ส่งคืน': row.return_date || '-',
    }));

    const ws = XLSX.utils.json_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "รายงานเครื่องราชอิสริยาภรณ์");
    XLSX.writeFile(wb, "รายงานเครื่องราชอิสริยาภรณ์.xlsx");
  };

  return (
    <AppsContent
      title={
        <IntlMessages id="sidebar.hr09.903" /> // เปลี่ยน id เป็น 903
      }
      sx={{
        mt: 2,
        height: 1,
      }}
    >
      <AppInfoView />

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
            สถานะ: ได้รับแล้ว
          </Box>
          <Box sx={{ fontSize: 24, fontWeight: 'bold', color: 'green' }}>
            {summaryData.received} รายการ
          </Box>
        </AppCard>
        <AppCard sx={{ minWidth: 200, flexGrow: 1 }}>
          <Box sx={{ fontSize: 16, color: 'text.secondary', mb: 1 }}>
            สถานะ: อยู่ระหว่างดำเนินการ
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

      {/* Filter and Export Buttons */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {/* Filter by Award Type (Select) */}
          <TextField
            select
            label="ประเภทเครื่องราชฯ"
            value={filterAwardType}
            onChange={(e) => setFilterAwardType(e.target.value)}
            sx={{ minWidth: 350 }} // ปรับความกว้างให้รองรับข้อความยาว
          >
            <MenuItem value="">ทั้งหมด</MenuItem>
            {predefinedAwardTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          {/* Filter by Award Name (Select) */}
          <TextField
            select
            label="ชื่อเครื่องราชฯ"
            value={filterAwardName}
            onChange={(e) => setFilterAwardName(e.target.value)}
            sx={{ minWidth: 350 }} // ปรับความกว้างให้รองรับข้อความยาว
          >
            <MenuItem value="">ทั้งหมด</MenuItem>
            {uniqueAwardNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
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
      </Box>

      {/* Table Component */}
      <Hr903Table
        data={filteredData} // ส่งข้อมูลที่ผ่านการกรองไปให้ตาราง
        onView={handleView}
      />
    </AppsContent>
  );
};

export default Hr903Page;