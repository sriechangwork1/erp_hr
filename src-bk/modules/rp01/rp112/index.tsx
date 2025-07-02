// rp112/index.tsx
'use client';
 // rp112/index.tsx

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Modal,
  Divider,
  TextField,
  TablePagination, // เพิ่ม TablePagination
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

// นำเข้า Types ที่เกี่ยวข้อง
import { FacultyStaffingDetail, StaffTypeStaffing, PositionStaffing, FacultyData, RawStaffData, CertificateStaffData } from './types';
import SalaryCertificate from './SalaryCertificate';

// **ส่วนที่ 1: mockRawStaffData พร้อมข้อมูลเงินเดือน**
export const mockRawStaffData: RawStaffData[] = [ // กำหนด type เป็น RawStaffData[]
  {
    "staff_id": 5000001, "citizen_id": "1100400741045", "first_name_th": "สมชาย", "last_name_th": "ใจดี",
    "academic_title": "ศาสตราจารย์", "academic_standing_id": 1, "position_work": "อาจารย์",
    "faculty_id": "01", "phone_number": "081-111-1111", "email1": "somchai.j@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 50000, "position_allowance": 10000, "other_allowance": 5000, "total_salary": 65000
  },
  {
    "staff_id": 5000002, "citizen_id": "1100400741046", "first_name_th": "สมหญิง", "last_name_th": "มีสุข",
    "academic_title": "รองศาสตราจารย์", "academic_standing_id": 2, "position_work": "อาจารย์",
    "faculty_id": "01", "phone_number": "082-222-2222", "email1": "somying.m@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 45000, "position_allowance": 8000, "other_allowance": 4000, "total_salary": 57000
  },
  {
    "staff_id": 5000003, "citizen_id": "1100400741047", "first_name_th": "มานะ", "last_name_th": "คงมั่น",
    "academic_title": "ผู้ช่วยศาสตราจารย์", "academic_standing_id": 3, "position_work": "อาจารย์",
    "faculty_id": "02", "phone_number": "083-333-3333", "email1": "mana.k@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 40000, "position_allowance": 6000, "other_allowance": 3000, "total_salary": 49000
  },
  {
    "staff_id": 5000004, "citizen_id": "1100400741048", "first_name_th": "ปรีดา", "last_name_th": "รุ่งเรือง",
    "academic_title": "อาจารย์", "academic_standing_id": 4, "position_work": "อาจารย์",
    "faculty_id": "02", "phone_number": "084-444-4444", "email1": "preeda.r@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 35000, "position_allowance": 4000, "other_allowance": 2000, "total_salary": 41000
  },
  {
    "staff_id": 5000005, "citizen_id": "1100400741049", "first_name_th": "สุดา", "last_name_th": "วิชาดี",
    "academic_title": null, "academic_standing_id": null, "position_work": "เจ้าหน้าที่บริหารงานทั่วไป",
    "faculty_id": "01", "phone_number": "085-555-5555", "email1": "suda.v@example.com", "STAFFTYPE_ID": 2, "work_line_id": null,
    "base_salary": 25000, "position_allowance": 0, "other_allowance": 1500, "total_salary": 26500
  },
  {
    "staff_id": 5000006, "citizen_id": "1100400741050", "first_name_th": "ชัยชนะ", "last_name_th": "ยอดเยี่ยม",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักวิชาการคอมพิวเตอร์",
    "faculty_id": "01", "phone_number": "086-666-6666", "email1": "chaichana.y@example.com", "STAFFTYPE_ID": 2, "work_line_id": null,
    "base_salary": 28000, "position_allowance": 0, "other_allowance": 1800, "total_salary": 29800
  },
  {
    "staff_id": 5000007, "citizen_id": "1100400741051", "first_name_th": "นารี", "last_name_th": "เก่งกาจ",
    "academic_title": "ศาสตราจารย์", "academic_standing_id": 1, "position_work": "อาจารย์",
    "faculty_id": "03", "phone_number": "087-777-7777", "email1": "naree.k@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 52000, "position_allowance": 11000, "other_allowance": 5500, "total_salary": 68500
  },
  {
    "staff_id": 5000008, "citizen_id": "1100400741052", "first_name_th": "วีระ", "last_name_th": "มีชัย",
    "academic_title": "รองศาสตราจารย์", "academic_standing_id": 2, "position_work": "อาจารย์",
    "faculty_id": "03", "phone_number": "088-888-8888", "email1": "veera.m@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 47000, "position_allowance": 9000, "other_allowance": 4500, "total_salary": 60500
  },
  {
    "staff_id": 5000009, "citizen_id": "1100400741053", "first_name_th": "อรุณ", "last_name_th": "สดใส",
    "academic_title": "ผู้ช่วยศาสตราจารย์", "academic_standing_id": 3, "position_work": "อาจารย์",
    "faculty_id": "04", "phone_number": "089-999-9999", "email1": "arun.s@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 42000, "position_allowance": 7000, "other_allowance": 3500, "total_salary": 52500
  },
  {
    "staff_id": 5000010, "citizen_id": "1100400741054", "first_name_th": "วิภา", "last_name_th": "เจิดจ้า",
    "academic_title": "อาจารย์", "academic_standing_id": 4, "position_work": "อาจารย์",
    "faculty_id": "04", "phone_number": "090-000-0000", "email1": "wipa.j@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 37000, "position_allowance": 5000, "other_allowance": 2500, "total_salary": 44500
  },
  {
    "staff_id": 5000011, "citizen_id": "1100400741055", "first_name_th": "เก่ง", "last_name_th": "ฉลาด",
    "academic_title": null, "academic_standing_id": null, "position_work": "เจ้าหน้าที่การเงิน",
    "faculty_id": "03", "phone_number": "091-111-1111", "email1": "keng.c@example.com", "STAFFTYPE_ID": 2, "work_line_id": null,
    "base_salary": 26000, "position_allowance": 0, "other_allowance": 1600, "total_salary": 27600
  },
  {
    "staff_id": 5000012, "citizen_id": "1100400741056", "first_name_th": "เพ็ญศรี", "last_name_th": "ศรีสุข",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักประชาสัมพันธ์",
    "faculty_id": "03", "phone_number": "092-222-2222", "email1": "pensri.s@example.com", "STAFFTYPE_ID": 2, "work_line_id": null,
    "base_salary": 27000, "position_allowance": 0, "other_allowance": 1700, "total_salary": 28700
  },
  {
    "staff_id": 5000013, "citizen_id": "1100400741057", "first_name_th": "วิทยา", "last_name_th": "พัฒนา",
    "academic_title": "ศาสตราจารย์", "academic_standing_id": 1, "position_work": "อาจารย์",
    "faculty_id": "05", "phone_number": "093-333-3333", "email1": "wittaya.p@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 51000, "position_allowance": 10500, "other_allowance": 5200, "total_salary": 66700
  },
  {
    "staff_id": 5000014, "citizen_id": "1100400741058", "first_name_th": "กมล", "last_name_th": "เจริญ",
    "academic_title": "รองศาสตราจารย์", "academic_standing_id": 2, "position_work": "อาจารย์",
    "faculty_id": "05", "phone_number": "094-444-4444", "email1": "kamon.c@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 46000, "position_allowance": 8500, "other_allowance": 4200, "total_salary": 58700
  },
  {
    "staff_id": 5000015, "citizen_id": "1100400741059", "first_name_th": "สมศักดิ์", "last_name_th": "ดีจริง",
    "academic_title": "ผู้ช่วยศาสตราจารย์", "academic_standing_id": 3, "position_work": "อาจารย์",
    "faculty_id": "06", "phone_number": "095-555-5555", "email1": "somsak.d@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 41000, "position_allowance": 6500, "other_allowance": 3200, "total_salary": 50700
  },
  {
    "staff_id": 5000016, "citizen_id": "1100400741060", "first_name_th": "จันทร์เพ็ญ", "last_name_th": "งดงาม",
    "academic_title": "อาจารย์", "academic_standing_id": 4, "position_work": "อาจารย์",
    "faculty_id": "06", "phone_number": "096-666-6666", "email1": "janpen.n@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 36000, "position_allowance": 4500, "other_allowance": 2200, "total_salary": 42700
  },
  {
    "staff_id": 5000017, "citizen_id": "1100400741061", "first_name_th": "สุริยา", "last_name_th": "ส่องแสง",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักวิชาการศึกษา",
    "faculty_id": "05", "phone_number": "097-777-7777", "email1": "suriya.s@example.com", "STAFFTYPE_ID": 2, "work_line_id": null,
    "base_salary": 25500, "position_allowance": 0, "other_allowance": 1550, "total_salary": 27050
  },
  {
    "staff_id": 5000018, "citizen_id": "1100400741062", "first_name_th": "เมษา", "last_name_th": "ฤดูร้อน",
    "academic_title": null, "academic_standing_id": null, "position_work": "เจ้าหน้าที่พัสดุ",
    "faculty_id": "05", "phone_number": "098-888-8888", "email1": "maysa.r@example.com", "STAFFTYPE_ID": 2, "work_line_id": null,
    "base_salary": 26500, "position_allowance": 0, "other_allowance": 1650, "total_salary": 28150
  },
  {
    "staff_id": 5000019, "citizen_id": "1100400741063", "first_name_th": "อาทิตย์", "last_name_th": "รุ่งอรุณ",
    "academic_title": "ศาสตราจารย์", "academic_standing_id": 1, "position_work": "อาจารย์",
    "faculty_id": "07", "phone_number": "099-999-9999", "email1": "artit.r@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 53000, "position_allowance": 11500, "other_allowance": 5800, "total_salary": 70300
  },
  {
    "staff_id": 5000020, "citizen_id": "1100400741064", "first_name_th": "ศศิธร", "last_name_th": "เรืองรอง",
    "academic_title": "รองศาสตราจารย์", "academic_standing_id": 2, "position_work": "อาจารย์",
    "faculty_id": "07", "phone_number": "061-111-1111", "email1": "sasitorn.r@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 48000, "position_allowance": 9500, "other_allowance": 4800, "total_salary": 62300
  },
  {
    "staff_id": 5000021, "citizen_id": "1100400741065", "first_name_th": "ธงชัย", "last_name_th": "โบกธง",
    "academic_title": "ผู้ช่วยศาสตราจารย์", "academic_standing_id": 3, "position_work": "อาจารย์",
    "faculty_id": "08", "phone_number": "062-222-2222", "email1": "tongchai.b@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 43000, "position_allowance": 7500, "other_allowance": 3800, "total_salary": 54300
  },
  {
    "staff_id": 5000022, "citizen_id": "1100400741066", "first_name_th": "ดวงพร", "last_name_th": "พรสวรรค์",
    "academic_title": "อาจารย์", "academic_standing_id": 4, "position_work": "อาจารย์",
    "faculty_id": "08", "phone_number": "063-333-3333", "email1": "duangporn.p@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 38000, "position_allowance": 5500, "other_allowance": 2800, "total_salary": 46300
  },
  {
    "staff_id": 5000023, "citizen_id": "1100400741067", "first_name_th": "บุษบง", "last_name_th": "บานสะพรั่ง",
    "academic_title": null, "academic_standing_id": null, "position_work": "เจ้าหน้าที่ธุรการ",
    "faculty_id": "07", "phone_number": "064-444-4444", "email1": "bussabong.b@example.com", "STAFFTYPE_ID": 2, "work_line_id": null,
    "base_salary": 27500, "position_allowance": 0, "other_allowance": 1750, "total_salary": 29250
  },
  {
    "staff_id": 5000024, "citizen_id": "1100400741068", "first_name_th": "อำนวย", "last_name_th": "ความสะดวก",
    "academic_title": null, "academic_standing_id": null, "position_work": "ช่างเทคนิค",
    "faculty_id": "07", "phone_number": "065-555-5555", "email1": "amnauy.k@example.com", "STAFFTYPE_ID": 2, "work_line_id": null,
    "base_salary": 28500, "position_allowance": 0, "other_allowance": 1850, "total_salary": 30350
  },
  {
    "staff_id": 5000025, "citizen_id": "1100400741069", "first_name_th": "ประเสริฐ", "last_name_th": "เลิศล้ำ",
    "academic_title": "ศาสตราจารย์", "academic_standing_id": 1, "position_work": "อาจารย์",
    "faculty_id": "09", "phone_number": "066-666-6666", "email1": "prasert.l@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 54000, "position_allowance": 12000, "other_allowance": 6000, "total_salary": 72000
  },
  {
    "staff_id": 5000026, "citizen_id": "1100400741070", "first_name_th": "กัญญารัตน์", "last_name_th": "งดงาม",
    "academic_title": "รองศาสตราจารย์", "academic_standing_id": 2, "position_work": "อาจารย์",
    "faculty_id": "09", "phone_number": "067-777-7777", "email1": "kanyarat.n@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 49000, "position_allowance": 10000, "other_allowance": 5000, "total_salary": 64000
  },
  {
    "staff_id": 5000027, "citizen_id": "1100400741071", "first_name_th": "สมหมาย", "last_name_th": "ได้ผล",
    "academic_title": "ผู้ช่วยศาสตราจารย์", "academic_standing_id": 3, "position_work": "อาจารย์",
    "faculty_id": "10", "phone_number": "068-888-8888", "email1": "sommai.d@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 44000, "position_allowance": 8000, "other_allowance": 4000, "total_salary": 56000
  },
  {
    "staff_id": 5000028, "citizen_id": "1100400741072", "first_name_th": "ทิพย์สุดา", "last_name_th": "ฟ้าประทาน",
    "academic_title": "อาจารย์", "academic_standing_id": 4, "position_work": "อาจารย์",
    "faculty_id": "10", "phone_number": "069-999-9999", "email1": "tipsuda.f@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 39000, "position_allowance": 6000, "other_allowance": 3000, "total_salary": 48000
  },
  {
    "staff_id": 5000029, "citizen_id": "1100400741073", "first_name_th": "บุญส่ง", "last_name_th": "ถึงฝั่ง",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักพัฒนาซอฟต์แวร์",
    "faculty_id": "09", "phone_number": "070-000-0000", "email1": "boonsong.t@example.com", "STAFFTYPE_ID": 2, "work_line_id": null,
    "base_salary": 28000, "position_allowance": 0, "other_allowance": 1800, "total_salary": 29800
  },
  {
    "staff_id": 5000030, "citizen_id": "1100400741074", "first_name_th": "วิมล", "last_name_th": "ผ่องใส",
    "academic_title": null, "academic_standing_id": null, "position_work": "ผู้ดูแลระบบเครือข่าย",
    "faculty_id": "09", "phone_number": "071-111-1111", "email1": "wimol.p@example.com", "STAFFTYPE_ID": 2, "work_line_id": null,
    "base_salary": 29000, "position_allowance": 0, "other_allowance": 1900, "total_salary": 30900
  },
  {
    "staff_id": 5000031, "citizen_id": "1100400741075", "first_name_th": "ประยูร", "last_name_th": "เกษมสุข",
    "academic_title": "ศาสตราจารย์", "academic_standing_id": 1, "position_work": "อาจารย์",
    "faculty_id": "11", "phone_number": "072-222-2222", "email1": "prayoon.k@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 55000, "position_allowance": 12500, "other_allowance": 6200, "total_salary": 73700
  },
  {
    "staff_id": 5000032, "citizen_id": "1100400741076", "first_name_th": "จิตรา", "last_name_th": "งามวงศ์",
    "academic_title": "รองศาสตราจารย์", "academic_standing_id": 2, "position_work": "อาจารย์",
    "faculty_id": "11", "phone_number": "073-333-3333", "email1": "jittra.n@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 50000, "position_allowance": 10500, "other_allowance": 5200, "total_salary": 65700
  },
  {
    "staff_id": 5000033, "citizen_id": "1100400741077", "first_name_th": "วรัญญา", "last_name_th": "สุขเกษม",
    "academic_title": "ผู้ช่วยศาสตราจารย์", "academic_standing_id": 3, "position_work": "อาจารย์",
    "faculty_id": "12", "phone_number": "074-444-4444", "email1": "waranya.s@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 45000, "position_allowance": 8500, "other_allowance": 4200, "total_salary": 57700
  },
  {
    "staff_id": 5000034, "citizen_id": "1100400741078", "first_name_th": "พรชัย", "last_name_th": "มีโชค",
    "academic_title": "อาจารย์", "academic_standing_id": 4, "position_work": "อาจารย์",
    "faculty_id": "12", "phone_number": "075-555-5555", "email1": "pornchai.m@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 40000, "position_allowance": 6500, "other_allowance": 3200, "total_salary": 49700
  },
  {
    "staff_id": 5000035, "citizen_id": "1100400741079", "first_name_th": "สมพร", "last_name_th": "สมหวัง",
    "academic_title": null, "academic_standing_id": null, "position_work": "บรรณารักษ์",
    "faculty_id": "11", "phone_number": "076-666-6666", "email1": "somporn.s@example.com", "STAFFTYPE_ID": 2, "work_line_id": null,
    "base_salary": 29500, "position_allowance": 0, "other_allowance": 1950, "total_salary": 31450
  },
  {
    "staff_id": 5000036, "citizen_id": "1100400741080", "first_name_th": "บุญเรือง", "last_name_th": "งามยิ่ง",
    "academic_title": null, "academic_standing_id": null, "position_work": "เจ้าหน้าที่ห้องปฏิบัติการ",
    "faculty_id": "11", "phone_number": "077-777-7777", "email1": "boonrueng.n@example.com", "STAFFTYPE_ID": 2, "work_line_id": null,
    "base_salary": 30500, "position_allowance": 0, "other_allowance": 2050, "total_salary": 32550
  },
  {
    "staff_id": 5000037, "citizen_id": "1100400741081", "first_name_th": "พงษ์ศักดิ์", "last_name_th": "เจริญยิ่ง",
    "academic_title": "ศาสตราจารย์", "academic_standing_id": 1, "position_work": "อาจารย์",
    "faculty_id": "13", "phone_number": "078-888-8888", "email1": "pongsak.j@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 56000, "position_allowance": 13000, "other_allowance": 6500, "total_salary": 75500
  },
  {
    "staff_id": 5000038, "citizen_id": "1100400741082", "first_name_th": "พรรณิภา", "last_name_th": "สดชื่น",
    "academic_title": "รองศาสตราจารย์", "academic_standing_id": 2, "position_work": "อาจารย์",
    "faculty_id": "13", "phone_number": "079-999-9999", "email1": "pannipa.s@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 51000, "position_allowance": 11000, "other_allowance": 5500, "total_salary": 67500
  },
  {
    "staff_id": 5000039, "citizen_id": "1100400741083", "first_name_th": "สมจิตร", "last_name_th": "ใจเย็น",
    "academic_title": "ผู้ช่วยศาสตราจารย์", "academic_standing_id": 3, "position_work": "อาจารย์",
    "faculty_id": "14", "phone_number": "080-000-0000", "email1": "somjit.j@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 46000, "position_allowance": 9000, "other_allowance": 4500, "total_salary": 59500
  },
  {
    "staff_id": 5000040, "citizen_id": "1100400741084", "first_name_th": "อรสา", "last_name_th": "งามสง่า",
    "academic_title": "อาจารย์", "academic_standing_id": 4, "position_work": "อาจารย์",
    "faculty_id": "14", "phone_number": "081-000-0000", "email1": "orsa.n@example.com", "STAFFTYPE_ID": 1, "work_line_id": null,
    "base_salary": 41000, "position_allowance": 7000, "other_allowance": 3500, "total_salary": 51500
  }
];


