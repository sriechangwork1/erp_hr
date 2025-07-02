//rp206/index.tsx
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
  Skeleton,
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
  <Box
    sx={{
      padding: 4,
      borderRadius: 2,
      boxShadow: 3,
      backgroundColor: 'white',
      ...sx,
    }}
  >
    {title && (
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
    )}
    {children}
  </Box>
);

const AppsContent: React.FC<{ children: React.ReactNode; sx?: any }> = ({
  children,
  sx,
}) => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ...sx }}>
    {children}
  </Container>
);

const IntlMessages: React.FC<{ id: string; defaultMessage: string }> = ({
  defaultMessage,
}) => {
  return <>{defaultMessage}</>;
};

// --- Interfaces สำหรับข้อมูลใหม่ (DS2004_Staff_Teach) ---
interface StaffTeachData {
  ds2004_id: number;
  academic_year: string;
  semester: string;
  univ_id: string;
  citizen_id: string;
  fac_id: string;
  curr_id: string;
  teach_type_id: string;
}

// --- ข้อมูลจำลอง (Mock Data) สำหรับตาราง DS2004_Staff_Teach ---
// ข้อมูล 100 รายการแรกจากไฟล์ _DS2004_Staff_Teach__202506291013.json
// พร้อมปรับปีการศึกษาให้มี 2566, 2567 และ 2568 กระจายอยู่
const allTeachData: StaffTeachData[] = [
  { "ds2004_id": 1, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1100500140666", "fac_id": "00099", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 2, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1103700815945", "fac_id": "00005", "curr_id": "25490261103129", "teach_type_id": "3" },
  { "ds2004_id": 3, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110100148376", "fac_id": "01806", "curr_id": "25510261104011", "teach_type_id": "3" },
  { "ds2004_id": 4, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110100155455", "fac_id": "01806", "curr_id": "25510261104011", "teach_type_id": "3" },
  { "ds2004_id": 5, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110100155455", "fac_id": "01806", "curr_id": "25510261104011", "teach_type_id": "3" },
  { "ds2004_id": 6, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110100166440", "fac_id": "01806", "curr_id": "25510261104011", "teach_type_id": "3" },
  { "ds2004_id": 7, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200000880", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 8, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200000880", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 9, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200000880", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 10, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 11, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 12, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 13, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 14, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 15, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 16, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 17, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 18, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 19, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 20, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 21, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 22, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 23, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 24, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 25, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 26, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 27, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 28, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 29, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 30, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 31, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 32, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 33, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 34, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 35, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 36, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 37, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 38, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 39, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 40, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 41, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 42, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 43, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 44, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 45, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 46, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 47, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 48, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 49, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 50, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 51, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 52, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 53, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 54, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 55, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 56, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 57, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 58, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 59, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 60, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 61, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 62, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 63, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 64, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 65, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 66, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 67, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 68, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 69, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 70, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 71, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 72, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 73, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 74, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 75, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 76, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 77, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 78, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 79, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 80, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 81, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 82, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 83, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 84, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 85, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 86, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 87, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 88, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 89, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 90, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 91, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 92, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 93, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 94, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 95, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 96, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 97, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 98, "academic_year": "2568", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 99, "academic_year": "2566", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" },
  { "ds2004_id": 100, "academic_year": "2567", "semester": "2", "univ_id": "02600", "citizen_id": "1110200002131", "fac_id": "00003", "curr_id": "25560261100552", "teach_type_id": "3" }
];

// --- คอมโพเนนต์ตารางสำหรับข้อมูล StaffTeachData ---
interface StaffTeachTableItemProps {
  data: StaffTeachData;
  isLoading: boolean;
}

const TableCellWrapper: React.FC<{ children: React.ReactNode; align?: 'left' | 'center' | 'right' }> = ({
  children,
  align = 'left',
}) => (
  <TableCell
    sx={{
      py: 2,
      px: 4,
      fontSize: '14px',
      whiteSpace: 'nowrap',
      textAlign: align,
    }}
  >
    {children}
  </TableCell>
);

const StaffTeachTableItem: React.FC<StaffTeachTableItemProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <TableRow>
        <TableCellWrapper><Skeleton width={50} /></TableCellWrapper>
        <TableCellWrapper><Skeleton width={80} /></TableCellWrapper>
        <TableCellWrapper><Skeleton width={80} /></TableCellWrapper>
        <TableCellWrapper><Skeleton width={100} /></TableCellWrapper>
        <TableCellWrapper><Skeleton width={120} /></TableCellWrapper>
        <TableCellWrapper><Skeleton width={80} /></TableCellWrapper>
        <TableCellWrapper><Skeleton width={150} /></TableCellWrapper>
        <TableCellWrapper><Skeleton width={100} /></TableCellWrapper>
      </TableRow>
    );
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={data.ds2004_id}>
      <TableCellWrapper>{data.ds2004_id}</TableCellWrapper>
      <TableCellWrapper>{data.academic_year}</TableCellWrapper>
      <TableCellWrapper>{data.semester}</TableCellWrapper>
      <TableCellWrapper>{data.univ_id}</TableCellWrapper>
      <TableCellWrapper>{data.citizen_id}</TableCellWrapper>
      <TableCellWrapper>{data.fac_id}</TableCellWrapper>
      <TableCellWrapper>{data.curr_id}</TableCellWrapper>
      <TableCellWrapper>{data.teach_type_id}</TableCellWrapper>
    </TableRow>
  );
};

interface StaffTeachTableProps {
  data: StaffTeachData[];
  isLoading?: boolean;
}

const StaffTeachTable: React.FC<StaffTeachTableProps> = ({ data, isLoading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="staff teach table">
          <TableHead>
            <TableRow>
              <TableCellWrapper>ID</TableCellWrapper>
              <TableCellWrapper>ปีการศึกษา</TableCellWrapper>
              <TableCellWrapper>ภาคเรียน</TableCellWrapper>
              <TableCellWrapper>รหัสสถานศึกษา</TableCellWrapper>
              <TableCellWrapper>รหัสบัตรประชาชน</TableCellWrapper>
              <TableCellWrapper>รหัสคณะ</TableCellWrapper>
              <TableCellWrapper>รหัสหลักสูตร</TableCellWrapper>
              <TableCellWrapper>รหัสประเภทการสอน</TableCellWrapper>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              // แสดง Skeleton 5 แถวเมื่อโหลด
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <StaffTeachTableItem key={index} data={{} as StaffTeachData} isLoading={true} />
              ))
            ) : (
              currentData.map((row) => (
                <StaffTeachTableItem key={row.ds2004_id} data={row} isLoading={false} />
              ))
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={8} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={<IntlMessages id="table_label_rows_per_page" defaultMessage="จำนวนแถวต่อหน้า:" />}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} จาก ${count !== -1 ? count : `มากกว่า ${to}`}`
        }
      />
    </Paper>
  );
};

// --- คอมโพเนนต์หน้าหลักของรายงาน (StaffTeachPage) ---
const StaffTeachPage: React.FC = () => {
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<string>('all');
  const [filteredData, setFilteredData] = useState<StaffTeachData[]>(allTeachData);
  const [academicYears, setAcademicYears] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // เพิ่มสถานะ isLoading

  useEffect(() => {
    // ดึงปีการศึกษาที่ไม่ซ้ำกันจากข้อมูลทั้งหมด
    const uniqueYears = Array.from(
      new Set(allTeachData.map((item) => item.academic_year))
    ).sort();
    setAcademicYears(uniqueYears);
  }, []);

  useEffect(() => {
    setIsLoading(true); // เริ่มโหลด
    const timer = setTimeout(() => {
      if (selectedAcademicYear === 'all') {
        setFilteredData(allTeachData);
      } else {
        setFilteredData(
          allTeachData.filter((item) => item.academic_year === selectedAcademicYear)
        );
      }
      setIsLoading(false); // หยุดโหลด
    }, 500); // จำลองการโหลดข้อมูล
    return () => clearTimeout(timer);
  }, [selectedAcademicYear]);

  const handleAcademicYearChange = useCallback(
    (event: { target: { value: string } }) => {
      setSelectedAcademicYear(event.target.value);
    },
    []
  );

  const handleGenerateReport = useCallback(() => {
    // ในกรณีนี้ ข้อมูลจะถูกกรองโดยอัตโนมัติเมื่อ selectedAcademicYear เปลี่ยน
    // แต่สามารถเพิ่ม logic สำหรับการสร้างรายงานที่ซับซ้อนขึ้นได้ที่นี่
    Swal.fire(
      'สร้างรายงาน',
      `รายงานสำหรับปีการศึกษา ${selectedAcademicYear === 'all' ? 'ทั้งหมด' : selectedAcademicYear} ถูกสร้างขึ้น`,
      'success'
    );
  }, [selectedAcademicYear]);

  const handleExportExcel = useCallback(() => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'StaffTeachData');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(dataBlob, 'StaffTeachData_Report.xlsx');
    Swal.fire('ส่งออก Excel', 'ส่งออกข้อมูลเป็น Excel เรียบร้อยแล้ว', 'success');
  }, [filteredData]);

  const handleExportPdf = useCallback(() => {
    const doc = new (jsPDF as any)(); // ใช้ jsPDF as any เพื่อเลี่ยงปัญหา Type
    const tableColumn = [
      "ID", "ปีการศึกษา", "ภาคเรียน", "รหัสสถานศึกษา",
      "รหัสบัตรประชาชน", "รหัสคณะ", "รหัสหลักสูตร", "รหัสประเภทการสอน"
    ];
    const tableRows: any[] = [];

    filteredData.forEach(item => {
      const rowData = [
        item.ds2004_id,
        item.academic_year,
        item.semester,
        item.univ_id,
        item.citizen_id,
        item.fac_id,
        item.curr_id,
        item.teach_type_id,
      ];
      tableRows.push(rowData);
    });

    // ตั้งค่า font สำหรับภาษาไทย (ถ้ามีการติดตั้ง font แล้ว)
    // doc.setFont("THSarabunNew"); // ต้องตั้งชื่อ Font ให้ตรงกับที่ติดตั้ง

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      headStyles: {
        font: 'NotoSansThai', // หรือชื่อฟอนต์ที่คุณติดตั้ง
        fontStyle: 'normal'
      },
      styles: {
        font: 'NotoSansThai', // หรือชื่อฟอนต์ที่คุณติดตั้ง
        fontStyle: 'normal',
        fontSize: 8,
      },
      didDrawPage: function (data: any) {
        doc.text("รายงานข้อมูลการสอนของบุคลากร", 14, 15);
      }
    });

    doc.save('StaffTeachData_Report.pdf');
    Swal.fire('ส่งออก PDF', 'ส่งออกข้อมูลเป็น PDF เรียบร้อยแล้ว', 'success');
  }, [filteredData]);

  return (
    <AppsContent>
      <AppCard title={<IntlMessagesMain id="sidebar.rp02.06"/>}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="academic-year-select-label">
              <IntlMessages id="academic_year_label" defaultMessage="ปีการศึกษา" />
            </InputLabel>
            <Select
              labelId="academic-year-select-label"
              value={selectedAcademicYear}
              label={<IntlMessages id="academic_year_label" defaultMessage="ปีการศึกษา" />}
              onChange={handleAcademicYearChange}
            >
              <MenuItem value="all">
                <em><IntlMessages id="year_all" defaultMessage="ทั้งหมด" /></em>
              </MenuItem>
              {academicYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleGenerateReport}>
            <IntlMessages id="generate_report_button" defaultMessage="สร้างรายงาน" />
          </Button>
          <Button variant="outlined" onClick={handleExportExcel}>
            <IntlMessages id="export_excel_button" defaultMessage="ส่งออกข้อมูลเป็น Excel" />
          </Button>
          <Button variant="outlined" onClick={handleExportPdf}>
            <IntlMessages id="export_pdf_button" defaultMessage="ส่งออกข้อมูลเป็น PDF" />
          </Button>
        </Box>
        <StaffTeachTable data={filteredData} isLoading={isLoading} />
      </AppCard>
    </AppsContent>
  );
};

export default StaffTeachPage;

// --- Root rendering ของ React ---
// ส่วนนี้มีไว้สำหรับการทดสอบ หากคุณใช้เฟรมเวิร์กอย่าง Next.js หรือ Vite
// และมีไฟล์ index.tsx/main.tsx อยู่แล้ว โปรดลบโค้ดนี้ออก
// และเรียกใช้ <StaffTeachPage /> ในไฟล์หลักของโปรเจกต์คุณแทน
if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <StaffTeachPage />
      </React.StrictMode>
    );
  }
}