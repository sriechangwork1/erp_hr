//rp205/index.tsx
'use client';
import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import IntlMessagesMain from '@crema/helpers/IntlMessages';
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import Swal from 'sweetalert2';

// สำหรับ Export Excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; // จำเป็นต้องมีเพื่อให้ไฟล์ดาวน์โหลดได้

// สำหรับ Export PDF
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// หากต้องการใช้ Font ภาษาไทยใน PDF ต้องติดตั้งและตั้งค่า Font เพิ่มเติม
// ตัวอย่าง: npm install jspdf-autotable-font-loader
// import 'jspdf-autotable-font-loader/font/THSarabunNew'; // อย่าลืมติดตั้งและตั้งค่า Font จริงๆ

// --- จำลองคอมโพเนนต์จาก @crema (ถ้าคุณไม่ได้ติดตั้งไลบรารี @crema จริงๆ) ---
const AppCard: React.FC<{ children: React.ReactNode; title?: string; sx?: any }> = ({
  children,
  title,
  sx,
}) => (
  <Paper sx={{ p: 4, ...sx }}>
    {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
    {children}
  </Paper>
);
const AppsContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
);
const AppInfoView: React.FC = () => {
  return null; // จำลอง AppInfoView
};

const IntlMessages: React.FC<{ id: string; defaultMessage?: string }> = ({
  id,
  defaultMessage,
}) => <>{defaultMessage || id}</>;
const useIntl = () => ({
  messages: {
    common_search: 'ค้นหา',
    common_filter: 'ตัวกรอง',
    common_no_data: 'ไม่มีข้อมูลที่ตรงกับเงื่อนไข',
    table_rows_per_page: 'จำนวนแถวต่อหน้า:',
    year_all: 'ทั้งหมด',
    generate_report_button: 'สร้างรายงาน',
    export_excel_button: 'ส่งออกข้อมูลเป็น Excel',
    export_pdf_button: 'ส่งออกข้อมูลเป็น PDF',
    staff_education_title: 'ข้อมูลการศึกษาบุคลากร (UOC Staff Education)',
  },
});
// --- สิ้นสุดการจำลอง ---

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง DS2003_Staff_Education ---
interface StaffData {
  ds2003_id: number;
  academic_year: string;
  semester: string;
  univ_id: string;
  citizen_id: string;
  grad_year: string;
  grad_lev_id: string;
  grad_curr: string;
  grad_isced_id: string;
  grad_prog: string;
  grad_univ: string;
  grad_country_id: string;
}