export const mockFacultyData: FacultyData[] = [ // เพิ่ม export สำหรับ mockFacultyData
  {
    "FACULTYID": "01", "FACULTYNAME": "คณะวิทยาการคอมพิวเตอร์และสารสนเทศ", "FACULTYNAMEENG": "Faculty of Computer Science and Information Science",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  },
  {
    "FACULTYID": "02", "FACULTYNAME": "คณะเทคโนโลยี", "FACULTYNAMEENG": "Faculty of Technology",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  },
  {
    "FACULTYID": "03", "FACULTYNAME": "คณะสถาปัตยกรรมศาสตร์", "FACULTYNAMEENG": "Faculty of Architecture",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  },
  {
    "FACULTYID": "04", "FACULTYNAME": "คณะวิศวกรรมศาสตร์", "FACULTYNAMEENG": "Faculty of Engineering",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  },
  {
    "FACULTYID": "05", "FACULTYNAME": "คณะวิทยาศาสตร์", "FACULTYNAMEENG": "Faculty of Science",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  },
  {
    "FACULTYID": "06", "FACULTYNAME": "คณะแพทยศาสตร์", "FACULTYNAMEENG": "Faculty of Medicine",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  },
  {
    "FACULTYID": "07", "FACULTYNAME": "คณะพยาบาลศาสตร์", "FACULTYNAMEENG": "Faculty of Nursing",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  },
  {
    "FACULTYID": "08", "FACULTYNAME": "คณะเภสัชศาสตร์", "FACULTYNAMEENG": "Faculty of Pharmacy",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  },
  {
    "FACULTYID": "09", "FACULTYNAME": "คณะสาธารณสุขศาสตร์", "FACULTYNAMEENG": "Faculty of Public Health",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  },
  {
    "FACULTYID": "10", "FACULTYNAME": "คณะสัตวแพทยศาสตร์", "FACULTYNAMEENG": "Faculty of Veterinary Medicine",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  },
  {
    "FACULTYID": "11", "FACULTYNAME": "คณะเกษตรศาสตร์", "FACULTYNAMEENG": "Faculty of Agriculture",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  },
  {
    "FACULTYID": "12", "FACULTYNAME": "คณะศึกษาศาสตร์", "FACULTYNAMEENG": "Faculty of Education",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  },
  {
    "FACULTYID": "13", "FACULTYNAME": "คณะศิลปกรรมศาสตร์", "FACULTYNAMEENG": "Faculty of Fine and Applied Arts",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  },
  {
    "FACULTYID": "14", "FACULTYNAME": "คณะมนุษยศาสตร์และสังคมศาสตร์", "FACULTYNAMEENG": "Faculty of Humanities and Social Sciences",
    "FACULTYTYPEID": 1, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null,
    "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null,
    "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": null
  }
];


