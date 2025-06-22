// rp103/index.tsx
'use client';
import React, { useState, useMemo, useCallback } from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';
import { Box, Typography, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';

// Import the new Table component from the table folder
import Table from './Table';

// Exporting types directly from types.ts
import { FacultyData, PositionStaffing, StaffTypeStaffing, FacultyStaffingDetail, SummaryRow } from './types';

// สำหรับ Export ทั้งหมด (อาจจะรวมหลายชีท/หลายหน้า)
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import 'jspdf-autotable-font-loader/font/THSarabunNew'; // อย่าลืมติดตั้งและตั้งค่า Font
import * as XLSX from 'xlsx';
import AppCard from '@crema/components/AppCard';

// ข้อมูล FacultyData (จาก sys_faculty_202506192125.json)
const initialFacultyData: FacultyData[] = [
    { "FACULTYID": "1", "FACULTYNAME": "สำนักงานอธิการบดี-กองบริหารงานทั่วไป", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001702", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "2", "FACULTYNAME": "สำนักงานอธิการบดี-กองนโยบายและแผน", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001703", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "3", "FACULTYNAME": "สำนักงานอธิการบดี-กองพัฒนานักศึกษา", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001704", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "4", "FACULTYNAME": "สำนักงานอธิการบดี-กองกลาง", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001705", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "5", "FACULTYNAME": "สำนักงานอธิการบดี-กองอาคารและสถานที่", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001706", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "6", "FACULTYNAME": "สำนักงานอธิการบดี-กองบริหารงานบุคคล", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001707", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "7", "FACULTYNAME": "สำนักงานอธิการบดี-กองวิเทศสัมพันธ์และสื่อสารองค์กร", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001708", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "8", "FACULTYNAME": "สำนักงานอธิการบดี-ศูนย์เทคโนโลยีสารสนเทศ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001709", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "9", "FACULTYNAME": "สำนักงานอธิการบดี-หน่วยตรวจสอบภายใน", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001710", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "10", "FACULTYNAME": "สำนักงานอธิการบดี-งานนิติการ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001711", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "11", "FACULTYNAME": "สำนักงานอธิการบดี-กองแผนงาน", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001712", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "12", "FACULTYNAME": "คณะครุศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001713", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "13", "FACULTYNAME": "คณะมนุษยศาสตร์และสังคมศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001714", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "14", "FACULTYNAME": "คณะวิทยาศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001715", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "15", "FACULTYNAME": "คณะวิทยาการจัดการ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001716", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "16", "FACULTYNAME": "คณะเทคโนโลยีอุตสาหกรรม", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001717", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "17", "FACULTYNAME": "คณะเกษตรศาสตร์และเทคโนโลยี", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001718", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "18", "FACULTYNAME": "คณะนิติศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001719", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "19", "FACULTYNAME": "บัณฑิตวิทยาลัย", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001720", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "20", "FACULTYNAME": "วิทยาลัยการเมืองการปกครอง", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001721", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "21", "FACULTYNAME": "คณะเภสัชศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001722", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "22", "FACULTYNAME": "คณะวิศวกรรมศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001723", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "23", "FACULTYNAME": "คณะพยาบาลศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001724", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "24", "FACULTYNAME": "คณะการท่องเที่ยวและการโรงแรม", "FACULTYNAMEENG": null, "FACULTYTYPEID": 1, "BUILDING": "26001725", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "25", "FACULTYNAME": "สำนักวิทยบริการและเทคโนโลยีสารสนเทศ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 2, "BUILDING": "26001726", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "26", "FACULTYNAME": "สำนักศิลปะและวัฒนธรรม", "FACULTYNAMEENG": null, "FACULTYTYPEID": 2, "BUILDING": "26001727", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "27", "FACULTYNAME": "สถาบันวิจัยและพัฒนา", "FACULTYNAMEENG": null, "FACULTYTYPEID": 2, "BUILDING": "26001728", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "28", "FACULTYNAME": "ศูนย์ภาษา", "FACULTYNAMEENG": null, "FACULTYTYPEID": 2, "BUILDING": "26001729", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "29", "FACULTYNAME": "โรงเรียนสาธิตมหาวิทยาลัยราชภัฏมหาสารคาม", "FACULTYNAMEENG": null, "FACULTYTYPEID": 3, "BUILDING": "26001730", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "30", "FACULTYNAME": "ศูนย์วิทยาศาสตร์", "FACULTYNAMEENG": null, "FACULTYTYPEID": 2, "BUILDING": "26001731", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "31", "FACULTYNAME": "หน่วยเรือนจำชั่วคราว", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001732", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "32", "FACULTYNAME": "สำนักงานอธิการบดี-กองพัฒนาระบบ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001733", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "33", "FACULTYNAME": "สำนักงานอธิการบดี-กองงานบริหารงานทั่วไป", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001734", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "34", "FACULTYNAME": "สำนักงานอธิการบดี-งานทะเบียนและประเมินผล", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001735", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "35", "FACULTYNAME": "สำนักงานอธิการบดี-งานพัสดุ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001736", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "36", "FACULTYNAME": "สำนักงานอธิการบดี-กองนโยบายและแผน", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001737", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "37", "FACULTYNAME": "สำนักงานอธิการบดี-กองคลัง", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001738", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "38", "FACULTYNAME": "สำนักงานอธิการบดี-กองงานบริหารงานทั่วไป", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001739", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "39", "FACULTYNAME": "สำนักงานอธิการบดี-กองคลังและพัสดุ", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": "26001720", "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" },
    { "FACULTYID": "40", "FACULTYNAME": "มหาวิทยาลัยนครพนม", "FACULTYNAMEENG": null, "FACULTYTYPEID": 0, "BUILDING": null, "SUBDISTRICT": null, "DISTRICT": null, "PROVINCE": null, "POSTCODE": 0, "PHONE": null, "FAX": null, "PHONEIN": null, "EMAIL": null, "FACSTATUS": null, "REMARK": null, "STAFFID": null, "CREATEDATE": null, "BUDGETTYPEID": null, "GROUPID": null, "REF_FAC": "00320" }
];


// กำหนดตำแหน่งสำหรับสายวิชาการและสายสนับสนุน
const academicPositions = ['ศาสตราจารย์', 'รองศาสตราจารย์', 'ผู้ช่วยศาสตราจารย์', 'อาจารย์'];
const supportPositions = ['นักวิชาการศึกษา', 'เจ้าหน้าที่ห้องปฏิบัติการ', 'เลขานุการคณะ', 'นักทรัพยากรบุคคล', 'เจ้าหน้าที่ธุรการ', 'ผู้อำนวยการกอง', 'นักวิเคราะห์นโยบายและแผน', 'บุคลากรวิทยาศาสตร์', 'พนักงานขับรถ', 'ยาม'];

// ฟังก์ชันจำลองข้อมูลอัตรากำลังตามตำแหน่งสำหรับ 1 หน่วยงาน
const generateStaffingByPositionData = (facultyId: string): StaffTypeStaffing[] => {
  const staffingDetails: StaffTypeStaffing[] = [];

  // Random function for approved/actual
  const getRandomNumbers = (baseApproved: number) => {
    const approved = baseApproved + Math.floor(Math.random() * 5); // +0-4
    const actual = Math.min(approved, approved - Math.floor(Math.random() * (approved * 0.2))); // ไม่เกิน approved, ว่าง 0-20%
    const vacant = approved - actual;
    return { approved, actual, vacant };
  };

  // 1. สายวิชาการ
  let academicApprovedTotal = 0;
  let academicActualTotal = 0;
  let academicVacantTotal = 0;
  const academicPosDetails: PositionStaffing[] = [];

  // ให้คณะมีอาจารย์เยอะกว่าสำนักงาน
  const isFaculty = initialFacultyData.find(f => f.FACULTYID === facultyId)?.FACULTYTYPEID === 1;

  academicPositions.forEach(pos => {
    let baseApproved = 0;
    if (isFaculty) {
      if (pos === 'ศาสตราจารย์') baseApproved = Math.floor(Math.random() * 3) + 2; // 2-4
      else if (pos === 'รองศาสตราจารย์') baseApproved = Math.floor(Math.random() * 5) + 5; // 5-9
      else if (pos === 'ผู้ช่วยศาสตราจารย์') baseApproved = Math.floor(Math.random() * 10) + 10; // 10-19
      else if (pos === 'อาจารย์') baseApproved = Math.floor(Math.random() * 20) + 20; // 20-39
    } else { // สำนักงาน หรืออื่นๆ อาจมีสายวิชาการน้อยมากหรือไม่มี
      if (Math.random() < 0.1) { // 10% ที่จะมีศาสตราจารย์ในสำนักงาน
        baseApproved = Math.floor(Math.random() * 2) + 1; // 1-2
      } else {
        baseApproved = 0;
      }
    }

    if (baseApproved > 0) {
      const { approved, actual, vacant } = getRandomNumbers(baseApproved);
      academicPosDetails.push({ positionName: pos, approved, actual, vacant });
      academicApprovedTotal += approved;
      academicActualTotal += actual;
      academicVacantTotal += vacant;
    }
  });

  if (academicPosDetails.length > 0) {
    staffingDetails.push({
      staffType: 'สายวิชาการ',
      positions: academicPosDetails,
      approvedTotal: academicApprovedTotal,
      actualTotal: academicActualTotal,
      vacantTotal: academicVacantTotal,
    });
  }

  // 2. สายสนับสนุนวิชาการ
  let supportApprovedTotal = 0;
  let supportActualTotal = 0;
  let supportVacantTotal = 0;
  const supportPosDetails: PositionStaffing[] = [];

  supportPositions.forEach(pos => {
    let baseApproved = 0;
    if (isFaculty) { // คณะมีสายสนับสนุนทั่วไป
      if (pos === 'เลขานุการคณะ') baseApproved = 1;
      else if (['นักวิชาการศึกษา', 'เจ้าหน้าที่ห้องปฏิบัติการ', 'บุคลากรวิทยาศาสตร์'].includes(pos)) {
        baseApproved = Math.floor(Math.random() * 5) + 3; // 3-7
      } else {
        baseApproved = Math.floor(Math.random() * 3) + 1; // 1-3
      }
    } else { // สำนักงานมีสายสนับสนุนหลากหลายและเยอะ
      if (['ผู้อำนวยการกอง', 'นักทรัพยากรบุคคล', 'นักวิเคราะห์นโยบายและแผน'].includes(pos)) {
        baseApproved = Math.floor(Math.random() * 3) + 1; // 1-3
      } else {
        baseApproved = Math.floor(Math.random() * 10) + 5; // 5-14
      }
    }

    if (baseApproved > 0) {
      const { approved, actual, vacant } = getRandomNumbers(baseApproved);
      supportPosDetails.push({ positionName: pos, approved, actual, vacant });
      supportApprovedTotal += approved;
      supportActualTotal += actual;
      supportVacantTotal += vacant;
    }
  });

  if (supportPosDetails.length > 0) {
    staffingDetails.push({
      staffType: 'สายสนับสนุนวิชาการ',
      positions: supportPosDetails,
      approvedTotal: supportApprovedTotal,
      actualTotal: supportActualTotal,
      vacantTotal: supportVacantTotal,
    });
  }

  return staffingDetails;
};

const Rp103Page = () => {
  const { messages } = useIntl();
  const [filterFacultyName, setFilterFacultyName] = useState<string>('');
  const [filterFacultyTypeId, setFilterFacultyTypeId] = useState<string>('');

  // รวมข้อมูล FacultyData กับ StaffingByPositionData
  const combinedStaffingData: FacultyStaffingDetail[] = useMemo(() => {
    return initialFacultyData.map(faculty => {
      const staffingDetails = generateStaffingByPositionData(faculty.FACULTYID);

      const facultyApprovedTotal = staffingDetails.reduce((sum, type) => sum + type.approvedTotal, 0);
      const facultyActualTotal = staffingDetails.reduce((sum, type) => sum + type.actualTotal, 0);
      const facultyVacantTotal = staffingDetails.reduce((sum, type) => sum + type.vacantTotal, 0);

      return {
        ...faculty,
        staffingDetails,
        facultyApprovedTotal,
        facultyActualTotal,
        facultyVacantTotal,
      };
    }).filter(f => f.facultyApprovedTotal > 0); // กรองเฉพาะหน่วยงานที่มีอัตรากำลัง
  }, []);

  // สรุปข้อมูลสำหรับ Summary Overview
  const summaryData: SummaryRow[] = useMemo(() => {
    let totalAcademicApproved = 0;
    let totalAcademicActual = 0;
    let totalAcademicVacant = 0;

    let totalSupportApproved = 0;
    let totalSupportActual = 0;
    let totalSupportVacant = 0;

    combinedStaffingData.forEach(faculty => {
      faculty.staffingDetails.forEach(staffType => {
        if (staffType.staffType === 'สายวิชาการ') {
          totalAcademicApproved += staffType.approvedTotal;
          totalAcademicActual += staffType.actualTotal;
          totalAcademicVacant += staffType.vacantTotal;
        } else if (staffType.staffType === 'สายสนับสนุนวิชาการ') {
          totalSupportApproved += staffType.approvedTotal;
          totalSupportActual += staffType.actualTotal;
          totalSupportVacant += staffType.vacantTotal;
        }
      });
    });

    const totalOverallApproved = totalAcademicApproved + totalSupportApproved;
    const totalOverallActual = totalAcademicActual + totalSupportActual;
    const totalOverallVacant = totalAcademicVacant + totalSupportVacant;

    const calculateFillRate = (actual: number, approved: number) => {
      return approved > 0 ? (actual / approved) * 100 : 0;
    };

    return [
      {
        staffType: 'สายวิชาการ',
        approved: totalAcademicApproved,
        actual: totalAcademicActual,
        vacant: totalAcademicVacant,
        fillRate: calculateFillRate(totalAcademicActual, totalAcademicApproved),
      },
      {
        staffType: 'สายสนับสนุนวิชาการ',
        approved: totalSupportApproved,
        actual: totalSupportActual,
        vacant: totalSupportVacant,
        fillRate: calculateFillRate(totalSupportActual, totalSupportApproved),
      },
      {
        staffType: 'รวมทั้งหมด',
        approved: totalOverallApproved,
        actual: totalOverallActual,
        vacant: totalOverallVacant,
        fillRate: calculateFillRate(totalOverallActual, totalOverallApproved),
      },
    ];
  }, [combinedStaffingData]);

  // กรองข้อมูลตามเงื่อนไขทั้งหมด
  const filteredData = useMemo(() => {
    let currentData = combinedStaffingData;

    if (filterFacultyName) {
      const lowerCaseFilter = filterFacultyName.toLowerCase();
      currentData = currentData.filter(item =>
        item.FACULTYNAME.toLowerCase().includes(lowerCaseFilter)
      );
    }

    if (filterFacultyTypeId) {
      currentData = currentData.filter(item =>
        String(item.FACULTYTYPEID).includes(filterFacultyTypeId)
      );
    }
    return currentData;
  }, [combinedStaffingData, filterFacultyName, filterFacultyTypeId]);


  const handleExportAllToPdf = useCallback(() => {
    const doc = new jsPDF('p', 'mm', 'a4');
    // doc.setFont('THSarabunNew');
    // doc.setR2L(false);

    let currentY = 10;

    // --- Add Summary Section ---
    doc.setFontSize(14);
    doc.text('รายงานอัตรากำลังบุคลากร ประจำปีงบประมาณ 2567', 14, currentY);
    currentY += 7;
    doc.setFontSize(12);
    doc.text('ณ วันที่ 31 พฤษภาคม 2567', 14, currentY);
    currentY += 7;
    doc.text('1. สรุปภาพรวมอัตรากำลัง', 14, currentY);
    currentY += 5;

    const summaryColumns = [
      { header: 'ประเภทบุคลากร', dataKey: 'staffType' },
      { header: 'อัตรากำลังที่ได้รับอนุมัติ (คน)', dataKey: 'approved' },
      { header: 'อัตรากำลังที่มีอยู่จริง (คน)', dataKey: 'actual' },
      { header: 'อัตรากำลังว่าง (คน)', dataKey: 'vacant' },
      { header: 'สัดส่วนการบรรจุ (%)', dataKey: 'fillRate' },
    ];
    const summaryRows = summaryData.map(row => ({
      staffType: row.staffType,
      approved: row.approved,
      actual: row.actual,
      vacant: row.vacant,
      fillRate: row.fillRate.toFixed(2),
    }));

    (doc as any).autoTable({
      head: [summaryColumns.map(col => col.header)],
      body: summaryRows.map(row => summaryColumns.map(col => row[col.dataKey as keyof typeof row])),
      startY: currentY,
      margin: { left: 14, right: 14 },
      styles: { font: 'THSarabunNew', fontSize: 8 },
      headStyles: { fillColor: [200, 200, 200], textColor: [0,0,0] },
      didDrawPage: (data: any) => {
        currentY = data.cursor.y;
      }
    });
    currentY = (doc as any).autoTable.previous.finalY + 10;

    // --- Add Faculty Details Sections ---
    doc.setFontSize(12);
    doc.text('2. อัตรากำลังแยกตามคณะ/สำนัก', 14, currentY);
    currentY += 7;

    filteredData.forEach((faculty, index) => {
      if (currentY > 270) { // Check if new page is needed (A4 height is 297mm)
        doc.addPage();
        currentY = 14;
      }

      doc.setFontSize(10);
      doc.text(`${index + 2}. ${faculty.FACULTYID} ${faculty.FACULTYNAME}`, 14, currentY);
      currentY += 5;

      faculty.staffingDetails.forEach(staffTypeDetail => {
        if (currentY > 270) { // Check again for new page within a faculty
          doc.addPage();
          currentY = 14;
        }
        doc.setFontSize(9);
        doc.text(staffTypeDetail.staffType, 20, currentY);
        currentY += 5;

        const detailColumns = [
          { header: 'ตำแหน่ง', dataKey: 'positionName' },
          { header: 'อัตรากำลังที่ได้รับอนุมัติ', dataKey: 'approved' },
          { header: 'อัตรากำลังที่มีอยู่จริง', dataKey: 'actual' },
          { header: 'อัตรากำลังว่าง', dataKey: 'vacant' },
        ];
        const detailRows = staffTypeDetail.positions.map(pos => ({
          positionName: `- ${pos.positionName}`,
          approved: pos.approved,
          actual: pos.actual,
          vacant: pos.vacant,
        }));

        (doc as any).autoTable({
          head: [detailColumns.map(col => col.header)],
          body: detailRows.map(row => detailColumns.map(col => row[col.dataKey as keyof typeof row])),
          startY: currentY,
          margin: { left: 20, right: 14 },
          styles: { font: 'THSarabunNew', fontSize: 7 },
          headStyles: { fillColor: [230, 230, 230], textColor: [0,0,0] },
          didDrawPage: (data: any) => {
            currentY = data.cursor.y;
          }
        });
        currentY = (doc as any).autoTable.previous.finalY + 2;

        doc.setFontSize(8);
        doc.text(`รวม${staffTypeDetail.staffType}: ${staffTypeDetail.approvedTotal} (อนุมัติ) | ${staffTypeDetail.actualTotal} (มีอยู่จริง) | ${staffTypeDetail.vacantTotal} (ว่าง)`, 20, currentY);
        currentY += 5;
      });

      // Add faculty overall total
      doc.setFontSize(9);
      // doc.setFont('THSarabunNew', 'bold'); // Enable if font is set up
      doc.text(`รวม${faculty.FACULTYNAME}: ${faculty.facultyApprovedTotal} (อนุมัติ) | ${faculty.facultyActualTotal} (มีอยู่จริง) | ${faculty.facultyVacantTotal} (ว่าง)`, 14, currentY);
      currentY += 10;
    });

    doc.save('รายงานอัตรากำลังตามตำแหน่ง.pdf');
  }, [summaryData, filteredData]);

  const handleExportAllToExcel = useCallback(() => {
    const wb = XLSX.utils.book_new();

    // 1. Summary Sheet
    const summaryHeader = [
      'ประเภทบุคลากร',
      'อัตรากำลังที่ได้รับอนุมัติ (คน)',
      'อัตรากำลังที่มีอยู่จริง (คน)',
      'อัตรากำลังว่าง (คน)',
      'สัดส่วนการบรรจุ (%)'
    ];
    const summaryDataForExcel = [
      summaryHeader,
      ...summaryData.map(row => [
        row.staffType,
        row.approved,
        row.actual,
        row.vacant,
        row.fillRate.toFixed(2)
      ])
    ];
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryDataForExcel);
    XLSX.utils.book_append_sheet(wb, wsSummary, "สรุปภาพรวม");

    // 2. Faculty Detail Sheets
    filteredData.forEach(faculty => {
      const facultyDataForExcel: any[] = [];
      facultyDataForExcel.push(['รหัสหน่วยงาน', faculty.FACULTYID]);
      facultyDataForExcel.push(['ชื่อหน่วยงาน', faculty.FACULTYNAME]);
      facultyDataForExcel.push([]); // Empty row for spacing

      const detailColumns = ['ตำแหน่ง', 'อัตรากำลังที่ได้รับอนุมัติ', 'อัตรากำลังที่มีอยู่จริง', 'อัตรากำลังว่าง'];

      faculty.staffingDetails.forEach(staffTypeDetail => {
        facultyDataForExcel.push([staffTypeDetail.staffType]);
        facultyDataForExcel.push(detailColumns);
        staffTypeDetail.positions.forEach(pos => {
          facultyDataForExcel.push([
            `- ${pos.positionName}`,
            pos.approved,
            pos.actual,
            pos.vacant,
          ]);
        });
        facultyDataForExcel.push([
          `รวม${staffTypeDetail.staffType}`,
          staffTypeDetail.approvedTotal,
          staffTypeDetail.actualTotal,
          staffTypeDetail.vacantTotal,
        ]);
        facultyDataForExcel.push([]); // Spacing
      });

      facultyDataForExcel.push([
        `รวม${faculty.FACULTYNAME}`,
        faculty.facultyApprovedTotal,
        faculty.facultyActualTotal,
        faculty.facultyVacantTotal,
      ]);

      const wsFaculty = XLSX.utils.aoa_to_sheet(facultyDataForExcel);
      XLSX.utils.book_append_sheet(wb, wsFaculty, faculty.FACULTYNAME.substring(0, 30)); // Max 31 chars for sheet name
    });

    XLSX.writeFile(wb, "รายงานอัตรากำลังตามตำแหน่ง.xlsx");

  }, [summaryData, filteredData]);


  return (
    <AppCard
      contentStyle={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 8 }}
      title={<IntlMessages id="sidebar.rp01.03" />} 
    >
    <AppsContent>
      <AppInfoView />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{mb: 2}}>
          รายงานอัตรากำลังบุคลากร ประจำปีงบประมาณ 2568
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{mb: 4}}>
          ณ วันที่ 31 พฤษภาคม 2567
        </Typography>

        {/* Filter Section */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4, alignItems: 'center' }}>
          <TextField
            label="ชื่อหน่วยงาน"
            value={filterFacultyName}
            onChange={(e) => setFilterFacultyName(e.target.value)}
            sx={{ minWidth: 200 }}
          />
          <TextField
            label="ประเภทหน่วยงาน ID"
            value={filterFacultyTypeId}
            onChange={(e) => setFilterFacultyTypeId(e.target.value)}
            sx={{ minWidth: 180 }}
          />
           <Button variant="contained" onClick={() => {
            setFilterFacultyName('');
            setFilterFacultyTypeId('');
            Swal.fire('รีเซ็ตสำเร็จ!', 'ล้างตัวกรองทั้งหมดแล้ว', 'info');
          }}>
            รีเซ็ตตัวกรอง
          </Button>
        </Box>
      </Box>

      {/* Main Table Component */}
      <Table
        filteredData={filteredData}
        summaryData={summaryData}
        handleExportAllToPdf={handleExportAllToPdf}
        handleExportAllToExcel={handleExportAllToExcel}
      />
    </AppsContent>
    </AppCard>
  );
};

export default Rp103Page;