// --- ข้อมูลจำลอง (Mock Data) สำหรับตาราง DS2003_Staff_Education ---
// ข้อมูลทั้งหมดจากไฟล์ _DS2003_Staff_Education__202506291012.json
// --- ข้อมูลจำลอง (Mock Data) สำหรับตาราง DS2003_Staff_Education ---
// ข้อมูลทั้งหมดจากไฟล์ _DS2003_Staff_Education__202506291012.json
// --- ข้อมูลจำลอง (Mock Data) สำหรับตาราง DS2003_Staff_Education ---
// ข้อมูลทั้งหมดจากไฟล์ _DS2003_Staff_Education__202506291012.json
const allStaffData: StaffData[] = [
  {
    "ds2003_id": 1,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100200355438",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "สถาปัตยกรรมศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การออกแบบชุมชนเมือง",
    "grad_univ": "มหาวิทยาลัยขอนแก่น",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 2,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100200355438",
    "grad_year": "2554",
    "grad_lev_id": "60",
    "grad_curr": "สถาปัตยกรรมศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การออกแบบชุมชนเมือง",
    "grad_univ": "มหาวิทยาลัยศิลปากร",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 3,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100200355438",
    "grad_year": "2561",
    "grad_lev_id": "70",
    "grad_curr": "สถาปัตยกรรมศาสตรดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การออกแบบชุมชนเมือง",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 4,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100400030588",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "การศึกษาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ฟิสิกส์",
    "grad_univ": "มหาวิทยาลัยศรีนครินทรวิโรฒ",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 5,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100400030588",
    "grad_year": "2541",
    "grad_lev_id": "60",
    "grad_curr": "ศึกษาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การวัดผลและประเมินผลการศึกษา",
    "grad_univ": "มหาวิทยาลัยศรีนครินทรวิโรฒ",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 6,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100400030588",
    "grad_year": "2545",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การวัดผลและประเมินผลการศึกษา",
    "grad_univ": "มหาวิทยาลัยศรีนครินทรวิโรฒ",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 7,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700010071",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "บริหารธุรกิจบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การจัดการ",
    "grad_univ": "มหาวิทยาลัยรามคำแหง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 8,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700010071",
    "grad_year": "2544",
    "grad_lev_id": "60",
    "grad_curr": "บริหารธุรกิจมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การจัดการ",
    "grad_univ": "มหาวิทยาลัยรามคำแหง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 9,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700010071",
    "grad_year": "2552",
    "grad_lev_id": "70",
    "grad_curr": "บริหารธุรกิจดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การจัดการ",
    "grad_univ": "มหาวิทยาลัยรามคำแหง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 10,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700021319",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "บริหารธุรกิจบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การตลาด",
    "grad_univ": "มหาวิทยาลัยรามคำแหง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 11,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700021319",
    "grad_year": "2547",
    "grad_lev_id": "60",
    "grad_curr": "บริหารธุรกิจมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การตลาด",
    "grad_univ": "มหาวิทยาลัยรามคำแหง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 12,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700021319",
    "grad_year": "2554",
    "grad_lev_id": "70",
    "grad_curr": "บริหารธุรกิจดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การตลาด",
    "grad_univ": "มหาวิทยาลัยรามคำแหง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 13,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700057088",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "รัฐประศาสนศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การบริหารจัดการ",
    "grad_univ": "มหาวิทยาลัยราชภัฏสวนดุสิต",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 14,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700057088",
    "grad_year": "2550",
    "grad_lev_id": "60",
    "grad_curr": "รัฐประศาสนศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การบริหารจัดการ",
    "grad_univ": "มหาวิทยาลัยราชภัฏสวนดุสิต",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 15,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700057088",
    "grad_year": "2556",
    "grad_lev_id": "70",
    "grad_curr": "รัฐประศาสนศาสตรดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การบริหารจัดการ",
    "grad_univ": "มหาวิทยาลัยราชภัฏสวนดุสิต",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 16,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700078028",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิทยาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "คณิตศาสตร์",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 17,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700078028",
    "grad_year": "2548",
    "grad_lev_id": "60",
    "grad_curr": "วิทยาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "สถิติ",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 18,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700078028",
    "grad_year": "2555",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "สถิติ",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 19,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700095811",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "บริหารธุรกิจบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การจัดการ",
    "grad_univ": "มหาวิทยาลัยรามคำแหง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 20,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700095811",
    "grad_year": "2549",
    "grad_lev_id": "60",
    "grad_curr": "บริหารธุรกิจมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การจัดการ",
    "grad_univ": "มหาวิทยาลัยรามคำแหง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 21,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700095811",
    "grad_year": "2557",
    "grad_lev_id": "70",
    "grad_curr": "บริหารธุรกิจดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การจัดการ",
    "grad_univ": "มหาวิทยาลัยรามคำแหง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 22,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700140261",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "บริหารธุรกิจบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การจัดการ",
    "grad_univ": "มหาวิทยาลัยรามคำแหง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 23,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700140261",
    "grad_year": "2549",
    "grad_lev_id": "60",
    "grad_curr": "บริหารธุรกิจมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การจัดการ",
    "grad_univ": "มหาวิทยาลัยรามคำแหง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 24,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100700140261",
    "grad_year": "2557",
    "grad_lev_id": "70",
    "grad_curr": "บริหารธุรกิจดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "การจัดการ",
    "grad_univ": "มหาวิทยาลัยรามคำแหง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 25,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800040510",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิทยาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิทยาการคอมพิวเตอร์",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 26,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800040510",
    "grad_year": "2545",
    "grad_lev_id": "60",
    "grad_curr": "วิทยาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิทยาการคอมพิวเตอร์",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 27,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800040510",
    "grad_year": "2550",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิทยาการคอมพิวเตอร์",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 28,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800041133",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิทยาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิทยาการคอมพิวเตอร์",
    "grad_univ": "มหาวิทยาลัยมหิดล",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 29,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800041133",
    "grad_year": "2548",
    "grad_lev_id": "60",
    "grad_curr": "วิทยาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิทยาการคอมพิวเตอร์",
    "grad_univ": "มหาวิทยาลัยมหิดล",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 30,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800041133",
    "grad_year": "2554",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิทยาการคอมพิวเตอร์",
    "grad_univ": "มหาวิทยาลัยมหิดล",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 31,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800055418",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิทยาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ชีววิทยา",
    "grad_univ": "มหาวิทยาลัยขอนแก่น",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 32,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800055418",
    "grad_year": "2549",
    "grad_lev_id": "60",
    "grad_curr": "วิทยาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ชีววิทยา",
    "grad_univ": "มหาวิทยาลัยขอนแก่น",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 33,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800055418",
    "grad_year": "2556",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ชีววิทยา",
    "grad_univ": "มหาวิทยาลัยขอนแก่น",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 34,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800062886",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิทยาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "เคมี",
    "grad_univ": "มหาวิทยาลัยเชียงใหม่",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 35,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800062886",
    "grad_year": "2547",
    "grad_lev_id": "60",
    "grad_curr": "วิทยาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "เคมี",
    "grad_univ": "มหาวิทยาลัยเชียงใหม่",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 36,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800062886",
    "grad_year": "2553",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "เคมี",
    "grad_univ": "มหาวิทยาลัยเชียงใหม่",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 37,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800072898",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิทยาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ฟิสิกส์",
    "grad_univ": "มหาวิทยาลัยบูรพา",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 38,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800072898",
    "grad_year": "2546",
    "grad_lev_id": "60",
    "grad_curr": "วิทยาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ฟิสิกส์",
    "grad_univ": "มหาวิทยาลัยบูรพา",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 39,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800072898",
    "grad_year": "2552",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ฟิสิกส์",
    "grad_univ": "มหาวิทยาลัยบูรพา",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 40,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800078028",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิทยาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "สถิติ",
    "grad_univ": "มหาวิทยาลัยธรรมศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 41,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800078028",
    "grad_year": "2545",
    "grad_lev_id": "60",
    "grad_curr": "วิทยาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "สถิติ",
    "grad_univ": "มหาวิทยาลัยธรรมศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 42,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800078028",
    "grad_year": "2551",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "สถิติ",
    "grad_univ": "มหาวิทยาลัยธรรมศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 43,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800099881",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิทยาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "เทคโนโลยีสารสนเทศ",
    "grad_univ": "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 44,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800099881",
    "grad_year": "2546",
    "grad_lev_id": "60",
    "grad_curr": "วิทยาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "เทคโนโลยีสารสนเทศ",
    "grad_univ": "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 45,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800099881",
    "grad_year": "2552",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "เทคโนโลยีสารสนเทศ",
    "grad_univ": "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 46,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800100222",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิทยาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ชีววิทยา",
    "grad_univ": "มหาวิทยาลัยมหิดล",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 47,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800100222",
    "grad_year": "2548",
    "grad_lev_id": "60",
    "grad_curr": "วิทยาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ชีววิทยา",
    "grad_univ": "มหาวิทยาลัยมหิดล",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 48,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800100222",
    "grad_year": "2554",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ชีววิทยา",
    "grad_univ": "มหาวิทยาลัยมหิดล",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 49,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800121008",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิทยาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "สถิติประยุกต์",
    "grad_univ": "สถาบันบัณฑิตพัฒนบริหารศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 50,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800121008",
    "grad_year": "2547",
    "grad_lev_id": "60",
    "grad_curr": "วิทยาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "สถิติประยุกต์",
    "grad_univ": "สถาบันบัณฑิตพัฒนบริหารศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 51,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1100800121008",
    "grad_year": "2553",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "สถิติประยุกต์",
    "grad_univ": "สถาบันบัณฑิตพัฒนบริหารศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 52,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101000102558",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "นิติศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "กฎหมาย",
    "grad_univ": "มหาวิทยาลัยธรรมศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 53,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101000102558",
    "grad_year": "2549",
    "grad_lev_id": "60",
    "grad_curr": "นิติศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "กฎหมาย",
    "grad_univ": "มหาวิทยาลัยธรรมศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 54,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101000102558",
    "grad_year": "2556",
    "grad_lev_id": "70",
    "grad_curr": "นิติศาสตรดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "กฎหมาย",
    "grad_univ": "มหาวิทยาลัยธรรมศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 55,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101000102558",
    "grad_year": "2561",
    "grad_lev_id": "80",
    "grad_curr": "ประกาศนียบัตร",
    "grad_isced_id": "-----------",
    "grad_prog": "เนติบัณฑิต",
    "grad_univ": "สำนักอบรมศึกษากฎหมายแห่งเนติบัณฑิตยสภา",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 56,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200000880",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "ศิลปศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาไทย",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 57,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200000880",
    "grad_year": "2545",
    "grad_lev_id": "60",
    "grad_curr": "ศิลปศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาไทย",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 58,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200000880",
    "grad_year": "2551",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาไทย",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 59,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200005545",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "อักษรศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาอังกฤษ",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 60,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200005545",
    "grad_year": "2548",
    "grad_lev_id": "60",
    "grad_curr": "อักษรศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาอังกฤษ",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 61,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200005545",
    "grad_year": "2554",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาอังกฤษ",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 62,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200008080",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "ศึกษาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาไทย",
    "grad_univ": "มหาวิทยาลัยศรีนครินทรวิโรฒ",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 63,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200008080",
    "grad_year": "2547",
    "grad_lev_id": "60",
    "grad_curr": "ศึกษาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาไทย",
    "grad_univ": "มหาวิทยาลัยศรีนครินทรวิโรฒ",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 64,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200008080",
    "grad_year": "2553",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาไทย",
    "grad_univ": "มหาวิทยาลัยศรีนครินทรวิโรฒ",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 65,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200010070",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "ครุศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาอังกฤษ",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 66,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200010070",
    "grad_year": "2546",
    "grad_lev_id": "60",
    "grad_curr": "ครุศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาอังกฤษ",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 67,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200010070",
    "grad_year": "2552",
    "grad_lev_id": "70",
    "grad_curr": "ครุศาสตรดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาอังกฤษ",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 68,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200021318",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "ศิลปศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาอังกฤษ",
    "grad_univ": "มหาวิทยาลัยธรรมศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 69,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200021318",
    "grad_year": "2549",
    "grad_lev_id": "60",
    "grad_curr": "ศิลปศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาอังกฤษ",
    "grad_univ": "มหาวิทยาลัยธรรมศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 70,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101200021318",
    "grad_year": "2555",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "ภาษาอังกฤษ",
    "grad_univ": "มหาวิทยาลัยธรรมศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 71,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300000880",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิศวกรรมศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมคอมพิวเตอร์",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 72,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300000880",
    "grad_year": "2548",
    "grad_lev_id": "60",
    "grad_curr": "วิศวกรรมศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมคอมพิวเตอร์",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 73,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300000880",
    "grad_year": "2554",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมคอมพิวเตอร์",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 74,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300010070",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิศวกรรมศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมไฟฟ้า",
    "grad_univ": "มหาวิทยาลัยขอนแก่น",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 75,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300010070",
    "grad_year": "2547",
    "grad_lev_id": "60",
    "grad_curr": "วิศวกรรมศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมไฟฟ้า",
    "grad_univ": "มหาวิทยาลัยขอนแก่น",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 76,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300010070",
    "grad_year": "2553",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมไฟฟ้า",
    "grad_univ": "มหาวิทยาลัยขอนแก่น",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 77,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300021318",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิศวกรรมศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมโยธา",
    "grad_univ": "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 78,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300021318",
    "grad_year": "2549",
    "grad_lev_id": "60",
    "grad_curr": "วิศวกรรมศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมโยธา",
    "grad_univ": "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 79,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300021318",
    "grad_year": "2555",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมโยธา",
    "grad_univ": "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 80,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300040510",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิศวกรรมศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมเครื่องกล",
    "grad_univ": "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 81,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300040510",
    "grad_year": "2548",
    "grad_lev_id": "60",
    "grad_curr": "วิศวกรรมศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมเครื่องกล",
    "grad_univ": "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 82,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300040510",
    "grad_year": "2554",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมเครื่องกล",
    "grad_univ": "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 83,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300041133",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิศวกรรมศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมอุตสาหการ",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 84,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300041133",
    "grad_year": "2547",
    "grad_lev_id": "60",
    "grad_curr": "วิศวกรรมศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมอุตสาหการ",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 85,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300041133",
    "grad_year": "2553",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมอุตสาหการ",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 86,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300055418",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิศวกรรมศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมเคมี",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 87,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300055418",
    "grad_year": "2549",
    "grad_lev_id": "60",
    "grad_curr": "วิศวกรรมศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมเคมี",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 88,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300055418",
    "grad_year": "2555",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมเคมี",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 89,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300062886",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิศวกรรมศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมสิ่งแวดล้อม",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 90,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300062886",
    "grad_year": "2548",
    "grad_lev_id": "60",
    "grad_curr": "วิศวกรรมศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมสิ่งแวดล้อม",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 91,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300062886",
    "grad_year": "2554",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิศวกรรมสิ่งแวดล้อม",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 92,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300072898",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิทยาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "เทคโนโลยีชีวภาพ",
    "grad_univ": "มหาวิทยาลัยมหิดล",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 93,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300072898",
    "grad_year": "2547",
    "grad_lev_id": "60",
    "grad_curr": "วิทยาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "เทคโนโลยีชีวภาพ",
    "grad_univ": "มหาวิทยาลัยมหิดล",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 94,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300072898",
    "grad_year": "2553",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "เทคโนโลยีชีวภาพ",
    "grad_univ": "มหาวิทยาลัยมหิดล",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 95,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300078028",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิทยาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "เทคโนโลยีชีวภาพ",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 96,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300078028",
    "grad_year": "2549",
    "grad_lev_id": "60",
    "grad_curr": "วิทยาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "เทคโนโลยีชีวภาพ",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 97,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300078028",
    "grad_year": "2555",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "เทคโนโลยีชีวภาพ",
    "grad_univ": "จุฬาลงกรณ์มหาวิทยาลัย",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 98,
    "academic_year": "2568", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300099881",
    "grad_year": "0000",
    "grad_lev_id": "40",
    "grad_curr": "วิทยาศาสตรบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิทยาศาสตร์สิ่งแวดล้อม",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 99,
    "academic_year": "2566", // เปลี่ยนจาก 2567
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300099881",
    "grad_year": "2546",
    "grad_lev_id": "60",
    "grad_curr": "วิทยาศาสตรมหาบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิทยาศาสตร์สิ่งแวดล้อม",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  },
  {
    "ds2003_id": 100,
    "academic_year": "2567",
    "semester": "2",
    "univ_id": "02600",
    "citizen_id": "1101300099881",
    "grad_year": "2552",
    "grad_lev_id": "70",
    "grad_curr": "ปรัชญาดุษฎีบัณฑิต",
    "grad_isced_id": "-----------",
    "grad_prog": "วิทยาศาสตร์สิ่งแวดล้อม",
    "grad_univ": "มหาวิทยาลัยเกษตรศาสตร์",
    "grad_country_id": "TH"
  }
];