const StaffingReport: React.FC = () => {
  // สถานะสำหรับการค้นหา
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyData | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<RawStaffData | null>(null);
  const [filteredStaffDetails, setFilteredStaffDetails] = useState<any[]>([]); // ใช้ RawStaffData[] ถ้ากำหนด type ใน mockRawStaffData ชัดเจน

  // สถานะสำหรับ Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // จำนวนแถวเริ่มต้นต่อหน้า

  const [openModal, setOpenModal] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);

  const handleOpenModal = (staffId: number) => {
    setSelectedStaffId(staffId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedStaffId(null);
  };

  // เตรียมข้อมูลสำหรับ Autocomplete ของคณะ
  const facultyOptions = mockFacultyData;

  // เตรียมข้อมูลสำหรับ Autocomplete ของบุคลากร
  const staffOptions = mockRawStaffData.map(staff => ({
    label: `${staff.academic_title ? staff.academic_title + ' ' : ''}${staff.first_name_th} ${staff.last_name_th} (${staff.position_work || 'ไม่ระบุตำแหน่ง'})`,
    value: staff.staff_id,
    staffData: staff
  }));

  // Effect สำหรับกรองข้อมูลบุคลากรเมื่อมีการเปลี่ยนแปลงการค้นหา
  useEffect(() => {
    let currentFilteredStaff = mockRawStaffData;

    // กรองตามคณะ
    if (selectedFaculty) {
      currentFilteredStaff = currentFilteredStaff.filter(
        (staff) => staff.faculty_id === selectedFaculty.FACULTYID
      );
    }

    // กรองตามบุคลากรที่เลือก (ถ้ามีการเลือกบุคลากรจาก Autocomplete)
    if (selectedStaff) {
      currentFilteredStaff = currentFilteredStaff.filter(
        (staff) => staff.staff_id === selectedStaff.staff_id
      );
    }

    // Map ข้อมูลที่กรองแล้วเพื่อใช้แสดงผลในตาราง
    const mappedFilteredStaff = currentFilteredStaff.map(staff => {
      const faculty = mockFacultyData.find(f => f.FACULTYID === staff.faculty_id);
      const facultyName = faculty ? faculty.FACULTYNAME : 'ไม่ระบุคณะ';
      const position = staff.academic_title || staff.position_work || 'ไม่ระบุตำแหน่ง';
      const totalSalary = staff.total_salary || 0;
      return { ...staff, facultyName, position, totalSalary };
    });

    setFilteredStaffDetails(mappedFilteredStaff);
    setPage(0); // รีเซ็ตหน้ากลับไปที่ 0 เมื่อมีการกรองใหม่
  }, [selectedFaculty, selectedStaff]); // Depend on selectedFaculty and selectedStaff

  // Handlers สำหรับ TablePagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // รีเซ็ตหน้ากลับไปที่ 0 เมื่อเปลี่ยนจำนวนแถวต่อหน้า
  };

  // คำนวณข้อมูลที่จะแสดงในหน้าปัจจุบัน
  const paginatedStaffDetails = filteredStaffDetails.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ระบบค้นหาบุคลากรและออกหนังสือรับรองเงินเดือน
      </Typography>

      {/* ส่วนตัวกรอง (Autocomplete) */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Autocomplete
          value={selectedFaculty}
          onChange={(event, newValue: FacultyData | null) => {
            setSelectedFaculty(newValue);
            setSelectedStaff(null); // รีเซ็ตการเลือกบุคลากรเมื่อเปลี่ยนคณะ
          }}
          options={facultyOptions}
          getOptionLabel={(option) => option.FACULTYNAME}
          isOptionEqualToValue={(option, value) => option.FACULTYID === value.FACULTYID}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="ค้นหาตามคณะ/หน่วยงาน" />}
        />

        <Autocomplete
          value={selectedStaff ? staffOptions.find(opt => opt.value === selectedStaff.staff_id) : null}
          onChange={(event, newValue: { label: string; value: number; staffData: RawStaffData } | null) => {
            setSelectedStaff(newValue ? newValue.staffData : null);
            setSelectedFaculty(null); // รีเซ็ตการเลือกคณะเมื่อเลือกบุคลากร
          }}
          options={staffOptions}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          sx={{ width: 350 }}
          renderInput={(params) => <TextField {...params} label="ค้นหาตามชื่อบุคลากร" />}
        />

        <Button
          variant="outlined"
          onClick={() => {
            setSelectedFaculty(null);
            setSelectedStaff(null);
          }}
        >
          ล้างการค้นหา
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ส่วนแสดงรายการบุคลากรรายบุคคลพร้อมปุ่มออกหนังสือรับรอง */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        ผลการค้นหาบุคลากร
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ลำดับ</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ชื่อ-สกุล</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ตำแหน่ง</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>สังกัด</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>เงินเดือนรวม</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>ดำเนินการ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStaffDetails.length === 0 ? ( // ใช้ paginatedStaffDetails ในการตรวจสอบ
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {selectedFaculty || selectedStaff ? 'ไม่พบข้อมูลบุคลากรตามเงื่อนไขที่เลือก' : 'โปรดใช้ช่องค้นหาเพื่อค้นหาบุคลากร'}
                </TableCell>
              </TableRow>
            ) : (
              paginatedStaffDetails.map((staff, index) => ( // ใช้ paginatedStaffDetails ในการ map
                <TableRow key={staff.staff_id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell> {/* ปรับลำดับให้ถูกต้องตามหน้า */}
                  <TableCell>{staff.academic_title ? staff.academic_title : ''} {staff.first_name_th} {staff.last_name_th}</TableCell>
                  <TableCell>{staff.position}</TableCell>
                  <TableCell>{staff.facultyName}</TableCell>
                  <TableCell align="right">{staff.total_salary?.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenModal(staff.staff_id)}
                    >
                      ออกหนังสือรับรอง
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* TablePagination Component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'ทั้งหมด', value: -1 }]} // ตัวเลือกจำนวนแถว
        component="div"
        count={filteredStaffDetails.length} // จำนวนรายการทั้งหมดที่กรองแล้ว
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="จำนวนแถวต่อหน้า:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} จาก ${count !== -1 ? count : `มากกว่า ${to}`}`
        }
      />

      {/* Modal สำหรับแสดงหนังสือรับรองเงินเดือน (เหมือนเดิม) */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="salary-certificate-modal-title"
        aria-describedby="salary-certificate-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            width: '90%',
            maxWidth: 850,
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            position: 'relative',
          }}
        >
          <Typography id="salary-certificate-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            หนังสือรับรองเงินเดือนบุคลากร
          </Typography>
          <Button
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              minWidth: 'auto',
              p: 1,
            }}
          >
            X
          </Button>
          <SalaryCertificate staffId={selectedStaffId} />
        </Box>
      </Modal>

    </Box>
  );
};

export default StaffingReport;