// Helper function to format academic year for display
const formatAcademicYear = (year: string) => {
  if (year === '0000') {
    return 'ไม่ระบุ';
  }
  return year;
};

// --- คอมโพเนนต์ตารางสำหรับแสดงข้อมูลบุคลากร ---
interface StaffTableProps {
  data: StaffData[];
}

const StaffTable: React.FC<StaffTableProps> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { messages } = useIntl();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 50 }}>รหัส</TableCell>
              <TableCell style={{ minWidth: 100 }}>ปีการศึกษา</TableCell>
              <TableCell style={{ minWidth: 80 }}>ภาคเรียน</TableCell>
              <TableCell style={{ minWidth: 200 }}>วุฒิการศึกษา</TableCell>
              <TableCell style={{ minWidth: 250 }}>สถาบัน</TableCell>
              <TableCell style={{ minWidth: 100 }}>ปีที่สำเร็จ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.ds2003_id}>
                  <TableCell>{row.ds2003_id}</TableCell>
                  <TableCell>{formatAcademicYear(row.academic_year)}</TableCell>
                  <TableCell>{row.semester}</TableCell>
                  <TableCell>{row.grad_curr || '-'}</TableCell>
                  <TableCell>{row.grad_univ || '-'}</TableCell>
                  <TableCell>{formatAcademicYear(row.grad_year)}</TableCell>
                </TableRow>
              ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {messages['common_no_data']}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={messages['table_rows_per_page']}
      />
    </Paper>
  );
};

const StaffPage: React.FC = () => {
  const [academicYear, setAcademicYear] = useState<string>('ทั้งหมด');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<StaffData[]>(allStaffData);
  const { messages } = useIntl();

  const academicYears = Array.from(new Set(allStaffData.map(data => data.academic_year))).sort();

  const handleAcademicYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAcademicYear(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filterData = useCallback(() => {
    let currentData = allStaffData;

    if (academicYear !== 'ทั้งหมด') {
      currentData = currentData.filter(data => data.academic_year === academicYear);
    }

    if (searchTerm) {
      currentData = currentData.filter(data =>
        Object.values(data).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    setFilteredData(currentData);
  }, [academicYear, searchTerm]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  const handleGenerateReport = () => {
    Swal.fire({
      title: 'สร้างรายงาน',
      text: 'ฟังก์ชันสร้างรายงานจะถูกเรียกใช้',
      icon: 'info',
      confirmButtonText: 'ตกลง'
    });
    // Implement report generation logic here
  };

  const handleExportExcel = () => {
    const dataToExport = filteredData.map(item => ({
      'รหัส': item.ds2003_id,
      'ปีการศึกษา': formatAcademicYear(item.academic_year),
      'ภาคเรียน': item.semester,
      'วุฒิการศึกษา': item.grad_curr,
      'สถาบัน': item.grad_univ,
      'ปีที่สำเร็จ': formatAcademicYear(item.grad_year),
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Staff Education Data");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'staff_education_data.xlsx');
    Swal.fire({
      title: 'ส่งออก Excel',
      text: 'ส่งออกข้อมูลเป็น Excel เรียบร้อยแล้ว',
      icon: 'success',
      confirmButtonText: 'ตกลง'
    });
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    // Set font for Thai language (requires font installation and setup)
    // doc.addFont('THSarabunNew.ttf', 'THSarabunNew', 'normal');
    // doc.setFont('THSarabunNew');

    doc.text("ข้อมูลการศึกษาบุคลากร", 14, 16);

    const tableColumn = ["รหัส", "ปีการศึกษา", "ภาคเรียน", "วุฒิการศึกษา", "สถาบัน", "ปีที่สำเร็จ"];
    const tableRows = filteredData.map(item => [
      item.ds2003_id,
      formatAcademicYear(item.academic_year),
      item.semester,
      item.grad_curr || '-',
      item.grad_univ || '-',
      formatAcademicYear(item.grad_year),
    ]);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      headStyles: { fillColor: [68, 114, 196], textColor: 255, fontStyle: 'bold' },
      styles: {
        fontSize: 9,
        cellPadding: 3,
        // font: 'THSarabunNew' // Uncomment if you have the font set up
      },
      didDrawPage: function (data: any) {
        // Footer
        var str = "Page " + (doc as any).internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, (doc as any).internal.pageSize.height - 10);
      }
    });

    doc.save('staff_education_data.pdf');
    Swal.fire({
      title: 'ส่งออก PDF',
      text: 'ส่งออกข้อมูลเป็น PDF เรียบร้อยแล้ว',
      icon: 'success',
      confirmButtonText: 'ตกลง'
    });
  };

  return (
    <AppsContent>
      <AppInfoView />
      <AppCard title={<IntlMessagesMain id="sidebar.rp02.05"/>}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="academic-year-select-label">
              <IntlMessages id="academic_year" defaultMessage="ปีการศึกษา"/>
            </InputLabel>
            <Select
              labelId="academic-year-select-label"
              id="academic-year-select"
              value={academicYear}
              label={<IntlMessages id="academic_year" defaultMessage="ปีการศึกษา"/>}
              onChange={handleAcademicYearChange as any}
            >
              <MenuItem value="ทั้งหมด">
                <em><IntlMessages id="year_all" defaultMessage="ทั้งหมด"/></em>
              </MenuItem>
              {academicYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleGenerateReport}>
            <IntlMessages id="generate_report_button" defaultMessage="สร้างรายงาน"/>
          </Button>
          <Button variant="outlined" onClick={handleExportExcel}>
            <IntlMessages id="export_excel_button" defaultMessage="ส่งออกข้อมูลเป็น Excel"/>
          </Button>
          <Button variant="outlined" onClick={handleExportPdf}>
            <IntlMessages id="export_pdf_button" defaultMessage="ส่งออกข้อมูลเป็น PDF"/>
          </Button>
        </Box>
        <StaffTable data={filteredData} />
      </AppCard>
    </AppsContent>
  );
};

export default StaffPage;

// --- Root rendering ของ React ---
// ส่วนนี้มีไว้สำหรับการทดสอบ หากคุณใช้เฟรมเวิร์กอย่าง Next.js หรือ Vite
// และมีไฟล์ index.tsx/main.tsx อยู่แล้ว โปรดลบโค้ดนี้ออก
// และเรียกใช้ <StaffPage /> ในไฟล์หลักของโปรเจกต์คุณแทน
if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <StaffPage />
      </React.StrictMode>
    );
  }
}